import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  ChevronLeft, 
  Phone, 
  MessageSquare, 
  MapPin,
  Calendar,
  Clock,
  Home,
  Star
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { BookingStatusTracker, BookingStatus } from './BookingStatusTracker';
import { ReviewModal } from './ReviewModal';

interface BookingDetailsViewProps {
  bookingId: string;
  onBack: () => void;
}

// Mock booking data
const mockBooking = {
  id: 'BK-2026-001234',
  status: 'pending' as BookingStatus, // Changed to pending to show the acceptance flow
  service: 'Indoor Cleaning',
  date: 'Friday, Feb 14, 2026',
  time: '10:00 AM - 2:00 PM',
  duration: '4 hours',
  frequency: '2x weekly',
  location: {
    address: '15 Gimbiya Street, Garki II, Abuja',
    landmark: 'Near Total Filling Station'
  },
  worker: {
    name: 'Blessing Okafor',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 4.8,
    reviewCount: 156,
    phone: '+234 803 456 7890',
    specialties: ['Deep Cleaning', 'Kitchen', 'Bathroom']
  },
  payment: {
    sessionFee: '₦5,000',
    serviceFee: '₦500',
    total: '₦5,500',
    method: 'Subscription Plan'
  },
  notes: 'Please focus on the kitchen and bathrooms. Keys are with the security guard.',
  requestedAt: '2 hours ago'
};

export function BookingDetailsView({ bookingId, onBack }: BookingDetailsViewProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(mockBooking.status);

  const handleContactWorker = () => {
    // Handle contact worker
    console.log('Contact worker');
  };

  const handleCancelBooking = () => {
    // Handle cancel booking
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookingStatus('cancelled');
    }
  };

  const handleLeaveReview = () => {
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (rating: number, review: string) => {
    console.log('Review submitted:', { rating, review });
    setBookingStatus('reviewed');
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Booking Details</h1>
              <p className="text-sm text-muted-foreground">ID: {mockBooking.id}</p>
            </div>
            {bookingStatus === 'pending' && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                Awaiting Acceptance
              </Badge>
            )}
            {bookingStatus === 'accepted' && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                ✓ Confirmed & Locked
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Pending Notice */}
        {bookingStatus === 'pending' && (
          <Card className="p-4 bg-yellow-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-semibold text-yellow-900 mb-1">
                  ⏳ Waiting for {mockBooking.worker.name} to accept
                </p>
                <p className="text-sm text-yellow-800 mb-2">
                  Your booking request was sent {mockBooking.requestedAt}. The worker has up to 2 hours to respond. 
                  You can still cancel or modify this booking while it's pending.
                </p>
                <div className="flex items-center gap-2 text-xs text-yellow-700">
                  <Clock className="w-4 h-4" />
                  <span>Response expected within the next hour</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Accepted/Locked Notice */}
        {['accepted', 'on_the_way', 'in_progress'].includes(bookingStatus) && (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-semibold text-green-900 mb-1">
                  ✓ Booking Confirmed & Locked
                </p>
                <p className="text-sm text-green-800">
                  {mockBooking.worker.name} has accepted your booking. This booking is now confirmed and locked. 
                  You cannot modify the booking details at this point. If you need to make changes, please contact support.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Rejected Notice */}
        {bookingStatus === 'rejected' && (
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="font-semibold text-red-900 mb-1">
                  ✗ Worker Unable to Accept
                </p>
                <p className="text-sm text-red-800 mb-3">
                  {mockBooking.worker.name} was unable to accept this booking request. 
                  This could be due to schedule conflicts or other commitments.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Find Another Worker
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Status Tracker */}
        <BookingStatusTracker
          status={bookingStatus}
          bookingDate={mockBooking.date}
          bookingTime={mockBooking.time}
          workerName={mockBooking.worker.name}
          workerPhoto={mockBooking.worker.photo}
          serviceName={mockBooking.service}
          onContactWorker={handleContactWorker}
          onCancelBooking={handleCancelBooking}
          onLeaveReview={handleLeaveReview}
        />

        {/* Worker Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Worker</h3>
          <div className="flex items-start gap-4 mb-4">
            <ImageWithFallback
              src={mockBooking.worker.photo}
              alt={mockBooking.worker.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{mockBooking.worker.name}</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{mockBooking.worker.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({mockBooking.worker.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockBooking.worker.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Message
            </Button>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Service Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <Home className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Service Type</p>
                <p className="text-muted-foreground">{mockBooking.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Schedule</p>
                <p className="text-muted-foreground">{mockBooking.date}</p>
                <p className="text-sm text-muted-foreground">{mockBooking.frequency}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-4 border-b border-border">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Time & Duration</p>
                <p className="text-muted-foreground">{mockBooking.time}</p>
                <p className="text-sm text-muted-foreground">{mockBooking.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Location</p>
                <p className="text-muted-foreground">{mockBooking.location.address}</p>
                <p className="text-sm text-muted-foreground">{mockBooking.location.landmark}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Special Instructions */}
        {mockBooking.notes && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Special Instructions</h3>
            <p className="text-muted-foreground">{mockBooking.notes}</p>
          </Card>
        )}

        {/* Payment Summary */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Session Fee</span>
              <span className="font-medium">{mockBooking.payment.sessionFee}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-medium">{mockBooking.payment.serviceFee}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-primary">{mockBooking.payment.total}</span>
            </div>
            <div className="pt-3 border-t border-border">
              <Badge variant="secondary" className="text-sm">
                Paid via {mockBooking.payment.method}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Help & Support */}
        <Card className="p-6 bg-secondary">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is here to help with any questions or concerns about your booking.
          </p>
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        </Card>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          workerName={mockBooking.worker.name}
          workerPhoto={mockBooking.worker.photo}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}