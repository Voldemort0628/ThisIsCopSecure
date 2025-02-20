"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Zap, Mail } from "lucide-react";
import { signUp } from "@/lib/auth";
import { UserRole } from "@/lib/supabase/database.types";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<number>(0); // 0 for user, 1 for provider
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await signUp(
        formData.email,
        formData.password,
        role === 0 ? 'user' as UserRole : 'provider' as UserRole,
        formData.name
      );
      
      setShowConfirmation(true);
      toast({
        title: "Success",
        description: "Account created successfully. Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <Zap className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">CopSecure</span>
          </Link>

          <div className="provider-card rounded-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Mail className="h-8 w-8 text-pink-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a confirmation link to <span className="text-pink-500">{formData.email}</span>. 
              Please check your email and click the link to activate your account.
            </p>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try signing in to resend the confirmation.
              </p>
              <Link href="/login">
                <Button className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                  Continue to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <Zap className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">CopSecure</span>
          </Link>
          
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Join the most advanced ACO marketplace
          </p>
          
          <div className="provider-card rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white/5"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-white/5"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Account Type</Label>
                <div className="space-y-2">
                  <Slider
                    value={[role]}
                    onValueChange={([value]) => setRole(value)}
                    max={1}
                    step={1}
                    className="[&>.cursor]:hover:cursor-pointer [&>.cursor]:hover:scale-110 [&>.cursor]:transition-transform [&>.cursor]:duration-200"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className={role === 0 ? "text-pink-500 font-medium" : ""}>User</span>
                    <span className={role === 1 ? "text-pink-500 font-medium" : ""}>Provider</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-pink-500 hover:text-pink-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}