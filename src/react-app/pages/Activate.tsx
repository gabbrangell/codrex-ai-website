import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Button } from "@/react-app/components/ui/button";
import { CheckCircle2, Copy, Download, Apple } from "lucide-react";

const BACKEND = "https://codrex-ai-production.up.railway.app";

export default function ActivatePage() {
  const [searchParams] = useSearchParams();
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session");

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    let attempts = 0;
    const tryFetch = () => {
      fetch(`${BACKEND}/api/activate?session=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.licenseKey) { setLicenseKey(data.licenseKey); setLoading(false); }
          else if (attempts < 5) { attempts++; setTimeout(tryFetch, 3000); }
          else setLoading(false);
        })
        .catch(() => { if (attempts < 5) { attempts++; setTimeout(tryFetch, 3000); } else setLoading(false); });
    };
    tryFetch();
  }, [sessionId]);

  function copyKey() {
    if (!licenseKey) return;
    navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground mb-8">
            Thank you for purchasing Codrex AI. Your license key is below — copy it and use it to activate the app.
          </p>

          {loading ? (
            <div className="h-16 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : licenseKey ? (
            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Your License Key</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-xl font-mono font-bold text-primary tracking-widest">
                  {licenseKey}
                </code>
                <Button size="sm" variant="outline" onClick={copyKey}>
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <p className="text-sm text-muted-foreground">
                Your license key has been sent to your email. Check your inbox (and spam folder) for a message from Codrex AI.
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            Download the app, open it, and enter your license key to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://github.com/gabbrangell/Codrex-AI/releases/download/v1.0.2/Codrex AI_1.0.2_aarch64.dmg">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90">
                <Apple className="mr-2 h-4 w-4" />
                Download for macOS
              </Button>
            </a>
            <a href="https://github.com/gabbrangell/Codrex-AI/releases/download/v1.0.2/Codrex AI_1.0.2_x64-setup.exe">
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download for Windows
              </Button>
            </a>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            Need help? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
