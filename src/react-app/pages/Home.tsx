import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import {
  Zap,
  Shield,
  MonitorSmartphone,
  Sparkles,
  MessageSquare,
  BrainCircuit,
  Users,
  Target,
  
  Play,
  Apple,
  ArrowRight,
  ChevronRight,
  Star,
} from "lucide-react";

const stats = [
  { icon: Zap, label: "Fast Setup", value: "< 2 min", description: "Get started in minutes" },
  { icon: Shield, label: "Secure", value: "100%", description: "Privacy-first design" },
  { icon: MonitorSmartphone, label: "Desktop Ready", value: "2", description: "macOS & Windows" },
];

const features = [
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description: "Practice with AI-powered mock interviews tailored to your target role and company.",
  },
  {
    icon: Sparkles,
    title: "Real-time Coaching",
    description: "Get live suggestions and feedback with our intelligent overlay during actual interviews.",
  },
  {
    icon: Target,
    title: "STAR Templates",
    description: "Structured answer templates following the STAR method for behavioral questions.",
  },
  {
    icon: Users,
    title: "Seniority-Aware",
    description: "Answers calibrated for Junior, Mid, and Senior level expectations.",
  },
  {
    icon: BrainCircuit,
    title: "AI Model Selection",
    description: "Choose from multiple AI models optimized for different interview types.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your interview data stays local. We never store your conversations.",
  },
];

const aiModels = [
  {
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Best for comprehensive technical explanations and system design discussions.",
    badge: "Most Popular",
    speed: "Fast",
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Excellent for nuanced behavioral questions and detailed code reviews.",
    badge: "Recommended",
    speed: "Fast",
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    description: "Great for multi-modal analysis and complex problem-solving scenarios.",
    badge: null,
    speed: "Fast",
  },
  {
    name: "GPT-o1",
    provider: "OpenAI",
    description: "Advanced reasoning for complex algorithmic problems and optimization.",
    badge: "Advanced",
    speed: "Slower",
  },
];

const steps = [
  {
    number: "01",
    title: "Add Context",
    description: "Enter the company, job description, and your seniority level to customize coaching.",
  },
  {
    number: "02",
    title: "Choose Mode",
    description: "Select mock interview for practice or live coaching for real interviews.",
  },
  {
    number: "03",
    title: "Get Answers",
    description: "Receive structured responses with technical depth and actionable feedback.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior SWE @ Google",
    content: "Codrex AI helped me prepare for my Google L5 interviews. The STAR templates were incredibly helpful for behavioral rounds.",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Tech Lead @ Stripe",
    content: "The real-time coaching overlay is a game-changer. It's like having a mentor in your corner during tough interviews.",
    avatar: "MJ",
  },
  {
    name: "Emily Zhang",
    role: "ML Engineer @ OpenAI",
    content: "Finally, an interview prep tool that understands technical nuance. The seniority-aware answers are spot on.",
    avatar: "EZ",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Interview Coaching</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-foreground">AI Interview Coaching</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              for Engineers
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10">
            Get real-time AI assistance during live coding interviews with Private Mode. Practice mock interviews, receive structured answers, and ace technical rounds at top tech companies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing">
              <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 shadow-lg shadow-primary/25 group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#demo">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base group">
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get interview-ready in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
                )}
                <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  <div className="text-5xl font-bold bg-gradient-to-br from-primary/20 to-cyan-500/20 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to give you an edge in technical interviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Section */}
      <section id="technology" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <BrainCircuit className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powered by Leading AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose Your AI Model
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Codrex AI integrates with the world's most advanced language models. 
              Switch between models based on your interview needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiModels.map((model, index) => (
              <div
                key={index}
                className="relative group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                {model.badge && (
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary">
                    {model.badge}
                  </div>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{model.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{model.provider}</p>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded-full ${model.speed === 'Fast' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {model.speed}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            All models included with your subscription. No per-token charges.
          </p>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">See It In Action</h2>
            <p className="text-lg text-muted-foreground">
              2-minute walkthrough of the full workflow
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border/50 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm border border-border/50 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="h-8 w-8 text-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Demo Video</span>
              <span>2:34</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Availability Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Available on Desktop
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Codrex AI runs natively on macOS and Windows. Enjoy a seamless, 
                privacy-first experience with our desktop application. No browser extensions, 
                no cloud processing—everything happens locally on your machine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/download">
                  <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 group w-full sm:w-auto">
                    <Apple className="mr-2 h-5 w-5" />
                    Download for macOS
                  </Button>
                </Link>
                <Link to="/download">
                  <Button size="lg" variant="outline" className="h-12 px-6 w-full sm:w-auto">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 5.548l7.062-0.96v6.817h-7.062v-5.857zM3 18.452l7.062 0.96v-6.695h-7.062v5.735zM10.906 19.548l10.094 1.452v-8.283h-10.094v6.831zM10.906 4.452v6.831h10.094v-8.283l-10.094 1.452z"/>
                    </svg>
                    Download for Windows
                  </Button>
                </Link>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">System Requirements:</p>
                <ul className="space-y-1">
                  <li>• macOS 12.0 or later (Intel or Apple Silicon)</li>
                  <li>• Windows 10 or later (64-bit)</li>
                  <li>• 8GB RAM minimum, 16GB recommended</li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-border/50 flex items-center justify-center">
                <MonitorSmartphone className="h-32 w-32 text-primary/50" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-gradient-to-br from-primary to-cyan-400 blur-2xl opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Loved by Engineers
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of engineers who landed their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cyan-400 text-background font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the plan that works for you. No hidden fees, no surprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Professional Plan */}
            <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300">
              <h3 className="text-xl font-semibold text-foreground mb-2">Professional</h3>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">£59</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Unlimited mock interviews
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Real-time coaching overlay
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  All AI models included
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Priority support
                </li>
              </ul>
              <Link to="/pricing">
                <Button variant="outline" className="w-full">
                  Get Professional
                </Button>
              </Link>
            </div>

            {/* Lifetime Plan */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-cyan-400 text-xs font-semibold text-background">
                Best Value
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Lifetime</h3>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">£499</span>
                <span className="text-muted-foreground">one-time</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground mb-8">
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Everything in Professional
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  Lifetime access
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  All future updates
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="h-4 w-4 text-primary" />
                  VIP support
                </li>
              </ul>
              <Link to="/pricing">
                <Button className="w-full bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90">
                  Get Lifetime Access
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Secure checkout powered by Stripe
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of engineers who've leveled up their interview skills with Codrex AI.
          </p>
          <Link to="/pricing">
            <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90 shadow-lg shadow-primary/25">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
