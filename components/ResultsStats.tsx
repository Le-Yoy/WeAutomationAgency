'use client';

import { motion } from 'framer-motion';
import { useCountUp } from './hooks/useCountUp';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const stats = [
  { end: 95, suffix: '%', label: 'Client Satisfaction' },
  { end: 500, suffix: '+', label: 'Projects Completed' },
  { end: 10, prefix: '$', suffix: 'M+', label: 'Revenue Generated' },
];

function StatCard({ end, suffix, prefix, label, delay }: {
  end: number;
  suffix: string;
  prefix?: string;
  label: string;
  delay: number;
}) {
  const { ref, display } = useCountUp({ end, prefix, suffix, duration: 2500 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay }}
      className="text-center px-6 py-4"
    >
      <span className="block text-[clamp(2.5rem,5vw,4rem)] font-bold text-accent leading-none mb-2">
        {display}
      </span>
      <span className="text-grey text-sm sm:text-base tracking-wide uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function ResultsStats() {
  return (
    <section className="py-20 sm:py-28 bg-primary">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-16 sm:mb-24"
        >
          {/* Left — Tagline + Heading */}
          <motion.div variants={fadeInUp} className="lg:w-1/2">
            <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
              Results
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-secondary">
              We Drive Real Results
              <br />
              For Real Businesses
            </h2>
          </motion.div>

          {/* Right — Description + CTAs */}
          <motion.div variants={fadeInUp} className="lg:w-1/2 flex flex-col justify-center">
            <p className="text-grey text-base sm:text-lg leading-relaxed mb-8">
              Our AI automation solutions have helped hundreds of businesses
              streamline operations, boost customer engagement, and significantly
              increase their revenue. Here&apos;s what our track record looks like.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#services"
                className="group flex items-center gap-3 text-secondary"
              >
                <span className="text-sm sm:text-base font-light tracking-wide">
                  Learn More
                </span>
                <span className="w-10 h-10 rounded-full border border-secondary/40 flex items-center justify-center overflow-hidden relative hover:border-accent hover:bg-accent transition-all duration-300">
                  <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0">
                    &rarr;
                  </span>
                  <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-3 text-secondary"
              >
                <span className="text-sm sm:text-base font-light tracking-wide">
                  Contact Us
                </span>
                <span className="w-10 h-10 rounded-full border border-secondary/40 flex items-center justify-center overflow-hidden relative hover:border-accent hover:bg-accent transition-all duration-300">
                  <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0">
                    &rarr;
                  </span>
                  <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    &rarr;
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <div className="border-t border-grey/20 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-grey/20">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} delay={i * 0.2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
