# 1 — Keywords: where to attack

We are a young site (Ahrefs DR ≈ 3, DataForSEO rank 0/100). We don't chase the biggest keywords first: we take the ones we can **win now**, then climb. Every keyword we win makes the site stronger and unlocks harder ones.

| Stage | Our strength | What we attack |
|---|---|---|
| Now | DR 0–10 | KD ≲ 12 (tool threshold), specific/long, weak top 10, where GSC already shows us |
| Next | DR 10–25 (real links) | KD 12–30 ("whatsapp chatbot cost", "prospection automatisée") |
| Later | DR 25+ | head terms ("lead generation", "ai chatbot") |
The tool's KD threshold grows automatically with our rank.

---

## §A Follow up existing targets first (`memory/keyword-targets.json`)
`npm run gsc:cached -- --json` → `targets` gives, per target, the current GSC position **in its country**, impressions, clicks, days since start.
- **Day 28 checkpoint:** position improving or impressions rising → mark `rising`; nothing at all (no impressions) → check indexing (is the URL live, in the sitemap, linked from ≥3 posts?) and fix.
- **Day 90 checkpoint:**
  - Rising / position ≤ 20 → **double down**: refresh with new facts, add 2–3 internal links from related posts, add an FAQ answering GSC queries, consider a supporting article (cluster). Status `strengthen`.
  - Stuck beyond 30 → **diagnose intent**: compare our page with the current top 3 (type: list/guide/tool/product; angle; length). Mismatch → rewrite to match intent. Match but too strong → status `parked`, retry when our DR has grown.
- A page on page 1 (pos ≤ 10) with CTR below market for 28 days → title/description rewrite (see `3-refresh.md` CTR rule).
Put the follow-up actions in the report (section "Targets follow-up").

## §B Where gaps come from (shortlist 4–6 topics)
1. **GSC (proof Google already sees us):** query→page pairs with impressions where
   - we're at **positions 5–30** (striking distance: strengthen that page, don't write a new one), or
   - the query has **no dedicated page** (a new article candidate), or
   - the ranking page is the wrong one (e.g. /fr homepage ranking for an English query → the right page is missing).
2. **Notion briefing:** "Blog ideas" (each has market + query + service) and fresh news (first-mover: no competition yet, demand arriving).
3. **Competitor gaps:** `npm run dfs -- gap <market> <domain> 100` → keywords a competitor ranks top 20 for and we don't. Take the next 2 agencies from `memory/competitors.json` (rotation rule in `8-competitors-backlinks.md`), + any competitor named in the briefing.
4. **Our services** × industries/use cases (money topics): AI chatbots (website, WhatsApp), AI voice agents/call center, lead generation, email automation, GEO/AI search visibility, Make/n8n automation. E.g. "whatsapp order confirmation shopify", "ai voice agent for dental clinic".
5. **Ideas expansion:** `npm run dfs -- ideas <market> "<seed>" 50` for related queries with volume/KD/intent.

## §C The winnability tool (mandatory before choosing)
```bash
# cheap pass, every shortlisted topic (≈ $0.4)
npm run score -- "<topic>" us,fr,es --serp 2 --also "<English + local variants>"
# full pass, the 2 finalists (≈ $1.2)
npm run score -- "<topic>" us,uk,fr,es,mx --serp 4 --also "<variants>"
```
Always pass `--also` with the English term AND the local terms (people in France often search in English: "lead generation" 1,000/mo vs "génération de leads IA" 0).

What it computes per keyword per market: volume, KD, CPC, intent, AI Overview, our GSC position, **weak** results in the top 10 (forums/UGC, pages with 0 linking domains, weak domains, old years in titles), **wall** (median strength of the top-10 domains 0–100), then:
- `score = 100 × value × winnability`
- value = volume (log, 10k = max) × intent (commercial 1 / informational .6 / navigational .3) × CPC × service fit × .8 if AI Overview
- winnability = KD vs our threshold + weak results + we already rank (≤30 / ≤60) − wall of strong domains

Verdicts: **ATTACK NOW** (winnable today) · **INVEST** (worth it, takes time/links) · **LATER** (too strong, wrong intent, or no buyers).

How to read the metrics:
- **Volume** = demand; never decisive alone.
- **KD** = how strong you must be (links of the current top 10).
- **CPC** = commercial value: advertisers pay because it converts ("automated lead generation" $100/click with 170 searches can beat a 5,000-search informational term).
- **Intent**: buyer > reader. Navigational/tool-seeking (people looking for a product, a course, "free bots") = LATER for the agency → but log it as an opportunity (§F).
- **AI Overview** = fewer clicks; we can still be cited inside it (see `2-writing.md` §AEO).
- **Weak / wall**: 2–3 weak results in the top 10 = an open door, even with medium KD. A wall > 60 = wait.

## §D Choosing the 2 articles
- **1 ATTACK NOW** (prefer a money article: service × industry/use case, commercial intent, high CPC) + **1 ATTACK NOW or INVEST** (INVEST only if GSC already shows us ≤ 30 for it, or the news is fresh).
- Per **market**, use the best-scoring keyword for that market (EN term may win in FR/ES). The slug stays the same in all 3 locales; titles/descriptions/H2s use each market's keyword.
- Write the reason in one line per pick (score, verdict, gap source).

## §E Cannibalization check (before writing)
- `grep -ril "<keyword>" content/posts/en` and compare with every post's `keywords` frontmatter.
- In `gsc:cached` query→page: if an existing page already gets impressions for the keyword, **strengthen/retarget that page** instead of writing a new one.
- Two close topics may coexist only with clearly different intent (e.g. "chatgpt watermark" news vs "claude watermark SEO impact"), and they must link to each other.

## §F Markets
- **EN:** score `us,uk` (add `ca,au` when relevant).
- **FR:** `fr` (add `be,ch` when relevant; `ma` later). Professional "vous".
- **ES = all Spanish-speaking markets:** /es pages are hreflang `es` (not es-ES) and serve Spain + LatAm. Score `es,mx` (add `ar,co`). Neutral Spanish ("tú", no "vosotros"/"ordenador"); country-specific law/prices → give Spain AND Mexico (LSSI/AEPD vs LFPDPPP; EUR and USD/MXN). Use each market's term ("bot whatsapp" in Mexico). Separate country pages only if intent or law truly differs.
- Note: GSC positions in `targets` are per country; in the score tool they are global.

## §G Cost control
Cheap pass `us,fr,es --serp 2` for the shortlist, full pass only for the finalists. ≤ $3 per run. Balance < $10 → say "top up" in the report.

## §H Wrong-intent keywords = opportunities
Never just discard them: log them in the Notion 💰 Opportunities database (`7-opportunities.md`). Example: "ai automation agency" US 4,400/mo, KD 19 = people who want to START an agency → course, coaching, templates, YouTube.
