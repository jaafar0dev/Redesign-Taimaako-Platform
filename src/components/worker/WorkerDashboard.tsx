import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Home,
  Calendar,
  DollarSign,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  Phone,
  MessageSquare
} from 'lucide-react';

interface Job {
  id: string;
  service: string;
  client: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  payment: number;
  status: 'available' | 'accepted' | 'completed' | 'cancelled';
}

interface WorkerDashboardProps {
  workerData: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    totalJobs: number;
  };
  onLogout: () => void;
}

export function WorkerDashboard({ workerData, onLogout }: WorkerDashboardProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const availableJobs: Job[] = [
    {
      id: '1',
      service: 'Indoor Cleaning',
      client: 'Chinedu O.',
      date: 'Wed, Feb 7, 2026',
      time: '10:00 AM',
      duration: '3 hours',
      location: 'Garki',
      address: '15 Gimbiya Street, Garki',
      payment: 12000,
      status: 'available'
    },
    {
      id: '2',
      service: 'Cooking',
      client: 'Blessing N.',
      date: 'Thu, Feb 8, 2026',
      time: '2:00 PM',
      duration: '2 hours',
      location: 'Wuse 2',
      address: '23 Adetokunbo Street, Wuse 2',
      payment: 10000,
      status: 'available'
    }
  ];

  const upcomingJobs: Job[] = [
    {
      id: '3',
      service: 'Indoor Cleaning',
      client: 'Ahmed K.',
      date: 'Tue, Feb 5, 2026',
      time: '9:00 AM',
      duration: '3 hours',
      location: 'Maitama',
      address: '8 Rio Street, Maitama',
      payment: 13500,
      status: 'accepted'
    }
  ];

  const completedJobs: Job[] = [
    {
      id: '4',
      service: 'Laundry & Ironing',
      client: 'Fatima B.',
      date: 'Mon, Feb 2, 2026',
      time: '1:00 PM',
      duration: '2 hours',
      location: 'Garki',
      address: '42 Parakou Crescent, Garki',
      payment: 8000,
      status: 'completed'
    }
  ];

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Jobs', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-lg">{job.service}</h4>
          <p className="text-sm text-muted-foreground">Client: {job.client}</p>
        </div>
        <Badge variant={job.status === 'available' ? 'default' : job.status === 'accepted' ? 'secondary' : 'outline'}>
          {job.status}
        </Badge>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{job.date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{job.time} • {job.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job.address}</span>
        </div>
        <div className="pt-2 border-t">
          <p className="font-semibold text-green-600 text-lg">₦{job.payment.toLocaleString()}</p>
        </div>
      </div>

      {job.status === 'available' && (
        <div className="flex gap-2">
          <Button className="flex-1 bg-primary">
            Accept Job
          </Button>
          <Button variant="outline" className="flex-1">
            View Details
          </Button>
        </div>
      )}

      {job.status === 'accepted' && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call Client
          </Button>
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Navigate
          </Button>
        </div>
      )}

      {job.status === 'completed' && (
        <Button variant="outline" className="w-full" size="sm">
          View Receipt
        </Button>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-primary">Taimaako</h1>
          <p className="text-xs text-muted-foreground mt-1">Worker Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeNav === item.id
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">SIGN OUT</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-50 flex items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Taimaako</h1>
          <p className="text-xs text-muted-foreground">Worker</p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-background z-40 pt-16 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeNav === item.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors mt-4 border-t border-border pt-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">SIGN OUT</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {activeNav === 'home' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Welcome back, {workerData.name.split(' ')[0]}!</h2>
                  <p className="text-muted-foreground">Ready to earn today?</p>
                </div>
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Your Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{workerData.rating}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {workerData.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Available Jobs</p>
                  <p className="text-3xl font-bold text-primary">{availableJobs.length}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                  <p className="text-3xl font-bold">{upcomingJobs.length}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold">{workerData.totalJobs}</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">This Week</p>
                  <p className="text-3xl font-bold text-green-600">₦42,000</p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Available Jobs Near You</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {availableJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>

              {upcomingJobs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Upcoming Jobs</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {upcomingJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeNav === 'jobs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">My Jobs</h2>
              <Tabs defaultValue="available">
                <TabsList className="grid w-full max-w-2xl grid-cols-3">
                  <TabsTrigger value="available">Available ({availableJobs.length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming ({upcomingJobs.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {availableJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="upcoming" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {upcomingJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="completed" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {completedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeNav === 'earnings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Earnings</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6 bg-primary text-primary-foreground">
                  <p className="text-sm opacity-90 mb-2">Total Earnings</p>
                  <p className="text-4xl font-bold">₦156,000</p>
                  <p className="text-sm opacity-75 mt-2">From {workerData.totalJobs} completed jobs</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">This Month</p>
                  <p className="text-3xl font-bold">₦42,000</p>
                </Card>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">This Week</p>
                  <p className="text-3xl font-bold text-green-600">₦12,000</p>
                </Card>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Payment History</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Weekly Payment</p>
                      <p className="text-sm text-muted-foreground">Jan 29 - Feb 4, 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₦32,000</p>
                      <Badge variant="default">Paid</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium">Weekly Payment</p>
                      <p className="text-sm text-muted-foreground">Jan 22 - Jan 28, 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₦28,000</p>
                      <Badge variant="default">Paid</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeNav === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">My Profile</h2>
              <Card className="p-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold">
                    {workerData.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{workerData.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{workerData.rating}</span>
                      <span className="text-sm text-muted-foreground">({workerData.totalJobs} jobs)</span>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Worker
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{workerData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{workerData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Services</p>
                    <p className="font-medium">Cleaning, Laundry</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Working Areas</p>
                    <p className="font-medium">Garki, Wuse, Maitama</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button>Edit Profile</Button>
                </div>
              </Card>
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Available for Jobs</p>
                      <p className="text-sm text-muted-foreground">Turn off when you're not available</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">New Job Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified of new jobs nearby</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">SMS Reminders</p>
                      <p className="text-sm text-muted-foreground">Get SMS before each job</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
