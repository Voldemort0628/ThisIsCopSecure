"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Crown,
  Medal,
  Star,
  Shield,
  Search,
  TrendingUp,
  Trophy,
  Filter,
  ArrowUpRight,
  Bot,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for providers
const providers = [
  {
    id: 1,
    name: "SwiftCop Elite",
    rank: 1,
    rating: 4.9,
    totalOrders: "15,234",
    monthlyScore: 3240,
    tier: "Diamond",
    badge: Crown,
    successRate: "98.7%",
    avgCheckoutTime: "2.8s",
    region: "US/EU",
    botUsed: "Kodai",
    weeklyGrowth: "+12.5%",
    recentSuccesses: [
      { site: "Nike", time: "2m ago" },
      { site: "Supreme", time: "5m ago" },
      { site: "Footlocker", time: "8m ago" }
    ]
  },
  {
    id: 2,
    name: "RapidBot Pro",
    rank: 2,
    rating: 4.8,
    totalOrders: "12,876",
    monthlyScore: 3120,
    tier: "Platinum",
    badge: Medal,
    successRate: "97.8%",
    avgCheckoutTime: "3.1s",
    region: "US/EU",
    botUsed: "Wrath",
    weeklyGrowth: "+8.3%",
    recentSuccesses: [
      { site: "Adidas", time: "3m ago" },
      { site: "Yeezy Supply", time: "7m ago" },
      { site: "Nike", time: "12m ago" }
    ]
  },
  // Add more providers here...
];

const getBadgeColor = (tier: string) => {
  switch (tier) {
    case 'Diamond':
      return 'text-blue-400';
    case 'Platinum':
      return 'text-purple-400';
    case 'Gold':
      return 'text-yellow-400';
    case 'Silver':
      return 'text-gray-400';
    default:
      return 'text-pink-500';
  }
};

export default function Rankings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("all");
  const [sortBy, setSortBy] = useState("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Provider Rankings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and compare the top-performing providers on our platform
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5"
              />
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px] bg-white/5">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="day">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[150px] bg-white/5">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="us">US</SelectItem>
                <SelectItem value="eu">EU</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-[150px] bg-white/5">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="diamond">Diamond</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium text-muted-foreground mb-4">
          <div className="col-span-2">Provider</div>
          <button
            onClick={() => handleSort("monthlyScore")}
            className="flex items-center gap-2 hover:text-foreground"
          >
            Monthly Score
            {sortBy === "monthlyScore" && (
              sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleSort("successRate")}
            className="flex items-center gap-2 hover:text-foreground"
          >
            Success Rate
            {sortBy === "successRate" && (
              sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleSort("totalOrders")}
            className="flex items-center gap-2 hover:text-foreground"
          >
            Total Orders
            {sortBy === "totalOrders" && (
              sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <div>Region</div>
          <div>Growth</div>
        </div>

        {/* Provider List */}
        <div className="space-y-4">
          {providers.map((provider) => {
            const BadgeIcon = provider.badge;
            const badgeColor = getBadgeColor(provider.tier);

            return (
              <Card 
                key={provider.id}
                className="provider-card p-6 hover:cursor-pointer"
              >
                <div className="grid grid-cols-7 gap-4 items-center">
                  {/* Provider Info */}
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center ${badgeColor}`}>
                        <BadgeIcon className="h-6 w-6" />
                      </div>
                      <div className="text-2xl font-bold">#{provider.rank}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{provider.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 ${badgeColor} border border-current`}>
                          {provider.tier}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>{provider.rating}</span>
                        <span>·</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{provider.avgCheckoutTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Score */}
                  <div className="monthly-score text-2xl font-bold">
                    {provider.monthlyScore}
                  </div>

                  {/* Success Rate */}
                  <div className="success-rate text-2xl font-bold">
                    {provider.successRate}
                  </div>

                  {/* Total Orders */}
                  <div className="text-2xl font-bold">
                    {provider.totalOrders}
                  </div>

                  {/* Region */}
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-pink-500" />
                    <span>{provider.region}</span>
                  </div>

                  {/* Growth */}
                  <div className="flex items-center gap-2 text-green-500">
                    <ArrowUpRight className="h-5 w-5" />
                    <span className="text-lg font-bold">{provider.weeklyGrowth}</span>
                  </div>
                </div>

                {/* Expandable Details */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Recent Successes</h4>
                      <div className="space-y-2">
                        {provider.recentSuccesses.map((success, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{success.site}</span>
                            <span className="text-muted-foreground">{success.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-3">Provider Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-pink-500" />
                          <span>Bot Used: {provider.botUsed}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-pink-500" />
                          <span>Average Checkout: {provider.avgCheckoutTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-pink-500" />
                          <span>Tier: {provider.tier}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}