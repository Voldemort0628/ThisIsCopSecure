"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Upload, AlertCircle } from "lucide-react";
import { CSVValidator } from "@/lib/csv-validator";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  onSuccess: () => void;
}

export function BookingModal({ open, onOpenChange, serviceName, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferences: "",
    paymentMethod: "",
  });
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvError, setCsvError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv" && !file.name.endsWith('.csv')) {
      setCsvError("Please upload a valid CSV file");
      return;
    }

    // Read and validate the CSV file
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const validationResult = CSVValidator.validateCSV(content);

      if (!validationResult.isValid) {
        setCsvError(validationResult.errors.join('\n'));
        return;
      }

      setCsvFile(file);
      setCsvError(null);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const headers = CSVValidator.REQUIRED_HEADERS.join(',') + '\n';
    const defaultRow = ',,false,,,,,,,true,,,,,,,,,United States,,,,,,,,,United States,\n';
    
    const csvContent = headers + defaultRow;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "copsecure_booking_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvFile) {
      setCsvError("Please upload your AYCD CSV file");
      return;
    }

    setIsSubmitting(true);

    try {
      // Read the CSV file
      const reader = new FileReader();
      reader.onload = async (event) => {
        const content = event.target?.result as string;
        const validationResult = CSVValidator.validateCSV(content);

        if (!validationResult.isValid) {
          setCsvError(validationResult.errors.join('\n'));
          setIsSubmitting(false);
          return;
        }

        // Here you would typically send the validated entries to your backend
        // For now, we'll simulate a successful submission
        setTimeout(() => {
          setIsSubmitting(false);
          onSuccess();
        }, 1500);
      };
      reader.readAsText(csvFile);
    } catch (error) {
      setCsvError("An error occurred while processing your file");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book Service: {serviceName}</DialogTitle>
          <DialogDescription>
            Fill in your details and upload your AYCD CSV file to complete your booking.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Order Preferences</Label>
            <Textarea
              id="preferences"
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
              placeholder="Enter any specific preferences or requirements..."
            />
          </div>

          <div className="space-y-2">
            <Label>AYCD CSV File</Label>
            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {csvFile ? csvFile.name : "Drop your AYCD CSV file here, or click to select"}
                </span>
              </label>
            </div>
            {csvError && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <AlertCircle className="h-4 w-4" />
                <span className="whitespace-pre-line">{csvError}</span>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={downloadTemplate}
              className="w-full mt-2"
            >
              <Download className="h-4 w-4 mr-2" />
              Download AYCD CSV Template
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                <SelectItem value="balance">Account Balance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="glow-button bg-gradient-to-r from-pink-500 to-purple-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}