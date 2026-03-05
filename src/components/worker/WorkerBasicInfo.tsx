import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { WorkerOnboardingSteps } from "./WorkerOnboardingSteps";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: Partial<WorkerData>;
  onNext: (data: Partial<WorkerData>) => void;
  onBack: () => void;
}

const ABUJA_AREAS = [
  "Maitama",
  "Asokoro",
  "Wuse",
  "Wuse 2",
  "Garki",
  "Garki 2",
  "Gwarimpa",
  "Kubwa",
  "Kuje",
  "Lugbe",
  "Dutse",
  "Apo",
  "Jabi",
  "Utako",
  "Katampe",
  "Jahi",
  "Kado",
  "Life Camp",
  "Lokogoma",
  "Gudu",
];

export function WorkerBasicInfo({ data, onNext, onBack }: Props) {
  const [name, setName] = useState(data.name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [area, setArea] = useState(data.area || "");
  const [experience, setExperience] = useState(data.experience || "");

  const handleNext = () => {
    if (name && phone && area && experience) {
      onNext({
        name,
        phone,
        area,
        location: `${area}, Abuja`,
        experience,
      });
    }
  };

  const isValid = name && phone && area && experience;

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-green-600">Step 2 of 6</span>
            <span>•</span>
            <span>Basic Information</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[33%] transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Tell us about yourself
          </h1>
          <p className="text-lg text-gray-600">
            Basic information to get started
          </p>
        </div>

        <Card className="p-6 sm:p-8 mb-6">
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
                We'll contact you via SMS and WhatsApp
              </p>
            </div>

            <div>
              <Label htmlFor="area" className="text-lg">
                Where do you live? *
              </Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger id="area" className="mt-2">
                  <SelectValue placeholder="Select your area in Abuja" />
                </SelectTrigger>
                <SelectContent>
                  {ABUJA_AREAS.map((areaName) => (
                    <SelectItem key={areaName} value={areaName}>
                      {areaName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">
                We match you with jobs near your location
              </p>
            </div>

            <div>
              <Label htmlFor="experience" className="text-lg">
                Years of Experience *
              </Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger id="experience" className="mt-2">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

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
  );
}
