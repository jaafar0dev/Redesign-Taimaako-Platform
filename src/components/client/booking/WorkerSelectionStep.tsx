import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Star, MapPin, CheckCircle2, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { Switch } from '../../ui/switch';
import { WorkerProfileView } from './WorkerProfileView';

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

interface WorkerSelectionStepProps {
  data: {
    service?: string;
    streetAddress?: string;
    homeSize?: string;
    duration?: number;
    estimatedPrice?: number;
    extraTasks?: string[];
    startDate?: Date;
    startTime?: string;
  };
  onNext: (data: { selectedWorker: Worker }) => void;
  onBack: () => void;
}

// Mock worker data based on proximity to location
const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Yemisi Bunkers',
    photo: 'https://images.unsplash.com/photo-1572002339854-2faa0fe06881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 4.8,
    reviewCount: 142,
    jobsCompleted: 298,
    distance: '1.2 km',
    recommended: true,
    verified: true,
    specialties: ['Indoor Cleaning', 'Laundry']
  },
  {
    id: '2',
    name: 'Josphine Kunaka',
    photo: 'https://images.unsplash.com/photo-1559154352-06e29e1e11aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 4.9,
    reviewCount: 203,
    jobsCompleted: 421,
    distance: '1.8 km',
    recommended: false,
    verified: true,
    specialties: ['Indoor Cleaning', 'Elder Care']
  },
  {
    id: '3',
    name: 'Ornella Ndlamengoah',
    photo: 'https://images.unsplash.com/photo-1688241320695-6ca991df8818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 5.0,
    reviewCount: 87,
    jobsCompleted: 156,
    distance: '2.3 km',
    recommended: true,
    verified: true,
    specialties: ['Indoor Cleaning', 'Office Cleaning']
  },
  {
    id: '4',
    name: 'Talent Makunike',
    photo: 'https://images.unsplash.com/photo-1579018371849-524c08dabbfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 4.7,
    reviewCount: 156,
    jobsCompleted: 312,
    distance: '2.7 km',
    recommended: false,
    verified: true,
    specialties: ['Indoor Cleaning', 'Artisan']
  }
];

export function WorkerSelectionStep({ data, onNext, onBack }: WorkerSelectionStepProps) {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [useWallet, setUseWallet] = useState(false);
  const [viewingProfile, setViewingProfile] = useState<Worker | null>(null);

  const calculateCosts = () => {
    const basePrice = data.estimatedPrice || 305;
    const bookingFee = Math.round(basePrice * 0.15);
    const serviceFee = 39;
    const totalBeforeDiscount = basePrice + bookingFee + serviceFee;
    
    const walletDiscount = useWallet ? 150 : 0;
    const total = totalBeforeDiscount - walletDiscount;

    return {
      basePrice,
      bookingFee,
      serviceFee,
      walletDiscount,
      total
    };
  };

  const costs = calculateCosts();

  const handleChooseWorker = (worker: Worker) => {
    setSelectedWorker(worker);
  };

  const handleProceed = () => {
    if (selectedWorker) {
      onNext({ selectedWorker });
    }
  };

  // Show worker profile if viewing
  if (viewingProfile) {
    return (
      <WorkerProfileView
        worker={viewingProfile}
        onClose={() => setViewingProfile(null)}
        onChooseWorker={() => {
          handleChooseWorker(viewingProfile);
          setViewingProfile(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Indicator */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-primary rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium">Worker</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-muted rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Summary & Price */}
          <div className="lg:col-span-1 space-y-4">
            {/* Booking Details */}
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold">Booking Details</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Where:</span>
                  <span className="text-right">{data.streetAddress?.split(',')[0] || 'Address'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">What:</span>
                  <span>Indoor Cleaning</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">When:</span>
                  <span>
                    {data.startDate 
                      ? `${data.startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                      : 'Not set'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{data.startTime || 'Not set'}</span>
                </div>
              </div>
            </Card>

            {/* Price Breakdown */}
            <Card className="p-4 space-y-4">
              <h3 className="font-semibold">Price Breakdown</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Cost</span>
                  <span>₦{costs.basePrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Est. {data.duration || 3.5} hrs @₦{Math.round((costs.basePrice / (data.duration || 3.5)))}/hr
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Comp ID:</span>
                  <span className="text-xs bg-primary/10 px-2 py-1 rounded">
                    <Badge variant="outline" className="text-xs">NEW</Badge>
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>₦{costs.serviceFee}</span>
                </div>

                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Booking Total</span>
                    <span>₦{costs.basePrice + costs.bookingFee + costs.serviceFee}</span>
                  </div>
                </div>

                {/* Wallet Toggle */}
                <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Use TaimaakoCred Wallet</p>
                    <p className="text-xs text-muted-foreground">-₦150 discount</p>
                  </div>
                  <Switch checked={useWallet} onCheckedChange={setUseWallet} />
                </div>

                {useWallet && (
                  <div className="flex justify-between text-primary">
                    <span>Wallet Discount</span>
                    <span>-₦{costs.walletDiscount}</span>
                  </div>
                )}

                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL DUE</span>
                    <span>₦{costs.total}</span>
                  </div>
                </div>
              </div>

              {/* Voucher Input */}
              <div className="space-y-2 pt-2 border-t">
                <label className="text-sm font-medium">Apply a Voucher</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Voucher Code or VCode"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" disabled={!voucherCode}>
                    Apply
                  </Button>
                </div>
              </div>
            </Card>

            {/* Selected Worker Card */}
            {selectedWorker && (
              <Card className="p-4 bg-primary text-primary-foreground">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={selectedWorker.photo}
                    alt={selectedWorker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{selectedWorker.name}</p>
                    <p className="text-xs opacity-90">Your selected TaimaakoStar</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Worker List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Choose your worker</h2>
              <p className="text-sm text-muted-foreground">{mockWorkers.length} available nearby</p>
            </div>

            {/* Auto-assign option */}
            <Card className="p-4 bg-secondary border-2 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Choose for me</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our team will find a worker that can help you. Keep in mind you won't be able to select your own worker.
                  </p>
                  <Button variant="outline" className="mt-3 w-full sm:w-auto" size="sm">
                    Let TaimaakoHQ Choose For Me
                  </Button>
                </div>
              </div>
            </Card>

            {/* Worker Cards */}
            <div className="space-y-3">
              {mockWorkers.map((worker) => {
                const isSelected = selectedWorker?.id === worker.id;
                
                return (
                  <Card 
                    key={worker.id}
                    className={`p-4 transition-all ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Worker Photo & Basic Info */}
                      <div className="flex items-start gap-3 flex-1">
                        <div className="relative">
                          <ImageWithFallback
                            src={worker.photo}
                            alt={worker.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {worker.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                              <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div>
                              <h3 className="font-semibold">{worker.name}</h3>
                              {worker.recommended && (
                                <Badge variant="secondary" className="mt-1 text-xs">
                                  <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
                                  Recommended
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-foreground">{worker.rating}</span>
                              <span>({worker.reviewCount})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{worker.jobsCompleted} jobs</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{worker.distance} away</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {worker.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex sm:flex-col gap-2 sm:w-32">
                        <Button
                          variant="link"
                          size="sm"
                          className="text-primary text-xs"
                          onClick={() => setViewingProfile(worker)}
                        >
                          View profile
                        </Button>
                        <Button
                          onClick={() => handleChooseWorker(worker)}
                          className={`flex-1 ${
                            isSelected 
                              ? 'bg-primary hover:bg-primary/90' 
                              : 'bg-primary hover:bg-primary/90'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Choose me'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
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
                disabled={!selectedWorker}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}