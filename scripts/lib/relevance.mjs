// Shared by internal-links.mjs and link-slots.mjs: how related two blog posts are (EN text).
// relevance(A,B) = 0.55 * TF-IDF cosine + 0.30 * keyword overlap + 0.15 * same category
import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';

const STOP = new Set('the a an and or of to in on for with is are be it this that you your we our as at by from can how what why when which will not do does more than into about their they them its was were has have had but if so all also just like get use using one two any most such each other only over very new may'.split(' '));
export const tokens = (s) => s.toLowerCase().replace(/[`*_>#|\[\]()]/g, ' ').match(/[a-z0-9][a-z0-9-]{2,}/g)?.filter((t) => !STOP.has(t)) || [];

export function loadPosts(locale) {
  const dir = `content/posts/${locale}`;
  return readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => {
    const { data, content } = matter(readFileSync(`${dir}/${f}`, 'utf8'));
    return { slug: f.replace(/\.mdx$/, ''), locale, data, title: data.title, keywords: data.keywords || [], category: data.category, content };
  });
}

// Returns { score(slugA, slugB) } computed on the given (EN) posts.
export function relevance(posts) {
  const N = posts.length;
  const docs = posts.map((p) => tokens(`${p.title} ${p.keywords.join(' ')} `.repeat(3) + p.content));
  const df = new Map();
  docs.forEach((d) => new Set(d).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
  const vectors = docs.map((d) => {
    const tf = new Map();
    d.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    const v = new Map();
    let norm = 0;
    tf.forEach((n, t) => { const w = (n / d.length) * Math.log(1 + N / df.get(t)); v.set(t, w); norm += w * w; });
    norm = Math.sqrt(norm) || 1;
    v.forEach((w, t) => v.set(t, w / norm));
    return v;
  });
  const cosine = (a, b) => { let s = 0; for (const [t, w] of a) if (b.has(t)) s += w * b.get(t); return s; };
  const kw = posts.map((p) => new Set(p.keywords.flatMap((k) => tokens(k))));
  const jaccard = (a, b) => { const i = [...a].filter((x) => b.has(x)).length; return i / (new Set([...a, ...b]).size || 1); };
  const idx = new Map(posts.map((p, i) => [p.slug, i]));
  const cache = new Map();
  return (a, b) => {
    const i = idx.get(a), j = idx.get(b);
    if (i === undefined || j === undefined || i === j) return 0;
    const key = i < j ? `${i}:${j}` : `${j}:${i}`;
    if (!cache.has(key)) {
      const s = 0.55 * cosine(vectors[i], vectors[j]) + 0.3 * jaccard(kw[i], kw[j]) + 0.15 * (posts[i].category === posts[j].category ? 1 : 0);
      cache.set(key, Math.round(s * 100) / 100);
    }
    return cache.get(key);
  };
}
