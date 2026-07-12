# Like button — feature expert ledger

The `like-button-expert` agent's memory. Canonical facts about the anonymous
per-device like counter on Build Aloud. Read this FIRST, update it LAST.

## What it is

A login-free like counter that dedups per device without an account. Client
computes a layered device id; the server HMACs it and stores only the hash. A
Supabase table holds the counts; a Cloudflare Pages Function serves the API.

## Where the code lives

| Piece | File |
| --- | --- |
| API handler | `functions/api/like.ts` (onRequestGet + onRequestPost) |
| Pure logic (testable) | `functions/api/_like-core.ts` |
| Client device id | `src/utils/device-id.ts` (layered) + `src/utils/audio-fingerprint.ts` (one signal) |
| Client fetch/degrade | `src/utils/like-client.ts` |
| UI | `src/components/LikeButton.astro` |
| Schema | `supabase/migrations/0001_post_likes.sql` |

## Canonical facts

| Thing | Current value |
| --- | --- |
| Endpoint | `GET/POST https://buildaloud.ai/api/like` (POST is same-origin only) |
| Dedup identity | a layered device id: localStorage + cookie (`bl_like_id`), re-derived from device signals (screen, timezone, language, hardware, audio fingerprint) when both are cleared. Sent as the `X-Like-ID` header. |
| Stored dedup key | `device_hash` = HMAC(identity, LIKE_SALT). The raw id/signals are never stored. |
| Table | `post_likes(id, post_slug, device_hash, ip_hash, created_at)`, unique `(post_slug, device_hash)`, RLS deny-all (service_role only) |
| ip_hash | HMAC(ip) used ONLY for rate-limiting (per-voter hourly cap 50, global 300/min), never for dedup |
| Env (CF Pages) | `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `LIKE_SALT` — any missing → the Function returns 503 |
| Status | LIVE as of 2026-07-12 (migration applied, POST verified 200) |

## Gotchas (hard-won — do not re-derive)

1. **The migration MUST match the code.** The code dedups on `device_hash` and
   rate-limits on `ip_hash`. If the live table still has the OLD `voter_hash`
   schema, `POST /api/like` returns the Function's 502 (Supabase rejects the
   `ip_hash`/`device_hash` query) while `GET` still works (it only queries
   `post_slug`). Symptom of schema/code mismatch = GET 200, POST 502.
2. **No local Supabase CLI — apply migrations via the Management API.** This is a
   SHARED Supabase instance (same one micro-blueprint uses). Its Management API
   credentials live in `~/projects/micro-blueprint/.env`
   (`SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`). Run SQL with:
   `POST https://api.supabase.com/v1/projects/<ref>/database/query`, header
   `Authorization: Bearer <access_token>`, body `{"query":"..."}`.
3. **Prefer a non-destructive ALTER over drop+recreate** when the table has rows.
   The 2026-07-12 migration added `device_hash`/`ip_hash`, backfilled both from the
   old `voter_hash`, swapped the unique constraint to `(post_slug, device_hash)`,
   and dropped `voter_hash` — preserving 2 existing rows.
4. **Activation is human-gated** (migration + the three env vars + a Cloudflare
   rate-limit rule on POST /api/like). See the header of `0001_post_likes.sql`.
5. **Safari randomizes the audio fingerprint** on purpose, so it's only ONE
   signal into the device id — localStorage + cookie carry the real persistence.
   Clearing storage on such a browser lets a device like again (accepted).

## Drift-check routine

1. Read `functions/api/like.ts` + `_like-core.ts` — confirm dedup keys on
   `device_hash`, rate-limits on `ip_hash`, and the `X-Like-ID` header name.
2. Confirm the live table columns match: Management API
   `select column_name from information_schema.columns where table_name='post_likes'`.
3. Verify live: `POST /api/like` with an `X-Like-ID: d_<40 hex>` header → expect
   200 `{"likes":N,"hasLiked":true}`. Clean up the test row via the Management API.

## Drift log

- 2026-07-12 — ledger created. Applied the `voter_hash` → `device_hash`/`ip_hash`
  migration via the Management API (non-destructive ALTER, 2 rows preserved),
  which activated the write path. Verified `POST /api/like` → 200 on buildaloud.ai.
