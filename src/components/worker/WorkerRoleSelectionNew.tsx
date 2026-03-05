import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Package,
  ChefHat,
  Baby,
  Heart,
} from "lucide-react";
import { WorkerOnboardingSteps } from "./WorkerOnboardingSteps";
import { SERVICE_CATEGORIES } from "../../constants/services";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: Partial<WorkerData>;
  onNext: (data: Partial<WorkerData>) => void;
  onBack: () => void;
}

const SERVICE_ICONS = {
  cleaning: Sparkles,
  laundry: Package,
  cooking: ChefHat,
  nanny: Baby,
  eldercare: Heart,
} as const;

export function WorkerRoleSelectionNew({ data, onNext, onBack }: Props) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    data.roles || [],
  );

  const toggleRole = (serviceId: string) => {
    if (selectedRoles.includes(serviceId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== serviceId));
    } else {
      setSelectedRoles([...selectedRoles, serviceId]);
    }
  };

  const handleNext = () => {
    if (selectedRoles.length > 0) {
      onNext({ roles: selectedRoles });
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

      {/* Progress Steps */}
      <WorkerOnboardingSteps
        currentStep={1}
        totalSteps={3}
        stepLabels={["Services", "Info", "Verification"]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            What services can you offer?
          </h1>
          <p className="text-gray-600">
            Select all the services you're skilled in (you can select multiple)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {SERVICE_CATEGORIES.map((service) => {
            const Icon =
              SERVICE_ICONS[service.id as keyof typeof SERVICE_ICONS];
            const isSelected = selectedRoles.includes(service.id);

            return (
              <Card
                key={service.id}
                onClick={() => toggleRole(service.id)}
                className={`p-6 cursor-pointer transition-all ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5"
                    : "border-2 border-transparent hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {Icon ? (
                      <Icon className="w-6 h-6" />
                    ) : (
                      <span className="text-2xl">{service.icon}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {service.workerName}
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                      {service.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          +{service.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedRoles.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-primary">
              ✓ {selectedRoles.length} service
              {selectedRoles.length > 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-gray-600 mt-1">
              You'll be matched with clients looking for these services
            </p>
          </div>
        )}

        <Button
          className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
          onClick={handleNext}
          disabled={selectedRoles.length === 0}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </main>
    </div>
  );
}
