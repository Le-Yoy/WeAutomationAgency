'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

const row1Images = [
  '/images/portfolio/Website AAA1.webp',
  '/images/portfolio/Website AAA2.webp',
  '/images/portfolio/Website AAA3.webp',
  '/images/portfolio/Website AAA4.webp',
  '/images/portfolio/Website AAA5.webp',
  '/images/portfolio/Website AAA6.webp',
];

const row2Images = [
  '/images/portfolio/Website AAA7.webp',
  '/images/portfolio/Website AAA8.webp',
  '/images/portfolio/Website AAA9.webp',
  '/images/portfolio/Website AAA10.webp',
  '/images/portfolio/Website AAA12.webp',
  '/images/portfolio/Website AAA1.webp',
];

export default function ImageSlides({ onOpenModal }: { onOpenModal?: () => void }) {
  return (
    <section className="py-20 sm:py-32 bg-secondary overflow-hidden">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12 mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-primary max-w-3xl mx-auto mb-6"
          >
            We create the website your business{' '}
            <span className="text-accent">deserves</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-dark-grey text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            From concept to launch, we build stunning, high-performance websites
            that convert visitors into customers. Take a look at our recent work.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenModal}
              className="group flex items-center gap-3 bg-accent hover:bg-darker-orange text-secondary px-6 py-3 rounded-pill transition-colors duration-200"
            >
              <span className="text-sm sm:text-base font-medium">Get Demo</span>
              <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center overflow-hidden relative">
                <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0 text-sm">&rarr;</span>
                <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-sm">&rarr;</span>
              </span>
            </button>
            <a
              href="#contact"
              className="group flex items-center gap-3 border border-primary/20 text-primary px-6 py-3 rounded-pill hover:border-primary transition-colors duration-200"
            >
              <span className="text-sm sm:text-base font-light">Hire Us</span>
              <span className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center overflow-hidden relative">
                <span className="transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0 text-sm">&rarr;</span>
                <span className="absolute -translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-sm">&rarr;</span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Row 1 — Left */}
      <div className="mb-3 overflow-hidden">
        <div className="marquee-row">
          <div className="marquee-track">
            {[...row1Images, ...row1Images].map((img, i) => (
              <div key={`r1-${i}`} className="marquee-item">
                <Image
                  src={img}
                  alt="Portfolio website"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 250px, 350px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Row 2 — Right */}
      <div className="overflow-hidden">
        <div className="marquee-row">
          <div className="marquee-track marquee-reverse">
            {[...row2Images, ...row2Images].map((img, i) => (
              <div key={`r2-${i}`} className="marquee-item">
                <Image
                  src={img}
                  alt="Portfolio website"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 250px, 350px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-row {
          width: 100%;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          gap: 0.75rem;
          animation: marqueeScroll 50s linear infinite;
          width: max-content;
        }
        .marquee-reverse {
          animation-direction: reverse;
        }
        .marquee-item {
          position: relative;
          width: 350px;
          height: 220px;
          flex-shrink: 0;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .marquee-item {
            width: 250px;
            height: 160px;
          }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
