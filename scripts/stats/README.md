# Stats pullers

Pulls a stats snapshot from Google Analytics 4, Search Console, and Buttondown into `src/data/stats.json`.

```bash
npm run stats:pull
```

Each source degrades independently: missing creds → that source is marked `available: false` with a reason, the others still run.

## Credentials (`.env`)

| var | what | where to get it |
|-----|------|-----------------|
| `GOOGLE_SERVICE_ACCOUNT_KEY` | path to the service-account JSON key (or the raw/base64 JSON) | GCP → IAM → Service Accounts → create key |
| `GA4_PROPERTY_ID` | numeric GA4 property id (NOT the `G-…` measurement id) | GA4 → Admin → Property Settings |
| `SEARCH_CONSOLE_SITE` | e.g. `sc-domain:buildaloud.ai` or `https://buildaloud.ai/` | your verified Search Console property |
| `BUTTONDOWN_API_KEY` | Buttondown API token | Buttondown → Settings → API |

Then, in Google Cloud, enable the **Analytics Data API** and **Search Console API**, and grant the service-account email:
- **Viewer** on the GA4 property (GA4 → Admin → Property Access Management)
- a user on the Search Console property (Search Console → Settings → Users and permissions)

The `G-590XRCBRDG` tag already in the site is the measurement id; the pullers need the numeric property id instead.

## Per-post stats

Alongside the site-wide totals, `stats:pull` fetches per-URL rows — GSC page-level, GSC page+query, and GA4 per-path — and joins them to each blog post by slug into `postStats`:

```
postStats: {
  available: boolean,       // false if the join-miss guard tripped (see below)
  reason?: string,          // present when available is false
  window: { startDate, endDate },
  meta: { unmatchedRows: { gsc, ga4 }, totalRows },
  byPost: { [slug]: { clicks, impressions, ctr, position, pageviews, scorecard } },
}
```

`scorecard` reports whether the post ranks for its frontmatter `targetKeyword` and how many `secondaryKeywords` got hits, or `insufficient-data` when there's no target keyword or no GSC rows yet.

**Thresholds** (`scripts/stats/post-stats.ts`):
- `UNMATCHED_FAIL_RATIO` (10%) — scoped to `/blog/*` rows only (every other site route — `/`, `/privacy`, `/stats`, `/projects/*`, `/todo` — is excluded from the ratio entirely, since it's not a join failure, just not a post). If genuinely-unmatched `/blog/` rows exceed 10%, normalization is probably broken; `postStats` degrades to `available: false` (loudly, via `console.error`) instead of taking down the rest of the snapshot.
- `STALE_AFTER_DAYS` (30, `src/utils/post-stats.ts`) — the manual `stats:pull` cadence means a badge older than this reads as stale rather than current; surfaces show an "as of" / stale indicator instead of a bare number past this age.

Until `npm run stats:pull` has been run at least once, `src/data/stats.json` has no `postStats`, and every surface (post page, feed cards, `/stats`) renders its empty-state — not zeros.
