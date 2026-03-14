import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — WeAutomationAgency',
  description: 'Terms and conditions for using WeAutomationAgency AI automation services. Clear, transparent guidelines for our business relationship.',
  openGraph: {
    title: 'Terms of Service — WeAutomationAgency',
    description: 'Terms and conditions for our AI automation services',
  },
};

export default function TermsOfService() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: (
        <p>
          By accessing or using WeAutomationAgency services, you agree to be bound by these Terms of Service.
          If you disagree with any part of these terms, you may not access our services. We reserve the right
          to update these terms at any time, and continued use constitutes acceptance of any changes.
        </p>
      ),
    },
    {
      title: 'Service Description',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            WeAutomationAgency provides AI-powered automation solutions including but not limited to:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>AI chatbot development and deployment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Automated lead generation systems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Intelligent call center solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Email automation and marketing workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Custom AI multimedia solutions</span>
            </li>
          </ul>
          <p className="mt-4">
            Services are provided &ldquo;as is&rdquo; and we reserve the right to modify, suspend, or discontinue
            any aspect of our services at any time with reasonable notice.
          </p>
        </>
      ),
    },
    {
      title: 'User Responsibilities',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">When using our services, you agree to:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Provide accurate and complete information during registration and use</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Maintain the security of your account credentials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Use our services only for lawful purposes and in accordance with these terms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Not attempt to interfere with, compromise, or reverse engineer our systems</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Comply with all applicable laws and regulations in your use of our services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Notify us immediately of any unauthorized use of your account</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Intellectual Property',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            All content, features, and functionality of our services are owned by WeAutomationAgency (Boutaleb LLC),
            our licensors, or other providers of such material and are protected by international copyright, trademark,
            patent, trade secret, and other intellectual property laws.
          </p>
          <p className="mb-4">
            <strong className="text-secondary">Your Content:</strong> You retain ownership of any content you provide
            to us. By using our services, you grant us a license to use, modify, and display your content solely for
            the purpose of providing our services to you.
          </p>
          <p>
            <strong className="text-secondary">Deliverables:</strong> Upon full payment, you receive ownership rights
            to custom-built solutions created specifically for you, subject to any third-party licenses for underlying
            technologies.
          </p>
        </>
      ),
    },
    {
      title: 'Payment Terms',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      content: (
        <>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <div>
                <strong className="text-secondary">Pricing:</strong> All prices are quoted in USD and are subject
                to change with 30 days notice for ongoing services.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <div>
                <strong className="text-secondary">Payment Schedule:</strong> Payment terms are specified in individual
                service agreements. Typically, projects require a 50% deposit upfront with the balance due upon completion.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <div>
                <strong className="text-secondary">Late Payments:</strong> Late payments may incur a 1.5% monthly
                interest charge and may result in suspension of services.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <div>
                <strong className="text-secondary">Refunds:</strong> Refund policies are outlined in individual service
                agreements. Generally, deposits are non-refundable once work has commenced.
              </div>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Warranties & Disclaimers',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            We strive for excellence but must make the following important disclaimers:
          </p>
          <p className="mb-4">
            <strong className="text-secondary">Service Warranty:</strong> We warrant that our services will be
            performed with professional skill and care. Any defects in deliverables will be corrected at no
            additional charge within 30 days of delivery.
          </p>
          <p className="mb-4">
            <strong className="text-secondary">NO WARRANTY:</strong> Beyond the above, services are provided &ldquo;AS IS&rdquo;
            without warranties of any kind, either express or implied, including but not limited to merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            <strong className="text-secondary">AI Limitations:</strong> AI-powered solutions may produce unexpected
            results. We do not guarantee specific outcomes or performance metrics unless explicitly stated in writing.
          </p>
        </>
      ),
    },
    {
      title: 'Limitation of Liability',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
        </svg>
      ),
      content: (
        <p>
          To the maximum extent permitted by law, WeAutomationAgency (Boutaleb LLC) shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
          whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          Our total liability shall not exceed the amount paid by you for the services in the 12 months preceding
          the claim.
        </p>
      ),
    },
    {
      title: 'Termination',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      content: (
        <>
          <p className="mb-4">
            Either party may terminate services under the following conditions:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>With 30 days written notice for ongoing services</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Immediately for material breach of these terms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent mt-1">•</span>
              <span>Immediately if the other party becomes insolvent or bankrupt</span>
            </li>
          </ul>
          <p className="mt-4">
            Upon termination, you must pay for all services rendered up to the termination date. We will provide
            access to your data for 30 days post-termination, after which it may be permanently deleted.
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
            Terms of Service<span className="text-accent">.</span>
          </h1>

          <p className="text-grey text-lg sm:text-xl leading-relaxed mb-4 max-w-2xl">
            Clear, transparent terms for our business relationship. We believe in honesty and mutual respect.
          </p>

          <p className="text-grey/50 text-sm">
            Effective date: <span className="text-accent">February 13, 2026</span>
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

      {/* Governing Law */}
      <section className="py-12 px-5 sm:px-8 lg:px-12 bg-darker-grey/30 border-t border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-grey leading-relaxed">
            These Terms of Service are governed by and construed in accordance with the laws of the State of Wyoming,
            United States, without regard to its conflict of law provisions. Any disputes arising from these terms
            shall be resolved in the courts of Sheridan County, Wyoming.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Questions About These Terms?</h2>
          <p className="text-grey mb-8 max-w-2xl mx-auto">
            We are committed to transparency. If you have any questions or need clarification about these terms,
            do not hesitate to reach out.
          </p>
          <a
            href="mailto:ceo@weautomationagency.com"
            className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-4 rounded-pill transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
