import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { 
  HelpCircle, 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronDown,
  ChevronUp,
  Book,
  CreditCard,
  Users,
  Calendar
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export function HelpPage({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      category: 'Booking',
      question: 'How do I book a service?',
      answer: 'Click on "Book a Service" from your dashboard, select the service you need, choose your preferences, and confirm your booking. You\'ll be matched with a qualified TaimaakoStar.'
    },
    {
      category: 'Booking',
      question: 'Can I schedule recurring bookings?',
      answer: 'Yes! When selecting your plan, choose a subscription option (1x, 2x, or 3x weekly) for recurring service at the same time each week.'
    },
    {
      category: 'Booking',
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 24 hours in advance. However, we often have workers available for same-day bookings depending on your area.'
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept debit/credit cards, bank transfers, and TaimaakoCred (wallet balance). All payments are processed securely.'
    },
    {
      category: 'Payment',
      question: 'When am I charged?',
      answer: 'Payment is charged after the manager confirms your booking and assigns a worker. You can cancel free of charge before confirmation.'
    },
    {
      category: 'Payment',
      question: 'Can I get a refund?',
      answer: 'Yes, if you cancel at least 24 hours before your booking. Cancellations within 24 hours may incur a small fee.'
    },
    {
      category: 'Workers',
      question: 'Are workers background checked?',
      answer: 'Yes, all TaimaakoStars undergo thorough background checks, ID verification, and skill assessment before joining our platform.'
    },
    {
      category: 'Workers',
      question: 'Can I request a specific worker?',
      answer: 'Yes! Once you\'ve worked with a TaimaakoStar you like, you can favorite them and request them for future bookings.'
    },
    {
      category: 'Workers',
      question: 'What if I\'m not satisfied with the service?',
      answer: 'Contact us immediately if you\'re not satisfied. We\'ll work to resolve the issue, which may include sending a different worker or providing a refund.'
    },
    {
      category: 'Account',
      question: 'How does the referral program work?',
      answer: 'Share your unique referral code with friends. When they complete their first booking, you both get rewarded - they get 50% off and you get ₦150 TaimaakoCred.'
    },
    {
      category: 'Account',
      question: 'What is TaimaakoCred?',
      answer: 'TaimaakoCred is wallet credit you can use to pay for services. You earn it through referrals or can top it up anytime.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFAQs = searchQuery
    ? faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Booking':
        return <Calendar className="w-5 h-5" />;
      case 'Payment':
        return <CreditCard className="w-5 h-5" />;
      case 'Workers':
        return <Users className="w-5 h-5" />;
      case 'Account':
        return <Book className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">How can we help you?</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team
            </p>
            <Button variant="outline" size="sm">Start Chat</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mon-Sat, 8AM-6PM WAT
            </p>
            <Button variant="outline" size="sm">+234 800 123 4567</Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We'll respond within 24 hours
            </p>
            <Button variant="outline" size="sm">support@taimaako.ng</Button>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          {categories.map((category) => {
            const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
            if (categoryFAQs.length === 0) return null;

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  {getCategoryIcon(category)}
                  <h3 className="text-lg font-semibold">{category}</h3>
                </div>
                {categoryFAQs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  const isExpanded = expandedFAQ === globalIndex;
                  
                  return (
                    <Card key={globalIndex}>
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No results found for "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or contact our support team
            </p>
          </Card>
        )}

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Still need help?</h3>
            <p className="text-muted-foreground">
              Our support team is ready to assist you with any questions or concerns
            </p>
            <Button size="lg">Contact Support</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
