import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Home, ArrowLeft } from "lucide-react";
import { SERVICE_CATEGORIES } from "../../constants/services";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: Partial<WorkerData>;
  onNext: (data: Partial<WorkerData>) => void;
  onBack: () => void;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function WorkerSkillsAvailability({ data, onNext, onBack }: Props) {
  const [services, setServices] = useState<string[]>(data.services || []);
  const [preferredDays, setPreferredDays] = useState<string[]>(
    data.preferredDays || [],
  );
  const [preferredTime, setPreferredTime] = useState<string[]>(
    data.preferredTime || [],
  );
  const [workingRadius, setWorkingRadius] = useState(data.workingRadius || "");

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter((d) => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const toggleService = (service: string) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  const toggleTime = (time: string) => {
    if (preferredTime.includes(time)) {
      setPreferredTime(preferredTime.filter((t) => t !== time));
    } else {
      setPreferredTime([...preferredTime, time]);
    }
  };

  // Get available services based on selected roles
  const availableServices =
    data.roles?.flatMap((roleId) => {
      const category = SERVICE_CATEGORIES.find((cat) => cat.id === roleId);
      return category?.skills || [];
    }) || [];

  const handleNext = () => {
    if (
      services.length > 0 &&
      preferredDays.length > 0 &&
      preferredTime.length > 0 &&
      workingRadius
    ) {
      onNext({ services, preferredDays, preferredTime, workingRadius });
    }
  };

  const isValid =
    services.length > 0 &&
    preferredDays.length > 0 &&
    preferredTime.length > 0 &&
    workingRadius;

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
            <span className="font-medium text-green-600">Step 3 of 6</span>
            <span>•</span>
            <span>Skills & Availability</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[50%] transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Skills and availability
          </h1>
          <p className="text-lg text-gray-600">
            Help us match you with the right jobs
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <Label className="text-lg mb-3 block">
              What services can you offer? *
            </Label>
            <div className="grid sm:grid-cols-2 gap-3">
              {availableServices.map((service) => (
                <div key={service} className="flex items-center gap-2">
                  <Checkbox
                    checked={services.includes(service)}
                    onCheckedChange={() => toggleService(service)}
                  />
                  <Label
                    className="font-normal cursor-pointer"
                    onClick={() => toggleService(service)}
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Label className="text-lg mb-3 block">Available Days *</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = preferredDays.includes(day);
                return (
                  <div
                    key={day}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => toggleDay(day)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleDay(day)}
                      />
                      <span className="text-sm font-medium">
                        {day.slice(0, 3)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <Label className="text-lg mb-3 block">Preferred Time Slots *</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                "Morning (8am-11am)",
                "Midday (11am-2pm)",
                "Afternoon (2pm-5pm)",
              ].map((time) => {
                const isSelected = preferredTime.includes(time);
                return (
                  <div
                    key={time}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                    onClick={() => toggleTime(time)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleTime(time)}
                      />
                      <span className="text-sm font-medium">{time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <Label htmlFor="radius" className="text-lg">
              How far can you travel for work? *
            </Label>
            <Select value={workingRadius} onValueChange={setWorkingRadius}>
              <SelectTrigger id="radius" className="mt-2">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5km">Within 5km of my location</SelectItem>
                <SelectItem value="10km">Within 10km of my location</SelectItem>
                <SelectItem value="15km">Within 15km of my location</SelectItem>
                <SelectItem value="anywhere">Anywhere in Abuja</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Jobs closer to you mean less commute time
            </p>
          </Card>
        </div>

        <div className="mt-8">
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
    </div>
  );
}
