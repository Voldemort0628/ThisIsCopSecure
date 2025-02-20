"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Calendar, DollarSign, Bot, Globe, Clock, AlertTriangle, Users } from "lucide-react";

interface CustomRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: {
    id: number;
    user: string;
    type: string;
    details: string;
    budget: string;
    status: string;
    timestamp: string;
    email?: string;
    dropName?: string;
    botType?: string;
    region?: string;
    successRateExpectation?: string;
    profileCount?: number;
    deadline?: string;
  };
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
}

export function CustomRequestModal({ open, onOpenChange, request, onAccept, onDecline }: CustomRequestModalProps) {
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  const handleAccept = () => {
    onAccept(request.id);
    onOpenChange(false);
  };

  const handleDecline = () => {
    setShowDeclineDialog(true);
  };

  const confirmDecline = () => {
    onDecline(request.id);
    setShowDeclineDialog(false);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Custom Request Details</DialogTitle>
            <DialogDescription>
              Review the request details before accepting or declining.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Requester Info */}
            <div className="space-y-2">
              <h3 className="font-semibold">Requester Information</h3>
              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-white/5">
                <div>
                  <div className="text-sm text-muted-foreground">Username</div>
                  <div className="font-medium">{request.user}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium">{request.email || "Not provided"}</div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Service Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-pink-500" />
                    <div className="text-sm text-muted-foreground">Drop Name</div>
                  </div>
                  <div className="font-medium">{request.dropName || request.type}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="h-4 w-4 text-pink-500" />
                    <div className="text-sm text-muted-foreground">Bot Type</div>
                  </div>
                  <div className="font-medium">{request.botType || "Any"}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-pink-500" />
                    <div className="text-sm text-muted-foreground">Region</div>
                  </div>
                  <div className="font-medium">{request.region || "Not specified"}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-pink-500" />
                    <div className="text-sm text-muted-foreground">Profiles Needed</div>
                  </div>
                  <div className="font-medium">{request.profileCount || "Not specified"}</div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Additional Details</h3>
              <div className="p-4 rounded-lg bg-white/5 space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Request Details</div>
                  <div className="text-sm">{request.details}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Success Rate Expected</div>
                    <div className="font-medium">{request.successRateExpectation || "Not specified"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Deadline</div>
                    <div className="font-medium">{request.deadline || "Flexible"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Offer */}
            <div className="p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-pink-500" />
                <div className="text-sm text-muted-foreground">Payment Offer</div>
              </div>
              <div className="text-xl font-bold">{request.budget}</div>
            </div>
          </div>

          <DialogFooter className="mt-6 space-x-2">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
            >
              Accept Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirm Decline
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDecline}
              className="bg-red-500 hover:bg-red-600"
            >
              Decline Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}