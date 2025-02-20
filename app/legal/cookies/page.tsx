"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CookiePolicy() {
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

          <div className="provider-card rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      Required for basic website functionality and security. Cannot be disabled.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Performance Cookies</h3>
                    <p className="text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Functionality Cookies</h3>
                    <p className="text-muted-foreground">
                      Remember your preferences and settings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground">
                      Used to deliver relevant advertisements and track their effectiveness.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Cookies</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Authentication and security</li>
                  <li>Remembering your preferences</li>
                  <li>Analyzing website performance</li>
                  <li>Improving user experience</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Managing Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  You can control cookies through your browser settings. Options typically include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Accepting all cookies</li>
                  <li>Notifying you when cookies are set</li>
                  <li>Rejecting all cookies</li>
                  <li>Deleting cookies periodically</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Third-Party Cookies</h2>
                <p className="text-muted-foreground">
                  Some cookies are set by third-party services we use for analytics, payment processing, and other features. These parties may use the data collected according to their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy periodically. Continued use of our website after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have questions about our Cookie Policy, please contact us at privacy@copsecure.com
                </p>
              </section>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              Last updated: February 18, 2025
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}