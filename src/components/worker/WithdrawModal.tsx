import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  X,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  ArrowDownToLine,
  Building
} from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  formatCurrency: (amount: number) => string;
}

export function WithdrawModal({ isOpen, onClose, availableBalance, formatCurrency }: WithdrawModalProps) {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('primary');
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount');

  // Mock bank accounts - would come from backend
  const bankAccounts = [
    {
      id: 'primary',
      bankName: 'First Bank of Nigeria',
      accountNumber: '3012345678',
      accountName: 'Sarah Nnamani',
      primary: true
    }
  ];

  const amount = parseFloat(withdrawAmount) || 0;
  const isValidAmount = amount > 0 && amount <= availableBalance;

  const handleWithdraw = () => {
    if (!isValidAmount) return;
    setStep('confirm');
  };

  const handleConfirm = () => {
    // In real app, would process withdrawal via backend
    console.log('Processing withdrawal:', {
      amount,
      account: selectedAccount
    });
    setStep('success');
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      setStep('amount');
      setWithdrawAmount('');
    }, 3000);
  };

  const handleClose = () => {
    onClose();
    setStep('amount');
    setWithdrawAmount('');
  };

  const quickAmounts = [5000, 10000, 20000, availableBalance];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Withdraw Funds</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'amount' && (
            <div className="space-y-6">
              {/* Available Balance */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(availableBalance)}</p>
              </Card>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Withdrawal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ₦
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border rounded-lg text-lg font-semibold"
                    placeholder="0"
                    min="0"
                    max={availableBalance}
                  />
                </div>
                {amount > availableBalance && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Amount exceeds available balance</span>
                  </div>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setWithdrawAmount(quickAmount.toString())}
                      className="px-3 py-2 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium"
                      disabled={quickAmount > availableBalance}
                    >
                      {quickAmount === availableBalance ? 'All' : `${(quickAmount / 1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Account */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Withdraw To
                </label>
                <div className="space-y-2">
                  {bankAccounts.map((account) => (
                    <label
                      key={account.id}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAccount === account.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-muted-foreground/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="account"
                        value={account.id}
                        checked={selectedAccount === account.id}
                        onChange={() => setSelectedAccount(account.id)}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{account.bankName}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {account.accountNumber} • {account.accountName}
                        </p>
                      </div>
                      {account.primary && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Instant Withdrawal</p>
                    <p>Funds will be transferred to your account within 5-10 minutes. No fees!</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleWithdraw}
                disabled={!isValidAmount}
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
              >
                <ArrowDownToLine className="w-5 h-5 mr-2" />
                Continue
              </Button>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">Confirm Withdrawal</h4>
                <p className="text-muted-foreground">
                  Please review the details before proceeding
                </p>
              </div>

              {/* Withdrawal Details */}
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(amount)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">
                    {bankAccounts.find(a => a.id === selectedAccount)?.bankName}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Account Number</span>
                  <span className="font-medium">
                    {bankAccounts.find(a => a.id === selectedAccount)?.accountNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Account Name</span>
                  <span className="font-medium">
                    {bankAccounts.find(a => a.id === selectedAccount)?.accountName}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('amount')}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Confirm Withdrawal
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold mb-2">Withdrawal Successful!</h4>
              <p className="text-muted-foreground mb-6">
                {formatCurrency(amount)} is on its way to your bank account
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Expected arrival</p>
                <p className="font-semibold text-lg">Within 5-10 minutes</p>
              </div>
              <Button
                onClick={handleClose}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
