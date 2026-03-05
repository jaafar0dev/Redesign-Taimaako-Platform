import React, { useState } from 'react';
import { ClientDashboard } from './ClientDashboard';
import { ClientProfile } from './ClientProfile';
import { ClientBookings } from './ClientBookings';
import { ClientWorkers } from './ClientWorkers';
import { ClientLocations } from './ClientLocations';
import { ClientPayments } from './ClientPayments';
import { ClientWallet } from './ClientWallet';
import { ClientVouchers } from './ClientVouchers';
import { ClientReferral } from './ClientReferral';
import { ClientSubscription } from './ClientSubscription';
import { HelpPage } from '../shared/HelpPage';
import { ContactPage } from '../shared/ContactPage';
import { TermsPage } from '../shared/TermsPage';
import { Button } from '../ui/button';
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
  Menu,
  X,
  Crown
} from 'lucide-react';

interface ClientDashboardContainerProps {
  userData: {
    name: string;
    email: string;
    phone: string;
  };
  onSelectService: (service: string) => void;
  onLogout: () => void;
  upcomingBookings?: any[];
  pastBookings?: any[];
  onUpdateProfile: (data: { name: string; email: string; phone: string }) => void;
}

type PageType = 
  | 'home' 
  | 'profile' 
  | 'bookings' 
  | 'workers' 
  | 'locations' 
  | 'payments' 
  | 'wallet' 
  | 'vouchers' 
  | 'refer'
  | 'help'
  | 'contact'
  | 'terms'
  | 'subscription';

export function ClientDashboardContainer({
  userData,
  onSelectService,
  onLogout,
  upcomingBookings = [],
  pastBookings = [],
  onUpdateProfile
}: ClientDashboardContainerProps) {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as PageType, label: 'Home', icon: Home },
    { id: 'profile' as PageType, label: 'Profile', icon: User },
    { id: 'bookings' as PageType, label: 'Bookings', icon: Calendar },
    { id: 'subscription' as PageType, label: 'Subscription', icon: Crown, highlight: true },
    { id: 'workers' as PageType, label: 'TaimaakoStars', icon: Star },
    { id: 'locations' as PageType, label: 'Locations', icon: MapPin },
    { id: 'payments' as PageType, label: 'Payments', icon: CreditCard },
    { id: 'wallet' as PageType, label: 'TaimaakoCred', icon: Wallet },
    { id: 'vouchers' as PageType, label: 'Vouchers', icon: Ticket },
    { id: 'refer' as PageType, label: 'Refer & Earn', icon: Share2 },
  ];

  const handleNavigate = (page: PageType) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const renderPage = () => {
    // Full page renders (Help, Contact, Terms) - no sidebar
    if (activePage === 'help') {
      return <HelpPage onBack={() => setActivePage('home')} />;
    }
    if (activePage === 'contact') {
      return <ContactPage onBack={() => setActivePage('home')} />;
    }
    if (activePage === 'terms') {
      return <TermsPage onBack={() => setActivePage('home')} />;
    }

    // Dashboard layout with sidebar
    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-sidebar border-r border-sidebar-border">
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-bold text-primary">Taimaako</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
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

          <div className="p-4 border-t border-sidebar-border space-y-1">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-semibold">SIGN OUT</span>
            </button>
            
            <div className="pt-4 space-y-2">
              <button 
                onClick={() => handleNavigate('help')}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Help
              </button>
              <button 
                onClick={() => handleNavigate('contact')}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </button>
              <button 
                onClick={() => handleNavigate('terms')}
                className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
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
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activePage === item.id
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
              <div className="pt-4 space-y-2 border-t border-border">
                <button 
                  onClick={() => handleNavigate('help')}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Help
                </button>
                <button 
                  onClick={() => handleNavigate('contact')}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </button>
                <button 
                  onClick={() => handleNavigate('terms')}
                  className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms & Conditions
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
          <div className="max-w-5xl mx-auto p-4 lg:p-8">
            {activePage === 'home' && (
              <div className="space-y-6">
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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { id: 'indoor', name: 'Indoor Cleaning', icon: '🏠' },
                    { id: 'outdoor', name: 'Outdoor Services', icon: '🌳' },
                    { id: 'office', name: 'Office Cleaning', icon: '🏢' },
                    { id: 'ironing', name: 'Ironing', icon: '👔' },
                    { id: 'laundry', name: 'Laundry & Ironing', icon: '🧺' },
                    { id: 'artisan', name: 'Artisan Cleaning', icon: '🔧' },
                    { id: 'nanny', name: "Mom's Helper", icon: '👶' },
                    { id: 'elder', name: 'Elder Care', icon: '👴' },
                    { id: 'cooking', name: 'Cooking', icon: '🍳' },
                  ].map((service) => (
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

                <Button
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                  onClick={() => onSelectService('indoor')}
                >
                  Book Now
                </Button>
              </div>
            )}

            {activePage === 'profile' && (
              <ClientProfile userData={userData} onUpdateProfile={onUpdateProfile} />
            )}

            {activePage === 'bookings' && (
              <ClientBookings onRebookService={onSelectService} />
            )}

            {activePage === 'workers' && (
              <ClientWorkers onBookWorker={(workerId) => onSelectService('indoor')} />
            )}

            {activePage === 'locations' && (
              <ClientLocations />
            )}

            {activePage === 'payments' && (
              <ClientPayments />
            )}

            {activePage === 'wallet' && (
              <ClientWallet />
            )}

            {activePage === 'vouchers' && (
              <ClientVouchers />
            )}

            {activePage === 'refer' && (
              <ClientReferral />
            )}

            {activePage === 'subscription' && (
              <ClientSubscription />
            )}
          </div>
        </main>
      </div>
    );
  };

  return renderPage();
}