import { useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import {
  Check,
  Star,
  Crown,
  Sparkles,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$59",
    period: "/month",
    description: "Flexible, cancel anytime",
    icon: Star,
    color: "from-slate-700 to-slate-600",
    features: [
      { text: "Unlimited mock interviews", included: true },
      { text: "Real-time coaching overlay", included: true },
      { text: "All AI models included", included: true },
      { text: "Private Mode for live interviews", included: true },
      { text: "Priority Support", included: true },
      { text: "Cancel anytime", included: true },
    ],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "$199",
    period: "/3 months",
    description: "Save ~$22 compared to monthly billing",
    icon: Sparkles,
    color: "from-primary to-cyan-400",
    popular: true,
    features: [
      { text: "Everything in Monthly", included: true },
      { text: "Billed every 3 months", included: true },
      { text: "All AI models included", included: true },
      { text: "Priority Support", included: true },
      { text: "Save ~$22 vs monthly", included: true },
      { text: "Cancel anytime", included: true },
    ],
  },
  {
    id: "annual",
    name: "Annual",
    price: "$499",
    period: "/year",
    description: "Best value — save ~$209 compared to monthly billing",
    icon: Crown,
    color: "from-slate-700 to-slate-600",
    features: [
      { text: "Everything in Monthly", included: true },
      { text: "Billed annually", included: true },
      { text: "All AI models included", included: true },
      { text: "VIP Support", included: true },
      { text: "Save ~$209 vs monthly", included: true },
      { text: "Early access to new features", included: true },
    ],
  },
];

export default function PricingPage() {
  const { user, redirectToLogin } = useAuth();
  
  const [searchParams] = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const paymentCancelled = searchParams.get("payment") === "cancelled";

  const handlePurchase = async (planId: string) => {
    if (!user) {
      await redirectToLogin();
      return;
    }

    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Simple Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Success Plan
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flexible plans to fit your schedule. No hidden fees, cancel anytime.
              Get the AI interview coach that helps you land your dream job.
            </p>
          </div>

          {/* Payment Cancelled Notice */}
          {paymentCancelled && (
            <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-lg mx-auto">
              <p className="text-center text-amber-500">
                Payment was cancelled. Feel free to try again when you're ready.
              </p>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-3xl bg-card border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                  plan.popular
                    ? "border-primary/50 shadow-lg shadow-primary/10"
                    : "border-border/50"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-cyan-400 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Plan Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} mb-6`}
                >
                  <plan.icon className="h-7 w-7 text-white" />
                </div>

                {/* Plan Name & Description */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePurchase(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`w-full h-12 text-base font-medium mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {loadingPlan === plan.id ? (
                    <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Get {plan.name}</>
                  )}
                </Button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                          <Check className="h-3 w-3 text-emerald-500" />
                        </div>
                      <span className="text-foreground">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>10,000+ Users</span>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Have questions?{" "}
              <a href="/faq" className="text-primary hover:underline">
                Check our FAQ
              </a>{" "}
              or{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact us
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
