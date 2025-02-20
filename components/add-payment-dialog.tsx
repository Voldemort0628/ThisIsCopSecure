"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";

export function AddPaymentDialog() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add payment processing logic here
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500">
          Add New Card
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="bg-background border rounded-lg shadow-lg w-full max-w-md mx-auto overflow-hidden"
        style={{ 
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto'
        }}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new credit or debit card to your account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cardData.cvc}
                onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name on Card</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={cardData.name}
              onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              required
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="submit"
              className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <CreditCard className="mr-2 h-4 w-4 animate-pulse" />
                  Processing...
                </div>
              ) : (
                "Add Card"
              )}
            </Button>
          </DialogFooter>
        </form>

        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </DialogContent>
    </Dialog>
  );
}