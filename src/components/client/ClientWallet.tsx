import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, Gift, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

export function ClientWallet() {
  const [balance] = useState(150);
  const [isAddingFunds, setIsAddingFunds] = useState(false);
  const [amount, setAmount] = useState('');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 150,
      description: 'Referral bonus - Blessing Nwosu joined',
      date: 'Feb 1, 2026'
    },
    {
      id: '2',
      type: 'debit',
      amount: 500,
      description: 'Applied to booking #1234',
      date: 'Jan 28, 2026'
    },
    {
      id: '3',
      type: 'credit',
      amount: 500,
      description: 'Top-up',
      date: 'Jan 25, 2026'
    },
    {
      id: '4',
      type: 'credit',
      amount: 150,
      description: 'Referral bonus - Emeka Okonkwo joined',
      date: 'Jan 20, 2026'
    }
  ];

  const handleAddFunds = () => {
    // In a real app, this would process the payment
    setAmount('');
    setIsAddingFunds(false);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">TaimaakoCred Wallet</h2>

      <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm opacity-90 mb-1">Available Balance</p>
            <p className="text-4xl font-bold">₦{balance.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            className="flex-1"
            onClick={() => setIsAddingFunds(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </Button>
          <Button variant="secondary" className="flex-1">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Transfer
          </Button>
        </div>
      </Card>

      {isAddingFunds && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add Funds to Wallet</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quick amounts</label>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                  >
                    ₦{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Or enter custom amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleAddFunds} disabled={!amount}>
                Add ₦{amount || '0'} to Wallet
              </Button>
              <Button variant="outline" onClick={() => setIsAddingFunds(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-secondary">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Earn ₦150 per Referral</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Invite friends to join Taimaako and earn TaimaakoCred when they complete their first booking.
            </p>
            <Button size="sm">
              Share Referral Link
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <Card>
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <p className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">How TaimaakoCred Works</h3>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Earn Credits</p>
              <p className="text-muted-foreground">Get ₦150 for every friend you refer who completes a booking</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Use Credits</p>
              <p className="text-muted-foreground">Apply your credits to any booking to reduce the cost</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Top Up Anytime</p>
              <p className="text-muted-foreground">Add funds to your wallet for faster checkout</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
