'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { LEADGEN } from '@/lib/content/services-lead-generation';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

export default function LeadGenerationView({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = LEADGEN[locale];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
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
        <motion.div style={{ scale }} className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
          <div className="w-[500px] h-[500px] border-2 border-accent rounded-full" />
        </motion.div>
      </section>

      {/* Funnel */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.funnel.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.funnel.sub}</p>
          </motion.div>
          <div className="space-y-4">
            {t.funnel.stages.map((stage, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="rounded-2xl p-6 flex items-center justify-between" style={{ width: `${100 - i * 15}%`, backgroundColor: `rgba(249,66,57,${0.15 + i * 0.22})` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center text-neutral-900 font-bold">{i + 1}</div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">{stage}</h3>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-neutral-900">{t.funnel.counts[i]}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportOnce} transition={{ duration: 0.8, delay: 0.6 }} className="text-center text-accent font-medium mt-8 text-lg">{t.funnel.note}</motion.p>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.strategies.title}<span className="text-accent">.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.strategies.items.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-accent transition-colors">{s.title}</h3>
                  <div className="text-right"><div className="text-4xl font-bold text-accent">{s.metric}</div><div className="text-xs text-neutral-500 mt-1">{s.label}</div></div>
                </div>
                <p className="text-neutral-600 leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.channels.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.channels.sub}</p>
          </motion.div>
          <div className="space-y-6">
            {t.channels.items.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.08 }} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 hover:border-accent/40 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4"><span className="text-3xl">{c.icon}</span><h3 className="text-xl font-semibold text-neutral-900">{c.name}</h3></div>
                  <span className="text-accent font-bold">{c.effectiveness}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${c.effectiveness}%` }} viewport={viewportOnce} transition={{ duration: 1, delay: i * 0.08 + 0.3 }} className="h-full bg-accent rounded-full" />
                </div>
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
