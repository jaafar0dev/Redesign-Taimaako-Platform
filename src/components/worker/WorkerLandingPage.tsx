import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Check,
  ChevronRight,
  Star,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Wallet,
  Award,
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Zap,
  PhoneCall,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Logo } from "../Logo";

interface WorkerLandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onBack: () => void;
}

export function WorkerLandingPage({
  onGetStarted,
  onLogin,
  onBack,
}: WorkerLandingPageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn More",
      description:
        "Competitive rates starting from ₦3,000/hour with weekly payouts",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description:
        "Choose when you want to work. You control your own schedule",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Shield,
      title: "Insurance & Protection",
      description: "Full insurance coverage and safety equipment provided",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Access to training, certifications, and advancement opportunities",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Be part of 500+ verified workers across Abuja",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Award,
      title: "Recognition & Bonuses",
      description:
        "Performance-based bonuses and customer appreciation rewards",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const requirements = [
    "Must be 18 years or older",
    "Valid phone number and email address",
    "Ability to commute within Abuja",
    "Basic cleaning or care experience (preferred)",
    "Professional references (2 required)",
    "Valid means of identification",
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Apply Online",
      description:
        "Fill out our simple application form with your details and experience",
      icon: PhoneCall,
    },
    {
      step: "02",
      title: "Verification",
      description: "We verify your identity, references, and background check",
      icon: Shield,
    },
    {
      step: "03",
      title: "Training",
      description:
        "Complete our professional training program and get certified",
      icon: Award,
    },
    {
      step: "04",
      title: "Start Earning",
      description:
        "Get matched with clients and start accepting jobs on your schedule",
      icon: Zap,
    },
  ];

  const testimonials = [
    {
      name: "Grace Okafor",
      role: "Indoor Cleaning Specialist",
      image:
        "https://images.unsplash.com/photo-1688841747582-41097036109d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdlcmlhbiUyMHByb2Zlc3Npb25hbCUyMHdvcmtlciUyMHNtaWxpbmd8ZW58MXx8fHwxNzcwNDc0ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "Joining Taimaako changed my life. I earn 3x more than my previous job and I can choose my own hours. The clients are respectful and the support team is always there for me.",
      earnings: "₦180,000/month",
      duration: "8 months with Taimaako",
    },
    {
      name: "Ibrahim Musa",
      role: "Cooking & Meal Prep",
      image:
        "https://images.unsplash.com/photo-1608012075343-25226e3099f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHdvcmtlciUyMHVuaWZvcm0lMjBjbGVhbmluZ3xlbnwxfHx8fDE3NzA0NzQ4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "The flexibility is amazing. I work around my family schedule and the weekly payouts help me plan my finances better. Highly recommend!",
      earnings: "₦220,000/month",
      duration: "1 year with Taimaako",
    },
    {
      name: "Blessing Adeyemi",
      role: "Elder Care Assistant",
      image:
        "https://images.unsplash.com/photo-1512532019-3bdca31ba6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmVyJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NzA0NzQ4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      quote:
        "The training I received was top-notch. I feel professional and confident in my work. The insurance coverage gives me peace of mind.",
      earnings: "₦250,000/month",
      duration: "6 months with Taimaako",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Workers" },
    { number: "₦3,000+", label: "Hourly Rate" },
    { number: "1,000+", label: "Jobs Completed Monthly" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  const faqs = [
    {
      question: "How much can I earn with Taimaako?",
      answer:
        "Our workers earn between ₦80,000 - ₦300,000 per month depending on hours worked. Rates start at ₦3,000/hour, with premium rates for specialized services. Top performers can earn even more with bonuses.",
    },
    {
      question: "What services can I offer?",
      answer:
        "We have opportunities in indoor/outdoor cleaning, cooking, elder care, childcare (Mom's Helper), laundry, ironing, and office cleaning. You can offer multiple services once certified.",
    },
    {
      question: "How long does the application process take?",
      answer:
        "The entire process takes 7-14 days from application to your first job. This includes verification (3-5 days), training (2 days), and profile activation.",
    },
    {
      question: "Do I need prior experience?",
      answer:
        "While experience is preferred, it's not mandatory. We provide comprehensive training for all workers. What's important is your willingness to learn and commitment to quality service.",
    },
    {
      question: "When and how do I get paid?",
      answer:
        "Payments are processed weekly every Friday via bank transfer. You can track your earnings in real-time through your worker dashboard.",
    },
    {
      question: "What areas of Abuja do you cover?",
      answer:
        "We currently operate across all major areas in Abuja including Maitama, Asokoro, Wuse, Gwarinpa, Jabi, Kubwa, Lugbe, and surrounding neighborhoods.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <Logo className="h-8 w-auto" />
          <Button variant="outline" onClick={onLogin}>
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24 px-4 overflow-hidden mt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-white">
                🎉 Now Hiring in Abuja
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Turn Your Skills Into
                <span className="text-primary block">Income & Flexibility</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join Taimaako and become part of Nigeria's leading home service
                platform. Earn competitive rates, choose your schedule, and
                build a rewarding career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg h-14 px-8"
                  onClick={onGetStarted}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8"
                >
                  <PhoneCall className="mr-2 w-5 h-5" />
                  Contact Us
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>No application fee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" />
                  <span>Quick approval</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1575578800891-3822692698b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY2xlYW5lciUyMGhvbWUlMjBtb29keSUyMGRhcmslMjBsaWdodGluZ3xlbnwxfHx8fDE3NzA3NDM0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional Worker"
                className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Why Choose Taimaako</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits That Matter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to supporting our workers with competitive
              benefits and a supportive community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Get Started
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps from application to earning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                  )}
                  <div className="relative bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                      {item.step}
                    </div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hear From Our Workers
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from real people earning with Taimaako
            </p>
          </div>
          <div className="relative">
            <Card className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl"></div>
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="relative w-48 h-48 rounded-full object-cover border-4 border-background shadow-xl"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl mb-6 leading-relaxed italic">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="font-semibold text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-xl">
                        {testimonials[activeTestimonial].earnings}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeTestimonial].duration}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeTestimonial === index
                      ? "bg-primary w-8"
                      : "bg-border hover:bg-border/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-24 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Basic Requirements</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You Need to Apply
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple requirements to get started with Taimaako
            </p>
          </div>
          <Card className="p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with Taimaako
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-primary" />
                  {faq.question}
                </h3>
                <p className="text-muted-foreground pl-7">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join hundreds of workers earning flexible income with Taimaako today
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-8"
            onClick={onGetStarted}
          >
            Apply Now - It's Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>workers@taimaako.ng</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>+234 803 123 4567</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
