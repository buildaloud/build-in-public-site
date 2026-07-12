# Subscriber (newsletter) — feature expert ledger

The `subscriber-expert` agent's memory. Canonical facts about the newsletter
signup on Build Aloud — the Cloudflare Pages Function that proxies to Buttondown.
Read this FIRST, update it LAST.

## What it is

Email signup with progressive profiling. `functions/api/subscribe.ts` is a thin
Pages Function proxy: the browser posts an email (and optional role/interest
tags), the Function forwards to Buttondown with the API key server-side. The key
never reaches the client.

## Canonical facts (the drift-prone bits)

| Thing | Current value |
| --- | --- |
| Endpoint | `POST https://buildaloud.ai/api/subscribe` (onRequestPost only) |
| Handler | `functions/api/subscribe.ts` |
| Upstream | Buttondown — `https://api.buttondown.com/v1/subscribers`, auth `Token <key>` |
| Env (CF Pages secret) | `BUTTONDOWN_API_KEY` — missing → the Function returns 503 |
| Role tags | `role-developer`, `role-founder`, `role-building-with-ai`, `role-marketing`, `role-watching` |
| Interest tags | `int-how-to`, `int-war-stories`, `int-ai-meta`, `int-launches`, `int-numbers` |
| Tag safety | client-supplied tags are filtered to the allowlist above before use |
| Deploy | `wrangler pages deploy dist --project-name build-in-public-site --branch=main` (Functions bundle from `functions/`) |

## Gotchas (hard-won — do not re-derive)

1. **Buttondown's firewall blocks datacenter IPs.** A signup proxied from the
   Cloudflare Worker fails with `400 subscriber_blocked` ("blocked by your
   firewall") even with a valid key — Buttondown judges the request's origin IP,
   which is Cloudflare's datacenter. **Fix (shipped 2026-07-12):** forward the
   visitor's real IP as `ip_address` (from `CF-Connecting-IP`) so the firewall
   evaluates the subscriber, not the proxy. Without this, ALL real signups fail.
2. **A genuine block is 422, not 502.** The Function maps `subscriber_blocked` to
   422; a bare 502 hides the real cause (that's what masked this bug for a while).
3. **Stale deploy can leave the Function unbound.** Symptom: `GET /api/subscribe`
   returns the site's HTML (200) instead of 405, and `POST` gives a Cloudflare
   *edge* 502 (plain "error code: 502", not the Function's JSON). Fix: redeploy —
   a fresh Functions bundle binds the route. (Contrast: a bound Function's own
   error is JSON like `{"error":"subscribe failed"}`.)
4. **History:** `/api/subscribe` 404'd during the two-app / custom-domain Functions
   saga (see the 2026-07-08 cloudflare-pages-functions-404 post); resolved by
   consolidating onto the Pages project.

## Drift-check routine

1. Read `functions/api/subscribe.ts` — confirm the Buttondown base URL, the tag
   allowlist, and that `ip_address` forwarding is still present.
2. Verify live: `POST https://buildaloud.ai/api/subscribe` with a real-domain test
   email → expect `{"ok":true,...}` 200. (Clean up the test subscriber after via
   `DELETE api.buttondown.com/v1/subscribers/<email>`.) A 503 means the CF
   `BUTTONDOWN_API_KEY` secret is unset; a 422 means the firewall blocked it.

## Drift log

- 2026-07-12 — ledger created. Fixed the firewall block (forward `CF-Connecting-IP`
  as `ip_address`); mapped blocked→422; set the CF `BUTTONDOWN_API_KEY` secret;
  redeployed to bind the Function. Verified live 200 on buildaloud.ai.
