'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HOME } from '@/lib/content/home';
import { localizedPath, type SiteLocale } from '@/lib/i18n';
import { openCookieSettings, trackEvent } from '@/lib/tracking';

export default function Footer({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = HOME[locale].footer;
  const contactInfo: { label: string; value: string; href: string | null }[] = [
    { label: t.labels.email, value: 'support@weautomationagency.com', href: 'mailto:support@weautomationagency.com' },
    { label: t.labels.hours, value: t.hoursValue, href: null },
  ];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) {
        trackEvent('CompleteRegistration', { content_name: 'newsletter' });
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-primary border-t border-grey/10">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo + Newsletter */}
          <div className="lg:col-span-4">
            <Link href={localizedPath(locale, '/')} className="inline-block mb-6">
              <Image
                src="/images/logos/Mini-Logo-Orangee.webp"
                alt="WeAutomationAgency"
                width={48}
                height={48}
                className="w-10 h-10"
              />
            </Link>
            <p className="text-grey text-sm leading-relaxed mb-4 max-w-xs">
              {t.tagline}
            </p>
            <p className="text-secondary text-sm font-medium mb-3 max-w-xs">
              {t.newsletterPitch}
            </p>
            {status === 'success' ? (
              <p className="text-accent text-sm max-w-xs">{t.subscribed}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-darker-grey border border-grey/20 rounded-lg px-4 py-2.5 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-accent hover:bg-darker-orange text-secondary text-sm font-medium px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {status === 'sending' ? t.subscribing : t.subscribe}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-accent text-xs mt-2 max-w-xs">{t.subError}</p>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              {t.services}
            </h4>
            <ul className="space-y-3">
              {t.serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href === '/portfolio' ? link.href : localizedPath(locale, link.href)}
                    className="text-grey text-sm hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              {t.legal}
            </h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-grey text-sm hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-grey text-sm hover:text-secondary transition-colors"
                >
                  {t.cookieSettings}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              {t.contact}
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <span className="text-grey/50 text-xs block mb-0.5">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-grey text-sm hover:text-secondary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-grey text-sm">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-grey/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-grey/40 text-xs">
            &copy; 2026 WeAutomationAgency. {t.rights}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/WeAutomationAgency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/weautomationagency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/WeAutomationAG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="X"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/weautomationagency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@weautomationagency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
