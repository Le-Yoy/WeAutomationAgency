import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — WeAutomationAgency',
  description: 'Terms of service for WeAutomationAgency',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-primary text-secondary pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Link href="/" className="text-accent hover:text-darker-orange transition-colors text-sm mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-grey text-sm mb-12">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-grey leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using WeAutomationAgency services, you agree to be bound by these Terms
              of Service and all applicable laws and regulations. If you do not agree with any of these
              terms, you are prohibited from using or accessing our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">2. Services Description</h2>
            <p>
              WeAutomationAgency provides AI automation solutions including chatbots, lead generation
              systems, call center automation, and email automation services. Service specifications
              and deliverables will be outlined in individual project agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">3. User Obligations</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services in compliance with all applicable laws</li>
              <li>Not engage in any activity that interferes with or disrupts our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">4. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services are owned by BOUTALEB LLC and
              are protected by international copyright, trademark, and other intellectual property laws.
              Custom solutions developed for clients remain the property of the client upon full payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">5. Payment Terms</h2>
            <p>
              Payment terms will be specified in individual project agreements. Generally, payments are
              due according to project milestones or monthly subscriptions as agreed upon. Late payments
              may result in service suspension.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">6. Limitation of Liability</h2>
            <p>
              WeAutomationAgency shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages resulting from your use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our services immediately, without
              prior notice, for any reason, including breach of these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">8. Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:ceo@weautomationagency.com" className="text-accent hover:underline">
                ceo@weautomationagency.com
              </a>
            </p>
            <p className="mt-4">
              BOUTALEB LLC<br />
              30 N GOULD ST STE N<br />
              SHERIDAN, WY 82801
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
