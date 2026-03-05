import React, { useState } from 'react';
import { WorkerLandingPage } from './worker/WorkerLandingPage';
import { WorkerLogin } from './worker/WorkerLogin';
import { WorkerDashboardNew } from './worker/WorkerDashboardNew';
import { WorkerRoleSelectionNew } from './worker/WorkerRoleSelectionNew';
import { WorkerBasicInfo } from './worker/WorkerBasicInfo';
import { WorkerSkillsAvailability } from './worker/WorkerSkillsAvailability';
import { WorkerScreening } from './worker/WorkerScreening';
import { WorkerPaymentPreferences } from './worker/WorkerPaymentPreferences';

interface WorkerFlowProps {
  onBack: () => void;
}

export interface WorkerData {
  roles: string[];
  name: string;
  phone: string;
  location: string;
  area: string;
  experience: string;
  services: string[];
  preferredDays: string[];
  preferredTime: string[];
  workingRadius: string;
  references: string;
  idType: string;
  idNumber: string;
  paymentFrequency: 'weekly' | 'biweekly' | 'monthly';
  accountNumber: string;
  bankName: string;
}

type WorkerStep = 
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'role'
  | 'basicinfo'
  | 'skills'
  | 'screening'
  | 'payment';

export function WorkerFlow({ onBack }: WorkerFlowProps) {
  const [step, setStep] = useState<WorkerStep>('landing');
  const [workerData, setWorkerData] = useState<Partial<WorkerData>>({});
  const [workerUser, setWorkerUser] = useState<{ name: string; email: string; phone: string; rating: number; totalJobs: number } | null>(null);

  const handleLogin = (email: string) => {
    // Mock login - in real app, would authenticate
    setWorkerUser({
      name: 'Amina Ibrahim',
      email: email,
      phone: '+234 803 456 7890',
      rating: 4.8,
      totalJobs: 156
    });
    setStep('dashboard');
  };

  const handleRegistrationComplete = () => {
    // After completing registration, log them in
    if (workerData.name && workerData.phone) {
      setWorkerUser({
        name: workerData.name,
        email: workerData.phone,
        phone: workerData.phone,
        rating: 5.0,
        totalJobs: 0
      });
      setWorkerData({});
      setStep('dashboard');
    }
  };

  const handleLogout = () => {
    setWorkerUser(null);
    setStep('landing');
  };

  const updateData = (data: Partial<WorkerData>) => {
    setWorkerData({ ...workerData, ...data });
  };

  const goToStep = (newStep: WorkerStep) => {
    setStep(newStep);
  };

  return (
    <>
      {step === 'landing' && (
        <WorkerLandingPage
          onGetStarted={() => goToStep('role')}
          onLogin={() => goToStep('login')}
          onBack={onBack}
        />
      )}
      {step === 'login' && (
        <WorkerLogin
          onLogin={handleLogin}
          onSignUp={() => goToStep('role')}
          onBack={onBack}
        />
      )}
      {step === 'dashboard' && workerUser && (
        <WorkerDashboardNew
          userData={workerUser}
          onLogout={handleLogout}
        />
      )}
      {step === 'role' && (
        <WorkerRoleSelectionNew
          data={workerData}
          onNext={(data) => {
            updateData(data);
            goToStep('basicinfo');
          }}
          onBack={() => goToStep('landing')}
        />
      )}
      {step === 'basicinfo' && (
        <WorkerBasicInfo
          data={workerData}
          onNext={(data) => {
            updateData(data);
            goToStep('skills');
          }}
          onBack={() => goToStep('role')}
        />
      )}
      {step === 'skills' && (
        <WorkerSkillsAvailability
          data={workerData}
          onNext={(data) => {
            updateData(data);
            goToStep('screening');
          }}
          onBack={() => goToStep('basicinfo')}
        />
      )}
      {step === 'screening' && (
        <WorkerScreening
          data={workerData}
          onNext={(data) => {
            updateData(data);
            goToStep('payment');
          }}
          onBack={() => goToStep('skills')}
        />
      )}
      {step === 'payment' && (
        <WorkerPaymentPreferences
          data={workerData as WorkerData}
          onComplete={handleRegistrationComplete}
        />
      )}
    </>
  );
}