import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Home, ArrowLeft, Shield } from "lucide-react";
import type { WorkerData } from "../WorkerFlow";
import { Logo } from "../Logo";

interface Props {
  data: Partial<WorkerData>;
  onNext: (data: Partial<WorkerData>) => void;
  onBack: () => void;
}

export function WorkerScreening({ data, onNext, onBack }: Props) {
  const [references, setReferences] = useState(data.references || "");
  const [idType, setIdType] = useState(data.idType || "");
  const [idNumber, setIdNumber] = useState(data.idNumber || "");

  const handleNext = () => {
    if (references && idType && idNumber) {
      onNext({ references, idType, idNumber });
    }
  };

  const isValid = references && idType && idNumber;

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
            <span className="font-medium text-green-600">Step 4 of 6</span>
            <span>•</span>
            <span>Verification</span>
          </div>
          <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[66%] transition-all" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Verification details
          </h1>
          <p className="text-lg text-gray-600">
            This helps us build trust with our clients
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-900">Why we verify</p>
              <p className="text-sm text-green-700 mt-1">
                Verification builds trust and helps you get more job
                opportunities. All information is kept confidential.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <Label htmlFor="references" className="text-lg">
              References *
            </Label>
            <p className="text-sm text-gray-500 mb-3">
              Provide contact information for 2 previous employers or clients
            </p>
            <Textarea
              id="references"
              value={references}
              onChange={(e) => setReferences(e.target.value)}
              placeholder="Name: John Doe&#10;Phone: 080XXXXXXXX&#10;&#10;Name: Jane Smith&#10;Phone: 081XXXXXXXX"
              rows={6}
              className="bg-white"
            />
            <p className="text-xs text-gray-500 mt-2">
              Our team will contact them to verify your experience
            </p>
          </Card>

          <Card className="p-6">
            <Label htmlFor="idType" className="text-lg">
              Identity Verification *
            </Label>
            <p className="text-sm text-gray-500 mb-3">For security and trust</p>
            <Select value={idType} onValueChange={setIdType}>
              <SelectTrigger id="idType" className="mb-4">
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nin">
                  National Identity Number (NIN)
                </SelectItem>
                <SelectItem value="voters">Voter's Card</SelectItem>
                <SelectItem value="drivers">Driver's License</SelectItem>
                <SelectItem value="passport">International Passport</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="idNumber">ID Number *</Label>
            <Input
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter your ID number"
              className="mt-2 bg-white"
            />
            <p className="text-xs text-gray-500 mt-2">
              We use this to verify your identity. It's kept secure and
              confidential.
            </p>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <p className="text-sm text-gray-700">
              After submitting, our team will:
            </p>
            <ul className="text-sm text-gray-700 mt-2 space-y-1 ml-5 list-disc">
              <li>Contact your references within 24 hours</li>
              <li>Verify your identity documents</li>
              <li>Conduct a brief phone interview</li>
              <li>Approve your account within 2-3 business days</li>
            </ul>
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
