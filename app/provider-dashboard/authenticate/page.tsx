"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  Shield,
  Bot,
  MessageSquare,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProviderAuthentication() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal & Business Details
    fullName: "",
    businessName: "",
    experience: "",
    preferredBot: "",
    discordUsername: "",
    telegramUsername: "",
    
    // Step 2: Success Proof
    discordWebhook: "",
    botDashboardScreenshot: null,
    successPosts: null,
    
    // Step 3: Experience & Commitment
    experienceDetails: "",
    successRate: "",
    availability: "",
    commitment: ""
  });

  const handleNext = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add submission logic here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <Link href="/provider-dashboard">
            <Button variant="ghost" size="sm" className="hover:bg-white/5">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-pink-500" />
            <h1 className="text-3xl font-bold">Provider Authentication</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete this three-step process to become a verified provider on our platform.
            We take our verification process seriously to ensure the highest quality of service.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex-1 relative ${
                stepNumber < 3 ? "after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:w-full after:h-[2px] after:bg-white/10" : ""
              }`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-pink-500 to-purple-500"
                      : "bg-white/10"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : (
                    <span className="text-white">{stepNumber}</span>
                  )}
                </div>
                <span className="text-sm mt-2 text-muted-foreground">
                  {stepNumber === 1 && "Business Details"}
                  {stepNumber === 2 && "Success Proof"}
                  {stepNumber === 3 && "Experience"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Card className="provider-card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Bot className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Personal & Business Details</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-white/5"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Name</Label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="bg-white/5"
                    placeholder="Your business name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger className="bg-white/5">
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Less than 1 year</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="3+">3+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Bot</Label>
                <Select
                  value={formData.preferredBot}
                  onValueChange={(value) => setFormData({ ...formData, preferredBot: value })}
                >
                  <SelectTrigger className="bg-white/5">
                    <SelectValue placeholder="Select your main bot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kodai">Kodai</SelectItem>
                    <SelectItem value="wrath">Wrath</SelectItem>
                    <SelectItem value="prism">Prism</SelectItem>
                    <SelectItem value="cyber">Cyber</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Discord Username</Label>
                  <Input
                    value={formData.discordUsername}
                    onChange={(e) => setFormData({ ...formData, discordUsername: e.target.value })}
                    className="bg-white/5"
                    placeholder="username#0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telegram Username (Optional)</Label>
                  <Input
                    value={formData.telegramUsername}
                    onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                    className="bg-white/5"
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Success Proof</h2>
              </div>

              <div className="space-y-2">
                <Label>Discord Webhook URL</Label>
                <Input
                  value={formData.discordWebhook}
                  onChange={(e) => setFormData({ ...formData, discordWebhook: e.target.value })}
                  className="bg-white/5"
                  placeholder="https://discord.com/api/webhooks/..."
                />
                <p className="text-sm text-muted-foreground">
                  We'll use this to verify your success posts
                </p>
              </div>

              <div className="space-y-2">
                <Label>Bot Dashboard Screenshots</Label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your dashboard screenshots here, or click to select files
                  </p>
                  <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                    Select Files
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Success Posts</Label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload screenshots of your success posts from Discord
                  </p>
                  <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Experience & Commitment</h2>
              </div>

              <div className="space-y-2">
                <Label>Detailed Experience</Label>
                <Textarea
                  value={formData.experienceDetails}
                  onChange={(e) => setFormData({ ...formData, experienceDetails: e.target.value })}
                  className="bg-white/5 min-h-[150px]"
                  placeholder="Tell us about your experience with botting, including any notable successes or challenges you've overcome..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Average Success Rate</Label>
                  <Select
                    value={formData.successRate}
                    onValueChange={(value) => setFormData({ ...formData, successRate: value })}
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue placeholder="Select success rate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90+">90%+</SelectItem>
                      <SelectItem value="80-90">80-90%</SelectItem>
                      <SelectItem value="70-80">70-80%</SelectItem>
                      <SelectItem value="60-70">60-70%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => setFormData({ ...formData, availability: value })}
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Commitment Statement</Label>
                <Textarea
                  value={formData.commitment}
                  onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                  className="bg-white/5 min-h-[100px]"
                  placeholder="Explain your commitment to providing reliable service and maintaining high success rates..."
                />
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-semibold">Important Note</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you acknowledge that maintaining consistent success rates
                  and providing reliable service is crucial. While we understand that 100% success
                  rates are not always achievable, we expect our providers to maintain high standards
                  and communicate effectively with their customers.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button
                onClick={handleBack}
                variant="outline"
                className="hover:border-pink-500/50 hover:bg-pink-500/5"
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}