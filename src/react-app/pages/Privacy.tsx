import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Badge } from "@/react-app/components/ui/badge";
import { Shield, Calendar } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    content: `Codrex AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Codrex AI Copilot service ("Service"). Please read this policy carefully to understand our practices.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information you provide directly, including: account information (email, password), payment information (processed securely by Stripe — we never store card numbers), and license activation data. We also automatically collect device hardware fingerprint (for license binding), usage data, and log files. We do not collect screen content, OCR output, or AI responses — all screen analysis runs locally on your device.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use your information to: provide and maintain the Service; process transactions and send license keys; enforce hardware-bound license restrictions; send administrative communications; respond to your inquiries and provide support; analyze aggregate usage patterns to improve the Service; detect and prevent fraud or license abuse; and comply with legal obligations.`,
  },
  {
    title: "4. Screen Data and AI Processing",
    content: `Codrex AI Copilot processes screen content locally on your device. Screen captures, OCR output, and AI-generated responses are processed on your machine and sent only to your chosen AI provider (Anthropic, OpenAI, or Google) under their respective privacy policies. We do not store, log, or transmit your screen content to our servers.`,
  },
  {
    title: "5. Information Sharing",
    content: `We do not sell, rent, or trade your personal information. We may share information with: payment processors (Stripe) for transaction processing; AI providers (Anthropic, OpenAI, Google) for completion requests initiated by you; professional advisors for legal or accounting purposes; and law enforcement when required by law. We never share your practice session content with third parties for marketing purposes.`,
  },
  {
    title: "6. Data Security",
    content: `We implement industry-standard security measures including: TLS encryption for all data in transit; hardware-bound license keys; Row Level Security (RLS) on our database so only your data is accessible to you; and Stripe for PCI-compliant payment processing. While we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your account and license data for as long as your account is active or as needed to provide the Service. License activation records are retained for fraud prevention. After account deletion, we will anonymize or delete personal data within 30 days, except where retention is required by law.`,
  },
  {
    title: "8. Your Rights and Choices",
    content: `You may have rights to: access the personal information we hold about you; correct inaccurate information; delete your personal information; and opt out of marketing communications. To exercise these rights, contact us at privacy@codrexai.com. We will respond within 30 days.`,
  },
  {
    title: "9. Cookies and Tracking",
    content: `We use cookies and similar technologies to: authenticate your sessions; and analyze aggregate usage of our website. You can control cookies through your browser settings. We do not use third-party advertising cookies or sell your browsing data.`,
  },
  {
    title: "10. International Transfers",
    content: `Your information may be transferred to and processed in the United States. By using the Service, you consent to the transfer of your information to the United States. We ensure appropriate safeguards are in place for international transfers where required by applicable law.`,
  },
  {
    title: "11. Children's Privacy",
    content: `The Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you believe we may have collected information from a child, please contact us immediately at privacy@codrexai.com.`,
  },
  {
    title: "12. California Privacy Rights",
    content: `California residents have additional rights under the CCPA, including the right to know what personal information we collect and how we use it, the right to delete personal information, and the right to opt out of the sale of personal information (we do not sell your data). To submit a request, contact us at privacy@codrexai.com.`,
  },
  {
    title: "13. European Privacy Rights",
    content: `If you are in the European Economic Area, you have rights under the GDPR including access, rectification, erasure, data portability, restriction, and objection. Our legal bases for processing include contract performance, legitimate interests, and legal compliance. You may also lodge a complaint with your local supervisory authority.`,
  },
  {
    title: "14. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by email and by posting the new policy on this page with an updated date. Your continued use of the Service after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "15. Contact Us",
    content: `If you have questions about this Privacy Policy or our privacy practices, please contact us at: privacy@codrexai.com. We aim to respond to all privacy inquiries within 5 business days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Privacy{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: April 22, 2026</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">
              We collect only what's needed to run the Service. Your screen content never leaves your device — all AI processing is done locally and sent directly to your AI provider. We never sell your data.
            </p>
          </div>

          {/* Content */}
          <div className="p-8 rounded-3xl bg-card border border-border/50">
            <div className="prose prose-invert max-w-none">
              {sections.map((section, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/eula" className="text-primary hover:underline">
              End User License Agreement
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/contact" className="text-primary hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
