# 8 — Competitors & backlinks

## Who our competitors are (`memory/competitors.json`)
Three kinds, per market (us, uk, fr, es, mx):
- **agencies** (top 20): businesses selling what we sell, ranked by how often and how high they appear on Google for our service keywords + our keyword targets, with their strength (0–100) and linking domains. These are the real competitors.
- **directories** (Clutch, DesignRush, Sortlist, Codeur, GoodFirms…): they rank for our keywords → being listed there = being in those results.
- **platforms** (YouTube, LinkedIn, Reddit…): they rank for our keywords → content there (videos, posts) can rank where our site can't yet.
`tools` and `media` are listed but are not competitors (we target specific use cases instead of fighting them).
The list is automatic: a domain wrongly classified can be fixed in `scripts/competitors.mjs` (regex lists).

## Refresh (monthly)
When `competitors.json` → `updated` is older than 28 days (RUNBOOK step 0):
```bash
npm run competitors -- refresh us,uk,fr,es,mx     # ≈ $0.35
npm run competitors -- links fr 100                # ≈ $0.03 per market
npm run competitors -- links us 100
npm run competitors -- links es 100
npm run competitors -- links uk 100
```
Note in the report what changed (new agency in a top 5, one that dropped out).

## How competitors feed the weekly work
1. **Keyword gaps:** each run, take the next 2 agencies (rotate through the top 5 of each market, oldest-checked first; note which ones in `last-run.md`) → `npm run dfs -- gap <market> <domain> 100` → candidates for `1-keywords.md` §B.
2. **Their weak pages:** in the score tool's top 10, a competitor page with 0 linking domains or an old year = a page we can beat.
3. **Their links → our link ideas:** `memory/link-ideas.json` lists sites that link to ≥2 of a market's top agencies but not to us. Those sites already link to agencies like us: the most realistic link targets.

## From link idea to mission (max 5 new missions per month, quality over volume)
For the best ideas (most competitors linked, rank > 0, low spam): open the site and run the **link gate**:
1. Relevant to AI automation / business / our markets (EU, US, UK, LatAm)?
2. Real site with real visitors, indexed (search `site:domain`), not a link farm or "submit to 500 directories" network?
3. Free and earned (no paid placement, no link exchange)?
4. Link type: dofollow / nofollow / mention only (all useful for GEO; dofollow = SEO bonus). Check before signing up.
5. Same name/description as everywhere else (below)?
6. Could it ever look spammy to Google's spam updates (scaled content, paid links, link farms, automated forum posting)? Any doubt → skip.
If it passes: find **how** competitors got the link (directory listing, partner page, guest article, tool review, podcast, community answer) and write the mission. Add the missions with:
```bash
npm run links -- add /tmp/new-missions.json     # [{ "name", "url", "type", "why", "steps" }]
```
They appear on the dashboard (🔗 Today's link mission), one at a time. Never sign up, post or submit anything yourself: Houssam does the missions (or asks Claude in chat).
Rules: 1–2 links a day max, steady; no bulk directory services, no comment/forum spam, no link exchanges at scale, no PBNs, no paid listicles, no AI-mass guest posts.

## Our fixed profile info (identical everywhere)
- Name: WeAutomationAgency · Website: https://weautomationagency.com · Email: support@weautomationagency.com (no phone) · Founder: Houssam Boutaleb, Founder & CEO · Languages: French, English, Spanish.
- Short EN: "AI automation agency: WhatsApp and website chatbots, AI voice agents, automated follow-ups and CRM, visibility in ChatGPT. In English, French and Spanish."
- Short FR: "Agence d'automatisation IA : chatbots WhatsApp et site, agents vocaux, relances et CRM automatisés, visibilité dans ChatGPT. En FR, EN et ES."
- Link to the matching page: FR agency directories → /fr/agence-automatisation-ia; service directories → the service page; general → homepage.
