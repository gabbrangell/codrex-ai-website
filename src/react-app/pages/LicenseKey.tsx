import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@/react-app/contexts/AuthContext";
import { apiFetch } from "@/react-app/lib/api";
import Header from "@/react-app/components/Header";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import {
  Key,
  Shield,
  HardDrive,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowLeft,
  RefreshCw,
  Calendar,
  Clock,
  AlertTriangle,
  Zap,
  Settings,
  Activity,
  Lock,
} from "lucide-react";

interface License {
  id: number;
  license_key: string;
  plan: string;
  status: string;
  hardware_id: string | null;
  is_hardware_locked: number;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function LicenseKeyPage() {
  const { user, isPending } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [license, setLicense] = useState<License | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      navigate("/auth");
    }
  }, [user, isPending, navigate]);

  useEffect(() => {
    if (user && id) {
      fetchLicense();
    }
  }, [user, id]);

  const fetchLicense = async () => {
    try {
      const res = await apiFetch(`/api/licenses/${id}`);
      if (res.ok) {
        setLicense(await res.json());
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to fetch license:", error);
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (license) {
      await navigator.clipboard.writeText(license.license_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetHardwareLock = async () => {
    if (!license) return;
    
    setIsResetting(true);
    try {
      const res = await apiFetch(`/api/licenses/${license.id}/reset-hardware`, {
        method: "POST",
      });
      if (res.ok) {
        fetchLicense();
      }
    } catch (error) {
      console.error("Failed to reset hardware lock:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const maskLicenseKey = (key: string) => {
    const parts = key.split("-");
    return parts.map((part, index) => (index === 0 ? part : "••••")).join("-");
  };

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading license...</p>
        </div>
      </div>
    );
  }

  if (!user || !license) {
    return null;
  }

  const sidebarItems = [
    { icon: Key, label: "License Details", active: true },
    { icon: HardDrive, label: "Hardware Info", active: false },
    { icon: Activity, label: "Usage History", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0">
              <div className="p-4 rounded-2xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-400">
                    <Key className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{license.plan}</p>
                    <Badge
                      className={
                        license.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500 text-xs"
                          : "bg-muted text-muted-foreground text-xs"
                      }
                    >
                      {license.status}
                    </Badge>
                  </div>
                </div>

                <nav className="space-y-1">
                  {sidebarItems.map((item, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* License Key Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    License Key
                  </h2>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {license.plan}
                  </Badge>
                </div>

                {/* Key Display */}
                <div className="p-4 rounded-xl bg-muted/50 border border-border/50 mb-4">
                  <div className="flex items-center justify-between">
                    <code className="font-mono text-lg tracking-wider text-foreground">
                      {isKeyVisible
                        ? license.license_key
                        : maskLicenseKey(license.license_key)}
                    </code>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsKeyVisible(!isKeyVisible)}
                        className="gap-2"
                      >
                        {isKeyVisible ? (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" />
                            Show
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyToClipboard}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Keep your license key secure. Do not share it with others.
                </p>
              </div>

              {/* Hardware Lock Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    Hardware Lock
                  </h2>
                  {license.is_hardware_locked ? (
                    <Badge className="bg-primary/10 text-primary">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Not Locked
                    </Badge>
                  )}
                </div>

                {license.is_hardware_locked ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground mb-1">
                        Hardware ID
                      </p>
                      <code className="font-mono text-foreground">
                        {license.hardware_id || "Unknown"}
                      </code>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            Hardware Lock Active
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            This license is locked to specific hardware. If you've
                            changed your computer, you can reset the lock once.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={resetHardwareLock}
                            disabled={isResetting}
                            className="gap-2"
                          >
                            <RefreshCw
                              className={`h-4 w-4 ${isResetting ? "animate-spin" : ""}`}
                            />
                            Reset Hardware Lock
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          Not Yet Locked
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This license will be locked to your hardware when you
                          first activate the desktop application.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* License Info Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                  <Activity className="h-5 w-5 text-primary" />
                  License Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Created</p>
                    </div>
                    <p className="font-medium text-foreground">
                      {new Date(license.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Expires</p>
                    </div>
                    <p className="font-medium text-foreground">
                      {license.expires_at
                        ? new Date(license.expires_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Never (Lifetime)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
