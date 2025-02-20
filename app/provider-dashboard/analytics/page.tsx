"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronLeft,
  BarChart3,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for analytics
const analyticsData = {
  revenue: {
    total: 12458.32,
    change: 23.5,
    trend: "up"
  },
  orders: {
    total: 156,
    change: 12.8,
    trend: "up"
  },
  successRate: {
    value: 97.8,
    change: -1.2,
    trend: "down"
  },
  avgOrderValue: {
    value: 79.86,
    change: 8.4,
    trend: "up"
  },
  recentTransactions: [
    {
      id: 1,
      service: "Nike ACO Elite",
      customer: "John D.",
      amount: 49.99,
      status: "success",
      date: "2024-02-18T10:30:00Z"
    },
    {
      id: 2,
      service: "Supreme Week 1",
      customer: "Mike R.",
      amount: 39.99,
      status: "success",
      date: "2024-02-18T10:15:00Z"
    },
    {
      id: 3,
      service: "Yeezy Drop",
      customer: "Sarah M.",
      amount: 59.99,
      status: "success",
      date: "2024-02-18T10:00:00Z"
    },
    {
      id: 4,
      service: "Nike ACO Elite",
      customer: "Alex K.",
      amount: 49.99,
      status: "failed",
      date: "2024-02-18T09:45:00Z"
    },
    {
      id: 5,
      service: "Pokemon TCG",
      customer: "Emma L.",
      amount: 34.99,
      status: "success",
      date: "2024-02-18T09:30:00Z"
    }
  ],
  topServices: [
    {
      name: "Nike ACO Elite",
      revenue: 4892.50,
      orders: 98,
      successRate: 98.5
    },
    {
      name: "Supreme Week 1",
      revenue: 3199.20,
      orders: 80,
      successRate: 97.2
    },
    {
      name: "Yeezy Drop",
      revenue: 2999.50,
      orders: 50,
      successRate: 96.8
    }
  ]
};

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        {/* Header Section */}
        <div className="flex flex-col space-y-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/provider-dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-white/5">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px] bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Analytics Overview</h1>
            <p className="text-muted-foreground">
              Track your performance metrics and revenue growth
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <Card className="stat-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="text-2xl font-bold">${analyticsData.revenue.total.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className={`flex items-center ${analyticsData.revenue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.revenue.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{analyticsData.revenue.change}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Orders Card */}
          <Card className="stat-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Orders</div>
                  <div className="text-2xl font-bold">{analyticsData.orders.total}</div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className={`flex items-center ${analyticsData.orders.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.orders.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{analyticsData.orders.change}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Success Rate Card */}
          <Card className="stat-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="text-2xl font-bold success-rate">{analyticsData.successRate.value}%</div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className={`flex items-center ${analyticsData.successRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.successRate.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(analyticsData.successRate.change)}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Average Order Value Card */}
          <Card className="stat-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                  <div className="text-2xl font-bold">${analyticsData.avgOrderValue.value}</div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className={`flex items-center ${analyticsData.avgOrderValue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {analyticsData.avgOrderValue.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">{analyticsData.avgOrderValue.change}%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="col-span-2 space-y-6">
            <Card className="provider-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-pink-500" />
                  <h2 className="text-xl font-semibold">Performance Overview</h2>
                </div>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="w-[180px] bg-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="successRate">Success Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </Card>

            <Card className="provider-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-pink-500" />
                  <h2 className="text-xl font-semibold">Recent Transactions</h2>
                </div>
                <Button variant="outline" className="hover:border-pink-500/50 hover:bg-pink-500/5">
                  View All
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="space-y-4">
                {analyticsData.recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-pink-500" />
                      </div>
                      <div>
                        <div className="font-medium">{transaction.service}</div>
                        <div className="text-sm text-muted-foreground">{transaction.customer}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="font-medium">${transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'success' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="provider-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Top Services</h2>
              </div>

              <div className="space-y-4">
                {analyticsData.topServices.map((service, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="text-sm success-rate">{service.successRate}%</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="mr-2">Revenue:</span>
                        <span className="font-medium text-foreground">
                          ${service.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="mr-2">Orders:</span>
                        <span className="font-medium text-foreground">
                          {service.orders}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="provider-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Growth Trends</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-sm text-muted-foreground mb-2">Monthly Growth</div>
                  <div className="text-2xl font-bold text-green-500">+23.5%</div>
                  <div className="text-sm text-muted-foreground">vs. last month</div>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-sm text-muted-foreground mb-2">Customer Retention</div>
                  <div className="text-2xl font-bold text-pink-500">89%</div>
                  <div className="text-sm text-muted-foreground">repeat customers</div>
                </div>

                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-sm text-muted-foreground mb-2">Market Position</div>
                  <div className="text-2xl font-bold">#3</div>
                  <div className="text-sm text-muted-foreground">in provider rankings</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}