import React, { useEffect, useState } from 'react';
import { Progress } from '../../ui/progress';
import { ThumbsUp } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface WorkerMatchingStepProps {
  data?: any;
  onNext: (data?: any) => void;
  onBack: () => void;
}

const matchingWorkers = [
  {
    id: '1',
    name: 'Yemisi Bunkers',
    photo: 'https://images.unsplash.com/photo-1572002339854-2faa0fe06881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 99
  },
  {
    id: '2',
    name: 'Josphine Kunaka',
    photo: 'https://images.unsplash.com/photo-1559154352-06e29e1e11aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    rating: 97
  }
];

export function WorkerMatchingStep({ data, onNext, onBack }: WorkerMatchingStepProps) {
  const [progress, setProgress] = useState(0);
  const [currentWorkerIndex, setCurrentWorkerIndex] = useState(0);

  useEffect(() => {
    // Simulate matching with first worker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          
          // Move to next worker or finish
          if (currentWorkerIndex < matchingWorkers.length - 1) {
            setTimeout(() => {
              setCurrentWorkerIndex(currentWorkerIndex + 1);
              setProgress(0);
            }, 500);
          } else {
            setTimeout(() => onNext(), 800);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [currentWorkerIndex, onNext]);

  const currentWorker = matchingWorkers[currentWorkerIndex];

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Finding your match</h2>
          <p className="text-white/80 text-sm">
            Matching you with the best TaimaakoStars nearby
          </p>
        </div>

        {/* Worker Card */}
        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
          {/* Worker Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <ImageWithFallback
                src={currentWorker.photo}
                alt={currentWorker.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>

          {/* Worker Name */}
          <h3 className="text-xl font-semibold text-white">
            {currentWorker.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2 text-white">
            <ThumbsUp className="w-5 h-5 fill-white" />
            <span className="font-semibold text-lg">{currentWorker.rating}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <Progress 
              value={progress} 
              className="h-2 bg-white/30" 
            />
          </div>
        </div>

        {/* Worker Counter */}
        <p className="text-white/70 text-sm">
          Checking availability ({currentWorkerIndex + 1}/{matchingWorkers.length})
        </p>
      </div>
    </div>
  );
}