import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Calendar,
  User,
  ChevronRight,
  Wallet,
  ArrowDownToLine,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Home,
  Menu,
  X,
  LogOut,
  Bell,
  Settings,
  Award,
  Target,
  CreditCard,
  Building
} from 'lucide-react';
import { JobDetailFlow } from './JobDetailFlow';
import { WorkerProfile } from './WorkerProfile';
import { WithdrawModal } from './WithdrawModal';

interface Job {
  id: string;
  clientName: string;
  clientPhone?: string;
  service: string;
  location: string;
  distance: string;
  date: string;
  time: string;
  duration: string;
  pay: number;
  status: 'available' | 'accepted' | 'on-the-way' | 'in-progress' | 'completed';
  clientRating: number;
  address: string;
  notes?: string;
  tasks?: string[];
}

interface WorkerDashboardNewProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    totalJobs: number;
  };
  onLogout: () => void;
}

export function WorkerDashboardNew({ userData, onLogout }: WorkerDashboardNewProps) {
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'profile'>('jobs');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);

  // Mock data - would come from backend
  const earnings = {
    available: 45000,
    pending: 12000,
    lifetime: 156000,
    thisWeek: 18000,
    lastPayout: 32000,
    nextPayout: '2026-02-14'
  };

  const stats = {
    completedToday: 2,
    completedWeek: 8,
    completedMonth: 32,
    rating: userData.rating,
    totalJobs: userData.totalJobs
  };

  const nearbyJobs: Job[] = [
    {
      id: '1',
      clientName: 'Mrs. Adebayo',
      service: 'Cleaning',
      location: 'Maitama',
      distance: '1.2 km',
      date: 'Today',
      time: '2:00 PM',
      duration: '3 hours',
      pay: 9000,
      status: 'available',
      clientRating: 4.8,
      address: '15 Aguiyi Ironsi Street, Maitama'
    },
    {
      id: '2',
      clientName: 'Mr. Okonkwo',
      service: 'Cooking',
      location: 'Asokoro',
      distance: '2.5 km',
      date: 'Today',
      time: '5:00 PM',
      duration: '2 hours',
      pay: 6000,
      status: 'available',
      clientRating: 5.0,
      address: '8 Lake Chad Crescent, Asokoro'
    },
    {
      id: '3',
      clientName: 'Dr. Ibrahim',
      service: 'Laundry',
      location: 'Wuse 2',
      distance: '3.8 km',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '3 hours',
      pay: 9000,
      status: 'available',
      clientRating: 4.9,
      address: '22 Adetokunbo Ademola Crescent, Wuse 2'
    }
  ];

  const activeJobs: Job[] = [
    {
      id: '4',
      clientName: 'Mrs. Bello',
      service: 'Cleaning',
      location: 'Jabi',
      distance: '0.8 km',
      date: 'Today',
      time: '11:00 AM',
      duration: '4 hours',
      pay: 12000,
      status: 'accepted',
      clientRating: 4.7,
      address: '45 Cadastral Zone, Jabi'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleAcceptJob = (jobId: string) => {
    console.log('Accept job:', jobId);
    // Would update job status to 'accepted'
  };

  const handleStartJob = (jobId: string) => {
    console.log('Start job:', jobId);
    // Would update job status to 'on-the-way'
  };

  const handleWithdraw = () => {
    console.log('Withdraw earnings');
    // Simulate withdrawal
    setWithdrawalSuccess(true);
    setShowWithdrawModal(false);
  };

  // If a job is selected, show the job detail flow
  if (selectedJob) {
    return (
      <JobDetailFlow
        job={selectedJob}
        onBack={() => setSelectedJob(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">Taimaako</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-background z-40 pt-16">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'jobs' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Jobs</span>
            </button>
            <button
              onClick={() => { setActiveTab('earnings'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'earnings' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>Earnings</span>
            </button>
            <button
              onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-muted'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
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
            <p className="text-sm text-muted-foreground mt-1">Worker Dashboard</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'jobs'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Target className="w-5 h-5" />
              <span>Jobs</span>
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'earnings'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span>Earnings</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
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
            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Welcome, {userData.name.split(' ')[0]}!
                    </h2>
                    <p className="text-muted-foreground">Here are jobs near you</p>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.completedToday}</p>
                    <p className="text-xs text-muted-foreground">Jobs completed</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-muted-foreground">This Week</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(earnings.thisWeek)}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Rating</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.rating.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">{stats.totalJobs} jobs total</p>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Available</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(earnings.available)}</p>
                    <button
                      onClick={() => setActiveTab('earnings')}
                      className="text-xs text-primary font-medium mt-1 hover:underline"
                    >
                      Withdraw →
                    </button>
                  </Card>
                </div>

                {/* Active Jobs */}
                {activeJobs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Active Jobs ({activeJobs.length})
                    </h3>
                    <div className="space-y-3">
                      {activeJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          onAction={() => setSelectedJob(job)}
                          actionLabel="View Job"
                          formatCurrency={formatCurrency}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Jobs Near You */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Jobs Near You ({nearbyJobs.length})
                  </h3>
                  <div className="space-y-3">
                    {nearbyJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onAction={() => setSelectedJob(job)}
                        actionLabel="View Details"
                        formatCurrency={formatCurrency}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Earnings & Wallet</h2>

                {/* Wallet Balance */}
                <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white/80 mb-1">Available Balance</p>
                      <p className="text-4xl font-bold">{formatCurrency(earnings.available)}</p>
                    </div>
                    <Wallet className="w-12 h-12 text-white/50" />
                  </div>
                  <Button
                    className="w-full bg-white text-primary hover:bg-white/90"
                    onClick={() => setShowWithdrawModal(true)}
                    disabled={earnings.available === 0}
                  >
                    <ArrowDownToLine className="w-4 h-4 mr-2" />
                    Withdraw to Bank
                  </Button>
                </Card>

                {/* Earnings Breakdown */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Pending</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(earnings.pending)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Available after client approval
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">This Week</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(earnings.thisWeek)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      From {stats.completedWeek} jobs
                    </p>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-500" />
                      <span className="text-sm text-muted-foreground">Lifetime</span>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrency(earnings.lifetime)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total earnings
                    </p>
                  </Card>
                </div>

                {/* How It Works */}
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">How Earnings Work</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Complete Job</p>
                        <p className="text-sm text-muted-foreground">
                          Finish your assigned work and mark as completed
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Client Approval</p>
                        <p className="text-sm text-muted-foreground">
                          Payment is held as "pending" until client reviews (usually within 24hrs)
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Added to Balance</p>
                        <p className="text-sm text-muted-foreground">
                          Once approved, money is added to your available balance
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Withdraw Anytime</p>
                        <p className="text-sm text-muted-foreground">
                          Withdraw to your bank account instantly (no fees!)
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Profile</h2>
                <WorkerProfile userData={userData} />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        availableBalance={earnings.available}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}

// Job Card Component
function JobCard({
  job,
  onAction,
  actionLabel,
  formatCurrency
}: {
  job: Job;
  onAction: (jobId: string) => void;
  actionLabel: string;
  formatCurrency: (amount: number) => string;
}) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{job.clientName}</h4>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-500" />
              <span className="text-xs font-medium">{job.clientRating}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs mb-2">
            {job.service}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{formatCurrency(job.pay)}</p>
          <p className="text-xs text-muted-foreground">{job.duration}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job.location} • {job.distance} away</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{job.date} at {job.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Home className="w-4 h-4" />
          <span className="text-xs">{job.address}</span>
        </div>
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90"
        onClick={() => onAction(job.id)}
      >
        {actionLabel}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </Card>
  );
}