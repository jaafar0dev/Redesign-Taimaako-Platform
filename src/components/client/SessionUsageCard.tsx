import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface SessionUsageCardProps {
  plan: 'basic' | 'standard' | 'premium';
  sessionsUsed: number;
  totalSessions: number;
  renewalDate: string;
  onBookSession?: () => void;
  onUpgradePlan?: () => void;
}

export function SessionUsageCard({
  plan,
  sessionsUsed,
  totalSessions,
  renewalDate,
  onBookSession,
  onUpgradePlan
}: SessionUsageCardProps) {
  const sessionsRemaining = totalSessions - sessionsUsed;
  const usagePercentage = (sessionsUsed / totalSessions) * 100;
  
  const planConfig = {
    basic: {
      name: 'Basic',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600',
      lightBg: 'bg-blue-50'
    },
    standard: {
      name: 'Standard',
      color: 'text-primary',
      bgColor: 'bg-primary',
      lightBg: 'bg-primary/10'
    },
    premium: {
      name: 'Premium',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-600',
      lightBg: 'bg-yellow-50'
    }
  };

  const config = planConfig[plan];
  const isRunningLow = sessionsRemaining <= 2 && sessionsRemaining > 0;
  const isOutOfSessions = sessionsRemaining === 0;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold capitalize">{config.name}</h3>
            <Badge variant="secondary" className="text-xs">
              Active
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onUpgradePlan}>
          <Sparkles className="w-4 h-4 mr-1" />
          Upgrade
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Session Usage</span>
          <span className="text-sm text-muted-foreground">
            {sessionsUsed} of {totalSessions} used
          </span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              isOutOfSessions 
                ? 'bg-red-500' 
                : isRunningLow 
                  ? 'bg-yellow-500' 
                  : config.bgColor
            }`}
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>

      {/* Sessions Remaining */}
      <div className={`p-4 rounded-lg mb-4 ${
        isOutOfSessions 
          ? 'bg-red-50 border border-red-200' 
          : isRunningLow 
            ? 'bg-yellow-50 border border-yellow-200' 
            : config.lightBg
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOutOfSessions ? (
              <AlertCircle className="w-8 h-8 text-red-600" />
            ) : isRunningLow ? (
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            ) : (
              <CheckCircle2 className={`w-8 h-8 ${config.color}`} />
            )}
            <div>
              <p className="text-2xl font-bold">
                {sessionsRemaining}
              </p>
              <p className="text-sm text-muted-foreground">
                Sessions Remaining
              </p>
            </div>
          </div>
          {!isOutOfSessions && (
            <Button 
              className={`${config.bgColor} hover:opacity-90`}
              onClick={onBookSession}
            >
              Book Session
            </Button>
          )}
        </div>
      </div>

      {/* Alert Messages */}
      {isOutOfSessions && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-900">
                You've used all your sessions
              </p>
              <p className="text-xs text-red-700 mt-1">
                Your plan renews on {renewalDate}. Upgrade now for more sessions or book additional sessions at standard rates.
              </p>
            </div>
          </div>
        </div>
      )}

      {isRunningLow && !isOutOfSessions && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-yellow-900">
                Running low on sessions
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                Consider upgrading your plan or booking additional sessions for next month.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Renewal Info */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Renews on {renewalDate}</span>
        </div>
        {!isRunningLow && !isOutOfSessions && (
          <div className="flex items-center gap-1 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">On track</span>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {isOutOfSessions && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onBookSession}
          >
            <Clock className="w-4 h-4 mr-2" />
            Book Extra
          </Button>
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={onUpgradePlan}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      )}
    </Card>
  );
}
