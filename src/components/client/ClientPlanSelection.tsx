import React, { useState } from "react";
import type { FC } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Home,
  ArrowLeft,
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: Partial<ClientData>;
  onNext: (data: Partial<ClientData>) => void;
  onBack: () => void;
}

export function ClientPlanSelection({ data, onNext, onBack }: Props) {
  const [planType, setPlanType] = useState<"subscription" | "onetime">(
    data.planType || "subscription",
  );
  const [frequency, setFrequency] = useState<number>(data.frequency || 2);
  const [duration, setDuration] = useState<number>(data.duration || 3);

  const handleNext = () => {
    onNext({ planType, frequency, duration });
  };

  const calculateMonthlyPrice = () => {
    const basePrice = 5000; // Base price per session
    const sessionPrice = basePrice * duration;
    const monthlyTotal = sessionPrice * frequency * 4; // Approximate monthly
    return monthlyTotal;
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
            <span className="font-medium text-green-600">Step 2 of 9</span>
            <span>•</span>
            <span>Choose Plan</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[22%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Choose your plan
          </h1>
          <p className="text-lg text-gray-600">
            Select a subscription for regular service or book a one-time visit.
          </p>
        </div>

        {/* Plan Type */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Service Type</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card
              className={`p-6 cursor-pointer transition-all ${
                planType === "subscription"
                  ? "border-2 border-green-600 bg-green-50"
                  : "border-2 border-transparent"
              }`}
              onClick={() => setPlanType("subscription")}
            >
              <div className="flex items-start gap-4">
                <RadioGroup
                  value={planType}
                  onValueChange={(v) =>
                    setPlanType(v as "subscription" | "onetime")
                  }
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="subscription" id="subscription" />
                  </div>
                </RadioGroup>
                <div className="flex-1">
                  <Label
                    htmlFor="subscription"
                    className="text-lg font-semibold cursor-pointer"
                  >
                    Subscription
                  </Label>
                  <p className="text-gray-600 mt-1">
                    Regular weekly service. Save up to 20%
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Recommended for households</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              className={`p-6 cursor-pointer transition-all ${
                planType === "onetime"
                  ? "border-2 border-green-600 bg-green-50"
                  : "border-2 border-transparent"
              }`}
              onClick={() => setPlanType("onetime")}
            >
              <div className="flex items-start gap-4">
                <RadioGroup
                  value={planType}
                  onValueChange={(v) =>
                    setPlanType(v as "subscription" | "onetime")
                  }
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="onetime" id="onetime" />
                  </div>
                </RadioGroup>
                <div className="flex-1">
                  <Label
                    htmlFor="onetime"
                    className="text-lg font-semibold cursor-pointer"
                  >
                    One-time Service
                  </Label>
                  <p className="text-gray-600 mt-1">
                    Single visit for one-off needs
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Frequency */}
        {planType === "subscription" && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Frequency per Week</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((freq) => (
                <Card
                  key={freq}
                  className={`p-4 cursor-pointer text-center transition-all ${
                    frequency === freq
                      ? "border-2 border-green-600 bg-green-50"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setFrequency(freq)}
                >
                  <CalendarDays
                    className={`w-8 h-8 mx-auto mb-2 ${frequency === freq ? "text-green-600" : "text-gray-400"}`}
                  />
                  <div className="font-semibold">{freq}x per week</div>
                  {freq === 2 && (
                    <div className="text-xs text-green-600 mt-1">Popular</div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Duration */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Duration per Visit</h3>
          <div className="grid grid-cols-2 gap-4">
            {[3, 4].map((dur) => (
              <Card
                key={dur}
                className={`p-4 cursor-pointer text-center transition-all ${
                  duration === dur
                    ? "border-2 border-green-600 bg-green-50"
                    : "border-2 border-transparent"
                }`}
                onClick={() => setDuration(dur)}
              >
                <Clock
                  className={`w-8 h-8 mx-auto mb-2 ${duration === dur ? "text-green-600" : "text-gray-400"}`}
                />
                <div className="font-semibold">{dur} hours</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Preview */}
        {planType === "subscription" && (
          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Estimated Monthly Cost</p>
                <p className="text-3xl font-bold">
                  ₦{calculateMonthlyPrice().toLocaleString()}
                </p>
                <p className="text-sm text-green-100 mt-2">
                  {frequency}x per week • {duration} hours per visit
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-200" />
            </div>
          </div>
        )}

        <Button
          size="lg"
          onClick={handleNext}
          className="w-full sm:w-auto sm:px-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
