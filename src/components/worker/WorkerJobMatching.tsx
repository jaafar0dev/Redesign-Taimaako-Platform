import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Home,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: WorkerData;
  onNext: () => void;
}

export function WorkerJobMatching({ data, onNext }: Props) {
  const [status, setStatus] = useState<"reviewing" | "approved">("reviewing");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("approved");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
            <span className="font-medium text-green-600">Step 5 of 6</span>
            <span>•</span>
            <span>Application Review</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[83%] transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {status === "reviewing" ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Reviewing your application
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our team is verifying your details...
            </p>

            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-3">What we're checking:</h3>
              <ul className="space-y-2 text-left text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Verifying your references</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Confirming identity documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Checking available jobs in {data.area}</span>
                </li>
              </ul>
            </Card>

            <p className="text-sm text-gray-500">
              This usually takes 2-3 business days. We'll contact you via phone.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Application Approved!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to Taimaako, {data.name.split(" ")[0]}! We found some jobs
              that match your profile.
            </p>

            <Card className="p-6 mb-4 text-left hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    Cleaning Job in {data.area}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Regular weekly service
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  Perfect Match
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>2.3 km from your location</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>Tuesdays & Thursdays</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>3 hours per visit • Morning</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span>₦12,000 per visit (₦96,000/month)</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-4 text-left hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    Cleaning & Laundry - Wuse 2
                  </h3>
                  <p className="text-sm text-gray-500">One-time service</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>5.1 km away</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span>This Saturday</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>4 hours • Afternoon</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                  <DollarSign className="w-4 h-4" />
                  <span>₦16,000 for 4 hours</span>
                </div>
              </div>
            </Card>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>Next step:</strong> Set up your payment details to start
                accepting jobs.
              </p>
            </div>

            <Button size="lg" onClick={onNext} className="w-full">
              Continue to Payment Setup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
