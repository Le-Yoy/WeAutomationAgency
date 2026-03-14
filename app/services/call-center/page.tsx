'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function CallCenterPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const capabilities = [
    {
      title: 'Inbound Call Handling',
      description: 'AI answers customer calls, understands intent, provides information, and routes complex issues to human agents.',
      impact: '-75% wait times',
    },
    {
      title: 'Appointment Scheduling',
      description: 'Automatically books appointments, sends confirmations, handles rescheduling, and syncs with your calendar.',
      impact: '+60% bookings',
    },
    {
      title: 'Order Status & Tracking',
      description: 'Provides real-time order updates, shipping information, and delivery estimates without human intervention.',
      impact: '-80% status inquiries',
    },
    {
      title: 'Voice Analytics',
      description: 'Tracks sentiment, identifies trends, analyzes conversation quality, and provides actionable insights.',
      impact: '100% call analysis',
    },
  ];

  const stats = [
    { value: '24/7', label: 'Availability', description: 'Never miss a call' },
    { value: '<3s', label: 'Response Time', description: 'Instant pickup' },
    { value: '95%', label: 'Call Resolution', description: 'First contact' },
    { value: '$0.08', label: 'Cost Per Call', description: 'vs $6 human agent' },
  ];

  const industries = [
    {
      name: 'Healthcare',
      useCases: ['Appointment scheduling', 'Insurance verification', 'Prescription refills', 'Patient intake'],
    },
    {
      name: 'E-commerce',
      useCases: ['Order tracking', 'Return requests', 'Product availability', 'Customer support'],
    },
    {
      name: 'Real Estate',
      useCases: ['Property inquiries', 'Showing schedules', 'Buyer qualification', 'Lead routing'],
    },
    {
      name: 'Professional Services',
      useCases: ['Consultation booking', 'Client onboarding', 'Billing questions', 'Service requests'],
    },
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
            AI Call Center<br />
            <span className="text-accent">Human-Like Quality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-grey text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Voice AI that answers calls, schedules appointments, and handles customer inquiries with
            the quality of your best human agent. Includes analytics and real-time reporting.
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
              Try Voice AI Demo
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Voice Wave Animation */}
        <motion.div
          style={{ y }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-2 opacity-20"
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: [20, 60, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              className="w-3 bg-accent rounded-full"
              style={{ height: 20 }}
            />
          ))}
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-t border-grey/10 bg-darker-grey/30">
        <div className="max-w-wide mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-secondary font-medium mb-1">{stat.label}</div>
                <div className="text-grey text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
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
              What It Can Do<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Our voice AI handles the full spectrum of customer interactions, from simple inquiries to complex multi-step processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {capabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-darker-grey border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">
                    {capability.title}
                  </h3>
                  <div className="text-accent text-sm font-medium whitespace-nowrap ml-4">
                    {capability.impact}
                  </div>
                </div>
                <p className="text-grey leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call Flow Visualization */}
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
              Smart Call Routing<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              AI determines intent, handles what it can, and escalates complex issues to the right human agent.
            </p>
          </motion.div>

          {/* Flow Diagram */}
          <div className="space-y-6">
            {[
              { step: 'Call Received', detail: 'AI answers instantly, no wait time', color: 'bg-accent/20' },
              { step: 'Intent Recognition', detail: 'Understands what caller needs in 2-3 seconds', color: 'bg-accent/40' },
              { step: 'Automated Resolution', detail: '85% of calls resolved without human agent', color: 'bg-accent/60' },
              { step: 'Smart Escalation', detail: 'Complex issues routed to specialist with context', color: 'bg-accent/80' },
              { step: 'Analytics & Learning', detail: 'Every call improves the system', color: 'bg-accent' },
            ].map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className={`${flow.color} rounded-2xl p-6 border border-grey/10`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-secondary mb-1">{flow.step}</h3>
                      <p className="text-secondary/80 text-sm">{flow.detail}</p>
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {i < 4 && (
                  <div className="w-0.5 h-6 bg-accent/40 ml-9 my-0" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
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
              Built For Your Industry<span className="text-accent">.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-darker-grey border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-accent mb-6">{industry.name}</h3>
                <ul className="space-y-3">
                  {industry.useCases.map((useCase, j) => (
                    <li key={j} className="flex items-start gap-3 text-grey">
                      <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
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
            Ready to Transform<br />Your Call Center<span className="text-accent">?</span>
          </h2>
          <p className="text-grey text-lg mb-12 max-w-2xl mx-auto">
            Launch your AI call center in 2-3 weeks. Handle unlimited calls at a fraction of the cost.
          </p>
          <Link
            href="/#contact"
            className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
          >
            Schedule Consultation
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
