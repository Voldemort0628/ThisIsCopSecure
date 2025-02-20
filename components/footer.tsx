"use client";

import Link from "next/link";
import { Zap, Twitter, Linkedin } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useEffect, useState } from "react";
import { Session } from '@supabase/supabase-js';
import { sessionManager } from '@/lib/session-manager';

export function Footer() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      await sessionManager.initialize();
      const currentSession = sessionManager.getCurrentSession();
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

    const { data: { subscription } } = sessionManager.onSessionChange((newSession) => {
      setSession(newSession);
      if (!newSession) {
        setUserRole(null);
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        <div className="grid grid-cols-4 gap-8 pb-12">
          {/* Brand & About */}
          <div className="col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-pink-500" />
              <span className="font-bold text-pink-500">CopSecure</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The most advanced ACO marketplace with verified providers, real-time tracking, and guaranteed success rates.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="https://twitter.com/copsecure" 
                target="_blank"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://discord.gg/copsecure" 
                target="_blank"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <SiDiscord className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/copsecure" 
                target="_blank"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/marketplace"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              {session && (
                <li>
                  <Link 
                    href={userRole === 'provider' ? '/provider-dashboard' : '/dashboard'}
                    className="text-muted-foreground hover:text-pink-500 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  href="/about"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/support"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/legal/terms"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/privacy"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/refund"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/legal/cookies"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/support"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:support@copsecure.com"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Email Support
                </Link>
              </li>
              <li>
                <Link 
                  href="https://discord.gg/copsecure"
                  target="_blank"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Discord Community
                </Link>
              </li>
              <li>
                <Link 
                  href="/provider-faq"
                  className="text-muted-foreground hover:text-pink-500 transition-colors"
                >
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 CopSecure. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link 
                href="/legal/terms"
                className="hover:text-pink-500 transition-colors"
              >
                Terms
              </Link>
              <span>·</span>
              <Link 
                href="/legal/privacy"
                className="hover:text-pink-500 transition-colors"
              >
                Privacy
              </Link>
              <span>·</span>
              <Link 
                href="/legal/cookies"
                className="hover:text-pink-500 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}