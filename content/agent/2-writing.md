# 2 — Writing: how a post looks and sounds

Golden rules: **first-person founder voice (Houssam) · AI-drafted → human-finished · native EN/FR/ES (never literal translation) · never label content as AI · never invent stats.** Real experiences come only from `content/real-experiences.md` (respect its "limits" column).

## Where things live
- Posts: `content/posts/{en,fr,es}/<slug>.mdx`, **same slug in all 3 languages** (drives hreflang).
- Hero images: `public/images/blog/<slug>.webp`
- The engine generates routes, hreflang, canonical, sitemap, JSON-LD, TOC, responsive images, llms.txt. Never touch those.

## Frontmatter (fill every field)
```yaml
---
title: "..."              # H1; may be long
seoTitle: "..."           # ≤60 chars <title>: market keyword first, benefit/answer, makes you click
description: "..."        # 140–155 chars: market keyword + concrete reason to click
excerpt: "..."            # 1 sentence for the blog index card
date: "YYYY-MM-DD"
dateLabel: "Month D, YYYY"   # localized ("10 septembre 2026", "10 de septiembre de 2026")
category: "AI Chatbots"      # localized label
author: "Houssam Boutaleb"
authorRole: "Founder & CEO, WeAutomationAgency"   # localized
keywords: ["market keyword", "secondary", "..."]  # per locale: that market's terms (see 1-keywords)
type: guide|howto|comparison|opinion
toc: true|false             # true for guide & comparison
heroImage: "/images/blog/<slug>.webp"    # optional
heroAlt: "descriptive alt with keyword"  # required if heroImage
heroCredit: "Photo by <Name> on Unsplash"
heroCreditUrl: "https://unsplash.com/@<user>"
---
```
`updated` + `updatedLabel` only after a real content change (see `3-refresh.md`).

## The 4 archetypes (rotate; don't publish two of the same back-to-back if another fits)
| Archetype | `type` | `toc` | Best for | Signature modules | Copy shape |
|---|---|---|---|---|---|
| Guide / Pillar | guide | true | broad topics | TOC, KeyTakeaways, links down to clusters | overview → subtopics → start here |
| How-to | howto | false | "how to build/do X" | numbered steps, Callout for pitfalls | one action per step |
| Comparison | comparison | true | "X vs Y", best tools, pricing | comparison table, verdict | criteria → table → which to pick |
| Opinion / News | opinion | false | timely takes, myth-busting | short-answer box, Callout for the contrarian point | hook → claim → nuance → what to do |
Match the archetype to what ranks in the top 10 for the keyword (intent match).

## Voice & copy
- First person, confident, plain, specific ("A client asked me last week…"). Short sentences, grade 7–9, one idea per paragraph, bold the key line.
- **Intro variants (rotate, never the previous post's):** client story · direct answer · myth/contrarian · cost/stakes · the exact question answered in 2 lines.
- Prefer concrete nouns, "you", active voice, numbers, names, timeframes.
- Avoid: "unlock", "leverage", "in today's fast-paced world", "game-changer", "seamless", "delve", em-dash stuffing, AI throat-clearing.

## AEO / AI Overview / ChatGPT (be the cited answer)
- A **short-answer `> blockquote`** right under the H1 (2–4 sentences, the direct answer with the key number).
- **H2s = the exact questions people type** (use GSC queries and the market keyword), each answered in its first 1–2 sentences.
- Sourced facts with in-text links to primary sources (official docs, studies); dates on time-sensitive facts.
- Our own data/experience = originality (the strongest signal; e.g. our pipeline numbers).
- Tables for comparisons/prices (easy to extract). FAQ-style H2s for common follow-ups.
- Consistent entity info (name, founder, services) as on the site and profiles.

## Images & blocks
At least one visual: a table, `<Callout>…</Callout>`, or `<KeyTakeaways title="…">` (localized title). Optional Unsplash hero: relevant photo, Regular size → `magick input.jpg -resize 1200x675^ -gravity center -extent 1200x675 -quality 82 public/images/blog/<slug>.webp`, with heroAlt + credit (attribution required). No raw `<img>`.

## Variation (so posts feel bespoke)
Fresh per post, never the previous post's choice: archetype · intro variant · structure · hero subject · which block opens a section. Brand constant, recipe varies.

## Localization
Write EN first, then **rewrite** FR (professional "vous") and ES (direct "tú", neutral for Spain + LatAm). Each locale uses **its market's keyword** in seoTitle, description, short answer and the first H2. Localize title/description/excerpt/dateLabel/category/authorRole/heroAlt/heroCredit and the "Keep reading / À lire ensuite / Sigue leyendo" heading. Country-specific facts: FR → CNIL/France; ES → Spain AND Mexico. Never add an "AI-translated" notice.

## Every post must have
- ≥2 links to other posts + 1 to the matching service page + /start (locale-correct paths), see `4-links.md`.
- 1–3 authoritative external sources, no competitor links.
- A clear CTA to /start in the founder's voice.
