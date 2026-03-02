import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Badge } from "@/react-app/components/ui/badge";
import { FileText, Calendar } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Codrex AI Copilot ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. We reserve the right to update these Terms at any time, and your continued use of the Service constitutes acceptance of any modifications.`,
  },
  {
    title: "2. Description of Service",
    content: `Codrex AI Copilot is an AI-powered interview coaching platform that provides personalized practice sessions, real-time feedback, and performance analytics. The Service includes desktop applications, web interfaces, and associated tools designed to help users improve their interview skills.`,
  },
  {
    title: "3. User Accounts",
    content: `To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. You must notify us immediately of any unauthorized use of your account.`,
  },
  {
    title: "4. Subscription and Payments",
    content: `The Service offers various subscription plans with different features and pricing. By subscribing, you authorize us to charge your payment method on a recurring basis until you cancel. All fees are non-refundable except as expressly stated in our refund policy. We reserve the right to change our pricing with 30 days' notice to existing subscribers.`,
  },
  {
    title: "5. License and Usage Rights",
    content: `Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial purposes. Each license is tied to a single device through hardware locking. You may not sublicense, sell, rent, or lease the Service to third parties. Multiple simultaneous installations require additional licenses.`,
  },
  {
    title: "6. Prohibited Conduct",
    content: `You agree not to: (a) reverse engineer, decompile, or disassemble the Service; (b) circumvent any security measures or access controls; (c) use the Service for any unlawful purpose; (d) share your account credentials with others; (e) attempt to gain unauthorized access to our systems; (f) use automated tools to access the Service without permission; (g) interfere with other users' enjoyment of the Service.`,
  },
  {
    title: "7. Intellectual Property",
    content: `The Service and all content, features, and functionality are owned by Codrex AI and are protected by international copyright, trademark, patent, and other intellectual property laws. Our trademarks and trade dress may not be used without our prior written permission. All rights not expressly granted are reserved.`,
  },
  {
    title: "8. User Content",
    content: `You retain ownership of any content you submit through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and process such content solely for the purpose of providing and improving the Service. You represent that you have all necessary rights to grant this license.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.`,
  },
  {
    title: "10. Disclaimers",
    content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE DO NOT GUARANTEE ANY SPECIFIC RESULTS FROM USE OF THE SERVICE, INCLUDING BUT NOT LIMITED TO INTERVIEW SUCCESS OR EMPLOYMENT OUTCOMES.`,
  },
  {
    title: "11. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, APEX AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM.`,
  },
  {
    title: "12. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Codrex AI and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising out of your use of the Service, your violation of these Terms, or your violation of any rights of a third party.`,
  },
  {
    title: "13. Termination",
    content: `We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately. All provisions that should survive termination shall survive, including ownership, warranty disclaimers, and limitations of liability.`,
  },
  {
    title: "14. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in San Francisco County, California.`,
  },
  {
    title: "15. Contact Information",
    content: `If you have any questions about these Terms, please contact us at legal@apexai.com or write to us at: Codrex AI Inc., 100 Market Street, Suite 500, San Francisco, CA 94105.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <FileText className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Terms of{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 15, 2025</span>
            </div>
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
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
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
