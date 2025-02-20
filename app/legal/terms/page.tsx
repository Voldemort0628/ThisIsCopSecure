"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground">
                  Welcome to CopSecure. By accessing or using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>"Service" refers to CopSecure's platform and services</li>
                  <li>"User" refers to anyone who uses our Service</li>
                  <li>"Provider" refers to verified ACO service providers on our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
                <p className="text-muted-foreground mb-4">
                  Users must:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate information</li>
                  <li>Maintain account security</li>
                  <li>Comply with all applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Provider Obligations</h2>
                <p className="text-muted-foreground mb-4">
                  Providers must:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Maintain high success rates</li>
                  <li>Provide accurate service descriptions</li>
                  <li>Respond to customer inquiries promptly</li>
                  <li>Comply with platform policies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
                <p className="text-muted-foreground">
                  All payments are processed securely through our platform. Providers receive payment after successful service delivery, subject to our standard processing times and fees.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-4">
                  Users may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Violate any laws or regulations</li>
                  <li>Impersonate others</li>
                  <li>Distribute malware or viruses</li>
                  <li>Engage in fraudulent activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend accounts that violate these terms or for any other reason at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We may modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these terms, please contact us at legal@copsecure.com
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