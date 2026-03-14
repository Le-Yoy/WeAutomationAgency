import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — WeAutomationAgency',
  description: 'Learn how WeAutomationAgency protects your privacy and handles your personal information. Transparent data practices for AI automation services.',
  openGraph: {
    title: 'Privacy Policy — WeAutomationAgency',
    description: 'Transparent data practices and privacy protection for our AI automation services',
  },
};

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            We collect information you provide directly to us when you request a demo, contact us,
            or use our services. This includes:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Contact information (name, email, phone number)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Company information and business details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Communication preferences and interaction history</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Technical data (IP address, browser type, device information)</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'How We Use Your Information',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">We use your information to deliver exceptional service and experiences:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Provide, maintain, and improve our AI automation services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Respond to your requests, questions, and support needs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Send technical notices, updates, and security alerts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Communicate about products, services, offers, and events</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Analyze usage patterns and optimize user experience</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Information Sharing & Disclosure',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            <strong className="text-secondary">We never sell your data.</strong> Your privacy is paramount.
            We only share information in these limited circumstances:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>With trusted service providers under strict confidentiality agreements</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>When required by law or to protect rights and safety</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>With your explicit consent for specific purposes</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Data Security & Protection',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: (
        <p>
          We implement industry-standard technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction. This includes
          encryption, secure servers, regular security audits, and employee training on data protection.
        </p>
      ),
    },
    {
      title: 'Your Rights & Control',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">You have full control over your personal information:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Access:</strong> Request a copy of your data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Correction:</strong> Update inaccurate information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Deletion:</strong> Request permanent removal of your data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Opt-out:</strong> Unsubscribe from marketing communications</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Portability:</strong> Receive your data in a structured format</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Cookies & Tracking',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience and analyze website performance.
            Types of cookies we use:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Essential:</strong> Required for website functionality</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Analytics:</strong> Help us understand usage patterns</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span><strong className="text-secondary">Preferences:</strong> Remember your settings and choices</span>
            </li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings. See our{' '}
            <Link href="/cookies" className="text-accent hover:underline">Cookie Policy</Link> for details.
          </p>
        </>
      ),
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
            Privacy Policy<span className="text-accent">.</span>
          </h1>

          <p className="text-grey text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl">
            Your privacy matters to us. This policy explains how we collect, use, and protect your information.
          </p>

          <p className="text-grey/50 text-sm">
            Last updated: <span className="text-accent">February 13, 2026</span>
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-darker-grey/50 border border-grey/10 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-accent/20 transition-colors"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-1">
                    {section.title}
                  </h2>
                  <div className="w-16 h-1 bg-accent rounded-full"></div>
                </div>
              </div>

              <div className="text-grey leading-relaxed text-sm sm:text-base pl-0 sm:pl-16">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Questions About Your Privacy?</h2>
          <p className="text-grey mb-8 max-w-2xl mx-auto">
            If you have any questions or concerns about this Privacy Policy or how we handle your data,
            we are here to help.
          </p>
          <a
            href="mailto:ceo@weautomationagency.com"
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
