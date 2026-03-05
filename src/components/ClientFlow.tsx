import React, { useState } from 'react';
import { ClientServiceSelection } from './client/ClientServiceSelection';
import { ClientPlanSelection } from './client/ClientPlanSelection';
import { ClientPreferences } from './client/ClientPreferences';
import { ClientAccountCreation } from './client/ClientAccountCreation';
import { ClientSummary } from './client/ClientSummary';
import { ClientManagerConfirmation } from './client/ClientManagerConfirmation';
import { ClientPayment } from './client/ClientPayment';
import { ClientServiceExecution } from './client/ClientServiceExecution';
import { ClientPostService } from './client/ClientPostService';

interface ClientFlowProps {
  onBack: () => void;
}

export interface ClientData {
  services: string[];
  planType: 'subscription' | 'onetime';
  frequency: number;
  duration: number;
  homeSize: string;
  workType: string;
  preferredDays: string[];
  preferredTime: string;
  location: string;
  area: string;
  genderPreference: string;
  skillRequirements: string[];
  name: string;
  phone: string;
  email: string;
  estimatedPrice: number;
  confirmedPrice?: number;
  assignedWorker?: {
    name: string;
    photo: string;
    rating: number;
    experience: string;
  };
}

type ClientStep = 
  | 'service'
  | 'plan'
  | 'preferences'
  | 'account'
  | 'summary'
  | 'confirmation'
  | 'payment'
  | 'execution'
  | 'postservice';

export function ClientFlow({ onBack }: ClientFlowProps) {
  const [step, setStep] = useState<ClientStep>('service');
  const [clientData, setClientData] = useState<Partial<ClientData>>({});

  const updateData = (data: Partial<ClientData>) => {
    setClientData({ ...clientData, ...data });
  };

  const goToStep = (newStep: ClientStep) => {
    setStep(newStep);
  };

  const handleComplete = () => {
    // Reset to service selection for demo
    setClientData({});
    setStep('service');
  };

  return (
    <>
      {step === 'service' && (
        <ClientServiceSelection
          data={clientData}
          onNext={(data) => {
            updateData(data);
            goToStep('plan');
          }}
          onBack={onBack}
        />
      )}
      {step === 'plan' && (
        <ClientPlanSelection
          data={clientData}
          onNext={(data) => {
            updateData(data);
            goToStep('preferences');
          }}
          onBack={() => goToStep('service')}
        />
      )}
      {step === 'preferences' && (
        <ClientPreferences
          data={clientData}
          onNext={(data) => {
            updateData(data);
            goToStep('account');
          }}
          onBack={() => goToStep('plan')}
        />
      )}
      {step === 'account' && (
        <ClientAccountCreation
          data={clientData}
          onNext={(data) => {
            updateData(data);
            goToStep('summary');
          }}
          onBack={() => goToStep('preferences')}
        />
      )}
      {step === 'summary' && (
        <ClientSummary
          data={clientData as ClientData}
          onNext={() => goToStep('confirmation')}
          onBack={() => goToStep('account')}
        />
      )}
      {step === 'confirmation' && (
        <ClientManagerConfirmation
          data={clientData as ClientData}
          onNext={(data) => {
            updateData(data);
            goToStep('payment');
          }}
          onBack={() => goToStep('summary')}
        />
      )}
      {step === 'payment' && (
        <ClientPayment
          data={clientData as ClientData}
          onNext={() => goToStep('execution')}
          onBack={() => goToStep('confirmation')}
        />
      )}
      {step === 'execution' && (
        <ClientServiceExecution
          data={clientData as ClientData}
          onNext={() => goToStep('postservice')}
        />
      )}
      {step === 'postservice' && (
        <ClientPostService
          data={clientData as ClientData}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}
