import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

/**
 * Light-theme MDX renderer for blog articles.
 * The first blockquote in a post doubles as the "short answer" callout box.
 */
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-3xl font-bold text-neutral-900 mt-8 mb-4" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-12 mb-4 scroll-mt-28"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-3" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-neutral-700 leading-relaxed mb-6 text-[1.05rem]" {...props} />
  ),
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (href.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-accent font-medium underline underline-offset-2 hover:text-darker-orange"
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent font-medium underline underline-offset-2 hover:text-darker-orange"
        {...props}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-neutral-700 text-[1.05rem]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-neutral-700 text-[1.05rem]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="leading-relaxed pl-1" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-neutral-900" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="italic" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="bg-neutral-50 border-l-4 border-accent rounded-r-xl p-6 my-8 text-neutral-800 [&>p]:mb-0 [&>p]:text-[1.05rem]"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-neutral-200" />,
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="bg-neutral-100 text-neutral-800 rounded px-1.5 py-0.5 text-[0.9em] font-mono"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="bg-neutral-900 text-neutral-100 rounded-xl p-5 my-6 overflow-x-auto text-sm"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border-b-2 border-neutral-300 py-2 px-3 font-semibold text-neutral-900"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border-b border-neutral-200 py-2 px-3 text-neutral-700 align-top" {...props} />
  ),
};
