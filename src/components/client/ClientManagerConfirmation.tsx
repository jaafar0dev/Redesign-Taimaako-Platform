import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Home, CheckCircle2, Clock, User, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: ClientData;
  onNext: (data: Partial<ClientData>) => void;
  onBack: () => void;
}

export function ClientManagerConfirmation({ data, onNext, onBack }: Props) {
  const [status, setStatus] = useState<"reviewing" | "confirmed">("reviewing");

  useEffect(() => {
    // Simulate manager review process
    const timer = setTimeout(() => {
      setStatus("confirmed");
      // Update with confirmed price and assigned worker
      onNext({
        confirmedPrice: data.estimatedPrice || 40000,
        assignedWorker: {
          name: "Amina Ibrahim",
          photo:
            "https://images.unsplash.com/photo-1668815092058-12bef53157a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2OTQyNzczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          rating: 4.8,
          experience: "3 years of professional cleaning experience",
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-green-600">Step 6 of 9</span>
            <span>•</span>
            <span>Manager Confirmation</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[66%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {status === "reviewing" ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Clock className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Reviewing your request
              </h1>
              <p className="text-lg text-gray-600">
                Our team is checking worker availability in {data.area}...
              </p>
            </div>

            <Card className="p-6 text-left">
              <h3 className="font-semibold mb-3">What's happening now:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Finding available workers in your area</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Matching based on your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Confirming final pricing</span>
                </li>
              </ul>
            </Card>

            <p className="text-sm text-gray-500 mt-6">
              This usually takes 2-4 hours. We'll send you an SMS when
              confirmed.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                Booking Confirmed!
              </h1>
              <p className="text-lg text-gray-600">
                We've matched you with a qualified professional.
              </p>
            </div>

            {/* Worker Profile */}
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">
                Your Assigned Worker
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <ImageWithFallback
                    src={data.assignedWorker?.photo || ""}
                    alt={data.assignedWorker?.name || "Worker"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-xl">
                    {data.assignedWorker?.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {data.assignedWorker?.rating}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      (128 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-3">
                {data.assignedWorker?.experience}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>Location:</strong> Lives near {data.area} • Short
                  commute time
                </p>
              </div>
            </Card>

            {/* Confirmed Details */}
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Confirmed Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Services:</span>
                  <span className="font-medium capitalize">
                    {data.services.join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Schedule:</span>
                  <span className="font-medium">
                    {data.preferredDays.slice(0, 2).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium capitalize">
                    {data.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {data.duration} hours per visit
                  </span>
                </div>
              </div>
            </Card>

            {/* Final Price */}
            <Card className="p-6 bg-gradient-to-br from-green-600 to-green-700 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">
                    {data.planType === "subscription"
                      ? "Monthly Payment"
                      : "Total Amount"}
                  </p>
                  <p className="text-4xl font-bold">
                    ₦{(data.confirmedPrice || 40000).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-100 mt-2">
                    Pay once, enjoy regular service
                  </p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-200" />
              </div>
            </Card>

            <Button size="lg" onClick={() => onNext({})} className="w-full">
              Proceed to Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
