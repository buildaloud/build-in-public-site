# Buttondown

Newsletter signup + sends. Feeds the `buttondown` block of `stats.json`.

## Steps
1. **[AI→USER]** Create an account / confirm the list username at https://buttondown.com/.
2. **[AI]** Wire the signup form to POST to `https://buttondown.com/api/emails/embed-subscribe/<username>`.
3. **[AI]** Tag the subscribe form with the product name (hidden `tag` field) so one list can serve multiple products.
4. **[USER]** Generate an API key at https://buttondown.com/keys. Not `/settings/api`, that 404s.
5. **[USER]** Put the key in `.env`.

## Produces
- `BUTTONDOWN_API_KEY` → `.env`, used by `scripts/stats/pull.ts`.

## Notes
- Free tier is one newsletter per account. Multiple newsletters is a paid feature.
- Multi-product strategy: one shared list, tag subscribers per product, segment sends by tag rather than creating a list per product.
