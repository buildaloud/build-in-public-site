# PostHog

Product analytics, one shared project across products.

## Steps
1. **[AI→USER]** Create or reuse one PostHog project across all products at https://posthog.com/.
2. **[AI]** Wire `posthog-js`, stamping an `app_name` (or `product`) property on every event. See donor code in `~/projects/chesstell/src/analytics` and `~/projects/lla/ladder-legends-academy` (`instrumentation-client.ts`).
3. **[AI]** Build dashboards filtered by `app_name`/`product` rather than one dashboard per project.
4. **[USER]** Copy the project API key into `.env`.

## Produces
- `POSTHOG_KEY` (or `NEXT_PUBLIC_POSTHOG_KEY` / `VITE_PUBLIC_POSTHOG_KEY` depending on framework), `POSTHOG_HOST`.

## Notes
- 1M events/mo free on one shared project.
- Tag every event with `app_name`/`product` so dashboards can filter, not silo per project.
