import { useState, useRef, useEffect } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  Minimize2,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const quickReplies = [
  "How does Codrex AI work?",
  "What plans are available?",
  "How do I get started?",
  "Contact support",
];

const aiResponses: Record<string, string> = {
  "how does apex ai work": `Codrex AI Copilot uses advanced AI to provide real-time interview coaching. Simply download the app, start a practice session, and our AI will analyze your responses, giving you feedback on content, delivery, and confidence. The more you practice, the more personalized the coaching becomes!`,
  "what plans are available": `We offer three plans:\n\n• **Starter** ($49/mo) - Perfect for individuals, includes 10 practice sessions/month\n• **Professional** ($99/mo) - For serious job seekers, unlimited sessions + priority support\n• **Enterprise** ($199/mo) - For teams, includes admin dashboard + dedicated support\n\nAll plans include a 7-day free trial!`,
  "how do i get started": `Getting started is easy!\n\n1. Create an account on our website\n2. Choose a subscription plan\n3. Download the desktop app for your platform\n4. Sign in and start your first practice session\n\nYou'll be interview-ready in no time! 🚀`,
  "contact support": `You can reach our support team through:\n\n• **Email**: support@apexai.com\n• **Live Chat**: Available Mon-Fri, 9am-6pm EST\n• **Phone**: +1 (555) 123-4567 (Pro & Enterprise)\n\nOr visit our Contact page for more options!`,
  default: `Thanks for your message! I'm Codrex AI's virtual assistant. I can help you with:\n\n• Learning about our features\n• Pricing and plans\n• Getting started\n• Technical support\n\nFeel free to ask me anything, or type "support" to connect with our team!`,
};

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();
  
  for (const [key, response] of Object.entries(aiResponses)) {
    if (key !== "default" && lowerMessage.includes(key)) {
      return response;
    }
  }
  
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("plan")) {
    return aiResponses["what plans are available"];
  }
  if (lowerMessage.includes("start") || lowerMessage.includes("begin") || lowerMessage.includes("sign up")) {
    return aiResponses["how do i get started"];
  }
  if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("contact")) {
    return aiResponses["contact support"];
  }
  if (lowerMessage.includes("work") || lowerMessage.includes("how") || lowerMessage.includes("what is")) {
    return aiResponses["how does apex ai work"];
  }
  
  return aiResponses["default"];
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm the Codrex AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (reply: string) => {
    sendMessage(reply);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
            isMinimized ? "h-14" : "h-[520px] max-h-[calc(100vh-120px)]"
          }`}
        >
          <div className="h-full flex flex-col rounded-2xl bg-card border border-border/50 shadow-2xl shadow-primary/10 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/20 to-cyan-500/20 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-400">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Codrex AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Minimize2 className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${
                          message.role === "user"
                            ? "bg-primary/20"
                            : "bg-gradient-to-br from-primary to-cyan-400"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-primary" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`flex flex-col ${
                          message.role === "user" ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-2xl max-w-[260px] ${
                            message.role === "user"
                              ? "bg-primary text-white rounded-br-md"
                              : "bg-muted/50 text-foreground rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.content}
                          </p>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 px-1">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-cyan-400">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted/50">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4 border-t border-border/50"
                >
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isTyping}
                      className="bg-gradient-to-r from-primary to-cyan-400 hover:opacity-90"
                    >
                      {isTyping ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 ${
          isOpen
            ? "h-12 w-12 bg-muted hover:bg-muted/80"
            : "h-14 w-14 bg-gradient-to-r from-primary to-cyan-400 hover:shadow-xl hover:shadow-primary/30"
        }`}
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
              <Sparkles className="h-3 w-3" />
            </span>
          </>
        )}
      </button>
    </>
  );
}
