# Cloudflare Pages

Default host. Push-to-main deploy, $0 including Functions.

## Steps
1. **[AI→USER]** Create a Pages project at https://dash.cloudflare.com/ → Workers & Pages, connect the GitHub repo.
2. **[AI]** Set the build command / output dir, prod branch = `main`.
3. **[AI]** Add `.github/workflows/deploy.yml`: push-to-main deploy + daily cron (so future-dated posts publish on schedule) + `workflow_dispatch`. See this repo's `deploy.yml` for the pattern.
4. **[AI→USER]** Add a custom domain via Cloudflare DNS (Pages project → Custom domains).

## Produces
- Live domain, deploying on every push to `main`.

## Notes
- $0 hosting including CF Pages Functions, no separate backend needed for simple products.
- CI needs `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` as GitHub repo secrets.
- See `vercel/` for when Next.js-native features are worth leaving this default.
