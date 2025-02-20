"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Wallet,
  MessageSquare,
  Bell,
  Shield,
  Key,
  ChevronLeft,
  AlertTriangle,
  DollarSign,
  Zap,
  Store,
  Clock,
  Settings,
} from "lucide-react";

export default function ProviderSettings() {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    paymentReceived: true,
    feedbackReceived: true,
    serviceAlerts: true
  });
  const [businessHours, setBusinessHours] = useState({
    monday: { start: "09:00", end: "17:00", active: true },
    tuesday: { start: "09:00", end: "17:00", active: true },
    wednesday: { start: "09:00", end: "17:00", active: true },
    thursday: { start: "09:00", end: "17:00", active: true },
    friday: { start: "09:00", end: "17:00", active: true },
    saturday: { start: "10:00", end: "15:00", active: false },
    sunday: { start: "10:00", end: "15:00", active: false }
  });
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    setLoading(true);
    // Add save logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="flex flex-col space-y-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Provider Settings</h1>
              <p className="text-lg text-muted-foreground">
                Manage your business settings and preferences
              </p>
              <Link href="/provider-dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-white/5 mt-2">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <Button 
              onClick={handleSaveChanges}
              className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="col-span-2 space-y-6">
            {/* Business Information */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Business Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input className="bg-white/5" placeholder="Your Business Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select defaultValue="aco">
                      <SelectTrigger className="bg-white/5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aco">ACO Provider</SelectItem>
                        <SelectItem value="reseller">Reseller</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Business Description</Label>
                  <Textarea 
                    className="bg-white/5 min-h-[100px]"
                    placeholder="Describe your business and services..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input className="bg-white/5" type="email" placeholder="support@yourbusiness.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Discord</Label>
                    <Input className="bg-white/5" placeholder="discord.gg/your-server" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Banking */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Payment & Banking</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input className="bg-white/5" placeholder="Enter bank name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select defaultValue="checking">
                      <SelectTrigger className="bg-white/5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input className="bg-white/5" type="password" placeholder="••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Routing Number</Label>
                    <Input className="bg-white/5" type="password" placeholder="•••••••••" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Schedule</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="bg-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <div className="font-medium">Current Balance</div>
                      <div className="text-2xl font-bold">$12,458.32</div>
                    </div>
                  </div>
                  <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                    Withdraw
                  </Button>
                </div>
              </div>
            </div>

            {/* Service Settings */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Store className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Service Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Maximum Concurrent Orders</Label>
                    <Input className="bg-white/5" type="number" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price per Order</Label>
                    <Input className="bg-white/5" type="number" placeholder="49.99" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Supported Sites</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Nike", "Adidas", "Footlocker", "Supreme", "Shopify", "Other"].map((site) => (
                      <div key={site} className="flex items-center space-x-2">
                        <input type="checkbox" id={site} className="rounded border-gray-400" />
                        <Label htmlFor={site}>{site}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Business Hours</Label>
                    <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                      <Clock className="mr-2 h-4 w-4" />
                      Set Hours
                    </Button>
                  </div>
                  
                  {Object.entries(businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-2 rounded bg-white/5">
                      <div className="capitalize">{day}</div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={hours.start}
                            onChange={(e) => setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, start: e.target.value }
                            })}
                            className="w-32 bg-white/5"
                          />
                          <span>-</span>
                          <Input
                            type="time"
                            value={hours.end}
                            onChange={(e) => setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, end: e.target.value }
                            })}
                            className="w-32 bg-white/5"
                          />
                        </div>
                        <Switch
                          checked={hours.active}
                          onCheckedChange={(checked) => setBusinessHours({
                            ...businessHours,
                            [day]: { ...hours, active: checked }
                          })}
                          className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new and updated orders
                    </p>
                  </div>
                  <Switch
                    checked={notifications.orderUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Received</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive payments
                    </p>
                  </div>
                  <Switch
                    checked={notifications.paymentReceived}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReceived: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Feedback Received</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new customer feedback
                    </p>
                  </div>
                  <Switch
                    checked={notifications.feedbackReceived}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, feedbackReceived: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Service Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about service status changes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.serviceAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, serviceAlerts: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Management */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Feedback Management</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-pink-500" />
                      <span className="font-medium">Overall Rating</span>
                    </div>
                    <span className="text-2xl font-bold text-pink-500">4.9</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on 234 reviews
                  </div>
                </div>

                <Button variant="outline" className="w-full hover:border-pink-500/50 hover:bg-pink-500/5">
                  View All Feedback
                </Button>
              </div>
            </div>

            {/* Security */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Security</h2>
              </div>
              
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start hover:border-pink-500/50 hover:bg-pink-500/5"
                >
                  <Key className="mr-2 h-4 w-4" /> Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start hover:border-pink-500/50 hover:bg-pink-500/5"
                >
                  <Settings className="mr-2 h-4 w-4" /> API Settings
                </Button>
                <Separator />
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <h3 className="font-semibold">Danger Zone</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Deactivating your provider account will suspend all active services.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30"
                  >
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}