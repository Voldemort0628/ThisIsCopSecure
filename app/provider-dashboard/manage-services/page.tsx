"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { CustomRequestModal } from "@/components/custom-request-modal";
import { ViewSignupsPanel } from "@/components/view-signups-panel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  Store,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  MessageSquare,
  Clock,
  DollarSign,
  Bot,
  Globe,
  Users,
} from "lucide-react";

// Mock data for services
const mockServices = [
  {
    id: 1,
    type: "site",
    name: "Nike ACO Elite",
    price: 49.99,
    successRate: "98.5%",
    sites: ["Nike"],
    duration: "30 days",
    availableSlots: "8/20",
    region: "US/EU",
    description: "Premium Nike ACO service with proven success rate",
    botUsed: "Cyber",
    active: true
  },
  {
    id: 2,
    type: "drop",
    name: "Supreme SS24 Week 1",
    price: 39.99,
    successRate: "97.2%",
    dropDate: "2024-02-22",
    availableSlots: "15/50",
    region: "US",
    description: "Dedicated Supreme Week 1 drop service",
    botUsed: "Valor",
    active: true
  }
];

// Mock data for custom requests
const mockRequests = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    type: "Custom Drop",
    dropName: "Jordan 4 Military Black",
    botType: "Kodai",
    region: "US/EU",
    successRateExpectation: "90%+",
    profileCount: 5,
    deadline: "2024-03-01",
    details: "Looking for help with the upcoming Jordan 4 Military Black release. Need 5 profiles set up and ready to go.",
    budget: "$50-100",
    status: "pending",
    timestamp: "2024-02-18T10:30:00Z"
  },
  {
    id: 2,
    user: "Jane Smith",
    email: "jane@example.com",
    type: "Bulk Order",
    dropName: "Yeezy Releases Bundle",
    botType: "Wrath",
    region: "US",
    successRateExpectation: "85%+",
    profileCount: 10,
    deadline: "2024-03-15",
    details: "Need assistance with multiple Yeezy releases over the next month. Looking for a provider with proven success rate.",
    budget: "$200-300",
    status: "pending",
    timestamp: "2024-02-18T09:15:00Z"
  }
];

export default function ManageServices() {
  const [services, setServices] = useState(mockServices);
  const [requests] = useState(mockRequests);
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showSignupsPanel, setShowSignupsPanel] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [newService, setNewService] = useState({
    type: "site",
    name: "",
    price: "",
    sites: [],
    duration: "30 days",
    region: "",
    description: "",
    botUsed: "",
    maxSlots: ""
  });

  const handleCreateService = () => {
    // Add service creation logic here
    setShowNewServiceDialog(false);
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleToggleService = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const handleAcceptRequest = (id: number) => {
    // Handle accept logic here
    console.log("Accepted request:", id);
  };

  const handleDeclineRequest = (id: number) => {
    // Handle decline logic here
    console.log("Declined request:", id);
  };

  const handleViewSignups = (service: any) => {
    setSelectedService(service);
    setShowSignupsPanel(true);
  };

  return (
    <main className="min-h-screen premium-gradient pt-20">
      <div className="container py-8">
        <div className="flex flex-col space-y-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Manage Services</h1>
              <p className="text-lg text-muted-foreground">
                Create and manage your ACO services
              </p>
              <Link href="/provider-dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-white/5 mt-2">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
              <DialogTrigger asChild>
                <Button className="glow-button bg-gradient-to-r from-pink-500 to-purple-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Service
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Service</DialogTitle>
                  <DialogDescription>
                    Add a new ACO service to your offerings
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Type</Label>
                      <Select
                        value={newService.type}
                        onValueChange={(value) => setNewService({ ...newService, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="site">Site Service</SelectItem>
                          <SelectItem value="drop">Drop Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        placeholder="e.g., Nike ACO Elite"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Describe your service..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Price (USD)</Label>
                      <Input
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        placeholder="49.99"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Slots</Label>
                      <Input
                        type="number"
                        value={newService.maxSlots}
                        onChange={(e) => setNewService({ ...newService, maxSlots: e.target.value })}
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bot Used</Label>
                      <Select
                        value={newService.botUsed}
                        onValueChange={(value) => setNewService({ ...newService, botUsed: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select bot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kodai">Kodai</SelectItem>
                          <SelectItem value="cyber">Cyber</SelectItem>
                          <SelectItem value="wrath">Wrath</SelectItem>
                          <SelectItem value="valor">Valor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Region</Label>
                      <Select
                        value={newService.region}
                        onValueChange={(value) => setNewService({ ...newService, region: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">US</SelectItem>
                          <SelectItem value="eu">EU</SelectItem>
                          <SelectItem value="us-eu">US/EU</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewServiceDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateService}
                    className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    Create Service
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <Card className="provider-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Store className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Active Services</h2>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                          {service.type === 'site' ? (
                            <Store className="h-5 w-5 text-pink-500" />
                          ) : (
                            <Calendar className="h-5 w-5 text-pink-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Bot className="h-4 w-4" />
                            <span>{service.botUsed}</span>
                            <span>·</span>
                            <Globe className="h-4 w-4" />
                            <span>{service.region}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-pink-500">
                            ${service.price}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {service.type === 'site' ? 'per month' : 'per slot'}
                          </div>
                        </div>
                        <Switch
                          checked={service.active}
                          onCheckedChange={() => handleToggleService(service.id)}
                          className="data-[state=checked]:bg-gradient-to-r from-pink-500 to-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                        <div className="success-rate text-lg font-bold">{service.successRate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {service.type === 'site' ? 'Duration' : 'Drop Date'}
                        </div>
                        <div className="text-lg font-bold">
                          {service.type === 'site' ? service.duration : new Date(service.dropDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Available Slots</div>
                        <div className="text-lg font-bold">{service.availableSlots}</div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewSignups(service)}
                        className="hover:border-pink-500/50 hover:bg-pink-500/5"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        View Signups
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:border-pink-500/50 hover:bg-pink-500/5"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="provider-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Custom Requests</h2>
              </div>

              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{request.type}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {request.details}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-pink-500" />
                        <span>{request.budget}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewRequest(request)}
                        className="hover:border-pink-500/50 hover:bg-pink-500/5"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="provider-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-pink-500" />
                <h2 className="text-xl font-semibold">Service Stats</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="text-sm">Active Services</div>
                  <div className="font-bold">{services.filter(s => s.active).length}</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="text-sm">Total Slots</div>
                  <div className="font-bold">120</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="text-sm">Available Slots</div>
                  <div className="font-bold">43</div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="text-sm">Pending Requests</div>
                  <div className="font-bold">{requests.length}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add the CustomRequestModal */}
      {selectedRequest && (
        <CustomRequestModal
          open={showRequestModal}
          onOpenChange={setShowRequestModal}
          request={selectedRequest}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
        />
      )}

      {/* Add the ViewSignupsPanel */}
      {selectedService && (
        <ViewSignupsPanel
          open={showSignupsPanel}
          onOpenChange={setShowSignupsPanel}
          serviceName={selectedService.name}
        />
      )}
    </main>
  );
}