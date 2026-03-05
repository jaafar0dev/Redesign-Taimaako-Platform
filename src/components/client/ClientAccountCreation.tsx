import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Home, ArrowLeft, Shield } from "lucide-react";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: Partial<ClientData>;
  onNext: (data: Partial<ClientData>) => void;
  onBack: () => void;
}

export function ClientAccountCreation({ data, onNext, onBack }: Props) {
  const [name, setName] = useState(data.name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [email, setEmail] = useState(data.email || "");

  const handleNext = () => {
    if (name && phone) {
      onNext({ name, phone, email });
    }
  };

  const isValid = name.trim() && phone.trim();

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
            <span className="font-medium text-green-600">Step 4 of 9</span>
            <span>•</span>
            <span>Create Account</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[44%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Create your account
          </h1>
          <p className="text-lg text-gray-600">
            Quick and simple. We'll use this to contact you about your booking.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-lg">
                Full Name *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-lg">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="080XXXXXXXX"
                className="mt-2 bg-white"
              />
              <p className="text-sm text-gray-500 mt-1">
                We'll send booking confirmations via SMS and WhatsApp
              </p>
            </div>

            <div>
              <Label htmlFor="email" className="text-lg">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="mt-2 bg-white"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">
                    Your information is safe
                  </p>
                  <p className="text-sm text-green-700">
                    We use your details only to coordinate service. No passwords
                    required for now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!isValid}
            className="w-full sm:w-auto sm:px-12"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
