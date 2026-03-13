'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    // Simulate — connect to real API later
    setTimeout(() => {
      setStatus('sent');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-primary border-t border-grey/10">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-tight text-secondary mb-4"
          >
            Ready to Take Your Project
            <br />
            to the Next Level?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-grey text-base sm:text-lg leading-relaxed mb-10"
          >
            Schedule a free consultation and discover solutions tailored to your needs.
          </motion.p>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-darker-grey border border-grey/20 rounded-pill px-5 py-3.5 text-secondary text-sm placeholder:text-grey/50 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-accent hover:bg-darker-orange text-secondary font-medium px-8 py-3.5 rounded-pill transition-colors duration-200 whitespace-nowrap disabled:opacity-50"
            >
              {status === 'sent' ? 'Sent!' : status === 'sending' ? 'Sending...' : 'Book A Call'}
            </button>
          </motion.form>

          <motion.p
            variants={fadeInUp}
            className="text-grey/50 text-xs mt-4"
          >
            By submitting, you agree to our{' '}
            <a href="/terms" className="underline hover:text-grey transition-colors">Terms</a> and{' '}
            <a href="/privacy" className="underline hover:text-grey transition-colors">Privacy Policy</a>.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
