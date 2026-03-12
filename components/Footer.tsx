'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const quickLinks = [
  { name: 'AI Chatbot', href: '#services' },
  { name: 'Lead Generation', href: '#services' },
  { name: 'Call Center', href: '#services' },
  { name: 'Email Automation', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Cookie Policy', href: '#' },
];

const contactInfo = [
  { label: 'Email', value: 'ceo@weautomationagency.com', href: 'mailto:ceo@weautomationagency.com' },
  { label: 'Phone', value: '+1 (646) 980-2446', href: 'tel:+16469802446' },
  { label: 'Hours', value: 'Mon-Fri 9AM - 5PM EST', href: null },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-primary border-t border-grey/10">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Logo + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logos/Mini-Logo-Orangee.webp"
                alt="WeAutomationAgency"
                width={48}
                height={48}
                className="w-10 h-10"
              />
            </Link>
            <p className="text-grey text-sm leading-relaxed mb-6 max-w-xs">
              Empowering businesses with intelligent AI automation solutions
              that drive efficiency and growth.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setEmail(''); }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-darker-grey border border-grey/20 rounded-lg px-4 py-2.5 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-darker-orange text-secondary text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-grey text-sm hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-grey text-sm hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-secondary text-sm font-medium mb-4 tracking-wide uppercase">
              Contact
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
            <p className="text-grey/30 text-xs mt-4 leading-relaxed">
              BOUTALEB LLC<br />
              30 N GOULD ST STE N<br />
              SHERIDAN, WY 82801
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-grey/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-grey/40 text-xs">
            &copy; 2026 Boutaleb LLC. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
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

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
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

            {/* X / Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-grey/40 hover:text-secondary transition-colors"
              aria-label="Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
