import { Hono } from "hono";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import Stripe from "stripe";

// Extend Env to include secrets
interface AppEnv extends Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
}

// Pricing plans configuration
// NOTE: Create these products in Stripe Dashboard and add the Price IDs below
const PRICING_PLANS = {
  monthly: {
    name: "Monthly",
    priceCents: 5900, // $59
    interval: "month" as const,
    intervalCount: 1,
    stripePriceId: "price_1T6a5CD7sUDxheOfaLUYDSwD",
    features: ["Unlimited mock interviews", "Real-time coaching", "All AI models", "Priority Support"],
  },
  quarterly: {
    name: "Quarterly",
    priceCents: 19900, // $199
    interval: "month" as const,
    intervalCount: 3,
    stripePriceId: "price_1T6a5fD7sUDxheOfPc6sEyKT",
    features: ["Everything in Monthly", "Billed every 3 months", "Save ~$22"],
  },
  annual: {
    name: "Annual",
    priceCents: 49900, // $499
    interval: "year" as const,
    intervalCount: 1,
    stripePriceId: "price_1T6a67D7sUDxheOfOe4yh0No",
    features: ["Everything in Monthly", "Billed annually", "VIP Support", "Save ~$209"],
  },
};

const app = new Hono<{ Bindings: AppEnv }>();

// Helper to generate license key
function generateLicenseKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = 4;
  const segmentLength = 4;
  const parts: string[] = [];
  
  for (let i = 0; i < segments; i++) {
    let segment = "";
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    parts.push(segment);
  }
  
  return parts.join("-");
}

// Obtain redirect URL from the Mocha Users Service
app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

// Exchange the code for a session token
app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

// Get the current user object for the frontend
app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

// Get user's licenses
app.get("/api/licenses", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user!.id)
    .all();
  
  return c.json(results);
});

// Get dashboard stats
app.get("/api/dashboard/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results: licenses } = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE user_id = ?"
  )
    .bind(user!.id)
    .all();
  
  const activeLicenses = licenses.filter((l: any) => l.status === "active").length;
  const hardwareLocked = licenses.filter((l: any) => l.is_hardware_locked).length;
  const totalLicenses = licenses.length;
  
  return c.json({
    activeLicenses,
    hardwareLocked,
    totalLicenses,
    securityStatus: hardwareLocked > 0 ? "Protected" : "Standard",
  });
});

// Get single license by ID
app.get("/api/licenses/:id", authMiddleware, async (c) => {
  const user = c.get("user");
  const licenseId = c.req.param("id");
  
  const license = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE id = ? AND user_id = ?"
  )
    .bind(licenseId, user!.id)
    .first();
  
  if (!license) {
    return c.json({ error: "License not found" }, 404);
  }
  
  return c.json(license);
});

// Reset hardware lock for a license
app.post("/api/licenses/:id/reset-hardware", authMiddleware, async (c) => {
  const user = c.get("user");
  const licenseId = c.req.param("id");
  
  const license = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE id = ? AND user_id = ?"
  )
    .bind(licenseId, user!.id)
    .first();
  
  if (!license) {
    return c.json({ error: "License not found" }, 404);
  }
  
  await c.env.DB.prepare(
    "UPDATE licenses SET hardware_id = NULL, is_hardware_locked = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  )
    .bind(licenseId)
    .run();
  
  return c.json({ success: true });
});

// Create a new license (for demo/testing)
app.post("/api/licenses", authMiddleware, async (c) => {
  const user = c.get("user");
  const body = await c.req.json();
  
  const licenseKey = generateLicenseKey();
  const plan = body.plan || "Professional";
  
  await c.env.DB.prepare(
    `INSERT INTO licenses (user_id, license_key, plan, status, is_hardware_locked)
     VALUES (?, ?, ?, 'active', 0)`
  )
    .bind(user!.id, licenseKey, plan)
    .run();
  
  return c.json({ success: true, licenseKey }, 201);
});

// Create Stripe checkout session
app.post("/api/checkout", authMiddleware, async (c) => {
  const user = c.get("user");
  const { plan } = await c.req.json();
  
  const planConfig = PRICING_PLANS[plan as keyof typeof PRICING_PLANS];
  if (!planConfig) {
    return c.json({ error: "Invalid plan" }, 400);
  }
  
  if (!c.env.STRIPE_SECRET_KEY) {
    return c.json({ error: "Stripe not configured" }, 500);
  }
  
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const baseUrl = new URL(c.req.url).origin;
  
  // Use Stripe Price ID if configured, otherwise create price dynamically
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
          recurring: {
            interval: planConfig.interval,
            interval_count: planConfig.intervalCount || 1,
          },
        },
        quantity: 1,
      };
  
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [lineItem],
    success_url: `${baseUrl}/dashboard?payment=success`,
    cancel_url: `${baseUrl}/pricing?payment=cancelled`,
    metadata: {
      userId: user!.id,
      plan: plan,
    },
    subscription_data: {
      metadata: {
        userId: user!.id,
        plan: plan,
      },
    },
  });
  
  return c.json({ url: session.url });
});

// Stripe webhook handler
app.post("/api/webhooks/stripe", async (c) => {
  if (!c.env.STRIPE_SECRET_KEY || !c.env.STRIPE_WEBHOOK_SECRET) {
    return c.json({ error: "Stripe not configured" }, 500);
  }
  
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const body = await c.req.text();
  const sig = c.req.header("stripe-signature") || "";
  
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      c.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return c.json({ error: "Invalid signature" }, 400);
  }
  
  // Handle subscription created
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;
    
    if (userId && plan) {
      const planConfig = PRICING_PLANS[plan as keyof typeof PRICING_PLANS];
      
      // Check if user already has an active license, update it if so
      const existing = await c.env.DB.prepare(
        "SELECT id FROM licenses WHERE user_id = ? AND status = 'active'"
      ).bind(userId).first();
      
      if (existing) {
        await c.env.DB.prepare(
          "UPDATE licenses SET plan = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(planConfig.name, existing.id).run();
      } else {
        // Create a new license for the subscriber
        const licenseKey = generateLicenseKey();
        await c.env.DB.prepare(
          `INSERT INTO licenses (user_id, license_key, plan, status, is_hardware_locked)
           VALUES (?, ?, ?, 'active', 0)`
        ).bind(userId, licenseKey, planConfig.name).run();
      }
    }
  }
  
  // Handle subscription cancelled/expired
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.userId;
    
    if (userId) {
      await c.env.DB.prepare(
        "UPDATE licenses SET status = 'expired', updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND status = 'active'"
      ).bind(userId).run();
    }
  }
  
  return c.json({ received: true });
});

// ============================================
// PUBLIC API - Desktop App License Validation
// ============================================

// Validate license key (for desktop app)
app.post("/api/licenses/validate", async (c) => {
  const body = await c.req.json();
  const { licenseKey, hardwareId } = body;
  
  if (!licenseKey) {
    return c.json({ valid: false, error: "License key required" }, 400);
  }
  
  // Find the license
  const license = await c.env.DB.prepare(
    "SELECT * FROM licenses WHERE license_key = ?"
  )
    .bind(licenseKey)
    .first();
  
  if (!license) {
    return c.json({ valid: false, error: "Invalid license key" }, 404);
  }
  
  // Check if license is active
  if (license.status !== "active") {
    return c.json({ 
      valid: false, 
      error: "License is not active",
      status: license.status 
    }, 403);
  }
  
  // Check expiration
  if (license.expires_at && new Date(license.expires_at as string) < new Date()) {
    return c.json({ 
      valid: false, 
      error: "License has expired",
      status: "expired" 
    }, 403);
  }
  
  // Handle hardware locking
  if (hardwareId) {
    if (license.is_hardware_locked && license.hardware_id !== hardwareId) {
      // License is locked to a different computer
      return c.json({ 
        valid: false, 
        error: "License is locked to another device",
        status: "hardware_mismatch" 
      }, 403);
    }
    
    // Lock to this hardware if not already locked
    if (!license.is_hardware_locked) {
      await c.env.DB.prepare(
        "UPDATE licenses SET hardware_id = ?, is_hardware_locked = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      )
        .bind(hardwareId, license.id)
        .run();
    }
  }
  
  return c.json({
    valid: true,
    plan: license.plan,
    status: license.status,
    hardwareLocked: !!license.is_hardware_locked || !!hardwareId,
    expiresAt: license.expires_at || null,
  });
});

// Get license info (public, read-only)
app.get("/api/licenses/check/:licenseKey", async (c) => {
  const licenseKey = c.req.param("licenseKey");
  
  const license = await c.env.DB.prepare(
    "SELECT plan, status, is_hardware_locked, expires_at FROM licenses WHERE license_key = ?"
  )
    .bind(licenseKey)
    .first();
  
  if (!license) {
    return c.json({ exists: false }, 404);
  }
  
  return c.json({
    exists: true,
    plan: license.plan,
    status: license.status,
    hardwareLocked: !!license.is_hardware_locked,
    expiresAt: license.expires_at || null,
  });
});

// Log out the user
app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

export default app;
