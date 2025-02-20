"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Download, Search, Trash2, AlertTriangle } from "lucide-react";
import { CSVValidator, CSVEntry } from "@/lib/csv-validator";

interface ViewSignupsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
}

// Mock data for signups with AYCD format
const mockSignups: CSVEntry[] = [
  {
    email: "john@example.com",
    profileName: "John Doe",
    onlyOneCheckout: false,
    nameOnCard: "John Doe",
    cardType: "Visa",
    cardNumber: "4242424242424242",
    expirationMonth: "12",
    expirationYear: "2025",
    cvv: "123",
    sameBillingShipping: true,
    shippingName: "John Doe",
    shippingPhone: "1234567890",
    shippingAddress: "123 Main St",
    shippingAddress2: "",
    shippingAddress3: "",
    shippingPostCode: "12345",
    shippingCity: "New York",
    shippingState: "NY",
    shippingCountry: "United States",
    billingName: "John Doe",
    billingPhone: "1234567890",
    billingAddress: "123 Main St",
    billingAddress2: "",
    billingAddress3: "",
    billingPostCode: "12345",
    billingCity: "New York",
    billingState: "NY",
    billingCountry: "United States",
    size: "US 10"
  }
];

export function ViewSignupsPanel({ open, onOpenChange, serviceName }: ViewSignupsPanelProps) {
  const [signups, setSignups] = useState(mockSignups);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedSignup, setSelectedSignup] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleRemoveSignup = (email: string) => {
    setSelectedSignup(email);
    setShowDeleteDialog(true);
  };

  const confirmRemoveSignup = () => {
    if (selectedSignup) {
      setSignups(signups.filter(signup => signup.email !== selectedSignup));
    }
    setShowDeleteDialog(false);
    setSelectedSignup(null);
  };

  const downloadCSV = () => {
    // Use CSVValidator to generate AYCD format CSV
    const csvContent = CSVValidator.generateCSV(signups);
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${serviceName.toLowerCase().replace(/\s+/g, "-")}-aycd.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredAndSortedSignups = signups
    .filter(signup => {
      const matchesSearch = 
        signup.profileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        signup.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.email.localeCompare(b.email);
      }
      return b.email.localeCompare(a.email);
    });

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Service Signups: {serviceName}</DialogTitle>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* Filters and Controls */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={downloadCSV}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export AYCD
                </Button>
              </div>

              <div className="flex gap-4">
                <Select
                  value={sortOrder}
                  onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">A-Z</SelectItem>
                    <SelectItem value="asc">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Signups List */}
            <div className="space-y-4">
              {filteredAndSortedSignups.map((signup) => (
                <div
                  key={signup.email}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div>
                    <div className="font-medium">{signup.profileName}</div>
                    <div className="text-sm text-muted-foreground">{signup.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {signup.shippingAddress}, {signup.shippingCity}, {signup.shippingState}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSignup(signup.email)}
                      className="hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredAndSortedSignups.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No signups found matching your criteria
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Removal
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this user from your service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveSignup}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}