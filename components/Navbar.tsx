'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenModal }: { onOpenModal?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const servicesLinks = [
    { name: 'AI Call Center', href: '/services/call-center' },
    { name: 'AI Leads Generation', href: '/services/lead-generation' },
    { name: 'AI E-mail Automation', href: '/services/email-automation' },
    { name: 'AI Chatbot', href: '/services/ai-chatbot' },
  ];

  const actionLinks = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Get A Demo', href: '/#contact' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-5 py-4"
      >
        <div className="max-w-wide mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              src="/images/logos/WeAutomationAgency-Logo.svg"
              alt="WeAutomationAgency"
              width={200}
              height={50}
              className="h-7 sm:h-9 w-auto"
              priority
            />
          </Link>

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-4 sm:gap-6 relative z-50">
            {/* Get Demo CTA */}
            <button
              onClick={onOpenModal}
              className="group flex items-center gap-3 text-secondary"
            >
              <span className="text-sm sm:text-base font-light tracking-wide hidden sm:inline">
                get demo
              </span>
              <span className="w-10 h-10 rounded-full border border-secondary/40 flex items-center justify-center overflow-hidden relative hover:border-secondary/80 transition-colors">
                <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0">
                  &rarr;
                </span>
                <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  &rarr;
                </span>
              </span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[2px] w-6 bg-secondary transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[8px]' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-secondary transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-secondary transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen menu overlay (starts below header) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-20 bottom-0 left-0 right-0 z-40 bg-accent"
          >
            <div className="h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 max-w-6xl mx-auto w-full">
              {/* Two-column nav links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32">
                {/* Left column — Services */}
                <nav className="flex flex-col gap-2">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-secondary/50 text-xs font-medium tracking-widest uppercase mb-4"
                  >
                    Services
                  </motion.h3>
                  {servicesLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="text-secondary text-xl sm:text-2xl lg:text-3xl font-light hover:text-primary hover:translate-x-2 transition-all duration-200 block py-2"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Right column — Actions */}
                <nav className="flex flex-col gap-2">
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-secondary/50 text-xs font-medium tracking-widest uppercase mb-4"
                  >
                    Get Started
                  </motion.h3>
                  {actionLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className="text-secondary text-xl sm:text-2xl lg:text-3xl font-light hover:text-primary hover:translate-x-2 transition-all duration-200 block py-2"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom bar — Email + LinkedIn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-secondary/20 pt-6"
              >
                <a
                  href="mailto:ceo@weautomationagency.com"
                  className="text-secondary/80 text-sm hover:text-secondary transition-colors"
                >
                  ceo@weautomationagency.com
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 text-sm hover:text-secondary transition-colors mt-2 sm:mt-0"
                >
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
