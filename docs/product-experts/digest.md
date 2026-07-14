# Rolling digest — expert ledger

Owned by `digest-expert`. Read first, update last.

## Flow (verify against code before trusting)
- AUTHORING: content-pipeline Step 9, at post-CREATION time. Entry = { asOf:
  the post's pubDate (often FUTURE — drip), count: posts in trailing 30d
  window, paragraph: fresh synthesis DESCRIBING the window incl. the new post }.
  Appended to `src/data/digests.json` (committed).
- DISPLAY: `src/pages/index.astro` — build-time pick `Date.parse(e.asOf) <=
  buildNow` (line ~34) filters to `eligibleDigestEntries`, which is what's
  shipped to the client via `data-digests` (line ~81; FIXED 2026-07-14, used to
  ship the FULL unfiltered array). Client-side roll-forward script (line ~228)
  re-picks by the visitor's clock among that already-eligible set only — it can
  now only pick something the build already baked a post for, never newer.
- Post visibility is a SEPARATE mechanism: build-time pubDate filter + the
  daily 16:00Z rebuild. The digest and the post list can therefore disagree —
  that disagreement is the recurring bug.

## Incident history (the failure class)
- 2026-07-13 (humanizer post): AI summary/digest referenced the humanizer post
  while the post wasn't on the page. Root cause that day: daily rebuild cron
  (13:00Z) fired BEFORE the 15:00Z drip slot → post revealed a day late while
  its digest entry was already visible. Fixed by moving the cron to 16:00Z.
- 2026-07-14 (stats-page post): RECURRED with a different path — homepage
  digest showed "as of Jul 14" describing the /stats instrument-panel post
  while the newest live post was Jul 13 (observed ~10:30Z, i.e. BEFORE the
  15:00Z drip slot AND before the 16:00Z rebuild). ROOT CAUSE (leak path 1,
  confirmed): `index.astro:81` shipped the ENTIRE unfiltered `digests.json`
  entries array (including every future drip entry, then reaching out to
  2026-08-07) into `data-digests` on every build, no matter what `buildNow`
  was. The client roll-forward script independently re-picked "current" by
  the VISITOR's `Date.now()` against that full array, fully decoupled from
  whether the build the visitor was looking at actually contained the
  matching post — a gap that exists every single day in the ~1hr window
  between the 15:00Z drip slot and the 16:00Z rebuild, worse with any clock
  skew. Both comparisons (server `Date.parse(e.asOf) <= buildNow`, client
  `Date.parse(e.asOf) <= now`) were already correct full-timestamp compares —
  NOT a date-granularity bug (leak path 2 ruled out). FIXED: `index.astro` now
  computes `eligibleDigestEntries = digestEntries.filter(e => Date.parse(e.asOf)
  <= buildNow)` and serializes ONLY that filtered array into `data-digests`;
  the client can still re-pick by its own clock but only among entries the
  build already made eligible, so it can never surface a post-less entry.
  Verified via `npm run build`: the built `dist/index.html`'s `data-digests`
  now tops out at the newest build-eligible `asOf`, with no future entries
  leaking through.

## Invariant to enforce
A digest entry must never render before its post is reachable. The clean fix
shape: ship only build-time-eligible entries to the client (filter the
data-digests array by the same condition the post list uses), and keep asOf as
a full timestamp everywhere (never coerce to a date).

## Drift log
- 2026-07-14 — ledger created; incident history + open case seeded.
- 2026-07-14 — closed the stats-page leak: `data-digests` now ships only
  build-time-eligible entries (`eligibleDigestEntries`), not the full array.
  Step 9 of the content-pipeline skill audited — `asOf` instruction already
  correctly specifies a full UTC timestamp (post's pubDate), no drift found.
