"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Star, 
  Trophy, 
  Activity, 
  Shield, 
  Search, 
  Crown, 
  Medal,
  ActivitySquare,
  Gauge,
  HeadphonesIcon
} from "lucide-react";

// Mock data for providers
const providers = [
  {
    name: "SwiftCop Elite",
    rank: 1,
    rating: 4.9,
    successRate: "98.7%",
    totalOrders: "15,234",
    monthlyScore: 3240,
    tier: "Diamond",
    badge: Crown
  },
  {
    name: "RapidBot Pro",
    rank: 2,
    rating: 4.8,
    successRate: "97.8%",
    totalOrders: "12,876",
    monthlyScore: 3120,
    tier: "Platinum",
    badge: Medal
  },
  {
    name: "HypeCop Master",
    rank: 3,
    rating: 4.8,
    successRate: "97.5%",
    totalOrders: "11,543",
    monthlyScore: 2980,
    tier: "Platinum",
    badge: Medal
  },
  {
    name: "EliteCop",
    rank: 4,
    rating: 4.7,
    successRate: "96.9%",
    totalOrders: "10,234",
    monthlyScore: 2840,
    tier: "Gold",
    badge: Star
  },
  {
    name: "SupremeCop Pro",
    rank: 5,
    rating: 4.7,
    successRate: "96.5%",
    totalOrders: "9,876",
    monthlyScore: 2790,
    tier: "Gold",
    badge: Star
  }
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

// Animated counter hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return count;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllProviders, setShowAllProviders] = useState(false);

  const successRate = useCounter(97);
  const activeProviders = useCounter(500);
  const dailyCheckouts = useCounter(10000);
  const userTrustScore = useCounter(49, 1500);

  // Add mouse move handler for glow effect
  useEffect(() => {
    const cards = document.querySelectorAll('.provider-card');
    
    const handleMouseMove = (e: MouseEvent) => {
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Protected payments and verified providers for peace of mind."
    },
    {
      icon: ActivitySquare,
      title: "Live Tracking",
      description: "Real-time order status updates and success verification."
    },
    {
      icon: Trophy,
      title: "Top Providers",
      description: "Competitive leaderboard and achievement system."
    },
    {
      icon: HeadphonesIcon,
      title: "Fast Support",
      description: "24/7 customer service and dispute resolution."
    }
  ];

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProviders = showAllProviders ? filteredProviders : filteredProviders.slice(0, 5);

  return (
    <main className="min-h-screen premium-gradient">
      <section className="container flex min-h-screen flex-col items-center pt-32 pb-16">
        <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]">
            The Future of <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">ACO</span>
            <br />
            is <span className="text-white">Secure</span>
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Join the most advanced ACO marketplace with verified providers,
            real-time tracking, and guaranteed success rates.
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <Link href="/marketplace">
            <Button 
              size="lg" 
              className="glow-button bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Browse Services
            </Button>
          </Link>
          <Link href="/provider-faq">
            <Button 
              size="lg" 
              variant="outline"
              className="provider-button glow-button border-pink-500/50 hover:bg-transparent"
            >
              Become a Provider
            </Button>
          </Link>
        </div>

        <div id="stats-section" className="mt-24 grid w-full max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Success Rate Card */}
          <div className="stat-card flex flex-col items-center space-y-2 rounded-lg p-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Shield className="h-6 w-6 mb-2 text-pink-500 transform group-hover:scale-110 transition-transform duration-300" />
              <svg className="absolute -top-1 -left-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  fill="none"
                  stroke="url(#success-gradient)"
                  strokeWidth="2"
                  strokeDasharray={`${(successRate / 100) * 94.2} 94.2`}
                  transform="rotate(-90 16 16)"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#c026d3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-3xl font-bold transition-all duration-300 group-hover:scale-110">
              {successRate}%
            </span>
            <span className="text-sm text-muted-foreground">Success Rate</span>
          </div>

          {/* Active Providers Card */}
          <div className="stat-card flex flex-col items-center space-y-2 rounded-lg p-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Trophy className="h-6 w-6 mb-2 text-pink-500 transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-2 -left-2 w-10 h-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="network-grid"></div>
              </div>
            </div>
            <span className="text-3xl font-bold transition-all duration-300 group-hover:scale-110">
              {activeProviders}+
            </span>
            <span className="text-sm text-muted-foreground">Active Providers</span>
          </div>

          {/* Daily Checkouts Card */}
          <div className="stat-card flex flex-col items-center space-y-2 rounded-lg p-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Activity className="h-6 w-6 mb-2 text-pink-500 transform group-hover:scale-110 transition-transform duration-300" />
            <span className="text-3xl font-bold transition-all duration-300 group-hover:scale-110">
              {dailyCheckouts.toLocaleString()}+
            </span>
            <span className="text-sm text-muted-foreground">Daily Checkouts</span>
          </div>

          {/* User Trust Score Card */}
          <div className="stat-card flex flex-col items-center space-y-2 rounded-lg p-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Star className="h-6 w-6 mb-2 text-pink-500 transform group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -left-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="star-rating"></div>
              </div>
            </div>
            <span className="text-3xl font-bold transition-all duration-300 group-hover:scale-110">
              {(userTrustScore / 10).toFixed(1)}/5
            </span>
            <span className="text-sm text-muted-foreground">User Trust Score</span>
          </div>
        </div>

        {/* Why Choose CopSecure Section */}
        <div className="w-full max-w-6xl mt-32 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">CopSecure</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the most advanced and secure ACO marketplace with features designed for your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg p-8 provider-card transition-all duration-300 hover:scale-105"
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-pink-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute -bottom-2 -right-2 h-20 w-20 bg-gradient-to-br from-pink-500/0 via-pink-500/5 to-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 w-full max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Top Ranked Providers</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white/5"
              />
            </div>
          </div>

          <div className="space-y-3">
            {displayedProviders.map((provider, index) => {
              const BadgeIcon = provider.badge;
              const badgeColor = getBadgeColor(provider.tier);

              return (
                <div 
                  key={index}
                  className="provider-card rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center ${badgeColor}`}>
                        <BadgeIcon className="h-5 w-5" />
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
                        <span>{provider.totalOrders} orders</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="monthly-score text-2xl font-bold">
                      {provider.monthlyScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Score</div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProviders.length >= 5 && (
            <div className="mt-6 text-center">
              <Link href="/rankings">
                <Button
                  variant="outline"
                  className="hover:border-pink-500/50 hover:bg-pink-500/5">
                  View All Rankings
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}