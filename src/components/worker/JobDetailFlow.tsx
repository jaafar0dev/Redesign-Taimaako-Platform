import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Phone,
  MessageCircle,
  Navigation,
  CheckCircle2,
  PlayCircle,
  AlertCircle,
  Home,
  User
} from 'lucide-react';

interface Job {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  location: string;
  distance: string;
  date: string;
  time: string;
  duration: string;
  pay: number;
  status: 'available' | 'accepted' | 'on-the-way' | 'in-progress' | 'completed';
  clientRating: number;
  address: string;
  notes?: string;
  tasks?: string[];
}

interface JobDetailFlowProps {
  job: Job;
  onBack: () => void;
}

export function JobDetailFlow({ job, onBack }: JobDetailFlowProps) {
  const [currentStatus, setCurrentStatus] = useState<Job['status']>(job.status);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleStatusUpdate = (newStatus: Job['status']) => {
    setCurrentStatus(newStatus);
    // In real app, would update backend here
  };

  const getStatusConfig = () => {
    switch (currentStatus) {
      case 'available':
        return {
          label: 'Available',
          color: 'bg-blue-500',
          icon: AlertCircle,
          actionLabel: 'Accept Job',
          nextStatus: 'accepted' as const
        };
      case 'accepted':
        return {
          label: 'Accepted',
          color: 'bg-green-500',
          icon: CheckCircle2,
          actionLabel: "I'm On My Way",
          nextStatus: 'on-the-way' as const
        };
      case 'on-the-way':
        return {
          label: 'On The Way',
          color: 'bg-orange-500',
          icon: Navigation,
          actionLabel: 'Start Job',
          nextStatus: 'in-progress' as const
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          color: 'bg-purple-500',
          icon: PlayCircle,
          actionLabel: 'Complete Job',
          nextStatus: 'completed' as const
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-gray-500',
          icon: CheckCircle2,
          actionLabel: null,
          nextStatus: null
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  const steps = [
    { status: 'accepted', label: 'Accepted', completed: ['accepted', 'on-the-way', 'in-progress', 'completed'].includes(currentStatus) },
    { status: 'on-the-way', label: 'On The Way', completed: ['on-the-way', 'in-progress', 'completed'].includes(currentStatus) },
    { status: 'in-progress', label: 'In Progress', completed: ['in-progress', 'completed'].includes(currentStatus) },
    { status: 'completed', label: 'Completed', completed: currentStatus === 'completed' }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold">Job Details</h1>
              <p className="text-sm text-muted-foreground">ID: {job.id}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Status Banner */}
        <div className={`${statusConfig.color} text-white rounded-lg p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon className="w-6 h-6" />
              <div>
                <p className="font-semibold">Status: {statusConfig.label}</p>
                {currentStatus === 'in-progress' && (
                  <p className="text-sm text-white/80">Keep up the great work!</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatCurrency(job.pay)}</p>
              <p className="text-sm text-white/80">{job.duration}</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        {currentStatus !== 'available' && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Job Progress</h3>
            <div className="relative">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.status} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          step.completed
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-sm">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium text-center ${
                          step.completed ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 bg-gray-200 mx-2" style={{ marginTop: '-30px' }}>
                        <div
                          className={`h-full transition-all ${
                            step.completed ? 'bg-primary' : 'bg-gray-200'
                          }`}
                          style={{ width: step.completed ? '100%' : '0%' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Client Information */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Client Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-lg">
                  {job.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{job.clientName}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="text-sm font-medium">{job.clientRating}</span>
                    <span className="text-xs text-muted-foreground ml-1">rating</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Job Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Service</p>
                <p className="text-muted-foreground">{job.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">{job.address}</p>
                <p className="text-sm text-primary mt-1">{job.distance} away</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-muted-foreground">{job.date} at {job.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-muted-foreground">{job.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Payment</p>
                <p className="text-muted-foreground">{formatCurrency(job.pay)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Special Instructions */}
        {job.notes && (
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Special Instructions</h3>
            <p className="text-muted-foreground">{job.notes}</p>
          </Card>
        )}

        {/* Tasks Checklist (In Progress) */}
        {currentStatus === 'in-progress' && job.tasks && (
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Tasks</h3>
            <div className="space-y-2">
              {job.tasks.map((task, index) => (
                <label key={index} className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-primary" />
                  <span>{task}</span>
                </label>
              ))}
            </div>
          </Card>
        )}

        {/* Completion Confirmation */}
        {showCompleteConfirm && (
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-3">Ready to Complete?</h3>
            <p className="text-muted-foreground mb-4">
              Please confirm that you've finished all tasks and the client is satisfied with your work.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCompleteConfirm(false)}
              >
                Not Yet
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => handleStatusUpdate('completed')}
              >
                Yes, Complete Job
              </Button>
            </div>
          </Card>
        )}

        {/* Completion Summary */}
        {currentStatus === 'completed' && (
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Job Completed! 🎉</h3>
              <p className="text-muted-foreground mb-4">
                Great work! Your payment of {formatCurrency(job.pay)} will be added to your wallet once the client reviews.
              </p>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge className="bg-orange-500">Pending Review</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected in:</span>
                  <span className="font-medium">24-48 hours</span>
                </div>
              </div>
              <Button className="w-full" onClick={onBack}>
                Back to Jobs
              </Button>
            </div>
          </Card>
        )}
      </main>

      {/* Fixed Bottom Action */}
      {statusConfig.actionLabel && !showCompleteConfirm && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-10">
          <div className="max-w-4xl mx-auto">
            <Button
              className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
              onClick={() => {
                if (currentStatus === 'in-progress') {
                  setShowCompleteConfirm(true);
                } else if (statusConfig.nextStatus) {
                  handleStatusUpdate(statusConfig.nextStatus);
                }
              }}
            >
              {statusConfig.actionLabel}
              <CheckCircle2 className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}