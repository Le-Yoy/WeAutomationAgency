'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HOME } from '@/lib/content/home';
import type { SiteLocale } from '@/lib/i18n';

function Word({ word, index, total, scrollYProgress }: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

export default function ScrollingText({ locale = 'en' }: { locale?: SiteLocale }) {
  const words = HOME[locale].scrollingText.split(' ');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <section ref={sectionRef} className="min-h-[80dvh] sm:min-h-0 flex items-center py-24 sm:py-40 bg-primary">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12">
        <p className="font-satoshi text-[clamp(2.5rem,8vw,4.7rem)] font-semibold sm:font-medium leading-[1.1] text-secondary text-justify">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
