import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Home,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  CheckCircle2,
} from "lucide-react";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: ClientData;
  onNext: () => void;
  onBack: () => void;
}

export function ClientSummary({ data, onNext, onBack }: Props) {
  const calculatePrice = () => {
    const basePrice = 5000;
    const sessionPrice = basePrice * data.duration;
    const monthlyTotal =
      data.planType === "subscription"
        ? sessionPrice * data.frequency * 4
        : sessionPrice;
    return monthlyTotal;
  };

  const estimatedPrice = calculatePrice();

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
            <span className="font-medium text-green-600">Step 5 of 9</span>
            <span>•</span>
            <span>Review Summary</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[55%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Review your booking
          </h1>
          <p className="text-lg text-gray-600">
            Make sure everything looks good before we proceed.
          </p>
        </div>

        <div className="space-y-4">
          {/* Services */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Services</h3>
                <p className="text-gray-600 capitalize">
                  {data.services.join(", ")}
                </p>
              </div>
            </div>
          </Card>

          {/* Plan */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Plan</h3>
                <p className="text-gray-600">
                  {data.planType === "subscription"
                    ? `Subscription: ${data.frequency}x per week, ${data.duration} hours per visit`
                    : `One-time: ${data.duration} hours`}
                </p>
              </div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Schedule</h3>
                <p className="text-gray-600">
                  {data.preferredDays.join(", ")} • {data.preferredTime}
                </p>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Location</h3>
                <p className="text-gray-600">{data.location}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Home: {data.homeSize}
                </p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <User className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p className="text-gray-600">{data.name}</p>
                <p className="text-sm text-gray-500 mt-1">{data.phone}</p>
                {data.email && (
                  <p className="text-sm text-gray-500">{data.email}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">
                  {data.planType === "subscription"
                    ? "Estimated Monthly Cost"
                    : "Total Cost"}
                </p>
                <p className="text-4xl font-bold">
                  ₦{estimatedPrice.toLocaleString()}
                </p>
                <p className="text-sm text-green-100 mt-2">
                  Subject to manager confirmation
                </p>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-200" />
            </div>
          </Card>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-900 font-medium mb-1">
            Next Step: Manager Review
          </p>
          <p className="text-sm text-yellow-800">
            Our team will review your request, check worker availability in your
            area, and confirm the final price within 2-4 hours.
          </p>
        </div>

        <Button
          size="lg"
          onClick={onNext}
          className="w-full sm:w-auto sm:px-12"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
}
