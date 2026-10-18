#!/usr/bin/env bash
# Copies the local keys (.gsc-key.json, .env.local) into GitHub Actions secrets for
# .github/workflows/snapshot.yml. Values are never printed. Run: bash scripts/push-secrets.sh
set -e
cd "$(dirname "$0")/.."
gh secret set GSC_KEY_JSON < .gsc-key.json && echo "set GSC_KEY_JSON"
for k in BING_WEBMASTER_API_KEY KV_REST_API_URL KV_REST_API_TOKEN RESEND_API_KEY LEAD_NOTIFY_EMAIL; do
  v=$(grep -E "^$k=" .env.local | head -1 | cut -d= -f2- | sed 's/^"//;s/"$//')
  if [ -n "$v" ]; then printf '%s' "$v" | gh secret set "$k" && echo "set $k"; else echo "missing $k in .env.local"; fi
done
gh secret list
