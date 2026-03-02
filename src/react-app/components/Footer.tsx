import { Link } from "react-router";
import { Mail, Shield, CreditCard, Monitor } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Pricing", href: "/pricing" },
    { label: "Download", href: "/download" },
    { label: "FAQ", href: "/faq" },
    { label: "Partner Network", href: "/network" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "EULA", href: "/eula" },
  ],
  support: [
    { label: "Contact", href: "/contact" },
    { label: "support@codrexai.com", href: "mailto:support@codrexai.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      {/* Trust Section */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Secure Payments</p>
                <p className="text-xs text-muted-foreground">Powered by Stripe</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Privacy-First</p>
                <p className="text-xs text-muted-foreground">Your data stays yours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-end">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Desktop Ready</p>
                <p className="text-xs text-muted-foreground">macOS & Windows</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src="https://019c7654-4730-764c-8284-efa1d6013897.mochausercontent.com/codrex-logo-flat-cyan.png" 
                alt="Codrex AI Logo" 
                className="h-9 w-9 rounded-lg shadow-lg shadow-primary/25"
              />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Codrex AI
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              AI-powered interview coaching for engineers. Practice, prepare, and land your dream job.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("mailto:") ? (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Codrex AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
