# 🧭 RUNBOOK — Weekly Content Engine (start here, every run)

This is the **only entry point**. Follow the steps **in order**. Each step tells you which file to read: read it fully at that step, not before, not from memory. Do not skip a step; if a step cannot be done, write why in the report and continue.

Goal: traffic that turns into clients (and other revenue), for weautomationagency.com in EN/FR/ES. Markets now: **US, UK, France, Spain + Latin America (Mexico first)**. Morocco later (Meta ads).
Hard rules everywhere: **real info only** (never invent stats, clients, quotes, experiences) · first-person founder voice (Houssam Boutaleb) · no date change without a real content change · no competitor links · nothing published that fails the gate.

---

## Step 0 — Setup & memory (5 min)
```bash
npm ci
export KV_REST_API_URL=https://engaged-rhino-141707.upstash.io
npm run dfs -- balance          # note it: DataForSEO budget is $3 per run
```
(In the cloud, credentials are injected by network secrets; `npm run dfs/score/gsc:cached` already set NODE_USE_ENV_PROXY.)

Read, in this order:
- [ ] `content/agent/memory/decisions.md` — decisions Houssam already made. They override anything else.
- [ ] `content/agent/memory/last-run.md` — what last week's run did (don't redo it, follow up on its "next time" notes).
- [ ] `content/agent/memory/keyword-targets.json` — every keyword we attack and its progress.
- [ ] `content/real-experiences.md` — the only experiences you may use.
- [ ] The newest Notion page "Weekly Briefing — YYYY-MM-DD" (Intelligence Hub): opportunities, blog ideas, **Facts that changed**.
- [ ] `npm run gsc:cached -- --json` — this morning's Search Console snapshot (pages, queries, query→page, **targets** with per-country positions).
- [ ] `content/agent/memory/competitors.json` → if `updated` is older than 28 days, run the monthly competitor refresh + link ideas → read `8-competitors-backlinks.md` §Refresh.

## Step 1 — Follow up on existing targets FIRST → read `1-keywords.md` §A
- [ ] For each target in `keyword-targets.json` at a checkpoint (28 / 90 days), apply the double-down / set-aside rule. Strengthening a page that is rising beats writing a new one.

## Step 2 — Choose this week's 2 keywords → read `1-keywords.md` §B–§F
- [ ] Shortlist 4–6 topics from: briefing, GSC gaps, competitor gaps (next 2 agencies from `competitors.json`, see `8-competitors-backlinks.md`), our services.
- [ ] Score every shortlisted topic with the winnability tool (cheap pass), then the 2 finalists in full.
- [ ] Check cannibalization (no second page for a keyword we already cover).
- [ ] Pick: **1 ATTACK NOW** (money article preferred) + **1 ATTACK NOW or INVEST**. Best keyword **per market**.
- [ ] Log every "wrong intent" cluster as an opportunity → `7-opportunities.md`.

## Step 3 — Write the 2 articles (EN + FR + ES) → read `2-writing.md`
- [ ] Same slug in the 3 locales, native rewrites, local keyword per market, neutral Spanish (Spain + LatAm).

## Step 4 — Refresh old posts → read `3-refresh.md` (delegate to subagents, model "sonnet")
- [ ] Fact-check all posts against "Facts that changed" + quick web checks. Real change → edit 3 locales + `updated`. No real change → no date change.
- [ ] Add relevant briefing news where it belongs; strengthen striking-distance queries; apply the CTR rule.

## Step 5 — Internal links → read `4-links.md` (subagent, model "sonnet")
- [ ] `npm run links:internal -- --new <slug>` for each new post, then `npm run links:internal` for the site. Apply in context, all 3 locales. Re-run until clean.

## Step 6 — Check & publish → read `5-publish.md`
- [ ] Pre-publish gate answered (8 questions) for every new/changed page.
- [ ] `npm run build` ✅ → `npm run seo:check` ✅ "all pages pass".
- [ ] Commit (message ends with `Co-Authored-By: Claude <noreply@anthropic.com>`), push to main (or PR fallback), wait for 200 on new URLs, `npm run indexnow`.

## Step 7 — Update memory (never skip)
- [ ] `keyword-targets.json`: add the 2 new targets (+ retargeted pages) with start position from GSC (null if not ranking), volume, KD, verdict, dates. Update statuses of followed-up targets.
- [ ] `last-run.md`: overwrite with this run's summary + "next time" notes (max 25 lines).
- [ ] `decisions.md`: only Houssam adds decisions (via chat). Don't edit it.
- [ ] Notion 💰 Opportunities database: add new opportunities (no duplicates) → `7-opportunities.md`.
- [ ] Link missions (monthly, after a competitor refresh): vet the best `link-ideas.json` entries with the link gate and add max 5 missions → `8-competitors-backlinks.md`.
- [ ] Rows Houssam set to **✅ Go**: do the first playbook step you can do alone (e.g. write the YouTube brief inside the row, draft the waitlist page), set 🔨 In progress, and write in "Next step" what needs Houssam (recording, price, approval).
- [ ] Commit these memory files with the content (same push, or a second small commit).

## Step 8 — Report → read `6-report.md`
- [ ] Create the Notion page "Content report — YYYY-MM-DD" with the exact template. Output it as your final message too.

---

### If something fails
- A data source fails → continue with the others, say it at the top of the report.
- Build/seo:check fails and you can't fix it → don't push; report what blocks.
- Budget: DataForSEO max $3/run. If the balance is under $10, say "top up DataForSEO" at the top of the report.

### Map of files
| File | What it decides |
|---|---|
| `1-keywords.md` | where to attack: sources of gaps, winnability tool, verdicts, markets, cannibalization, follow-up rules |
| `2-writing.md` | how a post looks and sounds: frontmatter, archetypes, voice, AEO/AI Overview, images, localization |
| `3-refresh.md` | when/how to update old posts, CTR rule, striking distance |
| `4-links.md` | internal linking rules + algorithm |
| `5-publish.md` | technical SEO checklist, pre-publish gate, benchmarks, build/deploy/index |
| `6-report.md` | report template |
| `7-opportunities.md` | other revenue: how to log, Notion database, playbooks |
| `8-competitors-backlinks.md` | who our competitors are, monthly refresh, gaps rotation, link ideas → link gate → dashboard missions |
| `memory/` | decisions, last run, keyword targets |
