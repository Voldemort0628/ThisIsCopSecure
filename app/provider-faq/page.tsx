"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Server,
  Bot,
  Globe,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";

const requirements = [
  {
    icon: Bot,
    title: "Bot Requirements",
    items: [
      "Premium bot license (Kodai, Wrath, etc.)",
      "Backup bot recommended",
      "Bot maintenance and updates",
      "Experience with bot configuration"
    ]
  },
  {
    icon: Server,
    title: "Infrastructure",
    items: [
      "High-performance servers",
      "Reliable internet connection",
      "Backup power solutions",
      "Monitoring systems"
    ]
  },
  {
    icon: Globe,
    title: "Proxy Requirements",
    items: [
      "Premium residential proxies",
      "ISP proxies for specific sites",
      "Multiple proxy providers",
      "Regular proxy rotation"
    ]
  },
  {
    icon: DollarSign,
    title: "Financial Investment",
    items: [
      "Bot licenses ($2,000-5,000)",
      "Monthly proxy costs ($300-1,000)",
      "Server costs ($100-500/month)",
      "Operating capital"
    ]
  }
];

const responsibilities = [
  {
    title: "Legal Obligations",
    description: "By offering services through CopSecure, you enter into a binding contract with each customer. You are responsible for maintaining agreed-upon service levels and success rates."
  },
  {
    title: "Service Quality",
    description: "While 100% success isn't guaranteed, you must maintain consistent performance and communicate effectively with customers about potential issues or delays."
  },
  {
    title: "Communication",
    description: "Prompt and professional communication is required. You must be available during drops and respond to customer inquiries within reasonable timeframes."
  },
  {
    title: "Security",
    description: "You are responsible for maintaining secure systems and protecting customer data. Any breach must be reported immediately."
  }
];

export default function ProviderFAQ() {
  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-white/5">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Become a Provider</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Before you begin your journey as a CopSecure provider, please review
              the requirements and responsibilities carefully.
            </p>
          </div>

          <Card className="provider-card p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-pink-500" />
              <h2 className="text-xl font-semibold">Technical Requirements</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <req.icon className="h-5 w-5 text-pink-500" />
                    </div>
                    <h3 className="font-semibold">{req.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {req.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-pink-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          <Card className="provider-card p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="h-5 w-5 text-pink-500" />
              <h2 className="text-xl font-semibold">Provider Responsibilities</h2>
            </div>

            <div className="space-y-6">
              {responsibilities.map((resp, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-semibold mb-2">{resp.title}</h3>
                  <p className="text-sm text-muted-foreground">{resp.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center space-y-6">
            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 inline-block">
              <div className="flex items-center gap-2 text-yellow-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-semibold">Important Notice</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Being a provider requires significant investment in both time and resources.
                Make sure you understand all requirements and responsibilities before proceeding.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Ready to become a provider?
              </p>
              <Link href="/register">
                <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                  Create Provider Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}