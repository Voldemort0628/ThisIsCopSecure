"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ChevronLeft } from "lucide-react";

export default function BookingSuccess() {
  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="provider-card p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your order has been successfully placed. You will receive a confirmation email shortly.
            </p>

            <div className="bg-white/5 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-medium">#123456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">Nike ACO Elite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-green-500 font-medium">Processing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="/dashboard">
                <Button className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" className="w-full">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Marketplace
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}