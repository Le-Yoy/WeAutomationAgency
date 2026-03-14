'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function AIChatbotPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      title: 'Natural Conversations',
      description: 'AI that understands context, remembers previous interactions, and responds like a human team member.',
      stat: '98%',
      label: 'User Satisfaction',
    },
    {
      title: 'Instant Deployment',
      description: 'Launch across website, WhatsApp, Instagram, Messenger, and custom channels in 24-48 hours.',
      stat: '24/7',
      label: 'Always Available',
    },
    {
      title: 'Smart Learning',
      description: 'Continuously improves from every conversation, adapting to your business and customer needs.',
      stat: '10x',
      label: 'Faster Responses',
    },
    {
      title: 'Multilingual Support',
      description: 'Communicate in 95+ languages automatically, breaking down barriers with global customers.',
      stat: '95+',
      label: 'Languages',
    },
  ];

  const useCases = [
    {
      industry: 'E-commerce',
      problem: 'Cart abandonment, product questions, order tracking',
      solution: 'AI guides purchases, answers product questions instantly, provides order status 24/7',
      result: '+32% conversion rate, -60% support tickets',
    },
    {
      industry: 'Banking',
      problem: 'Account inquiries, transaction disputes, loan applications',
      solution: 'Secure AI handles sensitive data, qualifies leads, routes complex issues to specialists',
      result: '85% of inquiries resolved instantly, +40% lead quality',
    },
    {
      industry: 'Healthcare',
      problem: 'Appointment scheduling, insurance verification, patient intake',
      solution: 'HIPAA-compliant AI collects information, schedules appointments, verifies coverage',
      result: '-70% admin time, +50% appointment bookings',
    },
    {
      industry: 'Real Estate',
      problem: 'Property inquiries, showing requests, lead qualification',
      solution: 'AI qualifies buyers, schedules tours, answers listing questions with property data',
      result: '+45% qualified leads, -80% response time',
    },
  ];

  return (
    <main className="min-h-screen bg-primary text-secondary overflow-hidden">
      {/* Hero Section with Floating Chat Bubbles */}
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
            AI Chatbot<br />
            <span className="text-accent">That Actually Works</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-grey text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Custom conversational AI that handles support, qualifies leads, and drives sales across
            your website, WhatsApp, and social channels. Built from scratch for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/#contact"
              className="bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-4 rounded-pill transition-colors inline-flex items-center justify-center gap-2"
            >
              Get Your Custom Chatbot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/#demo"
              className="border border-grey/20 hover:border-accent/40 text-secondary font-medium px-8 py-4 rounded-pill transition-colors inline-flex items-center justify-center"
            >
              See Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Chat Bubbles */}
        <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] opacity-20">
          <div className="w-64 h-32 bg-accent/30 rounded-3xl rounded-bl-none blur-xl" />
        </motion.div>
        <motion.div style={{ y: y2 }} className="absolute bottom-40 right-[15%] opacity-20">
          <div className="w-48 h-24 bg-accent/30 rounded-3xl rounded-br-none blur-xl" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 right-[8%]"
        >
          <div className="w-40 h-20 bg-accent/30 rounded-3xl rounded-br-none blur-xl" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-grey/10">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Built Different<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              No templates. No cookie-cutter solutions. Every chatbot is custom-built for your exact needs.
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
                className="group bg-darker-grey border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-accent">{feature.stat}</div>
                    <div className="text-xs text-grey mt-1">{feature.label}</div>
                  </div>
                </div>
                <p className="text-grey leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Visualization */}
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
              Conversations<br />That Convert<span className="text-accent">.</span>
            </h2>
          </motion.div>

          {/* Animated Chat Demo */}
          <div className="space-y-4">
            {[
              { from: 'user', text: 'Do you have this product in stock?', delay: 0 },
              { from: 'bot', text: 'Yes! We have 47 units available. Would you like to see similar products or place an order?', delay: 0.3 },
              { from: 'user', text: 'What are the shipping options?', delay: 0.6 },
              { from: 'bot', text: 'Free standard shipping (3-5 days) or express delivery (1-2 days) for $12. Which works better for you?', delay: 0.9 },
            ].map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.from === 'user' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: msg.delay }}
                className={`flex ${msg.from === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.from === 'user'
                      ? 'bg-primary border border-grey/20 rounded-tl-none'
                      : 'bg-accent text-secondary rounded-tr-none'
                  }`}
                >
                  <p className="text-sm sm:text-base">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
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
              Real Results<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              See how businesses across industries use AI chatbots to scale support and increase revenue.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-darker-grey border border-grey/10 rounded-2xl p-8 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <h3 className="text-xl font-semibold text-accent">{useCase.industry}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-grey/50 uppercase tracking-wider mb-2">Challenge</p>
                    <p className="text-grey text-sm">{useCase.problem}</p>
                  </div>

                  <div>
                    <p className="text-xs text-grey/50 uppercase tracking-wider mb-2">Solution</p>
                    <p className="text-grey text-sm">{useCase.solution}</p>
                  </div>

                  <div className="pt-4 border-t border-grey/10">
                    <p className="text-xs text-grey/50 uppercase tracking-wider mb-2">Results</p>
                    <p className="text-accent font-medium text-sm">{useCase.result}</p>
                  </div>
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
            Ready to Automate<br />Your Conversations<span className="text-accent">?</span>
          </h2>
          <p className="text-grey text-lg mb-12 max-w-2xl mx-auto">
            Get a custom AI chatbot built for your business. No templates, no compromises.
          </p>
          <Link
            href="/#contact"
            className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
          >
            Start Your Project
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
