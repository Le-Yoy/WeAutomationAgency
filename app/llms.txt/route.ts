import { LOCALES, LOCALE_LABELS, getAllPosts, postUrl, BASE_URL } from '@/lib/blog';

// /llms.txt: a plain-language map of the site for AI assistants (llmstxt.org).
// Generated from the blog content at build time, so new posts appear automatically.
export const dynamic = 'force-static';

const SERVICES = [
  ['AI Search Visibility (GEO/AEO)', '/services/ai-search-visibility', 'Get a business cited in ChatGPT, Perplexity and Google AI Overviews: audit, setup, monitoring. Free AI visibility audit.'],
  ['AI Chatbots', '/services/ai-chatbot', 'Custom AI chatbots for support, lead qualification and sales, multilingual and WhatsApp-ready.'],
  ['Automated Lead Generation', '/services/lead-generation', 'Find, qualify and nurture ideal customers automatically.'],
  ['AI Call Center', '/services/call-center', 'Voice AI that answers calls, books appointments and handles requests 24/7.'],
  ['Email Automation', '/services/email-automation', 'Behavioral email sequences with personalization and A/B testing.'],
] as const;

export function GET() {
  const lines: string[] = [
    '# WeAutomationAgency',
    '',
    '> AI automation agency founded by Houssam Boutaleb. We help businesses get found on Google and recommended by AI assistants (GEO/AEO), and build AI chatbots, lead generation, voice and email automations. Site in English, French and Spanish. Contact: support@weautomationagency.com',
    '',
    '## Services',
    ...SERVICES.map(([name, path, desc]) => `- [${name}](${BASE_URL}${path}): ${desc} (also in French: ${BASE_URL}/fr${path}, Spanish: ${BASE_URL}/es${path})`),
    `- [Agence d'automatisation IA (French)](${BASE_URL}/fr/agence-automatisation-ia): what we automate for businesses in French-speaking markets, how a project runs, FAQ.`,
    '',
  ];
  for (const locale of LOCALES) {
    const posts = getAllPosts(locale);
    if (!posts.length) continue;
    lines.push(`## Blog (${LOCALE_LABELS[locale]})`);
    for (const p of posts) lines.push(`- [${p.title}](${postUrl(locale, p.slug)}): ${p.description}`);
    lines.push('');
  }
  lines.push('## Company', `- [Home](${BASE_URL}/)`, `- [Portfolio](${BASE_URL}/portfolio)`, `- [Free AI visibility audit](${BASE_URL}/services/ai-search-visibility)`, '');
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
