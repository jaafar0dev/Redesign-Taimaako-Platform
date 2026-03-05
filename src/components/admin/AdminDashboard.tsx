import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Package,
  DollarSign,
  Users,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Menu,
  LogOut,
  BarChart3,
  Settings,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../constants/services';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'weekly' | 'monthly';
  sessionsPerWeek: number;
  hoursPerSession: number;
  description: string;
  popular: boolean;
}

interface ServicePricing {
  serviceId: string;
  serviceName: string;
  baseRate: number;
  workerPay: number;
  platformFee: number;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'pricing'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Subscription Plans State
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([
    {
      id: '1',
      name: 'Weekly Basic',
      price: 12000,
      frequency: 'weekly',
      sessionsPerWeek: 1,
      hoursPerSession: 3,
      description: 'Perfect for light weekly maintenance',
      popular: false
    },
    {
      id: '2',
      name: 'Weekly Plus',
      price: 22000,
      frequency: 'weekly',
      sessionsPerWeek: 2,
      hoursPerSession: 3,
      description: 'Ideal for busy households',
      popular: true
    },
    {
      id: '3',
      name: 'Weekly Premium',
      price: 30000,
      frequency: 'weekly',
      sessionsPerWeek: 3,
      hoursPerSession: 4,
      description: 'Complete home care solution',
      popular: false
    }
  ]);

  // Service Pricing State
  const [servicePricing, setServicePricing] = useState<ServicePricing[]>([
    {
      serviceId: 'cleaning',
      serviceName: 'Cleaning',
      baseRate: 4000,
      workerPay: 3000,
      platformFee: 1000
    },
    {
      serviceId: 'laundry',
      serviceName: 'Laundry',
      baseRate: 3500,
      workerPay: 2500,
      platformFee: 1000
    },
    {
      serviceId: 'cooking',
      serviceName: 'Cooking',
      baseRate: 5000,
      workerPay: 4000,
      platformFee: 1000
    },
    {
      serviceId: 'nanny',
      serviceName: 'Childcare',
      baseRate: 6000,
      workerPay: 5000,
      platformFee: 1000
    },
    {
      serviceId: 'eldercare',
      serviceName: 'Elder Care',
      baseRate: 6500,
      workerPay: 5500,
      platformFee: 1000
    }
  ]);

  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [editingPricing, setEditingPricing] = useState<ServicePricing | null>(null);
  const [showAddPlan, setShowAddPlan] = useState(false);

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  // Stats for overview
  const stats = {
    totalClients: 156,
    activeWorkers: 48,
    monthlyRevenue: 2850000,
    activePlans: subscriptionPlans.length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-40 flex items-center justify-between px-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Taimaako</h1>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-background z-30 border-r border-border overflow-y-auto">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => { setActiveTab('subscriptions'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'subscriptions' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Subscription Plans</span>
            </button>
            <button
              onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'pricing' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Service Pricing</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-red-600 mt-4 border-t border-border pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>
      )}

      <div className="flex pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-sidebar border-r border-sidebar-border fixed h-screen">
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-bold text-primary">Taimaako</h1>
            <p className="text-sm text-muted-foreground mt-1">Admin Dashboard</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Subscription Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'pricing'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Service Pricing</span>
            </button>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-4 lg:p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Platform Overview</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Total Clients</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalClients}</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Active Workers</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.activeWorkers}</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-muted-foreground">Active Plans</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.activePlans}</p>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab('subscriptions')}
                      className="h-auto py-4 bg-primary hover:bg-primary/90 justify-start"
                    >
                      <Package className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Manage Plans</p>
                        <p className="text-xs opacity-90">Create & edit subscription plans</p>
                      </div>
                    </Button>
                    <Button
                      onClick={() => setActiveTab('pricing')}
                      className="h-auto py-4 bg-primary hover:bg-primary/90 justify-start"
                    >
                      <DollarSign className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <p className="font-semibold">Update Pricing</p>
                        <p className="text-xs opacity-90">Adjust service rates & fees</p>
                      </div>
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Subscription Plans Tab */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold">Subscription Plans</h2>
                  <Button
                    onClick={() => setShowAddPlan(true)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Plan
                  </Button>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subscriptionPlans.map((plan) => (
                    <Card key={plan.id} className="p-6 relative">
                      {plan.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-yellow-500 hover:bg-yellow-500">
                          Popular
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-3xl font-bold text-primary mb-4">
                        {formatCurrency(plan.price)}
                        <span className="text-sm text-muted-foreground font-normal">/{plan.frequency}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>{plan.sessionsPerWeek}x per week</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span>{plan.hoursPerSession} hours per session</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingPlan(plan)}
                          variant="outline"
                          className="flex-1"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm('Delete this plan?')) {
                              setSubscriptionPlans(subscriptionPlans.filter(p => p.id !== plan.id));
                            }
                          }}
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Add/Edit Plan Modal */}
                {(showAddPlan || editingPlan) && (
                  <PlanModal
                    plan={editingPlan}
                    onClose={() => {
                      setShowAddPlan(false);
                      setEditingPlan(null);
                    }}
                    onSave={(plan) => {
                      if (editingPlan) {
                        setSubscriptionPlans(subscriptionPlans.map(p => p.id === plan.id ? plan : p));
                      } else {
                        setSubscriptionPlans([...subscriptionPlans, { ...plan, id: Date.now().toString() }]);
                      }
                      setShowAddPlan(false);
                      setEditingPlan(null);
                    }}
                  />
                )}
              </div>
            )}

            {/* Service Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Service Pricing</h2>

                <div className="space-y-4">
                  {servicePricing.map((pricing) => (
                    <Card key={pricing.serviceId} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{pricing.serviceName}</h3>
                          <p className="text-sm text-muted-foreground">Per 3-hour session</p>
                        </div>
                        <Button
                          onClick={() => setEditingPricing(pricing)}
                          variant="outline"
                          size="sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Client Pays</p>
                          <p className="text-2xl font-bold text-primary">{formatCurrency(pricing.baseRate)}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Worker Gets</p>
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(pricing.workerPay)}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Platform Fee</p>
                          <p className="text-2xl font-bold text-blue-600">{formatCurrency(pricing.platformFee)}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Edit Pricing Modal */}
                {editingPricing && (
                  <PricingModal
                    pricing={editingPricing}
                    onClose={() => setEditingPricing(null)}
                    onSave={(updated) => {
                      setServicePricing(servicePricing.map(p => 
                        p.serviceId === updated.serviceId ? updated : p
                      ));
                      setEditingPricing(null);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Plan Modal Component
function PlanModal({
  plan,
  onClose,
  onSave
}: {
  plan: SubscriptionPlan | null;
  onClose: () => void;
  onSave: (plan: SubscriptionPlan) => void;
}) {
  const [formData, setFormData] = useState<SubscriptionPlan>(
    plan || {
      id: '',
      name: '',
      price: 0,
      frequency: 'weekly',
      sessionsPerWeek: 1,
      hoursPerSession: 3,
      description: '',
      popular: false
    }
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">{plan ? 'Edit Plan' : 'Add New Plan'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Weekly Basic"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (₦)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border rounded-lg"
              placeholder="12000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as 'weekly' | 'monthly' })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sessions Per Week</label>
            <input
              type="number"
              value={formData.sessionsPerWeek}
              onChange={(e) => setFormData({ ...formData, sessionsPerWeek: parseInt(e.target.value) || 1 })}
              className="w-full p-2 border rounded-lg"
              min="1"
              max="7"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hours Per Session</label>
            <input
              type="number"
              value={formData.hoursPerSession}
              onChange={(e) => setFormData({ ...formData, hoursPerSession: parseInt(e.target.value) || 1 })}
              className="w-full p-2 border rounded-lg"
              min="1"
              max="8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="Brief description of the plan"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="popular" className="text-sm font-medium">Mark as Popular</label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onSave(formData)}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!formData.name || formData.price === 0}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pricing Modal Component
function PricingModal({
  pricing,
  onClose,
  onSave
}: {
  pricing: ServicePricing;
  onClose: () => void;
  onSave: (pricing: ServicePricing) => void;
}) {
  const [formData, setFormData] = useState(pricing);

  const handleBaseRateChange = (value: number) => {
    // Auto-calculate worker pay and platform fee based on percentage
    const workerPay = Math.floor(value * 0.75); // 75% to worker
    const platformFee = value - workerPay; // 25% platform fee
    setFormData({
      ...formData,
      baseRate: value,
      workerPay,
      platformFee
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-2xl max-w-md w-full">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Edit {pricing.serviceName} Pricing</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Client Pays (₦)</label>
            <input
              type="number"
              value={formData.baseRate}
              onChange={(e) => handleBaseRateChange(parseInt(e.target.value) || 0)}
              className="w-full p-3 border rounded-lg text-lg font-semibold"
              placeholder="4000"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Per 3-hour session
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Worker Gets</span>
              <span className="text-lg font-bold text-green-600">₦{formData.workerPay.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Platform Fee</span>
              <span className="text-lg font-bold text-blue-600">₦{formData.platformFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              Platform takes {((formData.platformFee / formData.baseRate) * 100).toFixed(0)}% fee, 
              worker receives {((formData.workerPay / formData.baseRate) * 100).toFixed(0)}%
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onSave(formData)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
