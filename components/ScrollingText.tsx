'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const text = 'We create custom AI chatbots for ecommerce and banking, enhance lead generation through marketing automation, and deliver intelligent call center solutions for seamless customer service.';
const words = text.split(' ');

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

export default function ScrollingText() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <section ref={sectionRef} className="py-24 sm:py-40 bg-primary">
      <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-12">
        <p className="font-satoshi text-[clamp(1.75rem,5.5vw,6.69rem)] font-medium leading-[1.1] text-secondary">
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
