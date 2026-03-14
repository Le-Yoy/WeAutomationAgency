'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function LeadGenerationPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const strategies = [
    {
      title: 'Automated Outreach',
      description: 'Multi-channel campaigns across email, LinkedIn, and social media. Personalized at scale.',
      metric: '3x',
      label: 'More Leads',
    },
    {
      title: 'Smart Qualification',
      description: 'AI scores and prioritizes leads based on behavior, engagement, and fit.',
      metric: '70%',
      label: 'Higher Quality',
    },
    {
      title: 'Nurture Sequences',
      description: 'Automated workflows that adapt to each lead\'s journey and engagement level.',
      metric: '5x',
      label: 'Better Conversion',
    },
    {
      title: 'Data Enrichment',
      description: 'Automatically find and fill missing contact info, company data, and firmographics.',
      metric: '90%',
      label: 'Data Accuracy',
    },
  ];

  const funnel = [
    { stage: 'Visitors', count: '10,000', color: 'bg-accent/20' },
    { stage: 'Engaged', count: '3,500', color: 'bg-accent/40' },
    { stage: 'Qualified', count: '850', color: 'bg-accent/60' },
    { stage: 'Customers', count: '170', color: 'bg-accent' },
  ];

  const channels = [
    { name: 'Email Campaigns', icon: '📧', effectiveness: 85 },
    { name: 'LinkedIn Outreach', icon: '💼', effectiveness: 78 },
    { name: 'Landing Pages', icon: '🎯', effectiveness: 92 },
    { name: 'Content Marketing', icon: '📝', effectiveness: 73 },
    { name: 'Paid Ads', icon: '📊', effectiveness: 68 },
    { name: 'Webinars', icon: '🎥', effectiveness: 88 },
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
            Lead Generation<br />
            <span className="text-accent">On Autopilot</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-grey text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            AI-powered systems that find, qualify, and nurture your ideal customers through automated
            outreach, smart funnels, and data-driven targeting.
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
              Build Your Pipeline
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        >
          <div className="w-[500px] h-[500px] border-2 border-accent rounded-full" />
        </motion.div>
      </section>

      {/* Funnel Visualization */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Turn Traffic Into Revenue<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Our systems optimize every stage of your funnel, from first touch to closed deal.
            </p>
          </motion.div>

          {/* Funnel Stages */}
          <div className="space-y-4">
            {funnel.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`${stage.color} rounded-2xl p-6 flex items-center justify-between`}
                  style={{ width: `${100 - i * 15}%` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-secondary font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-secondary">{stage.stage}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-secondary">{stage.count}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-accent font-medium mt-8 text-lg"
          >
            1.7% conversion rate → 17 customers per 1,000 visitors
          </motion.p>
        </div>
      </section>

      {/* Strategies Grid */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-darker-grey/30 border-y border-grey/10">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              How We Generate Leads<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {strategies.map((strategy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-primary border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                    {strategy.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-accent">{strategy.metric}</div>
                    <div className="text-xs text-grey mt-1">{strategy.label}</div>
                  </div>
                </div>
                <p className="text-grey leading-relaxed">{strategy.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Breakdown */}
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
              Multi-Channel Approach<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              We deploy across every channel where your ideal customers spend time.
            </p>
          </motion.div>

          <div className="space-y-6">
            {channels.map((channel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-darker-grey border border-grey/10 rounded-xl p-6 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{channel.icon}</span>
                    <h3 className="text-xl font-semibold">{channel.name}</h3>
                  </div>
                  <span className="text-accent font-bold">{channel.effectiveness}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-primary rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${channel.effectiveness}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1, delay: i * 0.08 + 0.3 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
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
            Ready to Scale<br />Your Lead Flow<span className="text-accent">?</span>
          </h2>
          <p className="text-grey text-lg mb-12 max-w-2xl mx-auto">
            Let us build a custom lead generation system that runs 24/7 and fills your pipeline with qualified prospects.
          </p>
          <Link
            href="/#contact"
            className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
          >
            Get Started Today
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
