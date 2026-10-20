# 4 — Internal links

## Rules
- Every post links to **2–3 related posts** (3–6 total out), its **service page**, and **/start**, with natural keyword anchors (never "click here").
- Pillars link down to their cluster posts; cluster posts link up to the pillar.
- End every post with "Keep reading / À lire ensuite / Sigue leyendo" (3–4 links).
- **Locale-correct paths:** EN `/blog/<slug>`, `/services/<x>` · FR `/fr/blog/<slug>`, `/fr/services/<x>` · ES `/es/blog/<slug>`, `/es/services/<x>`. Never cross-link languages in the body.
- Service pages: chatbots → `/services/ai-chatbot` · GEO/AI search → `/services/ai-search-visibility` · lead gen → `/services/lead-generation` · email → `/services/email-automation` · voice/calls → `/services/call-center` · FR agency topics → `/fr/agence-automatisation-ia`.
- Never an off-topic link just to balance numbers.

## The algorithm (`npm run links:internal`)
- relevance(A,B) = 0.55 × TF-IDF similarity of the EN text + 0.30 × keyword overlap + 0.15 × same category. Below 0.15 → no link.
- Targets per post: 3–6 links out, ≥3 links in, ≥1 link to its service page.
- New post (`-- --new <slug>`): gets links FROM its 3 most related posts (which are refreshed anyway) and links TO 3 related posts.
- Balance: sources that already link out a lot and targets that already have many links in rank lower.
- It also flags: orphans, missing FR/ES versions, FR/ES versions missing links the EN has, FR/ES links without the /fr or /es prefix.

## How to apply
1. `npm run links:internal -- --new <slug>` for each new post → add the suggested links **in context** (a sentence where the link is useful), in all 3 locales.
2. `npm run links:internal` for the whole site → fix every ⚠ line.
3. Re-run until no orphan and every post has ≥3 in / 3–6 out where relevant posts exist.
