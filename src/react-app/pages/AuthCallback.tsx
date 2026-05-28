import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/react-app/lib/supabase";
import { AlertCircle } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [deepLinkUrl, setDeepLinkUrl] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const isDesktop = params.get("desktop") === "1";
        const code = params.get("code");
        const tokenHash = params.get("token_hash");
        const type = params.get("type") as "signup" | "recovery" | "email" | null;

        // Desktop relay: show a button to open the app (auto-redirect is blocked by Chrome).
        if (isDesktop && code) {
          const url = `codrex-ai://auth/callback?code=${encodeURIComponent(code)}`;
          setDeepLinkUrl(url);

          // Try auto-redirect first — works in Safari and some cases in Chrome.
          // If it doesn't work the user will see the button below.
          window.location.href = url;
          return;
        }

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash && type) {
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
          if (error) throw error;
        } else {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (!data.session) throw new Error("No session found");
        }

        navigate("/dashboard");
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("Failed to complete sign in. Please try again.");
      }
    };

    handleCallback();
  }, [navigate]);

  // Desktop app relay: show button to open the app
  if (deepLinkUrl) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <img
            src="https://019c7654-4730-764c-8284-efa1d6013897.mochausercontent.com/codrex-logo-flat-cyan.png"
            alt="Codrex AI"
            className="h-12 w-12 mx-auto mb-5"
          />
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Sign-in complete!
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Click the button below to return to Codrex AI.
          </p>
          <a href={deepLinkUrl} onClick={() => setOpened(true)}>
            <Button className="w-full bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 font-semibold">
              {opened ? "Opening Codrex AI…" : "Open Codrex AI"}
            </Button>
          </a>
          {opened && (
            <p className="mt-4 text-xs text-muted-foreground">
              If the app didn't open, make sure Codrex AI is running and try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">Authentication Failed</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Completing sign in…</p>
      </div>
    </div>
  );
}
