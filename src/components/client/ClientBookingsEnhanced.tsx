import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BookingStatus } from './booking/BookingStatusTracker';
import { BookingDetailsView } from './booking/BookingDetailsView';

interface ClientBooking {
  id: string;
  status: BookingStatus;
  service: string;
  serviceIcon: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  worker?: {
    name: string;
    rating: number;
    photo: string;
  };
  price: string;
}

// Mock bookings with different statuses
const mockBookings: ClientBooking[] = [
  {
    id: 'BK-001',
    status: 'pending',
    service: 'Indoor Cleaning',
    serviceIcon: '🏠',
    date: 'Today, Feb 6',
    time: '2:00 PM - 6:00 PM',
    duration: '4 hours',
    location: '15 Gimbiya Street, Garki II',
    worker: {
      name: 'Blessing Okafor',
      rating: 4.8,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    price: '₦5,000'
  },
  {
    id: 'BK-002',
    status: 'accepted',
    service: 'Cooking Service',
    serviceIcon: '🍳',
    date: 'Tomorrow, Feb 7',
    time: '5:00 PM - 8:00 PM',
    duration: '3 hours',
    location: '15 Gimbiya Street, Garki II',
    worker: {
      name: 'Amina Mohammed',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    },
    price: '₦4,500'
  },
  {
    id: 'BK-003',
    status: 'in_progress',
    service: 'Indoor Cleaning',
    serviceIcon: '🏠',
    date: 'Today, Feb 6',
    time: '9:00 AM - 1:00 PM',
    duration: '4 hours',
    location: '15 Gimbiya Street, Garki II',
    worker: {
      name: 'Ibrahim Yusuf',
      rating: 4.7,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
    },
    price: '₦5,500'
  },
  {
    id: 'BK-004',
    status: 'completed',
    service: 'Laundry & Ironing',
    serviceIcon: '🧺',
    date: 'Yesterday, Feb 5',
    time: '1:00 PM - 4:00 PM',
    duration: '3 hours',
    location: '15 Gimbiya Street, Garki II',
    worker: {
      name: 'Chiamaka Obi',
      rating: 4.9,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'
    },
    price: '₦4,000'
  },
  {
    id: 'BK-005',
    status: 'reviewed',
    service: 'Indoor Cleaning',
    serviceIcon: '🏠',
    date: 'Feb 2, 2026',
    time: '10:00 AM - 2:00 PM',
    duration: '4 hours',
    location: '15 Gimbiya Street, Garki II',
    worker: {
      name: 'Fatima Abubakar',
      rating: 5.0,
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
    },
    price: '₦5,000'
  }
];

export function ClientBookingsEnhanced() {
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  // Filter bookings by status
  const activeBookings = mockBookings.filter(b => 
    ['pending', 'accepted', 'on_the_way', 'in_progress'].includes(b.status)
  );
  const completedBookings = mockBookings.filter(b => 
    ['completed', 'reviewed'].includes(b.status)
  );
  const cancelledBookings = mockBookings.filter(b => 
    ['cancelled', 'rejected'].includes(b.status)
  );

  const statusConfig = {
    pending: {
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200',
      label: 'Waiting Confirmation'
    },
    accepted: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      label: 'Confirmed'
    },
    on_the_way: {
      icon: Play,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      label: 'On The Way'
    },
    in_progress: {
      icon: Play,
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/20',
      label: 'In Progress'
    },
    completed: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      label: 'Completed'
    },
    reviewed: {
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 border-yellow-200',
      label: 'Reviewed'
    },
    rejected: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      label: 'Not Available'
    },
    cancelled: {
      icon: AlertCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 border-gray-200',
      label: 'Cancelled'
    }
  };

  const BookingCard = ({ booking }: { booking: ClientBooking }) => {
    const config = statusConfig[booking.status];
    const StatusIcon = config.icon;

    return (
      <Card 
        className={`p-4 border-l-4 ${config.bgColor} cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => setSelectedBookingId(booking.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-3xl">{booking.serviceIcon}</div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1">{booking.service}</h4>
              <div className="flex items-center gap-2">
                <StatusIcon className={`w-4 h-4 ${config.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {config.label}
                </Badge>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{booking.time} • {booking.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{booking.location}</span>
          </div>
        </div>

        {booking.worker && (
          <div className="flex items-center gap-3 pt-3 border-t border-border">
            <ImageWithFallback
              src={booking.worker.photo}
              alt={booking.worker.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium text-sm">{booking.worker.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{booking.worker.rating}</span>
              </div>
            </div>
            <span className="font-semibold text-primary">{booking.price}</span>
          </div>
        )}
      </Card>
    );
  };

  // Show booking details if selected
  if (selectedBookingId) {
    return (
      <BookingDetailsView
        bookingId={selectedBookingId}
        onBack={() => setSelectedBookingId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
        <p className="text-muted-foreground">Track and manage your service bookings</p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="active" className="relative">
            Active
            {activeBookings.length > 0 && (
              <Badge 
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary"
              >
                {activeBookings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {/* Active Bookings */}
        <TabsContent value="active" className="space-y-4 mt-6">
          {activeBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-lg font-semibold mb-2">No Active Bookings</h3>
              <p className="text-muted-foreground mb-6">
                You don't have any active bookings right now.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Book a Service
              </Button>
            </Card>
          ) : (
            activeBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        {/* Completed Bookings */}
        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-lg font-semibold mb-2">No Completed Bookings</h3>
              <p className="text-muted-foreground">
                Your completed service bookings will appear here.
              </p>
            </Card>
          ) : (
            completedBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>

        {/* Cancelled Bookings */}
        <TabsContent value="cancelled" className="space-y-4 mt-6">
          {cancelledBookings.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-5xl mb-4">🚫</div>
              <h3 className="text-lg font-semibold mb-2">No Cancelled Bookings</h3>
              <p className="text-muted-foreground">
                Your cancelled bookings will appear here.
              </p>
            </Card>
          ) : (
            cancelledBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
