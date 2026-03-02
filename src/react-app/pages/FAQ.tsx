import { useState } from "react";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import { Badge } from "@/react-app/components/ui/badge";
import {
  HelpCircle,
  ChevronDown,
  CreditCard,
  Download,
  Shield,
  Settings,
  Zap,
  Users,
  Search,
} from "lucide-react";
import { Input } from "@/react-app/components/ui/input";

type FAQCategory = {
  name: string;
  icon: React.ElementType;
  questions: { question: string; answer: string }[];
};

const faqCategories: FAQCategory[] = [
  {
    name: "Getting Started",
    icon: Zap,
    questions: [
      {
        question: "What is Codrex AI Copilot?",
        answer:
          "Codrex AI Copilot is an advanced AI-powered interview coaching platform that helps you prepare for job interviews. It uses cutting-edge AI technology to provide real-time feedback, practice questions, and personalized coaching to improve your interview performance.",
      },
      {
        question: "How do I get started with Codrex AI?",
        answer:
          "Getting started is easy! Simply create an account, choose a subscription plan that fits your needs, and download the desktop application for your platform (Windows or macOS). Once installed, log in with your credentials and you're ready to start practicing.",
      },
      {
        question: "What platforms are supported?",
        answer:
          "Codrex AI Copilot is available for both Windows (Windows 10 or later) and macOS (macOS 11 Big Sur or later). We recommend at least 8GB of RAM and a modern processor for the best experience.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "No, we do not offer a free trial at this time. However, we have a 30-day money-back guarantee on all plans, so you can try Codrex AI risk-free.",
      },
    ],
  },
  {
    name: "Pricing & Billing",
    icon: CreditCard,
    questions: [
      {
        question: "What pricing plans are available?",
        answer:
          "We offer two main options: Professional (£59/month) for serious job seekers with full access to all features including real-time coaching and all AI models, or Lifetime (£499 one-time payment) for permanent access with all future updates included.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Absolutely! You can cancel your subscription at any time from your account dashboard. Your access will continue until the end of your current billing period, and you won't be charged again.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express, Discover) as well as PayPal. For Enterprise plans, we also offer invoicing and purchase orders.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with Codrex AI Copilot within the first 30 days of your subscription, contact our support team for a full refund.",
      },
      {
        question: "Are there any discounts for annual billing?",
        answer:
          "Yes! When you choose annual billing, you'll save 20% compared to monthly billing. This means more value for your investment in your career development.",
      },
    ],
  },
  {
    name: "Downloads & Installation",
    icon: Download,
    questions: [
      {
        question: "How do I download Codrex AI Copilot?",
        answer:
          "After purchasing a license, visit the Download page or your Dashboard. Select your platform (Windows or macOS) and click the download button. The installer will download automatically.",
      },
      {
        question: "What are the system requirements?",
        answer:
          "For Windows: Windows 10 or later, Intel Core i5 or equivalent, 8GB RAM minimum (16GB recommended), 500MB storage. For macOS: macOS 11 Big Sur or later, Apple M1 or Intel Core i5, 8GB RAM minimum, 500MB storage.",
      },
      {
        question: "How do I activate my license?",
        answer:
          "After installation, launch the application and sign in with your account credentials. Your license will be automatically activated. Alternatively, you can enter your license key manually in the Settings > License section.",
      },
      {
        question: "Can I install on multiple devices?",
        answer:
          "Each license is tied to a single device through hardware locking. If you need to switch devices, you can reset your hardware lock from your Dashboard. Professional and Enterprise plans include multiple device activations.",
      },
    ],
  },
  {
    name: "Features & Usage",
    icon: Settings,
    questions: [
      {
        question: "What types of interviews does Codrex AI support?",
        answer:
          "Codrex AI supports a wide range of interview types including technical interviews (coding, system design), behavioral interviews (STAR method), case interviews (consulting), and general job interviews. Our AI adapts to your target role and industry.",
      },
      {
        question: "How does the AI coaching work?",
        answer:
          "Our AI analyzes your responses in real-time, providing feedback on content, delivery, confidence, and clarity. It identifies areas for improvement and offers specific suggestions to strengthen your answers. The more you practice, the more personalized the coaching becomes.",
      },
      {
        question: "Can I practice with real interview questions?",
        answer:
          "Yes! Our database includes thousands of real interview questions from top companies across various industries. Questions are regularly updated based on current hiring trends and user feedback.",
      },
      {
        question: "Is my practice data private?",
        answer:
          "Absolutely. Your practice sessions and data are encrypted and stored securely. We never share your personal information or practice data with third parties. See our Privacy Policy for complete details.",
      },
    ],
  },
  {
    name: "Security & Privacy",
    icon: Shield,
    questions: [
      {
        question: "How is my data protected?",
        answer:
          "We use industry-standard AES-256 encryption for all data at rest and TLS 1.3 for data in transit. Our infrastructure is hosted on secure cloud platforms with SOC 2 Type II certification.",
      },
      {
        question: "What is hardware locking?",
        answer:
          "Hardware locking ties your license to a specific device to prevent unauthorized sharing. This is done by creating a unique identifier based on your hardware configuration. You can reset this lock if you change devices.",
      },
      {
        question: "Do you sell or share my data?",
        answer:
          "Never. We do not sell, rent, or share your personal data with third parties. Your practice sessions and personal information are yours alone. We only collect data necessary to provide and improve our services.",
      },
      {
        question: "How do I delete my account and data?",
        answer:
          "You can request complete account and data deletion from your account settings or by contacting support. We'll process your request within 30 days and permanently remove all your data from our systems.",
      },
    ],
  },
  {
    name: "Support & Community",
    icon: Users,
    questions: [
      {
        question: "How can I contact support?",
        answer:
          "You can reach our support team via live chat (available 9am-6pm EST), email at support@apexai.com, or by submitting a ticket through your Dashboard. Professional and Enterprise users also have access to phone support.",
      },
      {
        question: "What is the typical response time?",
        answer:
          "For email and tickets, we typically respond within 24-48 hours. Live chat responses are usually within minutes during business hours. Enterprise customers receive priority support with guaranteed response times.",
      },
      {
        question: "Is there a community or forum?",
        answer:
          "Yes! Join our Discord community to connect with other users, share tips, and get advice. We also have an active presence on LinkedIn and Twitter where we share interview tips and product updates.",
      },
      {
        question: "Do you offer training or onboarding?",
        answer:
          "We provide comprehensive documentation, video tutorials, and a training center with interactive courses. Enterprise customers receive dedicated onboarding sessions and ongoing training support.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-primary"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Filter questions based on search
  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.name === activeCategory)
    : filteredCategories;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <HelpCircle className="h-3 w-3 mr-1" />
              Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about Codrex AI Copilot.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-base"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.name}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.name ? null : category.name
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Sections */}
          {displayCategories.length > 0 ? (
            <div className="space-y-8">
              {displayCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-2xl bg-card border border-border/50 overflow-hidden"
                >
                  <div className="p-6 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <category.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems.has(`${category.name}-${index}`)}
                        onToggle={() => toggleItem(`${category.name}-${index}`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or{" "}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                  }}
                  className="text-primary hover:underline"
                >
                  clear filters
                </button>
              </p>
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-cyan-400 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
