'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { CALLCENTER } from '@/lib/content/services-call-center';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

export default function CallCenterView({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = CALLCENTER[locale];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
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
        <motion.div style={{ y }} className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-2 opacity-30">
          {[...Array(7)].map((_, i) => (
            <motion.div key={i} animate={{ height: [20, 60, 20] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }} className="w-3 bg-accent rounded-full" style={{ height: 20 }} />
          ))}
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-accent mb-2">{s.value}</div>
                <div className="text-neutral-900 font-medium mb-1">{s.label}</div>
                <div className="text-neutral-500 text-sm">{s.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.capabilities.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.capabilities.sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {t.capabilities.items.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-accent transition-colors">{c.title}</h3>
                  <div className="text-accent text-sm font-medium whitespace-nowrap ml-4">{c.impact}</div>
                </div>
                <p className="text-neutral-600 leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call flow */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.flow.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.flow.sub}</p>
          </motion.div>
          <div className="space-y-6">
            {t.flow.steps.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="rounded-2xl p-6 border border-neutral-200" style={{ backgroundColor: `rgba(249,66,57,${0.08 + i * 0.06})` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral-900 font-bold flex-shrink-0 border border-neutral-200">{i + 1}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-1">{f.step}</h3>
                      <p className="text-neutral-600 text-sm">{f.detail}</p>
                    </div>
                  </div>
                </div>
                {i < t.flow.steps.length - 1 && <div className="w-0.5 h-6 bg-accent/40 ml-9 my-0" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.industries.title}<span className="text-accent">.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.industries.items.map((ind, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-colors">
                <h3 className="text-2xl font-semibold text-accent mb-6">{ind.name}</h3>
                <ul className="space-y-3">
                  {ind.useCases.map((uc, j) => (
                    <li key={j} className="flex items-start gap-3 text-neutral-600">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span>{uc}</span>
                    </li>
                  ))}
                </ul>
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
