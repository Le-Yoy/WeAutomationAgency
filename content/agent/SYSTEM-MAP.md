# 🗺️ System map — how everything fits together

| Tool | What it does | When |
|---|---|---|
| AI-bot logging (`middleware.ts`) | Counts every AI bot / assistant visit per page (Redis) | live |
| `npm run snapshot` | Google (GSC), Bing, AI visits, page health, keyword targets per country, engine memory → Redis | every morning (GitHub Actions) |
| `/dashboard` | Everything above + link mission, targets, this week's run, opportunities, competitors | anytime (password) |
| `npm run weekly-report` | Monday email: results, targets, this week's content, opportunities waiting, to-do | Monday (GitHub Actions) |
| `npm run links` | Link mission queue (Done/Skip buttons on the dashboard; `add` appends) | daily (Houssam) |
| `npm run score` | Winnability score per keyword per market | Monday agent |
| `npm run dfs` | Raw DataForSEO: volumes, ideas, competitor gaps, SERP, ChatGPT answers (`ai-answer`), AI search volume (`ai-volume`), who AI cites (`ai-mentions`), weekly citation check (`ai-check` → `memory/ai-visibility.json` → dashboard 💬 + Monday email) | Monday agent |
| `npm run competitors` | Top 20 agencies per market + link ideas | monthly (Monday agent) |
| `npm run links:internal` | Internal-link audit + suggestions | Monday agent |
| `npm run gsc` / `gsc:cached` | Search Console live (key) / from the snapshot (cloud) | anytime |
| `npm run seo:check` | Crawl + SEO checks before any push | every push |
| `npm run indexnow` | Submit sitemap URLs to Bing/IndexNow | after publishing |
| Notion briefing routine | News, competitor moves (top 5/market), blog ideas, facts that changed | Monday 07:00 UTC |
| Content Engine routine | Follows `RUNBOOK.md` | Monday 08:13 UTC |
| Notion 💰 Opportunities | Other revenue, Houssam decides (mirror: `memory/opportunities.json`) | weekly |

```
NEWS ───────── Briefing (Mon 07:00) ───┐
GOOGLE/BING/AI ─ Snapshot (daily) ──────┤
COMPETITORS ── competitors (monthly) ───┼──► Content Engine (Mon 08:13) ──► articles live
                                        │       ├─► keyword-targets.json (tracked daily)
                                        │       ├─► link missions (dashboard 🔗)
                                        │       ├─► 💰 opportunities (Notion + mirror)
                                        │       └─► Notion report (URLs for Google)
                                        └──► DASHBOARD (daily) + MONDAY EMAIL ──► Houssam: decisions, missions, Search Console
```
Houssam's loop: Monday email → dashboard → decide opportunities in Notion → do the link mission → submit report URLs in GSC → tell Claude any decision (added to `memory/decisions.md`).
