'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function EmailAutomationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      title: 'Behavioral Triggers',
      description: 'Emails sent based on user actions: cart abandonment, page visits, downloads, form submissions.',
      metric: '4.2x',
      label: 'Higher Engagement',
    },
    {
      title: 'Dynamic Personalization',
      description: 'Content adapts to each recipient: name, company, industry, previous interactions, preferences.',
      metric: '6x',
      label: 'Better Conversion',
    },
    {
      title: 'A/B Testing',
      description: 'Automatically test subject lines, content, CTAs, and send times to optimize performance.',
      metric: '+35%',
      label: 'Open Rates',
    },
    {
      title: 'Sequence Optimization',
      description: 'AI adjusts timing, frequency, and content based on recipient engagement patterns.',
      metric: '92%',
      label: 'Deliverability',
    },
  ];

  const sequences = [
    {
      name: 'Welcome Series',
      emails: 5,
      duration: '7 days',
      goal: 'Onboard new subscribers',
      conversion: '28%',
    },
    {
      name: 'Cart Abandonment',
      emails: 3,
      duration: '3 days',
      goal: 'Recover lost sales',
      conversion: '15%',
    },
    {
      name: 'Re-engagement',
      emails: 4,
      duration: '14 days',
      goal: 'Win back inactive users',
      conversion: '12%',
    },
    {
      name: 'Lead Nurture',
      emails: 8,
      duration: '30 days',
      goal: 'Convert prospects to customers',
      conversion: '22%',
    },
  ];

  const metrics = [
    { label: 'Average Open Rate', value: '42%', benchmark: 'vs 18% industry avg' },
    { label: 'Click-Through Rate', value: '8.5%', benchmark: 'vs 2.6% industry avg' },
    { label: 'Revenue Per Email', value: '$2.14', benchmark: 'vs $0.38 industry avg' },
    { label: 'List Growth Rate', value: '+12%', benchmark: 'monthly compound' },
  ];

  return (
    <main className="min-h-screen bg-primary text-secondary overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-32">
        <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm mb-8"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] mb-6"
          >
            Email Automation<br />
            <span className="text-accent">That Converts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-grey text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Smart email sequences that adapt to user behavior, delivering the right message at the right
            time to maximize conversions. Personalized at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/#contact"
              className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
            >
              Build Your Sequences
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Email Icons */}
        <motion.div
          style={{ rotate }}
          className="absolute top-32 right-[10%] opacity-10 pointer-events-none"
        >
          <svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </motion.div>
      </section>

      {/* Metrics */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-grey/10 bg-darker-grey/30">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-accent mb-2">{metric.value}</div>
                <div className="text-secondary font-medium mb-1">{metric.label}</div>
                <div className="text-grey text-xs">{metric.benchmark}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Intelligent Automation<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Our email systems learn from every interaction, continuously optimizing for better performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-darker-grey border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">{feature.metric}</div>
                    <div className="text-xs text-grey mt-1">{feature.label}</div>
                  </div>
                </div>
                <p className="text-grey leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Sequence Visualization */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-darker-grey/30 border-y border-grey/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Pre-Built Sequences<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Start with proven templates, then customize for your business and audience.
            </p>
          </motion.div>

          <div className="space-y-6">
            {sequences.map((seq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-primary border border-grey/10 rounded-xl p-6 hover:border-accent/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-1">{seq.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-grey">
                      <span>{seq.emails} emails</span>
                      <span className="w-1 h-1 bg-grey/50 rounded-full" />
                      <span>{seq.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">{seq.conversion}</div>
                    <div className="text-xs text-grey">avg conversion</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-grey">Goal: {seq.goal}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Example */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Example: Welcome Series<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              { day: 'Day 1', time: 'Immediate', subject: 'Welcome! Here\'s what to expect', open: '68%' },
              { day: 'Day 2', time: '+24 hours', subject: 'Your first steps to success', open: '52%' },
              { day: 'Day 4', time: '+72 hours', subject: 'Quick question about your goals', open: '44%' },
              { day: 'Day 7', time: '+6 days', subject: 'Here\'s how we can help you achieve [goal]', open: '38%' },
              { day: 'Day 14', time: '+13 days', subject: 'Special offer just for new members', open: '35%' },
            ].map((email, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-darker-grey border border-grey/10 rounded-xl p-6 hover:border-accent/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-accent font-bold">{email.day}</span>
                        <span className="text-grey/50 text-sm">{email.time}</span>
                      </div>
                      <p className="text-secondary font-medium">{email.subject}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{email.open}</div>
                      <div className="text-xs text-grey">opens</div>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {i < 4 && (
                  <div className="w-0.5 h-6 bg-accent/20 ml-6" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-6">
            Ready to Automate<br />Your Email Marketing<span className="text-accent">?</span>
          </h2>
          <p className="text-grey text-lg mb-12 max-w-2xl mx-auto">
            Launch automated email sequences that nurture leads and drive revenue while you sleep.
          </p>
          <Link
            href="/#contact"
            className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
          >
            Get Your Custom Sequences
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
