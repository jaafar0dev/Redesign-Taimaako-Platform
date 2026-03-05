import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Minus, 
  ShoppingCart,
  Check,
  Sparkles,
  Package
} from 'lucide-react';

interface SessionPackage {
  id: string;
  sessions: number;
  price: number;
  pricePerSession: number;
  discount?: number;
  popular?: boolean;
  savings?: number;
}

const sessionPackages: SessionPackage[] = [
  {
    id: 'single',
    sessions: 1,
    price: 5000,
    pricePerSession: 5000
  },
  {
    id: 'small',
    sessions: 3,
    price: 13500,
    pricePerSession: 4500,
    discount: 10,
    savings: 1500
  },
  {
    id: 'medium',
    sessions: 5,
    price: 21250,
    pricePerSession: 4250,
    discount: 15,
    savings: 3750,
    popular: true
  },
  {
    id: 'large',
    sessions: 10,
    price: 40000,
    pricePerSession: 4000,
    discount: 20,
    savings: 10000
  }
];

interface AddOnSessionsProps {
  currentPlan?: 'basic' | 'standard' | 'premium';
  onPurchase?: (packageId: string, quantity: number) => void;
}

export function AddOnSessions({ currentPlan, onPurchase }: AddOnSessionsProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Apply plan discounts
  const getPlanDiscount = () => {
    if (currentPlan === 'standard') return 10;
    if (currentPlan === 'premium') return 20;
    return 0;
  };

  const planDiscount = getPlanDiscount();

  const calculateFinalPrice = (basePrice: number) => {
    if (planDiscount > 0) {
      return basePrice * (1 - planDiscount / 100);
    }
    return basePrice;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePurchase = () => {
    if (selectedPackage) {
      onPurchase?.(selectedPackage, quantity);
    }
  };

  const selectedPackageData = sessionPackages.find(p => p.id === selectedPackage);
  const totalPrice = selectedPackageData 
    ? calculateFinalPrice(selectedPackageData.price) * quantity 
    : 0;
  const totalSessions = selectedPackageData 
    ? selectedPackageData.sessions * quantity 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Purchase Additional Sessions</h2>
        <p className="text-muted-foreground">
          Need more sessions this month? Buy session packages at discounted rates.
        </p>
        {planDiscount > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              Your {currentPlan} plan gets {planDiscount}% off all add-on sessions!
            </span>
          </div>
        )}
      </div>

      {/* Session Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sessionPackages.map((pkg) => {
          const finalPrice = calculateFinalPrice(pkg.price);
          const isSelected = selectedPackage === pkg.id;
          const totalDiscount = (pkg.discount || 0) + planDiscount;

          return (
            <Card
              key={pkg.id}
              className={`p-5 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-2 border-primary shadow-lg' 
                  : 'border-border hover:border-primary/50'
              } ${pkg.popular ? 'relative' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
              )}

              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-1">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-3xl font-bold mb-1">
                  {pkg.sessions}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {pkg.sessions === 1 ? 'Session' : 'Sessions'}
                </p>

                <div className="mb-2">
                  {planDiscount > 0 && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(pkg.price)}
                    </p>
                  )}
                  <p className="text-2xl font-bold">
                    {formatPrice(finalPrice)}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground mb-3">
                  {formatPrice(calculateFinalPrice(pkg.pricePerSession))}/session
                </p>

                {totalDiscount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Save {totalDiscount}%
                  </Badge>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quantity Selector */}
      {selectedPackage && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Select Quantity</h3>
              <p className="text-sm text-muted-foreground">
                How many packages would you like to purchase?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-bold w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-secondary rounded-lg mb-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
              <span className="text-muted-foreground">
                {selectedPackageData?.sessions} sessions × {quantity} package{quantity > 1 ? 's' : ''}
              </span>
              <span className="font-semibold">{totalSessions} sessions</span>
            </div>

            <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">
                {formatPrice((selectedPackageData?.price || 0) * quantity)}
              </span>
            </div>

            {planDiscount > 0 && (
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-primary font-medium">
                  {currentPlan} Plan Discount (-{planDiscount}%)
                </span>
                <span className="text-primary font-semibold">
                  -{formatPrice(((selectedPackageData?.price || 0) * quantity * planDiscount) / 100)}
                </span>
              </div>
            )}

            {(selectedPackageData?.savings || 0) > 0 && (
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
                <span className="text-green-600 font-medium">
                  Package Savings
                </span>
                <span className="text-green-600 font-semibold">
                  -{formatPrice((selectedPackageData?.savings || 0) * quantity)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary text-2xl">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button 
            className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
            onClick={handlePurchase}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Purchase {totalSessions} Session{totalSessions > 1 ? 's' : ''}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-3">
            Additional sessions are valid for 90 days from purchase date
          </p>
        </Card>
      )}

      {/* Benefits */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <h3 className="font-semibold mb-3">Why Buy Session Packages?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">Save up to 20% with larger packages</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">90-day validity period</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">Use across all service types</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">Additional plan discounts apply</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
