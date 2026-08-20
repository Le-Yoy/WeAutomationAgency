import Link from 'next/link';
import Footer from '@/components/Footer';
import { type Locale, type PostMeta, postPath } from '@/lib/blog';

const UI: Record<
  Locale,
  { title: string; subtitle: string; back: string; read: string; empty: string }
> = {
  en: {
    title: 'Insights',
    subtitle:
      'Straight talk on AI, automation, and SEO for business owners. No hype — just what actually moves the needle.',
    back: 'Back to Home',
    read: 'Read article',
    empty: 'No articles yet — check back soon.',
  },
  fr: {
    title: 'Analyses',
    subtitle:
      "Des analyses franches sur l'IA, l'automatisation et le SEO pour les dirigeants. Sans hype — juste ce qui fait vraiment la différence.",
    back: "Retour à l'accueil",
    read: "Lire l'article",
    empty: 'Aucun article pour le moment — revenez bientôt.',
  },
  es: {
    title: 'Ideas',
    subtitle:
      'Ideas claras sobre IA, automatización y SEO para dueños de negocios. Sin humo — solo lo que de verdad marca la diferencia.',
    back: 'Volver al inicio',
    read: 'Leer artículo',
    empty: 'Aún no hay artículos — vuelve pronto.',
  },
};

export default function BlogIndex({
  locale,
  posts,
}: {
  locale: Locale;
  posts: PostMeta[];
}) {
  const t = UI[locale];
  const homeHref = locale === 'en' ? '/' : `/${locale}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <section className="px-5 sm:px-8 pt-28 pb-14 border-b border-neutral-200">
        <div className="max-w-3xl mx-auto">
          <Link
            href={homeHref}
            className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm font-medium mb-8"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.back}
          </Link>
          <h1 className="text-[clamp(2.25rem,5.5vw,3.5rem)] font-bold leading-tight mb-5">
            {t.title}
            <span className="text-accent">.</span>
          </h1>
          <p className="text-neutral-600 text-lg leading-relaxed max-w-2xl">{t.subtitle}</p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-5 sm:px-8 py-14">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.length === 0 && <p className="text-neutral-500">{t.empty}</p>}
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={postPath(locale, post.slug)}
              className="group block bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 hover:border-accent/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                <span className="text-accent font-semibold uppercase tracking-wide text-xs">
                  {post.category}
                </span>
                <span className="text-neutral-300">·</span>
                <time dateTime={post.date}>{post.dateLabel}</time>
              </div>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-5">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm">
                {t.read}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
