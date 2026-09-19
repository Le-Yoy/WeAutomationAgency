'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/animations';
import { HOME } from '@/lib/content/home';
import type { SiteLocale } from '@/lib/i18n';

const icons = [
  (
    <svg key="chatbot" width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E9F6FF" />
      <path d="M16 20C16 17.79 17.79 16 20 16H28C30.21 16 32 17.79 32 20V26C32 28.21 30.21 30 28 30H22L18 34V30H20C17.79 30 16 28.21 16 26V20Z" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="23" r="1.5" fill="#6997B8" />
      <circle cx="26" cy="23" r="1.5" fill="#6997B8" />
    </svg>
  ),
  (
    <svg key="leads" width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E9F6FF" />
      <path d="M24 14L32 22L24 30L16 22L24 14Z" stroke="#6997B8" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 22V34" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 30L24 34L28 30" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="callcenter" width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E9F6FF" />
      <path d="M18 28C18 28 16 28 16 24C16 20 20 16 24 16C28 16 32 20 32 24C32 28 30 28 30 28" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 28V32C18 33.1 18.9 34 20 34H28C29.1 34 30 33.1 30 32V28" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" stroke="#6997B8" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="multimedia" width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#E9F6FF" />
      <rect x="14" y="18" width="20" height="14" rx="2" stroke="#6997B8" strokeWidth="2" />
      <path d="M22 22L28 25L22 28V22Z" fill="#6997B8" />
      <path d="M18 16H30" stroke="#6997B8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
];

function Card({ card, index, totalCards, scrollYProgress }: {
  card: { title: string; description: string; tags: string[]; icon: React.ReactNode };
  index: number;
  totalCards: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Each card owns 1/totalCards of scroll progress (0–0.25, 0.25–0.5, etc.)
  const segment = 1 / totalCards;
  const segStart = index * segment;
  const holdEnd = segStart + segment * 0.5;   // first 50% of segment = card is still
  const flyEnd = segStart + segment;           // last  50% of segment = card flies away

  // During hold phase: nothing moves. During fly phase: card exits.
  const x = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -500]);
  const yFly = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -300]);
  const rot = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd], [0, 0, -12]);
  const op = useTransform(scrollYProgress, [segStart, holdEnd, flyEnd - segment * 0.05, flyEnd], [1, 1, 0.6, 0]);

  // Stack: cards behind the active one sit slightly lower & rotated
  const stackY = useTransform(scrollYProgress, [0, segStart], [index * 6, 0]);
  const stackRot = useTransform(scrollYProgress, [0, segStart], [index * 1, 0]);

  // Determine which transforms to apply
  const isFirst = index === 0;

  return (
    <motion.div
      style={{
        x,
        y: isFirst ? yFly : stackY,
        rotate: isFirst ? rot : stackRot,
        opacity: op,
        zIndex: totalCards - index,
      }}
      className="absolute inset-0 bg-accent rounded-2xl p-5 sm:p-7 flex flex-col overflow-hidden"
    >
      <div className="mb-3 sm:mb-5 flex-shrink-0">{card.icon}</div>

      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-secondary mb-2 sm:mb-3 leading-snug flex-shrink-0">
        {card.title}
      </h3>

      <p className="text-secondary/80 text-xs sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-5 flex-shrink line-clamp-3 sm:line-clamp-none">
        {card.description}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs lg:text-sm bg-primary/80 text-secondary border border-secondary/20 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ScrollingCards({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = HOME[locale].build;
  const cards = t.cards.map((c, i) => ({ ...c, icon: icons[i] }));
  const sectionRef = useRef<HTMLElement>(null);

  // scrollYProgress goes 0→1 over the full section height.
  // offset: section top hits viewport top → section bottom hits viewport bottom.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Total section height:
  // Reduced for mobile UX - users should scroll less to see cards fly.
  // 1.25 screens per card = faster progression.
  const totalScreens = cards.length + 1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary"
      style={{ height: `${totalScreens * 100}vh` }}
    >
      {/* Sticky viewport: pins everything while user scrolls through the long section */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-wide mx-auto w-full px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Left — Text (always visible) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-[45%] text-center lg:text-left"
            >
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
                {t.eyebrow}
              </span>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-secondary mb-4 lg:mb-6">
                {t.line1}<br />{t.line2}
              </h2>
              <p className="text-grey text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                {t.description}
              </p>
            </motion.div>

            {/* Right — Card Stack */}
            <div className="w-full lg:w-[55%] relative h-[340px] sm:h-[380px] lg:h-[420px]">
              {cards.map((card, i) => (
                <Card
                  key={i}
                  card={card}
                  index={i}
                  totalCards={cards.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
