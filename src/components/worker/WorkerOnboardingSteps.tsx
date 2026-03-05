import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface WorkerOnboardingStepsProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function WorkerOnboardingSteps({ currentStep, totalSteps, stepLabels }: WorkerOnboardingStepsProps) {
  const steps: Step[] = stepLabels.map((label, index) => ({
    id: index + 1,
    label,
    isActive: index + 1 === currentStep,
    isCompleted: index + 1 < currentStep
  }));

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step.isCompleted
                    ? 'bg-primary text-white'
                    : step.isActive
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step.isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium whitespace-nowrap ${
                  step.isActive || step.isCompleted
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative" style={{ top: '-20px' }}>
                <div
                  className={`h-full transition-all duration-300 ${
                    step.isCompleted ? 'bg-primary' : 'bg-gray-200'
                  }`}
                  style={{ width: step.isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}