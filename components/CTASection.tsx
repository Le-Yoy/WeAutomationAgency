'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

export default function CTASection({ onOpenModal }: { onOpenModal?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={sectionRef} className="relative py-32 sm:py-40 overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/images/ai-generated/yoy9714_a_dynamic_AI_automation_agency_office_high-tech_worksta_4c56e01e-49ae-4b7c-b4ae-ca9bd6a5e016.webp"
          alt="AI automation office"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 max-w-wide mx-auto px-5 sm:px-8 lg:px-12 text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight text-secondary max-w-3xl mx-auto mb-6"
        >
          Ready to Automate Your Business?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-grey text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Join hundreds of businesses that have transformed their operations with
          our AI-powered solutions. From chatbots to lead generation, we build
          the systems that work while you sleep.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
          {/* Start Now */}
          <button
            onClick={onOpenModal}
            className="group flex items-center gap-3 bg-accent hover:bg-darker-orange text-secondary px-6 py-3 rounded-pill transition-colors duration-200"
          >
            <span className="text-sm sm:text-base font-medium tracking-wide">
              Start Now
            </span>
            <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center overflow-hidden relative">
              <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0 text-sm">
                &rarr;
              </span>
              <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-sm">
                &rarr;
              </span>
            </span>
          </button>

          {/* Learn More */}
          <a
            href="#services"
            className="group flex items-center gap-3 border border-secondary/40 text-secondary px-6 py-3 rounded-pill hover:border-secondary transition-colors duration-200"
          >
            <span className="text-sm sm:text-base font-light tracking-wide">
              Learn More
            </span>
            <span className="w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center overflow-hidden relative">
              <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0 text-sm">
                &rarr;
              </span>
              <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-sm">
                &rarr;
              </span>
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
