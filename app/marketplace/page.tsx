"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Star, Clock, Bot, ChevronLeft, ChevronRight, Calendar, Store, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BookingModal } from "@/components/booking-modal";

// Mock data for services
const mockServices = [
  {
    id: 1,
    type: "site",
    name: "Nike ACO Elite",
    provider: "FastCop Elite",
    verified: true,
    rating: 4.9,
    reviews: 234,
    price: 49.99,
    successRate: "98.5%",
    sites: ["Nike"],
    duration: "30 days",
    availableSlots: "8/20",
    region: "US/EU",
    description: "Premium Nike ACO service with proven success rate",
    botUsed: "Cyber"
  },
  {
    id: 2,
    type: "drop",
    name: "Supreme SS24 Week 1",
    provider: "SupremeCop Pro",
    verified: true,
    rating: 4.8,
    reviews: 156,
    price: 39.99,
    successRate: "97.2%",
    dropDate: "2024-02-22",
    availableSlots: "15/50",
    region: "US",
    description: "Dedicated Supreme Week 1 drop service",
    botUsed: "Valor"
  },
  {
    id: 3,
    type: "drop",
    name: "Hellstar x Nike SB",
    provider: "EliteCop",
    verified: true,
    rating: 4.9,
    reviews: 189,
    price: 44.99,
    successRate: "96.8%",
    dropDate: "2024-03-15",
    availableSlots: "12/40",
    region: "US/EU",
    description: "Exclusive Hellstar x Nike SB drop service",
    botUsed: "Kodai"
  },
  {
    id: 4,
    type: "site",
    name: "Footsites Master",
    provider: "SneakerBot Pro",
    verified: true,
    rating: 4.7,
    reviews: 312,
    price: 54.99,
    successRate: "95.5%",
    sites: ["Footlocker", "Champs", "Eastbay"],
    duration: "30 days",
    availableSlots: "20/50",
    region: "US",
    description: "Comprehensive Footsites ACO service",
    botUsed: "NSB"
  },
  {
    id: 5,
    type: "drop",
    name: "Jordan 4 Frozen Moments",
    provider: "JordanCop Elite",
    verified: true,
    rating: 4.9,
    reviews: 267,
    price: 49.99,
    successRate: "97.8%",
    dropDate: "2024-03-21",
    availableSlots: "25/100",
    region: "US/EU/ASIA",
    description: "Specialized Jordan 4 release service",
    botUsed: "Wrath"
  },
  {
    id: 6,
    type: "drop",
    name: "Pokemon TCG Crown Zenith",
    provider: "CardCop Pro",
    verified: true,
    rating: 4.6,
    reviews: 143,
    price: 34.99,
    successRate: "94.5%",
    dropDate: "2024-03-28",
    availableSlots: "30/75",
    region: "US/EU",
    description: "Pokemon TCG release day service",
    botUsed: "Stellar"
  },
  {
    id: 7,
    type: "site",
    name: "Shopify Complete",
    provider: "ShopMaster Elite",
    verified: true,
    rating: 4.8,
    reviews: 423,
    price: 59.99,
    successRate: "96.2%",
    sites: ["All Shopify Sites"],
    duration: "30 days",
    availableSlots: "15/40",
    region: "Global",
    description: "Complete Shopify sites coverage",
    botUsed: "Balko"
  },
  {
    id: 8,
    type: "drop",
    name: "Travis Scott x Nike",
    provider: "HypeCop Elite",
    verified: true,
    rating: 4.9,
    reviews: 512,
    price: 69.99,
    successRate: "98.1%",
    dropDate: "2024-04-05",
    availableSlots: "10/50",
    region: "US/EU",
    description: "Exclusive Travis Scott collaboration release",
    botUsed: "Kodai"
  },
  {
    id: 9,
    type: "site",
    name: "Yeezy Supply Pro",
    provider: "YeezyCop Master",
    verified: true,
    rating: 4.7,
    reviews: 289,
    price: 44.99,
    successRate: "95.8%",
    sites: ["Yeezy Supply"],
    duration: "30 days",
    availableSlots: "18/45",
    region: "US",
    description: "Dedicated Yeezy Supply ACO service",
    botUsed: "Wrath"
  },
  {
    id: 10,
    type: "drop",
    name: "Pokemon TCG Temporal Forces",
    provider: "PokeCop Elite",
    verified: true,
    rating: 4.8,
    reviews: 167,
    price: 39.99,
    successRate: "96.5%",
    dropDate: "2024-04-12",
    availableSlots: "40/100",
    region: "US/EU",
    description: "Pokemon TCG expansion release service",
    botUsed: "Stellar"
  }
];

export default function Marketplace() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minSuccessRate, setMinSuccessRate] = useState(80);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRanked, setTopRanked] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [serviceType, setServiceType] = useState<'all' | 'site' | 'drop' | null>('all');
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const toggleBot = (bot: string) => {
    setSelectedBots(prev => 
      prev.includes(bot) 
        ? prev.filter(b => b !== bot)
        : [...prev, bot]
    );
  };

  const toggleServiceType = (type: 'site' | 'drop') => {
    setServiceType(prev => prev === type ? 'all' : type);
  };

  const handleBookNow = (service: any) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    router.push("/booking/success");
  };

  // Empty state component
  const EmptyState = () => (
    <div className="empty-state">
      <Store className="empty-state-icon" />
      <h3 className="text-lg font-semibold mb-2">No Services Found</h3>
      <p className="text-muted-foreground text-sm max-w-md">
        Try adjusting your filters or check back later for new services.
      </p>
    </div>
  );

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8 flex gap-8">
        {/* Sidebar */}
        <aside className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-72'} sticky top-24 h-[calc(100vh-6rem)]`}>
          <Card className="provider-card h-full rounded-lg p-6">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-4 top-8 h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              {sidebarCollapsed ? 
                <ChevronRight className="h-4 w-4 text-white" /> : 
                <ChevronLeft className="h-4 w-4 text-white" />
              }
            </button>

            {!sidebarCollapsed && (
              <div className="h-full overflow-y-auto pr-2 space-y-8 custom-scrollbar">
                {/* Service Type Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Service Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleServiceType('site')}
                      className={cn(
                        "w-full provider-card transition-all duration-200",
                        serviceType === 'site' && "filter-button-active"
                      )}
                    >
                      <Store className="mr-2 h-4 w-4" /> Site
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toggleServiceType('drop')}
                      className={cn(
                        "w-full provider-card transition-all duration-200",
                        serviceType === 'drop' && "filter-button-active"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" /> Drop
                    </Button>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Success Rate */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Minimum Success Rate</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[minSuccessRate]}
                      onValueChange={([value]) => setMinSuccessRate(value)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-pink-500" />
                        {minSuccessRate}% or higher
                      </span>
                    </div>
                  </div>
                </div>

                {/* Region */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Region</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {["US", "EU", "UK", "ASIA"].map((region) => (
                      <Button
                        key={region}
                        variant="outline"
                        onClick={() => toggleRegion(region)}
                        className={cn(
                          "w-full provider-card transition-all duration-200",
                          selectedRegions.includes(region) && "filter-button-active"
                        )}
                      >
                        {region}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Bot Type */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Bot Type</h3>
                  <div className="space-y-2">
                    {["Alpine", "Cyber", "Valor", "NSB", "Make", "Refract"].map((bot) => (
                      <Button
                        key={bot}
                        variant="outline"
                        onClick={() => toggleBot(bot)}
                        className={cn(
                          "w-full justify-start provider-card transition-all duration-200",
                          selectedBots.includes(bot) && "filter-button-active"
                        )}
                      >
                        <Bot className="mr-2 h-4 w-4" /> {bot}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Provider Status */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Provider Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between provider-card p-3 rounded-lg hover:border-pink-500/50 transition-colors duration-200">
                      <label className="text-sm cursor-pointer">Verified Only</label>
                      <Switch
                        checked={verifiedOnly}
                        onCheckedChange={setVerifiedOnly}
                        className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                      />
                    </div>
                    <div className="flex items-center justify-between provider-card p-3 rounded-lg hover:border-pink-500/50 transition-colors duration-200">
                      <label className="text-sm cursor-pointer">Top Ranked</label>
                      <Switch
                        checked={topRanked}
                        onCheckedChange={setTopRanked}
                        className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Premium ACO Services</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Access elite providers with proven success rates. Real-time availability
              and instant booking.
            </p>
            
            <div className="grid grid-cols-3 gap-8 mt-8 w-full max-w-3xl">
              <div className="stat-card rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-500">97.8%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="stat-card rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-500">500+</div>
                <div className="text-sm text-muted-foreground">Active Providers</div>
              </div>
              <div className="stat-card rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-500">10K+</div>
                <div className="text-sm text-muted-foreground">Daily Checkouts</div>
              </div>
            </div>
          </div>

          {/* Services list */}
          <div className="space-y-4">
            {mockServices.length === 0 ? (
              <EmptyState />
            ) : (
              mockServices.map((service) => (
                <Card key={service.id} className="provider-card rounded-lg p-6 hover:border-pink-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                        {service.type === 'site' ? (
                          <Store className="h-6 w-6 text-pink-500" />
                        ) : (
                          <Calendar className="h-6 w-6 text-pink-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          {service.verified && (
                            <span className="px-2 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-500 border border-pink-500/20">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>{service.rating}</span>
                          <span>·</span>
                          <span>{service.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-pink-500">
                        ${service.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {service.type === 'site' ? 'per month' : 'per slot'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                      <div className="success-rate text-2xl font-bold">{service.successRate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        {service.type === 'site' ? 'Duration' : 'Drop Date'}
                      </div>
                      <div className="text-2xl font-bold">
                        {service.type === 'site' ? service.duration : new Date(service.dropDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Region</div>
                      <div className="text-2xl font-bold">{service.region}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Available Slots</div>
                      <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                      </div>
                      <div className="text-sm mt-1">{service.availableSlots}</div>
                    </div>
                    <div className="text-right">
                      <Button 
                        className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                        onClick={() => handleBookNow(service)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add the BookingModal component */}
      {selectedService && (
        <BookingModal
          open={showBookingModal}
          onOpenChange={setShowBookingModal}
          serviceName={selectedService.name}
          onSuccess={handleBookingSuccess}
        />
      )}
    </main>
  );
}