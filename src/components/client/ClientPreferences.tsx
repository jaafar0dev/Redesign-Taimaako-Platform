import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Home, ArrowLeft } from "lucide-react";
import type { ClientData } from "../ClientFlowWithAuth";
import { Logo } from "../Logo";

interface Props {
  data: Partial<ClientData>;
  onNext: (data: Partial<ClientData>) => void;
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

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function ClientPreferences({ data, onNext, onBack }: Props) {
  const [homeSize, setHomeSize] = useState(data.homeSize || "");
  const [workType, setWorkType] = useState(data.workType || "");
  const [preferredDays, setPreferredDays] = useState<string[]>(
    data.preferredDays || [],
  );
  const [preferredTime, setPreferredTime] = useState(data.preferredTime || "");
  const [area, setArea] = useState(data.area || "");
  const [genderPreference, setGenderPreference] = useState(
    data.genderPreference || "no-preference",
  );
  const [skillRequirements, setSkillRequirements] = useState<string[]>(
    data.skillRequirements || [],
  );

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter((d) => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (skillRequirements.includes(skill)) {
      setSkillRequirements(skillRequirements.filter((s) => s !== skill));
    } else {
      setSkillRequirements([...skillRequirements, skill]);
    }
  };

  const handleNext = () => {
    if (homeSize && preferredDays.length > 0 && preferredTime && area) {
      onNext({
        homeSize,
        workType,
        preferredDays,
        preferredTime,
        area,
        location: `${area}, Abuja`,
        genderPreference,
        skillRequirements,
      });
    }
  };

  const isValid = homeSize && preferredDays.length > 0 && preferredTime && area;

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
            <span className="font-medium text-green-600">Step 3 of 9</span>
            <span>•</span>
            <span>Your Preferences</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[33%] transition-all" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Tell us about your needs
          </h1>
          <p className="text-lg text-gray-600">
            This helps us match you with the right assistant.
          </p>
        </div>

        <div className="space-y-6">
          {/* Location */}
          <Card className="p-6">
            <div>
              <Label htmlFor="area" className="text-lg">
                Area in Abuja *
              </Label>
              <p className="text-sm text-gray-500 mb-3">
                Where is your home located?
              </p>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select your area" />
                </SelectTrigger>
                <SelectContent>
                  {ABUJA_AREAS.map((areaName) => (
                    <SelectItem key={areaName} value={areaName}>
                      {areaName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Home Size */}
          <Card className="p-6">
            <div>
              <Label htmlFor="homeSize" className="text-lg">
                Home Size *
              </Label>
              <p className="text-sm text-gray-500 mb-3">How many bedrooms?</p>
              <Select value={homeSize} onValueChange={setHomeSize}>
                <SelectTrigger id="homeSize">
                  <SelectValue placeholder="Select home size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                  <SelectItem value="2-bedroom">2 Bedrooms</SelectItem>
                  <SelectItem value="3-bedroom">3 Bedrooms</SelectItem>
                  <SelectItem value="4-bedroom">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Work Type */}
          <Card className="p-6">
            <div>
              <Label htmlFor="workType" className="text-lg">
                Type of Work
              </Label>
              <p className="text-sm text-gray-500 mb-3">
                Any specific tasks? (Optional)
              </p>
              <Input
                id="workType"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                placeholder="e.g., Deep cleaning, meal prep for 4 people"
                className="bg-white"
              />
            </div>
          </Card>

          {/* Preferred Days */}
          <Card className="p-6">
            <div>
              <Label className="text-lg">Preferred Days *</Label>
              <p className="text-sm text-gray-500 mb-3">
                Select {data.frequency || 2} or more days
              </p>
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
            </div>
          </Card>

          {/* Preferred Time */}
          <Card className="p-6">
            <div>
              <Label htmlFor="time" className="text-lg">
                Preferred Time *
              </Label>
              <p className="text-sm text-gray-500 mb-3">
                When should the worker arrive?
              </p>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8am - 11am)</SelectItem>
                  <SelectItem value="midday">Midday (11am - 2pm)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (2pm - 5pm)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Gender Preference */}
          <Card className="p-6">
            <div>
              <Label htmlFor="gender" className="text-lg">
                Gender Preference
              </Label>
              <p className="text-sm text-gray-500 mb-3">Optional</p>
              <Select
                value={genderPreference}
                onValueChange={setGenderPreference}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Skill Requirements */}
          {data.services?.includes("cleaning") && (
            <Card className="p-6">
              <div>
                <Label className="text-lg">Additional Skills</Label>
                <p className="text-sm text-gray-500 mb-3">
                  What should the worker be able to do?
                </p>
                <div className="space-y-2">
                  {[
                    "Ironing",
                    "Cooking",
                    "Appliance use (washing machine, etc.)",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <Checkbox
                        checked={skillRequirements.includes(skill)}
                        onCheckedChange={() => toggleSkill(skill)}
                      />
                      <Label
                        className="font-normal cursor-pointer"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
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
