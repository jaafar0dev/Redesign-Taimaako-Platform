import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Home, CheckCircle2, Calendar, DollarSign } from "lucide-react";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: WorkerData;
  onComplete: () => void;
}

export function WorkerPaymentPreferences({ data, onComplete }: Props) {
  const [paymentFrequency, setPaymentFrequency] = useState<
    "weekly" | "biweekly" | "monthly"
  >("weekly");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (bankName && accountNumber) {
      setSubmitted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const isValid = bankName && accountNumber;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            You're all set!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to Taimaako, {data.name}! You can now start accepting jobs.
          </p>
          <Button size="lg" onClick={onComplete} className="px-12">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-green-600">Step 6 of 6</span>
            <span>•</span>
            <span>Payment Setup</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-full transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Set up your payments
          </h1>
          <p className="text-lg text-gray-600">
            Last step! Tell us how and when you want to get paid.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <Label className="text-lg mb-4 block">Payment Frequency</Label>
            <RadioGroup
              value={paymentFrequency}
              onValueChange={(v) => setPaymentFrequency(v as any)}
            >
              <div className="space-y-3">
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentFrequency === "weekly"
                      ? "border-2 border-green-600 bg-green-50"
                      : ""
                  }`}
                  onClick={() => setPaymentFrequency("weekly")}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <div className="flex-1">
                      <Label
                        htmlFor="weekly"
                        className="cursor-pointer font-semibold"
                      >
                        Weekly
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get paid every Friday
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Recommended</span>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentFrequency === "biweekly"
                      ? "border-2 border-green-600 bg-green-50"
                      : ""
                  }`}
                  onClick={() => setPaymentFrequency("biweekly")}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="biweekly" id="biweekly" />
                    <div className="flex-1">
                      <Label
                        htmlFor="biweekly"
                        className="cursor-pointer font-semibold"
                      >
                        Bi-weekly
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get paid every 2 weeks
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    paymentFrequency === "monthly"
                      ? "border-2 border-green-600 bg-green-50"
                      : ""
                  }`}
                  onClick={() => setPaymentFrequency("monthly")}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <div className="flex-1">
                      <Label
                        htmlFor="monthly"
                        className="cursor-pointer font-semibold"
                      >
                        Monthly
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get paid at end of month
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </RadioGroup>
          </Card>

          <Card className="p-6">
            <Label className="text-lg mb-4 block">Bank Account Details</Label>
            <div className="space-y-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select value={bankName} onValueChange={setBankName}>
                  <SelectTrigger id="bankName" className="mt-2">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="firstbank">First Bank</SelectItem>
                    <SelectItem value="uba">UBA</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="fidelity">Fidelity Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="1234567890"
                  className="mt-2 bg-white"
                  maxLength={10}
                />
              </div>

              {bankName && accountNumber.length === 10 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-800">
                    <strong>Account Name:</strong> {data.name}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
            <h3 className="font-semibold text-lg mb-2">
              Estimated Monthly Earnings
            </h3>
            <p className="text-4xl font-bold mb-2">₦96,000 - ₦150,000</p>
            <p className="text-sm text-green-100">
              Based on 2 jobs per week • 3-4 hours per job
            </p>
          </Card>
        </div>

        <div className="mt-8">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full"
          >
            Complete Setup
          </Button>
          <p className="text-center text-sm text-gray-500 mt-4">
            You can update payment details anytime in settings
          </p>
        </div>
      </div>
    </div>
  );
}
