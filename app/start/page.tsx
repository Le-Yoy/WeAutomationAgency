import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import StartForm from '@/components/StartForm';

export const metadata: Metadata = {
  title: 'Get Your Free Demo — WeAutomationAgency',
  description:
    'Book your free AI automation demo. Tell us where to reach you and our team will get back to you within 24 hours.',
  robots: { index: false, follow: true },
};

const BENEFITS = [
  'A reply from our team within 24 hours',
  'A custom plan built around your business — no templates',
  'No commitment, no pressure, no jargon',
];

export default function StartPage() {
  return (
    <main className="min-h-[100dvh] bg-primary text-secondary flex flex-col">
      {/* Top bar — logo only, minimal to keep focus on the form */}
      <header className="px-5 sm:px-8 lg:px-12 py-5 sm:py-6">
        <Link href="/" aria-label="WeAutomationAgency home" className="inline-block">
          <Image
            src="/images/logos/WeAutomationAgency-Logo.svg"
            alt="WeAutomationAgency"
            width={200}
            height={50}
            className="h-7 sm:h-8 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center px-5 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="max-w-container mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — headline & value */}
          <div>
            <p className="text-accent text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              Get Your Demo
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Let&apos;s automate the
              <span className="text-accent"> boring parts</span> of your business.
            </h1>
            <p className="text-grey text-base sm:text-lg mt-6 max-w-md leading-relaxed">
              Drop your details and we&apos;ll show you exactly how AI can save you
              time and win you more customers — tailored to what you do.
            </p>

            <ul className="mt-8 space-y-3.5">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#F94239" strokeWidth="2.5">
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </span>
                  <span className="text-secondary/80 text-sm sm:text-base leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="w-full max-w-lg lg:justify-self-end">
            <StartForm />
          </div>
        </div>
      </div>

      {/* Footer line */}
      <footer className="px-5 sm:px-8 lg:px-12 py-6 border-t border-grey/10">
        <div className="max-w-container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-grey/60 text-xs">© 2026 Boutaleb LLC. All rights reserved.</p>
          <a
            href="mailto:ceo@weautomationagency.com"
            className="text-grey/60 hover:text-secondary text-xs transition-colors"
          >
            ceo@weautomationagency.com
          </a>
        </div>
      </footer>
    </main>
  );
}
