import React, { useState } from 'react';
import { ClientLogin } from './client/ClientLogin';
import { ClientSignUp } from './client/ClientSignUp';
import { ClientDashboardContainer } from './client/ClientDashboardContainer';
import { BookingLocationStep } from './client/booking/BookingLocationStep';
import { BookingDetailsStep } from './client/booking/BookingDetailsStep';
import { WorkerMatchingStep } from './client/booking/WorkerMatchingStep';
import { WorkerSelectionStep } from './client/booking/WorkerSelectionStep';
import { BookingConfirmationStep } from './client/booking/BookingConfirmationStep';

interface ClientFlowWithAuthProps {
  onBack: () => void;
}

export interface ClientData {
  service?: string;
  streetAddress?: string;
  apartmentNumber?: string;
  homeSize?: string;
  extraTasks?: string[];
  duration?: number;
  startDate?: Date;
  startTime?: string;
  instructions?: string;
  estimatedPrice?: number;
  selectedWorker?: any;
  paymentMethod?: string;
}

type AuthStep = 'login' | 'signup' | 'dashboard';
type BookingStep = 
  | 'location'
  | 'details'
  | 'matching'
  | 'worker-selection'
  | 'confirmation';

export function ClientFlowWithAuth({ onBack }: ClientFlowWithAuthProps) {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [bookingStep, setBookingStep] = useState<BookingStep | null>(null);
  const [userData, setUserData] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [bookingData, setBookingData] = useState<Partial<ClientData>>({});
  const [bookings, setBookings] = useState<{ upcoming: any[]; past: any[] }>({
    upcoming: [],
    past: []
  });

  const handleLogin = (email: string) => {
    // In a real app, this would authenticate the user
    setUserData({
      name: 'Chinedu Okafor',
      email: email,
      phone: '+234 803 123 4567'
    });
    setAuthStep('dashboard');
  };

  const handleSignUp = (data: { name: string; email: string; phone: string }) => {
    setUserData(data);
    setAuthStep('dashboard');
  };

  const handleSelectService = (serviceId: string) => {
    // Start booking flow with selected service
    setBookingData({
      service: serviceId
    });
    setBookingStep('location');
  };

  const updateBookingData = (data: Partial<ClientData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const goToBookingStep = (step: BookingStep | null) => {
    setBookingStep(step);
  };

  const handleBookingComplete = () => {
    // Add to bookings
    if (bookingData.service && bookingData.startDate && bookingData.startTime && bookingData.selectedWorker) {
      const newBooking = {
        service: bookingData.service,
        date: `${bookingData.startDate.toLocaleDateString('en-GB')} at ${bookingData.startTime}`,
        worker: bookingData.selectedWorker.name,
        status: 'upcoming',
        amount: bookingData.estimatedPrice
      };
      setBookings({
        ...bookings,
        upcoming: [...bookings.upcoming, newBooking]
      });
    }

    // Reset booking flow and return to dashboard
    setBookingData({});
    setBookingStep(null);
  };

  const handleLogout = () => {
    setUserData(null);
    setAuthStep('login');
    setBookingStep(null);
    setBookingData({});
  };

  // Auth flow
  if (!userData) {
    if (authStep === 'login') {
      return (
        <ClientLogin
          onLogin={handleLogin}
          onSignUp={() => setAuthStep('signup')}
        />
      );
    }

    if (authStep === 'signup') {
      return (
        <ClientSignUp
          onSignUp={handleSignUp}
          onBackToLogin={() => setAuthStep('login')}
        />
      );
    }
  }

  // Dashboard (no active booking)
  if (!bookingStep && userData) {
    return (
      <ClientDashboardContainer
        userData={userData}
        onSelectService={handleSelectService}
        onLogout={handleLogout}
        upcomingBookings={bookings.upcoming}
        pastBookings={bookings.past}
        onUpdateProfile={(data) => setUserData(data)}
      />
    );
  }

  // Booking flow
  return (
    <>
      {bookingStep === 'location' && (
        <BookingLocationStep
          data={bookingData}
          onNext={(data) => {
            updateBookingData(data);
            goToBookingStep('details');
          }}
          onBack={() => goToBookingStep(null)}
        />
      )}
      {bookingStep === 'details' && (
        <BookingDetailsStep
          data={bookingData}
          onNext={(data) => {
            updateBookingData(data);
            goToBookingStep('matching');
          }}
          onBack={() => goToBookingStep('location')}
        />
      )}
      {bookingStep === 'matching' && (
        <WorkerMatchingStep
          data={bookingData}
          onNext={(data) => {
            updateBookingData(data);
            goToBookingStep('worker-selection');
          }}
          onBack={() => goToBookingStep('details')}
        />
      )}
      {bookingStep === 'worker-selection' && (
        <WorkerSelectionStep
          data={bookingData}
          onNext={(data) => {
            updateBookingData(data);
            goToBookingStep('confirmation');
          }}
          onBack={() => goToBookingStep('matching')}
        />
      )}
      {bookingStep === 'confirmation' && (
        <BookingConfirmationStep
          data={bookingData as ClientData}
          onComplete={handleBookingComplete}
          onBack={() => goToBookingStep('worker-selection')}
        />
      )}
    </>
  );
}