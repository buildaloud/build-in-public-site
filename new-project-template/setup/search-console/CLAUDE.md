# Google Search Console

Search performance (queries, clicks, impressions). Feeds the `searchConsole` block of `stats.json`.

## Steps
1. **[AI→USER]** Add a property at https://search.google.com/search-console/ → Add property. URL-prefix is fine, domain property not required.
2. **[AI]** If the GA4 gtag is already live on the site and you're logged into the same Google account, URL-prefix verification auto-verifies via the "Google Analytics" method. No DNS TXT record, no meta tag. Confirmed live on the buildaloud run.
3. **[AI→USER]** Grant the stats service-account email as a user (Settings → Users and permissions → Add user). Needed before the Search Console API pull returns data.
4. **[AI]** Note the property string as it appears in Search Console.

## Produces
- `SEARCH_CONSOLE_SITE` (e.g. `https://buildaloud.ai/`) → `.env`, used by `scripts/stats/pull.ts`.

## Notes
- URL-prefix properties keep the full `https://domain/`; domain properties use `sc-domain:domain` instead. Don't mix the formats up in `.env`.
- Auto-verify needs GA4 wired up first (see `google-analytics/`) and the same Google login doing both. If either isn't true, fall back to DNS TXT or meta-tag verification.
