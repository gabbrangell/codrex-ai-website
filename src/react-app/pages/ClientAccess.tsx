import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import { Input } from "@/react-app/components/ui/input";
import {
  Key,
  Download,
  BookOpen,
  MessageCircle,
  Video,
  FileText,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  
  Headphones,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const resources = [
  {
    icon: Download,
    title: "Download Software",
    description: "Get the latest version of Codrex AI for your platform",
    href: "/download",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API references",
    href: "#",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video guides to master the platform",
    href: "#",
    color: "from-violet-500 to-purple-400",
  },
  {
    icon: GraduationCap,
    title: "Training Center",
    description: "Interactive courses and certifications",
    href: "#",
    color: "from-amber-500 to-orange-400",
  },
];

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    availability: "Available 9am-6pm EST",
  },
  {
    icon: Headphones,
    title: "Phone Support",
    description: "Speak directly with a specialist",
    availability: "Professional & Enterprise plans",
  },
  {
    icon: FileText,
    title: "Submit Ticket",
    description: "Create a support ticket for complex issues",
    availability: "24-48 hour response time",
  },
];

export default function ClientAccessPage() {
  const user = null;
  const navigate = useNavigate();
  const [licenseKey, setLicenseKey] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleVerifyLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setVerificationResult(null);

    // Simulate license verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo verification logic
    if (licenseKey.match(/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/)) {
      setVerificationResult({
        success: true,
        message: "License verified successfully! Your license is active and valid.",
      });
    } else if (licenseKey.length > 0) {
      setVerificationResult({
        success: false,
        message: "Invalid license format. Please enter a valid license key (XXXX-XXXX-XXXX-XXXX).",
      });
    } else {
      setVerificationResult({
        success: false,
        message: "Please enter a license key to verify.",
      });
    }

    setVerifying(false);
  };

  const handleGoToDashboard = async () => {
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Client Portal
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Client{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Access
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access your licenses, downloads, documentation, and support resources.
            </p>
          </div>

          {/* Dashboard Access Card */}
          <div className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400">
                <Key className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {user ? "Go to Your Dashboard" : "Sign In to Access Your Licenses"}
                </h2>
                <p className="text-muted-foreground">
                  {user
                    ? "View and manage all your license keys, hardware locks, and account settings."
                    : "Sign in with your account to view your purchased licenses and manage your subscription."}
                </p>
              </div>
              <Button
                onClick={handleGoToDashboard}
                size="lg"
                className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90"
              >
                {user ? "Open Dashboard" : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* License Verification */}
          <div className="mb-12 p-8 rounded-3xl bg-card border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Verify License Key
            </h3>
            <p className="text-muted-foreground mb-6">
              Enter your license key to check its status and validity.
            </p>
            <form onSubmit={handleVerifyLicense} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                  className="flex-1 font-mono text-center sm:text-left tracking-wider"
                  maxLength={19}
                />
                <Button type="submit" disabled={verifying} variant="outline">
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify License"
                  )}
                </Button>
              </div>
              {verificationResult && (
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    verificationResult.success
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {verificationResult.success ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={
                      verificationResult.success ? "text-emerald-500" : "text-red-500"
                    }
                  >
                    {verificationResult.message}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Resources Grid */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.href}
                  className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${resource.color} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <resource.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Support Options */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Support Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">
                    {option.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <p className="text-xs text-primary">{option.availability}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/50">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a
                href="/faq"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="h-4 w-4" />
                FAQ
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </a>
              <a
                href="/terms"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <FileText className="h-4 w-4" />
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Shield className="h-4 w-4" />
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Not a customer yet? */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                Not a customer yet?{" "}
                <a href="/pricing" className="text-primary hover:underline font-medium">
                  View pricing
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
