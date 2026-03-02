import { useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import { Input } from "@/react-app/components/ui/input";
import {
  Users,
  DollarSign,
  
  Gift,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Star,
  Crown,
  Zap,
  BarChart3,
  Wallet,
  Link2,
  Share2,
  Target,
} from "lucide-react";

const partnerTiers = [
  {
    name: "Affiliate",
    icon: Zap,
    commission: "20%",
    color: "from-blue-500 to-cyan-400",
    requirements: "0+ referrals",
    benefits: [
      "20% commission per sale",
      "30-day cookie tracking",
      "Basic analytics dashboard",
      "Email support",
    ],
  },
  {
    name: "Partner",
    icon: Star,
    commission: "25%",
    color: "from-primary to-cyan-400",
    popular: true,
    requirements: "10+ referrals",
    benefits: [
      "25% commission per sale",
      "60-day cookie tracking",
      "Advanced analytics",
      "Priority support",
      "Co-marketing opportunities",
    ],
  },
  {
    name: "Elite",
    icon: Crown,
    commission: "30%",
    color: "from-violet-500 to-purple-400",
    requirements: "50+ referrals",
    benefits: [
      "30% commission per sale",
      "90-day cookie tracking",
      "Custom landing pages",
      "Dedicated account manager",
      "Early access to features",
      "Revenue share bonuses",
    ],
  },
];

const howItWorks = [
  {
    step: 1,
    icon: Link2,
    title: "Get Your Link",
    description: "Sign up and receive your unique referral link instantly",
  },
  {
    step: 2,
    icon: Share2,
    title: "Share & Promote",
    description: "Share your link with your audience through any channel",
  },
  {
    step: 3,
    icon: Target,
    title: "Track Referrals",
    description: "Monitor clicks, conversions, and earnings in real-time",
  },
  {
    step: 4,
    icon: Wallet,
    title: "Get Paid",
    description: "Receive monthly payouts via PayPal or bank transfer",
  },
];

const stats = [
  { value: "$2.4M+", label: "Paid to Partners" },
  { value: "5,000+", label: "Active Partners" },
  { value: "30%", label: "Top Commission" },
  { value: "45 days", label: "Avg. Payout Time" },
];

export default function NetworkPage() {
  const { user, redirectToLogin } = useAuth();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Generate a demo referral link based on user
  const referralCode = user ? `REF${user.id.slice(0, 8).toUpperCase()}` : "DEMO123";
  const referralLink = `https://apexai.com/r/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await redirectToLogin();
      return;
    }
    // Demo submission
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Users className="h-3 w-3 mr-1" />
              Partner Program
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Join Our{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Partner Network
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Earn up to 30% commission for every customer you refer. 
              Join thousands of partners already earning with Codrex AI.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-card border border-border/50"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Link Section (for logged in users) */}
          {user && (
            <div className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Your Referral Link
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Share this link and earn commissions on every sale
                  </p>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="bg-background/50 font-mono text-sm"
                    />
                    <Button
                      onClick={handleCopyLink}
                      variant="outline"
                      className="px-4"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <div key={index} className="relative">
                  <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-sm font-medium text-primary mb-2">
                      Step {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-5 h-5 w-5 text-muted-foreground/50 -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Partner Tiers */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">
              Commission Tiers
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              The more you refer, the more you earn. Unlock higher commission rates as you grow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {partnerTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative p-8 rounded-3xl bg-card border transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 ${
                    tier.popular
                      ? "border-primary/50 shadow-lg shadow-primary/10"
                      : "border-border/50"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-cyan-400 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.color} mb-6`}
                  >
                    <tier.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tier.requirements}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                      {tier.commission}
                    </span>
                    <span className="text-muted-foreground ml-2">commission</span>
                  </div>

                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                          <Check className="h-3 w-3 text-emerald-500" />
                        </div>
                        <span className="text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Why Partner With Us */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 mb-4">
                <DollarSign className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Competitive Payouts
              </h3>
              <p className="text-sm text-muted-foreground">
                Industry-leading commissions with reliable monthly payouts. No minimum threshold.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 mb-4">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                Track clicks, conversions, and earnings in real-time with our partner dashboard.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 mb-4">
                <Gift className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Marketing Resources
              </h3>
              <p className="text-sm text-muted-foreground">
                Access banners, landing pages, and promotional content to maximize conversions.
              </p>
            </div>
          </div>

          {/* Apply Section */}
          {!user && (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 max-w-2xl mx-auto text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to Start Earning?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join our partner network and start earning commissions today.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Check className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-emerald-500 font-medium">
                    Application submitted! We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90"
                  >
                    Apply Now
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* Help Link */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Have questions about the partner program?{" "}
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
