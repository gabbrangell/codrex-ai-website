import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// bodyParser: false is required so Stripe webhook can read the raw body for signature verification
export const config = { runtime: "nodejs", api: { bodyParser: false } };

const app = new Hono().basePath("/api");

const PRICING_PLANS = {
  monthly:   { name: "Monthly",   priceId: "price_1T6a5CD7sUDxheOfaLUYDSwD" },
  quarterly: { name: "Quarterly", priceId: "price_1T6a5fD7sUDxheOfPc6sEyKT" },
  annual:    { name: "Annual",    priceId: "price_1T6a67D7sUDxheOfOe4yh0No" },
};

// CORS — only allow requests from our own domain
app.use("/api/*", cors({
  origin: (origin) => {
    const allowed = [
      "https://codrexai.com",
      "https://www.codrexai.com",
    ];
    // Allow in development
    if (!origin || origin.startsWith("http://localhost")) return origin;
    return allowed.includes(origin) ? origin : null;
  },
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } }
  );
}

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// Auth middleware — verifies Supabase JWT from Authorization: Bearer <token>
async function authMiddleware(c, next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.slice(7);
  const { data: { user }, error } = await getSupabase().auth.getUser(token);
  if (error || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", user);
  await next();
}

// Helper — get all stripe_session_ids belonging to a user
async function getUserSessionIds(supabase, userId) {
  const { data } = await supabase
    .from("user_licenses")
    .select("stripe_session_id")
    .eq("user_id", userId);
  return data?.map((r) => r.stripe_session_id) ?? [];
}

// GET /api/dashboard/stats
app.get("/dashboard/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  const supabase = getSupabase();

  const sessionIds = await getUserSessionIds(supabase, user.id);
  if (!sessionIds.length) {
    return c.json({ activeLicenses: 0, hardwareLocked: 0, totalLicenses: 0, securityStatus: "Standard" });
  }

  const { data: licenses } = await supabase
    .from("license_keys")
    .select("status, is_hardware_locked")
    .in("stripe_session_id", sessionIds);

  const activeLicenses = licenses?.filter((l) => l.status === "active").length ?? 0;
  const hardwareLocked = licenses?.filter((l) => l.is_hardware_locked).length ?? 0;
  const totalLicenses = licenses?.length ?? 0;

  return c.json({
    activeLicenses,
    hardwareLocked,
    totalLicenses,
    securityStatus: activeLicenses > 0 ? "Protected" : "Standard",
  });
});

// GET /api/licenses
app.get("/licenses", authMiddleware, async (c) => {
  const user = c.get("user");
  const supabase = getSupabase();

  const sessionIds = await getUserSessionIds(supabase, user.id);
  if (!sessionIds.length) return c.json([]);

  const { data: licenses } = await supabase
    .from("license_keys")
    .select("*")
    .in("stripe_session_id", sessionIds);

  return c.json(licenses ?? []);
});

// GET /api/licenses/:id
app.get("/licenses/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const supabase = getSupabase();

  const { data: license } = await supabase
    .from("license_keys")
    .select("*")
    .eq("id", id)
    .single();

  if (!license) return c.json({ error: "Not found" }, 404);

  // Verify ownership via stripe_session_id
  const sessionIds = await getUserSessionIds(supabase, user.id);
  if (!sessionIds.includes(license.stripe_session_id)) {
    return c.json({ error: "Not found" }, 404);
  }

  return c.json(license);
});

// POST /api/licenses/:id/reset-hardware
app.post("/licenses/:id/reset-hardware", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const supabase = getSupabase();

  const { data: license } = await supabase
    .from("license_keys")
    .select("id, stripe_session_id")
    .eq("id", id)
    .single();

  if (!license) return c.json({ error: "Not found" }, 404);

  const sessionIds = await getUserSessionIds(supabase, user.id);
  if (!sessionIds.includes(license.stripe_session_id)) {
    return c.json({ error: "Not found" }, 404);
  }

  const { error } = await supabase
    .from("license_keys")
    .update({ hardware_id: null, is_hardware_locked: false })
    .eq("id", id);

  if (error) return c.json({ error: "Failed to reset" }, 500);
  return c.json({ success: true });
});

// POST /api/checkout
app.post("/checkout", authMiddleware, async (c) => {
  const user = c.get("user");
  const { plan } = await c.req.json();
  const planConfig = PRICING_PLANS[plan];
  if (!planConfig) return c.json({ error: "Invalid plan" }, 400);

  const stripe = getStripe();
  const origin = c.req.header("origin") ?? "https://codrexai.com";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?payment=success`,
    cancel_url: `${origin}/pricing?payment=cancelled`,
    customer_email: user.email,
    metadata: { user_id: user.id, plan },
  });

  return c.json({ url: session.url });
});

// POST /api/webhooks/stripe
// NOTE: bodyParser must be false (set in config above) for signature verification to work
app.post("/webhooks/stripe", async (c) => {
  const stripe = getStripe();
  const sig = c.req.header("stripe-signature");
  const body = await c.req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return c.json({ error: "Invalid webhook signature" }, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    if (!userId) return c.json({ received: true });

    const supabase = getSupabase();

    // Record the user → stripe_session mapping
    // The Rust backend creates the license_key row — we just need to link user_id to stripe_session_id
    await supabase.from("user_licenses").upsert(
      { user_id: userId, stripe_session_id: session.id },
      { onConflict: "stripe_session_id" }
    );
  }

  return c.json({ received: true });
});

export default handle(app);
