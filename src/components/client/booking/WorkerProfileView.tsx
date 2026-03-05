import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Calendar,
  ThumbsUp,
  Shield,
  Clock,
  X,
  ChevronLeft
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface Worker {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  distance: string;
  recommended: boolean;
  verified: boolean;
  specialties: string[];
}

interface Review {
  id: string;
  clientName: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}

interface WorkerProfileViewProps {
  worker: Worker;
  onClose: () => void;
  onChooseWorker: () => void;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    clientName: 'Amaka O.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Excellent work! Very thorough and professional. My home has never looked cleaner. Highly recommend!',
    service: 'Indoor Cleaning'
  },
  {
    id: '2',
    clientName: 'Ibrahim K.',
    rating: 5,
    date: '1 month ago',
    comment: 'Punctual, efficient, and very friendly. Great attention to detail. Will definitely book again.',
    service: 'Indoor Cleaning'
  },
  {
    id: '3',
    clientName: 'Chioma N.',
    rating: 4,
    date: '1 month ago',
    comment: 'Very good service. Arrived on time and did a thorough job. One small area was missed but overall great experience.',
    service: 'Office Cleaning'
  },
  {
    id: '4',
    clientName: 'Tunde A.',
    rating: 5,
    date: '2 months ago',
    comment: 'Outstanding! Professional, courteous, and incredibly detailed. My office space looks amazing.',
    service: 'Office Cleaning'
  }
];

export function WorkerProfileView({ worker, onClose, onChooseWorker }: WorkerProfileViewProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 2);

  // Calculate rating breakdown
  const ratingBreakdown = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Side Modal */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-background z-50 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Worker Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-6 pb-32">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="flex justify-center md:justify-start">
                <div className="relative">
                  <ImageWithFallback
                    src={worker.photo}
                    alt={worker.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  {worker.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                      <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h2 className="text-3xl font-bold">{worker.name}</h2>
                    {worker.recommended && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{worker.distance} away</span>
                    </div>
                    {worker.verified && (
                      <div className="flex items-center gap-1 text-primary">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">{worker.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{worker.reviewCount} reviews</p>
                  </div>
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">{worker.jobsCompleted}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Jobs completed</p>
                  </div>
                  <div className="text-center p-3 bg-secondary rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <ThumbsUp className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold">99%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-sm font-medium mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {worker.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* About */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">About {worker.name.split(' ')[0]}</h3>
            <p className="text-muted-foreground leading-relaxed">
              Professional home care specialist with over 3 years of experience providing exceptional cleaning 
              and care services across Abuja. I take pride in my attention to detail and commitment to creating 
              clean, comfortable spaces for my clients. Punctual, reliable, and always ready to go the extra mile 
              to ensure your satisfaction.
            </p>
          </Card>

          {/* Verification & Safety */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Verification & Safety</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Identity Verified</p>
                  <p className="text-xs text-muted-foreground">NIN and BVN confirmed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Background Check</p>
                  <p className="text-xs text-muted-foreground">Passed security screening</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Skills Verified</p>
                  <p className="text-xs text-muted-foreground">Completed training program</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Reference Checked</p>
                  <p className="text-xs text-muted-foreground">3 professional references</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Rating Breakdown */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Rating Breakdown</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-12">{rating} star</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${ratingBreakdown[rating as keyof typeof ratingBreakdown]}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {ratingBreakdown[rating as keyof typeof ratingBreakdown]}%
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Reviews ({worker.reviewCount})</h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold">{worker.rating}</span>
              </div>
            </div>

            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.clientName}</p>
                      <p className="text-xs text-muted-foreground">{review.service}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            {!showAllReviews && mockReviews.length > 2 && (
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(true)}
                className="w-full mt-4"
              >
                Show all {mockReviews.length} reviews
              </Button>
            )}
          </Card>

          {/* Availability */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Typical Availability</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div
                  key={day}
                  className={`text-center p-3 rounded-lg ${
                    index < 5
                      ? 'bg-primary text-primary-foreground'
                      : index === 5
                      ? 'bg-secondary text-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-xs font-medium">{day}</p>
                  <p className="text-xs mt-1">
                    {index < 5 ? '7am-6pm' : index === 5 ? '9am-2pm' : 'Off'}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Actual availability may vary based on bookings
            </p>
          </Card>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-background pt-4 pb-4 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
            >
              View Other Workers
            </Button>
            <Button
              onClick={onChooseWorker}
              className="flex-1 h-12 bg-primary hover:bg-primary/90"
            >
              Choose {worker.name.split(' ')[0]}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}