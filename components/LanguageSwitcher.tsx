'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SITE_LOCALES,
  SITE_LOCALE_LABEL,
  localizedPath,
  splitLocale,
} from '@/lib/i18n';

export default function LanguageSwitcher({
  theme = 'light',
}: {
  theme?: 'light' | 'dark';
}) {
  const pathname = usePathname() || '/';
  const { locale: current, basePath } = splitLocale(pathname);

  const muted = theme === 'dark' ? 'text-grey hover:text-secondary' : 'text-neutral-400 hover:text-neutral-900';
  const active = theme === 'dark' ? 'text-secondary' : 'text-neutral-900';

  return (
    <div className="inline-flex items-center gap-1 text-xs font-medium" aria-label="Language">
      {SITE_LOCALES.map((loc, i) => (
        <span key={loc} className="inline-flex items-center">
          {i > 0 && <span className={theme === 'dark' ? 'text-grey/40 mx-1' : 'text-neutral-300 mx-1'}>·</span>}
          <Link
            href={localizedPath(loc, basePath)}
            aria-current={loc === current ? 'true' : undefined}
            className={loc === current ? `${active} font-semibold` : muted}
          >
            {SITE_LOCALE_LABEL[loc]}
          </Link>
        </span>
      ))}
    </div>
  );
}
