import Link from 'next/link';
import Footer from '@/components/Footer';
import {
  type Locale,
  type PostMeta,
  LOCALE_LABELS,
  postPath,
  blogIndexPath,
} from '@/lib/blog';

const UI: Record<
  Locale,
  {
    back: string;
    langLabel: string;
    auditH: string;
    auditP: string;
    auditCta: string;
  }
> = {
  en: {
    back: 'Back to Blog',
    langLabel: 'Read in',
    auditH: 'Not sure if your content is helping or hurting you?',
    auditP: "Get a free content & SEO audit. We'll tell you exactly where you stand — no jargon, no fear-mongering.",
    auditCta: 'Get my free audit',
  },
  fr: {
    back: 'Retour au blog',
    langLabel: 'Lire en',
    auditH: 'Vous ne savez pas si votre contenu vous aide ou vous dessert ?',
    auditP: 'Obtenez un audit de contenu et SEO gratuit. Nous vous dirons exactement où vous en êtes — sans jargon, sans alarmisme.',
    auditCta: 'Obtenir mon audit gratuit',
  },
  es: {
    back: 'Volver al blog',
    langLabel: 'Leer en',
    auditH: '¿No sabes si tu contenido te ayuda o te perjudica?',
    auditP: 'Consigue una auditoría de contenido y SEO gratuita. Te diremos exactamente en qué punto estás — sin tecnicismos ni alarmismo.',
    auditCta: 'Consigue mi auditoría gratis',
  },
};

export default function BlogArticle({
  meta,
  availableLocales,
  children,
}: {
  meta: PostMeta;
  availableLocales: Locale[];
  children: React.ReactNode;
}) {
  const t = UI[meta.locale];
  const initials = meta.author
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <article className="px-5 sm:px-8">
        {/* Top bar */}
        <div className="max-w-2xl mx-auto pt-28 pb-6 flex items-center justify-between gap-4">
          <Link
            href={blogIndexPath(meta.locale)}
            className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>

          {availableLocales.length > 1 && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-400 mr-1">{t.langLabel}:</span>
              {availableLocales.map((l) => (
                <Link
                  key={l}
                  href={postPath(l, meta.slug)}
                  className={
                    l === meta.locale
                      ? 'px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold'
                      : 'px-2 py-0.5 rounded-full text-neutral-500 hover:bg-neutral-100'
                  }
                >
                  {LOCALE_LABELS[l]}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Header */}
        <header className="max-w-2xl mx-auto mb-10">
          <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wide">
            {meta.category}
          </p>
          <h1 className="text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight text-neutral-900 mb-6">
            {meta.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold">
              {initials}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-neutral-900">{meta.author}</div>
              <div className="text-neutral-500">
                {meta.authorRole}
                {meta.authorRole ? ' · ' : ''}
                <time dateTime={meta.date}>{meta.dateLabel}</time>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-2xl mx-auto">{children}</div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto my-16">
          <div className="bg-neutral-900 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{t.auditH}</h2>
            <p className="text-neutral-300 mb-8 max-w-xl mx-auto">{t.auditP}</p>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 bg-accent hover:bg-darker-orange text-white font-medium px-8 py-4 rounded-pill transition-colors"
            >
              {t.auditCta}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
