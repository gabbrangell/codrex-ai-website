import { Hono } from "hono";
import { handle } from "hono/vercel";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const config = { runtime: "nodejs" };

const app = new Hono().basePath("/api");

const PRICING_PLANS = {
  monthly: {
    name: "Monthly",
    priceId: "price_1T6a5CD7sUDxheOfaLUYDSwD",
  },
  quarterly: {
    name: "Quarterly",
    priceId: "price_1T6a5fD7sUDxheOfPc6sEyKT",
  },
  annual: {
    name: "Annual",
    priceId: "price_1T6a67D7sUDxheOfOe4yh0No",
  },
};

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

async function authMiddleware(c, next) {
  const authHeader = c.req.header("Authorization");
  if (\!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const token = authHeader.slice(7);
  const { data: { user }, error } = await getSupabase().auth.getUser(token);
  if (error || \!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  c.set("user", user);
  await next();
}

app.get("/dashboard/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  const supabase = getSupabase();
  const { data: userLicenses } = await supabase.from("user_licenses").select("license_key_id").eq("user_id", user.id);
  if (\!userLicenses?.length) return c.json({ activeLicenses: 0, hardwareLocked: 0, totalLicenses: 0, securityStatus: "Standard" });
  const licenseIds = userLicenses.map((ul) => ul.license_key_id);
  const { data: licenses } = await supabase.from("license_keys").select("*").in("id", licenseIds);
  const activeLicenses = licenses?.filter((l) => l.status === "active").length ?? 0;
  const hardwareLocked = licenses?.filter((l) => l.is_hardware_locked).length ?? 0;
  const totalLicenses = licenses?.length ?? 0;
  return c.json({ activeLicenses, hardwareLocked, totalLicenses, securityStatus: activeLicenses > 0 ? "Protected" : "Standard" });
});

app.get("/licenses", authMiddleware, async (c) => {
  const user = c.get("user");
  const supabase = getSupabase();
  const { data: userLicenses } = await supabase.from("user_licenses").select("license_key_id").eq("user_id", user.id);
  if (\!userLicenses?.length) return c.json([]);
  const licenseIds = userLicenses.map((ul) => ul.license_key_id);
  const { data: licenses } = await supabase.from("license_keys").select("*").in("id", licenseIds);
  return c.json(licenses ?? []);
});

app.get("/licenses/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const supabase = getSupabase();
  const { data: userLicense } = await supabase.from("user_licenses").select("license_key_id").eq("user_id", user.id).eq("license_key_id", id).single();
  if (\!userLicense) return c.json({ error: "Not found" }, 404);
  const { data: license } = await supabase.from("license_keys").select("*").eq("id", id).single();
  if (\!license) return c.json({ error: "Not found" }, 404);
  return c.json(license);
});

app.post("/licenses/:id/reset-hardware", authMiddleware, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");
  const supabase = getSupabase();
  const { data: userLicense } = await supabase.from("user_licenses").select("license_key_id").eq("user_id", user.id).eq("license_key_id", id).single();
  if (\!userLicense) return c.json({ error: "Not found" }, 404);
  const { error } = await supabase.from("license_keys").update({ hardware_id: null, is_hardware_locked: false }).eq("id", id);
  if (error) return c.json({ error: "Failed to reset" }, 500);
  return c.json({ success: true });
});

app.post("/checkout", authMiddleware, async (c) => {
  const user = c.get("user");
  const { plan } = await c.req.json();
  const planConfig = PRICING_PLANS[plan];
  if (\!planConfig) return c.json({ error: "Invalid plan" }, 400);
  const stripe = getStripe();
  const origin = c.req.header("origin") ?? "https://codrexai.com";
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: planConfig.priceId, quantity: 1 }],
    success_url: `${origin}/dashboard?payment=success`,
    cancel_url: `${origin}/pricing?payment=cancelled`,
    metadata: { user_id: user.id, plan },
  });
  return c.json({ url: session.url });
});

app.post("/webhooks/stripe", async (c) => {
  const stripe = getStripe();
  const sig = c.req.header("stripe-signature");
  const body = await c.req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return c.json({ error: "Invalid signature" }, 400);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    if (\!userId) return c.json({ received: true });
    const supabase = getSupabase();
    const { data: license } = await supabase.from("license_keys").select("id").eq("stripe_session_id", session.id).single();
    if (license) {
      await supabase.from("user_licenses").upsert({ user_id: userId, license_key_id: license.id, stripe_session_id: session.id }, { onConflict: "stripe_session_id" });
    }
  }
  return c.json({ received: true });
});

export default handle(app);
