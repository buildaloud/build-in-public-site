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
- **"Same discovery work" / "same loop" framing across two unrelated systems.**
  Caught in the `automate-blog-writing-with-ai-agents` rewrite: the post claims
  SEO *research* (keyword-opportunity discovery — autocomplete/PAA/SERP scans
  in `seo-researcher.md`, for picking what to write next) "feeds the same
  discovery work" as SEO *measurement* (GSC/GA4 per-post telemetry in
  `scripts/stats/`, for tracking posts already published). Grepped
  `seo-researcher.md` for any reference to `stats.json`/GSC — none. They're two
  separate systems with no shared code or data path; the only real bridge is
  `meta-content-reviewer`, which reads `stats.json` to learn "what wins" and
  feeds that back into *review*, not into the research stage described. Honest
  framing: name them as two separate practices in service of the same instinct
  ("don't guess, go look") rather than claiming they're the same mechanism.
- **Mechanical scorer described as "pure regex."** The tone gate
  (`tone-grader.ts`) is deterministic and has no LLM discretion — that part is
  true and is the point worth making. But several of its signals (burstiness/
  variance, contractions-per-100, sentence-start diversity) are statistical
  computations, not regex phrase-matching. "Regex, not judgment" slightly
  underclaims the mechanism's sophistication rather than overselling it, so
  it's not a deception risk — but "deterministic scoring code" is the more
  precise phrase if a technically literate reader might check the source.
- **RESOLVED as of the 2026-07-12 rewrite draft:** the "same discovery work" /
  shared-machinery conflation between SEO research and SEO measurement is fixed
  — the draft now says the measurement system "isn't the same machinery as
  research, just the same rule underneath both: check the numbers, don't
  guess." Keep checking future revisions don't regress this back to "same loop."
- **RESOLVED as of the 2026-07-12 rewrite draft:** the tone gate is now
  correctly described as "deterministic scoring code" rather than "pure regex"
  — matches the mechanism (statistical + phrase-match signals, no LLM
  discretion). Keep checking future revisions don't regress to "regex."
- **Vague scale claims about our own measured data ("the last thirty-some
  posts").** Caught in the `automate-blog-writing-with-ai-agents` rewrite
  outline (beat 3): `src/data/stats.json`'s `searchConsole.byPost` currently
  tracks 23 posts (52 posts are published total). "Thirty-some" doesn't match
  either number — it's a plausible-sounding round figure nobody checked against
  the actual file. Honest framing: either use the real tracked count (check
  `byPost` key count at draft time, it grows over time) or drop the number
  entirely ("every post I've shipped since I started tracking" — true regardless
  of count and doesn't go stale).
- **Citing the extreme end of a source's own range as if it were a flat, precise
  figure.** Caught in the `automate-blog-writing-with-ai-agents` rewrite (2026-07-12
  draft): the draft states "70% degradation on strictly sequential work" as a
  bare number attributed to Google Research's agent-scaling study. The source's
  actual finding is a *range* — "every multi-agent variant we tested degraded
  performance by 39-70%" on sequential tasks; -70% is the single worst case
  (PlanCraft), not a general result. The outline this draft was written to already
  had the correct hedge ("up to 70% degradation") and the drafter dropped the
  hedge. Honest framing: keep "up to" (or name the range) whenever a cited stat
  is the ceiling/floor of a spread, not its central tendency.
- **Guaranteeing an unbuilt/future product won't repeat a stated problem.**
  Caught in the same rewrite: closing line "The marketplace won't have that
  problem" (re: blog posts going stale) — an absolute guarantee about software
  that, per the post's own admission a paragraph earlier, doesn't fully exist
  yet ("The version I'm building toward"). Versioning/auditing reduces staleness
  risk, it doesn't guarantee it away. Honest framing: state it as intent/bet, not
  certainty — "should stay current in a way a single post can't" rather than
  "won't have that problem." **RESOLVED as of the 2026-07-12 rewrite pass:** the
  draft now reads "The marketplace should stay current in a way a blog post
  never can" — the softer modal, no longer a hard guarantee. Watch for
  regression back to "will"/"won't."
- **Narrow judgment scope described as narrow input/context ("never seen past
  its own paragraph").** Caught in the `automate-blog-writing-with-ai-agents`
  2026-07-12 rewrite: the draft claims "None of the fifteen has read the whole
  post... it's never seen past its own paragraph" about the review army. Per
  `.claude/skills/content-pipeline/SKILL.md` Step 6, every draft-mode reviewer
  is dispatched with "the draft file path, the approved outline..., the Brief"
  — the FULL draft, not a paragraph slice. `fact-checker.md`, `bullshit-detector.md`,
  `link-integrity-reviewer.md`, `seo-reviewer.md`, and `meta-content-reviewer.md`
  all structurally require reading the entire post to do their one job (facts/
  links/SEO/drift don't live in one paragraph). What's actually narrow is
  *judgment scope* — each reviewer only outputs findings on its one axis — not
  *input visibility*. Honest framing: "None of the fifteen grades outside its
  own lane — the hook reviewer can read the whole draft, but its output has no
  field for anything past the opening two sentences." Don't claim reviewers are
  blind to the document; claim they're constrained to one axis of judgment on it.
  **REGRESSED, not resolved:** the same rewrite's next editing pass reintroduced
  this exact overclaim in a new sentence — "no single reviewer in that fifteen
  can see the whole draft ... each one is deliberately blind to everything
  outside its lane." Same fix applies: reviewers see the whole draft, they're
  scoped to one axis of *output*, not one paragraph of *input*. Watch for this
  pattern recurring under new phrasing (e.g. "blind," "never sees," "only reads")
  — it keeps coming back because the vertigo-of-narrow-agents beat is genuinely
  good writing, so drafts keep reaching for the more dramatic (and false)
  version of the claim instead of the accurate one.
- **Tone-gate aiScore threshold stated wrong.** Caught in the
  `automate-blog-writing-with-ai-agents` 2026-07-12 rewrite: draft said the
  mandatory critical finding fires when "the draft's AI-ness score comes back
  above 2 out of 100." The actual threshold, per `tone-grader.ts` and
  `SKILL.md` Step 6, is `aiScore >= 15`. "2" is not a typo-adjacent number to
  "15" — it materially overstates how twitchy the gate is (implies almost any
  draft trips it) and is a checkable, specific claim about our own system that
  a technical reader could verify and catch as wrong. Honest framing: name the
  real threshold, 15, or describe it qualitatively ("well below the
  do-nothing-well ceiling") without inventing a number. **RESOLVED as of the
  2026-07-12 draft:** the drafter used the correct outline field ("15 or
  higher out of 100") even though the outline node itself still says "above
  2" — good catch by the drafter, but fix the outline's stale fact too so
  future rewrites don't inherit the wrong number from the source-of-truth
  document. Verified against code: `score += bannedHits.length * 100` (any
  banned-phrase hit hard-fails) and `aiScore: Math.round(Math.min(score,
  100))`, gated at `SKILL.md` line 231 (`banned > 0 OR aiScore >= 15`).

- **REGRESSED AGAIN — 2026-07-13 draft (second draft-stage pass, post-rewrite):**
  the clarifying sentence that fixed this in the prior draft pass ("each one
  reads the whole draft, but the hook reviewer's output has no field for...")
  is gone from this draft. The sentence now reads standalone: "Each one of
  them is deliberately narrow, trained to be blind to everything outside its
  own lane" — with zero qualification anywhere else in the "Fifteen critics"
  section. Also newly flagged: "trained to be blind" overstates the
  mechanism — these are prompt-scoped subagents (`.claude/agents/*.md`), not
  separately fine-tuned models; "trained" implies the wrong kind of process.
  Fix applied this pass: replace with "scoped to grade exactly one axis and
  nothing else," reusing the hook-reviewer example, dropping "trained." This
  is now the THIRD time this exact pattern has regressed across passes of the
  same post — treat as a standing risk for this specific piece, not just the
  pattern in general; check this section first on every future pass of this
  post before checking anything else.
- **"Blind to everything outside its own lane" ambiguity, still recurring.**
  Caught again in the `automate-blog-writing-with-ai-agents` 2026-07-12 rewrite
  (this pass): the draft's first mention of the review army reads "roughly
  fifteen single-axis reviewers read the draft, each one blind to everything
  outside its own lane" — before any clarification appears. Two paragraphs
  later the draft does correctly clarify ("Each one reads the whole draft, but
  the hook reviewer's output has no field for anything past the opening two
  sentences"), so the piece is internally consistent by the end of the
  section — but the first, unqualified use of "blind" still stands alone and
  reads exactly like the false version this ledger has flagged twice before
  (see the REGRESSED entry above). Fix: don't lead with "blind" at all — open
  with the accurate framing directly ("each one scoped to grading exactly one
  axis and nothing else") and save "blind" (if used at all) for the place
  where it's already qualified.
- **Google spam-policy claim not confirmed on the cited page.** Caught in the
  2026-07-12 rewrite: draft says "The policy names generative AI tools
  explicitly, and it doesn't care whether a human or a model wrote the
  words," citing `developers.google.com/search/docs/essentials/spam-policies`.
  WebFetched that exact page three times (different prompts) looking for the
  "regardless of automation/human vs AI" framing — it isn't there. The page
  does confirm "scaled content abuse" and names generative AI tools as an
  example ("Using generative AI tools ... to generate many pages without
  adding value for users"), but the "doesn't care whether a human or a model
  wrote it" claim is closer to Google's separate Feb 2023 Search Central blog
  post ("Google Search's guidance about AI-generated content"), which the post
  doesn't cite and which our fetch tool couldn't render (JS-heavy page).
  The underlying claim is very likely true to Google's broader public stance,
  but as written it's attributed to a source that — as far as we could verify
  — doesn't say it. Honest framing: either cite the 2023 guidance post
  alongside the spam-policies page, or narrow the claim to only what the cited
  page supports (named generative AI as an example, judged by outcome/intent
  not method).
- **CONFIRMED accurate — not a new finding, ledger cross-check.** Re-verified
  this pass: "Tone already had its own separate gate, but that was the only
  axis with a dedicated lane" (2026-07-12 draft) matches the earlier
  RESOLVED entry below — the OLD post's own 8-stage description (Research,
  Brief, Draft, Tone gate, Review pass, Hero image, Summary/digest + implicit
  topic gate) never lists `section-impact-reviewer` as a stage, even though
  `SKILL.md`'s later "what got replaced" note lumps
  Tone Gate/Review/Section-Impact/Fact-Link-Bullshit together. The comparison
  the post draws is against what the OLD POST told readers, not the full
  internal agent roster, so the claim holds. No fix needed; noting so a future
  pass doesn't re-litigate this from scratch.
- **Old pipeline's "single generalist review pass" description inflated to
  include axes it never covered.** Caught in the `automate-blog-writing-with-ai-agents`
  2026-07-12 rewrite: draft says the new 15-reviewer army "replaced an older
  setup: one cold generalist review pass that tried to catch tone and facts
  and structure and links all in the same read." Checked against the actual
  prior published post (`2026-07-13-automate-blog-writing-with-ai-agents.md`,
  now the "stale" version this rewrite explicitly references) and
  `SKILL.md`'s own list of what was replaced ("Tone Gate / Review /
  Section-Impact / Fact-Link-Bullshit steps") — tone already had its own
  separate deterministic gate even in the OLD pipeline (stage 4 of 8, distinct
  from the "Review pass" at stage 5), and the old review pass's own
  description covered facts, links, and a safety scrub — never "structure."
  Folding tone and structure into the thing being contrasted against
  overstates how monolithic the "before" state was, which inflates the size
  of the improvement. Honest framing: describe the old cold pass by what it
  actually covered (facts, links, safety in one read) and note tone was
  already split out, rather than claiming it covered everything the new army
  now covers.

- **"No person in the loop after the topic gate" stated as absolute, contradicting
  the same post's own round-cap escalation.** Caught in the outline-stage review
  of the "narrow drafter + review army" rewrite (2026-07-13 pass, hired-a-team-
  of-specialists follow-up): one beat claims "The topic-approval gate is the
  only point a human signs off; every stage after it runs without a person in
  the loop," while a later beat in the SAME outline correctly says hitting the
  three-round cap with gate findings still open "surfaces the blockers to a
  human." Per `SKILL.md` Steps 4.6/6, this escalation path is real, not
  theoretical. Honest framing: hedge the "no person in the loop" claim with
  "by default" / "unless a review loop caps out with findings still open," so
  it doesn't contradict the pipeline's own escalation beat two paragraphs
  later.
- **Osmani's "focused beats scattered" critique cited for its number, not its
  argument.** Caught in the same review: the outline cites Addy Osmani's
  code-agent-orchestra piece for "three to five teammates is the sweet spot"
  and "token cost scales linearly" to support an honest-cost paragraph about
  running fifteen draft reviewers — but doesn't engage the piece's actual
  argument against that scale. Osmani: "three focused teammates consistently
  outperform five scattered ones," and his prescribed review pattern is ONE
  capable, tool-equipped reviewer (lint/test/security-scan, read-only) per
  three-to-four builders, not many narrow single-axis critics. Fifteen
  reviewers per draft is 3x his stated sweet spot, and his own review-pattern
  recommendation cuts directly against a many-narrow-critics design — this is
  a genuine "does the source know something better" catch (see [[TD-0031]]
  and the like-button device-fingerprint precedent), not just a stat fetch.
  The defensible reconciliation (not yet in any draft): code review gates
  against objective pass/fail tools Osmani's reviewers can run; the pipeline's
  axes (hook, emotion, wordsmithing, tone) have no equivalent mechanical check,
  so splitting judgment by axis substitutes for a test suite that doesn't
  exist for prose — but that's a bet the post should state explicitly, not an
  automatic pass. Any future draft citing Osmani for the "sweet spot" number
  must also address the "focused beats scattered" / consolidated-reviewer
  argument, not just the headcount stat.

- **RESOLVED as of the 2026-07-13 outline pass ("narrow drafter + review army"
  follow-up):** the Osmani "focused beats scattered" reconciliation flagged
  above is now present in the outline (order 9) — it names the tension
  honestly ("Fifteen reviewers on one draft is well past his sweet spot") and
  offers the defensible reconciliation (axis-splitting substitutes for a test
  suite prose doesn't have) instead of just citing his headcount number. Keep
  checking future drafts don't strip this reconciliation back out.
- **Gate timing overstated as "at the very end."** Caught in the 2026-07-13
  outline pass ("narrow drafter + review army"): the top-level `hook` field
  says "one gate at the very end decides whether the whole thing gets thrown
  out." Per `SKILL.md` Step 6, the deterministic tone gate runs *before the
  first round* (before any critic sees the draft) *and again after every edit
  pass* — it's embedded in every round of the loop, not a single checkpoint
  tacked onto the end after the critics finish. The piece's own order-7 beat
  states this correctly ("it runs before the first round and again after
  every edit"), so the hook's "at the very end" framing contradicts the
  piece's own later reveal. Honest framing: describe the gate as checked
  before critics start and after every edit, not "at the very end."
- **"Audited" used unqualified for the skills marketplace.** Caught in the
  2026-07-13 outline pass: the CTA beat (order 10) calls the marketplace's
  skills "audited" with no caveat, three times (topic/ourTake/facts). Fetched
  `marketplace.buildaloud.ai` directly — it says "Every skill reviewed by AI
  for malicious intent, supply chain risks, and dangerous capabilities before
  you install it," immediately followed by its own disclaimer: "Audits are
  AI-generated and may contain errors. Always review skills yourself before
  use." Same pattern as the IP-hash/"private" entry above — "audited" implies
  a level of assurance (human review, certification) the source itself says
  isn't there. Separately, `ourTake` claimed "the audited building blocks are
  already public," conflating "the marketplace pattern exists publicly" with
  "these specific fifteen review agents used in this post are published
  there" — they're private repo agents (`.claude/agents/*.md`), not
  marketplace listings. Honest framing: "AI-audited" (not bare "audited"),
  and note the marketplace's own self-review caveat; keep "the same pattern"
  language rather than claiming these exact agents are the public artifact.

- **"Audited" bare-unqualified regressed into new outline fields even after the
  fix landed elsewhere.** Caught in the 2026-07-13 outline pass (same
  "narrow drafter + review army" rewrite): the CTA beat (order 10)'s `ourTake`
  and `facts` fields already carry the correct fix from the prior entry
  ("AI-audited-skill pattern", "those audits are AI-generated and can miss
  things"), but the beat's own `topic` ("every stage is a narrow, audited
  skill") and `intendedBeat` ("audited agent skills like these live at the
  marketplace") still use the bare, unqualified word. Since `topic` often
  becomes a heading/echoed line, the fixed nuance in facts/ourTake doesn't
  automatically propagate to it. Fix: qualify every occurrence of "audited"
  in outline metadata fields, not just the fact/ourTake fields that render
  into prose — check topic and intendedBeat too.
- **"Only human approval" absolute claim, unhedged in one field while hedged
  in a sibling field of the same outline.** Caught in the 2026-07-13 outline
  pass: order 1's `facts` states "The only human approval in the whole chain
  is the topic" with no hedge, while order 3's `facts` (same outline, same
  rewrite) correctly reads "...the only point a human signs off by default;
  every stage after it runs without a person in the loop, unless a review
  loop hits its round cap..." Order 6 later confirms the cap-out escalation
  is real. The unhedged order-1 version is the same absolute-claim-
  contradicted-later pattern flagged before (see "No person in the loop..."
  entry above) recurring in a different field of the same outline that
  already fixed it elsewhere. Fix: add "By default" to any bare restatement
  of "only human approval," even in early/hook-stage fields, without needing
  to spoil the later loop-cap reveal — "by default" alone carries enough
  hedge without explaining the mechanism. **STILL RECURRING at draft stage
  (2026-07-13 draft):** the drafter correctly hedged the paragraph-2 version
  ("The only approval I make by default...") but the stage-by-stage section's
  own restatement — "Twelve stages, and only the topic-approval gate has a
  person standing in it" — dropped the hedge again, a *third* location in the
  same rewrite carrying this exact unhedged/hedged split. This pattern keeps
  reappearing because each new paragraph that restates "only the topic gate"
  gets drafted fresh without checking earlier hedges in the same piece — treat
  it as a draft-stage check, not just an outline-stage one: grep the finished
  draft for every restatement of "only ... gate" / "only approval" and confirm
  each one carries "by default" or equivalent, not just the first.
- **Gate timing "at the end" overclaim regressed at draft stage in new
  wording.** The outline-stage "at the very end" issue (entry below) was fixed
  in the outline's hook field, but the 2026-07-13 draft reintroduced the same
  overclaim in a different sentence never audited at outline stage: "Roughly
  fifteen agents read the same draft, each one grading a single thing, plus a
  gate at the end that ignores their verdicts entirely." Per `SKILL.md` Step 6
  the deterministic tone gate runs *before the first round* and *after every
  edit pass* — never just "at the end." The draft's own order-7 beat later
  gets this right ("it runs before the first round and again after every
  edit"), so the piece contradicts itself mid-draft. Same fix as before:
  don't say "at the end"; say it runs on every pass, or drop the timing detail
  entirely and save it for the reveal beat. Watch for "at the end" / "at the
  very end" / "finally" resurfacing anywhere a new sentence casually restates
  when the gate runs, not just in the hook field this was first caught in.

- **CONFIRMED accurate — source re-verification, 2026-07-13 draft pass.**
  WebFetched all three stat sources cited in this draft directly against the
  final prose: Anthropic's 90.2% Opus-lead/Sonnet-subagent figure and the
  four-things list (objective, output format, tool/source guidance, task
  boundaries) match verbatim; Osmani's "three to five teammates" sweet spot,
  "token costs scale linearly," and "1 reviewer per 3-4 builders" (lint/test/
  security-scan, read-only) all match, and the draft's reconciliation
  (splitting axes substitutes for a prose test suite) is present, satisfying
  the earlier "focused beats scattered" finding below; Google Research's
  80.9% parallel-gain figure and the sequential range (source says "39-70%
  degradation," draft correctly hedges both figures with "up to"). No
  fabricated or mis-scoped source claims found this pass — this is the
  cleanest source-fidelity pass on this post to date. Also re-verified the
  "old pipeline as one content-reviewer (voice+SEO+marketing) plus separate
  fact-checker/link-checker" claim against
  `docs/specs/2026-07-12-document-review-fanout-design.md` line 22
  ("`content-reviewer` does voice+SEO+marketing at once") and the reuse/
  repurpose list (`fact-checker`/`bullshit-detector` reused, `link-checker`
  repurposed — i.e. already separate agents) — accurate, no inflation.
- **New, minor: "Twelve stages" undercounts the real numbered pipeline.**
  `SKILL.md`'s actual step numbering includes 10.5 (Score & Schedule), 11
  (Bookkeeping), and 11.5 (Capture product-learnings) between Assemble (10)
  and Build/Commit (12) — all real, all running before a post ships, none
  named in the draft's "twelve stages" list. Judged this an elevation, not a
  gate finding: the outline's own gateGuidance for this beat says "keep it to
  the sequence that carries meaning," which reasonably scopes "the pipeline"
  to content-shaping stages rather than post-publish bookkeeping/scoring. Flag
  for a future pass if a technically literate reader might reasonably expect
  "twelve stages" to be an exhaustive step count against the public `SKILL.md`
  — a one-clause parenthetical (a few more scoring/scheduling/logging steps
  run in the same stretch) would close the gap cheaply if ever escalated to a
  gate finding.
- **Minor rhetorical simplification, not gate-worthy: "It counts."** The
  tone-gate paragraph's closer ("A mechanical scorer can't be charmed. It
  doesn't read the sentence and admire it. It counts.") is a colloquial
  simplification of a scorer that also computes statistical signals
  (burstiness, contractions-per-100, sentence-start diversity), not just a
  banned-phrase tally — same shape as the earlier "pure regex" finding below,
  but milder since "counts" is metaphorical framing rather than a specific,
  checkable technical claim like "regex." Left as an elevation ("it runs the
  numbers" reads equally punchy and doesn't imply literal tallying).

## "Strength word" watchlist

Superlatives to challenge unless the mechanism truly earns them: *bulletproof,
solves, guarantees, private, anonymous, zero-config, seamless, fully automated*.
The honest word is usually *reduces, usually, mostly, most of the time*.

## Sources we've misread (don't repeat)

- _(add each source + how we misread it + the correct reading)_
- **Not a misread, but a caveat worth carrying forward:** Rankability's
  "does Google penalize AI content" piece (83% human-written figure) explicitly
  calls itself "a directional study with a focused sample, not a definitive
  analysis," and attributes ranking differences to effort/quality signals
  (E-E-A-T), not AI-detection per se. Our posts correctly avoid claiming Google
  detects/penalizes "AI-ness" directly (we say low-effort AI content hurts
  ranking, which the source does support) — keep that distinction sharp in any
  future draft that leans on this source.

- **REGRESSED — "same loop" / "same discovery work" conflation is back, in a NEW
  outline (2026-07-13, "narrow drafter + review army" follow-up, formerly
  flagged and marked RESOLVED on 2026-07-12).** Order-3 beat's `ourTake` says
  "Research feeds the same loop that measures whether a post is actually
  working, so discovery and measurement aren't separate systems," and its
  `facts` restates it as "The research stage feeds the same loop used to
  measure post performance." Re-verified against code this pass:
  `.claude/agents/seo-researcher.md` still has zero references to
  `stats.json`/GSC/GA4/`searchConsole`; the only `stats.json` reconciliation
  in `SKILL.md` is the drip-scheduler's "Learning loop" (predictions vs
  actual views/impressions/clicks/position), unrelated to `seo-researcher`.
  They remain two separate systems with no shared code or data path. Same fix
  as the earlier RESOLVED entry: don't claim shared machinery — "different
  code, different data, same rule: check the numbers before you guess."
  Outline-writing keeps reaching for "same loop" because it's a tidier line
  than the honest one — check for this specific phrase ("same loop," "aren't
  separate systems," "feeds the same...") on every future pass of any post
  describing both the research and measurement stages together, not just this
  one post.
- **New regression, same post: absolute "no human in the loop" claim recurring
  in a THIRD/FOURTH field of the same 2026-07-13 outline.** Order-1 `facts`
  ("Everything after topic approval runs without a human in the loop.") and
  order-3 `facts` ("The topic-approval gate is the only human checkpoint;
  everything downstream is automated.") both drop the "by default" hedge,
  while order-6 in the SAME outline correctly states the round-cap-to-human
  escalation. Verified against `SKILL.md` lines 188-191 and 286-289: the
  escalation is real for both the outline loop and the draft loop. This is
  now confirmed recurring across outline AND draft stages of this post
  across at least four prior passes — treat "only human checkpoint" / "no
  human in the loop" as a standing grep target for this post specifically.
  Worth noting: the already-PUBLISHED sibling post
  `src/content/blog/2026-07-19-ai-automation-stack.md` line 42 carries the
  same unhedged claim ("Chad picks the topic. That's it. Nothing past that
  point gets a human set of eyes before it ships.") — out of scope for this
  review (different post, already shipped) but flagging so a future pass of
  THAT post catches it too.
- **"Audited" bare-unqualified regressed a second time, now in a fresh outline
  for the SAME CTA beat.** The 2026-07-13 outline's order-11 (CTA) has the
  bare word in all four fields again — `intendedBeat` ("the audited Skills
  Marketplace," "what audited agent skills actually look like"), `ourTake`
  ("real, audited skills you can look at"), and `facts` ("hosts audited agent
  skills"). Re-fetched `marketplace.buildaloud.ai` this pass to confirm the
  caveat still stands verbatim: "Every skill reviewed by AI for malicious
  intent, supply chain risks, and dangerous capabilities before you install
  it" / "Audits are AI-generated and may contain errors. Always review skills
  yourself before use." Same fix as before — "AI-audited," plus the
  self-review caveat somewhere in the beat, in every field, not just one.
  This CTA beat specifically seems to regenerate from scratch each rewrite
  pass without inheriting the earlier fix — worth flagging to Chad if it
  recurs a third time, since ledger-only fixes aren't sticking for this exact
  beat.

- **NEW — round cap stated wrong ("three rounds" vs the actual 5).** Caught in
  the 2026-07-13 outline pass (outline-stage review of the
  "automate-blog-writing-with-ai-agents" rewrite, post-redesign version).
  Five separate fields across order-4 and order-6 state the outline/draft
  review loops are "capped at three rounds": order-4 `ourTake` ("fixpoint
  loop capped at three rounds"), order-4 `facts` ("capped at three rounds"),
  order-6 `intendedBeat` ("Loop until zero gate findings or three rounds"),
  order-6 `ourTake` ("or at three rounds"), order-6 `facts` ("capped at three
  rounds"). Verified against BOTH `SKILL.md` ("Round (repeat until converged
  or round cap 5):" — appears identically at Step 4.6 and Step 6) and
  `docs/specs/2026-07-12-document-review-fanout-design.md` ("cap 5, gate=0"
  in the architecture diagram, plus "The round cap (5) — enforced by the
  loop's own round counting" in the Runs-as section). The real cap is 5, not
  3, for both loops. This is exactly the kind of checkable, specific claim
  about our own system a technical reader could verify and catch wrong (same
  shape as the earlier "aiScore >= 2" mis-threshold finding). Honest framing:
  "capped at five rounds" everywhere this appears. Watch for "three rounds"
  specifically recurring in future passes of this post — it reads like a
  plausible-sounding round number nobody checked against the actual code, the
  same failure mode as the earlier "thirty-some posts" entry above.

- **CONFIRMED — 2026-07-13 outline pass (post-redesign "How I Automate Blog
  Writing With AI Agents (Not the Draft)" outline, twelve-stage version).**
  Multiple standing patterns are now correctly resolved in this outline: round
  cap stated as "five rounds" everywhere (order-4, order-6) — no "three
  rounds" recurrence; the "blind to everything outside its lane" overclaim is
  gone entirely — order-5's `intendedBeat`/`ourTake`/`facts` all correctly say
  each reviewer "reads the whole draft" and is scoped to one axis of output,
  never "blind"; "audited" is qualified as "AI-audited" plus the self-review
  caveat in ALL FOUR CTA fields (topic, intendedBeat, ourTake, facts) for the
  first time — previous passes fixed some fields but not others. Re-verified
  by direct WebFetch this pass: Anthropic's 90.2% figure, 4x/15x token
  multipliers, and four-subagent-elements list; Google Research's 80.9%
  parallel gain and 39-70% sequential-degradation range; Google's live
  spam-policy page's scaled-content-abuse definition and generative-AI
  mention — all match the outline's claims verbatim, no misattribution.
- **NEW — top-level `hook` field regresses the "only human checkpoint"
  hedge into a fifth location.** The 2026-07-13 outline's meta `hook` field
  reads "I sign off on exactly one of them" with no "by default" hedge, while
  the SAME outline's order-1 `facts` and order-3 `facts` correctly hedge the
  identical claim, and order-6 confirms the round-cap-to-Chad escalation is
  real. This is the same standing pattern (see "'Only human approval'
  absolute claim..." entry above) recurring in a NEW field never previously
  checked — the meta `hook`/`point`/`flare` block, not just paragraph-level
  `facts`. Fix: add "By default" to any bare restatement of "I sign off on
  exactly one," even in the meta block. Grep target going forward: check
  meta fields (point/hook/flare), not just paragraphs[].facts, for this
  post specifically.
- **NEW — "no judgment call involved" overclaims link-integrity-reviewer's
  actual job, right next to the story that warns against exactly this
  assumption.** Caught in the 2026-07-13 outline (order-5 `ourTake`): "The one
  reviewer here running on a cheaper tier draws a narrower line: link-integrity
  is a mechanical yes-or-no check with no judgment call involved." Checked
  `.claude/agents/link-integrity-reviewer.md` — its job includes cross-checking
  a canonical map for wrong-target drift and "anchor sanity — link text must
  not contradict the destination," both of which require reading and
  interpreting text, not pure binary resolution (only the curl-status and
  future-date checks are truly mechanical). This sits two sentences after the
  outline's own retelling of the Haiku-vs-Sonnet audit story (a cheap model
  missing a subtle, judgment-requiring finding) — the framing invites exactly
  the skepticism the post just modeled. Honest framing: describe
  link-integrity's checks as "mostly binary" (resolves, anchor matches, dated
  before this post) rather than claiming zero judgment, so it doesn't
  contradict the lesson the post itself just told two sentences earlier.

- **NEW beat, same old pattern: "everything after drafting folded into one
  named 'review' stage" — regression of the "old pipeline collapsed into one
  generalist pass" overclaim, now in a brand-new self-correction beat.** Caught
  in the 2026-07-13 outline pass for the same post (this outline adds a new
  order-2 beat, "Correcting my own earlier description," not present in prior
  passes). Its `facts` field states: "The earlier revision of this post
  described the pipeline as eight stages with seven model agents, with
  everything after drafting folded into one named 'review' stage." Read the
  actual old post (`src/content/blog/2026-07-13-automate-blog-writing-with-ai-agents.md`)
  directly — its 8-stage list has Tone gate (stage 4) and Review pass (stage 5)
  as two SEPARATE named stages, plus Hero image (6), Summary/digest (7), and
  Assembly (8) also separate. Only facts+links+a safety scrub were combined
  into the one "Review pass" — tone, hero image, summary/digest, and assembly
  were never folded into it. Same shape as the earlier "old pipeline's 'single
  generalist review pass' description inflated" entry above — this is that
  exact pattern recurring in a new beat that didn't exist in earlier passes, so
  it evaded the earlier fix. Honest framing: name what was actually distinct
  even in the old pipeline (tone had its own gate) and what was actually
  combined (facts, links, safety scrub in one "Review pass"), rather than
  claiming "everything after drafting" collapsed into one stage. This beat is
  new territory (self-referential post-history correction) — check it fresh on
  every future pass rather than assuming the general pattern's earlier fixes
  cover it.
- **CONFIRMED — 2026-07-13 outline pass, second review (order 2 through 11 of
  the "How I Automate Blog Writing With AI Agents (Not the Draft)" outline).**
  Beyond the order-2 regression above, everything else checked clean this
  pass: "by default" hedge present on every "only human checkpoint" restatement
  including the top-level `hook` field; round cap "five rounds" everywhere;
  no "blind" language anywhere in order 5; link-integrity described as "mostly
  binary," not "no judgment call"; "AI-audited" + self-review caveat present
  in all CTA fields; the protected sentences ("The gate I trust most is the
  one with no opinion," "and I pay that bill on every post") both present
  verbatim. Direct WebFetch re-verification this pass, all accurate: Anthropic's
  90.2% figure, all four subagent elements (objective/output format/tool
  guidance/task boundaries), the 4x/15x token multipliers, and the "spawning 50
  subagents for simple queries" quote (`anthropic.com/engineering/multi-agent-research-system`);
  Google Research's 80.9% parallel-gain figure and the 39-70% sequential
  range with PlanCraft correctly described as requiring "strict sequential
  reasoning" (`research.google/blog/towards-a-science-of-scaling-agent-systems...`);
  Google's live spam-policy page's scaled-content-abuse definition and its
  generative-AI example (`developers.google.com/search/docs/essentials/spam-policies`);
  the marketplace's audit disclaimer verbatim ("Audits are AI-generated and
  may contain errors. Always review skills yourself before use.",
  `marketplace.buildaloud.ai`). No fabricated or mis-scoped source claims
  found outside the order-2 regression noted above.
- **Minor elevation, not gate-worthy: Google's generative-AI mention framed as
  "separately" named.** Order-10 `facts` says Google's spam-policy page
  "separately names using generative AI tools" — per direct fetch, the
  generative-AI line is actually the FIRST EXAMPLE listed under the same
  scaled-content-abuse definition, not a distinct/separate policy point.
  "Separately" slightly overstates its independence from the definition it's
  actually part of. Low stakes since the underlying claim (Google does name
  generative AI as an example) is accurate — flagged as an elevation for a
  future pass, not a gate finding this time.

- **CLEAN PASS — 2026-07-13 outline review (this pass, "How I Automate Blog
  Writing With AI Agents (Not the Draft)," twelve-stage / order-1-through-11
  outline).** Zero gate findings. Every standing pattern checked clean: "by
  default" hedge present everywhere "only human checkpoint" is restated
  (meta hook, order-1, order-3 facts); round cap correctly "five rounds"
  everywhere (order-4, order-6), confirmed against `SKILL.md` lines 165/254
  ("round cap 5" appears identically for both the outline loop and the draft
  loop); no "blind to its lane" language anywhere in order-5, which correctly
  says each reviewer "reads the entire draft but files findings on one axis
  only"; link-integrity described as "mostly binary," not "no judgment call";
  order-2's self-correction beat accurately describes the OLD post (re-read
  `src/content/blog/2026-07-13-automate-blog-writing-with-ai-agents.md`
  directly this pass — confirmed tone gate was stage 4, Review pass was stage
  5 and combined facts+links+safety-scrub only, matching the outline's
  claim verbatim); "AI-audited" + self-review caveat present in the CTA beat
  (order-11). Fresh WebFetch re-verification this pass (not just ledger
  trust) of all four external sources: Google Research's 80.9%
  parallel-gain figure and 39-70% sequential-degradation range (exact
  quote confirmed); Anthropic's 90.2% figure, all four subagent elements
  (objective/output format/tool-source guidance/task boundaries), and the
  4x/15x token multipliers; Google's live spam-policy page — confirmed the
  generative-AI line is the FIRST example under the scaled-content-abuse
  definition (order-10's phrasing "first example under that same
  definition" is now accurate, fixing the earlier "separately names"
  elevation); marketplace.buildaloud.ai's audit disclaimer verbatim. Also
  fresh-verified against code (not just re-trusting the ledger): outline
  schema (`outline-schema.ts`) matches order-4's "meta block + ordered
  paragraph nodes with goal/facts/sources/keyword/links/gate guidance"
  description field-for-field; `review-disposition.ts` confirms hook
  findings default to advisory, escalate to gate only when missing/broken,
  matching order-6; `tone-grader.ts` confirms `score += bannedHits.length *
  100`, `aiScore: Math.round(Math.min(score, 100))`, and the `aiScore<15
  gate` comment, matching order-7's "15 or above out of 100" and "adds 100
  points, reported score capped at 100" framing; `SKILL.md` confirms the
  de-tell cleanup pass caps at 2 attempts; agent frontmatter confirms
  link-integrity-reviewer is the only Haiku reviewer, all 30 others
  (including meta-content-reviewer) are Sonnet, matching order-5. This is
  the cleanest pass on this post to date — every previously-tracked
  regression pattern held.
- **Elevation-worthy, not gate: the Osmani "focused beats scattered"
  reconciliation is gone from this outline's honest-limits beat (order 9).**
  A prior pass of this same post added Osmani's counter-argument (his
  "three focused teammates outperform five scattered ones" critique, and his
  one-capable-reviewer-per-3-4-builders pattern, which cuts against a
  15-reviewer design) as a required reconciliation and the ledger marked it
  RESOLVED with an explicit instruction to "check future drafts don't strip
  this back out." This outline's order-9 honest-limits beat now cites
  different, still-accurate sources instead (Google Research's
  parallel-vs-sequential study, Anthropic's token-cost multipliers) and
  doesn't mention Osmani or reviewer count at all. Not a gate finding — the
  current beat is honest on its own terms and doesn't misrepresent any
  source — but it does mean the specific "is fifteen discrete critics too
  many, per a source that argued exactly that" question isn't addressed
  anywhere in the post anymore. Worth reconsidering if this keeps
  alternating pass to pass; flagged as an elevation this round.

- **"AI-audited" qualifier established once, then dropped to bare "audited" twice
  in the same CTA paragraph — now confirmed at DRAFT stage, not just outline.**
  Caught in the 2026-07-13 draft-stage pass of "How I Automate Blog Writing With
  AI Agents (Not the Draft)." The CTA section opens correctly ("a catalog of
  AI-audited agent skills") but the very next clause drops the qualifier —
  "each one audited before it gets listed" — and a few sentences later, "which
  is exactly what gets audited," both bare, before the disclaimer sentence
  ("audits are AI-generated and can miss things") finally arrives. Re-fetched
  `marketplace.buildaloud.ai` this pass to confirm the site's own language:
  "Every skill reviewed by AI for malicious intent, supply chain risks, and
  dangerous capabilities before you install it" / "Audits are AI-generated and
  may contain errors. Always review skills yourself before use." Prior passes
  fixed this at the outline-metadata level (topic/intendedBeat/ourTake/facts
  all qualified), but the fix didn't survive drafting — this is the first
  confirmed instance of the pattern surviving all the way into rendered prose.
  Fix applied this pass: qualify both bare instances ("each one AI-audited
  before it gets listed"; "which is exactly what gets AI-audited"). This CTA
  beat needs a draft-stage grep for bare "audited" (not just outline-stage),
  every future pass, until it stops regressing.
- **CLEAN — draft-stage source re-verification, 2026-07-13 pass (same post,
  rendered prose, not outline).** Fresh WebFetch of all three riskiest sources
  this pass: Google's live spam-policy page's scaled-content-abuse definition
  ("many pages are generated for the primary purpose of manipulating search
  rankings and not helping users") matches the draft's paraphrase closely, and
  generative AI tools are confirmed as an example within that same section, not
  a separate policy point — the draft's "in that same section" framing is
  accurate; Anthropic's 90.2% figure, the four subagent-description elements
  (objective, output format, tool/source guidance, task boundaries), and the
  4x/15x token multipliers all match verbatim; marketplace.buildaloud.ai's
  audit description and disclaimer match verbatim (see finding above for the
  one place this wasn't carried through consistently). Also verified two
  claims not previously checked at this level of detail: "security-kit runs
  six sub-agents across eight phases" matches
  `2026-07-10-claude-security-team-that-remembers.md` exactly ("Six sub-agents
  split across eight phases"); the AST v1.0 rewrite description ("two-axis
  danger model... to three separate scores rolled into one exposure number")
  matches `2026-02-22-we-rewrote-the-security-scoring-here-s-why.md` exactly
  ("two-axis danger model," "three independent scores," "single exposure
  number"). No other standing pattern (round cap, "blind," gate timing,
  aiScore threshold, "no human in the loop" hedge, link-integrity "no
  judgment call," protected sentences) regressed in this draft — all checked
  clean.

- **CLEAN PASS — 2026-07-13, draft-mode review of "How I Automate Blog Writing
  With AI Agents Without Touching the Draft" (rendered prose, twelve-stage /
  fifteen-reviewer version).** Zero gate findings. Every standing pattern held:
  "by default" hedge present on all "only human checkpoint" restatements (hook
  paragraph and the stage-list paragraph both hedged); round cap "five rounds"
  everywhere (outline loop and draft loop); no "blind" language anywhere in the
  fifteen-reviewer section — states plainly "reads the entire draft but grades
  exactly one thing"; link-integrity described as "mostly binary," never "no
  judgment call"; "AI-audited" (not bare "audited") in every CTA occurrence,
  disclaimer present; aiScore threshold correctly "15 or above out of 100";
  gate timing correctly "before the first review round and again after every
  edit pass," never "at the end"; both protected sentences present verbatim
  ("Catching a broken structure at the outline costs an outline. Catching it
  after a full draft costs a rewrite." and "I pay that bill on every post.");
  "same loop"/"same discovery work" conflation between SEO research and SEO
  measurement did not recur — draft correctly frames it as "the same 'measure
  it, don't guess' habit," not shared machinery; the order-2 self-correction
  beat stayed accurate and stayed short (didn't re-claim the old pipeline
  folded everything into one review stage). Fresh WebFetch this pass (not just
  ledger trust) of the two highest-misquote-risk sources: Google's live
  spam-policy page (scaled-content-abuse definition verbatim, generative AI
  confirmed as the first example under that same definition, not a separate
  point) and Rankability's 83%-human-written figure with its directional/
  focused-sample caveat — both match the draft's claims exactly.
- **Elevation, recurring: Osmani's "focused beats scattered" reconciliation is
  absent again.** Not cited in this draft's Sources at all (previous passes
  alternated between including and dropping it — see the two entries above).
  Since check 5 (mine the source for a better answer) applies to *cited*
  sources and Osmani isn't cited here, this isn't a gate finding this pass,
  but it's worth flagging again as an elevation: a real counter-argument
  (fewer, more capable, tool-equipped reviewers beat many narrow ones, per
  Osmani's own review-pattern recommendation) sits unaddressed in a post
  explicitly built around a many-narrow-reviewer design. Recommended
  reconciliation text is already drafted in the entries above — reuse it if
  this keeps alternating pass to pass.
- **New minor elevation: an internal link promised in prose but not delivered.**
  "here's the routing logic, if you want it" (Sonnet/Haiku routing paragraph)
  reads as a pointer to further detail but has no markdown link attached, and
  `/blog/2026-07-18-which-claude-model-to-use/` (present in this beat's
  approved outline `links` field) doesn't appear anywhere in the rendered
  draft or its Sources footer. Not a gate finding since the routing logic is
  actually explained in the very next sentences — no unfulfilled factual
  claim, just an unfulfilled link. Worth an editor pass regardless.

- **"Only human checkpoint" hedge regression, SIXTH location, new phrasing —
  2026-07-13 draft-mode bullshit-detector pass.** The stage-walkthrough
  section ("Twelve stages, most handed to an AI agent") correctly hedges the
  topic gate itself ("The topic gate is the one I hold by default") but the
  very next sentence restates the no-human-downstream claim unhedged: "Past
  it, I'm out of the room until the post is live." This is the same standing
  pattern (see "'Only human approval' absolute claim..." and its several
  prior entries) recurring in a NEW sentence/phrasing that doesn't use the
  word "only" or "approval" — it's an absolute claim about being "out of the
  room" with no acknowledgment of the round-cap-to-Chad escalation stated
  elsewhere in this same post. Fix applied this pass: "Past it, I'm out of
  the room by default until the post is live." Grep target going forward:
  any sentence claiming the author is fully absent/out-of-the-loop after the
  topic gate, not just sentences using "only"/"approval" literally — this
  post keeps finding new phrasings for the same unhedged claim.
- **CLEAN — fresh WebFetch re-verification, 2026-07-13 draft-mode
  bullshit-detector pass.** Re-fetched both of this post's highest-misquote-
  risk live sources directly against the rendered draft (not just trusting
  the ledger): Google's spam-policy page — confirmed "Scaled content abuse is
  when many pages are generated for the primary purpose of manipulating
  search rankings and not helping users" verbatim, and confirmed the
  generative-AI mention is "the first bullet point example under scaled
  content abuse, not... its own distinct policy category" — the draft's "in
  that same section" framing is accurate, no misattributed quote.
  marketplace.buildaloud.ai — confirmed the audit description ("Every skill
  reviewed by AI for malicious intent, supply chain risks, and dangerous
  capabilities before you install it") and disclaimer ("Audits are
  AI-generated and may contain errors. Always review skills yourself before
  use.") both verbatim, and the draft's "AI-audited" qualifier + disclaimer
  sentence both present correctly in the CTA section this pass. Every other
  standing landmine for this post (round cap 5, aiScore>=15, gate-timing not
  "at the end," no "blind" language, mostly-binary link-integrity framing,
  12-stage count with assemble/commit separate, "most handed to an AI agent"
  not "every stage," AST v1.0 two-axis→three-score description, both
  protected sentences present) checked clean in this revision — only the new
  "out of the room" unhedged restatement above was a gate finding this pass.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited in this revision's Sources.** Same
  standing gap as prior passes — a real counter-argument (Addy Osmani's own
  agent-teams writeup: "three focused teammates consistently outperform five
  scattered ones," and his prescribed review pattern is one capable,
  tool-equipped reviewer per 3-4 builders, not fifteen narrow single-axis
  critics) sits unaddressed in a post built entirely around a many-narrow-
  reviewer design. Not a gate finding since check 5 only applies to sources
  this draft actually cites, and Osmani isn't cited here. Recommended
  reconciliation text (reuse if this keeps alternating pass to pass): "his
  reviewers lean on objective pass/fail tools (lint, test, security-scan)
  that don't exist for prose, so splitting judgment by axis substitutes for
  the test suite writing doesn't have — a bet worth stating plainly, not
  assuming away."

- **CLEAN PASS — 2026-07-13, DRAFT-mode bullshit-detector review of "How I
  Automate Blog Writing With AI Agents Without Touching the Draft" (this
  specific rendering: opens "Twelve stages run before one of these posts
  ships...", "twelve stages, most handed to an AI agent" list, "Decision one" /
  "Decision two" H2s, "The gate I trust most is the one with no opinion" H2).**
  Zero gate findings — every standing pattern checked clean, including several
  that had regressed multiple times in earlier passes of this same post: "by
  default" hedge present on all three "only human checkpoint" restatements
  (opening hook, stage-list section, and "Past it, I'm out of the room by
  default until the post is live"); round cap "five rounds" both places
  (outline loop and draft loop); no "blind" language anywhere in the
  fifteen-reviewer section, which correctly reads "reads the entire draft but
  grades exactly one axis"; link-integrity described as "mostly binary,"
  never "no judgment call"; "AI-audited agent skills" used at first mention
  in the CTA with "screened" (not bare "audited") immediately after, plus the
  disclaimer sentence present; aiScore threshold correctly "15 or above out
  of 100," with "each banned phrase adds 100 points" correctly framed as the
  internal-scoring mechanism (reported score capped at 100); gate timing
  correctly "before the first review round and again after every edit pass,"
  never "at the end"; twelve-stage count has Assemble and Commit as two
  separate list items, tone gate folded into the draft-review-loop entry (not
  its own list item); both protected sentences present verbatim ("Catching a
  broken structure at the outline costs an outline. Catching it after a full
  draft costs a rewrite." and "And I pay that bill on every post."); the
  order-2 self-correction beat stayed short (2 sentences) and didn't re-claim
  the old pipeline folded everything into one review stage. New nice touch
  this pass: the "twelve stages" section now explicitly explains why
  SEO-scoring/bookkeeping/logging steps don't count toward the twelve ("None
  of them touch a word of the draft, so none of them make the count") —
  closes the "New, minor: twelve stages undercounts" elevation from an
  earlier pass without being asked. Fresh WebFetch re-verification this pass
  (not just ledger trust) of the two highest-misquote-risk sources: Google's
  live spam-policy page — "Scaled content abuse is when many pages are
  generated for the primary purpose of manipulating search rankings and not
  helping users" verbatim, generative AI confirmed as the first bullet
  example under that same definition, not a separate policy point, matching
  the draft's "That same section names generative AI tools specifically";
  Rankability's 83%-human-written figure and its "directional study with a
  focused sample, not a definitive analysis" caveat, both verbatim, matching
  the draft's framing exactly.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited in this draft's Sources.** Same
  standing gap as every prior pass — see the reconciliation text already
  drafted in earlier entries above. Not a gate finding since check 5 only
  applies to sources the draft actually cites.
- **Elevation, still recurring: two internal links present in the approved
  outline's `links` field for the Sonnet/Haiku routing beat
  (`/blog/2026-07-18-which-claude-model-to-use/`) and the CTA beat
  (`/blog/2026-07-21-hired-a-team-of-specialists/`) don't appear in the
  rendered prose or the Sources footer.** Both are referenced only as bare
  promises ("That's deliberate routing" / "I'll dig into that specialist
  pattern itself in a companion post") with no markdown link attached. Not a
  gate finding — no false claim, the content is fully explained inline either
  way — but worth an editor pass since the outline explicitly lists them as
  links for this beat.

- **CLEAN PASS — 2026-07-13, DRAFT-mode bullshit-detector review, this specific
  rendering (opens "Twelve stages run before one of these posts ships...",
  adds "with the model lineup they had in June 2025" to the Anthropic beat,
  "But it only scores at the start of each round" framing in the tone-gate
  section).** Zero gate findings. Every standing pattern held: "by default"
  hedge present on all three "only human checkpoint" restatements (opening
  hook, stage-list section "Past it, I'm out of the room by default until the
  post is live", and the round-cap escalation stated explicitly); round cap
  "five rounds" both places; no "blind" language in the fifteen-reviewer
  section; link-integrity "mostly binary," never "no judgment call"; aiScore
  threshold correctly "15 or above out of 100," "adds 100 points" correctly
  framed as internal-scoring mechanism; gate timing never "at the end" —
  the "runs before the first round and again after every edit pass... but it
  only scores at the start of each round" framing is a direct, accurate
  paraphrase of `SKILL.md`'s own two ways of describing the same timing
  (Step 6 header text + the "Final tone confirmation" section: "The loop
  scores tone at the START of each round, so the LAST editor pass is never
  re-scored") — reads a little redundant but is not a contradiction, verified
  against `SKILL.md` lines 228-230 and 293-295; twelve-stage count has
  Assemble/Commit separate, tone gate folded into the draft-review-loop list
  item; "AI-audited agent skills" + "screened" (not bare "audited") + the
  disclaimer sentence present in the CTA; both protected sentences present
  verbatim ("Catching a broken structure at the outline costs an outline.
  Catching it after a full draft costs a rewrite." and "And I pay that bill
  on every post."). New detail this pass, verified rather than assumed: "with
  the model lineup they had in June 2025" (Anthropic beat) — WebFetched
  `anthropic.com/engineering/multi-agent-research-system` directly, confirmed
  publish date June 13, 2025, so the added specificity is accurate, not
  invented. Fresh WebFetch this pass of all three riskiest external sources:
  Google Research's 80.9% parallel-gain figure and "39-70%" sequential range
  (exact quote confirmed, draft correctly avoids a flat "70%"); Google's live
  spam-policy page (scaled-content-abuse definition verbatim, generative AI
  confirmed as an example within the same section); Rankability's 83%
  figure with its "directional study with a focused sample, not a definitive
  analysis" caveat verbatim. Also re-verified marketplace.buildaloud.ai's
  audit description and disclaimer verbatim.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited in this draft's Sources.** Same
  standing gap as every prior pass. Recommended reconciliation text (reuse if
  this keeps alternating pass to pass): "his reviewers lean on objective
  pass/fail tools (lint, test, security-scan) that don't exist for prose, so
  splitting judgment by axis substitutes for the test suite writing doesn't
  have — a bet worth stating plainly, not assuming away."
- **Elevation, still recurring: two internal links present in the approved
  outline's `links` field don't appear in the rendered prose.** "That's
  deliberate routing" (Sonnet/Haiku beat) has no link to
  `/blog/2026-07-18-which-claude-model-to-use/`, and "I'll dig into that
  specialist pattern itself in a companion post" (same beat) has no link to
  `/blog/2026-07-21-hired-a-team-of-specialists/`. Both claims are fully
  explained inline either way, so not a gate finding — but the outline lists
  both as links for this beat and neither made it into this draft, again.

## Standing rule

When the honest fix is in the code, not the copy (the thing is genuinely weaker
than it should be), don't just soften the sentence — flag a product ticket so
the build improves and the post can then tell the better story ([[TD-0031]]).
