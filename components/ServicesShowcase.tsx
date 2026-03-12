'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { viewportOnce } from '@/lib/animations';

const services = [
  {
    title: 'AI Chatbot',
    description: 'Custom-built conversational AI that handles customer support, qualifies leads, and drives sales 24/7 on your website, WhatsApp, and social channels.',
  },
  {
    title: 'Lead Generation',
    description: 'AI-powered systems that find, qualify, and nurture your ideal customers through automated outreach, smart funnels, and data-driven targeting.',
  },
  {
    title: 'Call Center',
    description: 'Intelligent voice AI that answers calls, schedules appointments, and handles customer inquiries — with the quality of a human agent.',
  },
  {
    title: 'Email Automation',
    description: 'Smart email sequences that adapt to user behavior, delivering the right message at the right time to maximize conversions.',
  },
];

export default function ServicesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="services" className="py-20 sm:py-32 bg-primary overflow-hidden">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12">
        {/* Giant Title + Image */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mb-20 sm:mb-28">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="lg:w-1/2"
          >
            <h2 className="text-[clamp(4rem,12vw,11rem)] font-bold leading-[0.9] text-accent">
              Services<span className="text-secondary">.</span>
            </h2>
          </motion.div>

          {/* Floating Image */}
          <motion.div
            className="lg:w-1/2 relative"
            style={{ y: imageY }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-[400px] mx-auto"
            >
              {/* Cross/Plus shaped clip */}
              <div className="relative w-full h-full" style={{
                clipPath: 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)'
              }}>
                <Image
                  src="/images/ai-generated/yoy9714_a_comprehensive_AI_automation_solution_showcase_diverse_c8dd25e1-08fb-4342-9c81-df38c4f5f9be.webp"
                  alt="AI automation solutions"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 400px"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-grey/10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-primary p-8 sm:p-12 group"
            >
              <span className="text-grey/40 text-sm font-mono mb-4 block">
                0{i + 1}
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-secondary mb-4 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-grey text-base leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
