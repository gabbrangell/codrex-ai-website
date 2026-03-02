import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Badge } from "@/react-app/components/ui/badge";
import { Shield, Calendar } from "lucide-react";

const sections = [
  {
    title: "1. Introduction",
    content: `Codrex AI Inc. ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Codrex AI Copilot service ("Service"). Please read this policy carefully to understand our practices.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information you provide directly, including: account information (name, email, password), payment information (processed securely by our payment provider), profile information, and content from your practice sessions. We also automatically collect device information, usage data, log files, and cookies. We do not collect sensitive categories of personal data unless explicitly provided by you.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use your information to: provide and maintain the Service; process transactions and send related information; personalize your experience and deliver AI-powered coaching; send administrative communications; respond to your inquiries and provide support; analyze usage patterns to improve the Service; detect, prevent, and address technical issues or fraud; and comply with legal obligations.`,
  },
  {
    title: "4. AI and Machine Learning",
    content: `Our Service uses AI and machine learning to provide personalized coaching. Your practice sessions may be analyzed to generate feedback and improve our models. We implement technical safeguards to protect your data during AI processing. You can request deletion of your practice data at any time. We do not use your personal practice sessions to train models shared with other users without your explicit consent.`,
  },
  {
    title: "5. Information Sharing",
    content: `We do not sell, rent, or trade your personal information. We may share information with: service providers who assist in operating our Service (under strict confidentiality agreements); professional advisors for legal, accounting, or business purposes; law enforcement when required by law; and potential buyers in connection with a merger or acquisition (with notice to you). We never share your practice session content with third parties for marketing purposes.`,
  },
  {
    title: "6. Data Security",
    content: `We implement industry-standard security measures including: AES-256 encryption for data at rest; TLS 1.3 encryption for data in transit; regular security audits and penetration testing; access controls and authentication requirements; and secure data centers with physical security measures. While we strive to protect your information, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as your account is active or as needed to provide the Service. Practice session data is retained for 12 months unless you request earlier deletion. After account deletion, we may retain certain information as required by law or for legitimate business purposes, but we will anonymize or delete it when no longer needed.`,
  },
  {
    title: "8. Your Rights and Choices",
    content: `Depending on your location, you may have rights to: access the personal information we hold about you; correct inaccurate or incomplete information; delete your personal information; export your data in a portable format; opt out of marketing communications; and restrict or object to certain processing. To exercise these rights, contact us at privacy@apexai.com.`,
  },
  {
    title: "9. Cookies and Tracking",
    content: `We use cookies and similar technologies to: remember your preferences; authenticate your sessions; analyze how you use our Service; and improve performance. You can control cookies through your browser settings, but disabling them may affect functionality. We do not respond to Do Not Track signals, but we respect your cookie preferences.`,
  },
  {
    title: "10. International Transfers",
    content: `Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by relevant authorities. By using the Service, you consent to the transfer of your information to the United States and other countries where we operate.`,
  },
  {
    title: "11. Children's Privacy",
    content: `The Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we learn that we have collected information from a child under 16, we will delete that information promptly. If you believe we may have collected information from a child, please contact us immediately.`,
  },
  {
    title: "12. California Privacy Rights",
    content: `California residents have additional rights under the CCPA, including the right to know what personal information we collect and how we use it, the right to delete personal information, the right to opt out of the sale of personal information (we do not sell your data), and the right to non-discrimination for exercising your rights. To submit a request, contact us at privacy@apexai.com.`,
  },
  {
    title: "13. European Privacy Rights",
    content: `If you are in the European Economic Area, you have rights under the GDPR including access, rectification, erasure, data portability, restriction, and objection. Our legal bases for processing include contract performance, legitimate interests, consent, and legal compliance. You may also lodge a complaint with your local supervisory authority.`,
  },
  {
    title: "14. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically. Your continued use of the Service after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "15. Contact Us",
    content: `If you have questions about this Privacy Policy or our privacy practices, please contact us at: privacy@apexai.com, or write to: Codrex AI Inc., Privacy Team, 100 Market Street, Suite 500, San Francisco, CA 94105. For EU residents, you may also contact our Data Protection Officer at dpo@apexai.com.`,
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
              <span>Last updated: January 15, 2025</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">
              We collect only the information necessary to provide our Service. We never sell your data. 
              Your practice sessions are encrypted and private. You can delete your data at any time. 
              Read the full policy below for complete details.
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
