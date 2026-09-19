'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { EMAIL } from '@/lib/content/services-email-automation';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

export default function EmailAutomationView({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = EMAIL[locale];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-32">
        <div className="absolute top-24 right-5 sm:right-8 lg:right-12 z-20"><LanguageSwitcher theme="light" /></div>
        <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
          <Link href={localizedPath(locale, '/')} className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm mb-8">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t.back}
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] mb-6 text-neutral-900">
            {t.hero.h1a}<br /><span className="text-accent">{t.hero.h1b}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-neutral-600 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">{t.hero.sub}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <Link href="/start" className="bg-accent hover:bg-darker-orange text-white font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg">
              {t.hero.cta}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div style={{ rotate }} className="absolute top-32 right-[10%] opacity-[0.06] pointer-events-none text-accent">
          <svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </motion.div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.metrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">{m.value}</div>
                <div className="text-neutral-900 font-medium mb-1">{m.label}</div>
                <div className="text-neutral-500 text-xs">{m.benchmark}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.features.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.features.sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.features.items.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-accent transition-colors">{f.title}</h3>
                  <div className="text-right"><div className="text-3xl font-bold text-accent">{f.metric}</div><div className="text-xs text-neutral-500 mt-1">{f.label}</div></div>
                </div>
                <p className="text-neutral-600 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sequences */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.sequences.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.sequences.sub}</p>
          </motion.div>
          <div className="space-y-6">
            {t.sequences.items.map((seq, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-accent/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-1">{seq.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span>{seq.emails} {t.sequences.emailsWord}</span>
                      <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                      <span>{seq.duration}</span>
                    </div>
                  </div>
                  <div className="text-right"><div className="text-3xl font-bold text-accent">{seq.conversion}</div><div className="text-xs text-neutral-500">{t.sequences.avgConversion}</div></div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                  <span className="text-neutral-500">{t.sequences.goalLabel}: {seq.goal}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.timeline.title}<span className="text-accent">.</span></h2>
          </motion.div>
          <div className="space-y-6">
            {t.timeline.items.map((email, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:border-accent/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2"><span className="text-accent font-bold">{email.day}</span><span className="text-neutral-400 text-sm">{email.time}</span></div>
                      <p className="text-neutral-900 font-medium">{email.subject}</p>
                    </div>
                    <div className="text-right"><div className="text-2xl font-bold text-accent">{email.open}</div><div className="text-xs text-neutral-500">{t.timeline.opensLabel}</div></div>
                  </div>
                </div>
                {i < t.timeline.items.length - 1 && <div className="w-0.5 h-6 bg-accent/20 ml-6" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 border-t border-neutral-200">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-6 text-neutral-900">{t.finalCta.h1a}<br />{t.finalCta.h1b}<span className="text-accent">?</span></h2>
          <p className="text-neutral-600 text-lg mb-12 max-w-2xl mx-auto">{t.finalCta.sub}</p>
          <Link href="/start" className="bg-accent hover:bg-darker-orange text-white font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg">
            {t.finalCta.cta}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </motion.div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
