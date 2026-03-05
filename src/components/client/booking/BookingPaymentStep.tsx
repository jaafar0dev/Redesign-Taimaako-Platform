import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { CreditCard, Smartphone, Building2, CheckCircle2 } from 'lucide-react';

interface BookingPaymentStepProps {
  data: {
    service?: string;
    streetAddress?: string;
    homeSize?: string;
    duration?: number;
    estimatedPrice?: number;
    startDate?: Date;
    startTime?: string;
    selectedWorker?: any;
  };
  onNext: (data: { paymentMethod: string }) => void;
  onBack: () => void;
}

export function BookingPaymentStep({ 
  data, 
  onNext, 
  onBack 
}: BookingPaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const calculateTotal = () => {
    const basePrice = data.estimatedPrice || 305;
    const bookingFee = Math.round(basePrice * 0.15);
    const serviceFee = 39;
    return basePrice + bookingFee + serviceFee;
  };

  const totalAmount = calculateTotal();

  const paymentOptions = [
    {
      id: 'card',
      name: 'Card Payment',
      description: 'Pay with Debit/Credit Card (Paystack)',
      icon: CreditCard,
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Transfer to our account',
      icon: Building2,
    },
    {
      id: 'ussd',
      name: 'USSD',
      description: 'Pay via USSD code',
      icon: Smartphone,
    },
  ];

  const handleProceed = () => {
    onNext({ paymentMethod });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Indicator */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-primary rounded-full"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Worker</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-primary rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">Select Payment Method</h2>
            <p className="text-muted-foreground">Choose how you'd like to pay for your booking</p>
          </div>

          {/* Booking Summary */}
          <Card className="p-6 bg-secondary">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Booking Summary</h3>
              <div className="text-2xl font-bold text-primary">₦{totalAmount}</div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span>Indoor Cleaning</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Worker:</span>
                <span className="font-medium">{data.selectedWorker?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>{data.duration || 3.5} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span>
                  {data.startDate 
                    ? data.startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                    : 'Not set'
                  } at {data.startTime}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Methods */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === option.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod(option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Icon className={`w-6 h-6 ${
                        paymentMethod === option.id ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </Card>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Secure Payment</p>
              <p className="text-muted-foreground">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 border-2"
            >
              Back
            </Button>
            <Button
              onClick={handleProceed}
              className="flex-1 h-12 bg-primary hover:bg-primary/90"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}