/**
 * Vercel API — Hono router with Supabase (reads from the same DB as the Rust backend).
 *
 * Required env vars in Vercel project settings:
 *   SUPABASE_URL               — your Supabase project URL
 *   SUPABASE_SERVICE_KEY       — service role key (bypasses RLS)
 *   MOCHA_USERS_SERVICE_API_URL — Mocha OAuth service URL
 *   MOCHA_USERS_SERVICE_API_KEY — Mocha API key
 *   STRIPE_SECRET_KEY           — sk_live_...
 *   STRIPE_WEBHOOK_SECRET       — whsec_... (Stripe Dashboard → Webhooks)
 */

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { createClient } from "@supabase/supabase-js";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import Stripe from "stripe";

export const config = {
  runtime: "nodejs",
  api: { bodyParser: false },
};

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } }
  );
}

const PRICING_PLANS = {
  monthly: {
    name: "Monthly",
    priceCents: 5900,
    interval: "month",
    intervalCount: 1,
    stripePriceId: "price_1T6a5CD7sUDxheOfaLUYDSwD",
    features: ["Unlimited mock interviews", "Real-time coaching", "All AI models", "Priority Support"],
  },
  quarterly: {
    name: "Quarterly",
    priceCents: 19900,
    interval: "month",
    intervalCount: 3,
    stripePriceId: "price_1T6a5fD7sUDxheOfPc6sEyKT",
    features: ["Everything in Monthly", "Billed every 3 months", "Save ~$22"],
  },
  annual: {
    name: "Annual",
    priceCents: 49900,
    interval: "year",
    intervalCount: 1,
    stripePriceId: "price_1T6a67D7sUDxheOfOe4yh0No",
    features: ["Everything in Monthly", "Billed annually", "VIP Support", "Save ~$209"],
  },
};


const app = new Hono().basePath("/api");

// ── Auth ─────────────────────────────────────────────────────────────────────

app.get("/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: process.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: process.env.MOCHA_USERS_SERVICE_API_KEY,
  });
  return c.json({ redirectUrl });
});

app.post("/sessions", async (c) => {
  const body = await c.req.json();
  if (!body.code) return c.json({ error: "No authorization code provided" }, 400);
  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: process.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: process.env.MOCHA_USERS_SERVICE_API_KEY,
  });
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true, path: "/", sameSite: "none", secure: true,
    maxAge: 60 * 24 * 60 * 60,
  });
  return c.json({ success: true });
});

app.get("/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);
  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: process.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: process.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true, path: "/", sameSite: "none", secure: true, maxAge: 0,
  });
  return c.json({ success: true });
});

// ── Dashboard ─────────────────────────────────────────────────────────────────

app.get("/dashboard/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  const sb = getSupabase();

  // Get stripe session IDs for this user
  const { data: userLicenses } = await sb
    .from("user_licenses")
    .select("stripe_session_id")
    .eq("user_id", user.id);

  if (!userLicenses?.length) {
    return c.json({ activeLicenses: 0, hardwareLocked: 0, totalLicenses: 0, securityStatus: "Standard" });
  }

  const sessionIds = userLicenses.map((ul) => ul.stripe_session_id);
  const { data: licenses } = await sb
    .from("license_keys")
    .select("status, license_activations(hardware_fingerprint)")
    .in("stripe_session_id", sessionIds);

  const activeLicenses = licenses?.filter((l) => l.status === "active").length ?? 0;
  const hardwareLocked = licenses?.filter((l) => l.license_activations?.length > 0).length ?? 0;

  return c.json({
    activeLicenses,
    hardwareLocked,
    totalLicenses: licenses?.length ?? 0,
    securityStatus: hardwareLocked > 0 ? "Protected" : "Standard",
  });
});

// ── Licenses ──────────────────────────────────────────────────────────────────

app.get("/licenses", authMiddleware, async (c) => {
  const user = c.get("user");
  const sb = getSupabase();

  const { data: userLicenses } = await sb
    .from("user_licenses")
    .select("stripe_session_id")
    .eq("user_id", user.id);

  if (!userLicenses?.length) return c.json([]);

  const sessionIds = userLicenses.map((ul) => ul.stripe_session_id);
  const { data: licenses, error } = await sb
    .from("license_keys")
    .select("*, license_activations(hardware_fingerprint)")
    .in("stripe_session_id", sessionIds)
    .order("created_at", { ascending: false });

  if (error) return c.json({ error: error.message }, 500);

  // Normalize shape to match what the frontend expects
  const normalized = (licenses ?? []).map((l) => ({
    ...l,
    is_hardware_locked: l.license_activations?.length > 0,
    hardware_id: l.license_activations?.[0]?.hardware_fingerprint ?? null,
  }));

  return c.json(normalized);
});

app.get("/licenses/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const sb = getSupabase();

  // Verify ownership via user_licenses
  const { data: userLicenses } = await sb
    .from("user_licenses")
    .select("stripe_session_id")
    .eq("user_id", user.id);

  if (!userLicenses?.length) return c.json({ error: "License not found" }, 404);
  const sessionIds = userLicenses.map((ul) => ul.stripe_session_id);

  const { data: license, error } = await sb
    .from("license_keys")
    .select("*, license_activations(hardware_fingerprint)")
    .eq("id", c.req.param("id"))
    .in("stripe_session_id", sessionIds)
    .single();

  if (error || !license) return c.json({ error: "License not found" }, 404);

  return c.json({
    ...license,
    is_hardware_locked: license.license_activations?.length > 0,
    hardware_id: license.license_activations?.[0]?.hardware_fingerprint ?? null,
  });
});

app.post("/licenses/:id/reset-hardware", authMiddleware, async (c) => {
  const user = c.get("user");
  const sb = getSupabase();

  const { data: userLicenses } = await sb
    .from("user_licenses")
    .select("stripe_session_id")
    .eq("user_id", user.id);

  if (!userLicenses?.length) return c.json({ error: "License not found" }, 404);
  const sessionIds = userLicenses.map((ul) => ul.stripe_session_id);

  const { data: license } = await sb
    .from("license_keys")
    .select("license_key")
    .eq("id", c.req.param("id"))
    .in("stripe_session_id", sessionIds)
    .single();

  if (!license) return c.json({ error: "License not found" }, 404);

  // Delete hardware binding (same table the Rust backend uses)
  await sb.from("license_activations").delete().eq("license_key", license.license_key);
  return c.json({ success: true });
});

// ── Stripe ────────────────────────────────────────────────────────────────────

app.post("/checkout", authMiddleware, async (c) => {
  const user = c.get("user");
  const { plan } = await c.req.json();
  const planConfig = PRICING_PLANS[plan];
  if (!planConfig) return c.json({ error: "Invalid plan" }, 400);
  if (!process.env.STRIPE_SECRET_KEY) return c.json({ error: "Stripe not configured" }, 500);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const baseUrl = new URL(c.req.url).origin;

  const lineItem = planConfig.stripePriceId
    ? { price: planConfig.stripePriceId, quantity: 1 }
    : {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Codrex AI - ${planConfig.name} Plan`,
            description: planConfig.features.join(", "),
          },
          unit_amount: planConfig.priceCents,
          recurring: { interval: planConfig.interval, interval_count: planConfig.intervalCount },
        },
        quantity: 1,
      };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [lineItem],
    success_url: `${baseUrl}/dashboard?payment=success`,
    cancel_url: `${baseUrl}/pricing?payment=cancelled`,
    // userId in metadata so the Rust backend webhook can use it too
    metadata: { userId: user.id, plan },
    subscription_data: { metadata: { userId: user.id, plan } },
  });

  return c.json({ url: session.url });
});

app.post("/webhooks/stripe", async (c) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return c.json({ error: "Stripe not configured" }, 500);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return c.json({ error: "Invalid signature" }, 400);
  }

  const sb = getSupabase();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const sessionId = session.id;

    if (userId && sessionId) {
      // Record user → session mapping so we can look up their license_keys
      await sb
        .from("user_licenses")
        .upsert({ user_id: userId, stripe_session_id: sessionId }, { onConflict: "stripe_session_id" });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    const userId = sub.metadata?.userId;
    if (userId) {
      // Get session IDs for this user and expire their active licenses
      const { data: userLicenses } = await sb
        .from("user_licenses")
        .select("stripe_session_id")
        .eq("user_id", userId);

      if (userLicenses?.length) {
        const sessionIds = userLicenses.map((ul) => ul.stripe_session_id);
        await sb
          .from("license_keys")
          .update({ status: "revoked" })
          .in("stripe_session_id", sessionIds)
          .eq("status", "active");
      }
    }
  }

  return c.json({ received: true });
});

// ── Public — desktop app license validation ───────────────────────────────────

app.post("/licenses/validate", async (c) => {
  const { licenseKey, hardwareId } = await c.req.json();
  if (!licenseKey) return c.json({ valid: false, error: "License key required" }, 400);

  const sb = getSupabase();
  const { data: license } = await sb
    .from("license_keys")
    .select("id, license_key, plan, status, license_activations(hardware_fingerprint)")
    .eq("license_key", licenseKey)
    .single();

  if (!license) return c.json({ valid: false, error: "Invalid license key" }, 404);
  if (license.status !== "active") {
    return c.json({ valid: false, error: "License is not active", status: license.status }, 403);
  }

  const activation = license.license_activations?.[0];
  if (hardwareId && activation) {
    if (activation.hardware_fingerprint !== hardwareId) {
      return c.json({ valid: false, error: "License is locked to another device", status: "hardware_mismatch" }, 403);
    }
  }

  return c.json({ valid: true, plan: license.plan, status: license.status, hardwareLocked: !!activation });
});

app.get("/licenses/check/:licenseKey", async (c) => {
  const sb = getSupabase();
  const { data: license } = await sb
    .from("license_keys")
    .select("plan, status, license_activations(hardware_fingerprint)")
    .eq("license_key", c.req.param("licenseKey"))
    .single();

  if (!license) return c.json({ exists: false }, 404);
  return c.json({
    exists: true,
    plan: license.plan,
    status: license.status,
    hardwareLocked: (license.license_activations?.length ?? 0) > 0,
  });
});

export default handle(app);
