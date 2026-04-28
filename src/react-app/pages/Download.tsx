import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import {
  Download,
  Apple,
  Monitor,
  Shield,
  Code2,
  Zap,
  RefreshCw,
  CheckCircle2,
  HardDrive,
  Cpu,
  MemoryStick,
  Info,
} from "lucide-react";

// Windows icon SVG component
function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 18.5V12.5H10.5V19.5L3 18.5ZM11.5 4.33L21 3V11.5H11.5V4.33ZM11.5 19.67V12.5H21V21L11.5 19.67Z" />
    </svg>
  );
}

type Platform = "macos" | "windows";

const platformData = {
  macos: {
    name: "macOS",
    icon: Apple,
    version: "2.4.1",
    size: "128 MB",
    filename: "CodrexAI-2.4.1-mac.dmg",
    requirements: [
      { icon: Cpu, text: "Apple Silicon or Intel Mac" },
      { icon: Monitor, text: "macOS 12.0 Monterey or later" },
      { icon: MemoryStick, text: "8 GB RAM minimum" },
      { icon: HardDrive, text: "500 MB available space" },
    ],
  },
  windows: {
    name: "Windows",
    icon: WindowsIcon,
    version: "2.4.1",
    size: "142 MB",
    filename: "CodrexAI-2.4.1-win.exe",
    requirements: [
      { icon: Cpu, text: "64-bit processor" },
      { icon: Monitor, text: "Windows 10/11 (64-bit)" },
      { icon: MemoryStick, text: "8 GB RAM minimum" },
      { icon: HardDrive, text: "500 MB available space" },
    ],
  },
};

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "All processing happens locally. Your data never leaves your device.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Native performance with GPU acceleration for real-time AI responses.",
  },
  {
    icon: RefreshCw,
    title: "Auto Updates",
    description: "Automatic updates ensure you always have the latest features and fixes.",
  },
];

export default function DownloadPage() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("windows");
  const [isDownloading] = useState(false);

  // Detect user's platform
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mac")) {
      setSelectedPlatform("macos");
    } else {
      setSelectedPlatform("windows");
    }
  }, []);

  const platform = platformData[selectedPlatform];

  const handleDownload = () => {
    // Redirect to pricing — user must purchase before downloading
    navigate("/pricing");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Download className="h-3 w-3 mr-1" />
              Version {platform.version}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Download{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Codrex AI
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the desktop app for the best interview coaching experience.
              Available for macOS and Windows.
            </p>
          </div>

          {/* Platform Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedPlatform("macos")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedPlatform === "macos"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <Apple className={`h-6 w-6 ${selectedPlatform === "macos" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <div className={`font-semibold ${selectedPlatform === "macos" ? "text-foreground" : "text-muted-foreground"}`}>
                  macOS
                </div>
                <div className="text-xs text-muted-foreground">Intel & Apple Silicon</div>
              </div>
            </button>
            <button
              onClick={() => setSelectedPlatform("windows")}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedPlatform === "windows"
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <WindowsIcon className={`h-6 w-6 ${selectedPlatform === "windows" ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-left">
                <div className={`font-semibold ${selectedPlatform === "windows" ? "text-foreground" : "text-muted-foreground"}`}>
                  Windows
                </div>
                <div className="text-xs text-muted-foreground">Windows 10/11</div>
              </div>
            </button>
          </div>

          {/* Download Card */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 mb-12 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan-500/5 pointer-events-none" />
            
            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* App Logo */}
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-cyan-400 shadow-lg shadow-primary/25">
                <Code2 className="h-12 w-12 text-white" />
              </div>

              {/* Download Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Codrex AI for {platform.name}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground">
                  <span>Version {platform.version}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span>{platform.size}</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span>{platform.filename}</span>
                </div>
              </div>

              {/* Download Button */}
              <Button
                size="lg"
                onClick={handleDownload}
                disabled={isDownloading}
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 shadow-lg shadow-primary/25"
              >
                {isDownloading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Preparing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Now
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* System Requirements */}
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              System Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {platform.requirements.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50"
                >
                  <req.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{req.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Installation Steps */}
          <div className="p-8 rounded-3xl bg-card border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Installation Guide
            </h3>
            <div className="space-y-4">
              {selectedPlatform === "macos" ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Download the DMG file</p>
                      <p className="text-sm text-muted-foreground">Click the download button above to get CodrexAI-{platform.version}-mac.dmg</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Open the DMG</p>
                      <p className="text-sm text-muted-foreground">Double-click the downloaded file to mount the disk image</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Drag to Applications</p>
                      <p className="text-sm text-muted-foreground">Drag the Codrex AI icon to your Applications folder</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Launch & Activate</p>
                      <p className="text-sm text-muted-foreground">Open Codrex AI from Applications and enter your license key</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Download the installer</p>
                      <p className="text-sm text-muted-foreground">Click the download button above to get CodrexAI-{platform.version}-win.exe</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Run the installer</p>
                      <p className="text-sm text-muted-foreground">Double-click the .exe file and follow the installation wizard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Complete setup</p>
                      <p className="text-sm text-muted-foreground">Choose your installation directory and complete the setup</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Launch & Activate</p>
                      <p className="text-sm text-muted-foreground">Open Codrex AI from the Start menu and enter your license key</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Help Link */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Need help?{" "}
              <a href="/faq" className="text-primary hover:underline">
                Check our FAQ
              </a>{" "}
              or{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact support
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
