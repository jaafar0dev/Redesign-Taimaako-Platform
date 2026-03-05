import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Check, 
  X, 
  Star, 
  Zap,
  Crown,
  Calendar,
  Clock,
  Shield,
  HeadphonesIcon,
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  price: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  sessions: {
    monthly: number;
    quarterly: number;
    annual: number;
  };
  pricePerSession: number;
  badge?: string;
  badgeColor?: string;
  features: {
    included: string[];
    notIncluded?: string[];
  };
  popular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    icon: Star,
    iconColor: 'text-blue-600',
    price: {
      monthly: 15000,
      quarterly: 40000,
      annual: 150000
    },
    sessions: {
      monthly: 4,
      quarterly: 12,
      annual: 48
    },
    pricePerSession: 3750,
    features: {
      included: [
        '4 sessions per month (3-4 hours each)',
        'Book up to 7 days in advance',
        'Standard worker matching',
        'Basic customer support',
        'Session rescheduling (24hr notice)',
        'Access to verified workers'
      ],
      notIncluded: [
        'Priority booking',
        'Same-day booking',
        'Preferred worker selection'
      ]
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    icon: Zap,
    iconColor: 'text-primary',
    price: {
      monthly: 25000,
      quarterly: 67500,
      annual: 252000
    },
    sessions: {
      monthly: 8,
      quarterly: 24,
      annual: 96
    },
    pricePerSession: 3125,
    badge: 'Most Popular',
    badgeColor: 'bg-primary text-white',
    popular: true,
    features: {
      included: [
        '8 sessions per month (3-4 hours each)',
        'Book up to 14 days in advance',
        'Priority worker matching',
        'Priority customer support',
        'Flexible rescheduling (12hr notice)',
        'Same-day booking (subject to availability)',
        'Choose preferred workers',
        'Multiple service types per session',
        '10% discount on additional sessions'
      ],
      notIncluded: [
        'Dedicated account manager',
        'Premium workers only'
      ]
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: Crown,
    iconColor: 'text-yellow-600',
    price: {
      monthly: 45000,
      quarterly: 121500,
      annual: 453600
    },
    sessions: {
      monthly: 16,
      quarterly: 48,
      annual: 192
    },
    pricePerSession: 2813,
    badge: 'Best Value',
    badgeColor: 'bg-yellow-600 text-white',
    features: {
      included: [
        '16 sessions per month (3-4 hours each)',
        'Unlimited advance booking',
        'Premium worker matching',
        'Dedicated account manager',
        '24/7 priority support',
        'Same-day booking guaranteed',
        'Select & lock preferred workers',
        'All service types included',
        '20% discount on additional sessions',
        'Free session rollover (unused sessions)',
        'Access to premium-tier workers only',
        'Complimentary deep cleaning quarterly'
      ]
    }
  }
];

interface CurrentSubscription {
  plan: string;
  sessionsRemaining: number;
  totalSessions: number;
  renewalDate: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
}

export function ClientSubscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Mock current subscription
  const currentSubscription: CurrentSubscription | null = {
    plan: 'standard',
    sessionsRemaining: 5,
    totalSessions: 8,
    renewalDate: 'March 6, 2026',
    billingCycle: 'monthly'
  };

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    console.log('Subscribe to:', planId, 'Billing:', billingCycle);
    // Handle subscription logic
  };

  const handleUpgrade = (planId: string) => {
    console.log('Upgrade to:', planId);
    // Handle upgrade logic
  };

  const handleDowngrade = (planId: string) => {
    console.log('Downgrade to:', planId);
    // Handle downgrade logic
  };

  const getSavingsPercentage = (cycle: 'quarterly' | 'annual') => {
    if (cycle === 'quarterly') return '10%';
    if (cycle === 'annual') return '17%';
    return '0%';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Choose Your Subscription Plan
        </h1>
        <p className="text-muted-foreground text-lg">
          Get regular home services at discounted rates. All plans include verified workers, 
          flexible scheduling, and quality guarantee.
        </p>
      </div>

      {/* Current Subscription Banner */}
      {currentSubscription && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary">Current Plan</Badge>
                <h3 className="text-xl font-semibold capitalize">
                  {currentSubscription.plan}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Sessions Remaining</p>
                  <p className="text-2xl font-bold">
                    {currentSubscription.sessionsRemaining}/{currentSubscription.totalSessions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renewal Date</p>
                  <p className="text-lg font-semibold">{currentSubscription.renewalDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="text-lg font-semibold capitalize">{currentSubscription.billingCycle}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="hidden md:flex">
              Manage Subscription
            </Button>
          </div>
        </Card>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly" className="relative">
              Quarterly
              <Badge variant="secondary" className="ml-1 text-[10px] px-1">
                Save 10%
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="annual" className="relative">
              Annual
              <Badge variant="secondary" className="ml-1 text-[10px] px-1">
                Save 17%
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => {
          const Icon = plan.icon;
          const price = plan.price[billingCycle];
          const sessions = plan.sessions[billingCycle];
          const isCurrentPlan = currentSubscription?.plan === plan.id;
          const canUpgrade = currentSubscription && subscriptionPlans.findIndex(p => p.id === currentSubscription.plan) < subscriptionPlans.findIndex(p => p.id === plan.id);
          const canDowngrade = currentSubscription && subscriptionPlans.findIndex(p => p.id === currentSubscription.plan) > subscriptionPlans.findIndex(p => p.id === plan.id);

          return (
            <Card 
              key={plan.id}
              className={`relative p-6 ${
                plan.popular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'border-border'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className={plan.badgeColor}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4`}>
                  <Icon className={`w-8 h-8 ${plan.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{formatPrice(price)}</span>
                  <span className="text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'mo' : billingCycle === 'quarterly' ? '3mo' : 'yr'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {sessions} sessions • {formatPrice(plan.pricePerSession)}/session
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.included.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.features.notIncluded?.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 opacity-40">
                    <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {isCurrentPlan ? (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : canUpgrade ? (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleUpgrade(plan.id)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
              ) : canDowngrade ? (
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleDowngrade(plan.id)}
                >
                  Switch to {plan.name}
                </Button>
              ) : (
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Get Started
                </Button>
              )}
            </Card>
          );
        })}
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Flexible Scheduling</h4>
              <p className="text-sm text-muted-foreground">
                Book sessions at your convenience. Choose 1x, 2x, or 3x weekly schedules.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality Guaranteed</h4>
              <p className="text-sm text-muted-foreground">
                All workers are verified, trained, and insured. 100% satisfaction guarantee.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <HeadphonesIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Our team is always here to help with any questions or concerns.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="p-6 mt-8">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div className="pb-4 border-b border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              What happens to unused sessions?
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Basic & Standard: Unused sessions expire at the end of billing cycle. 
              Premium: Unused sessions roll over for up to 3 months.
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Can I cancel my subscription?
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Yes, you can cancel anytime. You'll continue to have access until the end of your billing period.
            </p>
          </div>

          <div className="pb-4 border-b border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Can I book additional sessions beyond my plan?
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              Yes! Standard plan gets 10% off, Premium gets 20% off on additional sessions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              How does the quarterly/annual discount work?
            </h4>
            <p className="text-sm text-muted-foreground pl-6">
              You pay upfront for 3 months (quarterly) or 12 months (annual) and get 10% or 17% off respectively.
            </p>
          </div>
        </div>
      </Card>

      {/* Custom Plan CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <h3 className="text-2xl font-bold mb-2">Need a Custom Plan?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          For businesses or households with unique needs, we can create a custom subscription plan tailored to your requirements.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          Contact Us for Custom Plan
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </Card>
    </div>
  );
}
