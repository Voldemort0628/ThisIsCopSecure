"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Mail, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmail() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setEmail(session.user.email);
        if (session.user.email_confirmed_at) {
          router.push('/dashboard');
        }
      } else {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  const handleResendEmail = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email!,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Verification email has been resent. Please check your inbox.",
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

  const handleRefresh = () => {
    window.location.reload();
  };

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

          <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
          <p className="text-muted-foreground mb-6">
            We've sent a verification link to <span className="text-pink-500">{email}</span>.
            Please check your email and click the link to verify your account.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="w-full hover:border-pink-500/50 hover:bg-pink-500/5"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            <Button
              onClick={handleResendEmail}
              className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend Verification Email"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Wrong email? <Link href="/login" className="text-pink-500 hover:text-pink-400">Sign in with a different account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}