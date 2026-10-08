import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — WeAutomationAgency',
  description: 'Learn about how WeAutomationAgency uses cookies to enhance your experience. Transparent cookie usage for AI automation services.',
  openGraph: {
    title: 'Cookie Policy — WeAutomationAgency',
    description: 'Transparent cookie usage and tracking information',
  },
};

export default function CookiePolicy() {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'These are strictly necessary for the website to work and cannot be switched off. We use only two: one remembers your language, the other remembers your cookie choice so we do not ask again.',
      examples: ['NEXT_LOCALE — your language (EN / FR / ES)', 'waa-consent — your cookie choice (stored in your browser)'],
      duration: 'Language: 1 year · Cookie choice: until you clear your browser data',
      canDisable: false,
    },
    {
      name: 'Marketing Cookies',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      description: 'We use the Meta Pixel (by Meta Platforms) to measure our Facebook and Instagram ads and show them to people likely to be interested. It only loads if you click “Accept” in our cookie banner. It records page views and when you send our contact form or join our newsletter — never the content of your messages.',
      examples: ['Meta Pixel — _fbp and related cookies set by Meta', 'Events: page views, contact form sent (Lead), newsletter sign-up'],
      duration: 'Up to 90 days (set by Meta)',
      canDisable: true,
    },
  ];

  return (
    <main className="min-h-screen bg-primary text-secondary">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm mb-8"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight mb-6">
            Cookie Policy<span className="text-accent">.</span>
          </h1>

          <p className="text-grey text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl">
            We keep cookies to a minimum. Here is exactly what we use and why — and nothing for advertising runs unless you accept it.
          </p>

          <p className="text-grey/50 text-sm">
            Last updated: <span className="text-accent">October 8, 2026</span>
          </p>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">What Are Cookies?</h2>
              <p className="text-grey text-lg leading-relaxed mb-4">
                Cookies are small text files stored on your device when you visit a website. They help websites remember
                information about your visit, making your next visit easier and the site more useful to you.
              </p>
              <p className="text-grey leading-relaxed">
                Think of cookies like bookmarks that remember where you left off. They do not harm your device and most
                websites use them to improve your experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Cookies We Use</h2>

          <div className="space-y-8">
            {cookieTypes.map((cookie, index) => (
              <div
                key={index}
                className="bg-darker-grey/50 border border-grey/10 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    {cookie.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-secondary">{cookie.name}</h3>
                      {cookie.canDisable ? (
                        <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">
                          Optional
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-grey/20 text-grey rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <div className="w-16 h-1 bg-accent rounded-full"></div>
                  </div>
                </div>

                <div className="pl-0 sm:pl-16 space-y-4">
                  <p className="text-grey leading-relaxed">{cookie.description}</p>

                  <div>
                    <p className="text-secondary text-sm font-medium mb-2">Examples:</p>
                    <ul className="space-y-1">
                      {cookie.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-grey text-sm">
                          <span className="w-1 h-1 bg-accent rounded-full"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-grey/50">Duration: </span>
                      <span className="text-accent">{cookie.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Control Cookies */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 bg-darker-grey/30 border-t border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">How to Control Cookies</h2>

          <div className="space-y-4 text-grey leading-relaxed">
            <p>
              You choose whether the Meta Pixel runs: use the banner on your first visit, or change your choice any
              time with the <strong className="text-secondary">Cookie settings</strong> link at the bottom of every page.
              You can also block or delete cookies in your browser settings.
            </p>

            <div className="bg-primary/50 border border-grey/10 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-medium text-secondary mb-4">Browser Settings:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-secondary">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-secondary">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-secondary">Safari:</strong> Preferences → Privacy → Cookies and website data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span><strong className="text-secondary">Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</span>
                </li>
              </ul>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mt-6">
              <p className="text-secondary mb-2">
                <strong>⚠️ Important:</strong>
              </p>
              <p className="text-sm">
                Blocking or deleting cookies may prevent you from using certain features of our website and could
                affect your overall experience. Essential cookies are required for the site to function properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="text-grey leading-relaxed mb-4">
            The only third-party cookies on this site come from Meta Platforms (the Meta Pixel), and only after you
            accept them. Meta processes this data under its own{' '}
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">privacy policy</a>.
          </p>
          <p className="text-grey leading-relaxed">
            We do not use Google Analytics or any other analytics or advertising tracker.
          </p>
        </div>
      </section>

      {/* Updates */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="text-grey leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or
            our business practices. We will notify you of significant changes by updating the &ldquo;Last updated&rdquo; date
            at the top of this page. Please review this policy periodically.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Questions About Cookies?</h2>
          <p className="text-grey mb-8 max-w-2xl mx-auto">
            If you have any questions about how we use cookies or want to learn more about your privacy options,
            we are here to help.
          </p>
          <a
            href="mailto:support@weautomationagency.com"
            className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-4 rounded-pill transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
