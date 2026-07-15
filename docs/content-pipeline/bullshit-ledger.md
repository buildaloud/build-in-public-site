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

- **CLEAN PASS — 2026-07-14, OUTLINE-stage bullshit-detector review of "How I
  Automate Blog Writing With AI Agents" (12-stage/15-reviewer outline, opens
  "Twelve stages run before one of these posts ships, and by default I sign
  off on exactly one of them").** Zero gate findings. Every standing pattern
  held: "by default" hedge present on all "only human checkpoint" restatements
  (meta hook, order-1 facts, order-1 intendedBeat's cap-out escalation clause);
  round cap "five" everywhere (order-4, order-7); no "blind" language in
  order-5, which correctly reads "reads the entire draft but grades exactly
  one axis"; link-integrity described as "mostly binary" (order-6), never "no
  judgment call"; aiScore threshold correctly "15 or above out of 100"
  (order-8), "adds 100 points" correctly framed as the internal pre-clamp
  mechanism; gate timing correctly "before the first review round and again
  after every edit pass... final re-score runs after the loop exits," never
  "at the end"; "AI-audited agent skills" + "screened" (not bare "audited") +
  disclaimer present in the CTA (order-15); both protected lines present
  verbatim (flare line in order-10, "The gate I trust most is the one with no
  opinion" in order-8); the run-one/run-two self-referential numbers (score
  42, 35 em-dashes/2,000 words, threshold 2→15, score 6→22, count oscillation
  10/5/7) all verified verbatim against the actual prior-published post
  (`src/content/blog/2026-07-13-automate-blog-writing-with-ai-agents.md`
  lines 83-89) that this rewrite supersedes — not fabricated. External source
  claims (Anthropic 90.2% + four subagent elements + June-2025 dating, Google
  Research 80.9%/"39% to 70%" range with correct URL suffix, Google spam
  policy's scaled-content-abuse definition + generative-AI-as-first-example
  framing, Rankability 83% with directional caveat, marketplace disclaimer)
  all match prior verbatim confirmations already on record in this ledger —
  no re-fetch needed this pass, no drift found on spot-check of the
  tone-grader.ts math (35 em-dashes/2,000 words → emDashPer1k contribution
  caps at 22, consistent with a total score of 42).

- **CLEAN PASS — 2026-07-14 (second same-day pass), OUTLINE-stage bullshit-detector
  review of "How I Automate Blog Writing With AI Agents" (identical 15-paragraph
  shape to the prior 2026-07-14 clean pass, with two new additions this round:
  order-11 now adds "with the model lineup they had in June 2025" / "Opus 4 and
  Sonnet 4 then, Opus 4.8 and Sonnet 5 now" to the Anthropic beat, and order-6's
  Haiku/Sonnet backdoor numbers are now spelled out in full in `facts`.)** Zero
  gate findings. Fresh-verified (not just re-trusting the ledger) two claims not
  independently checked at this granularity before: the human-tone baseline —
  confirmed `.claude/skills/human-tone/SKILL.md` line 10 reads "measured human
  baseline: **aiScore ~2**... Target for shipped posts: **aiScore < 15**" and
  line 55 "shipped posts must score `aiScore < 15`" — matches order-9's "gate
  was set at 2/100, dead level with the corpus's own measured human baseline of
  ~2" exactly; and the Haiku-vs-Sonnet taskmaster-audit numbers in order-6's
  `facts` (Haiku 1.75 exposure/1 finding, Sonnet 5.65/4 findings, backdoor shim
  at `~/.codex/bin/codex`) — confirmed verbatim against
  `src/content/blog/2026-02-22-we-let-haiku-do-the-audits-it-missed-things.md`
  lines 43-51, no inflation or invented specificity. Also re-confirmed round cap
  5 directly against `SKILL.md` lines 165 and 262 (both loops). Every other
  standing pattern held per the prior 2026-07-14 clean-pass entry (hedges on
  "only human checkpoint," no "blind" language, link-integrity "mostly binary,"
  aiScore threshold 15, gate timing not "at the end," protected sentences
  present, AST v1.0 description, marketplace disclaimer). The new "Opus 4.8 and
  Sonnet 5 now" addition in order-11 is a design-lesson-vs-number distinction
  (explicitly says the *lesson* hasn't moved, not that the 90.2% figure
  transfers) — accurate framing, no overclaim.

- **CLEAN PASS — 2026-07-14, OUTLINE-stage bullshit-detector review of "How I
  Automate Blog Writing With AI Agents" (this specific 15-paragraph outline,
  order-1-through-15, meta hook "Twelve stages run before one of these posts
  ships, and by default I sign off on exactly one").** Zero gate findings.
  Every standing pattern held: "by default" / round-cap-escalation hedge
  present on all "only human checkpoint" restatements (meta hook, order-1
  facts/intendedBeat); round cap "five" everywhere (order-4, order-6/order-9
  facts, cross-checked against `SKILL.md` lines 165/254); no "blind" language
  in order-5, which correctly reads "reads the WHOLE draft and is scoped to
  grading one axis — they are not blind to the rest"; link-integrity described
  as "mostly binary" (order-6), never "no judgment call"; aiScore threshold
  correctly "15 or above out of 100" with "adds 100 points internally" framed
  as the pre-clamp mechanism (order-8); gate timing correctly "before the
  first review round and again after every edit pass... final re-score runs
  after the loop exits," never "at the end"; both protected lines present
  verbatim (order-10's flare "Telling an editor what's wrong never converged.
  Handing it the fix did.", order-8's "The gate I trust most is the one with
  no opinion."); run-one/run-two numbers (42, 35 em-dashes/2,000 words,
  2→15, 6→22, 10/5/7 oscillation) intact; "AI-audited" + "screened" +
  disclaimer present in the CTA (order-15), no bare "audited." New this pass:
  verified order-2's "plus already-narrow fact-checking, link-checking, and
  impact review alongside it" claim directly against
  `docs/specs/2026-07-12-document-review-fanout-design.md` lines 87/179/187-188
  — `section-impact-reviewer` (repurposed into today's `impact-reviewer`) was
  indeed a distinct pre-redesign agent alongside fact-checker/link-checker, so
  naming "impact review" as part of the pre-redesign narrow layer is accurate,
  not an inflation. External sources not re-fetched this pass since already
  verified verbatim on file (Anthropic 90.2%/four elements/June 2025 dating,
  Google Research 80.9%/39-70% range, Google spam policy, Rankability 83%,
  marketplace disclaimer) — no claims changed since the last fetch-confirmed
  pass.
- **Elevation: order-13's `ourTake` drops the protected "I pay that bill on
  every post" phrase that its own `gateGuidance` still demands.** The
  honest-limit paragraph's `ourTake` now reads "It's real money in compute —
  and still cheaper than shipping something broken," while `gateGuidance` for
  the same beat says to "preserve the clause 'I pay that bill on every post'
  near-verbatim... land it in the same sentence as the 4x/15x figures." Since
  `ourTake` is what usually seeds drafted prose, and this exact protected
  phrase has been confirmed present-then-recurring-at-risk across many prior
  drafts of this post, letting `ourTake` diverge from its own `gateGuidance`
  raises the odds a future draft drops the phrase again. Not a gate finding —
  the substance of the honest-limit admission is still intact in the current
  wording — but recommend folding the phrase back into `ourTake` directly:
  "It's real money in compute, and I pay that bill on every post — still
  cheaper than shipping something broken."
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent from this outline too, not cited anywhere in
  `sources`/`links`.** Same standing gap as every prior pass — see the
  reconciliation text already drafted in earlier entries above. Not a gate
  finding since check 5 only applies to sources actually cited, and Osmani
  isn't cited in this outline.

- **RESOLVED — order-13's `ourTake` no longer drops the protected "I pay that
  bill on every post" phrase.** The 2026-07-14 outline pass flagged this as an
  elevation (ourTake read "It's real money in compute — and still cheaper than
  shipping something broken," missing the phrase its own gateGuidance demanded).
  This outline's order-13 `ourTake` now reads "It's real money in compute, and
  I pay that bill on every post — still cheaper than shipping something
  broken." — phrase restored, matches gateGuidance exactly. No longer an open
  item; watch for it dropping again in a future draft pass regardless.
- **Elevation, new: meta `point` field's "final veto over all of it" risks
  reading like the recurring "gate runs at the end" landmine, even though it's
  probably defensible.** Caught in the 2026-07-14 outline pass (same post,
  15-paragraph shape): the top-level `point` field reads "...the draft gets
  graded by fifteen single-axis reviewers, and a deterministic tone gate holds
  the final veto over all of it." Order-8 in the SAME outline correctly
  describes the gate running before the first round, after every edit pass,
  and once more after the loop exits — so "final veto" isn't strictly false
  (there really is a terminal re-score), but the phrasing echoes the six-plus
  times this exact post has regressed into "gate at the end" framing in other
  fields (hook, stage-list sentences). Since `point` is a meta field that can
  seed drafted intro/outro prose, worth tightening pre-emptively: something
  like "...and a deterministic tone gate checks it before review even starts,
  then again after every edit — no single checkpoint carries the whole thing."
  Not a gate finding this pass (order-8 already carries the full accurate
  timing and nothing in `point` explicitly denies the earlier-round checks),
  but flag if this specific phrase ("final veto") survives into a drafted
  sentence unqualified.
- **Elevation, new: "This outline caught two real failures" attributes to the
  outline-review stage what actually happened at the draft stage.** Caught in
  the 2026-07-14 outline pass: the `point` field opens "This outline caught
  two real failures on this very post before either one shipped," but the
  two failures it's referring to (order-9: run-one's threshold miscalibration,
  run-two's unmeasured-last-edit gap) both happened during the DRAFT
  review loop / tone-gate mechanism, not during the outline review loop. Read
  charitably, "this outline" means "this outline document / this account of
  the pipeline," not literally "the outline-stage reviewers caught these" —
  but a literal reading misattributes which stage caught what. Low severity
  (the `point` field is a thesis/compass field, not verbatim-rendered prose),
  but worth a small clarification if it survives into drafted copy: something
  like "This post's own pipeline caught two real failures on itself before
  either shipped" avoids naming a specific stage that didn't do the catching.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited anywhere in `sources`/`links`.** Same
  standing gap as every prior pass of this post — see the reconciliation text
  already drafted in earlier entries above. Not a gate finding since check 5
  only applies to sources actually cited, and Osmani isn't cited here.
- **CLEAN PASS — 2026-07-14, OUTLINE-stage bullshit-detector review (this
  specific 15-paragraph outline).** Zero gate findings. Every standing pattern
  held: "by default" hedge present on all "only human checkpoint" restatements
  (order-1 facts/intendedBeat); round cap "5" everywhere (order-4, order-7,
  cross-checked against SKILL.md lines 165/254); no "blind" language in
  order-5, which correctly states reviewers "are not blind to the rest";
  link-integrity "mostly binary" (order-6), never "no judgment call"; aiScore
  threshold correctly "15," "adds 100 points internally" framed as pre-clamp
  mechanism (order-8); gate timing in order-8 itself correct (before first
  round, after every edit, final re-score after loop exit); both protected
  lines present verbatim (order-8's "The gate I trust most is the one with no
  opinion," meta `flare`'s "Telling an editor what's wrong never converged.
  Handing it the fix did."); run-one/run-two numbers (42, 35 em-dashes/2,000
  words, 2→15, 6→22, 10/5/7 oscillation) intact and matching the actual old
  post; "AI-audited" + "screened" + disclaimer present in the CTA (order-15),
  no bare "audited." External source claims (Anthropic 90.2%/four
  elements/June 2025 dating, Google Research 80.9%/39-70% range, Google spam
  policy's scaled-content-abuse + generative-AI-as-example framing, Rankability
  83% with directional caveat, marketplace disclaimer) all match prior
  verbatim confirmations already on record — no drift found.

- **REGRESSED, new phrasing — Google spam-policy "human vs AI" equivalence claim
  is back, 2026-07-14 draft-mode pass.** This is the same overclaim flagged on
  2026-07-12 ("The policy names generative AI tools explicitly, and it doesn't
  care whether a human or a model wrote the words" — not found on the cited
  page) resurfacing in new wording in this draft: "the policy goes after intent
  to manipulate rankings, not AI authorship itself. A human writing to game
  search results breaks it exactly as much as an AI does." Re-fetched
  `developers.google.com/search/docs/essentials/spam-policies` directly this
  pass, twice, with targeted prompts — confirmed the page names generative AI
  tools as one example under "Scaled content abuse" and separately mentions
  scraping/synonymizing/translating as automated methods, but nowhere states or
  implies that human-written ranking manipulation is penalized "exactly as
  much" as AI-written manipulation, or frames the policy as authorship-neutral.
  The closest genuine intro line ("Our policies cover common spam practices,
  but Google may act against any type of spam practices we detect") is about
  enforcement scope, not an authorship-neutrality statement. Same fix as the
  original 2026-07-12 entry: narrow the claim to what the page actually
  supports (method/pattern, with generative AI named as one example) rather
  than asserting a direct human-vs-AI equivalence the page never states. Watch
  for this specific claim recurring under yet another phrasing — it keeps
  coming back because "Google doesn't care if it's AI" is a satisfying, tidy
  point the source doesn't quite make.

- **CLEAN PASS — 2026-07-14, DRAFT-mode bullshit-detector review (this specific
  rendering: opens "Twelve stages run before one of these posts ships. By
  default, I sign off on exactly one.", stage list under "Twelve stages that
  automate blog writing with AI agents", "Five decisions that make the
  pipeline trustworthy" with five H3s).** Zero gate findings. Every standing
  pattern held: "by default" + round-cap-escalation sentence present on the
  "only human checkpoint" restatement in paragraph 2; round cap "five rounds"
  both places (outline loop, draft loop); no "blind" language anywhere in the
  fifteen-reviewer section, which correctly reads "reads the entire draft
  start to finish but grades only that axis"; link-integrity described as
  "mostly binary checks," never "no judgment call"; aiScore threshold
  correctly "15 or above out of 100," "adds 100 points internally" framed as
  the pre-clamp mechanism; gate timing correctly "before the first review
  round and again after every edit pass... final re-score runs on the
  finished draft," never "at the end"; both protected sentences present
  verbatim in body prose (not just headings): "Catching a broken structure at
  the outline costs an outline. Catching it after a full draft costs a
  rewrite." and "The gate I trust most is the one with no opinion." (also
  present as its H3 heading, correctly as a bookend not the only occurrence);
  the flare line "Telling an editor what's wrong never converged. Handing it
  the fix did." present verbatim; "I pay that bill on every post" present in
  the same sentence as the 4x/15x figures; run-one/run-two numbers (42, 35
  em-dashes/2,000 words, 2→15, 6→22, 10/5/7 oscillation) intact and matching
  the actual old post; "AI-audited agent skills" + "screened" (not bare
  "audited") + disclaimer present in the CTA, no bare "audited" anywhere;
  twelve-stage count has Assemble/Commit as separate list items, tone gate
  folded into the draft-review-loop entry; the Google spam-policy "human vs AI
  authorship-neutral" equivalence claim (flagged REGRESSED on 2026-07-14 in a
  different draft rendering) does NOT appear in this rendering — the spam-
  policy paragraph stays scoped to what the page actually supports (scaled
  content abuse, generative AI as first example, scraping/automated-rewriting
  as a second example). Fresh WebFetch this pass of two sources not
  independently re-verified in several passes: Google's live spam-policy page
  (confirmed the scaled-content-abuse definition verbatim, generative AI as
  the first example, and scraping-with-automated-transformations as the
  second example — matches the draft's "scraping and automated rewriting used
  to dodge duplicate-content detection" as a fair paraphrase of "obfuscation
  techniques"); Augment Code's guide (confirmed verbatim: "+81% improvement on
  parallelizable tasks but causes up to 70% degradation on sequential ones" —
  matches the draft's "roughly +81%... up to 70% worse").
- **Elevation, new: "can't wander" is an absolute claim about outline drift
  the mechanism only partially guarantees.** "The approved outline then
  becomes the rubric every draft reviewer grades against later, so the draft
  can't wander from a plan that already passed review." The mechanism (draft
  reviewers grade against the outline as rubric; drift becomes a gate finding;
  cap-out escalates to Chad) makes drift-that-ships unlikely, not structurally
  impossible — an LLM drafter can still write something that wanders, it just
  gets caught before publication rather than never happening. "Can't" reads as
  a stronger guarantee than the mechanism supports, especially two sections
  before the post's own account of two runs that didn't converge cleanly.
  Not gate-worthy (the backstop is real and described elsewhere in the post),
  but the honest word is "gets caught," not "can't." Recommended fix: replace
  "so the draft can't wander from a plan that already passed review" with "so
  drift from a plan that already passed review shows up as a gate finding,
  not a shipped mistake."
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited anywhere in this draft's Sources.**
  Same standing gap as every prior pass — see the reconciliation text already
  drafted in earlier entries above. Not a gate finding since check 5 only
  applies to sources actually cited, and Osmani isn't cited here.

- **RESOLVED — "can't wander" absolute-guarantee overclaim fixed in this
  revision.** The prior 2026-07-14 draft-mode elevation ("so the draft can't
  wander from a plan that already passed review") is gone. This revision's
  outline-loop paragraph now reads "so drift from a plan that already passed
  review shows up as a gate finding, not a shipped mistake" — the exact fix
  text recommended two entries above. No longer an open item; watch for
  regression back to "can't wander" in a future pass regardless.
- **CLEAN PASS — 2026-07-14 (third same-day pass), DRAFT-mode
  bullshit-detector review of "How I Automate Blog Writing With AI Agents"
  (this specific rendering: opens "Twelve stages run before one of these
  posts ships. By default, I sign off on exactly one.", "Twelve stages that
  automate blog writing with AI agents" numbered list, "Five decisions that
  make the pipeline trustworthy" with five H3s, "This post broke the machine
  that wrote it" H2, "The biggest fix: findings that arrive as the fix
  itself" H2).** Zero gate findings. Every standing pattern held: "by
  default" hedge + immediate round-cap-escalation exception present on the
  "only human checkpoint" restatement in paragraph 2 ("Topic approval is my
  one default checkpoint. Past it, the other eleven stages... run with
  nobody in the loop. The exception: if a review loop hits its round cap
  with gate findings still open..."); round cap "five rounds" both places;
  no "blind" language in the fifteen-reviewer section ("reads the entire
  draft start to finish but grades only that axis"); link-integrity "mostly
  binary checks," never "no judgment call"; aiScore threshold correctly "15
  or above out of 100," "adds 100 points... internally" framed as the
  pre-clamp mechanism; gate timing correctly "before the first review round
  and again after every edit pass... final re-score runs on the finished
  draft," never "at the end"; both protected sentences present verbatim in
  body prose, not just headings ("Catching a broken structure at the outline
  costs an outline. Catching it after a full draft costs a rewrite." and
  "The gate I trust most is the one with no opinion." — the latter also
  bookends as the H3 heading, which is fine since it's not the ONLY
  occurrence); flare line "Telling an editor what's wrong never converged.
  Handing it the fix did." present verbatim; run-one/run-two numbers (42, 35
  em-dashes/2,000 words, 2→15, 6→22, 10/5/7 oscillation) intact and matching
  the actual old post; "AI-audited agent skills" + "screened" (not bare
  "audited") + disclaimer present in the CTA; twelve-stage numbered list has
  Assemble and Commit as separate items, tone gate folded into the
  draft-review-loop line; the "twelve stages" undercount gap is closed with
  an explicit explainer paragraph naming the three uncounted sub-steps (SEO
  scoring and scheduling / bookkeeping / rolling digest) and why they don't
  make the count; the Google spam-policy "human vs AI authorship-neutral
  equivalence" claim (flagged REGRESSED earlier on 2026-07-14 in a different
  rendering) does NOT appear here — this paragraph stays scoped to what the
  page supports (scaled content abuse definition, generative AI as first
  example). Fresh WebFetch this pass of the two highest-misquote-risk
  sources: Google's live spam-policy page (scaled-content-abuse definition
  verbatim, generative AI confirmed as the first example, no
  authorship-neutrality language on the page) and marketplace.buildaloud.ai
  (audit description and AI-generated-audits disclaimer both verbatim).
- **New minor elevation: "I pay that bill on every post" split back into a
  separate sentence from the 4x/15x token figures, after a prior pass had it
  landed in the same sentence.** Current draft: "Anthropic's own numbers on
  the pattern say agents typically burn about 4x the tokens of a single chat
  call, and multi-agent systems run about 15x. I pay that bill on every
  post: real money in compute, still cheaper than shipping something
  broken." — two sentences, not one. This beat's own gateGuidance explicitly
  asks for same-sentence placement ("land it in the same sentence as the
  4x/15x figures... keep the admission and the evidence for it in one
  breath so the feeling doesn't float free of the fact"), and an earlier
  2026-07-14 draft-mode pass confirmed it WAS in the same sentence at that
  point. Not a gate finding — nothing false or misleading, both sentences
  are accurate and adjacent — but it's the exact kind of protected-phrase
  placement drift this ledger has tracked before losing ground silently.
  Recommended fix if this recurs again: "Anthropic's own numbers on the
  pattern say agents typically burn about 4x the tokens of a single chat
  call, and multi-agent systems run about 15x — and I pay that bill on every
  post, real money in compute, still cheaper than shipping something
  broken."
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited anywhere in this revision's
  Sources.** Same standing gap as every prior pass — see the reconciliation
  text already drafted in earlier entries above. Not a gate finding since
  check 5 only applies to sources actually cited, and Osmani isn't cited
  here.
- **Elevation, still recurring: the internal link for the Sonnet/Haiku
  routing beat is still absent from this rendering.** "That's deliberate
  routing" has no link to `/blog/2026-07-18-which-claude-model-to-use/`,
  same gap as every prior pass. Not a gate finding — the routing logic is
  fully explained inline — but the beat's approved outline still lists this
  as a link and it still hasn't landed in any rendering checked so far.

## Standing rule

When the honest fix is in the code, not the copy (the thing is genuinely weaker
than it should be), don't just soften the sentence — flag a product ticket so
the build improves and the post can then tell the better story ([[TD-0031]]).

## Post: 2026-07-14-dark-dashboard-design (first outline-stage pass, 2026-07-15)

- **NEW — "colorblind-validated" asserted with no supporting evidence anywhere
  in the codebase.** The outline's order-6 beat (charts) states series colors
  are "colorblind-validated — green #1ea855 for views, blue #4c78dd for
  sessions and search" in both `facts` and `intendedBeat`. Grepped the whole
  repo for `colorblind`/`color-blind`/`deuteranopia`/`protanopia`/`wcag`/
  `contrast ratio` — zero matches anywhere, including
  `src/styles/global.css` (whose own comment on these two variables just says
  "Dataviz series colors only — never used for chrome," no accessibility
  note) and the later design-system post
  (`2026-07-17-design-system-with-css-variables.md`, checked even though it
  postdates this post). "Validated" implies an actual check was run (a
  simulator, a tool, a documented pass) — nothing in the ground truth
  supports that a validation step ever happened, even though green/blue
  genuinely is a safer pairing than red/green for the most common color
  vision deficiencies. Honest framing: describe the choice as deliberately
  avoiding red/green (the pairing that trips up deuteranopia/protanopia),
  not "validated." Same shape as the "audited" → "AI-audited" pattern above —
  a word implying formal verification where none is evidenced.
- **NEW — Datawrapper cited for "monospace solves alignment" when the
  source's actual recommendation is tabular figures inside proportional
  fonts, not monospace.** The outline's order-5 beat (typography) cites
  Datawrapper's fonts-for-data-visualization piece as the authority for
  choosing JetBrains Mono for the metrics grid. WebFetched the source
  directly: it does make the 124.17-under-680.90 alignment argument (that
  example is lifted accurately), but its actual guidance is "for most of
  your data visualizations, use tabular figures" — a feature available
  within ordinary proportional sans fonts (it names Roboto, Lato, Open Sans,
  Source Sans Pro, Noto Sans) — and treats full monospace as a rare,
  niche choice, not the general recommendation. Citing Datawrapper as "the
  case for" our monospace choice overstates what the source endorses; its
  real case is for tabular figures generally, of which monospace is one
  (uncommon) way to get them. This isn't a product problem — JetBrains Mono
  also buys the instrument-panel/code-comment look the rest of the page
  leans on, which is a legitimate reason beyond alignment — but the citation
  needs to say so rather than implying Datawrapper endorses monospace
  specifically. Honest framing: attribute the alignment *principle* (tabular
  figures, fixed-width digits) to Datawrapper, and separately own the
  monospace-specifically choice as ours (aesthetic + alignment, not "per
  Datawrapper").
- **NEW — "most tiles read that same grey status" misstates the linked
  source post's own numbers.** The outline's order-7 beat links
  `/blog/2026-07-09-how-to-measure-blog-seo/` and claims (in both `facts`
  and `intendedBeat`) that "most tiles there currently read the same grey
  status" as /stats/'s "gathering signal" state. Read that post directly:
  its scorecard has THREE states (RANKING / GATHERING SIGNAL / NOT YET), and
  its own punchline says "Most posts show NOT YET. A handful show GATHERING
  SIGNAL." The majority state is NOT YET (zero search visibility), a
  differently-named state from GATHERING SIGNAL (some impressions, not
  enough to call) — collapsing them into "the same grey status" implies
  terminological continuity with /stats/'s "gathering signal" label that the
  source post doesn't support for the majority of tiles. Both states are
  presumably grey/neutral (no rounding up), so the *spirit* of the claim
  (most of the scorecard reads honestly-empty right now) holds — only the
  specific "same grey status" / "gathering signal" wording overclaims which
  label applies to most tiles. Honest framing: "most tiles read NOT YET, a
  handful read GATHERING SIGNAL — both flat grey, no rounding up."
- **Elevation, not gate: NN/g's "still loading" framing applied loosely to a
  page the SAME outline (order 6) describes as pure build-time SVG with no
  client-side fetch.** Order-7's `intendedBeat` borrows NN/g's specific
  technical scenario (a panel that shows "no data" while it's "actually
  still loading") to describe /stats/'s empty state — but nothing on
  /stats/ is "still loading" at view time; the real mechanism is "not enough
  calendar time has passed for signal to accumulate," which is a different
  kind of temporary-state-read-as-permanent problem than an in-flight
  fetch. The order-7 `facts` field is already careful about this ("whether
  data exists versus whether it simply hasn't arrived yet") — only the
  `intendedBeat`'s "actually still loading" phrasing borrows NN/g's literal
  scenario rather than the generalized principle. Left as an elevation, not
  a gate finding, because the underlying point NN/g makes (temporary state
  misread as permanent fact, destroys trust) genuinely does generalize to
  our case — only the connecting word ("loading") is imprecise given our own
  build-time-SVG claim two beats earlier.

## Post: 2026-07-14-dark-dashboard-design (second pass, full rewrite outline, 2026-07-15)

- **All three findings from the first outline-stage pass (2026-07-15) are
  RESOLVED in this rewrite outline.** Verified against fresh code reads: (1)
  "colorblind-validated" is gone — order-6 now says colors were "chosen to
  steer clear of red/green, the pairing most likely to cause trouble for
  common color vision deficiencies," no "validated" language anywhere; (2)
  the Datawrapper citation now correctly attributes only the tabular-figures
  *principle* to Datawrapper and owns the monospace-specifically choice
  separately ("its own default recommendation there is tabular figures
  inside an ordinary proportional font, not full monospace... Going full
  monospace gets me the same alignment, plus the code-comment look"); (3)
  the scorecard-post numbers claim now correctly reads "most of its tiles
  currently read NOT YET, with a handful reading GATHERING SIGNAL," matching
  the source post's own punchline exactly, not collapsed into one label.
  Fresh WebFetch this pass re-confirmed both Wendy Zhou's article (all four
  guidance points — dark grey over true black, cards a shade lighter, light
  grey text, muted data with reserved strong color — verbatim) and NN/g's
  empty-state article (temporary-state-read-as-permanent framing and its
  trust-destroying cost, verbatim); this outline's order-7 now correctly
  distinguishes NN/g's literal scenario (a page still loading) from ours (not
  enough calendar days), resolving the prior pass's "still loading" elevation
  too — a clean, deliberate fix, not a coincidence.

- **NEW — the "mint highlights the one metric that's the panel's point" claim
  contradicts the actual implementation AND contradicts two other beats in
  the SAME outline.** Order-4's `intendedBeat`/`ourTake`/`facts` all claim
  mint "appears exactly once per panel, on the one metric that is that
  panel's point" (i.e., mint colors a specific data value). Read the ground
  truth directly: `src/styles/global.css` line 22 comments "Dataviz series
  colors only — never used for chrome/borders/labels (those stay --mint)" —
  mint IS the chrome color, not a data-highlight color. Grepped every
  `var(--color-accent)` (=mint) usage across `src/components/charts/*.astro`
  and `src/pages/stats.astro`: every single occurrence is
  `border-top: 2px solid var(--color-accent)` — a uniform border stripe on
  every panel, never applied to a metric's text/number. The only place mint
  touches actual data-adjacent text is `PostStats.astro`'s `.tele-signal--hit`
  (a status dot + label that lights up only when a post is ranking for its
  target keyword) — a conditional status flag, not "the metric that is that
  panel's point" on every panel. This SAME outline's order-6 (`facts`:
  "Brand mint stays chrome-only") and order-8 (`facts`: "a thin mint top
  border, two pixels of color along the top edge of an otherwise grey card")
  both correctly describe mint as chrome — order 4 is the one beat that
  invents a different, false mechanism (semantic per-metric highlighting)
  contradicting its own sibling beats and the code. Honest framing: mint is a
  two-pixel top-border accent, uniform chrome on every panel, never applied
  to a metric value — panel numbers stay grey. Fix applied this pass: rewrote
  order-4's `intendedBeat`, `ourTake`, `facts`, and `gateGuidance` to match
  the border-chrome mechanism instead of inventing a per-metric highlight
  rule. Watch for this regressing back to "mint highlights the key metric" in
  future passes — it's a good story beat (restraint = meaning) but needs to
  attach to the real mechanism (border) not an invented one.

- **Elevation, not gate: order-6's `facts` groups giscus comment counts under
  "panels for" alongside real standalone panels.** `facts` reads "The page
  also has panels for traffic sources (organic/direct/referral split), top
  search queries, and giscus comment counts" — but per `PostStats.astro`,
  comment counts are a `dt`/`dd` field inside each post's row in the main
  stats table, not a standalone panel component like `TrafficSourcesPanel`/
  `TopQueriesPanel`. The same beat's `intendedBeat` already gets this right
  ("panels for traffic sources... and top search queries, plus a giscus
  comment count" — note the "plus," not "and... panels for"). Low-severity
  since comment counts genuinely are on the page and the underlying claim
  (data exists) is true — just a structural precision nit between sibling
  fields of the same beat, same shape as the recurring "fixed in one field,
  not its sibling" pattern this ledger has flagged before for other posts.
  Worth a one-word tweak (facts should say "plus a giscus comment count"
  too, matching intendedBeat) if this recurs.
- **Elevation, not gate: order-6's "(organic/direct/referral split)" undercounts
  the actual segment set.** `TrafficSourcesPanel.astro`'s `organicSplit` has
  four keys — organic, direct, referral, AND "other" — not three. Minor; "the
  organic/direct/referral split" reads as the three meaningful categories with
  an implicit remainder bucket, which is a normal way to describe this kind of
  breakdown, but a literal reader could notice the fourth segment is unnamed.

## Post: 2026-07-14-dark-dashboard-design (third pass, outline-stage, 2026-07-15)

- **CLEAN PASS — zero gate findings.** Fresh code grep + WebFetch this pass,
  not just re-trusting the ledger: `src/styles/global.css` confirms all hex
  values exact (`--ink-900:#0c0e12`, `--ink-800:#13161c`, `--mint:#a3f7bf`,
  `--series-green:#1ea855`, `--series-blue:#4c78dd`), the comment "Dataviz
  series colors only — never used for chrome/borders/labels (those stay
  --mint)" confirms mint-as-chrome is the documented design intent, not an
  inferred one; grepped every `var(--color-accent)` usage across
  `src/components/charts/*.astro` — all five are `border-top: 2px solid`, zero
  applied to a metric value, matching order-4's "chrome only" claim exactly
  (the order-4 mint-highlights-a-metric bug this ledger caught and fixed last
  pass has not regressed). Confirmed `--font-display: 'Instrument Serif'` and
  `--font-mono: 'JetBrains Mono'` match order-5's font-name claims exactly.
  Confirmed `TrafficChart.astro` is genuinely 2-series (pageViews + sessions),
  `SearchPanel.astro`/`TopQueriesPanel.astro`/`SurfacePanel.astro`/`Sparkline`
  all exist and match order-6/order-7's chart inventory. Fresh WebFetch of all
  three cited sources against the outline's exact phrasing: Wendy Zhou's
  article — confirmed all four guidance points verbatim ("Dark grey (and not
  100% black) backgrounds," "A dark background color combined with slightly
  lighter cards," "Light grey (and not 100% white) text," "Graphs that contain
  mostly grey data points, except for one or a few strongly coloured data
  points"); Datawrapper's piece — confirmed its actual recommendation is
  tabular figures inside proportional fonts (Roboto/Lato/Open Sans/Source Sans
  Pro/Noto Sans all named), NOT monospace, and the 124.17-under-680.90 example
  is lifted verbatim — order-5's "though its own default recommendation there
  is tabular figures inside an ordinary proportional font, not full monospace"
  is accurate, not an inflation; NN/g's empty-state article — confirmed the
  exact worked example order-8 cites ("users initially encounter an inaccurate
  system-status message 'No records'... After several seconds... the message
  is replaced with a list of relevant items") and the trust-cost language
  ("develop a severe distrust of and distaste for the application") both
  verbatim, matching order-8's "flashes 'No records' before the real content
  finishes loading" and "destroys trust in an interface" claims.
- **Elevation, new: "Every metric number on the page renders in grey" (order-4
  `facts`) is imprecise — the actual token is `--paper` (#e8e6e1), an
  off-white/cream color, not grey.** Read `PostStats.astro` directly: both
  `.tele-num` (the Instrument Serif hero number) and `.tele-grid dd` (the
  JetBrains Mono supporting metrics) use `color: var(--color-text)`, which
  resolves to `--paper: #e8e6e1` — RGB(232,230,225), a very light, slightly
  warm near-white, not a middling grey the way `--paper-dim` (#9ca3af,
  actually used for secondary/muted text elsewhere) would be. The underlying
  point the claim is making — mint never colors a metric value, every number
  renders in one uniform, non-mint color — is true and doesn't need fixing.
  Only the specific color word "grey" overclaims how far the text sits from
  white, which matters a little more than usual here because Wendy Zhou's own
  cited guidance is literally "light grey (and not 100% white) text" and
  #e8e6e1 reads much closer to "100% white" than to grey. Not gate-worthy
  (no reader is misled about the page's actual behavior), but since this post
  otherwise sells itself on hex-level precision, worth tightening: swap
  "renders in grey" for "renders in the same neutral off-white as the rest of
  the page's text" or similar, rather than repeating "grey" for a token that's
  closer to paper than ash.
- **Elevation, new: the departure from Zhou's fourth guidance point (reserve
  strong color for the numbers that matter) is currently only an implicit
  contrast, not a named one — a "mine the source" opportunity, not a gap.**
  Zhou's article explicitly recommends "one or a few strongly coloured data
  points" to draw the eye to what matters; order-4's design instead keeps mint
  chrome-only and never spotlights any single number, which is a deliberate,
  well-reasoned choice in service of this post's whole honesty thesis (a
  spotlighted number would read like manufactured good news). This isn't check
  5 territory in the "the source has a better fix we're missing" sense — the
  post already knows about and rejects Zhou's advice on purpose, it just
  doesn't say so explicitly ("Then Scout's own accent rule" reads as an
  addendum to Zhou rather than a stated break from her). Naming the departure
  directly would sharpen the post's own theme rather than leaving it for an
  attentive reader to notice on their own.

## Post: 2026-07-14-dark-dashboard-design (fourth pass, outline-stage, 2026-07-15)

- **NEW — "every chart falls back to the same gathering-signal empty state"
  overclaims label uniformity; per-post sparklines use different text.**
  Order-6's `intendedBeat` and `facts` both claim every chart (the inventory
  explicitly includes "per-post sparklines") falls back to "the same
  gathering-signal empty state" when there's no data. Read
  `src/components/charts/Sparkline.astro` directly: its empty fallback is
  `<span class="spark-empty">no signal yet</span>` — not "gathering signal."
  The five panel-level charts (`TrafficChart`, `SearchPanel`, `SurfacePanel`,
  `TrafficSourcesPanel`, `TopQueriesPanel`) do all render `<EmptyPanel
  label="gathering signal — ...">`, so the claim is true for those five, but
  false for the sixth thing the same sentence explicitly lists (sparklines).
  Both fallbacks share the same grey (`--color-muted` / `#6b7280`) and the
  same non-committal spirit — no rounded-up number, no faked trend — so the
  underlying honesty claim holds; only the "same" (identical wording) part is
  wrong. This is the same shape as every prior "checkable, specific claim
  about our own system" catch on this post (hex values, font names, panel
  labels) — a technical reader could open `Sparkline.astro` and catch the
  mismatch in ten seconds. Honest framing: "every chart falls back to its own
  flat-grey empty state... the panel charts read 'gathering signal,' the
  per-post sparkline reads 'no signal yet' — same grey, same rule, not
  identical wording." Watch for "the same gathering-signal empty state"
  resurfacing as a blanket claim about all charts in future passes; scope it
  to the five panel components specifically, or note the sparkline's
  different (but equally honest) label.
- **Confirmed clean — all previously-tracked patterns for this post held this
  pass.** Fresh code/source re-check: no "colorblind-validated" language; mint
  correctly scoped to chrome (border-only) in order-4, not claimed as a
  per-metric highlight, and order-4's "renders in the same neutral off-white"
  phrasing (not "grey") matches `--paper`/`#e8e6e1` exactly, closing the third
  pass's color-precision elevation; Datawrapper citation correctly attributes
  only the tabular-figures principle to the source and owns "full monospace"
  as Scout's separate choice; scorecard-post numbers correctly say "most...
  read NOT YET, with a handful reading GATHERING SIGNAL," matching the cited
  post's own punchline; order-6's traffic-sources description now includes
  the fourth ("other") segment and uses "plus a giscus comment count" rather
  than folding it into "panels for," closing both prior elevations; order-7's
  panel-label examples ("// traffic (28d)", "// search (28d)") are verbatim
  matches to the actual `chart-panel-label` spans in `TrafficChart.astro`/
  `SearchPanel.astro`, and correctly excludes "// telemetry" (verified it's
  the page-level `.page-label`, a different CSS class, with no mint border) —
  this fixes the exact "// IMPRESSIONS. // AVG POSITION." mislabeling error
  present in the currently-published version of this post
  (`src/content/blog/2026-07-14-dark-dashboard-design.md` line 67, which
  mislabels individual metric names as panel-label examples); confirmed
  `.chart-panel`'s mint top-border wraps both the populated and the empty
  (`EmptyPanel`) states, so order-7's "each one reads as its own instrument"
  claim holds even for gathering-signal panels, not just populated ones.
  Fresh WebFetch of Wendy Zhou's and NN/g's pages this pass (mining for a
  better answer, check 5): Zhou's article has nothing beyond what's already
  captured (dark grey backgrounds, lighter cards, light grey text, reserved
  accent) plus mobile progressive-disclosure guidance not relevant here; NN/g
  actually recommends going further than a neutral label — "pull revelation"
  contextual teaching, direct action pathways (buttons/links), and
  explanatory "why + how to fix" messaging, not just "no data yet." Judged
  not a gate-worthy product gap: NN/g's examples are for empty states a user
  can resolve by taking an action (star a favorite, add a log source); /stats/
  's emptiness resolves only with elapsed calendar time, so there's no
  action to surface. Flagged as an elevation, not a ticket.

## Post: 2026-07-14-dark-dashboard-design (fifth pass, DRAFT-stage, 2026-07-15)

- **First draft-stage pass on this post (all four prior passes were
  outline-stage).** Verified the rendered prose carried through every fix the
  outline passes landed: no "colorblind-validated," Datawrapper correctly
  scoped to the tabular-figures principle only ("its own default
  recommendation is tabular figures inside an ordinary proportional font, not
  full monospace"), scorecard numbers correctly "most... read NOT YET, with a
  handful reading GATHERING SIGNAL," mint correctly chrome-only (border, not a
  per-metric highlight), text color correctly described as "neutral off-white"
  (never "grey," matching `--paper`/#e8e6e1), sparkline correctly distinguished
  ("no signal yet," a different label from the five panels' "gathering
  signal"), panel-label examples correctly limited to the two genuine ones (`//
  traffic (28d)`, `// search (28d)`) with no "// telemetry" contamination,
  traffic-source segments correctly include "other" as the fourth. Also
  confirmed by fresh code read: the mint top border really is 2px
  (`border-top: 2px solid var(--color-accent)` across all five chart panel
  components) — the draft's "two pixels of color" is accurate and actually
  *fixes* a latent error in the currently-published version of this post,
  which says "one pixel." Fresh WebFetch re-verification of all three cited
  sources against this draft's exact prose (Wendy Zhou's four guidance points,
  Datawrapper's tabular-figures-in-proportional-fonts recommendation with the
  124.17/680.90 example, NN/g's "No records" worked example + trust-cost
  language + "pull revelation" recommendation) — all verbatim, no
  misattribution.
- **NEW — the live-pulse status flag is described as reporting "one binary
  fact, ranking or not," but the mechanism `PostStats.astro` actually
  implements is three-valued, and the omitted third state is the exact
  "gathering signal" honest-empty mechanism this whole post is about.** Read
  `PostStats.astro`'s `signal()` function directly: it returns one of three
  tones — `hit` (ranking, mint), `miss` (not yet ranking, `--color-hot`
  dot/neutral text), or `unknown` (`scorecard.status === 'insufficient-data'`,
  label literally `"gathering signal — not enough search data yet"`, colored
  `--color-muted`, i.e., grey). The draft's "a single status flag reporting
  one binary fact, ranking or not" only names two of the three states and
  drops the one that's most on-theme — the live-pulse flag ALSO has its own
  honest "we don't know yet" grey state, not just yes/no. This is exactly the
  kind of checkable, specific claim about our own system this post's whole
  premise depends on getting right, and the omission actually undersells the
  design (a three-state honest signal is a *better* proof point than a binary
  one, not a worse one). Honest framing: name the third state instead of
  collapsing to binary.
  - location: "Color discipline: charcoal, one accent, everything else quiet"
  - quote: "That's a deliberate exception to the rule: a single status flag reporting one binary fact, ranking or not."
  - replacement: "That's a deliberate exception to the rule: a single status flag, and it isn't even fully binary — ranking, not yet ranking, or still gathering signal, and that third state stays the same flat grey as everything else on the page."
- **Elevation: "average position number included" is accurate but could be
  one clause clearer about which avg-position it means.** Verified against
  code: the status line's label string (`ranking for "X" · avg #Y.Y`) embeds
  `scorecard.targetPosition` — the average position *for the ranked target
  keyword* — which is a different number from the metric grid's own separate
  `avg pos` field (`stat.position`, the post's overall average position
  across all queries, always neutral off-white per the paragraph's next
  sentence). Both are real and both are called "avg pos"/"average position"
  in different places on the same panel, so a careful reader could wonder
  whether the mint status line is quietly recoloring the grid's avg-pos
  number too — it isn't. Not gate-worthy since the sentence order already
  disambiguates (next sentence: "Every panel's own hero number and metric
  grid stay a neutral off-white..."), but one clause naming *which* avg
  position would close the gap for a skimming reader.

## Post: 2026-07-15-grill-me-what-an-auditor-sees (OUTLINE-stage pass, 2026-07-15)

- **NEW — "misuseSurface" defined as covering intentional ("on purpose") harm,
  contradicting our own canonical AST v1.0 spec and undercutting the post's
  own thesis.** Order-3's `intendedBeat` defines the four scores, including
  "misuseSurface (how easily that power goes wrong, on purpose or by
  accident)." Read the ground-truth source directly —
  `src/content/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why.md`
  — its own definition is exact: "**Misuse Surface**: How likely is an agent
  to go off the rails with this skill? This focuses on `negligent` and
  `accidental` findings: cases where the code means well but isn't guarded."
  Intentional/on-purpose harm lives entirely in the separate
  `maliciousIntentScore` axis (`overallExposure = maliciousIntentScore × 1.0
  + inherentCapabilityScore × 0.01 + misuseSurfaceScore × 0.05` — malice is
  weighted 20x the misuse-surface term specifically because it's tracked
  separately). This isn't a small wording slip: the whole post's thesis
  (order 6, "Why intent and exposure are separate scores") depends on
  misuseSurface and maliciousIntent being genuinely distinct, non-overlapping
  measurements. Folding "on purpose" into misuseSurface's own definition
  contradicts the mechanism the post spends its back half explaining. Honest
  framing: "how easily that power goes wrong by accident or carelessness —
  intentional harm lives in the malice score, not here." Cross-checked the
  math on the featured example while I was in the source: 0×1.0 + 35×0.01 +
  85×0.05 = 4.6 — the outline's four numbers (0/35/85/4.6) are internally
  consistent with the real formula, not fabricated; only the score's own
  *definition* in order 3 needs the fix.
- **REGRESSED (different post, same standing pattern) — bare "audited" for
  the Skills Marketplace, in the CTA beat's `intendedBeat` and `facts`.**
  Same failure mode tracked at length above for
  `automate-blog-writing-with-ai-agents`'s CTA beat (see the multiple
  "'Audited' bare-unqualified..." entries), now caught for the first time on
  THIS post. Order-8's `intendedBeat` reads "browse the audited catalog at
  marketplace.buildaloud.ai" and its `facts` reads "The audited catalog lives
  at marketplace.buildaloud.ai with full scores and findings public" — both
  bare. Order-7 (an earlier beat in the same outline) does carry the honest
  self-review caveat ("audits are AI-generated and may contain errors; always
  review skills yourself before use," verified live again this pass — exact
  disclaimer text unchanged), so the substance isn't missing from the piece,
  but the established fix for this exact word/product across every prior
  post has been "qualify every occurrence, not just one field" — apply the
  same standard here. Fix: "AI-audited" in both order-8 fields.
- **Elevation: Mitiga's "4 interactions" compressed to "near-zero
  interaction," defensible but worth a precision check.** Order-2 states the
  exfiltration skill required "near-zero interaction required." Fetched
  Mitiga's page directly for the surrounding context — the source's exact
  figure is "Required only 4 interactions from the user to complete the test
  building," with no detail on what those 4 interactions were, but framed as
  routine development-workflow prompts (e.g. "Improve the tests") with no
  risk signal to the user. "Near-zero" is a fair characterization of
  friction/suspicion, not literal interaction count — not gate-worthy, but
  "a handful of routine prompts, no risk signal" would be more precise than
  "near-zero" if this needs tightening later.
- **Elevation, check-5 mining note (not a product ticket, softer than
  TD-0031): Obot's cited page proposes structural mitigations beyond
  scoring/auditing — worth a sentence acknowledging the audit is one layer,
  not the whole defense.** Fetched Obot's supply-chain page for mitigations
  beyond ToxicSkills' numbers: it proposes cryptographic publication signing,
  least-privilege capability manifests declared and machine-verified before
  install, a centralized gateway enforcing an approved catalog, and memory-
  integrity checks — all preventive/structural controls, distinct from (and
  complementary to) an AI-generated audit a human has to go read. The post
  doesn't overclaim here (order 7's honest-limit beat already says "always
  review skills yourself," so it isn't selling the audit as sufficient on its
  own) — this is softer than the like-button precedent, more "the source
  gestures at a bigger roadmap" than "the source has the fix for what we
  shipped wrong." Worth one clause acknowledging the audit is a read-before-
  install layer, not a runtime enforcement layer, if a future pass wants to
  sharpen the honest-limit beat further. Flagging for Chad's awareness, not
  blocking this post.
- **Standing caution reconfirmed AND its trap reproduced live this pass — the
  "no OWASP Agentic Skills Top 10" caution in `docs/blog-facts.md` (learned
  2026-07-11) is correct, and WebFetch on Obot's exact URL reliably
  regenerates the fabricated citation when prompted with "OWASP."** WebFetched
  `obot.ai/blog/mcp-security-agent-skills-supply-chain/` twice this pass with
  prompts naming "OWASP" — both times it returned a detailed, internally
  consistent, entirely invented "OWASP Agentic Skills Top 10 (2026 Edition)"
  framework: named project leads, a license, AST01-AST10 codes with different
  names than ours, even a fabricated incident name ("ClawHavoc campaign").
  Also fetched a fake OWASP project page directly and got equally detailed
  invented content confirming it "exists." This is the exact same fabrication
  already caught and removed from a prior draft of this post per
  `docs/blog-facts.md`'s standing caution — reproducing it independently this
  pass is useful confirmation the caution is correct and that this specific
  trap is *reliably* reproducible, not a one-off. Order-3's `gateGuidance`
  already defends against it correctly (AST codes are ours, never OWASP's) —
  no gate finding needed on the outline itself, since it doesn't make this
  claim. Elevation: strengthen `gateGuidance` with an explicit warning that
  fresh WebFetches of the Obot URL are a known confabulation trap for this
  exact false claim, so a future reviewer doesn't take an affirmative-sounding
  fetch result at face value without cross-checking `docs/blog-facts.md` first.
  - location: order 3, gateGuidance
  - quote: "AST codes are OUR taxonomy — never attribute them to OWASP (a prior draft of this exact post hallucinated an 'OWASP Agentic Skills Top 10'; standing caution in docs/blog-facts.md)."
  - replacement: "AST codes are OUR taxonomy — never attribute them to OWASP (a prior draft of this exact post hallucinated an 'OWASP Agentic Skills Top 10'; standing caution in docs/blog-facts.md). This is a reproducible WebFetch confabulation trap, not a one-off: fresh fetches of the Obot supply-chain URL asking about 'OWASP' reliably return a fabricated, detailed 'OWASP Agentic Skills Top 10' framework (named leads, AST01-10 codes with different meanings than ours). Don't trust an affirmative-sounding WebFetch on this claim without cross-checking this caution first."

- **IMPORTANT — the `docs/blog-facts.md` "CORRECTION" entry claiming OWASP's
  Agentic Skills Top 10 is now REAL is itself suspect; do not act on it
  without independent (non-WebFetch) verification.** Caught 2026-07-15,
  outline-stage pass of `grill-me-what-an-auditor-sees`. That CORRECTION entry
  (in `blog-facts.md`, same date) claims three separate live fetches confirm
  a real OWASP project ("published April 27, 2026," named leads, AST01-10
  categories) — but this exact query (WebFetch + "OWASP" + "Agentic Skills Top
  10") is the SAME documented confabulation trap flagged twice already in this
  ledger, and the specifics are NOT stable across fetches: an earlier ledger
  entry's fetch produced "AST01-AST10 codes with different names than ours"
  plus a fabricated incident name ("ClawHavoc campaign"); my own independent
  fetch this pass (to `owasp.org/projects/` and
  `owasp.org/www-project-agentic-skills-top-10/`) returned yet a THIRD
  different set of specifics — "Ken Huang" as lead with seven named co-leads,
  and ten category names ("Malicious Skills," "Supply Chain Compromise,"
  "Over-Privileged Skills," etc.) that don't match either the fabricated
  "ClawHavoc" version or the CORRECTION entry's vaguer description. Three
  independent fetches of "does OWASP have this project" producing three
  DIFFERENT sets of concrete specifics (different leads, different category
  lists, different launch-date framing) is the signature of a summarization
  model confabulating a plausible-sounding answer per call, not of a stable
  page being read consistently. Given the tool's own documentation says it
  "processes the content with...a small, fast model" — thin or non-existent
  content plus a prompt naming a very plausible-sounding thing ("OWASP" +
  "Top 10" + a hot topic) is exactly the shape that triggers this failure
  mode. **Do not cite the CORRECTION entry as settled fact in any future post.
  Before any post claims a real, differently-defined external "AST" framework
  exists, verify via a non-WebFetch method** (Chad manually checking the URL
  in a browser, or checking the Wayback Machine / OWASP's official project
  RSS feed / GitHub org) **and only then update this ledger.** Until verified
  that way, the SAFE and already-correct state is what this post's outline
  already does: never mention OWASP at all, so the ambiguity doesn't matter
  either way. Not a gate finding against the outline (which makes no OWASP
  claim), but flagged so no future pass "elevates" the CORRECTION entry into
  actual post prose on the strength of WebFetch alone.

## Post: 2026-07-15-grill-me-what-an-auditor-sees (OUTLINE-stage pass, 2026-07-15, second review)

- **CLEAN PASS.** All three gate findings from the prior outline-stage pass
  (same date) are fixed in this revision: misuseSurface's definition no
  longer includes "on purpose" (order 3 now reads "how easily that power goes
  wrong by accident or carelessness — intentional harm lives in the malice
  score, not here," matching the ground-truth source's "negligent and
  accidental findings" definition exactly); the CTA beat (order 8) uses
  "AI-audited" in both `intendedBeat` and `facts`, not bare "audited"; the
  "industry converging" claim is gone entirely from order 6, replaced with a
  thesis grounded in our own AST v1.0 design and the `not-all-malicious-is-
  equal` precedent, matching this pass's `gateGuidance` instruction to cut it.
  Re-verified independently this pass (not just trusting the prior entry):
  Mitiga's 200K-download + Testing-Validator exfiltration story, Snyk's
  3,984/36.82%/76 figures via Obot, and the marketplace's disclaimer text all
  match live sources; the four score definitions (maliciousIntent,
  inherentCapability, misuseSurface, overallExposure) and the featured
  0/35/85/4.6 example match `2026-02-22-we-rewrote-the-security-scoring-here-
  s-why.md`'s own formula and AST-01/AST-02 code mapping exactly. Zero new
  gate findings.
- **Elevation: the featured 4.6 overallExposure number coincides with an
  illustrative (not real) example in the cited scoring-rewrite post — worth a
  provenance check, not a rewrite.** `2026-02-22-we-rewrote-the-security-
  scoring-here-s-why.md` uses "around 4.6" as its OWN hypothetical formula
  example ("A powerful-but-honest file manager with no confirmation gates
  gets around 4.6") — a different skill description than this post's "real,
  anonymized meta-skill" whose job is generating other skills. The math
  checks out either way (0×1.0 + 35×0.01 + 85×0.05 = 4.6), so this isn't
  proof of anything wrong, but the coincidence is worth a positive
  confirmation at draft time that these four numbers are freshly pulled from
  a live marketplace audit, not an accidental reuse of the earlier post's
  made-up illustration.
- **Elevation: Mitiga's "4 interactions" is more precise than "near-zero
  interaction required."** Standing note, still applicable — see the prior
  pass's entry above. `docs/blog-facts.md` already recommends "as of Feb
  2026" framing for the Snyk/ToxicSkills figures since the underlying scan is
  dated; still unapplied in this outline.
- **Elevation: source's own example pair uses "a hidden affiliate link," not
  "a hidden affiliate link and a persistent backdoor" — wait, confirmed
  correct wording is "affiliate link"; this outline's order 6 says "affiliate
  redirect."** Minor lexical drift from `not-all-malicious-is-equal`'s exact
  phrasing, standing note from `docs/blog-facts.md`, still present in this
  revision.

## Post: 2026-07-15-grill-me-what-an-auditor-sees (OUTLINE-stage pass, 2026-07-15, THIRD review)

- **CLEAN PASS — zero gate findings.** All three prior-pass fixes (misuseSurface
  definition scoped to accident/carelessness only, "AI-audited" not bare
  "audited" in the CTA beat, OWASP-confabulation-trap warning present in order
  3's gateGuidance) are present and unchanged in this revision. Fresh
  verification this pass (direct WebFetch + direct file reads, not just
  ledger trust):
  - Read `2026-02-22-we-rewrote-the-security-scoring-here-s-why.md` in full —
    confirms the 10 AST codes table (AST-01 Data Exfiltration, AST-02
    Credential Harvesting ... AST-05 Destructive Operations, AST-09
    Undisclosed Network Activity, AST-10 Unbounded Autonomy) and the exact
    formula (`maliciousIntentScore × 1.0 + inherentCapabilityScore × 0.01 +
    misuseSurfaceScore × 0.05`). Order 3's example codes ("AST-05, AST-09,
    AST-10") aren't just plausible-sounding — they map cleanly onto order 5's
    four findings (destructive/unsafe file write → AST-05, undisclosed
    network calls → AST-09, no-checkpoint chained autonomy → AST-10), a nice
    accurate touch, not a coincidence worth flagging.
  - Read `2026-02-22-we-let-haiku-do-the-audits-it-missed-things.md` in full —
    confirms order 3's Haiku/Sonnet claim exactly: Haiku scored taskmaster
    1.75 with 1 finding, Sonnet scored it 5.65 with 4 findings including the
    AST-03 persistent backdoor shim at `~/.codex/bin/codex` that Haiku missed
    entirely; Chad's call was to switch every audit back to Sonnet, no
    exceptions.
  - Read `2026-03-03-34-malicious-skills-and-what-they-re-actually-doing.md`
    in full — confirms order 2's "34 out of 2,554" figure and "as of March
    2026" framing exactly (pubDate 2026-03-03, "We're at 2,554 audits now,
    and 34 score maliciousIntent >= 50, our flag threshold"). Also confirms
    the outline's phrasing ("flagged past our malicious-intent threshold")
    correctly avoids the stronger claim the source itself declines to make
    ("treat 34 as flagged-for-review, not 34 slam-dunk backdoors").
  - Fresh WebFetch of Mitiga's page — confirms "over 200K downloads," "only 4
    interactions from the user," and a silent/no-noise exfiltration with an
    empty audit log; order 2's newly-added "four routine-looking prompts...
    no risk signal raised along the way" phrasing (upgrade from a prior
    pass's looser "near-zero interaction") is an accurate characterization,
    not just a defensible one — closes the "Elevation: Mitiga's '4
    interactions' is more precise" note from the second review pass.
  - Fresh WebFetch of Obot's page — confirms "3,984 skills... as of February
    2026," "36.82%," and "76... malicious payloads" verbatim; order 2's new
    "as of February 2026" framing (also an upgrade from the second review's
    unapplied `docs/blog-facts.md` recommendation) is a verbatim match, not
    an approximation — closes that outstanding elevation too.
  - Read `2026-02-23-not-all-malicious-is-equal.md` in full for order 6 — the
    "hidden affiliate link" / "persistent backdoor" pairing is accurate (the
    source's actual sentence is "5.35 for a hidden affiliate link, 51.7 for
    credential harvesting, and 100+ (capped) for a persistent backdoor" — the
    outline picks the two contrasting endpoints of a three-item list, not a
    misquote).
  - Mitiga's own "What should organizations do about this?" section
    (checked fresh this pass for a check-5 mining question) recommends
    reviewing every skill installation and breaking down instruction
    behavior before approval — administrative/governance advice that
    validates this post's audit-before-install thesis rather than proposing
    a materially better alternative approach we're failing to surface. Not a
    check-5 finding.
- **Elevation (not gate): order 3's "the auditor Scout is building" reads as
  present-progressive/future, while order 2 (same outline) already
  establishes the pipeline has produced 2,554 live audits as of March
  2026.** Minor tense inconsistency across beats of the same piece — "built"
  or "runs" would match the reality that this is an operating system, not
  one still in progress. Low stakes since nothing false is claimed either
  way.
- **Elevation (not gate): order 6 attributes the intent/exposure split to
  the `not-all-malicious-is-equal` post specifically, but the actual design
  decision (three independent scores, intent separate from exposure) was
  made one post earlier in `we-rewrote-the-security-scoring-here-s-why`
  (2026-02-22).** The Feb 24 post extends that split with severity-weighting
  and a UI-color distinction — it illustrates and reinforces the idea, it
  doesn't originate it. Both posts are already cited in the outline (order 3
  cites the Feb 22 post, order 6 cites the Feb 24 one), so this is a
  precision nit about which post gets credit for "deliberately split," not a
  misattribution serious enough to gate.

## Post: 2026-07-15-grill-me-what-an-auditor-sees (DRAFT-stage pass, 2026-07-15)

- **NEW gate finding — Mitiga's repo-exfiltration skill mischaracterized as
  "found" (discovered in the wild) when the source says Mitiga built it as
  their own proof-of-concept.** Draft paragraph 2 (and the approved outline's
  order-2 `intendedBeat`/`facts` it was drafted from) both read "Mitiga also
  found a legitimate-looking skill that silently exfiltrated an entire local
  repo..." Fresh WebFetch of Mitiga's page this pass, asked directly: "Mitiga
  created a 'Testing-Validator' skill disguised as legitimate project testing
  guidance" as their own proof-of-concept, not a pre-existing skill they
  discovered already circulating. This is a real fidelity gap, not a nit —
  "found" implies this exact attack is already loose and presumably
  downloaded by real users (same register as the 200K-download Find-Skills
  example one sentence earlier); "built/created a PoC" is a materially
  different, more honest claim: the technique is proven to work, not
  necessarily deployed in the wild under this description. Slipped through
  three prior outline-stage passes of this exact post (all marked clean)
  because none of them re-checked this specific verb against the source's
  language — they verified the download count, the interaction count, and the
  empty-audit-log detail, but not "found" vs "built." Fix applied this pass:
  "The same research team built their own proof-of-concept skill, disguised
  as ordinary testing guidance, and used it to silently exfiltrate an entire
  local repo to an attacker's branch after just four user interactions." Watch
  for "found"/"discovered" specifically whenever this Mitiga PoC gets
  paraphrased in future passes — the accurate verb is "built"/"created"/
  "demonstrated."
- **Elevation, regression from the approved outline: "as of February 2026"
  framing for the Snyk/ToxicSkills figures is in the outline's order-2 `facts`
  field but missing from the rendered draft prose.** The outline explicitly
  carries the dating fix a prior ledger entry recommended ("Snyk's ToxicSkills
  audit, as of February 2026, scanned 3,984 skills..."), and a prior
  outline-stage pass confirmed this framing was present and "closes that
  outstanding elevation" — but the draft's actual sentence drops it entirely
  ("Snyk's ToxicSkills audit scanned 3,984 skills and found 36.82% had
  security flaws..."). Not gate-worthy (the underlying numbers are still
  accurate; this is a currency/precision nuance, consistent with how this
  exact issue was scored in prior passes), but it's a real regression from an
  approved-outline field into drafted prose — same shape as several other
  outline-fix-doesn't-survive-drafting patterns tracked elsewhere in this
  ledger for a different post.
- **Elevation, standing note still open: the featured 0/35/85/4.6 example's
  overallExposure number coincides with an illustrative (not real) example in
  the cited scoring-rewrite post.** Same open item from the second and third
  outline-stage passes — the math is internally consistent
  (0×1.0+35×0.01+85×0.05=4.6) and not proof of anything wrong, but the footer
  disclosure asserts this is "a real, anonymized meta-skill" without a
  provenance clause distinguishing it from the earlier post's own hypothetical
  "around 4.6" example. Suggested fix (still unapplied): add one clause to the
  footer confirming these four numbers were pulled fresh from a live
  marketplace audit.
- **Elevation, check-5 mining, softer than TD-0031 (reconfirmed this pass):**
  Obot's cited page proposes structural mitigations beyond audit-and-read
  (cryptographic publication signing, machine-checked capability manifests,
  gateway-enforced approved catalogs) that the post's honest-limit section
  (order 7) doesn't mention. The post doesn't overclaim — it already says
  "always review skills yourself" — so this isn't a product gap serious enough
  to gate, just a place one more honest sentence would go if a future pass
  wants to sharpen the limit beat (audit-and-read is a pre-install read layer,
  not a runtime enforcement layer).
- **CONFIRMED clean, re-verified fresh this pass:** misuseSurface definition
  (accident/carelessness only, no "on purpose"), "AI-audited" (not bare
  "audited") in the CTA, no OWASP mention anywhere, AST v1.0 formatting, the
  protected flare line ("You're not installing a snippet. You're putting an
  unread program in your agent's hands."), the protected ourTake line ("A
  single blended number would have buried the 85 under the friendly zero."),
  the four-item reach lists (not tricolons), four numbered findings in the
  "What earned the 85" section, marketplace.buildaloud.ai's audit description
  and disclaimer text verbatim (re-fetched fresh this pass).

## Post: 2026-07-15-grill-me-what-an-auditor-sees (DRAFT-stage pass, 2026-07-15, second review)

- **NEW gate finding — footer disclosure dropped the "not a real listing"
  clause the outline explicitly required as a factual-honesty load-bearer.**
  Order 8's `intendedBeat` specifies the footer must state "grill-me is a
  rhetorical stand-in, **not a real listing**" — this exact clause is what
  stops a reader from going to search the marketplace for a skill called
  "grill-me" after a whole post telling them "you'd install grill-me in a
  heartbeat" and "browse the AI-audited catalog." This draft's footer reads
  "Grill-me is a rhetorical stand-in invented for this post" — drops the "not
  a real listing" half entirely. "Invented for this post" is ambiguous on its
  own (a post could "invent" a framing device for a real thing); it doesn't
  foreclose the reader's reasonable next thought, which is "wait, is this an
  actual listing I could install?" Fix: "Grill-me is a rhetorical stand-in
  invented for this post, not a real marketplace listing." Watch for this
  clause specifically getting dropped again in future drafting passes of this
  post's footer — same failure shape as the "AI-audited" qualifier that kept
  regressing on the sibling `automate-blog-writing-with-ai-agents` post: a
  fix that lands in the outline doesn't automatically survive drafting.
- **Mitiga's "found" vs. "built" fix from the prior draft-stage pass held.**
  Re-verified: this draft correctly reads "The same research team built their
  own proof-of-concept skill and disguised it as ordinary testing guidance" —
  the earlier gate finding (mischaracterizing Mitiga's self-built PoC as
  something they "found" in the wild) did not regress.
- **NEW, confirmed accurate: the "Find-Skills... not one Mitiga built"
  parenthetical is correct and a nice precision addition.** Fresh WebFetch of
  Mitiga's page this pass, asked directly: Find-Skills is a pre-existing
  marketplace skill Mitiga cited for its 200K+ download count, not something
  Mitiga built themselves (that's the separate "Testing-Validator" PoC). The
  draft's new parenthetical — "(the example their research happened to pick,
  not one Mitiga built)" — correctly disambiguates the two skills in one
  clause, closing a fidelity gap that wasn't even flagged before this pass.
- **Elevation, still open: "as of February 2026" framing for the Snyk/
  ToxicSkills figures remains absent from rendered prose.** Same standing gap
  as the prior draft-stage pass — the number itself (3,984 / 36.82% / 76) is
  fresh-verified accurate via Obot (confirmed again this pass: "3,984 skills
  from ClawHub and skills.sh as of February 2026," "36.82%... contain at
  least one security flaw," "76 skills with malicious payloads" per Snyk's
  human review), just undated in the post's own prose.
- **Elevation, still open: 0/35/85/4.6 provenance clause still unadded to the
  footer.** Same standing note as both prior draft/outline passes — math
  checks out, coincidence with the scoring-rewrite post's own hypothetical
  "around 4.6" example is unresolved by a confirming clause either way.
- **Elevation, still open, softer than TD-0031: Obot's structural mitigations
  (crypto publication signing, machine-checked capability manifests, gateway-
  enforced catalogs) still unmentioned in the honest-limit beat (order 7).**
  Not gate-worthy — the post already says "always review skills yourself" —
  but the source has more to offer than audit-and-read if a future pass wants
  to sharpen this beat.
