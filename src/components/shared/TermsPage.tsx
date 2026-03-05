import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { FileText } from 'lucide-react';

export function TermsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: February 2, 2026</p>
        </div>

        <Card className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Taimaako. These Terms and Conditions ("Terms") govern your use of our platform and services. By accessing or using Taimaako, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Taimaako is a platform that connects clients seeking home services with qualified service providers ("TaimaakoStars") in Abuja, Nigeria. Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Indoor and outdoor cleaning services</li>
              <li>Cooking and meal preparation</li>
              <li>Childcare and elder care services</li>
              <li>Laundry and ironing services</li>
              <li>Office cleaning services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong>3.1 Account Creation:</strong> To use our services, you must create an account and provide accurate, current, and complete information.
              </p>
              <p>
                <strong>3.2 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              <p>
                <strong>3.3 Age Requirement:</strong> You must be at least 18 years old to create an account and use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Bookings and Payments</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong>4.1 Booking Process:</strong> All bookings are subject to availability and confirmation by Taimaako management.
              </p>
              <p>
                <strong>4.2 Pricing:</strong> Service prices are displayed during the booking process. Final prices may be adjusted based on specific requirements.
              </p>
              <p>
                <strong>4.3 Payment:</strong> Payment is required upon booking confirmation. We accept debit/credit cards, bank transfers, and TaimaakoCred.
              </p>
              <p>
                <strong>4.4 Cancellation:</strong> Cancellations made 24 hours or more before the scheduled service are eligible for a full refund. Cancellations within 24 hours may incur a cancellation fee.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Client Responsibilities</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Clients agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate information about service requirements</li>
                <li>Ensure a safe working environment for TaimaakoStars</li>
                <li>Provide necessary equipment and materials unless otherwise agreed</li>
                <li>Treat TaimaakoStars with respect and professionalism</li>
                <li>Be present or ensure authorized access to the service location</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. TaimaakoStar Responsibilities</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>Service providers agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide services professionally and competently</li>
                <li>Arrive on time for scheduled appointments</li>
                <li>Maintain client confidentiality and privacy</li>
                <li>Follow all safety and security protocols</li>
                <li>Report any issues or concerns immediately</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Liability and Insurance</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong>7.1 Insurance:</strong> Taimaako maintains insurance coverage for services provided through our platform.
              </p>
              <p>
                <strong>7.2 Limitation of Liability:</strong> Taimaako is not liable for indirect, incidental, or consequential damages arising from the use of our services.
              </p>
              <p>
                <strong>7.3 Property Damage:</strong> Any damage to property should be reported immediately. Claims will be reviewed on a case-by-case basis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Referral Program</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Taimaako referral program allows users to earn TaimaakoCred by referring new clients. Referral rewards are credited only after the referred client completes their first booking. Taimaako reserves the right to modify or terminate the referral program at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Privacy and Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any disputes arising from these Terms or the use of our services shall be resolved through good faith negotiations. If negotiations fail, disputes shall be subject to the jurisdiction of Nigerian courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Taimaako reserves the right to modify these Terms at any time. Users will be notified of significant changes via email or through the platform. Continued use of our services after modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 space-y-1 text-muted-foreground">
              <p>Email: legal@taimaako.ng</p>
              <p>Phone: +234 800 123 4567</p>
              <p>Address: 42 Ademola Adetokunbo Crescent, Wuse 2, Abuja, Nigeria</p>
            </div>
          </section>
        </Card>

        <Card className="p-6 bg-muted">
          <p className="text-sm text-muted-foreground text-center">
            By using Taimaako, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </Card>
      </div>
    </div>
  );
}
