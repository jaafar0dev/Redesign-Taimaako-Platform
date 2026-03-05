import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Home, Users, Shield, Clock, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Logo } from "./Logo";
import type { UserType } from "../App";

interface LandingPageProps {
  onSelectUserType: (type: UserType) => void;
}

export function LandingPage({ onSelectUserType }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto object-contain" />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => onSelectUserType("worker")}
              >
                Become a Worker
              </Button>
              <Button onClick={() => onSelectUserType("client")}>
                Get Started
              </Button>
              {/* Hidden Admin Access - Click logo 5 times */}
              <button
                onClick={() => onSelectUserType("admin")}
                className="text-xs text-gray-400 hover:text-gray-600 px-2"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Home Assistance,{" "}
              <span className="text-green-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Professional home services for busy households in Abuja. Get
              matched with trusted cleaners, cooks, and nannies for flexible,
              short-hour assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6"
                onClick={() => onSelectUserType("client")}
              >
                Book a Service
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => onSelectUserType("worker")}
              >
                Join as Worker
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758273238947-7eb530b408e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBjbGVhbmluZyUyMGhvbWUlMjBpbnRlcmlvciUyMG1vb2R5fGVufDF8fHx8MTc3MDc0MzM2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional home service"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Trusted Professionals
                  </p>
                  <p className="text-sm text-gray-600">
                    All workers are screened and verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Taimaako?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A home assistance platform built for Nigerian households
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Hours</h3>
              <p className="text-gray-600">
                3-4 hour sessions, 1-3 times weekly. No live-in commitment
                required.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Matching</h3>
              <p className="text-gray-600">
                Workers are matched based on proximity to your location in
                Abuja.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Human Support</h3>
              <p className="text-gray-600">
                Our team reviews every request and ensures quality matching.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Workers</h3>
              <p className="text-gray-600">
                All workers undergo screening, reference checks, and
                verification.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Professional assistance for your home
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664008760004-182420e58e7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwaG9tZSUyMGNsZWFuaW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2OTQyNzczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cleaning service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">
                  Cleaning & Laundry
                </h3>
                <p className="text-gray-600">
                  Professional cleaning and laundry services for your home
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553078798-5a6e28356bd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwa2l0Y2hlbiUyMGNvb2tpbmd8ZW58MXx8fHwxNzY5NDI3NzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cooking service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Cooking</h3>
                <p className="text-gray-600">
                  Skilled cooks to prepare delicious meals for your family
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615150351337-6abb234dc10f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2hpbGRjYXJlJTIwbmFubnl8ZW58MXx8fHwxNzY5NDI3NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nanny service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Nanny & Care</h3>
                <p className="text-gray-600">
                  Trusted caregivers for your children and elderly family
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Book your first service today or join our team of professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => onSelectUserType("client")}
            >
              Book a Service
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white/10"
              onClick={() => onSelectUserType("worker")}
            >
              Become a Worker
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </div>
            <p className="text-center text-gray-400">
              Professional home assistance for Abuja households
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
