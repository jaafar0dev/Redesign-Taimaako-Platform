import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Home,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: ClientData;
  onNext: () => void;
}

export function ClientServiceExecution({ data, onNext }: Props) {
  const [serviceStatus, setServiceStatus] = useState<
    "scheduled" | "in-progress" | "completed"
  >("scheduled");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate service progress
    const timer1 = setTimeout(() => {
      setServiceStatus("in-progress");
    }, 2000);

    const timer2 = setTimeout(() => {
      setServiceStatus("completed");
      onNext();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onNext]);

  useEffect(() => {
    if (serviceStatus === "in-progress") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [serviceStatus]);

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
            <span className="font-medium text-green-600">Step 8 of 9</span>
            <span>•</span>
            <span>Service in Progress</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[88%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {serviceStatus === "scheduled" && (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Service Scheduled!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your first session is confirmed for this {data.preferredDays[0]}
            </p>

            {/* Worker Card */}
            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4 text-left">
                Your Worker
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <ImageWithFallback
                    src={data.assignedWorker?.photo || ""}
                    alt={data.assignedWorker?.name || ""}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-xl">
                    {data.assignedWorker?.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">
                      {data.assignedWorker?.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Session Details */}
            <Card className="p-6 mb-6">
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-600 capitalize">
                      {data.preferredTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">{data.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Options */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="h-auto py-4">
                <Phone className="w-5 h-5 mr-2" />
                Call Worker
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                You'll receive an SMS when{" "}
                {data.assignedWorker?.name.split(" ")[0]} arrives at your
                location.
              </p>
            </div>
          </div>
        )}

        {serviceStatus === "in-progress" && (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Service in Progress
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {data.assignedWorker?.name} is currently working at your home
            </p>

            <Card className="p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Session Progress</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Time Elapsed</span>
                  <span className="font-semibold">
                    {Math.floor((progress / 100) * data.duration * 60)} min of{" "}
                    {data.duration * 60} min
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {data.assignedWorker?.name} checked in at{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </Card>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="h-auto py-4">
                <Phone className="w-5 h-5 mr-2" />
                Contact Worker
              </Button>
              <Button variant="outline" className="h-auto py-4">
                <MessageCircle className="w-5 h-5 mr-2" />
                Message Support
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                We'll notify you when the session is complete. You can track
                progress in real-time.
              </p>
            </div>
          </div>
        )}

        {serviceStatus === "completed" && (
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Service Completed!
            </h1>
            <p className="text-lg text-gray-600">
              {data.assignedWorker?.name} has finished the {data.duration}-hour
              session
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
