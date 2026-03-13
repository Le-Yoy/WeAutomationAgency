'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const headlines = [
  { text: 'Automation Solutions', color: '#F94239' },
  { text: 'Leads Generation', color: '#3b35ac' },
  { text: 'Chat Bot', color: '#da0f85' },
  { text: 'Call Center', color: '#856075' },
];

const leftImages = [
  '/images/services/AI automation agency.webp',
  '/images/services/AI call center image.webp',
  '/images/services/AI chatbos image.webp',
];

const rightImages = [
  '/images/hero/Digital CreationWAA.webp',
  '/images/hero/Smart MarketingWAA.webp',
  '/images/hero/Seo ExpertWAA.webp',
];

export default function Hero({ onOpenModal }: { onOpenModal?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-primary"
    >
      <div className="max-w-wide mx-auto w-full px-5 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Column — Text Content */}
          <div className="w-full lg:w-[55%] relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Heading */}
              <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-wide mb-6">
                Transform Your
                <br />
                Business with AI
              </h1>

              {/* Rotating subtitle */}
              <div className="h-[clamp(2.5rem,6vw,4.25rem)] mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    style={{ color: headlines[currentIndex].color }}
                    className="block text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-wide"
                  >
                    {headlines[currentIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-grey text-base sm:text-lg leading-relaxed max-w-xl mb-10"
              >
                At We Automation Agency, we empower businesses of all sizes
                with innovative AI automation services that drive efficiency
                and growth. Discover how our intelligent automation solutions
                can streamline your operations, enhance customer engagement,
                and unlock new levels of productivity.
              </motion.p>

              {/* CTA Button — Original dual-arrow style */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={onOpenModal}
                className="group flex items-center gap-4 text-secondary"
              >
                <span className="text-lg sm:text-xl font-light tracking-wide capitalize">
                  get demo
                </span>
                <span className="w-12 h-12 rounded-full border border-secondary/40 flex items-center justify-center overflow-hidden relative hover:border-accent hover:bg-accent transition-all duration-300">
                  <span className="transition-transform duration-300 group-hover:translate-x-10 group-hover:opacity-0 text-lg">
                    &rarr;
                  </span>
                  <span className="absolute -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-lg">
                    &rarr;
                  </span>
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column — Auto-Scrolling Images */}
          <div className="w-full lg:w-[45%] h-[480px] sm:h-[600px] lg:h-[720px] relative overflow-hidden rounded-2xl">
            <div className="flex gap-3 h-full">
              {/* Left image column — scrolls down */}
              <div className="w-1/2 overflow-hidden rounded-xl">
                <div className="animate-scroll-down flex flex-col gap-3">
                  {[...leftImages, ...leftImages].map((img, i) => (
                    <div key={`l-${i}`} className="relative h-[250px] sm:h-[300px] flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt="AI automation service"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 40vw, 20vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right image column — scrolls up */}
              <div className="w-1/2 overflow-hidden rounded-xl">
                <div className="animate-scroll-up flex flex-col gap-3">
                  {[...rightImages, ...rightImages].map((img, i) => (
                    <div key={`r-${i}`} className="relative h-[250px] sm:h-[300px] flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt="Digital marketing service"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 40vw, 20vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll-down {
          animation: scrollDown 20s linear infinite;
        }
        .animate-scroll-up {
          animation: scrollUp 20s linear infinite;
        }
        @keyframes scrollDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollUp {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
