import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Star, Heart, MessageSquare, Calendar, Award } from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviews: number;
  services: string[];
  completedJobs: number;
  joinedDate: string;
  favorite: boolean;
  bio: string;
}

interface ClientWorkersProps {
  onBookWorker: (workerId: string) => void;
}

export function ClientWorkers({ onBookWorker }: ClientWorkersProps) {
  const [workers, setWorkers] = useState<Worker[]>([
    {
      id: '1',
      name: 'Amina Ibrahim',
      photo: 'AI',
      rating: 4.8,
      reviews: 127,
      services: ['Indoor Cleaning', 'Laundry'],
      completedJobs: 156,
      joinedDate: 'June 2024',
      favorite: true,
      bio: 'Professional cleaner with 5+ years experience. Detail-oriented and reliable.'
    },
    {
      id: '2',
      name: 'Chiamaka Obi',
      photo: 'CO',
      rating: 4.9,
      reviews: 203,
      services: ['Laundry & Ironing', 'Indoor Cleaning'],
      completedJobs: 245,
      joinedDate: 'March 2024',
      favorite: true,
      bio: 'Expert in laundry services and home organization. Always on time.'
    },
    {
      id: '3',
      name: 'Fatima Bello',
      photo: 'FB',
      rating: 5.0,
      reviews: 89,
      services: ['Cooking', 'Meal Prep'],
      completedJobs: 102,
      joinedDate: 'August 2024',
      favorite: true,
      bio: 'Specialized in Nigerian and continental cuisine. Certified food handler.'
    },
    {
      id: '4',
      name: 'Joy Adeyemi',
      photo: 'JA',
      rating: 4.7,
      reviews: 145,
      services: ['Mom\'s Helper', 'Elder Care'],
      completedJobs: 178,
      joinedDate: 'January 2024',
      favorite: false,
      bio: 'Compassionate caregiver with nursing background. Great with kids and elderly.'
    }
  ]);

  const toggleFavorite = (workerId: string) => {
    setWorkers(workers.map(worker => 
      worker.id === workerId 
        ? { ...worker, favorite: !worker.favorite }
        : worker
    ));
  };

  const favoriteWorkers = workers.filter(w => w.favorite);
  const otherWorkers = workers.filter(w => !w.favorite);

  const WorkerCard = ({ worker }: { worker: Worker }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
            {worker.photo}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{worker.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{worker.rating}</span>
              <span className="text-sm text-muted-foreground">({worker.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => toggleFavorite(worker.id)}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${worker.favorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
          />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{worker.bio}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Award className="w-4 h-4 text-muted-foreground" />
          <span>{worker.completedJobs} completed jobs</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {worker.services.map((service, index) => (
            <span key={index} className="px-3 py-1 bg-secondary text-xs rounded-full">
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          className="flex-1"
          onClick={() => onBookWorker(worker.id)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Book {worker.name.split(' ')[0]}
        </Button>
        <Button variant="outline" size="icon">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My TaimaakoStars</h2>
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          <span className="text-sm text-muted-foreground">{favoriteWorkers.length} favorites</span>
        </div>
      </div>

      {favoriteWorkers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            Favorite Workers
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {favoriteWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      )}

      {otherWorkers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Workers You've Used</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {otherWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        </div>
      )}

      {workers.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No workers yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Book a service to start building your list of favorite workers
          </p>
          <Button onClick={() => onBookWorker('')}>Book a Service</Button>
        </Card>
      )}
    </div>
  );
}
