import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import {
  Home,
  Star,
  ThumbsUp,
  Calendar,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: ClientData;
  onComplete: () => void;
}

export function ClientPostService({ data, onComplete }: Props) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Thank you for your feedback!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your next session is scheduled for{" "}
            {data.preferredDays[1] || data.preferredDays[0]}
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
            <span className="font-medium text-green-600">Step 9 of 9</span>
            <span>•</span>
            <span>Feedback</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-full transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            How was your experience?
          </h1>
          <p className="text-lg text-gray-600">
            Your feedback helps us maintain quality service
          </p>
        </div>

        {/* Worker Info */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <ImageWithFallback
                src={data.assignedWorker?.photo || ""}
                alt={data.assignedWorker?.name || ""}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Your worker</p>
              <p className="font-semibold text-xl">
                {data.assignedWorker?.name}
              </p>
            </div>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-center">
            Rate your experience
          </h3>
          <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    value <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            {rating === 0 && "Tap a star to rate"}
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent!"}
          </p>
        </Card>

        {/* Feedback */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">
            Additional Comments (Optional)
          </h3>
          <Textarea
            placeholder="Tell us more about your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="bg-white"
          />
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Next Session</p>
                <p className="text-sm text-gray-500">
                  {data.preferredDays[1] || data.preferredDays[0]}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Need Help?</p>
                <p className="text-sm text-gray-500">Contact support</p>
              </div>
            </div>
          </Card>
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full"
        >
          Submit Feedback
        </Button>

        {data.planType === "subscription" && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">
                  Your subscription is active
                </p>
                <p className="text-sm text-green-700 mt-1">
                  {data.assignedWorker?.name} will return{" "}
                  {data.preferredDays[1] || data.preferredDays[0]} at the same
                  time. You can modify or cancel anytime.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
