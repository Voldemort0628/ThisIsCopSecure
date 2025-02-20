"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Moon, Sun, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Session } from '@supabase/supabase-js';
import { signOut } from '@/lib/auth';
import { sessionManager } from '@/lib/session-manager';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize session manager and set up listeners
    const initializeAuth = async () => {
      await sessionManager.initialize();
      const currentSession = sessionManager.getCurrentSession();
      console.log('Current session:', currentSession?.user?.id);
      setSession(currentSession);

      if (currentSession?.user) {
        const supabase = sessionManager.getSupabaseClient();
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', currentSession.user.id)
          .single();
        setUserRole(data?.role || null);
      }
    };

    initializeAuth();

    // Set up a listener for session changes
    const { data: { subscription } } = sessionManager.onSessionChange((newSession) => {
      console.log('Session changed:', newSession?.user?.id);
      setSession(newSession);
      if (!newSession) {
        setUserRole(null);
      }
    });

    // Proper cleanup using the subscription object
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSignOut = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show navbar on auth pages
  if (pathname === '/login' || pathname === '/register' || pathname === '/auth/verify-email') {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-pink-500" />
          <span className="font-bold text-pink-500">CopSecure</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/marketplace">
            <Button variant="ghost">Marketplace</Button>
          </Link>
          {session ? (
            <Link href={userRole === 'provider' ? '/provider-dashboard' : '/dashboard'}>
              <Button variant="ghost">Dashboard</Button>
            </Link>
          ) : null}
          <Link href="/about">
            <Button variant="ghost">About</Button>
          </Link>
          <Link href="/support">
            <Button variant="ghost">Support</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          {session ? (
            <Button
              onClick={handleSignOut}
              disabled={isLoading}
              className="text-red-500 hover:text-red-400"
              variant="ghost"
            >
              <LogOut className="h-5 w-5 mr-2" />
              {isLoading ? "Signing out..." : "Sign Out"}
            </Button>
          ) : (
            <Link href="/login">
              <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}