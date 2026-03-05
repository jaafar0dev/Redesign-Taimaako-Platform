import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Home, 
  User, 
  Calendar, 
  Star, 
  MapPin, 
  CreditCard, 
  Wallet, 
  Ticket, 
  Share2,
  LogOut,
  HelpCircle,
  Mail,
  FileText,
  Menu,
  X
} from 'lucide-react';

interface ClientDashboardProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  onSelectService: (service: string) => void;
  onLogout: () => void;
  upcomingBookings?: any[];
  pastBookings?: any[];
  onNavigate: (page: string) => void; // Added navigation handler
  onUpdateProfile?: (data: { name: string; email: string; phone: string }) => void;
}

const services = [
  { id: 'indoor', name: 'Indoor Cleaning', icon: '🏠' },
  { id: 'outdoor', name: 'Outdoor Services', icon: '🌳' },
  { id: 'office', name: 'Office Cleaning', icon: '🏢' },
  { id: 'ironing', name: 'Ironing', icon: '👔' },
  { id: 'laundry', name: 'Laundry & Ironing', icon: '🧺' },
  { id: 'artisan', name: 'Artisan Cleaning', icon: '🔧' },
  { id: 'nanny', name: 'Mom\'s Helper', icon: '👶' },
  { id: 'elder', name: 'Elder Care', icon: '👴' },
  { id: 'cooking', name: 'Cooking', icon: '🍳' },
];

export function ClientDashboard({ 
  userData, 
  onSelectService, 
  onLogout,
  upcomingBookings = [],
  pastBookings = [],
  onNavigate,
  onUpdateProfile = () => {}
}: ClientDashboardProps) {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'workers', label: 'TaimaakoStars', icon: Star },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'wallet', label: 'TaimaakoCred', icon: Wallet },
    { id: 'vouchers', label: 'Vouchers', icon: Ticket },
    { id: 'refer', label: 'Refer & Earn', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-primary">Taimaako</h1>
        </div>

        {/* Navigation */}
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

        {/* Bottom Section */}
        <div className="p-4 border-t border-sidebar-border space-y-1">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-semibold">SIGN OUT</span>
          </button>
          
          <div className="pt-4 space-y-2">
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Help
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Contact Us
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Terms & Conditions
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-50 flex items-center justify-between p-4">
        <h1 className="text-xl font-bold text-primary">Taimaako</h1>
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
        <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6">
          {/* User Welcome */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Welcome back, {userData.name.split(' ')[0]}!</h2>
              <p className="text-muted-foreground text-sm">Let's get your home sorted</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Book a Service */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Book a service</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => onSelectService(service.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-secondary transition-all"
                >
                  <div className="text-3xl">{service.icon}</div>
                  <span className="text-xs text-center">{service.name}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Upcoming Bookings */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
            {upcomingBookings.length === 0 ? (
              <p className="text-muted-foreground text-sm">No upcoming bookings</p>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Past Bookings */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Past Bookings</h3>
            {pastBookings.length === 0 ? (
              <p className="text-muted-foreground text-sm">No past bookings</p>
            ) : (
              <div className="space-y-3">
                {pastBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">{booking.date}</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Promotional Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-secondary">
              <div className="space-y-3">
                <p className="text-sm">Invite friends & earn</p>
                <p className="text-2xl font-semibold">₦150 TaimaakoCred</p>
                <p className="text-sm text-muted-foreground">per friend referral</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Refer & Earn
                </Button>
                <p className="text-xs text-center text-muted-foreground">Ts & Cs apply</p>
              </div>
            </Card>

            <Card className="p-6 bg-accent">
              <div className="space-y-3">
                <p className="text-sm">Download the app to</p>
                <p className="text-lg font-semibold">edit your bookings and rebook your favourite TaimaakoStar</p>
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 bg-black text-white rounded-lg p-2 text-xs flex items-center justify-center gap-1">
                    <span>📱</span>
                    <span>App Store</span>
                  </div>
                  <div className="flex-1 bg-black text-white rounded-lg p-2 text-xs flex items-center justify-center gap-1">
                    <span>📱</span>
                    <span>Google Play</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Book Now CTA */}
          <div className="pt-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
              onClick={() => onSelectService('indoor')}
            >
              Book Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}