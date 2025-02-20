"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function RefundPolicy() {
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
            <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. General Policy</h2>
                <p className="text-muted-foreground">
                  CopSecure is committed to ensuring customer satisfaction. Our refund policy is designed to be fair to both customers and providers while maintaining the integrity of our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Eligibility for Refunds</h2>
                <p className="text-muted-foreground mb-4">Refunds may be issued in the following cases:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Service not delivered as described</li>
                  <li>Technical issues preventing service delivery</li>
                  <li>Provider cancellation before service delivery</li>
                  <li>Unauthorized transactions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
                <p className="text-muted-foreground mb-4">To request a refund:</p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Contact support within 24 hours of the incident</li>
                  <li>Provide order details and reason for refund</li>
                  <li>Submit any relevant evidence</li>
                  <li>Wait for review (typically 1-3 business days)</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Cases</h2>
                <p className="text-muted-foreground mb-4">Refunds are not available for:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Successful service delivery</li>
                  <li>User error or misunderstanding</li>
                  <li>Requests made after 24 hours</li>
                  <li>Violation of terms of service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Refund Methods</h2>
                <p className="text-muted-foreground">
                  Refunds are processed to the original payment method. Processing time may vary depending on your payment provider (typically 5-10 business days).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Disputes</h2>
                <p className="text-muted-foreground">
                  If you disagree with a refund decision, you may appeal within 7 days. Appeals are reviewed by our senior support team.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
                <p className="text-muted-foreground">
                  For refund-related questions, please contact us at support@copsecure.com
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