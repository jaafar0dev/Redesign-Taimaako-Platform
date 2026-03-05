import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { CreditCard, Plus, Trash2, CheckCircle, Calendar, Download } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  bankName?: string;
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  service: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: string;
}

export function ClientPayments() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      brand: 'Mastercard',
      isDefault: false
    },
    {
      id: '3',
      type: 'bank',
      last4: '1234',
      bankName: 'GTBank',
      isDefault: false
    }
  ]);

  const transactions: Transaction[] = [
    {
      id: '1',
      date: 'Feb 2, 2026',
      service: 'Indoor Cleaning',
      amount: 12000,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: '2',
      date: 'Jan 29, 2026',
      service: 'Laundry & Ironing',
      amount: 8000,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    },
    {
      id: '3',
      date: 'Jan 26, 2026',
      service: 'Cooking',
      amount: 10000,
      status: 'completed',
      paymentMethod: 'Mastercard •••• 8888'
    },
    {
      id: '4',
      date: 'Jan 23, 2026',
      service: 'Indoor Cleaning',
      amount: 12000,
      status: 'completed',
      paymentMethod: 'Visa •••• 4242'
    }
  ];

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            {method.type === 'card' && (
              <>
                <p className="font-semibold">{method.brand} •••• {method.last4}</p>
                <p className="text-sm text-muted-foreground">Expires 12/28</p>
              </>
            )}
            {method.type === 'bank' && (
              <>
                <p className="font-semibold">{method.bankName}</p>
                <p className="text-sm text-muted-foreground">•••• {method.last4}</p>
              </>
            )}
            {method.isDefault && (
              <Badge variant="secondary" className="mt-1 text-xs">Default</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {!method.isDefault && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setAsDefault(method.id)}
            >
              Set as Default
            </Button>
          )}
          <button
            onClick={() => deletePaymentMethod(method.id)}
            disabled={method.isDefault}
            className={`p-2 hover:bg-muted rounded-lg ${method.isDefault ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Trash2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </Card>
  );

  const TransactionRow = ({ transaction }: { transaction: Transaction }) => (
    <div className="flex items-center justify-between p-4 border-b last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium">{transaction.service}</p>
            <p className="text-sm text-muted-foreground">{transaction.date}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">₦{transaction.amount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
        </div>
        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
          {transaction.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
          {transaction.status}
        </Badge>
        <button className="p-2 hover:bg-muted rounded-lg">
          <Download className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Payments & Billing</h2>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </div>

          <Card className="p-6 bg-muted/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Secure Payments</h4>
                <p className="text-sm text-muted-foreground">
                  All payments are processed securely. Your card information is encrypted and never stored on our servers.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <div className="divide-y">
              {transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold">₦42,000</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <p className="text-2xl font-bold">₦12,000</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Average Per Booking</p>
              <p className="text-2xl font-bold">₦10,500</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
