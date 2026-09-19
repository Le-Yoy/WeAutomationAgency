'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Footer from '@/components/Footer';
import { CHATBOT } from '@/lib/content/services-ai-chatbot';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

export default function AiChatbotView({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = CHATBOT[locale];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-hidden">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-32">
        <div className="absolute top-24 right-5 sm:right-8 lg:right-12 z-20">
          <LanguageSwitcher theme="light" />
        </div>
        <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
          <Link href={localizedPath(locale, '/')} className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm mb-8">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] mb-6 text-neutral-900">
            {t.hero.h1a}<br />
            <span className="text-accent">{t.hero.h1b}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-neutral-600 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.hero.sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start" className="bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors inline-flex items-center justify-center gap-2">
              {t.hero.ctaPrimary}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link href="/start" className="border border-neutral-300 hover:border-accent text-neutral-900 font-medium px-8 py-4 rounded-pill transition-colors inline-flex items-center justify-center">
              {t.hero.ctaDemo}
            </Link>
          </motion.div>
        </motion.div>
        <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] opacity-30"><div className="w-64 h-32 bg-accent/20 rounded-3xl rounded-bl-none blur-2xl" /></motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-40 right-[15%] opacity-30"><div className="w-48 h-24 bg-accent/20 rounded-3xl rounded-br-none blur-2xl" /></motion.div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-neutral-200">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.features.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.features.sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {t.features.items.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="group bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-neutral-900">{feature.title}</h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-accent">{feature.stat}</div>
                    <div className="text-xs text-neutral-500 mt-1">{feature.label}</div>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat demo */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.chat.title1}<br />{t.chat.title2}<span className="text-accent">.</span></h2>
          </motion.div>
          <div className="space-y-4">
            {t.chat.messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: msg.from === 'user' ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportOnce} transition={{ duration: 0.5, delay: i * 0.15 }} className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.from === 'user' ? 'bg-white border border-neutral-200 rounded-tl-none text-neutral-900' : 'bg-accent text-white rounded-tr-none'}`}>
                  <p className="text-sm sm:text-base">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-wide mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.8 }} className="text-center mb-16">
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-neutral-900">{t.useCases.title}<span className="text-accent">.</span></h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">{t.useCases.sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {t.useCases.items.map((useCase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 hover:border-accent/40 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <h3 className="text-xl font-semibold text-accent">{useCase.industry}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{t.useCases.challenge}</p>
                    <p className="text-neutral-600 text-sm">{useCase.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{t.useCases.solution}</p>
                    <p className="text-neutral-600 text-sm">{useCase.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-neutral-200">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{t.useCases.results}</p>
                    <p className="text-accent font-medium text-sm">{useCase.result}</p>
                  </div>
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
          <p className="text-neutral-500 text-sm mt-10">
            {t.finalCta.blogPre}{' '}
            <Link href={localizedPath(locale, '/blog/ai-chatbots-for-business')} className="text-accent hover:underline">{t.finalCta.blogGuide}</Link>{' '}
            {t.finalCta.blogMid}{' '}
            <Link href={localizedPath(locale, '/blog/ai-chatbot-cost')} className="text-accent hover:underline">{t.finalCta.blogCost}</Link>.
          </p>
        </motion.div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
