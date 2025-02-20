"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Package, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Zap, 
  BarChart3, 
  Settings, 
  DollarSign,
  Shield,
  Gauge,
  Users,
  Store
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProviderDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      product: "Nike Dunk Low",
      status: "Processing checkout",
      orderNumber: "#1234",
      user: "John Doe",
      price: 49.99,
      timestamp: "2025-02-18T10:30:00Z",
      site: "Nike",
      proxy: "US-DC",
      progress: 75
    },
    {
      id: 2,
      product: "Jordan 4 Retro",
      status: "In queue",
      orderNumber: "#1235",
      user: "Jane Smith",
      price: 59.99,
      timestamp: "2025-02-18T10:29:00Z",
      site: "Footlocker",
      proxy: "US-NY",
      progress: 25
    },
    {
      id: 3,
      product: "Yeezy Boost 350",
      status: "Processing payment",
      orderNumber: "#1236",
      user: "Mike Johnson",
      price: 69.99,
      timestamp: "2025-02-18T10:28:00Z",
      site: "Adidas",
      proxy: "US-CA",
      progress: 90
    }
  ];

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Provider Dashboard</h1>
            <p className="text-muted-foreground">Manage your ACO services</p>
          </div>
          <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
            <DollarSign className="mr-2 h-4 w-4" />
            View Earnings
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-2xl font-bold success-rate">98.5%</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Package className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Active Orders</div>
                <div className="text-2xl font-bold">156</div>
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
                <div className="text-2xl font-bold">2.8s</div>
              </div>
            </div>
          </Card>
          
          <Card className="stat-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-pink-500" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Today's Revenue</div>
                <div className="text-2xl font-bold">$2,845</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    onClick={() => setSelectedOrder(order.id)}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Progress bar */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${order.progress}%` }}
                    />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-xl" />
                    </div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <div className="font-medium">{order.product}</div>
                        <div className="text-sm text-muted-foreground">{order.status}</div>
                      </div>
                    </div>
                    <div className="text-right relative z-10">
                      <div className="text-sm font-medium">{order.orderNumber}</div>
                      <div className="text-sm text-yellow-500">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/provider-dashboard/manage-services" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-200 group h-12"
                  >
                    <div className="flex items-center">
                      <Store className="h-5 w-5 mr-3 group-hover:text-pink-500 transition-colors" />
                      <span className="text-base">Manage Services</span>
                    </div>
                    <ChevronRight className="h-5 w-5 group-hover:text-pink-500 transition-colors" />
                  </Button>
                </Link>
                
                <Link href="/provider-dashboard/analytics" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-200 group h-12"
                  >
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-3 group-hover:text-pink-500 transition-colors" />
                      <span className="text-base">View Analytics</span>
                    </div>
                    <ChevronRight className="h-5 w-5 group-hover:text-pink-500 transition-colors" />
                  </Button>
                </Link>

                <Link href="/provider-dashboard/settings" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-200 group h-12"
                  >
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 group-hover:text-pink-500 transition-colors" />
                      <span className="text-base">Account Settings</span>
                    </div>
                    <ChevronRight className="h-5 w-5 group-hover:text-pink-500 transition-colors" />
                  </Button>
                </Link>

                <Link href="/provider-dashboard/authenticate" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-200 group h-12"
                  >
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 group-hover:text-pink-500 transition-colors" />
                      <span className="text-base">Provider Authentication</span>
                    </div>
                    <ChevronRight className="h-5 w-5 group-hover:text-pink-500 transition-colors" />
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Service Status</h2>
              <div className="space-y-4">
                {[1, 2].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-pink-500" />
                      </div>
                      <div>
                        <div className="font-medium">Nike ACO</div>
                        <div className="text-xs text-muted-foreground">8 slots available</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-green-500">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="provider-card p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <span>New order received</span>
                    <span>2m ago</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Service status updated</span>
                    <span>15m ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment processed</span>
                    <span>1h ago</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={selectedOrder !== null} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Detailed information about this order.
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Order Number</div>
                  <div className="font-medium">{orders.find(o => o.id === selectedOrder)?.orderNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-medium">{orders.find(o => o.id === selectedOrder)?.user}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-medium">${orders.find(o => o.id === selectedOrder)?.price}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Site</div>
                  <div className="font-medium">{orders.find(o => o.id === selectedOrder)?.site}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Proxy Location</div>
                  <div className="font-medium">{orders.find(o => o.id === selectedOrder)?.proxy}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Timestamp</div>
                  <div className="font-medium">
                    {new Date(orders.find(o => o.id === selectedOrder)?.timestamp || "").toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}