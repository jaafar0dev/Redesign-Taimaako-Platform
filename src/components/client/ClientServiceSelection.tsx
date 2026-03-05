import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Home,
  ArrowLeft,
  Sparkles,
  ChefHat,
  Baby,
  Package,
  Heart,
  Plus,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "../../constants/services";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: Partial<ClientData>;
  onNext: (data: Partial<ClientData>) => void;
  onBack: () => void;
}

const SERVICE_ICONS = {
  cleaning: Sparkles,
  laundry: Package,
  cooking: ChefHat,
  nanny: Baby,
  eldercare: Heart,
} as const;

export function ClientServiceSelection({ data, onNext, onBack }: Props) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    data.services || [],
  );

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleNext = () => {
    if (selectedServices.length > 0) {
      onNext({ services: selectedServices });
    }
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
            <span className="font-medium text-green-600">Step 1 of 9</span>
            <span>•</span>
            <span>Select Services</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[11%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What service do you need?
          </h1>
          <p className="text-lg text-gray-600">
            Select one or more services. You can combine services for the same
            booking.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {SERVICE_CATEGORIES.map((service) => {
            const Icon = SERVICE_ICONS[service.id];
            const isSelected = selectedServices.includes(service.id);

            return (
              <Card
                key={service.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-2 border-green-600 bg-green-50"
                    : "border-2 border-transparent"
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleService(service.id)}
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-green-600" : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${isSelected ? "text-white" : "text-gray-600"}`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{service.name}</h3>
                    </div>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Plus className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">
                  {selectedServices.length} service
                  {selectedServices.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-sm text-green-700">
                  {SERVICE_CATEGORIES.filter((s) =>
                    selectedServices.includes(s.id),
                  )
                    .map((s) => s.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={selectedServices.length === 0}
            className="flex-1 sm:flex-none sm:px-12"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
