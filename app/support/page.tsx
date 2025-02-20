"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  FileText,
  ChevronRight,
  Shield,
  Clock,
  DollarSign,
  Bot,
} from "lucide-react";

const faqs = [
  {
    question: "What is CopSecure?",
    answer: "CopSecure is a premium ACO (Automated Checkout) marketplace connecting users with verified providers for secure, reliable checkout services."
  },
  {
    question: "How do I get started?",
    answer: "Simply create an account, browse available services in the marketplace, and select a provider that matches your needs. You can filter by site, success rate, and more."
  },
  {
    question: "Are providers verified?",
    answer: "Yes, all providers undergo a thorough verification process including proof of success, experience validation, and ongoing performance monitoring."
  },
  {
    question: "What happens if a checkout fails?",
    answer: "While success rates vary by drop, our providers maintain high standards. Specific refund policies are listed on each provider's service page."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach our support team 24/7 through the help center, email, or Discord. Premium users get priority support access. Feel free to reach out to support@copsecure.com if you need any help."
  }
];

export default function Support() {
  const handleEmailSupport = () => {
    window.location.href = "mailto:support@copsecure.com?subject=Support Request - CopSecure";
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-muted-foreground">
              Get the support you need, when you need it
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <Card className="provider-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Live Chat Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7 for premium users
                  </p>
                </div>
              </div>
              <a 
                href="https://discord.gg/aPsT2xkA" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                  Start Chat
                </Button>
              </a>
            </Card>

            <Card className="provider-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Response within 24 hours
                  </p>
                </div>
              </div>
              <Button 
                className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                onClick={handleEmailSupport}
              >
                Send Email
              </Button>
            </Card>
          </div>

          <Card className="provider-card p-8 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="h-5 w-5 text-pink-500" />
              <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Link href="/legal/terms">
              <Card className="provider-card p-6 hover:cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Terms of Service</h3>
                      <p className="text-sm text-muted-foreground">
                        Read our terms
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>

            <Link href="/legal/privacy">
              <Card className="provider-card p-6 hover:cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Privacy Policy</h3>
                      <p className="text-sm text-muted-foreground">
                        View our privacy policy
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}