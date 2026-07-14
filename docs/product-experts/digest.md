# Rolling digest — expert ledger

Owned by `digest-expert`. Read first, update last.

## Flow (verify against code before trusting)
- AUTHORING: content-pipeline Step 9, at post-CREATION time. Entry = { asOf:
  the post's pubDate (often FUTURE — drip), count: posts in trailing 30d
  window, paragraph: fresh synthesis DESCRIBING the window incl. the new post }.
  Appended to `src/data/digests.json` (committed).
- DISPLAY: `src/pages/index.astro` — build-time pick `Date.parse(e.asOf) <=
  buildNow` (line ~34) AND the FULL sorted entries array shipped to the client
  via `data-digests` (line ~81) with a client-side roll-forward script.
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
  15:00Z drip slot AND before the 16:00Z rebuild). The cron fix cannot explain
  this one: the entry became visible before its asOf timestamp had passed,
  which points at the CLIENT roll-forward or a date-granular comparison
  (leak paths 1/2 in the agent definition), or a build that baked it early.
  OPEN — this is the case to debug on next dispatch.

## Invariant to enforce
A digest entry must never render before its post is reachable. The clean fix
shape: ship only build-time-eligible entries to the client (filter the
data-digests array by the same condition the post list uses), and keep asOf as
a full timestamp everywhere (never coerce to a date).

## Drift log
- 2026-07-14 — ledger created; incident history + open case seeded.
