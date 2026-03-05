import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Ticket, Plus, Calendar, CheckCircle, Copy } from 'lucide-react';

interface Voucher {
  id: string;
  code: string;
  discount: string;
  description: string;
  expiryDate: string;
  minSpend?: number;
  isUsed: boolean;
  category?: string;
}

export function ClientVouchers() {
  const [voucherCode, setVoucherCode] = useState('');
  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: '1',
      code: 'WELCOME50',
      discount: '50% off',
      description: 'First booking discount',
      expiryDate: 'Dec 31, 2026',
      minSpend: 5000,
      isUsed: true,
      category: 'First Timer'
    },
    {
      id: '2',
      code: 'CLEAN20',
      discount: '₦2,000 off',
      description: 'Discount on cleaning services',
      expiryDate: 'Mar 31, 2026',
      minSpend: 10000,
      isUsed: false,
      category: 'Cleaning'
    },
    {
      id: '3',
      code: 'WEEKLY15',
      discount: '15% off',
      description: 'Subscription discount',
      expiryDate: 'Apr 30, 2026',
      isUsed: false,
      category: 'Subscription'
    }
  ]);

  const handleApplyVoucher = () => {
    // In a real app, this would validate and add the voucher
    if (voucherCode) {
      alert(`Voucher code "${voucherCode}" applied!`);
      setVoucherCode('');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied "${code}" to clipboard`);
  };

  const availableVouchers = vouchers.filter(v => !v.isUsed);
  const usedVouchers = vouchers.filter(v => v.isUsed);

  const VoucherCard = ({ voucher }: { voucher: Voucher }) => (
    <Card className={`p-6 relative overflow-hidden ${voucher.isUsed ? 'opacity-60' : ''}`}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
      <div className="absolute top-2 right-2">
        <Ticket className="w-8 h-8 text-primary/20" />
      </div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-2xl font-bold text-primary mb-1">{voucher.discount}</p>
            {voucher.category && (
              <Badge variant="secondary" className="text-xs">
                {voucher.category}
              </Badge>
            )}
          </div>
          {voucher.isUsed && (
            <Badge variant="outline" className="bg-muted">
              <CheckCircle className="w-3 h-3 mr-1" />
              Used
            </Badge>
          )}
        </div>

        <p className="font-medium mb-2">{voucher.description}</p>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          {voucher.minSpend && (
            <p>Minimum spend: ₦{voucher.minSpend.toLocaleString()}</p>
          )}
          <p className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Valid until {voucher.expiryDate}
          </p>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <code className="flex-1 font-mono font-semibold">{voucher.code}</code>
          <button
            onClick={() => copyCode(voucher.code)}
            className="p-2 hover:bg-background rounded-md transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {!voucher.isUsed && (
          <Button className="w-full mt-4">
            Use This Voucher
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Vouchers & Promo Codes</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Have a promo code?</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
            className="font-mono"
          />
          <Button onClick={handleApplyVoucher}>
            <Plus className="w-4 h-4 mr-2" />
            Apply
          </Button>
        </div>
      </Card>

      {availableVouchers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Available Vouchers ({availableVouchers.length})</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {availableVouchers.map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </div>
        </div>
      )}

      {usedVouchers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Used Vouchers</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {usedVouchers.map((voucher) => (
              <VoucherCard key={voucher.id} voucher={voucher} />
            ))}
          </div>
        </div>
      )}

      {availableVouchers.length === 0 && usedVouchers.length === 0 && (
        <Card className="p-8 text-center">
          <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No vouchers available</p>
          <p className="text-sm text-muted-foreground">
            Check back later for new promo codes and special offers
          </p>
        </Card>
      )}

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Ticket className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Want more vouchers?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Refer friends to Taimaako and get exclusive discount codes for you and your friends!
            </p>
            <Button variant="default" size="sm">
              Refer & Earn
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
