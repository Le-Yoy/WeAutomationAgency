# 📖 The Blog Production Bible — WeAutomationAgency

**Read this before writing ANY blog post.** It is the exact, repeatable system for producing an on-brand, fast, SEO-strong blog post for weautomationagency.com. The blog engine already enforces design, speed, hreflang, and SEO — your job is to fill content correctly and pick the right *variant* each time so posts feel bespoke, not cloned.

> Golden rules: **first-person founder voice (Houssam) · AI-drafted → human-finished · native EN/FR/ES (never literal translation) · never label content as AI · never invent stats.**
> (See also the strategy in the agency workspace `content/PLAYBOOK.md`.)

---

## 0. Where things live
- Posts: `content/posts/{en,fr,es}/<slug>.mdx` — **same slug across all 3 languages** (drives hreflang).
- Hero images: `public/images/blog/<slug>.webp`
- The engine auto-generates: routes, hreflang, canonical, sitemap, JSON-LD, TOC, responsive images. You never touch those.

---

## 1. Frontmatter schema (copy-paste, fill every field)
```yaml
---
title: "..."              # ≤60 chars ideal, contains primary keyword, front-loaded
description: "..."        # 140–160 chars, primary keyword, a reason to click
excerpt: "..."            # 1 sentence for the blog index card
date: "YYYY-MM-DD"
dateLabel: "Month D, YYYY"   # localized per language (e.g. "10 septembre 2026")
category: "AI Chatbots"      # localized label
author: "Houssam Boutaleb"
authorRole: "Founder & CEO, WeAutomationAgency"   # localized
keywords: ["primary kw", "secondary kw", "..."]
type: guide|howto|comparison|opinion    # archetype — see §3
toc: true|false                          # true for guide & comparison
heroImage: "/images/blog/<slug>.webp"    # optional; see §5
heroAlt: "descriptive alt with keyword"  # required if heroImage
heroCredit: "Photo by <Name> on Unsplash"    # required if heroImage from Unsplash
heroCreditUrl: "https://unsplash.com/@<user>" # required if heroImage from Unsplash
---
```

---

## 2. Production flow (the checklist)
1. **Pick the keyword** (from `content/blog/cluster-*.md` or PLAYBOOK keyword map). Validate intent + that we can realistically rank.
2. **Pick the archetype** (§3) → sets `type`, `toc`, module choices, and copy structure.
3. **Pick an intro variant** (§4) — rotate; don't reuse last post's opener.
4. **Write EN** in founder voice, AEO-structured (short-answer first, H2s as questions, real sourced numbers).
5. **Add internal links** (§6) — up to pillar + 2–3 siblings, keyword anchor text.
6. **Add image(s)** (§5) — hero (optional) + at least one diagram/table/Callout/KeyTakeaways block.
7. **Localize** natively to FR + ES (§11).
8. **Technical SEO pass** (§7).
9. **Build + verify + deploy** (§10), then request indexing.

---

## 3. The 4 archetypes (rotate — pick by topic)
Each = a *recipe* of type + modules + copy shape. Don't make every post a "guide."

| Archetype | `type` | `toc` | Best for | Signature modules | Copy shape |
|-----------|--------|-------|----------|-------------------|------------|
| **Guide / Pillar** | `guide` | `true` | Broad topics ("AI chatbots for business") | TOC, hero, `KeyTakeaways`, links down to clusters | Inverted-pyramid: overview → each subtopic → start-here |
| **How-to** | `howto` | `false` | "How to build/do X" | Numbered steps, `Callout` for pitfalls | Step-by-step; one action per step |
| **Comparison** | `comparison` | `true` | "X vs Y", "best tools", pricing | Comparison **table**, TOC, verdict box | Criteria → table → "which to pick" |
| **Opinion / News** | `opinion` | `false` | Timely takes, myth-busting (watermark post) | Short-answer box, `Callout` for the contrarian point | Hook → claim → honest nuance → what to do |

**Rule:** in any cluster, don't publish two of the same archetype back-to-back if a different one fits.

---

## 4. Copy & voice
**Voice:** first-person founder ("A client asked me last week…"). Confident, plain, specific. No corporate filler.

**Readability:** short sentences. Target ~grade 7–9. Vary sentence length. One idea per paragraph (2–4 sentences). Bold the key line in dense sections.

**Intro variants — ROTATE (never reuse the previous post's):**
1. **Client-story:** "A client forwarded me a panicked message…"
2. **Direct-answer:** open with the short-answer box, then "Here's why."
3. **Myth/contrarian:** "Everyone says X. The data says otherwise."
4. **Cost/stakes:** "This one mistake quietly costs businesses…"
5. **Question:** the exact query the reader typed, answered in 2 lines.

**Structure variants — ROTATE:** Inverted-pyramid (guide) · PAS = Problem→Agitate→Solution (opinion) · Step-by-step (how-to) · Criteria→table→verdict (comparison).

**Always:** a **short-answer `> blockquote`** right under H1 (AEO). H2s phrased as real questions. Real, sourceable numbers only — **never fabricate a stat** (a fake "22% uplift" was caught in research; don't).

**Prefer:** concrete nouns, "you/your", active voice, specifics (numbers, names, timeframes).
**Avoid:** "unlock," "leverage," "in today's fast-paced world," "game-changer," "seamless," "delve," em-dash-stuffing, and any AI-tell throat-clearing.

---

## 5. Images
**Default = Unsplash hero + a custom diagram/table.** Every post needs at least one visual for skimmability (a table or `KeyTakeaways` counts).

**Unsplash hero — exact process:**
1. Search unsplash.com for a **topically relevant** photo (not generic laptops-on-desk unless truly fitting). Prefer images that match the post's subject.
2. Download the **Regular (~1080px wide)** size.
3. Convert + optimize to WebP, 1200×675 (16:9): `magick input.jpg -resize 1200x675^ -gravity center -extent 1200x675 -quality 82 public/images/blog/<slug>.webp`
4. Set frontmatter: `heroImage`, `heroAlt` (descriptive + keyword, not "image of…"), `heroCredit: "Photo by <Name> on Unsplash"`, `heroCreditUrl` (the photographer's profile). **Attribution is legally required** — always include it.
5. ⚠️ No identifiable people/logos in ad-like framing (no model release on free tier).

**Diagrams / data (no sourcing needed):** use a Markdown **table**, a `<Callout>…</Callout>` for a key point, or `<KeyTakeaways title="…">` (pass a localized title) with a bullet list. These are on-brand, fast, and always relevant.

**Technical spec (enforced by the engine, but respect it):** WebP/AVIF auto-served; `next/image` reserves space (no layout shift); hero is 16:9; alt text always present. Don't paste raw `<img>` — use the hero frontmatter or `next/image`.

---

## 6. Internal linking
- Every post links **up to its pillar** + **2–3 sibling posts**, using **keyword anchor text** (not "click here").
- The pillar links **down to every cluster post**.
- End every post with a **"Keep reading / À lire ensuite / Sigue leyendo"** list (3–4 links).
- **Locale-correct paths:** EN → `/blog/<slug>`, FR → `/fr/blog/<slug>`, ES → `/es/blog/<slug>`. Never cross-link languages in the body.
- Link to `/start` at least once (the money CTA).

---

## 7. Per-post technical SEO checklist
- [ ] **Title:** primary keyword front-loaded, ≤~60 chars, compelling.
- [ ] **Description:** 140–160 chars, keyword + click reason.
- [ ] **Slug:** short, hyphenated, keyword, English, **identical across all 3 languages**.
- [ ] **One H1** (the title — auto). H2s = real questions containing secondary keywords.
- [ ] **Primary keyword** in: title, description, first 100 words, one H2, naturally in body. **Secondary keywords** in other H2s. Do **not** keyword-stuff — write for humans.
- [ ] **Short-answer blockquote** under H1 (snippet/AEO bait).
- [ ] Internal + external links present (§6); 1–3 authoritative external sources, no competitors.
- [ ] `heroAlt` + all image alts descriptive.
- [ ] JSON-LD `BlogPosting` (auto) — make sure author/date/heroImage are set so it's rich.

---

## 8. Responsive & page speed (mostly automatic — don't break it)
Enforced by the engine: fluid `clamp()` type, `max-w-2xl` reading column, `next/image` with `sizes`, WebP/AVIF, lazy-load, SSG.
**You must not break it:** no fixed-width blocks; wide tables already scroll (the `table` component wraps in `overflow-x-auto`); never add heavy client-side scripts; keep the hero the only above-the-fold image. Targets: **LCP <2.5s · INP <200ms · CLS <0.1.**

---

## 9. Variation logic (so 50 posts feel bespoke, not cloned)
Pick each of these fresh per post; **avoid repeating the previous post's choice**:
1. **Archetype** (§3) — by topic.
2. **Intro variant** (§4, list of 5) — rotate.
3. **Structure variant** (§4) — matches archetype.
4. **Hero image** — different subject/mood each time.
5. **Which content block** you lead a section with (table vs Callout vs KeyTakeaways vs step list).
Keep the *brand* constant (colors, type, layout, voice); vary the *recipe*. Consistent skeleton, different outfit.

---

## 10. Build, deploy & index
1. `cd` into the site repo. `npm run build` — must pass with the new slugs listed.
2. Spot-check the built HTML for the new post (title, hreflang, TOC if enabled).
3. `git add -A && git commit && git push origin main` → auto-deploys.
4. Poll the 3 live URLs (EN/FR/ES) until 200.
5. **GSC:** URL-Inspect → *Request indexing* for all 3 language URLs (sitemap already auto-includes them).

---

## 11. Localization (native, not translation)
Write EN first, then **rewrite** (don't translate) into FR (professional "vous") and ES (direct "tú"): short, idiomatic, no calques. Localize `title/description/excerpt/dateLabel/category/authorRole/heroAlt/heroCredit` and the "Keep reading" heading. **Never** add an "AI-translated" notice. (See memory `content-localization-voice`.)

---

### The engine's variant fields, in one line
`type` (archetype) · `toc` (auto table of contents) · `heroImage/heroAlt/heroCredit/heroCreditUrl` (Unsplash hero) · MDX blocks `<Callout>` and `<KeyTakeaways title="…">`. Everything else (design, speed, hreflang, schema, sitemap) is automatic.
