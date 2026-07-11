# Blog Bullshit Ledger

Memory for the `bullshit-detector` agent. It reads this first and writes back
after each run. This is the running record of overclaim patterns we've caught,
the honest framing each should use, and sources we've misread.

**How to use:** before checking a post, read the patterns below and apply them.
After checking, add any new overclaim + its honest reframe (correct an existing
entry rather than duplicating).

---

## Overclaim patterns (mechanism → honest framing)

- **IP-hash dedup sold as "private / fair" per-person.** Hashing an IP dedups by
  *address*, not person — everyone behind one IP (household, office, cafe,
  CGNAT) is blocked after the first action. Honest framing: "one vote per
  network, not per person" and name the shared-IP limitation. Better fix lives
  in the code (per-device token / fingerprint), not just the prose — see
  [[TD-0031]] and [[like-endpoint-pending-activation]].
- _(add new patterns here as they're caught)_

## "Strength word" watchlist

Superlatives to challenge unless the mechanism truly earns them: *bulletproof,
solves, guarantees, private, anonymous, zero-config, seamless, fully automated*.
The honest word is usually *reduces, usually, mostly, most of the time*.

## Sources we've misread (don't repeat)

- _(add each source + how we misread it + the correct reading)_

## Standing rule

When the honest fix is in the code, not the copy (the thing is genuinely weaker
than it should be), don't just soften the sentence — flag a product ticket so
the build improves and the post can then tell the better story ([[TD-0031]]).
