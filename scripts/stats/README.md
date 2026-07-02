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
