import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Clock, 
  Home,
  Calendar,
  Phone,
  MessageSquare,
  Navigation,
  Play,
  Flag,
  AlertCircle
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { BookingStatus } from '../booking/BookingStatusTracker';

interface WorkerBookingCardProps {
  booking: {
    id: string;
    status: BookingStatus;
    service: string;
    date: string;
    time: string;
    duration: string;
    client: {
      name: string;
      photo: string;
      location: string;
      distance: string;
      phone: string;
    };
    payment: string;
    notes?: string;
  };
  onAccept?: (bookingId: string) => void;
  onReject?: (bookingId: string) => void;
  onStartWork?: (bookingId: string) => void;
  onCompleteWork?: (bookingId: string) => void;
  onNavigate?: (bookingId: string) => void;
}

export function WorkerBookingCard({ 
  booking, 
  onAccept, 
  onReject,
  onStartWork,
  onCompleteWork,
  onNavigate
}: WorkerBookingCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusConfig = {
    pending: {
      color: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
      label: 'New Request',
      showActions: true
    },
    accepted: {
      color: 'bg-green-500/10 text-green-700 border-green-200',
      label: 'Accepted',
      showStartButton: true
    },
    on_the_way: {
      color: 'bg-blue-500/10 text-blue-700 border-blue-200',
      label: 'On The Way',
      showStartButton: true
    },
    in_progress: {
      color: 'bg-primary/10 text-primary border-primary/20',
      label: 'In Progress',
      showCompleteButton: true
    },
    completed: {
      color: 'bg-green-500/10 text-green-700 border-green-200',
      label: 'Completed',
      showPaid: true
    },
    rejected: {
      color: 'bg-gray-500/10 text-gray-700 border-gray-200',
      label: 'Declined'
    },
    reviewed: {
      color: 'bg-green-500/10 text-green-700 border-green-200',
      label: 'Reviewed'
    },
    cancelled: {
      color: 'bg-gray-500/10 text-gray-700 border-gray-200',
      label: 'Cancelled'
    }
  };

  const config = statusConfig[booking.status];

  return (
    <Card className={`p-4 border-l-4 ${config.color}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <ImageWithFallback
            src={booking.client.photo}
            alt={booking.client.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{booking.client.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {config.label}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{booking.client.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{booking.date}</span>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs"
        >
          {showDetails ? 'Less' : 'More'}
        </Button>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-secondary rounded-lg text-center">
          <Home className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Service</p>
          <p className="text-sm font-medium">{booking.service}</p>
        </div>
        <div className="p-3 bg-secondary rounded-lg text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-sm font-medium">{booking.time}</p>
        </div>
        <div className="p-3 bg-secondary rounded-lg text-center">
          <p className="text-xs text-muted-foreground">Payment</p>
          <p className="text-sm font-semibold text-primary">{booking.payment}</p>
        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="space-y-3 mb-4 p-4 bg-secondary rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="text-sm">{booking.client.location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-1 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm">{booking.duration}</p>
            </div>
          </div>
          {booking.notes && (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-1 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Special Instructions</p>
                <p className="text-sm">{booking.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions - Pending Status */}
      {config.showActions && booking.status === 'pending' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => onAccept?.(booking.id)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Accept Job
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
              onClick={() => onReject?.(booking.id)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Decline
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Client
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      )}

      {/* Actions - Accepted Status */}
      {config.showStartButton && booking.status === 'accepted' && (
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={() => onNavigate?.(booking.id)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            Start Navigation
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => onStartWork?.(booking.id)}
          >
            <Play className="w-4 h-4 mr-2" />
            I've Arrived
          </Button>
        </div>
      )}

      {/* Actions - On The Way */}
      {config.showStartButton && booking.status === 'on_the_way' && (
        <div className="space-y-2">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => onStartWork?.(booking.id)}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Work
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      )}

      {/* Actions - In Progress */}
      {config.showCompleteButton && (
        <div className="space-y-2">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => onCompleteWork?.(booking.id)}
          >
            <Flag className="w-4 h-4 mr-2" />
            Complete Work
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Client
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      )}

      {/* Completed Status */}
      {config.showPaid && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <p className="text-sm font-semibold text-green-900">Job Completed</p>
          <p className="text-xs text-green-700">Payment: {booking.payment}</p>
        </div>
      )}
    </Card>
  );
}
