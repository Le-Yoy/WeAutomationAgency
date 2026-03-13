import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — WeAutomationAgency',
  description: 'Privacy policy for WeAutomationAgency services',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-primary text-secondary pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Link href="/" className="text-accent hover:text-darker-orange transition-colors text-sm mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-grey text-sm mb-12">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-grey leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you request a demo, contact us,
              or use our services. This may include your name, email address, phone number, company
              information, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your requests and communications</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information only with trusted service providers who assist us in operating our
              website and conducting our business, subject to confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:ceo@weautomationagency.com" className="text-accent hover:underline">
                ceo@weautomationagency.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
