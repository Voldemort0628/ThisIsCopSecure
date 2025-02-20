"use client";

import { Shield, Zap, Clock, Trophy } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">CopSecure</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            CopSecure is revolutionizing the ACO marketplace by providing a secure, 
            efficient platform connecting users with verified providers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12 mb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center sm:text-left">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center sm:text-left">
              We&apos;re building the future of ACO services by creating a transparent, 
              secure, and efficient marketplace that benefits both providers and users.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-pink-500">500+</div>
                <div className="text-sm text-muted-foreground">Verified Providers</div>
              </div>
              <div className="stat-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-pink-500">97%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="stat-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-pink-500">10K+</div>
                <div className="text-sm text-muted-foreground">Daily Checkouts</div>
              </div>
              <div className="stat-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-pink-500">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg"></div>
            <div className="relative h-full provider-card rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose CopSecure?</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure Transactions</h4>
                    <p className="text-muted-foreground">
                      Every transaction is protected with advanced security measures
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Lightning Fast</h4>
                    <p className="text-muted-foreground">
                      Industry-leading checkout speeds and success rates
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Real-time Tracking</h4>
                    <p className="text-muted-foreground">
                      Monitor your orders and success rates in real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Trophy className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Top Providers</h4>
                    <p className="text-muted-foreground">
                      Access to the most successful and reliable providers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="provider-card rounded-lg p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Security</h3>
              <p className="text-muted-foreground">
                State-of-the-art encryption and security measures to protect your data
              </p>
            </div>
            <div className="provider-card rounded-lg p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Speed</h3>
              <p className="text-muted-foreground">
                Optimized for the fastest possible checkout times
              </p>
            </div>
            <div className="provider-card rounded-lg p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Live tracking and instant notifications for all your orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}