import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Home, ArrowLeft } from "lucide-react";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: Partial<WorkerData>;
  onNext: (data: Partial<WorkerData>) => void;
  onBack: () => void;
}

const ROLES = [
  {
    id: "cleaner",
    title: "Cleaner",
    emoji: "🧹",
    description: "House cleaning, tidying, and general housekeeping",
    rate: "₦3,000 - ₦4,500/hour",
  },
  {
    id: "cook",
    title: "Cook",
    emoji: "👨‍🍳",
    description: "Meal preparation, cooking, and kitchen management",
    rate: "₦4,000 - ₦5,500/hour",
  },
  {
    id: "nanny",
    title: "Nanny / Caregiver",
    emoji: "👶",
    description: "Childcare, elderly care, and companionship",
    rate: "₦3,500 - ₦5,000/hour",
  },
];

export function WorkerRoleSelection({ data, onNext, onBack }: Props) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(
    data.roles || [],
  );

  const toggleRole = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      setSelectedRoles(selectedRoles.filter((id) => id !== roleId));
    } else {
      setSelectedRoles([...selectedRoles, roleId]);
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

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-green-600">Step 1 of 6</span>
            <span>•</span>
            <span>Select Role</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[16%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            What role are you applying for?
          </h1>
          <p className="text-lg text-gray-600">
            You can select multiple roles if you have different skills
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role.id);

            return (
              <Card
                key={role.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  isSelected
                    ? "border-2 border-green-600 bg-green-50"
                    : "border-2 border-transparent"
                }`}
                onClick={() => toggleRole(role.id)}
              >
                <div className="text-center">
                  <div className="flex justify-between items-start mb-4">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRole(role.id)}
                    />
                  </div>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">{role.emoji}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {role.description}
                  </p>
                  <p className="text-green-600 font-semibold">{role.rate}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {selectedRoles.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="font-medium text-green-900">
              {selectedRoles.length} role{selectedRoles.length > 1 ? "s" : ""}{" "}
              selected
            </p>
            <p className="text-sm text-green-700 mt-1">
              {ROLES.filter((r) => selectedRoles.includes(r.id))
                .map((r) => r.title)
                .join(", ")}
            </p>
          </div>
        )}

        <Button
          size="lg"
          onClick={handleNext}
          disabled={selectedRoles.length === 0}
          className="w-full sm:w-auto sm:px-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
