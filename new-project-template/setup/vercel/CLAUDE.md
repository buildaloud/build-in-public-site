# Vercel

Alternative host. Reach for it only when Cloudflare Pages doesn't fit.

## Steps
1. **[AI→USER]** Default to `cloudflare-pages/` for $0 hosting. Switch here only if the product needs Next.js-native features (ISR, image optimization, edge middleware) or per-PR preview environments.
2. **[AI→USER]** Link the repo at https://vercel.com/ (import project, connect GitHub).
3. **[AI]** Set the framework preset and build config, prod branch = `main`.
4. **[USER]** Upgrade to Pro ($20/mo) before any Stripe transactions flow. Hobby tier prohibits commercial use.

## Produces
- Live domain, preview URL per PR.

## Notes
- Hobby tier is free but non-commercial only. Don't launch a paid product on it.
- Prefer `cloudflare-pages/` by default; move here only when a specific Next.js feature is the actual blocker, not by default preference.
