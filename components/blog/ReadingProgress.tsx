'use client';

import { useEffect, useState } from 'react';

/** Thin accent bar fixed to the top that fills as the reader scrolls the page. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (scrollTop / height) * 100) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-200/60" aria-hidden="true">
      <div
        className="h-full bg-accent"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
