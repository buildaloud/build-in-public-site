# GCP service account

API access for the stats puller: GA4 Data API + Search Console API, one service account.

## Steps
1. **[AI→USER]** Reuse one GCP project across all products at https://console.cloud.google.com/, instead of one project per product. Keeps API enablement and billing in a single place.
2. **[AI]** Enable the Analytics Data API and Search Console API on that project (APIs & Services → Enable APIs and Services).
3. **[USER]** Create a service account named `<product>-stats` (IAM & Admin → Service Accounts → Create Service Account).
4. **[USER]** Generate a JSON key, download it to `<repo>/secrets/` (gitignored), `chmod 600` it.
5. **[AI→USER]** Grant the SA email Viewer on the GA4 property (Admin → Property Access Management → Add users).
6. **[AI→USER]** Add the SA email as a user on the Search Console property (see `search-console/`).
7. **[AI]** Read `GA4_PROPERTY_ID`: numeric, from the Admin URL (`aNNNpNNN`) or Property Settings. Not the `G-…` measurement id.

## Produces
- `GOOGLE_SERVICE_ACCOUNT_KEY` → path to the JSON key under `secrets/`.
- `GA4_PROPERTY_ID` (numeric).

## Notes
- Auth: service-account JWT + REST via `google-auth-library`. See `scripts/stats/pull.ts`.
- One SA per product, one GCP project shared across products. Don't spin up a new project per product.
- `secrets/` is gitignored at the repo root; never commit the JSON key.
