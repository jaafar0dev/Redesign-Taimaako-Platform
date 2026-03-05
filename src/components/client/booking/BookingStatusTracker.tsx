import React from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { 
  Clock, 
  CheckCircle2, 
  UserCheck, 
  MapPin, 
  Play, 
  Flag,
  Star,
  XCircle,
  AlertCircle
} from 'lucide-react';

export type BookingStatus = 
  | 'pending'           // Waiting for worker to accept
  | 'accepted'          // Worker accepted, scheduled
  | 'rejected'          // Worker rejected
  | 'on_the_way'        // Worker is traveling to location
  | 'in_progress'       // Work has started
  | 'completed'         // Work completed
  | 'reviewed'          // Client has reviewed
  | 'cancelled';        // Booking cancelled

interface BookingStatusTrackerProps {
  status: BookingStatus;
  bookingDate: string;
  bookingTime: string;
  workerName: string;
  workerPhoto: string;
  serviceName: string;
  onContactWorker?: () => void;
  onCancelBooking?: () => void;
  onLeaveReview?: () => void;
}

export function BookingStatusTracker({
  status,
  bookingDate,
  bookingTime,
  workerName,
  workerPhoto,
  serviceName,
  onContactWorker,
  onCancelBooking,
  onLeaveReview
}: BookingStatusTrackerProps) {
  
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      title: 'Waiting for Worker Acceptance',
      description: `We've sent your booking request to ${workerName}. They have 2 hours to accept this booking. You'll receive a notification once they respond.`,
      showCancel: true,
      showModify: true
    },
    accepted: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      title: 'Booking Confirmed',
      description: `Great news! ${workerName} has accepted your booking for ${bookingDate} at ${bookingTime}. The booking is now locked and confirmed.`,
      showContact: true,
      showCancel: false // Can't cancel easily after acceptance
    },
    rejected: {
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      title: 'Worker Unavailable',
      description: `Unfortunately, ${workerName} couldn't accept this booking. Don't worry, we'll help you find another qualified worker right away.`,
      showRebook: true
    },
    on_the_way: {
      icon: MapPin,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      title: 'Worker is On The Way',
      description: `${workerName} is traveling to your location. Estimated arrival: ${bookingTime}.`,
      showContact: true
    },
    in_progress: {
      icon: Play,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Work in Progress',
      description: `${workerName} has started the ${serviceName} service. You'll be notified when complete.`,
      showContact: true
    },
    completed: {
      icon: Flag,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
      title: 'Service Completed',
      description: `${workerName} has completed the work. How was your experience?`,
      showReview: true
    },
    reviewed: {
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      title: 'Thank You!',
      description: 'Your review has been submitted. Thank you for using Taimaako!',
    },
    cancelled: {
      icon: XCircle,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      title: 'Booking Cancelled',
      description: 'This booking has been cancelled.',
      showRebook: true
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // Progress calculation
  const progressSteps = ['pending', 'accepted', 'on_the_way', 'in_progress', 'completed', 'reviewed'];
  const currentStepIndex = progressSteps.indexOf(status);
  const progressPercentage = ((currentStepIndex + 1) / progressSteps.length) * 100;

  return (
    <Card className="p-6">
      {/* Progress Bar */}
      {!['rejected', 'cancelled'].includes(status) && (
        <div className="mb-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Pending</span>
            <span>Confirmed</span>
            <span>In Progress</span>
            <span>Completed</span>
          </div>
        </div>
      )}

      {/* Status Card */}
      <div className={`rounded-lg p-4 ${config.bgColor} mb-6`}>
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-3 bg-background`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{config.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-secondary rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Service</p>
          <p className="font-semibold">{serviceName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
          <p className="font-semibold">{bookingDate}</p>
          <p className="text-sm">{bookingTime}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Worker</p>
          <p className="font-semibold">{workerName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <Badge variant="outline" className="capitalize">
            {status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {config.showContact && onContactWorker && (
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onContactWorker}
          >
            Contact Worker
          </Button>
        )}
        
        {config.showCancel && onCancelBooking && (
          <Button 
            variant="outline" 
            className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            onClick={onCancelBooking}
          >
            Cancel Booking
          </Button>
        )}

        {config.showReview && onLeaveReview && (
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={onLeaveReview}
          >
            <Star className="w-4 h-4 mr-2" />
            Leave a Review
          </Button>
        )}

        {config.showRebook && (
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Book Again
          </Button>
        )}
      </div>

      {/* Help Notice */}
      {['pending', 'accepted'].includes(status) && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Need help?</p>
            <p className="text-xs text-blue-700 mt-1">
              Our support team is available 24/7 to assist you. Contact us if you have any questions.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}