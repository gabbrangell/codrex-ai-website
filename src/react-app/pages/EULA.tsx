import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Badge } from "@/react-app/components/ui/badge";
import { ScrollText, Calendar, AlertTriangle } from "lucide-react";

const sections = [
  {
    title: "1. License Grant",
    content: `Subject to the terms of this End User License Agreement ("EULA"), Codrex AI Inc. ("Licensor") grants you ("Licensee") a limited, non-exclusive, non-transferable, revocable license to download, install, and use the Codrex AI Copilot software application ("Software") on a single device that you own or control, solely for your personal, non-commercial purposes.`,
  },
  {
    title: "2. License Restrictions",
    content: `You shall not: (a) copy, modify, or distribute the Software; (b) reverse engineer, disassemble, decompile, or attempt to derive the source code of the Software; (c) rent, lease, lend, sell, sublicense, or transfer the Software to any third party; (d) remove, alter, or obscure any proprietary notices on the Software; (e) use the Software in any manner that violates applicable laws or regulations; (f) use the Software to develop competing products or services.`,
  },
  {
    title: "3. Hardware Locking",
    content: `The Software utilizes hardware-based licensing to ensure compliance with this EULA. Upon first activation, the Software will be locked to the specific hardware configuration of your device ("Hardware Lock"). Each license permits installation on one (1) device only. If you need to transfer your license to a new device, you must first deactivate the Hardware Lock through your account dashboard or by contacting support.`,
  },
  {
    title: "4. Subscription and Activation",
    content: `The Software requires an active subscription for full functionality. Your license is valid for the duration of your paid subscription period. Upon subscription expiration or termination, certain features may become unavailable until you renew. You are responsible for maintaining accurate account and payment information to ensure uninterrupted access.`,
  },
  {
    title: "5. Updates and Modifications",
    content: `Licensor may provide updates, patches, or new versions of the Software from time to time. These updates may be installed automatically or may require your action. By using the Software, you consent to the installation of updates. Some updates may modify or remove features or functionality. Licensor is under no obligation to provide updates or to maintain backward compatibility.`,
  },
  {
    title: "6. Data Collection and Privacy",
    content: `The Software may collect certain data to provide and improve the service, including usage analytics, crash reports, and performance metrics. The collection and use of this data is governed by our Privacy Policy, which is incorporated herein by reference. You acknowledge that you have read and understood the Privacy Policy before using the Software.`,
  },
  {
    title: "7. Intellectual Property Rights",
    content: `The Software and all copies thereof are proprietary to Licensor and title thereto remains in Licensor. All rights in the Software not specifically granted in this EULA are reserved to Licensor. The Software is protected by copyright laws, international treaties, and other intellectual property laws. You acknowledge that the Software contains valuable trade secrets of Licensor.`,
  },
  {
    title: "8. Third-Party Components",
    content: `The Software may include third-party software components that are subject to separate license terms. A list of these components and their respective licenses is available in the Software documentation. Your use of these components is governed by the applicable third-party licenses in addition to this EULA.`,
  },
  {
    title: "9. Disclaimer of Warranties",
    content: `THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. LICENSOR DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. LICENSOR DOES NOT WARRANT THAT THE SOFTWARE WILL BE ERROR-FREE OR THAT ITS OPERATION WILL BE UNINTERRUPTED. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SOFTWARE IS WITH YOU.`,
  },
  {
    title: "10. Limitation of Liability",
    content: `IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO LOSS OF DATA, BUSINESS INTERRUPTION, OR LOSS OF PROFITS) ARISING OUT OF OR IN CONNECTION WITH THIS EULA OR THE USE OF THE SOFTWARE, EVEN IF LICENSOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. LICENSOR'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNTS PAID BY YOU FOR THE SOFTWARE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`,
  },
  {
    title: "11. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Licensor and its officers, directors, employees, agents, and successors from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of the Software, your violation of this EULA, or your violation of any rights of any third party.`,
  },
  {
    title: "12. Term and Termination",
    content: `This EULA is effective until terminated. It will terminate automatically if you fail to comply with any term hereof. Upon termination, you must cease all use of the Software and destroy all copies in your possession. Licensor may terminate this EULA at any time with or without cause. Sections 7, 9, 10, 11, and 14 shall survive any termination of this EULA.`,
  },
  {
    title: "13. Export Compliance",
    content: `You agree to comply with all applicable export laws and regulations. You represent and warrant that you are not located in a country subject to a U.S. Government embargo or designated as a "terrorist supporting" country, and that you are not listed on any U.S. Government list of prohibited or restricted parties.`,
  },
  {
    title: "14. Governing Law and Dispute Resolution",
    content: `This EULA shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any dispute arising out of or relating to this EULA shall be resolved exclusively in the state or federal courts located in San Francisco County, California, and you hereby consent to the personal jurisdiction of such courts.`,
  },
  {
    title: "15. Entire Agreement",
    content: `This EULA constitutes the entire agreement between you and Licensor concerning the Software and supersedes all prior agreements, proposals, and representations. No modification of this EULA shall be binding unless in writing and signed by Licensor. If any provision of this EULA is found to be unenforceable, the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: "16. Contact Information",
    content: `If you have questions regarding this EULA, please contact: Codrex AI Inc., Legal Department, 100 Market Street, Suite 500, San Francisco, CA 94105, or email: legal@apexai.com.`,
  },
];

export default function EULAPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <ScrollText className="h-3 w-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              End User License{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Agreement
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: January 15, 2025</span>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mb-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Important Notice</h3>
                <p className="text-sm text-muted-foreground">
                  By installing or using the Codrex AI Copilot software, you agree to be bound by the terms of this 
                  End User License Agreement. If you do not agree to these terms, do not install or use the software.
                </p>
              </div>
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
            <a href="/terms" className="text-primary hover:underline">
              Terms of Service
            </a>
            <span className="text-muted-foreground">•</span>
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
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
