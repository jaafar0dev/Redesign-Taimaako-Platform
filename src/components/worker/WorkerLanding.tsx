import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Home,
  ArrowLeft,
  DollarSign,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Logo } from "../Logo";

interface Props {
  onGetStarted: () => void;
  onBack: () => void;
  onLogin?: () => void;
}

export function WorkerLanding({ onGetStarted, onBack, onLogin }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto" />
            </div>
            <div className="w-20">
              {onLogin && (
                <Button variant="outline" onClick={onLogin}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              Join Our Community
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Earn Money Doing What You Love
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join Taimaako and connect with households in Abuja who need your
              skills. Work flexible hours, earn good income, and build a career.
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={onGetStarted}
            >
              Start Your Application
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Free to join • No upfront costs • Start earning in days
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1668815092058-12bef53157a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDF8fHx8MTc2OTQyNzczOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional worker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join Taimaako?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We support you every step of the way
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Good Income</h3>
              <p className="text-gray-600">
                Earn ₦3,000 - ₦5,000 per hour. Get paid weekly, bi-weekly, or
                monthly.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Work Near You</h3>
              <p className="text-gray-600">
                We only match you with jobs close to where you live in Abuja.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
              <p className="text-gray-600">
                Choose your working days and hours. Balance work with your life.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-gray-600">
                All clients are verified. You're protected every step of the
                way.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Available Roles
            </h2>
            <p className="text-xl text-gray-600">
              Choose what fits your skills
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="aspect-square w-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🧹</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Cleaner</h3>
              <p className="text-gray-600 mb-4">
                Professional cleaning and housekeeping
              </p>
              <p className="text-green-600 font-semibold">
                ₦3,000 - ₦4,500/hour
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="aspect-square w-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">👨‍🍳</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Cook</h3>
              <p className="text-gray-600 mb-4">Meal preparation and cooking</p>
              <p className="text-green-600 font-semibold">
                ₦4,000 - ₦5,500/hour
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <div className="aspect-square w-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">👶</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Nanny / Caregiver</h3>
              <p className="text-gray-600 mb-4">Childcare and elderly care</p>
              <p className="text-green-600 font-semibold">
                ₦3,500 - ₦5,000/hour
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join hundreds of professionals already working with Taimaako
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
            onClick={onGetStarted}
          >
            Apply Now - It's Free
          </Button>
          <p className="text-sm text-green-100 mt-4">
            Application takes 5-10 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Taimaako</span>
            </div>
            <p className="text-center text-gray-400">
              Empowering home service professionals in Abuja
            </p>
            <p className="text-sm text-gray-500">
              © 2026 Taimaako. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
