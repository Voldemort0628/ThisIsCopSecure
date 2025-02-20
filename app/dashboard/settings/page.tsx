"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AddPaymentDialog } from "@/components/add-payment-dialog";
import {
  CreditCard,
  Webhook,
  Bell,
  Shield,
  Key,
  User,
  Mail,
  Lock,
  AlertTriangle,
  ChevronLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    discord: true,
    browser: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityVisibility: "friends",
    showSuccessRate: true,
  });
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveWebhook = async () => {
    setLoading(true);
    // Add webhook saving logic here
    setTimeout(() => setLoading(false), 1000);
  };

  const handleTestWebhook = async () => {
    setLoading(true);
    // Add webhook testing logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-white/5">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account preferences and settings
            </p>
          </div>
          <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Settings Column */}
          <div className="col-span-2 space-y-6">
            {/* Profile Section */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-pink-500" />
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                </div>
                <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input className="bg-white/5" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input className="bg-white/5" placeholder="johndoe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input className="bg-white/5" type="email" placeholder="john@example.com" />
                </div>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Payment Methods</h2>
              </div>
              
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
                  <Button 
                    variant="outline" 
                    className="hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500"
                  >
                    Remove
                  </Button>
                </div>
                <AddPaymentDialog />
              </div>
            </div>

            {/* Privacy Section */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Privacy Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Activity Visibility</Label>
                  <Select 
                    value={privacy.activityVisibility}
                    onValueChange={(value) => setPrivacy({ ...privacy, activityVisibility: value })}
                  >
                    <SelectTrigger className="bg-white/5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Success Rate</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your success rate on your public profile
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showSuccessRate}
                    onCheckedChange={(checked) => setPrivacy({ ...privacy, showSuccessRate: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Notifications Section */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive order updates via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Discord Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via Discord
                    </p>
                  </div>
                  <Switch
                    checked={notifications.discord}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, discord: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive desktop notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.browser}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, browser: checked })}
                    className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Discord Webhook Section */}
            <div className="provider-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Webhook className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Discord Webhook</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Webhook URL</Label>
                  <Input
                    className="bg-white/5"
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    placeholder="https://discord.com/api/webhooks/..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveWebhook}
                    className="flex-1 glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                    disabled={loading}
                  >
                    Save Webhook
                  </Button>
                  <Button
                    onClick={handleTestWebhook}
                    variant="outline"
                    className="flex-1 hover:border-pink-500/50 hover:bg-pink-500/5"
                    disabled={loading}
                  >
                    Test
                  </Button>
                </div>
              </div>
            </div>

            {/* Security Section */}
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
                  <Mail className="mr-2 h-4 w-4" /> Two-Factor Authentication
                </Button>
                <Separator />
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <h3 className="font-semibold">Danger Zone</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Once you delete your account, there is no going back.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30"
                  >
                    Delete Account
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