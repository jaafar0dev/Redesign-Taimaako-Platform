import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { WorkerBookingCard } from './WorkerBookingCard';
import { BookingStatus } from '../client/booking/BookingStatusTracker';

// Mock bookings data
const mockBookings = {
  pending: [
    {
      id: 'BK-001',
      status: 'pending' as BookingStatus,
      service: 'Indoor Cleaning',
      date: 'Today, Feb 6',
      time: '10:00 AM - 2:00 PM',
      duration: '4 hours',
      client: {
        name: 'Chinedu Okafor',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        location: '15 Gimbiya Street, Garki II, Abuja',
        distance: '2.3 km away',
        phone: '+234 803 456 7890'
      },
      payment: '₦5,000',
      notes: 'Please focus on kitchen and bathrooms. Keys with security.'
    },
    {
      id: 'BK-002',
      status: 'pending' as BookingStatus,
      service: 'Cooking Service',
      date: 'Tomorrow, Feb 7',
      time: '5:00 PM - 8:00 PM',
      duration: '3 hours',
      client: {
        name: 'Amina Mohammed',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        location: '45 Adetokunbo Ademola Crescent, Wuse II',
        distance: '4.1 km away',
        phone: '+234 805 123 4567'
      },
      payment: '₦4,500',
      notes: 'Prepare dinner for 4 people. Nigerian cuisine preferred.'
    }
  ],
  accepted: [
    {
      id: 'BK-003',
      status: 'accepted' as BookingStatus,
      service: 'Indoor Cleaning',
      date: 'Today, Feb 6',
      time: '2:00 PM - 6:00 PM',
      duration: '4 hours',
      client: {
        name: 'Ibrahim Yusuf',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        location: '12 Kumasi Crescent, Wuse II, Abuja',
        distance: '3.5 km away',
        phone: '+234 806 789 0123'
      },
      payment: '₦5,500'
    }
  ],
  in_progress: [
    {
      id: 'BK-004',
      status: 'in_progress' as BookingStatus,
      service: 'Indoor Cleaning',
      date: 'Today, Feb 6',
      time: '9:00 AM - 1:00 PM',
      duration: '4 hours',
      client: {
        name: 'Blessing Nwosu',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        location: '8 Rio Street, Maitama, Abuja',
        distance: '5.2 km away',
        phone: '+234 807 234 5678'
      },
      payment: '₦6,000',
      notes: 'Deep cleaning needed. All supplies provided.'
    }
  ],
  completed: [
    {
      id: 'BK-005',
      status: 'completed' as BookingStatus,
      service: 'Laundry & Ironing',
      date: 'Yesterday, Feb 5',
      time: '1:00 PM - 4:00 PM',
      duration: '3 hours',
      client: {
        name: 'Fatima Abubakar',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        location: '22 Lake Chad Crescent, Maitama',
        distance: '6.0 km away',
        phone: '+234 808 345 6789'
      },
      payment: '₦4,000'
    },
    {
      id: 'BK-006',
      status: 'completed' as BookingStatus,
      service: 'Indoor Cleaning',
      date: 'Feb 4, 2026',
      time: '10:00 AM - 2:00 PM',
      duration: '4 hours',
      client: {
        name: 'Tunde Adeyemi',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        location: '34 Gana Street, Maitama, Abuja',
        distance: '4.8 km away',
        phone: '+234 809 456 7890'
      },
      payment: '₦5,500'
    }
  ]
};

export function WorkerJobsSection() {
  const [bookings, setBookings] = useState(mockBookings);

  const handleAccept = (bookingId: string) => {
    console.log('Accept booking:', bookingId);
    // Move from pending to accepted
    const booking = bookings.pending.find(b => b.id === bookingId);
    if (booking) {
      setBookings({
        ...bookings,
        pending: bookings.pending.filter(b => b.id !== bookingId),
        accepted: [...bookings.accepted, { ...booking, status: 'accepted' as BookingStatus }]
      });
    }
  };

  const handleReject = (bookingId: string) => {
    console.log('Reject booking:', bookingId);
    // Remove from pending
    setBookings({
      ...bookings,
      pending: bookings.pending.filter(b => b.id !== bookingId)
    });
  };

  const handleStartWork = (bookingId: string) => {
    console.log('Start work:', bookingId);
    // Move from accepted to in_progress
    const booking = bookings.accepted.find(b => b.id === bookingId);
    if (booking) {
      setBookings({
        ...bookings,
        accepted: bookings.accepted.filter(b => b.id !== bookingId),
        in_progress: [...bookings.in_progress, { ...booking, status: 'in_progress' as BookingStatus }]
      });
    }
  };

  const handleCompleteWork = (bookingId: string) => {
    console.log('Complete work:', bookingId);
    // Move from in_progress to completed
    const booking = bookings.in_progress.find(b => b.id === bookingId);
    if (booking) {
      setBookings({
        ...bookings,
        in_progress: bookings.in_progress.filter(b => b.id !== bookingId),
        completed: [...bookings.completed, { ...booking, status: 'completed' as BookingStatus }]
      });
    }
  };

  const handleNavigate = (bookingId: string) => {
    console.log('Navigate to:', bookingId);
    // Open maps/navigation
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Jobs</h2>
        <p className="text-muted-foreground">Manage your booking requests and active jobs</p>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests" className="relative">
            New Requests
            {bookings.pending.length > 0 && (
              <Badge 
                variant="destructive" 
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {bookings.pending.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted
            {bookings.accepted.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {bookings.accepted.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            {bookings.in_progress.length > 0 && (
              <Badge 
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary"
              >
                {bookings.in_progress.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* New Requests */}
        <TabsContent value="requests" className="space-y-4 mt-6">
          {bookings.pending.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No new booking requests</p>
              <p className="text-sm mt-2">You'll be notified when new jobs are available</p>
            </div>
          ) : (
            bookings.pending.map((booking) => (
              <WorkerBookingCard
                key={booking.id}
                booking={booking}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))
          )}
        </TabsContent>

        {/* Accepted Jobs */}
        <TabsContent value="accepted" className="space-y-4 mt-6">
          {bookings.accepted.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No accepted bookings</p>
              <p className="text-sm mt-2">Jobs you accept will appear here</p>
            </div>
          ) : (
            bookings.accepted.map((booking) => (
              <WorkerBookingCard
                key={booking.id}
                booking={booking}
                onStartWork={handleStartWork}
                onNavigate={handleNavigate}
              />
            ))
          )}
        </TabsContent>

        {/* Active Jobs */}
        <TabsContent value="active" className="space-y-4 mt-6">
          {bookings.in_progress.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No active jobs</p>
              <p className="text-sm mt-2">Jobs in progress will appear here</p>
            </div>
          ) : (
            bookings.in_progress.map((booking) => (
              <WorkerBookingCard
                key={booking.id}
                booking={booking}
                onCompleteWork={handleCompleteWork}
              />
            ))
          )}
        </TabsContent>

        {/* Completed Jobs */}
        <TabsContent value="completed" className="space-y-4 mt-6">
          {bookings.completed.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No completed jobs yet</p>
              <p className="text-sm mt-2">Your completed jobs will appear here</p>
            </div>
          ) : (
            bookings.completed.map((booking) => (
              <WorkerBookingCard
                key={booking.id}
                booking={booking}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
