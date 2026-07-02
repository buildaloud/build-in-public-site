# Google Analytics 4

Traffic + engagement. Feeds the `ga4` block of `stats.json` and the site's page tag.

## Steps
1. **[AI→USER]** Create a GA4 property for the domain at https://analytics.google.com/ → Admin → Create Property. You click through property creation and accept terms.
2. **[AI]** Read the **Measurement ID** (`G-…`) from Admin → Data Streams → the web stream.
3. **[AI]** Add the gtag snippet to the site `<head>` (already present here as `G-590XRCBRDG` — swap for the new one on a new project).
4. **[AI]** Read the numeric **Property ID** from Admin → Property Settings (top of page, e.g. `123456789`). This is NOT the `G-…` id; the Data API needs the number.

## Produces
- Measurement ID `G-…` → site `<head>` tag.
- `GA4_PROPERTY_ID` (numeric) → `.env`, used by `scripts/stats/pull.ts`.

## Notes
- Claude can read both IDs (not secrets) once you're logged in.
- Data won't appear in the API until the service account has Viewer on this property (see `gcp-service-account`).
