# 3 — Refreshing old posts

Delegate to subagents (model "sonnet"), one batch of posts each. They report back: post, change, source, whether the date changes.

## When a post changes (and when its date changes)
- **Real change = date changes** (`updated` + `updatedLabel` = today, all 3 locales): a fact became wrong (price, version, model name, feature, policy, date), a new fact/news belongs in the post, a correction of our own mistake, a new section that answers real queries.
- **Not a real change = date stays:** title/description/keyword/heading tweaks, internal links, typo fixes, rewording.
- **Never** bump a date alone (fake freshness: Google treats it as spam, and it's what the spam updates target).

## What to check in every post
1. Against this week's briefing **"Facts that changed"** (prices, versions, policies with sources).
2. Quick web checks of time-sensitive facts: prices (Make, n8n, WhatsApp/Meta fees, OpenAI/Anthropic API prices), model names, feature availability, laws.
3. Dead or moved sources (a 403/404 to bots is not proof: check another page of the same site before replacing).
4. Our own claims: if something we wrote is wrong, correct it and say so plainly.

## Adding news
Add briefing news only to the posts it truly belongs in: 1–3 sentences + source, in all 3 locales, where it helps the reader.

## Striking distance (positions 5–30 in GSC)
For queries where a post ranks 5–30: make sure the exact query is answered (an H2 phrased like it, or a sentence in the right section), naturally, no stuffing. That is often the cheapest traffic we can get.

## CTR rule (page 1 only)
If a page is on page 1 (avg position ≤ 10) with ≥30 impressions and its CTR is below the market CTR for its position for 28 days → rewrite seoTitle + description first, then the hook. Market reference and targets are in `5-publish.md`. Don't judge a page whose title changed in the last 28 days (the dashboard marks it 🧪). Beyond page 1, the fix is ranking (links, content), not the title.

## Translations stay in sync
Every real change is applied to EN, FR and ES (localized, not translated word for word).
