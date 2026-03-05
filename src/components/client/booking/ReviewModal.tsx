import React, { useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Textarea } from '../../ui/textarea';
import { Star, X } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface ReviewModalProps {
  workerName: string;
  workerPhoto: string;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

const reviewQuestions = [
  'Quality of work',
  'Punctuality',
  'Professionalism',
  'Communication'
];

export function ReviewModal({ workerName, workerPhoto, onClose, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [questionRatings, setQuestionRatings] = useState<Record<string, number>>({});

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, review);
  };

  const handleQuestionRating = (question: string, value: number) => {
    setQuestionRatings(prev => ({
      ...prev,
      [question]: value
    }));
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Rate Your Experience</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Worker Info */}
            <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
              <ImageWithFallback
                src={workerPhoto}
                alt={workerName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-muted-foreground">How was your experience with</p>
                <p className="text-lg font-semibold">{workerName}</p>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="text-center">
              <p className="text-lg font-semibold mb-4">Overall Rating</p>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating === 5 && 'Excellent! 🌟'}
                  {rating === 4 && 'Very Good! 👍'}
                  {rating === 3 && 'Good 😊'}
                  {rating === 2 && 'Fair 🤔'}
                  {rating === 1 && 'Poor 😞'}
                </p>
              )}
            </div>

            {/* Detailed Ratings */}
            <div className="space-y-4">
              <p className="font-semibold">Rate specific aspects:</p>
              {reviewQuestions.map((question) => (
                <div key={question} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <span className="text-sm font-medium">{question}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleQuestionRating(question, star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= (questionRatings[question] || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-muted text-muted'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Written Review */}
            <div>
              <label className="font-semibold mb-2 block">
                Tell us more about your experience (optional)
              </label>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share details about your experience to help other clients..."
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {review.length}/500 characters
              </p>
            </div>

            {/* Tips Section */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-900 mb-2">💚 Show your appreciation</p>
              <p className="text-xs text-green-700 mb-3">
                Consider giving a tip to {workerName.split(' ')[0]} for excellent service
              </p>
              <div className="grid grid-cols-4 gap-2">
                {['₦500', '₦1000', '₦2000', 'Custom'].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="text-xs border-green-600 text-green-700 hover:bg-green-100"
                  >
                    {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
