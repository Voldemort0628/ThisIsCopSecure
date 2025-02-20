"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail } from "lucide-react";
import { signIn } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const { user, profile } = await signIn(email, password);
      
      if (user && profile) {
        // Redirect based on user role
        const redirectPath = profile.role === 'provider' ? '/provider-dashboard' : '/dashboard';
        router.push(redirectPath);
      }
    } catch (error: any) {
      if (error.message.includes('email_not_confirmed')) {
        setShowConfirmation(true);
        toast({
          title: "Email Not Confirmed",
          description: "Please check your email and click the confirmation link before signing in.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <Zap className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-pink-500">CopSecure</span>
          </Link>
          
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2 mb-8">
            Sign in to your account to continue
          </p>
          
          {showConfirmation && (
            <div className="mb-8 p-4 provider-card rounded-lg border border-yellow-500/50 bg-yellow-500/10">
              <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                <Mail className="h-5 w-5" />
                <h3 className="font-semibold">Email Confirmation Required</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Please check your email inbox and click the confirmation link to activate your account.
                If you don't see the email, check your spam folder.
              </p>
            </div>
          )}
          
          <div className="provider-card rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-pink-500 hover:text-pink-400"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-pink-500 hover:text-pink-400"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}