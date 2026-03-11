import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Share2, Copy, Mail, MessageSquare, Users, Gift, CheckCircle } from 'lucide-react';

interface Referral {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  earnedAmount: number;
  date: string;
}

export function ClientReferral() {
  const referralCode = 'CHINEDU2026';
  const referralLink = `https://taimaako.ng/ref/${referralCode}`;
  
  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'Blessing Nwosu',
      status: 'completed',
      earnedAmount: 150,
      date: 'Feb 1, 2026'
    },
    {
      id: '2',
      name: 'Emeka Okonkwo',
      status: 'completed',
      earnedAmount: 150,
      date: 'Jan 20, 2026'
    },
    {
      id: '3',
      name: 'Aisha Mohammed',
      status: 'pending',
      earnedAmount: 0,
      date: 'Jan 30, 2026'
    }
  ]);
  //

  const totalEarned = referrals.reduce((sum, ref) => sum + ref.earnedAmount, 0);
  const completedReferrals = referrals.filter(r => r.status === 'completed').length;
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const shareVia = (method: string) => {
    const message = `Join me on Taimaako and get 50% off your first booking! Use my code: ${referralCode} or click: ${referralLink}`;
    
    switch (method) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Join Taimaako&body=${encodeURIComponent(message)}`, '_blank');
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Refer & Earn</h2>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Gift className="w-4 h-4 mr-2" />
          ₦{totalEarned} earned
        </Badge>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Earn ₦150 per Referral</h3>
              <p className="text-sm opacity-90">
                Share Taimaako with friends and family. You both get rewarded!
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{referrals.length}</p>
              <p className="text-sm opacity-90">Total Referrals</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{completedReferrals}</p>
              <p className="text-sm opacity-90">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{pendingReferrals}</p>
              <p className="text-sm opacity-90">Pending</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Your Referral Code</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="font-mono text-lg font-bold"
            />
            <Button onClick={() => copyToClipboard(referralCode)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="text-sm"
            />
            <Button onClick={() => copyToClipboard(referralLink)}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Share via</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2"
            onClick={() => shareVia('whatsapp')}
          >
            <MessageSquare className="w-6 h-6 text-green-600" />
            <span className="text-sm">WhatsApp</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2"
            onClick={() => shareVia('sms')}
          >
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="text-sm">SMS</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col h-auto py-4 gap-2"
            onClick={() => shareVia('email')}
          >
            <Mail className="w-6 h-6 text-red-600" />
            <span className="text-sm">Email</span>
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Referral History</h3>
        <Card>
          <div className="divide-y">
            {referrals.map((referral) => (
              <div key={referral.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-muted-foreground">{referral.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {referral.status === 'completed' ? (
                    <>
                      <p className="font-semibold text-green-600">+₦{referral.earnedAmount}</p>
                      <Badge variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Share your code</p>
              <p className="text-sm text-muted-foreground">
                Send your unique referral code to friends and family
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-medium">They get 50% off</p>
              <p className="text-sm text-muted-foreground">
                Your friend gets 50% off their first booking when they sign up
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-medium">You earn ₦150</p>
              <p className="text-sm text-muted-foreground">
                Get ₦150 TaimaakoCred when they complete their first booking
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
