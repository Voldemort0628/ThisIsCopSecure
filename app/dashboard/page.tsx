"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddPaymentDialog } from "@/components/add-payment-dialog";
import {
  Activity,
  Package,
  Clock,
  AlertCircle,
  ChevronRight,
  Zap,
  BarChart3,
  Settings,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {
  const [balance, setBalance] = useState(1234.56);

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, User</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
            <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
              Add Funds
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-2xl font-bold success-rate">96.5%</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Package className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="text-2xl font-bold">1,234</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg. Checkout</div>
                <div className="text-2xl font-bold">3.2s</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Tasks</div>
                <div className="text-2xl font-bold">8</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <Zap className="h-5 w-5 text-pink-500" />
                      <div>
                        <div className="font-medium">Nike Dunk Low</div>
                        <div className="text-sm text-muted-foreground">Successful checkout</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">2 minutes ago</div>
                      <div className="text-sm text-green-500">Success</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="provider-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Performance Overview</h2>
                <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                  Last 30 Days
                </Button>
              </div>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5">
                  View Active Tasks
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5">
                  Manage Providers
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Link href="/dashboard/settings" className="block">
                  <Button variant="outline" className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5">
                    Account Settings
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-muted-foreground">Expires 12/25</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                    Remove
                  </Button>
                </div>
                <AddPaymentDialog />
              </div>
            </Card>

            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Active Providers</h2>
              <div className="space-y-4">
                {[1, 2].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-pink-500" />
                      </div>
                      <div>
                        <div className="font-medium">FastCop Elite</div>
                        <div className="text-xs text-muted-foreground">3 tasks running</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-pink-500/5">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}