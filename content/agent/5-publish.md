# 5 — Check & publish

## Technical SEO checklist (every new/changed page)
- [ ] **seoTitle** ≤60 chars, market keyword first, benefit or answer, clickable. Brand suffix only if it fits.
- [ ] **description** 140–155 chars (hard max 160), keyword + concrete reason to click.
- [ ] **slug** short, English, hyphenated, identical in 3 locales.
- [ ] One H1 (auto). H2s = real questions with secondary keywords.
- [ ] Market keyword in seoTitle, description, first 100 words, one H2. No stuffing.
- [ ] Short-answer blockquote under the H1.
- [ ] Links: ≥2 posts + service page + /start, locale-correct, no competitor links; 1–3 authoritative external sources.
- [ ] Dates: `date` = publish; `updated` only after a real change.
- [ ] Alts descriptive; author/date set (JSON-LD is automatic).
- [ ] Speed/responsive untouched: no fixed widths, no heavy scripts, hero is the only above-the-fold image (LCP <2.5s, INP <200ms, CLS <0.1).

## Pre-publish gate (8 questions; ship only if all "yes"; write the answers in the commit message)
1. **Design & structure:** right archetype, short-answer box, question H2s, at least one table/KeyTakeaways/Callout, rotation respected?
2. **Words:** sounds like Houssam to one reader, simple, specific, a real example, no AI-tell words? Would a human expert sign it?
3. **Title:** market keyword in the first words, ≤60, says the benefit/answer, you'd click it among 10 results?
4. **Description:** 140–155 chars, keyword + concrete reason (number, year, "honest", "real example")?
5. **Hook:** first 2 lines answer the query or give a reason to keep reading in under 25 words?
6. **Facts:** every number sourced or from our own work; metadata fact-checked too?
7. **Links:** ≥2 posts + 1 service page + /start, locale-correct, no competitor?
8. **Metrics:** which query/market it targets (with score + verdict), expected impressions, which page it supports, no cannibalization?

## Benchmarks (target ≈ 1.4× market, checked per page in GSC / the dashboard)
| Position | Market CTR | Our target |
|---|---|---|
| 1 | ~28–40% | 40%+ |
| 2 | ~15–19% | 22%+ |
| 3 | ~10% | 14%+ |
| 4–5 | ~5–7% | 8%+ |
| 6–10 | ~1.6–4.4% | 1.4× the row |
AI Overviews pull these down (Ahrefs, Feb 2026: −58% for top pages). Sources: First Page Sage / OuterBox CTR table 2026.

## Build, deploy, index
1. `npm run build` — must pass.
2. `npm run seo:check` — must print "✅ all pages pass" (titles, descriptions, one H1, canonical, duplicates, broken internal links). Fix everything.
3. Commit with a clear message (gate answers) ending with `Co-Authored-By: Claude <noreply@anthropic.com>`.
4. Push to **main** (Vercel deploys). If refused: push your branch, open a PR to main "Weekly content YYYY-MM-DD", put the PR link at the top of the report (Houssam says "merge it" in chat).
5. Wait ~3 min, check every new URL returns 200 (EN, FR, ES).
6. `npm run indexnow` (Bing/IndexNow, all sitemap URLs).
7. sitemap.xml and llms.txt list posts automatically (lastmod = `updated` or `date`): nothing to edit; just confirm the new URLs are in sitemap.xml.
8. Google indexing requests are done by Houssam from the report's URL list (new URLs first; Google allows ~10 per day).
