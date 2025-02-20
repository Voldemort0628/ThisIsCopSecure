"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">We collect information that you provide directly to us:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Account information (name, email, password)</li>
                  <li>Payment information</li>
                  <li>Service usage data</li>
                  <li>Communications with us</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Provide and improve our services</li>
                  <li>Process payments</li>
                  <li>Send notifications and updates</li>
                  <li>Prevent fraud and abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground">
                  We do not sell your personal information. We share information only with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Service providers who assist our operations</li>
                  <li>Law enforcement when required by law</li>
                  <li>Other users as necessary for service delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy-related questions, please contact us at privacy@copsecure.com
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