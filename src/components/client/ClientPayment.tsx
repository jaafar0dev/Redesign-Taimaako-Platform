import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Home,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle2,
  Copy,
} from "lucide-react";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: ClientData;
  onNext: () => void;
  onBack: () => void;
}

export function ClientPayment({ data, onNext, onBack }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<
    "transfer" | "card" | "ussd"
  >("transfer");
  const [copied, setCopied] = useState(false);

  const amount = data.confirmedPrice || 40000;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("1234567890");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-green-600">Step 7 of 9</span>
            <span>•</span>
            <span>Payment</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[77%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Complete Payment
          </h1>
          <p className="text-lg text-gray-600">
            Pay once for your{" "}
            {data.planType === "subscription"
              ? "monthly subscription"
              : "service"}
          </p>
        </div>

        {/* Amount Summary */}
        <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-1">Amount to Pay</p>
              <p className="text-5xl font-bold">₦{amount.toLocaleString()}</p>
              {data.planType === "subscription" && (
                <p className="text-sm text-green-100 mt-2">
                  Monthly subscription • {data.frequency}x per week
                </p>
              )}
            </div>
            <CreditCard className="w-16 h-16 text-green-200" />
          </div>
        </Card>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">Select Payment Method</h3>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(v) => setPaymentMethod(v as any)}
          >
            <div className="space-y-3">
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  paymentMethod === "transfer"
                    ? "border-2 border-green-600 bg-green-50"
                    : ""
                }`}
                onClick={() => setPaymentMethod("transfer")}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Building2 className="w-6 h-6 text-green-600" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Bank Transfer</div>
                    <div className="text-sm text-gray-500">
                      Instant confirmation
                    </div>
                  </Label>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-2 border-green-600 bg-green-50"
                    : ""
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-6 h-6 text-green-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Card Payment</div>
                    <div className="text-sm text-gray-500">
                      Debit or Credit Card
                    </div>
                  </Label>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-all ${
                  paymentMethod === "ussd"
                    ? "border-2 border-green-600 bg-green-50"
                    : ""
                }`}
                onClick={() => setPaymentMethod("ussd")}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="ussd" id="ussd" />
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <Label htmlFor="ussd" className="flex-1 cursor-pointer">
                    <div className="font-semibold">USSD Code</div>
                    <div className="text-sm text-gray-500">
                      Dial from your phone
                    </div>
                  </Label>
                </div>
              </Card>
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details */}
        {paymentMethod === "transfer" && (
          <Card className="p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Transfer to:</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-500">Bank Name</Label>
                <p className="font-semibold text-lg">GTBank</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Account Number</Label>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-2xl">1234567890</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAccount}
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Account Name</Label>
                <p className="font-semibold text-lg">Taimaako Services Ltd</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">Amount</Label>
                <p className="font-semibold text-2xl text-green-600">
                  ₦{amount.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900">
                <strong>Important:</strong> After transfer, click "I've Paid"
                below. Your payment will be confirmed within minutes.
              </p>
            </div>
          </Card>
        )}

        {paymentMethod === "card" && (
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="bg-white mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="bg-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="bg-white mt-2" />
                </div>
              </div>
            </div>
          </Card>
        )}

        {paymentMethod === "ussd" && (
          <Card className="p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Dial USSD Code:</h3>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
              <p className="text-3xl font-bold text-gray-900">*737*1*Amount#</p>
            </div>
            <ol className="space-y-2 text-gray-600">
              <li className="flex gap-2">
                <span className="font-semibold">1.</span>
                <span>Dial the code from your registered phone number</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">2.</span>
                <span>Enter amount: {amount}</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">3.</span>
                <span>Follow prompts to complete payment</span>
              </li>
            </ol>
          </Card>
        )}

        <Button size="lg" onClick={onNext} className="w-full">
          {paymentMethod === "transfer" ? "I've Paid" : "Pay Now"}
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Secure payment • Your money is protected
        </p>
      </div>
    </div>
  );
}
