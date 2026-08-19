import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog — AI, Automation & SEO Insights | WeAutomationAgency',
  description:
    'Straight-talking insights on AI, automation, and SEO for business owners. No hype — just what actually moves the needle.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — AI, Automation & SEO Insights | WeAutomationAgency',
    description:
      'Straight-talking insights on AI, automation, and SEO for business owners.',
    url: 'https://weautomationagency.com/blog',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

// Newest first. Add new posts to the top of this array.
const posts = [
  {
    slug: 'claude-ai-watermark-google-rankings',
    category: 'AI & SEO',
    title:
      'Claude Now Watermarks Everything It Writes — Does It Actually Hurt Your Google Rankings?',
    excerpt:
      'Claude and most AI tools now add an invisible watermark to the text they generate. Here is the honest breakdown of whether it hurts your rankings — and the one change that makes it a non-issue.',
    date: '2026-08-20',
    dateLabel: 'August 20, 2026',
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-primary text-secondary">
      {/* Header */}
      <section className="relative pt-32 pb-16 px-5 sm:px-8 lg:px-12 border-b border-grey/10">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-accent hover:text-darker-orange transition-colors text-sm mb-8"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-tight mb-6">
            Insights<span className="text-accent">.</span>
          </h1>
          <p className="text-grey text-lg sm:text-xl leading-relaxed max-w-2xl">
            Straight talk on AI, automation, and SEO for business owners. No hype — just what
            actually moves the needle.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-darker-grey/50 border border-grey/10 rounded-2xl p-6 sm:p-8 lg:p-10 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3 text-sm text-grey/70 mb-4">
                <span className="text-accent font-medium">{post.category}</span>
                <span className="text-grey/40">·</span>
                <time dateTime={post.date}>{post.dateLabel}</time>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-grey leading-relaxed mb-6">{post.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm">
                Read article
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
