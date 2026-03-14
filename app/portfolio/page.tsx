'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const projects = [
    {
      title: 'E-commerce AI Chatbot',
      industry: 'Retail',
      challenge: 'Fashion retailer losing 68% of carts to abandonment, support team overwhelmed with product questions.',
      solution: 'Custom AI chatbot with product knowledge base, cart recovery sequences, and size recommendation engine.',
      results: [
        { metric: '+32%', label: 'Conversion Rate' },
        { metric: '-60%', label: 'Support Tickets' },
        { metric: '$2.1M', label: 'Additional Revenue' },
      ],
      tech: ['GPT-4', 'WhatsApp API', 'Shopify Integration', 'Custom NLP'],
    },
    {
      title: 'Banking Lead Qualification System',
      industry: 'Financial Services',
      challenge: 'Credit union spending $180k/year on unqualified leads, 78% not eligible for loans.',
      solution: 'Automated qualification chatbot that pre-screens applicants, collects documents, and routes qualified leads to loan officers.',
      results: [
        { metric: '+85%', label: 'Lead Quality' },
        { metric: '-72%', label: 'Processing Time' },
        { metric: '$140k', label: 'Annual Savings' },
      ],
      tech: ['Custom AI', 'Secure Data Handling', 'CRM Integration', 'Document Processing'],
    },
    {
      title: 'Healthcare Appointment System',
      industry: 'Healthcare',
      challenge: 'Dental practice missing 40% of calls, appointment no-show rate at 28%, admin team overloaded.',
      solution: 'Voice AI handles appointment scheduling, sends reminders, verifies insurance, collects patient intake forms.',
      results: [
        { metric: '0%', label: 'Missed Calls' },
        { metric: '-65%', label: 'No-Shows' },
        { metric: '+50%', label: 'Appointments Booked' },
      ],
      tech: ['Voice AI', 'HIPAA Compliant', 'Calendar Sync', 'SMS Automation'],
    },
    {
      title: 'Real Estate Lead Gen Pipeline',
      industry: 'Real Estate',
      challenge: 'Brokerage team manually qualifying 200+ inquiries/month, response time averaging 4 hours.',
      solution: 'Multi-channel lead capture, AI qualification chatbot, automated drip campaigns, instant property matching.',
      results: [
        { metric: '+45%', label: 'Qualified Leads' },
        { metric: '<2min', label: 'Response Time' },
        { metric: '3.2x', label: 'Pipeline Growth' },
      ],
      tech: ['Lead Scoring AI', 'Email Automation', 'MLS Integration', 'Multi-Channel'],
    },
    {
      title: 'SaaS Product Launch Campaign',
      industry: 'Technology',
      challenge: 'B2B SaaS startup with $0 marketing budget, needed 500 beta users in 30 days.',
      solution: 'Automated LinkedIn outreach, targeted email sequences, content distribution, referral incentives.',
      results: [
        { metric: '847', label: 'Beta Signups' },
        { metric: '28%', label: 'Conversion Rate' },
        { metric: '$0.82', label: 'Cost Per Signup' },
      ],
      tech: ['LinkedIn Automation', 'Email Sequences', 'Landing Pages', 'A/B Testing'],
    },
    {
      title: 'Hospitality Guest Experience AI',
      industry: 'Hospitality',
      challenge: 'Boutique hotel chain with inconsistent guest communication, slow response to requests.',
      solution: 'AI concierge available 24/7 via WhatsApp, handles reservations, recommendations, service requests, checkout.',
      results: [
        { metric: '4.9/5', label: 'Guest Satisfaction' },
        { metric: '+40%', label: 'Positive Reviews' },
        { metric: '-80%', label: 'Front Desk Load' },
      ],
      tech: ['WhatsApp Business', 'Multi-language AI', 'PMS Integration', 'Voice AI'],
    },
  ];

  const stats = [
    { value: '150+', label: 'Projects Delivered' },
    { value: '$50M+', label: 'Revenue Generated' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '45', label: 'Industries Served' },
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
            Our Work<span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-grey text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Real businesses. Real results. See how we have helped companies across industries automate,
            scale, and grow with custom AI solutions.
          </motion.p>
        </motion.div>

        <motion.div style={{ y }} className="absolute bottom-0 left-0 right-0 h-px bg-accent/20" />
      </section>

      {/* Stats */}
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
                <div className="text-grey">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
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
              Case Studies<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              From startups to enterprises, we build custom AI automation that delivers measurable ROI.
            </p>
          </motion.div>

          <div className="space-y-16">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-darker-grey border border-grey/10 rounded-3xl overflow-hidden hover:border-accent/40 transition-colors"
              >
                {/* Project Header */}
                <div className="p-8 sm:p-12 border-b border-grey/10">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
                        {project.title}
                      </h3>
                      <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-pill text-sm font-medium">
                        {project.industry}
                      </span>
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h4 className="text-accent text-sm uppercase tracking-wider font-medium mb-3">
                        Challenge
                      </h4>
                      <p className="text-grey leading-relaxed">{project.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-accent text-sm uppercase tracking-wider font-medium mb-3">
                        Solution
                      </h4>
                      <p className="text-grey leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="p-8 sm:p-12 bg-primary/30">
                  <h4 className="text-accent text-sm uppercase tracking-wider font-medium mb-6">
                    Results
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    {project.results.map((result, j) => (
                      <div key={j} className="text-center sm:text-left">
                        <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">
                          {result.metric}
                        </div>
                        <div className="text-grey text-sm">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h5 className="text-grey/50 text-xs uppercase tracking-wider mb-3">
                      Technology Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, k) => (
                        <span
                          key={k}
                          className="px-3 py-1 bg-primary border border-grey/20 rounded-lg text-xs text-grey"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Gallery Preview */}
      <section className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-grey/10 bg-darker-grey/30">
        <div className="max-w-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6">
              Websites We Built<span className="text-accent">.</span>
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto">
              Beautiful, high-converting websites designed and developed for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative aspect-[4/3] bg-primary rounded-2xl overflow-hidden border border-grey/10 hover:border-accent/40 transition-colors"
              >
                <Image
                  src={`/images/portfolio/Website AAA${i + 1}.webp`}
                  alt={`Website project ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
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
            Ready to Start<br />Your Project<span className="text-accent">?</span>
          </h2>
          <p className="text-grey text-lg mb-12 max-w-2xl mx-auto">
            Let us build something amazing together. Get a custom solution built for your exact needs.
          </p>
          <Link
            href="/#contact"
            className="bg-accent hover:bg-darker-orange text-secondary font-medium px-10 py-5 rounded-pill transition-colors inline-flex items-center gap-3 text-lg"
          >
            Schedule Free Consultation
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
