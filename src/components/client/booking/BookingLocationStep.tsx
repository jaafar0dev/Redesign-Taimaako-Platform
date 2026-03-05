import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { MapPin, Edit3, X } from 'lucide-react';

interface BookingLocationStepProps {
  data?: {
    streetAddress?: string;
    apartmentNumber?: string;
  };
  onNext: (data: { streetAddress: string; apartmentNumber: string }) => void;
  onBack: () => void;
}

export function BookingLocationStep({ data, onNext, onBack }: BookingLocationStepProps) {
  const [streetAddress, setStreetAddress] = useState(data?.streetAddress || '');
  const [apartmentNumber, setApartmentNumber] = useState(data?.apartmentNumber || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (streetAddress.trim()) {
      onNext({ streetAddress, apartmentNumber });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Where do you need help?</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Street Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Street Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <Input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="e.g., Gimbiya Street, Garki II, Abuja"
                className="pl-10 pr-10 h-12 border-2 focus:border-primary"
                required
              />
              {streetAddress && (
                <button
                  type="button"
                  onClick={() => setStreetAddress('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Apartment Number */}
          <div className="space-y-2">
            <label className="text-sm font-medium italic text-muted-foreground">
              Unit / Apartment No. and Name (Optional)
            </label>
            <div className="relative">
              <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                placeholder="Eg. 2a Einwood Place"
                className="pl-10 h-12 border-2 focus:border-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 h-12 border-2"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-primary hover:bg-primary/90"
              disabled={!streetAddress.trim()}
            >
              Set location
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
