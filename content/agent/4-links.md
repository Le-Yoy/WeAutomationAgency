# 4 — Internal links (contextual, like Google's own blogs)

A link is a **detour that helps the reader understand**, then brings them back. Never a link "for SEO". "Keep reading" lists are a bonus, they don't count.

## The 3 in-body slots (every post)
| Slot | Where | Goes to | Purpose |
|---|---|---|---|
| **1. Basics** (required) | in the first 25% of the body, ideally the first 2 paragraphs after the short answer | the page that explains a **prerequisite** concept (`level: basics` in `concepts.json`) | a reader who lacks the basics can learn them and come back |
| **2. Depth** (required) | middle (25–70%), in the section where a sub-concept comes up | the page that explains that sub-concept in depth | understand one part better without bloating this post |
| **3. Next step** (optional) | late (70–100%), before the CTA | cost, how-to, case study, or the service page | the natural next question after this post |

- **2 or 3?** Slot 3 only if a candidate passes the relevance test as clearly as slots 1–2. Never forced. Max ~1 internal link per 250 words in the body.
- **The pillar exception:** if this post IS the basics page of its topic (e.g. `ai-chatbots-for-business`, `ai-search-visibility-geo`), slot 1 goes to the neighbouring basics page a beginner needs first (e.g. GEO → `seo-vs-geo-vs-aeo-ai-visibility`), or is skipped if none exists. Write that in the report.
- Plus, as before: 1 link to the matching **service page** and to **/start** (CTA), and "Keep reading" (3–4 posts, preferably ones NOT already linked in the body).
- One link per target page per post (body). Never link a page to itself. Never cross languages.

## The guided detour (slot 1 only, max once per post)
When the prerequisite really matters to follow the post, say so and invite them back. Short, natural, in the founder's voice:
- EN: "If GEO is new to you, [this 3-minute explainer](/blog/seo-vs-geo-vs-aeo-ai-visibility) covers the basics. Then come back: the rest of this post is the practical part."
- FR: « Si le GEO est nouveau pour vous, [cet article de 3 minutes](/fr/blog/seo-vs-geo-vs-aeo-ai-visibility) pose les bases. Revenez ensuite : la suite est la partie pratique. »
- ES: "Si el GEO es nuevo para ti, [este artículo de 3 minutos](/es/blog/seo-vs-geo-vs-aeo-ai-visibility) explica lo básico. Luego vuelve: lo que sigue es la parte práctica."
Otherwise, link the term inside the sentence (the normal case for slots 2–3).

## The relevance test (the "99%" rule) — all 5 must be YES, else no link
1. **I read the target page** (at least its short answer and the H2 about the term). It really explains this term/concept. Not "related", **explains**.
2. At this exact sentence, a reader could need or want that explanation to follow what comes next.
3. The anchor is the term itself or says exactly what they'll get ("how WhatsApp pricing works"), never "click here", "this article", or a stuffed keyword.
4. The sentence still reads naturally with the link, and the post's flow doesn't depend on leaving.
5. Same language, page exists, not this page, not already linked in the body.
Any doubt → don't link. A missing link is fine; a weak one is not. Run this test yourself (main agent), not a subagent: it needs judgment.

## How to place a link
- **Prefer linking a phrase that's already there** (`npm run links:slots -- <slug>` lists them, with the sentence).
- If the right concept isn't mentioned where it's needed, **add one sentence that's useful on its own** (a real fact or a plain explanation), then link inside it. Never "To learn more, read…" filler.
- In an **older post receiving a link to a newer post**, you may add a short sentence or paragraph where the new topic fits (e.g. a new real fact, a new step we now do). Real info only (`real-experiences.md`, sourced facts).
- Do it in all 3 locales, each in its own language and natural place (the sentence may differ by locale).
- **Dates:** adding links or a bridge sentence is not a content update → **don't change `updated`**. Only a real content change (news, price, corrected fact, new section of substance) changes the date (see `3-refresh.md`).

## Tools
- `content/agent/memory/concepts.json` — the concept map: which page REALLY explains which term (terms per locale, level basics/deep/service). **Add the concepts of every new post when you publish it**, and new terms when a post gets a new section.
- `npm run links:slots` — audit: intro / middle / late slots per post × locale (✗ = empty).
- `npm run links:slots -- <slug>` — candidates in one post: concept terms already in the text, per slot, with the sentence.
- `npm run links:slots -- --new <slug>` — reverse: places in OLDER posts where the new post's concepts appear (or related posts where a bridge sentence may fit).
- `npm run links:internal` — graph balance (orphans, in/out counts, missing FR/ES links, wrong locale prefix). relevance(A,B) = 0.55 TF-IDF + 0.30 keyword overlap + 0.15 same category (`scripts/lib/relevance.mjs`).
- **Locale paths:** EN `/blog/<slug>`, `/services/<x>` · FR `/fr/blog/<slug>`, `/fr/services/<x>` · ES `/es/blog/<slug>`, `/es/services/<x>`.
- **Service pages:** chatbots → `/services/ai-chatbot` · GEO/AI search → `/services/ai-search-visibility` · lead gen → `/services/lead-generation` · email → `/services/email-automation` · voice/calls → `/services/call-center` · FR agency topics → `/fr/agence-automatisation-ia` · ES → `/es/agencia-ia`.

## The process
**A. Every new post (weekly run, Step 5):**
1. Add its concepts to `concepts.json` (what it truly explains, terms in EN/FR/ES, level).
2. Fill its own slots: `npm run links:slots -- <slug>` → apply the test → slot 1 (basics), slot 2 (depth), slot 3 if it earns it. 3 locales.
3. Reverse links: `npm run links:slots -- --new <slug>` → **at least 3 older posts link to it in the body** (not only "Keep reading"), using an existing phrase or a useful bridge sentence. 3 locales.
4. `npm run links:internal` → no orphan, no ⚠ on FR/ES parity or prefixes.

**B. Monthly sweep (first run of each month, after Step 4):**
1. `npm run links:slots` → every ✗ in intro/middle is a task. Fix the posts with the most Google impressions first (`gsc:cached`), max 6 posts per run.
2. For each post published or refreshed in the last month: are there older posts that now deserve a link to it? (`--new <slug>` again: new terms may have appeared.)
3. Check concepts.json is still true (a page that no longer explains a term → change the owner).

**C. Report:** list every link added: post → target, slot, and the sentence (new or existing).
