import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy — WeAutomationAgency',
  description: 'Cookie policy for WeAutomationAgency',
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-primary text-secondary pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Link href="/" className="text-accent hover:text-darker-orange transition-colors text-sm mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cookie Policy</h1>
        <p className="text-grey text-sm mb-12">Last updated: February 13, 2026</p>

        <div className="space-y-8 text-grey leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">1. What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and
              understanding how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing cookies:</strong> Track your browsing habits to provide relevant content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-secondary mb-2">Session Cookies</h3>
                <p>These are temporary cookies that expire when you close your browser.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-secondary mb-2">Persistent Cookies</h3>
                <p>These remain on your device for a set period or until you delete them.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">4. Third-Party Cookies</h2>
            <p>
              We may use third-party services that place cookies on your device. These services include
              analytics providers and advertising partners. We do not control these third-party cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">5. Managing Cookies</h2>
            <p className="mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
              <li>Delete cookies: You can delete all cookies that are already on your device</li>
              <li>Third-party tools: Some third-party tools allow you to block tracking cookies</li>
            </ul>
            <p className="mt-4">
              Please note that blocking or deleting cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by
              posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">7. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{' '}
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
