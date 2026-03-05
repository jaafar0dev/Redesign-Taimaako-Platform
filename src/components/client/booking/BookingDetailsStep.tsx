import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { 
  Refrigerator, 
  Microwave, 
  DoorOpen, 
  Grid3x3, 
  Wallpaper,
  Droplets,
  Shirt,
  WashingMachine,
  Edit3,
  Calendar as CalendarIcon,
  Clock,
  Minus,
  Plus
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Calendar } from '../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

interface BookingDetailsStepProps {
  data?: {
    service?: string;
    streetAddress?: string;
    homeSize?: string;
    extraTasks?: string[];
    duration?: number;
    startDate?: Date;
    startTime?: string;
    instructions?: string;
  };
  onNext: (data: any) => void;
  onBack: () => void;
}

const extraTaskOptions = [
  { id: 'inside-fridge', label: 'Inside Fridge', icon: Refrigerator },
  { id: 'inside-oven', label: 'Inside Oven', icon: Microwave },
  { id: 'inside-cabinets', label: 'Inside Cabinets', icon: DoorOpen },
  { id: 'interior-windows', label: 'Interior Windows', icon: Grid3x3 },
  { id: 'interior-walls', label: 'Interior Walls', icon: Wallpaper },
  { id: 'water-plants', label: 'Water Plants', icon: Droplets },
  { id: 'ironing', label: 'Ironing', icon: Shirt },
  { id: 'laundry', label: 'Laundry', icon: WashingMachine },
];

const timeSlots = [
  '07:00 - 07:30', '07:30 - 08:00', '08:00 - 08:30', '08:30 - 09:00',
  '09:00 - 09:30', '09:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
  '11:00 - 11:30', '11:30 - 12:00', '12:00 - 12:30', '12:30 - 13:00',
  '13:00 - 13:30', '13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00',
  '15:00 - 15:30', '15:30 - 16:00', '16:00 - 16:30', '16:30 - 17:00',
];

const serviceLabelMap: Record<string, string> = {
  'indoor': 'Indoor Cleaning',
  'outdoor': 'Outdoor Services',
  'office': 'Office Cleaning',
  'ironing': 'Ironing',
  'laundry': 'Laundry & Ironing',
  'artisan': 'Artisan Cleaning',
  'nanny': 'Mom\'s Helper',
  'elder': 'Elder Care',
  'cooking': 'Cooking',
};

function formatDate(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[date.getDay()]} ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}`;
}

export function BookingDetailsStep({ data, onNext, onBack }: BookingDetailsStepProps) {
  const [homeSize, setHomeSize] = useState(data?.homeSize || 'medium');
  const [extraTasks, setExtraTasks] = useState<string[]>(data?.extraTasks || []);
  const [duration, setDuration] = useState(data?.duration || 3.5);
  const [startDate, setStartDate] = useState<Date | undefined>(data?.startDate || undefined);
  const [startTime, setStartTime] = useState(data?.startTime || '');
  const [instructions, setInstructions] = useState(data?.instructions || '');

  const toggleExtraTask = (taskId: string) => {
    setExtraTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(t => t !== taskId)
        : [...prev, taskId]
    );
  };

  const adjustDuration = (change: number) => {
    setDuration(prev => Math.max(1, Math.min(8, prev + change)));
  };

  const calculatePrice = () => {
    const basePrice = homeSize === 'small' ? 250 : homeSize === 'medium' ? 305 : 400;
    const extraTaskPrice = extraTasks.length * 25;
    return Math.round((basePrice + extraTaskPrice) * (duration / 3.5));
  };

  const handleSubmit = () => {
    onNext({
      homeSize,
      extraTasks,
      duration,
      startDate,
      startTime,
      instructions,
      estimatedPrice: calculatePrice()
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Indicator */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 mx-4 h-1 bg-muted rounded-full">
              <div className="h-full w-1/2 bg-primary rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">Worker</span>
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

      <div className="max-w-4xl mx-auto p-4 md:p-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Summary */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-4 space-y-3">
              <h3 className="font-semibold">Booking Details</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-muted-foreground">Where:</span>
                  <span className="text-right flex-1">{data?.streetAddress || 'Not set'}</span>
                  <button onClick={onBack} className="text-primary hover:underline">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-start justify-between gap-2">
                  <span className="text-muted-foreground">What:</span>
                  <span className="text-right flex-1">{serviceLabelMap[data?.service || 'indoor']}</span>
                </div>
              </div>

              <div className="bg-black text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{duration.toFixed(1)}</div>
                  <div className="text-xs">Est. Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">₦{calculatePrice()}</div>
                  <div className="text-xs">Est. Price</div>
                </div>
              </div>
            </Card>

            {/* Savings Card */}
            <Card className="p-4 bg-secondary">
              <div className="flex items-start gap-3">
                <div className="text-4xl">🐷</div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold">Book more, save more!</p>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>1 - 2 days: No service fee</li>
                    <li>3 - 4 days: Up to 15% off</li>
                    <li>5+ days: Up to 28% off</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Add details about your booking</h3>

              {/* Home Size */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">How big is your home?</label>
                <Select value={homeSize} onValueChange={setHomeSize}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small Home: 1-2 Bedrooms</SelectItem>
                    <SelectItem value="medium">Medium Home: 3-4 Bedrooms</SelectItem>
                    <SelectItem value="large">Large Home: 5+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Extra Tasks */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Extra Tasks</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {extraTaskOptions.map((task) => {
                    const Icon = task.icon;
                    const isSelected = extraTasks.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleExtraTask(task.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-center">{task.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">How Long?</label>
                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustDuration(-0.5)}
                    disabled={duration <= 1}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="text-4xl font-bold min-w-[100px] text-center">
                    {duration.toFixed(1)}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => adjustDuration(0.5)}
                    disabled={duration >= 8}
                    className="w-12 h-12 rounded-full border-2 border-primary"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Select start date:</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 border-2 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
                      {startDate ? formatDate(startDate) : <span className="text-muted-foreground">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Select start time:</label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Instructions */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Add specific instructions</label>
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add your notes here"
                  className="min-h-[100px] border-2 resize-none"
                />
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 border-2"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 bg-primary hover:bg-primary/90"
                disabled={!startDate || !startTime}
              >
                Find a Worker
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}