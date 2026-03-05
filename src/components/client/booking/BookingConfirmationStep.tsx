import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { CheckCircle2, Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import confetti from 'canvas-confetti';

interface BookingConfirmationStepProps {
  data: {
    service?: string;
    streetAddress?: string;
    apartmentNumber?: string;
    homeSize?: string;
    duration?: number;
    estimatedPrice?: number;
    startDate?: Date;
    startTime?: string;
    selectedWorker?: any;
    paymentMethod?: string;
  };
  onComplete: () => void;
  onBack?: () => void;
}

export function BookingConfirmationStep({ 
  data,
  onComplete 
}: BookingConfirmationStepProps) {
  const [isProcessing, setIsProcessing] = useState(true);

  const calculateTotal = () => {
    const basePrice = data.estimatedPrice || 305;
    const bookingFee = Math.round(basePrice * 0.15);
    const serviceFee = 39;
    return basePrice + bookingFee + serviceFee;
  };

  const totalAmount = calculateTotal();

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setIsProcessing(false);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Confirming your booking...</h3>
            <p className="text-muted-foreground">Please wait while we process your request</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24">
        <div className="space-y-6">
          {/* Success Header */}
          <Card className="p-8 text-center bg-primary text-primary-foreground">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
            <p className="text-lg opacity-90">
              Your payment of ₦{totalAmount} was successful
            </p>
          </Card>

          {/* Booking Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {data?.startDate 
                      ? data.startDate.toLocaleDateString('en-GB', { 
                          weekday: 'long',
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })
                      : 'Not set'
                    } at {data?.startTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{data?.duration || 3.5} hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{data?.streetAddress}</p>
                  {data?.apartmentNumber && (
                    <p className="text-sm text-muted-foreground">{data.apartmentNumber}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Worker Details */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your TaimaakoStar</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <ImageWithFallback
                src={data.selectedWorker?.photo}
                alt={data.selectedWorker?.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{data.selectedWorker?.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>⭐ {data.selectedWorker?.rating} Rating</span>
                  <span>•</span>
                  <span>{data.selectedWorker?.jobsCompleted} Jobs Completed</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">Worker has been notified</p>
              <p className="text-sm text-muted-foreground">
                {data.selectedWorker?.name} will receive your booking details and will prepare for the service.
                You'll receive a confirmation message shortly.
              </p>
            </div>
          </Card>

          {/* What's Next */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Worker Confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    {data.selectedWorker?.name} will confirm availability within 30 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Preparation</p>
                  <p className="text-sm text-muted-foreground">
                    Your worker will prepare all necessary equipment and supplies
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Service Day</p>
                  <p className="text-sm text-muted-foreground">
                    Your worker will arrive at the scheduled time and complete the service
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Booking Reference */}
          <Card className="p-6 bg-muted">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                <p className="text-lg font-mono font-bold">TMK-{Date.now().toString().slice(-8)}</p>
              </div>
              <Button variant="outline" size="sm">
                Copy
              </Button>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onComplete}
              className="flex-1 h-12 bg-primary hover:bg-primary/90"
            >
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12"
            >
              View All Bookings
            </Button>
          </div>

          {/* Support */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Need help with your booking?</p>
            <div className="flex justify-center gap-4">
              <Button variant="link" size="sm" className="text-primary">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
              <Button variant="link" size="sm" className="text-primary">
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}