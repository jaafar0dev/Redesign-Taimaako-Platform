import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Calendar, Clock, MapPin, User, Star, MessageSquare, Phone } from 'lucide-react';

interface Booking {
  id: string;
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
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
}

interface ClientBookingsProps {
  onRebookService: (serviceId: string) => void;
}

export function ClientBookings({ onRebookService }: ClientBookingsProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const upcomingBookings: Booking[] = [
    {
      id: '1',
      service: 'Indoor Cleaning',
      serviceIcon: '🏠',
      date: 'Monday, Feb 5, 2026',
      time: '10:00 AM',
      duration: '3 hours',
      location: 'Garki, Abuja',
      worker: {
        name: 'Amina Ibrahim',
        rating: 4.8,
        photo: 'AI'
      },
      status: 'upcoming',
      price: 12000
    },
    {
      id: '2',
      service: 'Cooking',
      serviceIcon: '🍳',
      date: 'Wednesday, Feb 7, 2026',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Garki, Abuja',
      status: 'upcoming',
      price: 10000
    }
  ];

  const pastBookings: Booking[] = [
    {
      id: '3',
      service: 'Indoor Cleaning',
      serviceIcon: '🏠',
      date: 'Monday, Jan 29, 2026',
      time: '10:00 AM',
      duration: '3 hours',
      location: 'Garki, Abuja',
      worker: {
        name: 'Amina Ibrahim',
        rating: 4.8,
        photo: 'AI'
      },
      status: 'completed',
      price: 12000
    },
    {
      id: '4',
      service: 'Laundry & Ironing',
      serviceIcon: '🧺',
      date: 'Friday, Jan 26, 2026',
      time: '3:00 PM',
      duration: '2 hours',
      location: 'Garki, Abuja',
      worker: {
        name: 'Chiamaka Obi',
        rating: 4.9,
        photo: 'CO'
      },
      status: 'completed',
      price: 8000
    },
    {
      id: '5',
      service: 'Cooking',
      serviceIcon: '🍳',
      date: 'Tuesday, Jan 23, 2026',
      time: '1:00 PM',
      duration: '2 hours',
      location: 'Garki, Abuja',
      worker: {
        name: 'Fatima Bello',
        rating: 5.0,
        photo: 'FB'
      },
      status: 'completed',
      price: 10000
    }
  ];

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{booking.serviceIcon}</div>
          <div>
            <h4 className="font-semibold">{booking.service}</h4>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {booking.date}
            </p>
          </div>
        </div>
        <Badge variant={booking.status === 'upcoming' ? 'default' : 'secondary'}>
          {booking.status}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{booking.time} • {booking.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{booking.location}</span>
        </div>
        {booking.worker && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
              {booking.worker.photo}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{booking.worker.name}</p>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{booking.worker.rating}</span>
              </div>
            </div>
          </div>
        )}
        <div className="pt-2 border-t">
          <p className="font-semibold">₦{booking.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button 
          className="flex-1" 
          size="sm"
          onClick={() => setSelectedBooking(booking)}
        >
          View Details
        </Button>
        {booking.status === 'completed' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onRebookService(booking.service.toLowerCase().replace(' ', ''))}
          >
            Rebook
          </Button>
        )}
      </div>
    </Card>
  );

  if (selectedBooking) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedBooking(null)}>
            ← Back to Bookings
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{selectedBooking.serviceIcon}</div>
              <div>
                <h2 className="text-2xl font-semibold">{selectedBooking.service}</h2>
                <p className="text-muted-foreground">Booking ID: #{selectedBooking.id}</p>
              </div>
            </div>
            <Badge variant={selectedBooking.status === 'upcoming' ? 'default' : 'secondary'} className="text-sm">
              {selectedBooking.status}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedBooking.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time & Duration</p>
                    <p className="font-medium">{selectedBooking.time} • {selectedBooking.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedBooking.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {selectedBooking.worker && (
              <div className="space-y-4">
                <h3 className="font-semibold">Your TaimaakoStar</h3>
                <Card className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                      {selectedBooking.worker.photo}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{selectedBooking.worker.name}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{selectedBooking.worker.rating}</span>
                        <span className="text-sm text-muted-foreground">(127 reviews)</span>
                      </div>
                    </div>
                  </div>
                  {selectedBooking.status === 'upcoming' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-primary">₦{selectedBooking.price.toLocaleString()}</span>
            </div>
            {selectedBooking.status === 'upcoming' && (
              <div className="flex gap-2">
                <Button className="flex-1">Modify Booking</Button>
                <Button variant="destructive" className="flex-1">Cancel Booking</Button>
              </div>
            )}
            {selectedBooking.status === 'completed' && (
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => onRebookService(selectedBooking.service.toLowerCase().replace(' ', ''))}>
                  Book Again
                </Button>
                <Button variant="outline" className="flex-1">Leave Review</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">My Bookings</h2>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No upcoming bookings</p>
              <Button onClick={() => onRebookService('indoor')}>Book a Service</Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {pastBookings.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No past bookings</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
