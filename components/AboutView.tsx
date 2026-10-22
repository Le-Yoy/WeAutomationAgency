import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ABOUT } from '@/lib/content/about';
import { localizedPath, type SiteLocale } from '@/lib/i18n';

// Founder photo: drop the file at public/images/about/houssam-boutaleb.webp and it shows up.
const PHOTO = '/images/about/houssam-boutaleb.webp';
const hasPhoto = existsSync(join(process.cwd(), 'public', PHOTO));

const BASE_URL = 'https://weautomationagency.com';

export default function AboutView({ locale = 'en' }: { locale?: SiteLocale }) {
  const t = ABOUT[locale];
  const url = `${BASE_URL}${localizedPath(locale, '/about')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#about`,
        url,
        name: t.metaTitle,
        description: t.metaDescription,
        inLanguage: locale,
        mainEntity: { '@id': `${BASE_URL}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#founder`,
        name: t.founderName,
        jobTitle: t.founderRole,
        worksFor: { '@id': `${BASE_URL}/#organization` },
        sameAs: [t.founderLinkedin],
        ...(hasPhoto ? { image: `${BASE_URL}${PHOTO}` } : {}),
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative px-5 sm:px-8 lg:px-12 pt-32 pb-16">
        <div className="absolute top-24 right-5 sm:right-8 lg:right-12 z-20"><LanguageSwitcher theme="light" /></div>
        <div className="max-w-3xl mx-auto">
          <Link href={localizedPath(locale, '/')} className="text-accent text-sm hover:text-darker-orange">← WeAutomationAgency</Link>
          <p className="text-accent text-sm font-semibold uppercase tracking-wide mt-8 mb-4">{t.eyebrow}</p>
          <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-tight mb-8">{t.h1}</h1>
          <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed border-l-4 border-accent pl-5">
            {t.answer.split(t.founderName).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <a href={t.founderLinkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{t.founderName}</a>
                )}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-5 sm:px-8 lg:px-12 py-12 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {t.stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl sm:text-5xl font-bold text-accent">{s.value}</div>
              <div className="mt-2 text-sm text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story + founder */}
      <section className="px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{t.storyTitle}</h2>
          <div className="space-y-5 text-lg text-neutral-700 leading-relaxed">
            {t.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-10 flex items-center gap-4">
            {hasPhoto ? (
              <Image src={PHOTO} alt={t.founderName} width={72} height={72} className="rounded-full object-cover" />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold">HB</div>
            )}
            <div>
              <a href={t.founderLinkedin} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-accent hover:underline">
                {t.founderName}
              </a>
              <div className="text-sm text-neutral-500">{t.founderRole}, WeAutomationAgency</div>
            </div>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section className="px-5 sm:px-8 lg:px-12 py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">{t.builtTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.built.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h3 className="text-xl font-semibold mb-3">{b.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{b.text}</p>
                {b.link && (
                  <Link href={b.link.href === '/portfolio' ? b.link.href : localizedPath(locale, b.link.href)} className="inline-block mt-4 text-accent font-medium hover:underline">
                    {b.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="px-5 sm:px-8 lg:px-12 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">{t.howTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.how.map((h) => (
              <div key={h.title}>
                <h3 className="text-lg font-semibold mb-2">{h.title}</h3>
                <p className="text-neutral-700 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where + FAQ */}
      <section className="px-5 sm:px-8 lg:px-12 py-16 bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t.whereTitle}</h2>
          <p className="text-lg text-neutral-700 leading-relaxed mb-14">{t.where}</p>
          <h2 className="text-3xl font-bold mb-8">{t.faqTitle}</h2>
          <div className="space-y-6">
            {t.faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-lg font-semibold mb-1">{f.q}</h3>
                <p className="text-neutral-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 lg:px-12 py-20">
        <div className="max-w-3xl mx-auto bg-neutral-900 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{t.ctaTitle}</h2>
          <p className="text-neutral-300 mb-8">{t.ctaText}</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors">
            {t.cta}
          </Link>
        </div>
      </section>

      <Footer locale={locale} />
    </main>
  );
}
