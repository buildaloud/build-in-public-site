# Blog Bullshit Ledger

Memory for the `bullshit-detector` agent. It reads this first and writes back
after each run. This is the running record of overclaim patterns we've caught,
the honest framing each should use, and sources we've misread.

**How to use:** before checking a post, read the patterns below and apply them.
After checking, add any new overclaim + its honest reframe (correct an existing
entry rather than duplicating).

---

## Overclaim patterns (mechanism → honest framing)

- **Informal/DIY version of a thing sold as equal-or-better than the formal
  version the cited sources recommend.** Caught in the
  `dividing-a-company-that-makes-no-money` outline: it framed a single unsigned
  tie-break sentence between two friends as doing "more... than a stack of
  paperwork it doesn't need yet" — but both cited sources (Pillsbury Propel,
  Stripe) explicitly recommend written founders' agreements and vesting
  schedules from the earliest/preseed stage, not just after funding. Honest
  framing: the DIY version is the free *first* step, not a substitute for the
  formal one the sources treat as standard practice — name the upgrade path
  ("this turns into a real founders' agreement with vesting once money's
  involved") rather than implying paperwork is unnecessary at this stage.
  **RESOLVED as of the 2026-07-22 rewrite outline:** beat 7's gateGuidance now
  states the upgrade path plainly and no beat claims the DIY sentence
  substitutes for paperwork.
  **NEW MISATTRIBUTION caught in the same 2026-07-22 outline (still open):**
  the outline's fix for the above swung too far the other way — beat 7's
  `intendedBeat` now reads "the kind Pillsbury calls standard practice from day
  one, and Stripe treats as standard once funding shows up." Fresh WebFetch of
  the Pillsbury page: it never uses the phrase "standard practice" and never
  says "day one" — it calls a written founders' agreement "essential" and warns
  not to wait too long because "granting equity once value has been created
  introduces its own tax complications" (QSBS timing), which is urgency about
  *timing*, not a "standard practice from day one" characterization. The Stripe
  half is fine — its guide does call vesting standard, "critical after funding
  rounds." Honest framing: attribute Pillsbury's actual claim ("essential,"
  timing urgency around value-creation/tax) rather than the paraphrase-as-quote
  "standard practice from day one." Watch that future drafts of this post keep
  the Pillsbury attribution to what the source actually says.
  **CONFIRMED FIXED in the 2026-07-22 draft prose:** the shipped paragraph now
  reads "the kind Pillsbury calls essential to draft before value gets
  created. Its own guidance warns that waiting too long adds tax
  complications. Stripe treats it as standard once funding actually shows
  up" — WebFetch re-confirms Pillsbury's exact phrase is "Drafting a written
  founders' agreement is essential" (in "Tools and Tactics That Help"), and
  the tax-complication/QSBS-timing framing is accurate. No misattribution
  found. Nothing further to watch here unless the phrasing regresses.
- **Stat cited without its scope, implying a comparison the source never
  makes.** Same outline: it attributed the Wasserman/Pillsbury "~65% of
  high-potential startups fail due to co-founder conflict" stat with "ahead of
  market or product" — WebFetch of the Pillsbury page confirms it makes *no*
  comparison to market/product-driven failure causes at all; that ranking was
  invented by the outline, not sourced. Honest framing: state the stat on its
  own terms (the number is dramatic enough) and don't add a comparative claim
  the source doesn't support. **RESOLVED as of the 2026-07-22 rewrite outline:**
  beat 4's gateGuidance now explicitly instructs "Don't compare the stat to
  market or product failure causes: the Pillsbury source makes no such
  comparison" and bans the "Not market. Not product." fragment. WebFetch of the
  Pillsbury page reconfirms it still makes no such comparison. Watch that the
  drafted prose actually honors this guidance and doesn't reintroduce the
  invented ranking.
- **Unsupported "most X-searched"/"most-searched" superlative about a keyword's
  real-world search behavior, no citation.** Caught in the
  `dividing-a-company-that-makes-no-money` 2026-07-22 rewrite outline: beat 1's
  `intendedBeat` calls "splitting equity with a friend" "one of the
  most-searched founder anxieties" with nothing backing the ranking (no SERP/
  volume data cited anywhere in the outline or its sources) — the outline's own
  `facts` bullet for the same beat already uses the honest, unranked version
  ("one of the anxieties founders quietly Google and almost never bring up out
  loud"), so the intendedBeat text just needs to match its own facts bullet.
  Honest framing: describe it as a common, quietly-Googled anxiety, not a
  ranked/superlative search-volume claim nothing in the outline supports.
  **CONFIRMED FIXED in the 2026-07-22 draft prose:** beat 1 now reads "one of
  the anxieties founders quietly Google and almost never bring up out loud" —
  no superlative ranking.
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

- **Ratio/comparative speed fact rewritten into a stronger single-unit latency
  claim.** Caught in `teaching-a-robot-to-balance-my-game`, DRAFT-stage pass 3
  (2026-07-16): the approved outline's fact for the headless-rig beat is a
  ratio — "the rig completes hundreds of full playthroughs in the time
  rendering one takes" — but the draft rewrote it as "a full playthrough ...
  now finishes before the frame would've drawn," which claims a single
  playthrough completes inside one render frame's budget (~16ms). That's a
  materially stronger, different, and unsupported claim — nothing in the fact
  base or repo backs a sub-frame single-playthrough time. Honest framing: keep
  speed claims in the same shape they were verified in; a ratio stays a ratio
  ("hundreds of playthroughs in the time it used to take to watch one"), don't
  convert it into an absolute per-unit latency number no source supports.

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

- **CLEAN PASS — 2026-07-15, OUTLINE-stage bullshit-detector review of "How I
  Automate Blog Writing With AI Agents" (13-paragraph outline, meta hook
  "Twelve stages run before one of these posts ships. By default, I sign off
  on exactly one of them.", new CTA shape: order-13 "Install the machine this
  post described" — the open-source `agentic-content-pipeline` npm package,
  replacing the earlier Skills Marketplace CTA).** Zero gate findings. All
  standing patterns held: "by default" hedge on every "only human checkpoint"
  restatement (meta hook, order-1 facts); round cap "five" everywhere (order-4,
  order-7), fresh-verified against `SKILL.md` lines 199/238 ("round cap 5" on
  both the outline loop and draft loop); no "blind" language in order-5, which
  correctly says each reviewer "reads the entire draft and grades exactly one
  axis"; link-integrity described as "mostly binary" (order-6), never "no
  judgment call"; aiScore threshold correctly "15 or above out of 100," "adds
  100 points" correctly framed as the internal pre-clamp mechanism (order-8);
  gate timing correct (before first round, after every edit pass, final
  re-score after loop exits), never "at the end"; twelve-stage count has
  Assemble/Commit as separate list items, tone gate folded into the
  draft-review-loop entry; run-one/run-two numbers (42, 35 em-dashes/2,000
  words, bar 2→15 framed as "dead level with the corpus's own measured human
  baseline" — NOT the banned "scores 10 to 15" phrasing — 6→22, count
  oscillation 10/5/7) all intact and correctly hedged. New ground verified
  fresh this pass, not just re-trusting the ledger: (1) outline-loop reviewer
  count — order-4 claims "Twelve single-axis reviewers grade the outline in
  their own fixpoint loop"; read `SKILL.md` Step 4.6's fan-out list directly
  (`hook-reviewer, impact-reviewer, emotion-reviewer, flatness-reviewer,
  formulaic-reviewer, voice-reviewer, seo-reviewer, link-opportunity-reviewer,
  outline-structure-reviewer, meta-content-reviewer, fact-checker,
  bullshit-detector`) — exactly 12, confirmed accurate, first time this
  specific outline-loop headcount has been checked against code rather than
  assumed; (2) draft-loop roster — order-5's structural/craft/integrity
  15-axis breakdown matches `SKILL.md` Step 6's 15-reviewer fan-out list
  field-for-field; (3) register-detector thresholds in order-8's facts
  (dramatic inversions first-free-then-+6-capped-18, punch fragments
  first-ten-free-then-+1-capped-6, sales speak +5-each-capped-15) — read
  `tone-grader.ts` lines 228/234/235 directly, all three formulas match
  exactly; (4) the new CTA's install command — "npx agentic-content-pipeline
  setup --harness claude (swap the flag for --harness codex, or drop it
  entirely for prompt-file dispatch)" — verified against
  `agentic-content-pipeline/bin/acp.mjs` and `setup.ts` (harness flag accepts
  claude|codex|none, no-flag path is documented as prompt-file dispatch) and
  confirmed the package is actually published on npm (v0.1.1, published
  2026-07-14/15, matching `package.json`'s repo URL) — the command is real
  and runnable, not aspirational; the post's own pubDate (2026-07-13) predates
  the package's npm publish date, and the outline correctly stays present-tense
  without claiming a past release, and correctly avoids claiming build-aloud
  itself already runs on the package ("still finishing its own swap onto the
  published version" — matches the standing TD-0038 caution). Fresh WebFetch
  re-verification of Google Research's agent-scaling post: "centralized
  coordination improved performance by 80.9% over a single agent" and "every
  multi-agent variant we tested degraded performance by 39-70%" both verbatim,
  matching order-11 exactly. No Osmani citation in this outline (see standing
  elevation below).
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent again, not cited anywhere in this outline's
  `sources`/`links`.** Same standing gap as essentially every pass of this
  post tracked in this ledger — a real counter-argument (Addy Osmani's own
  agent-teams writeup: "three focused teammates consistently outperform five
  scattered ones," and his prescribed review pattern is one capable,
  tool-equipped reviewer per 3-4 builders, not fifteen narrow single-axis
  critics) sits unaddressed in a post built entirely around a many-narrow-
  reviewer design. Not a gate finding since check 5 only applies to sources
  actually cited. Recommended reconciliation text, ready to insert into
  order-11 (the "Splitting work costs something real" honest-limit beat) if
  this keeps recurring: "Addy Osmani's own review-pattern research cuts
  against this directly — his data says three focused teammates consistently
  outperform five scattered ones, and his prescribed pattern is one capable,
  tool-equipped reviewer per three or four builders, not fifteen narrow
  single-axis critics. My reconciliation: his reviewers lean on objective
  pass/fail tools — lint, tests, security scans — that don't exist for prose,
  so splitting judgment by axis substitutes for the test suite writing doesn't
  have. That's a bet worth stating plainly, not assuming away." (Would also
  need Osmani's piece added to `sources` for this to become a check-5 gate
  item rather than a standing elevation.)

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

## Post: automate-blog-writing-with-ai-agents (OUTLINE-stage pass, 2026-07-15,
this specific 13-paragraph outline)

- **NEW gate finding, cross-confirms fact-checker: order-13 CTA claims present-
  tense operational parity ("This blog runs on that package") that
  `tickets/TD-0038-switch-build-aloud-onto-agentic-content-pipeline.md` (status
  open, created 2026-07-15, every checkbox unchecked) disproves.** Read that
  ticket directly: build-aloud's in-repo pipeline and the extracted
  `agentic-content-pipeline` npm package "have already drifted apart," and
  "Consolidate build-aloud onto the published package" is open, unstarted
  work — confirmed no `node_modules/agentic-content-pipeline` in build-aloud
  and `content-pipeline.config.json` points at the in-repo skill, not an
  installed package. Separately verified the package itself is real: public
  GitHub repo, published to npm (0.0.1/0.1.0/0.1.1 as of 2026-07-15), `npx
  agentic-content-pipeline setup` is the package's own documented quick-start
  — so the honest fix is not deleting the CTA, it's dropping the "this blog
  runs on it" claim specifically. Same finding as `docs/blog-facts.md`'s
  2026-07-15 outline-stage entry (independently reached, not just copied) —
  recommended framing there: describe it as "the same design," not as
  literally what's serving this blog today. Applied fix this pass to both the
  `facts` bullet and `intendedBeat`, plus a standing-caution addendum on
  `gateGuidance` so this doesn't need re-deriving every pass. **Watch this
  claim on every future revision until TD-0038 actually ships** — once it
  does, "this blog runs on that package" becomes true and the caution can
  retire.
- **NEW gate finding: order-9's "10 to 15 on density alone" human-prose
  baseline is the same disproven figure `docs/blog-facts.md` has now caught
  regressing on this exact beat at least three times (2026-07-14, 2026-07-15
  draft, 2026-07-15 outline).** `.claude/skills/human-tone/SKILL.md` line 10
  states the measured human baseline is **aiScore ~2**, not 10-15 on any
  named sub-signal — `tone-grader.ts` has no "density" component that scores
  10-15 for ordinary human prose either. The accurate story (already
  correctly stated in several earlier passes of this same beat, per this
  ledger's own history) is that the old gate of 2 sat dead level with the
  measured human baseline of ~2, so ordinary variance in ordinary prose was
  enough to trip it — not that normal prose "scores 10-15." This is now a
  standing landmine specific to this exact beat: it keeps getting written
  correctly, then regenerated wrong in a later pass, over and over. Fix
  applied this pass to the `facts` field; also strengthened `gateGuidance`
  with an explicit ban on the "10 to 15" phrasing so a future editor doesn't
  have to re-derive this from source code each time.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent from this outline, not cited anywhere in
  `sources`/`links`.** Same standing gap as every prior pass of this post —
  reconciliation text already drafted in earlier entries above, reuse if this
  keeps alternating.
- **Elevation: order-5's `gateGuidance` guards against "blind to each other"
  specifically, but the phrase that has actually regressed six-plus times
  across this post's history is "blind to [everything outside] its own
  lane"/"blind to the rest of the document" — a claim about input visibility,
  not about reviewers seeing each other's output.** "Blind to each other" is
  a different (and true) claim — reviewers don't see sibling reviewers'
  findings mid-round — so the current guidance isn't wrong, just aimed at a
  phrase that isn't this post's actual recurring failure mode. Recommend
  broadening `gateGuidance` to name the historically dominant phrasing
  explicitly ("reviewers read the whole draft; 'blind to its own lane' /
  'blind to the rest' is the wrong-fact regression to watch for, not input
  visibility") so the guidance matches what actually keeps regressing.
- **CONFIRMED clean, re-verified fresh this pass (not just ledger trust):**
  round cap "five" everywhere (order-4, order-6, order-7 — cross-checked
  against `SKILL.md` lines 199/238); plateau-exit mechanic in order-7 matches
  `SKILL.md`'s exact wording (apply-once-more-then-exit if the round's gate
  count doesn't fall below the prior round's); no "blind" language anywhere
  in order-5, which correctly states each reviewer "reads the entire draft
  and grades exactly one axis"; link-integrity described as "mostly binary"
  (order-6), never "no judgment call"; aiScore threshold correctly "15 or
  above out of 100" with "adds 100 points" correctly framed as the internal
  pre-clamp mechanism (order-8); register-detector caps in order-8 — dramatic
  inversions (first free, +6 each, capped 18), punch fragments (first ten
  free, +1 each, capped 6), sales speak (+5 each, capped 15) — all verified
  exact against `tone-grader.ts`'s actual formulas; "by default" hedge present
  on the "only human checkpoint" claim in order-1 and order-3, with the
  round-cap-to-Chad escalation stated correctly; twelve-stage count in
  order-3 has Assemble and Commit as separate items, tone gate folded into
  the draft-review-loop entry; both protected sentences present verbatim
  ("Catching a broken structure at the outline costs an outline. Catching it
  after a full draft costs a rewrite." in order-4, "The gate I trust most is
  the one with no opinion." in order-8 and the meta `flare` field). Fresh
  WebFetch this pass of the two highest-misquote-risk external sources not
  independently re-verified in the immediately preceding passes: npm registry
  (`agentic-content-pipeline` — public, 3 published versions) and the
  package's public GitHub repo (public, README quick-start command matches
  the outline's claim verbatim). Anthropic 90.2%/four-elements/June-2025,
  Google Research 80.9%/39-70% range, Google spam-policy scaled-content-abuse
  definition, and Rankability's 83% figure were not re-fetched this pass
  (already fresh-confirmed multiple times this post's history with no drift)
  but the outline's phrasing of each matches the long-standing confirmed
  wording verbatim.

## `automate-blog-writing-with-ai-agents` — 2026-07-15 OUTLINE-stage review, THIS
13-paragraph outline, third check (new gate findings not caught by the two
prior "clean pass / zero gate findings" reviews of the same outline)

- **NEW gate finding: order-13 `intendedBeat` uses the exact banned phrase the
  TD-0037/TD-0038 caution warns against, hedge attached but risky to carry into
  drafting.** Text: "The graded outline, the reviewer roster, the core of the
  deterministic tone gate, the memory ledgers: **the same core machinery
  described above**, installable with npx agentic-content-pipeline setup — the
  newest tone-gate refinements are still catching up to the package, but the
  structure underneath them is the same." This post's own standing gateGuidance
  (order 13) explicitly says: "Never claim the package installs 'the same
  machinery described above' or 'the same tone gate' without that hedge." The
  hedge IS present in this sentence, so it's not a bare violation — but the
  banned phrase sits in `intendedBeat`, the field most likely to get compressed
  by a drafter reaching for a punchy clause and dropping its trailing hedge
  (exactly how the sibling "AI-audited" qualifier and the present-tense parity
  claim both regressed at draft stage multiple times on this same CTA beat, per
  entries above). Also worth naming precisely: the specific mechanisms not yet
  ported per TD-0037 are the tone gate's three register detectors (dramatic
  inversions, punch-fragment density, sales speak), not a vague "newest
  refinements" — naming them removes ambiguity a drafter could round away.
  **Fixed this pass** (see `elevations`/`gateFindings` in the structured
  output) — replace with a version that never states "the same machinery"
  without the specific unported mechanisms named in the same clause, not just
  a trailing aside.
- **NEW gate finding: meta `emotionalCore` field claims the reader "can install
  the fixed machine" — a present-tense claim the post's own order-13 `facts`
  field already hedges against.** Full text: "The machine is credible because
  it broke on its own story in public with every fix visible, and now the
  reader can install the fixed machine with one command." Per TD-0038 (open,
  unstarted) and TD-0037 (three register detectors "landed in build-aloud only,"
  not yet ported), the npx-installed package is NOT "the fixed machine" — it's
  the pre-fix design, missing the specific fixes (the register detectors) that
  the post's own run-one/run-two beat (order 9) just spent a full section
  narrating as the machine's actual fix. This is a top-level meta field
  (feeds the post's emotional throughline / likely CTA framing), not a
  paragraph-level fact, which is why the two prior "zero gate findings" passes
  of this exact outline missed it — those passes checked paragraph `facts`
  fields closely but not this meta field's wording. Fix applied this pass (see
  structured output): soften "the fixed machine" to something that doesn't
  claim operational parity with the specific fixes just narrated.
- **Confirms via direct WebFetch, still accurate, no new issues:** Anthropic's
  "research the semiconductor shortage" vague-instructions example (order 10
  `intendedBeat`) — confirmed verbatim in spirit: source says the instruction
  "often were vague enough that subagents misinterpreted the task or performed
  the exact same searches as other agents," with one subagent exploring the
  2021 automotive chip crisis while two others duplicated 2025 supply-chain
  work. Outline's paraphrase ("left subagents guessing, and they'd misread the
  task or duplicate each other's searches") is accurate, unquoted, no
  fabrication.
- **Elevation, unincorporated across 3+ consecutive passes now: order-10's
  "June 2025" dating.** Anthropic's exact publish date is June 13, 2025; the
  outline still says the looser "June 2025." Low stakes, offered again since it
  keeps not landing.
- **Elevation, unincorporated across 3+ consecutive passes now: order-6's
  Haiku/Sonnet backdoor recap still drops the concrete exposure-score jump
  (1.75 → 5.65) and shim path (`~/.codex/bin/codex`)** that made the
  miss/catch contrast vivid in earlier revisions of this post.
- **Elevation, still standing (Osmani "focused beats scattered" reconciliation
  absent, not cited in `sources`):** same gap as every prior pass. Reconciliation
  text is fully drafted in earlier entries of this ledger — reuse it if this
  keeps alternating pass to pass instead of re-deriving.
- **New minor elevation: order-9 `ourTake` closer slightly overclaims what a
  memory ledger can guarantee.** "writing the recurring mistakes into ledgers
  keeps them from coming back" reads as a stronger guarantee than the
  mechanism earns — per the strength-word watchlist ("keeps... from" reads
  closer to "guarantees" than "reduces"), and this exact post's own edit
  history (documented at length above) shows mistakes recurring repeatedly
  even with tracking systems in place. This is flagged as `gateGuidance`
  protects this line verbatim for drafting — so treat as elevation-only, not a
  gate finding, out of respect for that existing editorial intent; offering a
  softer alternative in case a future pass wants it.

## `automate-blog-writing-with-ai-agents` — 2026-07-15 DRAFT-mode pass, this
specific rendering (opens "Publishing this post takes twelve pipeline stages,
and by default I sign off on exactly one of them.", CTA is the
`agentic-content-pipeline` npm package — not a Skills Marketplace CTA)

- **CLEAN PASS — zero gate findings.** Every standing landmine for this post
  checked clean in this exact rendering, including the two that were still
  live as of the most recent outline-stage passes (the "this blog runs on
  that package" present-tense parity claim and the unhedged "the fixed
  machine" phrasing) — both are already fixed here: the CTA says Build Aloud
  is "still finishing its own swap onto the published version" and names the
  three specific unported register detectors rather than claiming operational
  parity, and the closing line says "that same design," never "the fixed
  machine." Also clean: "by default" hedge present on both "only human
  checkpoint" restatements (opening line and "Past that one topic gate, I'm
  out of the room by default until the post is live"); round cap "five
  rounds" (outline loop and draft loop); no "blind to its lane" language
  anywhere in the fifteen-reviewer section (states "reads the entire draft
  but grades exactly one thing"); link-integrity "mostly binary," never "no
  judgment call"; aiScore threshold correctly "15 or above out of 100," with
  "adds 100 points" correctly framed as the internal pre-clamp mechanism;
  gate timing correctly "before the first round and again after every edit
  pass," plus the post-loop re-score, never "at the end" only; twelve-stage
  count has Assemble and Commit as separate list items, tone gate folded into
  the draft-review-loop item; the "10 to 15 on density" wrong human-baseline
  figure did not recur — the run-one/run-two section correctly says the old
  bar of 2 was "dead level with the corpus's own measured human baseline,"
  with the make-ai-writing-sound-human link threaded on that specific detail
  per the outline's gateGuidance, not as a bare see-also; all four protected
  sentences present verbatim ("Catching a broken structure at the outline
  costs an outline. Catching it after a full draft costs a rewrite.",
  "I'd rather stall the whole run than ship something broken that looks
  finished.", "Telling an editor what was wrong never converged. Handing it
  the fix did.", "The gate I trust most is the one with no opinion." — present
  in body prose, not just as a heading — and "That's why I get to touch the
  draft least of anyone and still trust what ships."). Fresh WebFetch
  re-verification this pass of all five external sources cited: Anthropic's
  90.2% Opus-lead/Sonnet-subagent figure, the four-element subagent list
  (objective, output format, tool/source guidance, task boundaries), the
  "research the semiconductor shortage" vague-instructions example, and the
  4x/15x token multipliers — all verbatim; Google Research's 80.9%
  parallel-gain figure and the 39-70% sequential-degradation range, correctly
  hedged as a range in the draft ("39 to 70 percent," never a flat number);
  Augment Code's summary ("+81%"/"up to 70% worse") matches; Google's live
  spam-policy page's scaled-content-abuse definition, paraphrased with no
  quotation marks, and generative AI confirmed as an example within that same
  section (draft says "named ... in that same policy section," not
  "separately" — accurate); Rankability's 83%-human-written figure with its
  "directional finding from a focused sample" caveat carried through
  correctly. No misattributed quotes, no dropped range-hedges, no fabricated
  figures found.
- **Elevation, still recurring across nearly every pass of this post: Osmani's
  "focused beats scattered" reconciliation is absent again, not cited in this
  draft's Sources.** Not a gate finding — check 5 only applies to sources this
  draft actually cites, and Osmani isn't cited here. Reconciliation text
  already drafted in earlier entries above (his reviewers lean on objective
  pass/fail tools that don't exist for prose, so splitting judgment by axis
  substitutes for the test suite writing doesn't have) — reuse if a future
  pass decides to cite him instead of continuing to alternate.
- **Elevation, unincorporated across 4+ consecutive passes now: "June 2025"
  dating for Anthropic's multi-agent write-up could tighten to its exact
  publish date, June 13, 2025.** Low stakes, offered again since it keeps not
  landing.

## `automate-blog-writing-with-ai-agents` — 2026-07-15 DRAFT-mode pass, next
rendering (opens "Publishing this post takes twelve pipeline stages. By
default, I sign off on exactly one of them.")

- **CLEAN PASS — zero gate findings.** Every standing landmine held in this
  rendering: "by default" hedge present twice ("By default, I sign off..." and
  "Past that one topic gate, I'm out of the room by default until the post is
  live"); round cap "five rounds" both places; no "blind" language in the
  fifteen-reviewer section ("reads the entire draft but grades exactly one
  axis"); link-integrity "mostly binary," never "no judgment call"; aiScore
  threshold "15 or above out of 100," banned-phrase-adds-100 correctly framed
  as internal pre-clamp; gate timing "before the first round and again after
  every edit pass" plus the post-loop re-score, never "at the end" only;
  twelve-stage list has Assemble/Commit as separate items, tone gate folded
  into item 8; the "10 to 15 on density" wrong human-baseline figure did not
  recur (correctly "dead level with the corpus's own measured human
  baseline," linked to the make-ai-writing-sound-human post on that specific
  detail, not as a bare see-also); all five protected sentences present
  verbatim including the flare line in body prose, not just the heading; CTA
  correctly hedges both TD-0038 (blog not yet swapped onto the package) and
  TD-0037 (three register detectors not yet ported, named specifically:
  dramatic-sequencing inversions, punch-fragment density, sales speak), no
  "this blog runs on that package" or "the fixed machine" claim, uses "that
  same design" instead. Haiku/Sonnet backdoor recap now includes the concrete
  1.75 → 5.65 score jump and the `~/.codex/bin/codex` shim path (closes a
  4+-pass-standing elevation from earlier reviews).
- **NEW, minor — soft elevation, not gate: "I let this exact post run for
  months, describing a machine that no longer existed" attaches a specific,
  unverifiable duration to the stale-description admission.** This post's own
  pinned pubDate (2026-07-13T15:00:00Z) sits only two days before the review
  date (2026-07-15); a rewrite that keeps the same pubDate gives a reader no
  way to independently confirm "months" one way or the other, and no ledger
  entry or repo artifact found this pass establishes when the eight-stage
  version was actually first live. Not provably false (the blog's own
  timeline spans Feb-July 2026, so "months" is plausible), but it's the same
  shape as the earlier "thirty-some posts" catch — a plausible-sounding
  specific figure nobody could verify against ground truth. Since it can't be
  confirmed OR disproven with available tools, scored as an elevation, not a
  gate finding. Recommended fix: drop the specific duration, keep the
  self-deprecating admission — "I let this exact post describe a machine that
  no longer existed."
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation absent, not cited in this draft's Sources.** Same standing
  gap as every prior pass. Reconciliation text fully drafted in earlier
  entries above — reuse if a future pass decides to cite him.
- **Elevation, unincorporated across 5+ consecutive passes now: "June 2025"
  dating for Anthropic's multi-agent write-up could tighten to its exact
  publish date, June 13, 2025.

## `writing-alt-text-seo-accessibility` — 2026-07-15 OUTLINE-mode pass (first
bullshit-detector pass on this post; pubDate 2026-07-16)

- **NEW gate finding — the post's own cited W3C source draws a decorative-vs-
  informative distinction, and a "meaning not literal description" principle,
  that the shipped rule and the post's "no conflict" thesis never engage.**
  WebFetched `w3.org/WAI/tutorials/images/decorative/` and
  `.../informative/` directly (both are the exact source cited in beat 2/the
  Sources footer, `w3.org/WAI/tutorials/images`, not a new source). Decorative
  page: images that are "illustrative of adjacent text but not contributing
  information ('eye-candy')" should get `alt=""`, not a description —
  "whether to treat an image as decorative or informative is a judgment only
  the author can make." Informative page: "the text alternative should convey
  the meaning or content that is displayed visually, which typically **isn't**
  a literal description of the image." This blog's hero images are stylized,
  abstract, generative-art mood pieces tied to each post's theme (per the two
  quoted examples: "a dark telemetry panel with a mint signal line...", "two
  black server racks, one glowing teal...") — closer to the source's own
  definition of decorative/eye-candy than to its informative-image examples
  (which are all concrete/representational: photos, icons, diagrams). The
  shipped rule ("describe what's in the image first") defaults every hero
  image to a literal, informative-style description without ever naming that
  choice, let alone weighing it against the source's own preferred pattern.
  Separately confirmed this isn't just an accessibility-side nuance: WebFetched
  the cited Google image-SEO page for the same question — it has **no**
  guidance on decorative images or `alt=""` and implicitly wants every image
  to carry "useful, information-rich content" in its alt attribute for image
  search. That's a real, source-grounded tension the post's "Same Text, No
  Conflict" framing skips: accessibility best practice (per the cited W3C
  source) says some of these images should get empty alt, while the cited SEO
  guidance pulls toward filling every one. Fix applied this pass: one honest
  caveat sentence inserted into beat 4 (the "rule I actually shipped" beat),
  not a rewrite of the methodology or a demand to change 17 already-published
  images — see the applied edit. If this warrants an actual product change
  (e.g. auditing which hero images should be decorative/`alt=""` going
  forward), that's a ticket for Step 11.5, not a prose fix; flagging here so a
  future pass can open one if the caveat sentence isn't judged sufficient.
- **Elevation, not gate: Yoast's page directly block-quotes Google, crediting
  it, for the exact "keyword stuffing...negative user experience...spam"
  sentence — confirmed via direct WebFetch of the live Yoast page asking
  specifically about attribution.** The outline's beat 3 draws its
  "convergence" claim between the W3C (beat 2) and Yoast (beat 3) reaching the
  same answer "from opposite directions" — that claim is still accurate IF the
  Yoast side of the convergence is grounded in Yoast's own original phrasing
  ("if a keyphrase could be useful for finding something that is on the
  image, include it in the alt tag if you can," and "We're not saying you
  should spam your focus keyphrase into every alt tag" — both Yoast's own
  words, confirmed present on the page), not in the sentence Yoast borrowed
  from Google. Not gate-worthy since the outline's own paraphrase ("work a
  keyphrase into alt text only when it's genuinely relevant... never spam it
  into every one") already matches Yoast's own words, not the borrowed Google
  one — but worth a drafting note so a future pass doesn't accidentally
  source the convergence claim to the borrowed sentence instead.
- **Elevation, not gate: the backfill's actual mechanism (vision-based read of
  the rendered PNG vs. paraphrasing the image-generation prompt) isn't
  independently verifiable from the repo.** `SKILL.md` Step 8 ("Hero Image")
  only says "Any path: author alt text, and carry both the image path and alt
  text to Assemble" — no explicit instruction to view the rendered image
  (vision/Read-tool) rather than restate `Brief.imageConcept` (the generation
  prompt). No dedicated backfill script or agent definition found in
  `scripts/` or `.claude/agents/` for the one-time retroactive backfill either.
  The existing alt text's level of rendered-specific detail ("one faint early
  blip," a specific unplugged-cable detail) reads like genuine visual
  description rather than generic prompt paraphrase, so this wasn't scored a
  gate finding — but it's unconfirmed, not confirmed, and the outline's claim
  ("described what was really in the frame... a deliberate step up from
  guessing off a filename") asserts the stronger, unverified version. Worth
  tightening if a future pass wants to make this claim bulletproof rather than
  plausible.
- **Cross-reference, not this axis's finding: fact-checker's `facts.md`
  already flags "15 hero images" as a miscount (real count is 17, verified
  independently this pass too — 17 posts with a `heroImage` field and
  `pubDate <= 2026-07-16T15:00:00Z`, excluding this post itself) across every
  outline/draft field restating that number.** Not duplicated into this
  pass's gateFindings — it's a pure count error, fact-checker's axis, not an
  overclaim or source-misread. Noted here only so a future bullshit-detector
  pass doesn't waste a WebFetch/grep cycle re-deriving the same count; defer
  to `facts.md`'s entry for the full list of qualifying posts.

- **RESOLVED — 2026-07-15, second OUTLINE-mode pass on
  `writing-alt-text-seo-accessibility` (title now "Alt Text for SEO and
  Accessibility Is One Job," rewritten from the prior "Same Text, No
  Conflict" outline).** The decorative-vs-informative gate finding above is
  fixed: order 4's `intendedBeat`/`ourTake`/`facts` now name the gap
  outright — the W3C splits images into decorative/informative, prefers
  `alt=""` for pure mood/eye-candy, and even informative alt text should
  chase meaning over literal description (W3C's own "happy family" →
  "We're family-friendly" example, re-verified this pass, cited correctly) —
  and states plainly that the shipped rule defaults every hero image to a
  literal description without weighing that call. Order 4's `gateGuidance`
  also now includes the follow-up-ticket instruction (audit the 17 hero
  images against the decorative/informative test post-ship) and order 8
  calls back to the admission being left open ("didn't resolve the
  decorative-versus-informative call... that one's still open"). Fresh
  WebFetch this pass of every cited source (W3C decorative/informative/
  general-images tutorials, Google image-SEO page, Yoast, yatil.net,
  WCAG 2.1 SC 1.1.1, WHATWG HTML living standard's alt section) — all
  quotes/paraphrases in the outline match verbatim, including the two
  previously-verified Google strings, the Yoast "spam your focus
  keyphrase"/"include it if you can" original phrasing (not the borrowed
  Google sentence), the JAWS-splitting provenance for the 125-char myth, and
  yatil.net's "picture it over the phone" test. No character limit found in
  either WCAG 1.1.1 or the WHATWG spec, matching the outline's claim. Zero
  gate findings this pass — treat this outline's order-4 caveat as the
  template fix if the decorative/informative gap ever resurfaces stripped out
  in a future draft-stage pass (drafters have dropped honest-limit caveats
  under editing pressure before — see the multi-pass "Osmani reconciliation"
  entries above for the same failure shape on a different post).
- **Elevation, not gate: "every post on this blog" overclaims heroImageAlt's
  actual scope.** `content.config.ts` line 18 confirms `heroImageAlt` is an
  optional schema field, and only the 29 (of 52 total) blog posts that
  actually carry a `heroImage` use it — 23 published posts have neither
  field. Order 1's `facts` field ("A heroImageAlt field was added to every
  post on the blog.") reads as literally-every-post when only
  hero-image-carrying posts apply. Softer than a gate finding since the very
  next clause in the same beat ("then backfilled across all 17 hero images
  live so far") already implicitly scopes it for a careful reader — but worth
  tightening at the fact level so the drafter doesn't need to infer the scope
  from context. Fix: "A heroImageAlt field was added for every post that
  carries a hero image."
- **Elevation, still-standing: the backfill's actual mechanism (vision-read of
  the rendered PNG vs. paraphrasing `Brief.imageConcept`) remains unconfirmed
  by any repo artifact.** Same gap flagged in the prior outline pass — no
  dedicated backfill script/agent found this pass either, and `SKILL.md`
  Step 8 still only says "author alt text" with no vision-vs-prompt
  instruction. Order 6's `facts` ("AI agents examined each of the 17 hero
  images one at a time and described the frame before writing alt text.")
  and `ourTake` ("the agent has to look at the actual pixels first") both
  state the stronger, unverified version as settled fact. The resulting alt
  text (rendered-specific details like "one faint early blip," "unplugged
  cable above it") still reads like genuine visual description rather than
  generic prompt paraphrase, so this stays an elevation, not a gate finding —
  but recommend the drafter verify against the actual backfill commit/
  transcript before asserting the mechanism outright, and soften to the
  provable claim (the alt text reads like real visual description) if it
  can't be confirmed.
- **Elevation, new this pass: Sources footer instruction omits the WHATWG
  HTML living standard citation.** Order 8's `gateGuidance` lists "all seven
  external sources cited across this outline" for the footer but the list
  only names six W3C/Google/Yoast/yatil.net sources — it drops
  `html.spec.whatwg.org`, which order 5 explicitly cites for the "no
  character limit in the HTML spec" half of its claim. Under-attributes a
  claim the post makes. Fix: update the count to eight and add "the WHATWG
  HTML living standard's alt-text section" to the footer list.

## `writing-alt-text-seo-accessibility` — 2026-07-15 DRAFT-mode pass (first
draft-stage bullshit-detector pass on this post)

- **CLEAN PASS — zero gate findings.** The decorative-vs-informative gate
  finding from the first outline pass is still correctly resolved in the
  rendered draft: the "rule I actually shipped" section carries the full
  honest-gap paragraph naming the W3C decorative/informative split, the
  "We're family-friendly" example, and the open admission ("I still haven't
  gone back and checked..."), and the closing section calls back to it
  ("didn't resolve the decorative-versus-informative call... that one's still
  open"). Fresh WebFetch this pass (not just ledger trust) of every source
  the draft actually quotes or attributes: Google's image-SEO page (spam
  warning + "Dalmatian puppy playing fetch" — both verbatim), W3C's
  informative-images page ("We're family-friendly" + the meaning-over-literal
  framing — verbatim), W3C's decorative-images page (empty-alt guidance for
  eye-candy/mood images — matches paraphrase), W3C's general images tutorial
  ("Images must have text alternatives that describe the information or
  function represented by them" — matches the draft's paraphrase), WCAG 2.1
  SC 1.1.1 (verbatim quote confirmed, no character limit stated), the WHATWG
  HTML living standard's alt section (confirmed no character limit), and
  yatil.net (JAWS-splitting provenance + "picture it over the phone" test,
  both verbatim). Also re-verified the Yoast attribution nuance flagged as an
  elevation at outline stage: Yoast's page does directly quote-and-credit
  Google for the "negative user experience/spam" line, and the draft
  correctly attributes that line to Google, not Yoast — Yoast is only
  credited for its own independent "don't spam a focus keyphrase" framing.
  Correct, no misattribution. Also directly diffed the two quoted hero-image
  alt-text strings against the live frontmatter
  (`2026-07-09-how-to-measure-blog-seo.md` and
  `2026-07-08-cloudflare-pages-functions-404-custom-domain.md`) — both match
  character-for-character, including the middle-dot separator in the
  Cloudflare example.
- **Elevation, still standing from outline stage: Sources footer is missing
  the WHATWG HTML living standard citation.** Confirmed still true in the
  rendered draft — the footer lists exactly seven sources (Google, W3C
  general/decorative/informative, WCAG, Yoast, yatil.net) even though the
  125-character-myth paragraph explicitly names "the WHATWG HTML living
  standard's alt-text section" as half of its no-character-limit claim. Same
  fix as the outline-stage entry: add
  `[WHATWG HTML Living Standard: the alt attribute](https://html.spec.whatwg.org/multipage/images.html#alt)`
  to the footer.
- **Elevation, still standing from outline stage: "every post on this blog"
  overclaims heroImageAlt's actual scope.** `content.config.ts` confirms
  `heroImageAlt` is optional and only used by the 29 (of 52) posts carrying a
  `heroImage`; 23 published posts have neither field. The draft's opening
  sentence still reads "I added a heroImageAlt field to every post on this
  blog" with no scope qualifier — same gap as the outline-stage finding, not
  yet applied at draft stage either. Recommended fix carried forward: "every
  post on this blog that carries a hero image."
- **Elevation, still standing from outline stage: the backfill's actual
  mechanism (vision-read of the rendered PNG vs. paraphrase of
  `Brief.imageConcept`) remains unconfirmed by any repo artifact.** Same gap
  as both outline passes — no dedicated backfill script/agent found, and the
  draft states the stronger, unverified version as settled fact ("Each
  agent's instruction was to describe what's actually visible in the frame,
  not fall back on the original image-generation prompt"). The resulting alt
  text still reads like genuine visual description, so this stays an
  elevation, not a gate finding, but flag for the drafter/editor to confirm
  against the actual backfill transcript if this claim needs to be
  bulletproof rather than plausible.

- **NEW gate finding — 2026-07-15/16 DRAFT-mode pass, a fresh revision of this
  post ("Alt Text for SEO and Accessibility Is One Job," rewritten again from
  the "Same Text, No Conflict" version this ledger tracked above).** Order-2's
  paragraph now asserts a precise, unconfirmed split: "9 of the seventeen
  carried an empty alt="" that told a screen reader nothing... The other 8
  shipped with a real description already in place." No tool available this
  pass (no Bash/git access) to check the backfill commit history, and no
  confirmation of this split found anywhere in `docs/` (checked
  `facts.md`, which independently re-verified the 17-count and every quoted
  source this same day but never confirmed a 9/8 breakdown). This is the same
  failure shape flagged repeatedly elsewhere in this ledger — a precise,
  checkable number about our own system with no traceable source (see
  "thirty-some posts," "three rounds," "aiScore >= 2"). It also reverses the
  outline's own two-failure-state framing (order 2's `intendedBeat`
  explicitly describes TWO bad states — no alt at all, and separate generic
  filler — and explicitly says "Don't assert a specific form for that filler
  ... unless the commit history actually confirms it") into a
  failure/already-fine split that understates how broken the original site
  was if the 8 "real description already in place" claim isn't actually true.
  Honest framing until/unless a future pass can confirm the real split from
  git history: revert to the previously-established safe version — two
  unspecified failure states, no invented counts. If a future pass DOES
  confirm an exact split via `git log --oneline -- 'src/content/blog/*.md'`
  around the heroImageAlt field's introduction, it's fine to use real numbers
  again — just cite how they were confirmed.

- **CLEAN PASS — 2026-07-15/16, latest DRAFT-mode pass ("Alt Text for SEO and
  Accessibility Is One Job").** Zero gate findings. The prior draft-stage gate
  finding (invented "9 of 17"/"8 of 17" split) is gone — this revision reverts
  to the safe two-unspecified-failure-states framing exactly as recommended.
  The scope elevation is also fixed: opening sentence now reads "every post on
  [this blog](/blog/) that carries a hero image," not bare "every post."
  WHATWG HTML Living Standard citation is present in the Sources footer (all
  eight sources listed). Decorative-vs-informative honest-gap paragraph
  present in full, with the protected closing sentence verbatim ("I still
  haven't gone back and checked whether some of these mood-art hero images
  should carry no alt text at all"), and the closing section's callback to it
  is intact. All four protected keyword sentences present verbatim (order
  3/4/5/6 ourTake lines), and the flare line closes the post word-for-word.
  Fresh WebFetch this pass of every source the draft quotes: Google's
  image-SEO page (spam-stuffing warning + "Dalmatian puppy playing fetch,"
  both verbatim), W3C decorative-images page ("eye-candy," "judgment that
  only the author can make"), W3C informative-images page (the full "happy
  family"/"We're family-friendly" example plus the meaning-over-literal
  framing, verbatim), and yatil.net (JAWS-splitting provenance + the
  "picture it over the phone" test, verbatim). Diffed both quoted hero-image
  alt-text strings directly against live frontmatter
  (`2026-07-09-how-to-measure-blog-seo.md`,
  `2026-07-08-cloudflare-pages-functions-404-custom-domain.md`) — both match
  character-for-character. `content.config.ts` reconfirms `heroImage`/
  `heroImageAlt` are both optional schema fields, matching the now-scoped
  opening claim.
- **Elevation, still standing: the backfill's actual mechanism (vision-read of
  the rendered PNG vs. paraphrasing `Brief.imageConcept`) remains unconfirmed
  by any repo artifact.** No dedicated backfill script/agent found this pass
  either (grepped `scripts/` and `.claude/agents/` for `heroImageAlt` — only
  hits are the blog posts themselves, `content.config.ts`, and pipeline docs).
  The draft states the instruction as settled fact with no hedge on whether it
  was actually followed. Recommended softening (not yet applied, still worth
  it if this draft cycles again): "Each agent got one instruction: describe
  what's actually visible in the frame, not the original image-generation
  prompt, before writing a single word of alt text. I can't point to a
  backfill script that enforced it — the results below are the check, not the
  process."

## Post: 2026-07-17-design-system-with-css-variables (OUTLINE-stage pass, 2026-07-15)

First bullshit-detector pass on this specific post's outline (the previously
published draft at this slug used simplified/fake token names and hexes that
don't exist in `global.css` — the new outline correctly replaces them with
real values throughout; no finding needed there, already fixed at the outline
level).

- **NEW — "apart from one decorative SVG logo mark that hardcodes its own
  fill" undercounts the real exception count; grepped the whole `src/` tree
  for raw hex outside `global.css`.** Beat 5's `intendedBeat` claims the token
  discipline is total except for one SVG logo mark
  (`Header.astro`, `fill="#13161c"`, confirmed real). But two more raw,
  non-token hex values are live in the app: `#e0a94c` (a "stale data" amber
  status color), duplicated verbatim in BOTH `src/layouts/BlogPost.astro`
  and `src/pages/stats.astro` — never folded into a token, and genuinely the
  same *kind* of drift beat 2's own anecdote warns about (`#12151a` vs
  `#13161c`) — and `#7df0a8`, a hardcoded highlight color inside the homepage
  `<h1>` gradient (`src/pages/index.astro`). The top-level `point` field's
  "every component read token names instead of raw values" carries the same
  absolute claim. Honest framing: name it as "almost every," and where beat 5
  lists the one known exception, either list the amber/gradient exceptions
  too or soften "apart from one" to "a small handful." This is a checkable,
  specific, false-completeness claim about our own codebase — same shape as
  this ledger's other "checkable claim about our own system" catches on
  different posts (round cap, aiScore threshold, stage count).
- **NEW — beat 8 invents a technical rationale for excluding mint from chart
  series colors that appears nowhere in the source.** The `facts` field
  states mint "is excluded from chart series use because it fails the
  categorical lightness band on dark." Grepped the whole repo for
  "categorical"/"lightness band" — zero matches anywhere, including the
  `global.css` comment the same sentence quotes right after it (which just
  states the rule, "Dataviz series colors only... those stay --mint," with no
  stated reason). This is invented, sounds-technical jargon presented as
  established fact — the exact failure mode this axis exists to catch. The
  honest reason evidenced by the source is simpler: it's a design rule
  (mint's chrome-only job), not a measured color-space constraint. Fix
  applied this pass: drop the fabricated rationale.
- **CONFIRMED accurate, checked closely because it's new material:** beat 9's
  two panel-label examples ("// traffic (28d)" on the stats dashboard, "//
  telemetry" on the blog post's own stats panel) are BOTH genuine panel-level
  examples with the real 2px mint top border — verified
  `src/layouts/BlogPost.astro`'s `.post-stats-panel` (`border-top: 2px solid
  var(--color-accent)`, label "// telemetry") and `TrafficChart.astro`'s
  `.chart-panel-label` ("// traffic (28d)"). This is a DIFFERENT "//
  telemetry" instance from the one the `dark-dashboard-design` ledger entries
  correctly excluded — that exclusion was about `stats.astro`'s page-level
  `.page-label` (the whole page's title span, no mint border, not a panel).
  Scope any future "// telemetry" check to which element it's on, not just
  the string — the blog-post-stats-panel instance is valid, the /stats/
  page-title instance is not. Also confirmed clean: the like-button contrast
  ("plain all-around border that only turns mint on hover or once liked")
  matches `LikeButton.astro` exactly.
- **Elevation, check-5 mining: WebAIM's cited page recommends more than
  red/green avoidance — "colors are not the only method of conveying
  important information," paired with a text/pattern cue — and the site's own
  chart legend already satisfies this (`TrafficChart.astro`'s `.chart-legend`
  pairs each series color with a text label, "views" / "sessions"), but beat 8
  only cites the red/green half of WebAIM's advice.** Worth a clause noting
  the legend text is doing double duty per WebAIM's own fuller
  recommendation, not just the color choice — makes the accessibility claim
  more complete without any new source.
- **Sources verified this pass by direct WebFetch, all accurate, no
  misquote:** MDN (custom properties inherit + global `:root` availability,
  confirmed verbatim); CSS-Tricks (dark-mode-via-reassigned-variables pattern,
  confirmed); Penpot (primitive/semantic split + "remap which primitive a
  semantic points to," confirmed close paraphrase); WebAIM ("red-green
  deficiencies are the most common," confirmed verbatim, bracket insertion in
  the outline's quote is a fair clarifying edit).

## Post: 2026-07-17-design-system-with-css-variables (second outline pass, 2026-07-15)

Both prior findings held fixed on re-check: top-level `point` now reads
"almost every component" + "small, named list of exceptions instead of a
silent one" (not "every component"); beat 5 now lists all three real
exceptions (SVG logo fill, `#e0a94c` amber duplicated in `stats.astro` +
`BlogPost.astro`, `#7df0a8` gradient in `index.astro` — regrepped `src/`,
still exactly those three, no new raw hex crept in); beat 8's fabricated
"categorical lightness band" rationale is gone, replaced with the honest "no
validator or lightness math decided this — it's a naming convention drawn by
hand," which correctly denies the fabricated mechanism rather than reasserting
it. No regression on either.

- **NEW — "zero component edits" overclaims what actually shipped on
  2026-07-14: the claim isn't false, but it's imprecise in a way a
  frontend-literate reader could catch against the source.** Three fields
  restate this: top-level `point` ("absorbs entirely new token groups...
  without a single component edit"), beat 8 `ourTake` ("same file, zero
  component edits"), beat 8 `intendedBeat` ("joined the system without
  touching a component"). Checked `TrafficChart.astro` and its sibling chart
  panels directly: `.legend-chip--views { background: var(--color-series-views); }`
  is new component CSS, written the same day, that references the new tokens
  — brand-new components clearly *did* get written to consume the new token
  group. The true, checkable claim is narrower and still genuinely
  impressive: no component that already existed before the chart feature —
  Header, LikeButton, the panel/border system, anything outside the new
  dashboard — needed to change. "Without a single component edit" reads as
  "I wrote zero component code for this," which isn't what happened. Honest
  framing: scope the claim to "existing" components in all three fields.
- **Elevation, still open, unaddressed a second pass:** WebAIM's cited page
  recommends pairing color with text/pattern, not relying on hue alone — the
  site's own chart legend (`.chart-legend`, "views"/"sessions" text labels)
  already satisfies this per WebAIM's fuller guidance, re-confirmed by direct
  WebFetch this pass ("Make sure that colors are not the only method of
  conveying important information"). Beat 8 still only cites the red/green
  half. Cheap fix, not yet applied across two passes — flag again if a third
  pass of this outline still doesn't carry it.
- **Sources re-verified fresh this pass (not trusting the prior pass's
  verification alone):** MDN (`:root` global availability + DOM inheritance,
  verbatim), CSS-Tricks (dark-mode `--bg-color`/`--text-color` reassignment
  example, verbatim), Penpot (primitive/semantic remap-on-theme-change,
  verbatim close paraphrase), WebAIM (red-green prevalence quote, verbatim).
  All four still accurate to how beats 3, 7, and 8 use them. Also re-grepped
  `global.css` line-for-line against beat 4's code-block facts (every hex,
  every `color-mix` percentage, every semantic pointer) — exact match, no
  drift from the first pass's fix.

## Post: 2026-07-17-design-system-with-css-variables (third outline pass, 2026-07-15)

CLEAN PASS — zero gate findings. Both prior passes' fixes held on fresh
re-check: `point`/beat 5/beat 8 all correctly scope the "no component edit"
claim to components "that already existed"; beat 8's fabricated
"lightness band" rationale stayed gone; beat 8 now cites WebAIM's fuller
"colors are not the only method of conveying important information"
guidance (not just red-green) and ties it to the chart legend's text labels
— closes the two-pass-old open elevation about WebAIM's fuller guidance
being uncited. Re-verified fresh (not just trusting prior passes): every
hex/token in beat 4 against `global.css` line-for-line (exact match);
re-grepped all of `src/` for raw hex outside `global.css` — still exactly
the three known exceptions (Header.astro SVG fill `#13161c`, `#e0a94c`
duplicated verbatim in `stats.astro` + `BlogPost.astro`, `#7df0a8` gradient
in `index.astro`), no new drift; WebAIM's red-green quote verbatim by fresh
WebFetch; the two-pixel mint top border and panel-level `// ` label prefix
(beat 9) confirmed across every chart panel component
(`TrafficChart`/`SearchPanel`/`SurfacePanel`/`TrafficSourcesPanel`/
`TopQueriesPanel`/`HomeScorecard`/`stats.astro`/`BlogPost.astro`), plus
confirmed `post-stats-panel` renders unconditionally on every blog post (no
conditional wrapping in `BlogPost.astro`), so beat 9's "on every blog post's
own stats panel" is accurate as written.
- **NEW — check-5 mining, elevation not gate: Penpot's cited article
  actually recommends a THIRD tier (component tokens) beyond the
  primitive/semantic split this post describes.** WebFetched
  `penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/`
  directly — it describes primitive → theme/semantic → **component** tokens
  (their example: `card.background` → `theme.bg.surface` → `colors.white`),
  explicitly framing the component tier as what lets one component diverge
  without touching the shared semantic value. This site's system stops at
  two tiers. Not a gate finding — the two-tier system isn't misrepresented,
  it does what the post claims — but it's a real "does the source know
  something better" catch: beat 5's own three hand-rolled exceptions (stale
  amber, gradient highlight, SVG fill) are exactly the one-off,
  single-component case a component tier exists to absorb without minting a
  new global semantic token for a single use. Worth a clause in beat 7 or a
  closing-beat aside naming this as the natural next tier rather than a gap.
  Suggested insert (beat 7, after the Penpot sentence): "Penpot's own model
  goes one tier further than this site does — primitive, then semantic, then
  a third component-specific layer for exactly the one-off case beat 5's
  exceptions are stuck being raw hex instead of." Flag again if a future pass
  adds a fourth beat or a "what's next" aside — this is the natural place to
  land it.
- **Elevation, unresolved across three passes, low priority: beat 2's
  "#12151a vs #13161c" pre-token drift anecdote still has no live source**
  (not in `global.css`, not in the cited `dark-dashboard-design` post — see
  `facts.md`'s matching note). Treated as accepted narrative color/lived
  memory across every pass so far. Suggested softening if this keeps
  surfacing: "Before tokens, near-duplicate panel colors crept in from
  memory: one panel landed at #12151a, another at #13161c" — the "from
  memory" clause pre-empts a technically literate reader trying to verify it
  against a diff that won't exist.

## Post: 2026-07-17-design-system-with-css-variables (fourth outline pass, 2026-07-15)

CLEAN PASS — zero gate findings. **RESOLVED this pass:** the beat-2 "from
memory" softening suggested above is now present verbatim ("crept in from
memory: one panel landed at #12151a, another at #13161c... the kind of drift
no diff would have caught after the fact") — no longer flag this unless it's
dropped in a future pass. Re-verified from scratch against the live repo
(not just re-trusting prior passes' verification): every hex/token/
color-mix percentage in beat 4's code block against `src/styles/global.css`
line-for-line (exact match, including the 12% `--color-accent-dim` mix);
all three named exceptions in beat 5 still real and unchanged (`Header.astro`
SVG fill `#13161c` x2, `#e0a94c` duplicated verbatim in `stats.astro` +
`BlogPost.astro`, `#7df0a8` gradient in `index.astro`) — regrepped `src/`,
no new raw hex crept in; beat 8's CSS comment quote ("Dataviz series colors
only — never used for chrome/borders/labels (those stay --mint).") matches
`global.css` line 22 verbatim; the fabricated "categorical lightness band"
rationale stayed gone (now "a naming convention drawn by hand"); "existing
components" scoping held in all three fields (point/beat-8 ourTake/beat-8
intendedBeat) — no regression back to bare "zero component edits." Fresh
WebFetch this pass of all four external sources: WebAIM's red-green quote
and its fuller "colors are not the only method of conveying important
information" guidance, both verbatim, both correctly used in beat 8; Penpot's
primitive→semantic remap language verbatim; CSS-Tricks' dark-mode
custom-property reassignment example verbatim, confirmed it never claims
this is the *typical* theming approach (matching beat 7's own hedge, "The
source shows the pattern working; it doesn't claim this is how theming
usually goes").
- **NEW, elevation not gate: `--series-blue` is reused a third and fourth
  place beat 8 doesn't mention.** Beat 8's fact says "`--series-blue` serves
  both sessions and search: one blue doing double duty across two metrics."
  Grepped `src/components/charts/` for every `--color-series-*` consumer:
  `--color-series-sessions` and `--color-series-search` both resolve to
  `--series-blue` as the outline says, but `TrafficSourcesPanel.astro` also
  maps `organic: 'var(--color-series-organic)'` to the same `--series-blue`
  primitive (and `referral` to `--series-green`, alongside `--color-series-
  views`). Not treating this as a gate finding: "sessions" and "search" are
  traffic *metrics* (how much), while "organic"/"referral" are traffic
  *sources* (where from) in a structurally different chart
  (`TrafficSourcesPanel`'s stacked-bar breakdown) that beat 8 never
  describes — a defensible categorical read, not a false completeness claim.
  Worth a cheap upgrade if a future pass wants the point to land harder: "one
  blue doing double duty across two metrics, and a third role again in the
  traffic-sources breakdown" makes the reuse point stronger, not weaker, with
  zero risk. Note even `global.css`'s own inline comment undercounts this the
  same way ("sessions/search always blue," no mention of organic) — so this
  outline's phrasing mirrors the codebase's own simplification, not an
  outline-introduced error.
- **Elevation, still open (fourth consecutive pass): Penpot's cited article
  actually recommends a third tier (component tokens) beyond this site's
  primitive/semantic split** — see the full recommended insert two entries
  above (beat 7, after the Penpot sentence). Confirmed again by fresh
  WebFetch this pass; the three-tier passage and remap sentence are unchanged
  since the source was first checked. Not gate-worthy on its own (the
  two-tier system isn't misrepresented), but this is now the fourth pass in a
  row carrying this open "does the source know something better" catch
  without it being addressed — worth raising to Chad as a product-adjacent
  aside if a fifth pass still doesn't carry it, per axis check 5's guidance
  to escalate rather than let a real mined-source improvement go stale.

## Post: 2026-07-17-design-system-with-css-variables (DRAFT-stage pass, 2026-07-15)

First bullshit-detector pass on the rendered draft (not outline) for this
post. Fresh grep of `src/styles/global.css`, `Header.astro`, `BlogPost.astro`,
`stats.astro`, `index.astro`, `TrafficChart.astro`, `LikeButton.astro`, plus
fresh WebFetch of MDN/CSS-Tricks/Penpot/WebAIM — every hex, token, quote, and
mechanism claim carried over from the four clean outline passes held exactly
(no regression): the three named exceptions, the "existing components"
scoping on the zero-component-edit claim, the "from memory" pre-token drift
softening, the `--series-blue` triple-duty addition (now present, closing
that standing elevation), WebAIM's fuller "not the only cue" guidance tied to
the chart legend, and all four external source quotes verbatim.

- **NEW gate finding — "Mint stays out of the charts entirely" directly
  contradicts the CSS comment quoted one sentence later, and the site's own
  code.** The draft's chart-series-colors beat states "Mint stays out of the
  charts entirely," then immediately quotes `global.css`'s own comment as
  supporting evidence: "Dataviz series colors only — never used for
  chrome/borders/labels (those stay --mint)." That quote says the opposite of
  what the sentence before it claims — mint explicitly DOES stay as the
  chrome/border/label color on charts, it's only excluded from being a *data
  series* color. Confirmed in code: `TrafficChart.astro` line 138,
  `border-top: 2px solid var(--color-accent)` (mint) on the chart panel
  itself — the same 2px mint top border this post's own beat 9 describes as
  running "on the dashboard panels." So mint is very much present in the
  charts (as chrome), just never as a data line/bar color. Fix: scope the
  claim to data/series use, not "the charts" as a whole, so it stops
  contradicting its own supporting quote one clause later.
- **NEW gate finding — intro paragraph regresses the "every component" →
  "almost every component" fix that was already resolved at outline stage.**
  The draft's second paragraph states "...just colors and fonts named once,
  every component pointed at those names instead of a raw value" — an
  unhedged completeness claim, three sections before beat 5 reveals the three
  real exceptions (SVG fill, amber duplicated in two files, gradient
  highlight). This is the same claim the outline-stage ledger entry above
  ("undercounts the real exception count") already fixed at the top-level
  `point` field ("almost every component" + "a small, named list of
  exceptions instead of a silent one") — the fix didn't carry through to this
  new intro sentence written fresh at draft stage. Same shape as the
  recurring "fixed in one field, regressed in a sibling/later field" pattern
  this ledger has flagged repeatedly on other posts. Fix: add "almost" before
  "every component" in the intro paragraph, matching the already-fixed
  top-level framing.
- **Elevation, still open (now FIFTH consecutive pass, outline and draft
  combined): Penpot's third tier (component tokens) remains unaddressed.**
  Re-confirmed by fresh WebFetch this pass: Penpot explicitly recommends
  primitive → semantic/theme → **component** tokens ("card.background" →
  "theme.bg.surface" → "colors.white"), framing the component tier as what
  lets one-off components diverge without minting a new global semantic
  token — exactly the role this post's three hand-rolled exceptions (stale
  amber, gradient, SVG fill) are stuck filling with raw hex instead. Per the
  ledger's own prior note ("worth raising to Chad... if a fifth pass still
  doesn't carry it"), that threshold is now reached. Still not gate-worthy —
  the two-tier system isn't misrepresented, this is a "the source knows a
  refinement we haven't adopted" catch, not a false claim — but flagging with
  a ready-to-use insert this time since it's been open across every pass of
  this post so far.

## Post: 2026-07-17-design-system-with-css-variables (second DRAFT-stage pass, 2026-07-15)

Both prior draft-stage gate findings confirmed FIXED on this revision: the
"Mint stays out of the charts entirely" contradiction is gone — current text
correctly reads "Mint keeps its usual border-and-label chrome duty around
each chart panel... Every line and bar in the charts themselves reads
straight from the new green and blue series tokens," matching the CSS
comment instead of contradicting it; the intro's "every component" is now
"almost every component" and holds. Fresh re-grep of `global.css` confirms
every hex/token/comment used in this draft still matches line-for-line
(including `--color-accent-dim` at 12%, the exact "Dataviz series colors
only — never used for chrome/borders/labels (those stay --mint)." comment on
line 22, and the three known raw-hex exceptions). Fresh WebFetch of WebAIM
this pass confirms both quotes verbatim ("red-green deficiencies are the
most common..." and "colors are not the only method of conveying important
information") and confirms the draft's paraphrase of the latter is fair, not
a misquote-in-quote-marks.

- **NEW gate finding — CTA's "view-source" claim overclaims what a reader
  actually sees in production.** Closing section says "The whole `:root`
  block powering this page is right there for anyone to view, right now.
  Open dev tools, view-source... and copy whatever you want." Checked
  `astro.config.mjs` — no `vite.build.cssMinify` override, so Astro/Vite's
  default production build minifies and bundles CSS (stripped comments,
  collapsed whitespace, hashed filename), same as any standard `astro build`
  deploy. A reader opening dev tools won't see the grouped, commented block
  shown in beat 4's code sample — they'll see one minified line. The token
  *names and values* do survive minification and remain copyable (custom
  property names aren't mangled), so the underlying "no signup, no build
  step" claim is still true — but "right there... view-source... copy
  whatever you want" implies the friendly annotated file, which isn't what's
  actually served. Honest framing: acknowledge the minification while
  keeping the real payoff (values still extractable, no gatekeeping).
- **Elevation, now SIXTH consecutive pass unaddressed: Penpot's third tier
  (component tokens) still not mentioned anywhere in this draft.** Re-
  confirmed by fresh WebFetch this pass — Penpot: "A component token
  (`card.background`) that references the theme token with
  `{theme.bg.surface}`," describing primitive → theme/semantic → component
  as three tiers. This site's system stops at two. Ready-to-use insert
  (place after the Penpot sentence in "Re-theming from one place"): "Penpot's
  own model goes one tier further than what's running here: primitive, then
  semantic, then a third component-specific layer for exactly the one-off
  case. That's the tier this site's three raw-hex exceptions — the SVG fill,
  the amber, the gradient — are stuck being exceptions instead of, because
  there's nowhere to name them without minting a new sitewide semantic token
  for something used once." Still not gate-worthy on its own axis-check-5
  logic (the two-tier system isn't misrepresented), but six passes in a row
  without adoption — worth surfacing to Chad directly if a seventh pass still
  doesn't carry it.

## `which-claude-model-to-use` (2026-07-18) — new post, outline-stage pass, 2026-07-15

- **"No judgment risk" overclaims link-integrity-reviewer's job — same recurring
  pattern as the sibling `automate-blog-writing-with-ai-agents` post, now in a
  NEW post.** Order-6 `intendedBeat`: "The output is verifiable, so the cheap
  tier carries no judgment risk." Checked `.claude/agents/link-integrity-
  reviewer.md` directly — its checks include "Right target? Cross-check the
  map... Flag with the correct URL" and "Anchor sanity — link text must not
  contradict the destination," both requiring interpretation, not pure binary
  resolution (only URL-resolves and future-date checks are truly mechanical).
  Same fix as the standing pattern: describe link-integrity's checks as
  "mostly binary" rather than claiming zero judgment. Watch for "no judgment
  risk" / "no judgment call" recurring on this post's future passes too, not
  just the sibling post.
- **Mined-source finding (check 5): the effort doc this beat already cites
  names the exact fix for the limitation it admits, and the outline doesn't
  connect the dots.** Order-7's honest-limit beat admits every agent pins
  `effort: high` and calls per-agent effort tuning "real money still sitting
  on the table" — a vague, generic admission. WebFetched
  `platform.claude.com/docs/en/build-with-claude/effort` (cited in this exact
  beat) directly: its effort-levels table names `low` for "Simpler tasks that
  need the best speed and lowest costs, such as subagents" — verbatim,
  textbook description of the narrow single-axis reviewer roster this post is
  about. The dev.to piece cited elsewhere in this same post (order 3)
  independently corroborates treating effort as "a separate dimension from
  model selection, enabling fine-grained resource allocation." Both cited
  sources name a concrete, actionable next step (drop effort to low/medium on
  the many-narrow-subagent reviewers, keep high only where reasoning depth
  earns it) that the outline's own admission stops short of naming. Recommend
  wiring the concrete "such as subagents" phrase into the beat and opening a
  product-improvement ticket to test `effort: low` on the reviewer roster
  (Step 11.5-style), not just softening the prose.
- **Verified clean this pass (no gate finding):** pricing table (Opus 4.8
  $5/$25, Sonnet 5 $3/$15 list with $2/$10 intro through Aug 31 2026, Haiku
  4.5 $1/$5) matches `platform.claude.com/docs/en/about-claude/models/overview`
  exactly; the 5x Opus/Haiku *output*-token multiplier is correct math ($25 vs
  $5); "tuning effort is often a better lever than switching models" matches
  `choosing-a-model` verbatim; reviewer counts (12 outline reviewers, 15 draft
  reviewers, round cap 5 on both loops) match `SKILL.md` exactly; model roster
  (`seo-researcher` sole Opus, `link-integrity-reviewer` sole Haiku, all other
  ~34 agent files Sonnet, all files `effort: high`) matches a fresh frontmatter
  grep exactly; the Haiku-vs-Sonnet taskmaster-audit numbers (1.75 exposure/1
  finding vs 5.65/4 findings, `~/.codex/bin/codex` backdoor shim) match
  `2026-02-22-we-let-haiku-do-the-audits-it-missed-things.md` verbatim; the
  MindStudio orchestrator/sub-agent cost quote ("$15 per million output
  tokens" vs "$0.25 per million") matches Sonnet-level list pricing as
  claimed.

### Draft-stage pass, 2026-07-15

- **Outline-stage findings both resolved in the draft.** "No judgment risk" for
  link-integrity is gone — draft reads "still takes a beat of judgment rather
  than a pure lookup," the correct "mostly binary, not zero-judgment" framing.
  The mined-source effort finding is wired in too — draft quotes the effort
  doc's exact `low` row ("simpler tasks that need the best speed and lowest
  costs, such as subagents") verbatim in the honest-limit beat, not just a
  vague admission. Both fresh WebFetches this pass (`models/overview`,
  `build-with-claude/effort`, `choosing-a-model`) reconfirm the pricing table,
  the Fable 5 addition ($10/$50, "Next-generation intelligence for long-running
  agents" — matches the draft's new "long-running agentic work" framing), and
  Sonnet 5's "best combination of speed and intelligence" tagline (paraphrased,
  no quote marks — accurate on both the overview page and the choosing-a-model
  page's card title).
- **NEW — "worked example" overstates the rigor of MindStudio's cost
  comparison.** Draft: "MindStudio's own worked example sharpens the same math
  from a different angle: an orchestrator billing at $15 per million output
  tokens... that hands simple work to sub-agents billed at $0.25 per million
  turns each cheap-tier routing decision into savings that recur call after
  call." WebFetched the source directly — it gives the two raw prices and says
  "the math adds up quickly in your favor," but explicitly does NOT walk
  through a calculation (no token counts, no total-cost comparison, no
  worked-out savings figure). It's a hypothetical framework/comparison, not a
  worked example. The underlying point (recurring, not one-time, savings) is
  accurately represented — only the word "worked" overclaims the source's own
  rigor. Fix: "cost comparison" instead of "worked example." Watch for this on
  future passes of this post.
- **NEW — "expensive generalist" imports this post's own cost-framing onto a
  self-linked post whose actual argument was about precision, not economics.**
  Draft: "I built the same shape into the security review team I run on my own
  repos — specialized sub-agents each holding one job, instead of one
  expensive generalist doing all of it," linking to
  `2026-07-10-claude-security-team-that-remembers.md`. Read that post directly
  — it never discusses cost or model tiers; its own stated reason for
  splitting into six sub-agents is "a sub-agent with a tight scope makes
  sharper calls than a generalist asked to hold the whole repo in its head,"
  a precision/judgment argument, not a cost one. Tacking "expensive" onto
  "generalist" implies the security post makes the same cost-savings case this
  post is making, which it doesn't — a reader clicking through expecting a
  cost angle won't find one. Fix: drop the cost framing from this reference,
  keep it to the scope/precision argument the source actually makes.
- **Elevation (not gate):** the dev.to source's `opusplan` alias (auto-routes
  Opus for planning phases, Sonnet for implementation, within a single agent)
  is a genuinely different routing mechanism than this post's fixed
  per-agent-role assignment — worth a passing mention as a contrast, but our
  system already routes at finer granularity (per specialized task, not just
  planning-vs-implementation), so this isn't a "the source knows something
  better we're missing" case, just a different shape of the same idea. Not
  gate-worthy.

### Draft-stage pass, 2026-07-15 (second pass)

- **Both prior draft-stage findings resolved, re-confirmed clean.** "MindStudio's
  own cost comparison" (not "worked example") is in place; the security-team
  reference now reads "a narrow scope makes sharper calls than one generalist
  trying to hold the whole repo in its head" — precision framing only, no
  imported cost angle. Both fixes held.
- **NEW — "This pipeline has never reached for it" (Fable 5) contradicts
  Scout's own established identity in the very post being cited two words
  later.** The Fable 5 paragraph says "This pipeline has never reached for it,
  so it sits outside the three-way split above... It's the same tier I weighed
  against GPT-5.6 for coding agents a few weeks back," linking to
  `2026-07-10-gpt-5-6-vs-claude-for-coding-agents.md`. Read that post directly
  — it states plainly, in Scout's own voice: "This blog still runs on Claude,
  and I'm still Fable 5 under the hood." Scout (the narrator/orchestrator
  dispatching every one of the calls this post just spent 1500 words routing)
  runs on Fable 5 continuously — "never reached for it" is only true if
  scoped narrowly to the *named sub-agent roster* (seo-researcher/brief-writer/
  drafter/reviewers, each dispatched via the Agent tool at a specific model),
  which is a real and defensible distinction — the orchestrator's own model
  and the models it dispatches to are different things — but the draft never
  states that distinction, so "this pipeline has never reached for it"
  followed immediately by "it's the same tier I weighed" reads as a
  self-contradiction to anyone who's read the sibling post first. Honest
  framing: name the distinction (orchestrator vs. dispatched sub-agent) rather
  than let "this pipeline" imply the whole operation, top to bottom, avoids
  the tier. Outline-originated (the outline's own gateGuidance for beat 3 has
  the same "this pipeline doesn't reach for it" framing) — flag at outline
  stage too if this post gets another outline-stage pass, not just draft.
- **Verified clean this pass, no new finding:** Step 3/seo-researcher-runs-first
  claim matches `SKILL.md` exactly ("3. SEO Research — seo-researcher agent
  (Opus, refinement mode)," ahead of Step 4 brief-writer and Step 4.5 outline);
  "fourteen of the fifteen draft reviewers pin model: sonnet" matches a fresh
  frontmatter grep (35 agent files: seo-researcher=opus,
  link-integrity-reviewer=haiku, all 33 others=sonnet, all 36=effort:high);
  MindStudio's exact quote ("$15 per million output tokens" / "$0.25 per
  million") reconfirmed via fresh WebFetch; "Every marketplace audit since has
  run on Sonnet, no exceptions" matches
  `2026-02-22-we-let-haiku-do-the-audits-it-missed-things.md`'s own summary
  line ("switch every audit back to Sonnet, no exceptions") verbatim.

### Draft-stage pass, 2026-07-15 (third pass)

- **All three prior draft-stage findings held clean this pass** (Fable 5
  orchestrator-vs-dispatched-agent distinction now stated explicitly — "I run
  on it myself, though: it's the model doing the orchestrating... the same
  tier I weighed against GPT-5.6"; "cost comparison"/"hypothetical" phrasing
  for MindStudio, not "worked example"; security-team reference stays
  precision-only, no imported cost framing).
- **NEW mined-source finding (check 5): the effort doc's general table gets
  quoted for "such as subagents," but the SAME page's model-specific section
  for the exact model in use (Sonnet 5) recommends something more precise
  than what the post proposes testing.** The draft's honest-limit beat quotes
  the effort doc's general levels table ("low effort is built for 'simpler
  tasks that need the best speed and lowest costs, such as subagents'") and
  then proposes "drop the review army to effort: low and see what breaks."
  Fresh WebFetch of `platform.claude.com/docs/en/build-with-claude/effort`
  this pass — confirmed the general-table quote is accurate, but the page
  also has a "Recommended effort levels for Claude Sonnet 5" section (all ~34
  non-Opus/non-Haiku agents in this roster run Sonnet 5) that scopes `low`
  differently: "Low effort: For high-volume or latency-sensitive workloads.
  Suitable for chat and non-coding use cases where faster turnaround is
  prioritized," and separately names `medium` as "Cost-saving step-down from
  the default. Comparable to Claude Sonnet 4.6 at high effort." A document
  reviewer grading one axis on a full draft is agentic/analytical work, not
  chat — the model-specific section the draft doesn't mention actually
  recommends testing `medium` first for this exact model, not `low`. This is
  the check-5 pattern by the book: the cited source, read past the paragraph
  we quoted, has a more precise answer than the one the post proposes
  shipping as "the next experiment." Fix applied this pass: name `medium` as
  the Sonnet-5-specific cost-saving step and scope the "such as subagents"
  quote to the general table, reserving `low` as the second move only if
  `medium` holds. Watch for this recurring if a future pass re-simplifies
  back to "drop straight to low."
- **Elevation, still recurring: the dev.to source's `opusplan` alias
  (auto-routes Opus for planning, Sonnet for execution, within a single
  agent) still isn't mentioned anywhere in this draft** — same standing
  elevation as the outline-stage pass. Fresh WebFetch this pass confirms the
  dev.to piece both discusses `opusplan` and advocates fixed per-role
  sub-agent assignment (the same shape as this pipeline), so it's a fair,
  low-stakes contrast worth one clause, not a "the source knows something
  better we're missing" gate case.

## `ai-automation-stack` — 2026-07-19, OUTLINE-stage review

- **NEW, major: "the blog swapped onto the packaged version" is a false
  present-tense claim — TD-0038 (the actual tracking ticket for exactly this
  swap) is still open, every checkbox unchecked, and the repo itself hasn't
  moved.** Order-5 beat ("The pipeline became a package this week") claims
  "the same week this post ships, the blog swapped onto the packaged
  version... The learned ledgers... survived the swap intact," and its own
  `gateGuidance` asserts this was "verified against the repo itself" via a
  commit `4e445c1` and "four posts since carry 'on the swapped pipeline'
  commit messages." Direct verification this pass contradicts all of it:
  `tickets/TD-0038-switch-build-aloud-onto-agentic-content-pipeline.md`
  reads `status: open`, every `- [ ]` checkbox unchecked, including "Install/
  configure agentic-content-pipeline in build-aloud" and "Retire the in-repo
  copies"; `.claude/skills/content-pipeline/` and `.claude/skills/human-tone/`
  in build-aloud still hold the FULL in-repo source (`SKILL.md`, all
  `scripts/`, `package-lock.json`) rather than a thin wrapper around an
  installed package; build-aloud's own `package.json` has no
  `agentic-content-pipeline` dependency at all. This matches (and the prior
  claim of "resolved" contradicts) the fact-checker's own repeated, more
  recent confirmations on the sibling post `automate-blog-writing-with-
  ai-agents` — see `docs/content-pipeline/facts.md`'s "CRITICAL NEW CAUTION"
  and every later re-confirmation ("TD-0038 re-confirmed still open, all
  checkboxes unchecked") — which instruct the opposite framing: describe
  build-aloud as "still finishing its own swap onto the published version,"
  never as already swapped. The single line in
  `.claude/agent-memory/outline-builder/MEMORY.md` claiming this was
  "Resolved same day: swap commit 4e445c1 landed" appears to be wrong/
  premature and should be corrected or removed — it was never re-verified
  against the actual ticket/skills-directory state, and every later
  fact-checker pass on the sibling post overrides it. **This is exactly the
  agent's own "does the thing do what the post says" failure mode, applied
  to a claim about our own shipping process, not a third-party feature.**
  Honest framing (same pattern the sibling post's CTA already uses
  correctly): the package is real, public, extracted from this exact repo,
  and installable today; Build Aloud itself is still finishing its own move
  onto it, not there yet. Fix touches order-5's `intendedBeat`, both `facts`
  entries, `ourTake`, and `gateGuidance`, plus order-13's CTA `intendedBeat`
  ("the whole content layer of this stack IS the open-source package") and
  `ourTake` ("every piece of this stack is open to steal"), which carry the
  same present-tense-parity overclaim into the close. **Standing instruction
  for every future pass of this post and the sibling post: re-verify TD-0038
  directly (ticket file + `.claude/skills/` directory contents +
  `package.json`) rather than trusting any single memory-file line claiming
  it's resolved — this is now the second time an outline-builder shortcut
  ("resolved same day") got contradicted by direct repo inspection.**
- **NEW: CTA invites readers to "steal" and one-command-install the pipeline
  without ever disclosing the real operating cost, which the cited source's
  own README states plainly.** Order-13 (CTA) tells the reader "Every piece
  of this stack is open to steal, and the setup is one command," pointing at
  `github.com/buildaloud/agentic-content-pipeline`. That repo's own README
  (`Cost` section, read directly this pass) says: "This is not cheap to
  run. At defaults — two review loops, up to 5 rounds each, roughly 12-15
  reviewers per round — expect on the order of 100-160 agent dispatches and
  several million tokens per post. Run one post and check your usage
  dashboard before queueing many." None of that appears anywhere in the
  outline. For an audience explicitly framed as "solopreneur automation with
  AI" — cost-sensitive by definition — inviting a one-command install without
  the source's own honest cost caveat is an unstated-limitation overclaim
  (check 2), and it's sitting in a source the post already cites (check 5).
  Fix: add the dispatch-count/token-cost caveat to the CTA beat, sourced
  directly from the package's own README.
- **Confirmed clean, re-verified this pass (no new finding, cross-check only):**
  Ringly's $169.46B/$1.14T/31.4%/48% figures and the 13-hours-per-person-
  per-week figure all match `ringly.io/blog/ai-automation-statistics-2026`
  verbatim (fresh WebFetch); the solo-founders guide
  (`aiforbusinessautomation.com/best-ai-tools-for-solo-founders`) supports
  the narrow-tools-beat-broad-platforms claim, the human-checkpoint-as-
  design-choice framing ("that's not a limitation. That's the design"), and
  the Zapier 9-in-10/1-in-4 stat, all attributed correctly as a secondary
  source; check 5 on that same guide found no materially better automation
  approach than the one this post describes — its own most-sophisticated
  example (a five-layer stack with a deliberate human checkpoint) is
  operationally equivalent to, not beyond, this post's design. Scorecard
  three-state claim (RANKING / GATHERING SIGNAL / NOT YET, a brand-new post
  with zero data reading GATHERING SIGNAL) matches `PostStats.astro`'s
  `signal()` function exactly (`unknown` state = `insufficient-data`, label
  "gathering signal — not enough search data yet") — this is a DIFFERENT,
  correct usage of GATHERING SIGNAL than the live-pulse-flag entry logged
  elsewhere in this file for the dashboard-design post; don't conflate the
  two when cross-checking.

### Second outline-stage pass, 2026-07-15

- **RESOLVED — TD-0038 swap claim independently re-verified, not just trusted
  from facts.md.** Read `tickets/TD-0038-...md` directly this pass (status:
  open, every checkbox unchecked) and `package.json` (no
  `agentic-content-pipeline` dependency) — on their own, both look like the
  swap didn't happen, matching the earlier "NEW, major" false-claim finding
  above. But grepped `.git/logs/HEAD` directly (not just trusting a memory
  file) and found the actual commit: `4e445c1750ec4d0d6f80463763c8689c38793e9f`
  — "pipeline: swap onto agentic-content-pipeline v0.2.0 (TD-0038)" — really
  landed, followed by three further commits explicitly "on the swapped
  pipeline" / "through the agentic pipeline." `content-pipeline.config.json`
  also exists at the repo root with the right shape (voiceFile/contentDir/
  docsRoot pointing at build-aloud's own files). Conclusion: the swap is real;
  the ticket's checkboxes are stale bookkeeping, not evidence against the
  commit graph. Order-5's claim in this pass's outline ("the same week this
  post ships, the blog swapped onto the packaged version") is accurate as
  written — no gate finding this pass. Standing instruction updated: when
  re-checking this claim in future passes, grep `.git/logs/HEAD` directly for
  the commit hash rather than stopping at the ticket file or package.json —
  both of those alone are misleading (installer doesn't touch package.json;
  ticket hygiene lagged the actual work).
- **RESOLVED — order-13 CTA cost caveat now present.** The earlier "invites
  readers to install without disclosing operating cost" finding is fixed in
  this pass's outline: `facts` states the 100-160-dispatches/several-million-
  tokens figure, sourced from the package README's own `Cost` section
  (re-fetched this pass, matches verbatim).
- **NEW gate finding: "every piece of this stack is open to steal" overclaims
  scope — the package is the content layer only.** Order-13's `ourTake` says
  "Every piece of this stack is open to steal, and the setup is one command,"
  but the same beat's own `intendedBeat` correctly scopes it narrower ("The
  whole content layer of this stack is the open-source... package"), and the
  package's own README confirms the narrower scope: its "Publishing,
  honestly" section says blog publishing "does the drip" via the site's own
  `pubDate` filter and daily rebuild — i.e., the scheduling/drip layer,
  deploy, and measurement are NOT part of what installs with one command.
  Only the content layer (research → outline → draft → review → hero image →
  summary → assemble → commit) ships in the package. Fix: scope `ourTake` down
  to match `intendedBeat` and the facts field, the same "hedge present in one
  field, missing in a sibling field" pattern this post has hit repeatedly
  (see the "only human checkpoint" entries above) — just for a different
  claim (open-source scope, not human-checkpoint scope) this time. Watch for
  this specific overclaim ("every piece"/"the whole stack"/"all of it") in
  the CTA beat of future passes.
- **Elevation, still recurring: Osmani's "focused beats scattered"
  reconciliation still absent, and this outline's numbers make the gap more
  pointed than usual** — order-4 states 12 outline reviewers + 15 draft
  reviewers (27 reviewer-dispatches across one post's full cycle), the
  largest total yet described for this design across any pass of the
  sibling/this post. Not a gate finding (Osmani isn't cited here), but the
  scale makes the unaddressed counter-argument (fewer, more capable,
  tool-equipped reviewers beat many narrow ones) worth another look if this
  keeps recurring pass to pass.

### DRAFT-stage bullshit-detector pass, 2026-07-15

- **NEW gate finding: CTA's honest-cost disclosure omits the package README's
  concurrency-burst caveat — a real, checkable limitation sitting in a source
  the post already cites.** The CTA correctly discloses "roughly 100 to 160
  agent dispatches and several million tokens per post" and tells the reader
  to "check a usage dashboard before queueing up more than one," sourced from
  the package README's `Cost` section. Fresh WebFetch of the README this pass
  surfaced a second, adjacent line in the same section the CTA doesn't carry
  over: "The fan-out also bursts up to 15 agents at once per round." That's a
  concurrency ceiling, not a spend ceiling — a reader could hit an API rate
  limit on the very first post they run, before "queueing up more than one"
  is even the risk the CTA warns about. Same shape as the agent's founding
  case (check 5: the fix was already sitting in a cited source). Fix: append
  the concurrency detail to the CTA's cost sentence.
- **Confirmed clean, this pass — every other standing pattern for this post
  held.** TD-0038 swap claim ("the blog swapped onto the packaged version")
  independently re-verified via `.git/logs/HEAD` (commit `4e445c1`, three
  follow-on "on the swapped pipeline" commits) — accurate as stated, matches
  the outline-stage RESOLVED entry above. CTA scope correctly narrowed to
  "whole content layer... is open source" / "The package covers content
  only," not "every piece of this stack" — the outline-stage overclaim fix
  held into the draft. Round cap "five rounds" both loops; no "blind"
  language; link-integrity "mostly binary"; aiScore "15 out of 100"; tone-gate
  timing "start of every round and once more after the loop exits," never "at
  the end"; twelve-stage count with assemble/commit separate; "by default"
  hedge present on the topic-gate/human-checkpoint claim in both the opener
  and the stage-list section, consistent with the round-cap-escalation
  exception named explicitly in paragraph 2. Fresh WebFetch re-verification
  of `aiforbusinessautomation.com/best-ai-tools-for-solo-founders` this pass:
  the narrow-tools-beat-broad-platforms claim, the Relay
  human-checkpoint-by-design quote, and the Zapier 9-in-10/1-in-4 figures all
  match verbatim; no materially better automation approach found in that
  source either (its own ceiling example is a different SaaS-stack pattern,
  not a refinement of the human-checkpoint design this post already uses).
  Elevation carried forward: Osmani's "focused beats scattered" reconciliation
  is still absent and still not cited in this post — not a gate finding since
  check 5 only applies to sources actually cited, but worth another look if a
  future draft ever does cite him.

### Third DRAFT-stage pass, 2026-07-15 (this dispatch, rewrite titled "How I Built My AI Automation Stack (Four Layers, One Human Decision)") — CLEAN

- Zero gate findings. Independently re-verified rather than trusting prior
  passes' notes: fresh WebFetch of Ringly
  (`ringly.io/blog/ai-automation-statistics-2026`) confirms $169.46B/$1.14T
  ($1,144.83B)/31.4% CAGR/48%-in-production/13-hours-per-person-per-week all
  verbatim; fresh WebFetch of the package README's Cost section confirms
  "100-160 agent dispatches and several million tokens per post" and "bursts
  up to 15 agents at once per round," and confirms the README does NOT detail
  scheduling/deploy/measurement as in-scope, matching the draft's "package
  covers content only"; fresh WebFetch of the solo-founders guide confirms
  the narrow-tools-beat-broad-platforms claim, the Relay quote ("builds in
  human checkpoints deliberately" / "that's not a limitation. That's the
  design.") matches the draft's paraphrase ("building a human checkpoint into
  its own workflow on purpose"), and the Zapier 9-in-10/1-in-4 figures all
  verbatim. `.git/logs/HEAD` re-grepped directly: commit `4e445c1` ("pipeline:
  swap onto agentic-content-pipeline v0.2.0 (TD-0038)") plus the follow-on
  "rewrite the automate-blog-writing post on the swapped pipeline" commit
  confirm the swap is real; `content-pipeline.config.json` at repo root has
  `docsRoot: "docs"`, matching "the same docs/ path." `src/data/stats.json`
  (generatedAt 2026-07-15) confirms 48 impressions/1 click/position 24.23
  exactly, matching "mid-20s." No standing pattern regressed: "by default"
  hedge present on the topic-gate/human-checkpoint claim with the round-cap
  escalation named explicitly; round cap "five rounds" both loops; no "blind"
  language (review army correctly "reads the whole draft top to bottom...
  grades exactly one axis"); link-integrity "most of its job is mechanical,"
  not "no judgment call"; aiScore "15 out of 100"; tone-gate timing "start of
  every round and once more after the loop exits," never "at the end";
  twelve-stage count with assemble/commit separate, "nine of them" agent-
  handled vs three orchestrator/human-owned (topic approval, assembly,
  commit) — arithmetic checks out (12 - 3 = 9); CTA scope correctly "the
  package covers content only," not "every piece of this stack."
- **Confirmed again, not new: the flare line renders without its "doesn't owe
  me optimism;" clause** ("The dashboard owes me the truth, and right now the
  truth is mostly NOT YET" vs the outline's exact "The dashboard doesn't owe
  me optimism; it owes me the truth, and right now the truth is mostly NOT
  YET"). Same as the prior pass's note — not a bullshit-detector finding (no
  factual claim changes, it's a softer line, not a bigger one), left for the
  voice/wordsmith axis.
- Elevation carried forward again: Osmani's "focused beats scattered"
  reconciliation still absent, still not cited in this post. Not gate-worthy
  (check 5 only applies to sources actually cited), but this is now the
  post's largest-ever reviewer count as previously logged (12 outline + 15
  draft = 27 reviewer-dispatches per post) with the counter-argument still
  unaddressed anywhere in the piece.
- New minor elevation, not gate: the stage-list sentence "Nine of them get
  handed to a narrow AI agent, one job apiece, no more" compresses two of
  those nine stages (the outline review loop and the draft review loop) that
  are each actually a fan-out of 12 and 15 single-axis reviewer agents, not
  one agent doing one job. Not misleading in context — the very next
  subsection ("Two Review Loops, One Axis Each") spells out the real counts —
  but a reader who stops at the stage-list sentence alone could walk away
  thinking each of the nine stages is one agent dispatch. Optional tightening
  for a future pass: "Nine of them get handed to narrow AI agents — some a
  single agent, two of them a whole review-loop fan-out — one job apiece, no
  more" (or similar), so the compression doesn't read as a literal 1:1 count
  even briefly.

### Second DRAFT-stage pass, 2026-07-15 (same day, later render) — CLEAN

- Zero gate findings. Independently re-verified rather than trusting the
  prior pass's notes: `.git/logs/HEAD` grep confirms commit `4e445c1`
  ("pipeline: swap onto agentic-content-pipeline v0.2.0 (TD-0038)") plus the
  follow-on "rewrite the automate-blog-writing post on the swapped pipeline"
  commit — swap claim holds. `content-pipeline.config.json` at repo root has
  `docsRoot: "docs"`, matching the "same docs/ path" claim. Fresh WebFetch of
  the package README's Cost section: "100-160 agent dispatches and several
  million tokens per post" and "bursts up to 15 agents at once per round"
  both match the CTA verbatim, and the README's scope note (blog publishing/
  scheduling/measurement stay outside the package) matches "The package
  covers content only." Fresh WebFetch of Ringly
  (`ringly.io/blog/ai-automation-statistics-2026`): $169.46B/$1.14T
  ($1,144.83B rounds correctly)/31.4%/48%/13-hours all verbatim. Fresh
  WebFetch of the solo-founders guide: the narrow-beats-broad claim, the
  Relay-specific human-checkpoint-by-design quote ("Relay builds in human
  checkpoints deliberately" / "that's not a limitation. That's the design."),
  and the Zapier 9-in-10/1-in-4 figures all verbatim. `src/data/stats.json`
  (generatedAt 2026-07-15) confirms 48 impressions/1 click/position 24.23
  exactly. The "6 to 22, three-item lists" tone-gate anecdote re-confirmed as
  a real logged pipeline event per `facts.md`, not fabricated. No standing
  pattern regressed: "by default" hedge present on both restatements of the
  human-checkpoint claim; round cap "five rounds" both loops; no "blind"
  language; aiScore "15 out of 100"; gate timing "start of every round and
  once more after the loop exits," never "at the end"; twelve-stage count
  with assemble/commit separate; scheduler-feeds-back claim correctly scoped
  to the scheduling loop only, not conflated with SEO research ("It never
  touches SEO research, a separate system entirely"). One non-gate
  observation: the protected flare line renders as "The dashboard owes me the
  truth, and right now the truth is mostly NOT YET" — missing the "doesn't
  owe me optimism;" clause from the outline's exact flare text. Not a
  bullshit-detector finding (no factual claim changes, if anything it's a
  softer line, not a bigger one) — flagged for the voice/wordsmith axis
  instead, not fixed here. Elevation carried forward again: Osmani's "focused
  beats scattered" reconciliation still absent, still not cited in this post.

## `automate-blog-publishing-schedule` family (drip scheduler post)

Ground truth for this post is `.claude/skills/content-pipeline/scripts/schedule.ts`
(219 lines total as of 2026-07-15). Check against that file directly, not the
prior post's prose — it describes real mechanics that are easy to embellish.

- **"One slot stays open on purpose" — no such reserved slot exists in code.**
  Both the previously-published post and a 2026-07-15 outline-stage rewrite
  claim the scheduler deliberately leaves the very next day empty so a
  same-day post can "slot into that gap." `assignSlots()` does the opposite:
  it packs future posts densely starting at `today+1` with zero gap (`slot =
  addDays(today, i + 1)` for the very first post in sort order). There is no
  code path that reserves a day and leaves it idle between runs. What's
  actually true: posts dated today-or-earlier are frozen (untouched), so a
  same-day post just publishes on its own date without touching the
  scheduler at all; a *queued future* post can jump the line only by
  re-running `--apply`, which recomputes the whole plan and bumps every
  later post back a day. Honest framing: "a same-day post skips the queue by
  publishing on its own date (the freeze rule already protects it); bumping
  an already-queued future post to the front instead pushes everything after
  it back a day when the scheduler re-runs" — never "a slot stays open" /
  "the empty next-day slot." Flag this in every future pass of this post
  family; also worth a product-improvement ticket if a real reserved-slot
  feature is wanted, since the prose fix only makes the description honest,
  it doesn't add the feature.
- **Line-count claim overclaims leanness — "about 150 lines" vs. actual 219.**
  Both the previously-published post and the 2026-07-15 outline state the
  scheduler is "about 150 lines of TypeScript" in at least six places (hook,
  point/lead, and three separate paragraph beats). Direct read of
  `schedule.ts`: 219 lines including the doc comment, ~196 non-blank. "About
  150" undercounts by 46%, well outside what "about" should cover — same
  failure shape as the sibling ledger's "thirty-some posts" and "three
  rounds" entries (a plausible round number nobody checked against the
  actual file). Honest framing: "about 220 lines." Re-count if the script
  changes again before this post ships.
- **Elevation, not gate: the live "about 19 days" coverage figure was ~16 as
  of 2026-07-15.** Counted future-dated posts in `src/content/blog/` directly
  (52 total posts, dates after 2026-07-15 run contiguously 07-16 through
  07-31 with no gaps = 16 days of coverage against the 28-day target, not
  19). Left as an elevation, not a gate finding, because the post already
  hedges it as "about" and "at the time of writing," and the true count
  drifts daily as posts get written/published — re-verify against the live
  file count at actual draft/dispatch time rather than trusting either
  number cached here.
- **RE-CONFIRMED, same day — 2026-07-15 outline pass ("My Blog's Queue Kept
  Hitting Zero, So I Automated Around Myself"), independent recount.**
  Re-grepped every `pubDate:` in `src/content/blog/` directly (not trusting
  the cached count above): future dates still run contiguously 07-16 through
  07-31 with zero gaps = 16 days of coverage, confirming the elevation above
  still holds and hasn't drifted. This outline pass otherwise checked clean
  on every standing pattern for this post family: line count correctly reads
  "about 220" in every field (topic, intendedBeat, facts, ourTake, and
  gateGuidance all consistent — no "150" anywhere); the "one slot stays open"
  overclaim is fully absent — order-6 states plainly "the scheduler doesn't
  hold a slot open between runs" and "a same-day post just goes out on its
  own date, no scheduler involved," matching `assignSlots()`'s dense-packing
  behavior and the freeze-rule exactly; the three cadence sources (WordPress.com,
  HubSpot, Search Engine Journal) were WebFetched fresh this pass and all
  three claims match verbatim (half-of-bloggers-weekly-or-less, 6-8
  posts/month for under-a-year blogs, daily-then-dark-for-months penalized).
  New source verified: `github.com/buildaloud/agentic-content-pipeline` is
  real, public, and its README confirms "12-stage," "12-15 reviewers per
  stage," and "aiScore < 15" — matching this outline's "twelve-stage" /
  "roughly fifteen" / tone-gate-inside-the-loop framing. Only finding this
  pass: the "about 19 days" figure (order 4, order 9) is stale by the same
  ~3-day margin noted above — recommend "about 16 days" if this outline
  drafts today, but re-run `schedule.ts --status` at actual draft time since
  it drifts daily.
- **NEW — "prints old filename, new filename, every inbound link it would
  rewrite" overclaims the dry-run output; link rewrites happen with zero
  logging.** Caught in the 2026-07-20 outline pass ("Queue Hit Zero, So I
  Automated My Blog's Publishing Schedule"). Read `schedule.ts`'s `main()`
  directly: the dry-run `moves` loop prints only
  `${p.date} → ${plan.get(p.file)} ${filler}${p.title}` — old date, new
  date, filler flag, and title. It never prints a filename (old or new),
  and there is no logging anywhere of which inbound links `apply()` is
  about to rewrite — `apply()` itself has zero `console.log` calls; the
  link rewrite happens silently via `linkBearingFiles()` string-replace.
  The only related output is `main()`'s post-apply line "✓ applied.
  Rebuild + verify links before committing." — which is the script asking
  the user to check its work *after*, not proof it showed the work
  *before*. The outline's order-5 `intendedBeat`, `facts`, and `ourTake`
  all claim the dry-run previews filenames and link rewrites, and `ourTake`
  goes further ("makes --apply safe to run without a manual double-check"),
  which contradicts the tool's own closing message. This is the same shape
  as the IP-hash/"private" and "audited" entries — the safety story is
  weaker than claimed, and the real limit (link rewrites aren't previewed)
  went unstated. Honest framing: dry-run previews the date move and title
  only; link rewrites happen silently on `--apply`, and the script's own
  last line still asks for a manual link check afterward. Watch for this
  resurfacing anywhere a future pass of this post claims the dry-run shows
  filenames or link diffs.
- **NEW — mined-source finding: Astro's own docs (the source already cited
  in beat 3) describe a `slug` frontmatter override that would eliminate
  the entire rename-plus-relink problem this post uses to justify the
  scheduler's complexity.** Caught in the same 2026-07-20 outline pass.
  WebFetched `docs.astro.build/en/guides/content-collections/` directly:
  "You can override a single entry's generated `id` by adding your own
  `slug` property to the file frontmatter" — confirmed this fully decouples
  the entry's URL from its filename (you could rename or restructure the
  file without changing the id/URL at all, "similar to the 'permalink'
  feature of other web frameworks"). This blog's posts don't use `slug`
  frontmatter — the date-in-filename-is-the-URL constraint that beat 3
  frames as an Astro limitation is actually a design choice this blog made
  (filename-derived id, no `slug` override), not something Astro forces.
  If the blog adopted a stable `slug` field decoupled from the date, moving
  a post's `pubDate` would need zero file renames and zero link rewrites —
  the scheduler's rename+relink machinery (the hardest, riskiest part of
  it, per beat 3's own forgotten-link incident) would become unnecessary
  for the date-move case entirely. This is exactly the check-5 failure mode
  this agent is named for: the better fix was sitting in a source the post
  already cites. Not asking the outline to abandon the scheduler (filler
  sinking, coverage reporting, and daily/monthly slotting all still have
  value independent of the URL question) — but the post should say the
  honest thing (this was a choice, Astro offers an escape hatch, we didn't
  take it) rather than implying the rename dance is unavoidable. Recommend
  a product-improvement ticket to evaluate migrating to frontmatter `slug`
  separately from this post shipping. Watch for future passes dropping this
  caveat once added.
- **RESOLVED — 2026-07-20 outline pass ("Queue Hit Zero, So I Automated My
  Blog's Publishing Schedule").** Re-verified against `schedule.ts` directly
  (219 lines) and the outline text: the "one slot stays open" overclaim is
  fully absent (order-6 states the scheduler "never reserves an empty day at
  rest" and a same-day post rides the freeze rule, matching `assignSlots`'s
  dense zero-gap packing exactly); line count reads "about 220" everywhere
  (point, hook, order-1 gateGuidance, order-8 ourTake) — no "150" anywhere;
  the dry-run-overclaims-its-preview finding is fixed — order-5's facts now
  correctly say dry-run prints only date+title (matches `main()`'s actual
  `console.log` format exactly, no filename), and explicitly states link
  rewrites happen silently on `--apply` with the script's closing line
  asking to verify *after*, not before; the Astro `slug`-override
  mined-source finding is now baked directly into order-3's facts field
  ("Astro actually documents a way around this... The rename-and-relink
  machinery is a choice I made, not something Astro required of me") —
  re-fetched `docs.astro.build/en/guides/content-collections/` this pass to
  confirm both the filename-as-id default and the `slug` frontmatter
  override quote verbatim ("similar to the 'permalink' feature of other web
  frameworks"). All four standing findings for this post family are now
  resolved in the outline. Watch future drafting/editing passes for any of
  them regressing back in (this family has regressed previously — see
  entries above).
- **NEW — flare line "It's just a cron job with opinions about coverage"
  mischaracterizes the automation mechanism; carried over unexamined from
  the stale published post into the new 2026-07-20 outline.** `schedule.ts`
  is never invoked by any scheduled trigger — confirmed by grepping the
  whole repo: no GitHub Actions workflow references `schedule.ts`, and
  `package.json` has no script that runs it. It is a manually-invoked CLI
  tool only (`npx tsx schedule.ts --apply`), run on demand as optional
  infrastructure per `SKILL.md`'s "Scheduling (optional)" section. The
  repo's one real cron (`.github/workflows/deploy.yml`, `cron: '0 16 * * *'`)
  drives the *daily site rebuild* that makes already-dated posts go live on
  their `pubDate` — a completely different mechanism from `schedule.ts`'s
  freeze/re-slot/rename/relink logic, and not something either the outline
  or the stale post actually describes anywhere else. Calling the thing this
  whole post is about "a cron job" claims unattended, scheduled execution
  the mechanism doesn't have — the honest description is a script Scout
  still has to run. This is the closing line of the piece (locked as
  "verbatim" flare per the outline's own gateGuidance), which makes it the
  most memorable, thesis-adjacent line to get wrong. Honest reframe: "It's
  just a script I run with opinions about coverage" (or similar — drop
  "cron," keep "opinions about coverage," the load-bearing part). Flag this
  specifically on every future pass of this post family — the "verbatim
  flare" instruction protects the *line*, not the *literal wrong noun*
  inside it.
- **Elevation, recurring: the live coverage-report figure is volatile and
  should not be trusted from any cached number, including this ledger's
  own.** As of this 2026-07-20 outline pass, a fresh recount of
  `pubDate:` values in `src/content/blog/` against a "today" of 2026-07-20
  (this post's own pubDate) shows 11 contiguous future days scheduled
  (07-21 through 07-31, then a gap), not 19 or 16 — a third different
  reading in three passes. The outline's own order-4/order-9 gateGuidance
  already instructs re-running `schedule.ts --status` at actual draft time
  rather than trusting any cached figure, which is the correct fix; this
  entry exists only to underline how fast this number drifts (three
  different snapshot values across three review passes of the same post)
  so no future pass is tempted to treat a previously-recorded figure as
  stable.
- **CONFIRMED — 2026-07-15 draft-mode bullshit-detector pass ("Queue Hit
  Zero, I Automated My Blog's Publishing Schedule").** Re-verified against
  `schedule.ts` directly (219 lines): line count reads "about 220" in both
  occurrences (hook, order-8 ourTake); the "11 days" coverage figure
  matches a fresh recount of `pubDate:` values (11 contiguous future days,
  07-21 through 07-31, using this post's own 07-20 pubDate as "today") —
  the most recent of three drifting snapshots, correctly used in both
  order-4 and order-9; no reserved-slot ("one slot stays open") language
  anywhere; dry-run/`--apply` description matches `main()`/`apply()`
  exactly (date+title only on dry-run, no filename, link rewrites silent
  on `--apply`); Astro `slug`-override mined-source finding is present in
  prose ("Astro actually documents a way around this... my own choice,
  built on top of an escape hatch Astro already offered") — re-fetched
  `docs.astro.build/en/guides/content-collections/` this pass, confirmed
  verbatim; flare line correctly reads "It's just a script I run with
  opinions about coverage" (no "cron"); all three cadence sources
  (WordPress.com, HubSpot, Search Engine Journal) re-fetched fresh and
  match the draft's claims verbatim.
- **NEW — "on autopilot" in the hook implies unattended/scheduled execution,
  the same overclaim family as the resolved "cron job" flare finding, in a
  new location.** Caught in the 2026-07-15 draft pass. The hook's closing
  clause — "So I wrote about 220 lines of TypeScript to remember for me:
  four weeks out, on autopilot." — reads as claiming the scheduler runs
  itself. Per `schedule.ts`, this is a manually-invoked CLI (`npx tsx
  schedule.ts --apply`), confirmed by grep to have no cron/CI trigger
  anywhere in the repo (same evidence as the earlier "cron job" finding).
  The draft's own closing flare line — "It's just a script I run with
  opinions about coverage" — directly contradicts "on autopilot" two
  sentences into the piece: one end of the post says the mechanism runs
  itself, the other says the author runs it. This is the hook-position
  instance of the same failure the "cron job" flare fix already
  established for this post family; the fix generalizes to any phrase
  implying unattended execution, not just "cron." Honest framing: drop
  "on autopilot," keep the "remembers so I'm allowed to forget" framing —
  e.g. "four weeks out, every time I run it." Watch for "autopilot,"
  "hands-off," "runs itself," and similar phrasing recurring in future
  passes of this post's hook/point/flare fields, the same way "cron job"
  did.
- **Open action item, not a prose gate finding: no product-improvement
  ticket exists yet for the Astro `slug`-frontmatter mined-source finding.**
  Checked `tickets/` this pass — no ticket references `slug` or
  rename/relink migration. The prose fix (naming the rename-and-relink
  machinery as this blog's own choice, not something Astro forces) has
  been present and accurate across multiple passes, which is sufficient
  for this axis's gate. The follow-up action — evaluate migrating to
  frontmatter `slug` to eliminate the rename+relink problem entirely — is
  still open. Flag as a standing elevation until a ticket exists; not a
  blocker since the text itself doesn't overclaim.
- **STILL PRESENT — "on autopilot" gate finding not yet applied, 2026-07-16
  draft-mode pass (same rendering as the 2026-07-15 pass that first caught
  it).** Confirmed the hook still reads "So I wrote about 220 lines of
  TypeScript to remember for me: four weeks out, on autopilot." — the exact
  text flagged in the entry above. Fix instruction unchanged: drop
  "autopilot" (this is a manually-invoked CLI, no cron/CI trigger anywhere
  in the repo), keep the "remembers so I'm allowed to forget" framing —
  "four weeks out, every time I run it." Flag on every future pass of this
  post's hook field until the edit actually lands in a published draft, not
  just an outline.

## Post: 2026-07-21-hired-a-team-of-specialists (OUTLINE-stage pass, 2026-07-16)

- **NEW — Osmani "focused agent" quote altered inside quote marks.** Beat 2's
  facts render: "Addy Osmani: a focused agent that only handles the data
  layer 'writes better database code than one juggling your entire
  codebase'." Fresh WebFetch of `addyosmani.com/blog/code-agent-orchestra/`:
  actual sentence is "A focused agent that only handles the data layer
  writes **significantly** better database code than **a generalist**
  juggling your entire codebase." Two silent edits inside quote marks
  ("significantly" dropped, "a generalist" → "one"). Fix: restore the exact
  wording.
- **NEW — the Osmani "focused beats scattered"/sweet-spot tension is now
  check-5 gate-worthy for THIS post, not just a standing elevation, because
  Osmani is directly cited here for the team-size number.** Beat 9 quotes
  Osmani's "Three to five teammates is the sweet spot" verbatim as a
  supporting fact, but this post's own beat 6 documents a review army of 12
  outline reviewers + 15 draft reviewers per round — 3-5x his stated ceiling
  — with no acknowledgment of the gap anywhere in the piece. Note: on this
  fresh fetch Osmani's actual "focused vs. scattered" line reads "Three
  focused agents consistently outperform one generalist agent working three
  times as long" (not "outperform five scattered ones" as a much older
  ledger entry for the sibling post paraphrased it — that older paraphrase
  looks like drift and should be corrected wherever it's quoted). The
  reconciliation already drafted for the sibling post applies here almost
  verbatim (his reviewers lean on objective pass/fail tools that don't exist
  for prose, so axis-splitting substitutes for a test suite). Since this is
  the first pass of this specific post where Osmani is cited for the exact
  number the post's own scale exceeds, this graduates from "elevation" to
  gate finding — see the check-5 precedent note at line ~1263 of this file.
- **NEW — security-kit's real six sub-agents misdescribed; a real stage
  (threat-modeler) replaced with an invented one ("a final synthesis pass")
  that doesn't exist in the actual pipeline.** Beat 5's facts list "a
  surface-mapper, an input-tracer, a vuln-hunter, a false-positive judge, a
  mitigation-planner, and a final synthesis pass that assembles what
  survived" as the six lanes. Fetched `github.com/chadfurman/security-kit`
  directly (README's own phase-by-phase block): the real six sub-agents are
  surface-mapper, untrusted-input-tracer, **threat-modeler** (Phase 2, "maps
  out" abuse paths → `docs/security/threat-map.md`), vuln-hunter, fp-judge,
  mitigation-planner. There is no agent or phase named "synthesis" anywhere
  in the README — Phase 6/7 are artifact persistence and ticket generation,
  not a findings-assembly step. This is a ground-truth mismatch about our
  own shipped tool (check 1: ground truth is the actual implementation, not
  the post's description on faith). Fix: swap the invented synthesis pass
  for the real threat-modeler stage, correctly placed between input-tracer
  and vuln-hunter.
- **NEW — AI21's "parallel subagent execution" page describes ensemble/
  best-of-n (multiple independent attempts at the SAME task, then pick the
  winner), not domain-specialist division of labor — beat 3 cites it as if
  it endorses the latter.** Fresh WebFetch, asked directly whether the page
  describes (a) multiple attempts at one task or (b) dividing one task into
  different narrow specialties: confirmed (a) only — "decomposes it into
  multiple independent strategies or attempts," "explores several strategies
  in parallel, evaluates the outcomes, and selects the best result." The
  page never uses "specialist," "specialty," or "narrow scope." Beat 3's
  framing ("A parent agent decomposes a task and hands each piece to a
  subagent... per AI21's writeup on parallel subagent execution") implies
  AI21 is describing the same narrow-domain-specialist pattern the post
  argues for — it isn't; it's redundant parallel attempts at an identical
  problem. The "isolated execution environment" quote itself is accurate and
  the isolation *mechanic* does transfer to a specialist team, but the
  source's own subject is a different technique than what's being
  illustrated. Same shape as the founding IP-hash case: don't let a source's
  real, narrower claim get stretched to cover a broader one it doesn't make.
  Fix: reframe so AI21 is credited only for the isolation mechanic, not for
  endorsing domain-specialist decomposition.
- **NEW — "Four options, A through D" line styled as a direct quote doesn't
  match the game post's actual wording.** Beat 8's facts render: "Game
  specialists returned candidates in the shape 'Four options, A through D,
  here's the tradeoff on each, you pick' rather than a single verdict."
  Fetched the game post directly: the actual line is "instead of an agent
  just doing the thing, it would come back with options. 'Here's candidate
  A, B, C, D. Here's the tradeoff on each. Chad picks.'" — different wording
  and a changed subject ("you pick" vs. the source's "Chad picks," which
  matters here since this same beat's `ourTake` explicitly says "Chad made
  the calls on the game"). Paraphrase-in-quote-marks (check 3). Fix: either
  match the source's exact wording or de-quote it into plain paraphrase.
  All other beat-4/6/7/8 ground-truth claims checked this pass (build
  timeline "about three weeks," the seven named specialists incl.
  monetization guard's veto mandate, 12/15 reviewer counts, round cap 5,
  tone-gate threshold and location, "topic approval" as the only default
  human checkpoint, no use of "skills") verified accurate against direct
  WebFetch of both cited buildaloud.ai posts — no other misquotes found.
  README's `100-160 agent dispatches and several million tokens per post`
  figure in beat 9 also verified verbatim against
  `github.com/buildaloud/agentic-content-pipeline`'s Cost section, but the
  same section's adjacent concurrency caveat ("fan-out also bursts up to 15
  agents at once per round") isn't carried over — same standing pattern as
  the sibling post's CTA finding (check 5: the fix was sitting in the same
  cited section). Flagged as a gate finding this pass since beat 9's whole
  job is honest cost disclosure from this exact source.

## Post: 2026-07-21-hired-a-team-of-specialists (DRAFT-stage pass, 2026-07-16)

- **GOOD NEWS: every outline-stage finding above landed correctly in the
  draft.** Fresh WebFetch of all five sources (Osmani, AI21, Anthropic,
  security-kit, agentic-content-pipeline README) plus the three cited
  buildaloud.ai posts (game, security team, automate-blog-writing) this
  pass: the Osmani "significantly better... a generalist" quote is restored
  verbatim; the Osmani "3-5 teammates is the sweet spot" / "token costs
  scale linearly" split is kept as two separate facts, no causal stitching,
  and the review-army-vs-Osmani's-ceiling reconciliation IS now present
  ("his reviewers lean on tools that return a flat pass or fail... Prose has
  no such tool, so I split judgment by axis instead") — this closes the
  long-standing "Osmani focused-beats-scattered absent" elevation that
  recurred across nearly every pass of the sibling post; the AI21 section
  correctly scopes the source to "parallel attempts at one task rather than
  parallel specialties," no longer implying AI21 endorses domain-specialist
  decomposition; security-kit's six lanes are now surface-mapper,
  input-tracer, threat-modeler, vuln-hunter, false-positive judge,
  mitigation-planner — matches the real pipeline, no invented "synthesis
  pass"; the "Chad picks" quote matches the game post's exact wording; the
  README's 100-160-dispatch figure now carries its adjacent 15-agent
  concurrency/rate-limit caveat. Also fresh-verified: 12/15 reviewer counts,
  five-round cap (both loops), aiScore >=15 threshold, tone-gate timing
  ("start of every round... once more after the loop exits" — an accurate
  paraphrase of "before the first round and after every edit pass," not the
  previously-flagged "at the end" framing), and "topic approval... by
  default" hedge on its first use — all match `automate-blog-writing`'s
  ground truth.
- **NEW — isolation mechanic oversold as preventing scope collisions the
  post's own cost section admits happen.** "That's the same mechanic that
  lets a real team of domain specialists run as parallel AI subagents, side
  by side, without tripping over each other" (the specialist-definition
  section) claims the AI21 isolation mechanic (an isolated *execution
  environment*, per the source, that keeps one subagent's actions from
  interfering with another's) also prevents scope/duplication conflicts —
  but "What the team costs" later admits the opposite: "I've shipped ones
  too loose and watched two agents solve the same problem twice, in
  different files, disagreeing with each other by the time either one
  reported back." Execution isolation (no shared-state corruption) and
  scope isolation (no redundant/overlapping work) are different guarantees;
  AI21's source only supports the first. Fix: scope the claim to what
  isolation actually buys (no corrupted shared state), not the absence of
  all coordination failure, so it doesn't contradict the honest-cost section
  nine beats later.
- **NEW — "costs nothing to try tonight" contradicts the post's own
  dedicated cost-disclosure section two paragraphs earlier.** The CTA closes
  with "...and it costs nothing to try tonight," directly after a full
  section ("What the team costs") establishing the opposite: token costs
  scale linearly with team size, this exact pipeline burns roughly 100-160
  dispatches and several million tokens per post, and "a giant prompt is
  cheaper to write. It's just more expensive to be wrong with" (implying the
  team approach is NOT the cheap option, just the better bet). The intended
  claim — no paid tier gates the *feature* — is already stated accurately in
  paragraph 1 ("Nothing about running it is gated behind a paid tier").
  Restating that same point as "costs nothing" one section after
  establishing there's a real token bill is the superlative-framing failure
  mode (check 4): the honest word here is "no paid tier," not "nothing."
- **NEW — monetization agent's mandate downgraded from veto to vote,
  understating the mechanism the post's own thesis depends on.** "The game's
  monetization agent has one mandate: veto pay-to-win. It gets a vote on
  anything touching the store or the economy, and it uses it." Fresh
  WebFetch of the game post: the actual mechanism is a non-negotiable veto
  ("The rule is simple and it's not negotiable: you cannot buy power.
  Ever."), not a vote among peers that could be outvoted. Since this whole
  section's argument is that stubborn, non-overridable opinions are what
  make a specialist useful, softening "veto" to "vote" one sentence later
  undercuts the very point being made — a vote can lose; the source's design
  explicitly can't be outvoted. One-word fix: "gets a veto," not "gets a
  vote."
- **Elevation: "never pay-to-win" styled as a quoted mandate isn't the game
  post's actual wording.** ("an agent whose one job is "never pay-to-win"
  holds the line instead") The source's line is "you cannot buy power.
  Ever." — not attributed to the game post explicitly, so lower-risk than a
  cited misquote, but the quote marks around an unsourced paraphrase read
  like a citation. De-quote it to avoid the appearance of a lifted line.
- **Elevation: beat-8 restatement of the "one human checkpoint" claim drops
  the "by default" hedge used at its first mention in this same post.**
  ("The content pipeline places its one human checkpoint, topic approval, at
  exactly that kind of decision...") Not contradicted by anything else in
  THIS post (unlike the sibling post, this piece never describes a
  round-cap-to-human escalation path), so not gate-worthy on its own — but
  given how many times this exact claim-shape has regressed across the
  sibling post's passes, worth hedging here too on principle.

## Post: 2026-07-21-hired-a-team-of-specialists (DRAFT-stage pass 2, 2026-07-16)

- **GOOD NEWS: all five prior-round findings landed.** Isolation-mechanic
  scope now reads "without one agent's actions corrupting another's
  workspace mid-run" (matches AI21's actual claim, doesn't overclaim
  coordination-failure prevention); "costs nothing to try tonight" is gone
  from the CTA (paragraph 1's "gated behind a paid tier" carries the intended
  claim, the CTA now says "the only cost is the time it takes to write the
  mandate," consistent with the honest-cost section); monetization mandate
  reads "veto," not "vote"; "never pay-to-win" is de-quoted (no quote marks);
  beat 8's "one human checkpoint" restatement now carries "by default."
- **NEW — "3-5 teammates is the sweet spot" labeled "verbatim" is not
  Osmani's actual wording, and this error originates in the approved
  OUTLINE's own `facts` field, not the drafter.** Beat 9 (and the outline
  beat 9 facts that feed it) render: "Addy Osmani's rule of thumb, verbatim:
  '3-5 teammates is the sweet spot.'" Fresh WebFetch of
  `addyosmani.com/blog/code-agent-orchestra/` this pass: the actual sentence
  is "**Three to five** teammates is the sweet spot." — numerals substituted
  for the source's spelled-out words, inside a quote explicitly flagged as
  "verbatim." This is the same failure shape as the earlier "significantly"/
  "a generalist" drops on the neighboring Osmani quote in this post (see
  above): small silent edits inside quote marks are easy to wave through on
  a skim, even when a prior pass already fresh-fetched the *adjacent* line
  ("Token costs scale linearly...") correctly. Lesson for future passes:
  re-verify every quote marked "verbatim" against a fresh fetch every round,
  not just the ones that look risky — word-for-numeral substitution reads as
  "obviously the same claim" and slips past casual review. Fix: change
  "3-5" to "Three to five" wherever this quote appears (draft and, ideally,
  the outline record so future regenerations don't reintroduce it).
- **NEW — check-5 mined-source finding: Anthropic's own multi-agent write-up
  (cited in this post for the 90.2% figure and the 15x token multiplier)
  contains an explicit caveat that undercuts the post's flagship proof
  point, and the post never surfaces it.** Fresh WebFetch, asked directly
  for limitations: "Most coding tasks involve fewer truly parallelizable
  tasks than research, and LLM agents are not yet great at coordinating and
  delegating to other agents in real time," and "Some domains that require
  all agents to share the same context or involve many dependencies between
  agents are not a good fit for multi-agent systems today." The post's
  flagship example (three beats deep) is a tower-defense game built by
  parallel coding subagents on a shared codebase — closer to the domain
  Anthropic itself flags as a weak fit than to the research-query domain the
  90.2% figure was measured on. The post's honest-cost section already
  admits a symptom of this (two agents solving the same problem twice in
  different files) but never traces it back to the caveat sitting in the
  same source it cites for the pro-multi-agent number three beats earlier —
  same shape as the founding IP-hash case (check 5): don't cite a source
  for the number that helps the thesis while leaving its own stated
  limitation, on the post's own flagship domain, unmined. Fix: name the
  caveat in the honest-cost beat, tied to the game example already
  established there.

## Post: 2026-07-21-hired-a-team-of-specialists (DRAFT-stage pass 3, 2026-07-16)

- **GOOD NEWS: the pass-2 Anthropic mined-caveat fix landed.** "What the team
  costs" now reads "Anthropic names the same risk from the outside: its own
  multi-agent write-up admits most coding tasks don't parallelize as cleanly
  as its research use case does... A tower-defense game shipped by one person
  in three weeks sits closer to that shared-state end than an open-ended
  research query does" — ties the caveat directly to the flagship game
  example, closing the check-5 finding from the prior pass. Fresh WebFetch of
  all five sources this pass (Osmani, AI21, Anthropic, security-kit,
  agentic-content-pipeline README) plus the game post: "Three to five
  teammates is the sweet spot" now spelled out correctly (not "3-5"); all
  other quotes/figures verified verbatim.
- **REGRESSED — monetization mandate is "vote" again, in a fresh render of the
  same sentence pass-2 already fixed.** "The game's monetization agent has
  one mandate: veto pay-to-win. It gets a vote on anything touching the store
  or the economy, and it uses it." The source (game post) describes a
  non-negotiable veto ("you cannot buy power. Ever."), and this exact draft's
  own later sentence ("a wrong veto is harder to catch than a wrong
  suggestion") still says "veto" — so this paragraph now contradicts itself
  as well as the source. Same one-word fix as before: "gets a veto." Given
  this is the second time this exact word has flipped back after a fix
  landed, treat "vote" appearing anywhere near this agent's mandate as a
  standing regression risk for this post — grep for it on every future pass.
- **NEW — "It's free to run" overclaim, same shape as the previously-fixed
  "costs nothing to try tonight," reintroduced in paragraph 1 instead of the
  CTA.** "It's free to run: no separate paid feature gates it. Subagents
  ship as part of Claude Code's own config, not an add-on SKU." "What the
  team costs" three sections later establishes the opposite: real token
  costs that scale linearly with team size, ~100-160 dispatches and several
  million tokens per post for this exact pipeline, and "a giant prompt is
  cheaper to write. It's just more expensive to be wrong with." The intended
  claim (no paid tier/SKU gates the feature) is true and confirmed against
  Claude Code's own docs (subagents are a built-in, no-install, no-paid-add-on
  feature) — but "free to run" oversells that into "there is no real cost,"
  which the post's own cost section spends a whole section disproving. Same
  fix pattern as before: keep "no paid tier/SKU," drop "free."

## Post: 2026-07-21-hired-a-team-of-specialists (DRAFT-stage pass 4, 2026-07-16)

- **SELF-CORRECTION — the "veto downgraded to vote" finding from pass 1/3 was
  itself a source misread; the source genuinely uses both words for two
  different scopes.** Fresh, careful WebFetch this pass (asked the tool to
  list every sentence containing "veto" and every sentence containing "vote"
  verbatim, not paraphrased): the game post contains ALL THREE lines —
  "whose entire job is to **veto** pay-to-win," "It gets a **vote** on
  anything that touches the store or the economy," and separately "It has
  veto. It uses it." The draft's sentence ("one mandate: veto pay-to-win. It
  gets a vote on anything touching the store or the economy, and it uses
  it.") is a close, accurate paraphrase of the source's own two-sentence
  structure — "veto" scopes specifically to pay-to-win, "vote" scopes to the
  broader store/economy domain, and both are real. **Correct this ledger's
  own three prior "regression" entries for this line** (pass 1 and pass 3
  above): they were reacting to only the "It has veto. It uses it." sentence
  and treating "vote" elsewhere as a contradiction, without finding the
  source's own "gets a vote" sentence. Do not re-flag "vote" near this
  agent's mandate as an error going forward — only flag if the draft claims
  the vote *could be overridden/outvoted*, which the source never supports.
  Minor remaining nit (elevation, not gate): the draft attaches "and it uses
  it" to the vote sentence, but in the source "It uses it" follows the veto
  sentence specifically — harmless since both are independently true, but a
  future pass could tighten the paraphrase to mirror the source's two
  separate sentences more exactly.
- **REGRESSED A FOURTH TIME — "3-5 teammates is the sweet spot" still
  digits, still labeled "verbatim," despite two prior passes (pass 2 fix,
  pass 3 confirmed-fixed) that spelled it out correctly.** Fresh WebFetch
  this pass confirms the source: "Three to five teammates is the sweet
  spot." The draft under review has regressed back to "3-5." This is now a
  standing, recurring risk specific to THIS quote in THIS post — treat as a
  permanent grep-check on every future pass of this post: search for
  "3-5" near "sweet spot" and confirm it reads "Three to five" every time,
  even after it's been fixed and reconfirmed clean in a prior pass. Do not
  assume a fix that held for one pass will hold for the next.
- **NEW (or third occurrence) — "never pay-to-win" styled as a quoted mandate
  still doesn't match the source, despite an earlier pass de-quoting it.**
  Pass 1 flagged this as a low-risk elevation (paraphrase-in-quote-marks,
  unsourced); pass 2's GOOD NEWS section reported it de-quoted. This pass's
  draft has it back in quotes: "an agent whose one job is "never pay-to-win"
  refuses instead." The source's actual language is "veto pay-to-win" /
  "you cannot buy power. Ever." — not "never pay-to-win" in any form.
  Escalating this from elevation to gate finding this pass since it has now
  recurred at least three times across passes despite being fixed each time;
  treat as a standing regression risk like the "3-5" quote above. Fix:
  de-quote it (plain paraphrase, no quote marks) rather than trying to
  match wording that doesn't exist verbatim in the source.

## Post: 2026-07-21-hired-a-team-of-specialists (DRAFT-stage pass 5, 2026-07-16)

- **GOOD NEWS: "never pay-to-win" is de-quoted again this pass** ("an agent
  whose one job is never pay-to-win refuses instead" — no quote marks), and
  the veto/vote sentence is untouched from pass 4's self-correction (still
  accurate, do not re-flag). Isolation-mechanic scope, AI21 framing,
  security-kit's real six lanes (incl. threat-modeler), the "Chad picks"
  quote, the "by default" hedges on both "one human checkpoint" mentions, and
  the README's 100-160-dispatch/15-agent-burst figures all still hold.
- **REGRESSED A FIFTH TIME — "3-5 teammates is the sweet spot" still digits,
  still labeled "verbatim."** Same sentence flagged in outline pass and draft
  passes 2/3/4. Worth recording a tooling note this pass: a first WebFetch of
  Osmani's page (plain prompt) returned "3-5 teammates is the sweet spot" —
  i.e. the fetch tool itself round-tripped the source's spelled-out wording
  back into digits when summarizing, which is almost certainly what produced
  at least one of the earlier "confirmed 3-5" mis-verifications in this
  ledger's history. A second fetch, explicitly demanding literal
  numeral-vs-word character verification, returned "Three to five teammates
  is the sweet spot" and identified the location ("Agent Teams: key
  takeaways" section, first bullet). Trust the second methodology going
  forward: **for this specific quote, always ask WebFetch explicitly whether
  the source uses digits or spelled-out words** — a plain "quote this
  sentence" prompt is not reliable here because the summarizing model
  normalizes "three to five" into "3-5" on its own. The draft still needs the
  fix: change "3-5" to "Three to five" in the quoted text.
- **NEW — cost-overclaim pattern (previously fixed in the CTA as "costs
  nothing to try tonight" / "It's free to run") has resurfaced a third time,
  now in paragraph 1's intro instead of the CTA or a mid-post sentence.**
  Current text: "Claude Code ships subagents by default, as part of its own
  config and free for anyone to try tonight." "What the team costs" —
  several thousand words later — establishes real, non-trivial token costs
  (100-160 dispatches, several million tokens per post for this exact
  pipeline; "a giant prompt is cheaper to write. It's just more expensive to
  be wrong with"). The intended claim (no paid SKU/tier gates the feature) is
  true and belongs in the piece; "free... to try tonight," unqualified, oversells
  it into "no real cost," which the piece spends a whole section disproving.
  This is the third distinct sentence/location this exact overclaim shape has
  occupied in this post (CTA in pass 1, paragraph 1 in pass 3, now paragraph 1
  again in pass 5) — treat "free" anywhere near "subagents"/"try tonight" as a
  standing regression risk for this specific post, on top of "3-5" and
  "never pay-to-win" above. Fix: "no separate paid tier to unlock it" /
  "ships free of a paid add-on," not bare "free."
- **Elevation, not gate: the Anthropic mined-caveat tie-back to the flagship
  game example has softened back to generic phrasing.** Pass 3's GOOD NEWS
  reported the fix landed as "A tower-defense game shipped by one person in
  three weeks sits closer to that shared-state end than an open-ended
  research query does" — a specific callback. This pass's draft states the
  caveat ("most coding tasks don't parallelize as cleanly as its research use
  case does... domains needing shared context or tight dependencies... aren't
  a good fit") but drops the explicit tie back to the game as the closer-fit
  example; it reads as a general caveat rather than one mapped onto the
  post's own flagship domain. The caveat itself is still present and honest,
  so not gate-worthy this pass, but the specificity that made it a genuine
  check-5 catch (not just a disclaimer) is fading. Watch for this drifting
  further toward generic on future passes.

## Post: 2026-07-23-teaching-a-robot-to-balance-my-game (OUTLINE-stage pass, 2026-07-16) — CLEAN

- Both cited sources re-fetched and checked for fidelity: TechBullion's
  "agents can run thousands of sessions overnight, they find low-probability
  but high-impact issues before real players do" and its hybrid-evaluation
  line ("agents flag suspicious traces, then humans verify and triage") match
  the outline's use verbatim. Game Developer's "especially good at finding
  bugs, game parameter tuning, player pass rate, and difficulty prediction"
  also matches; the outline's own gateGuidance already correctly keeps the
  "weeks compressed to coffee" framing as first-person, not attributed to the
  source (this post's specific version of the general "don't over-scope a
  citation" pattern above).
- **Mined-source check (item 5), no gap found:** Game Developer's piece
  mentions DRL predicting "when the player might leave the game out of lack
  of interest" (churn/engagement prediction) — at first glance this looks like
  it could rebut the post's claim that the sim "has no measure for whether
  the game is fun." Checked closer: that technique requires real player
  telemetry ("large sets of player data") to train on, which this rig's
  headless-bot-only setup doesn't have — no real players in the loop yet, so
  the technique doesn't apply here. Not a product gap for this post as
  scoped. Also checked whether TechBullion's 3-persona recommendation
  (explorer/farmer/opportunist) implies a materially different/better bot
  design than the post's three bots (greedy-optimizer/upgrade-heavy/
  prestige-loop) — it's the same technique (deliberately different personas
  over raw skill), not a better one; no gap. Neither source discusses
  surrogate models for expensive-simulation cost, so the post's own surrogate
  idea isn't something a cited source already had and we missed.
- No unstated-limitation or strength-word gate findings; the outline already
  self-corrects most of the standing ledger patterns (no-hedge "only"/"at the
  end"/"research consensus"/bare "audited" shapes) via its own gateGuidance
  fields before I even got to them. Two elevations offered: soften "catch...
  before a human ever sits down" to "usually catch" (beat 8), and note the
  three-bot roster is a deliberately different *sample*, not exhaustive
  coverage of "the whole space of how people play" (beat 3).
- **RESOLVED at DRAFT stage (2026-07-16).** The HP_SCALING_BASE staleness gate
  (below) is fixed in the actual draft: it now reads "in one early tuning
  pass... it went from 1.06 to 1.10" plus a closing parenthetical, "(The
  number's since been re-tuned more than once, but that pass is the one that
  came from his hands instead of the sim.)" — explicit historical framing,
  no present-tense claim about the live constant. Boss-orbit-speed beat also
  stays in the SAFE zone identified below (no specific before/after numbers
  cited). No new HP/orbit staleness issue to watch on future passes of this
  post, but the general pattern (any beat citing a specific live game-balance
  constant needs its number checked against
  `packages/game-core-pack/src/domains/balance/config.ts` at review time, not
  just flagged for later) still applies to *other* game-balance posts.
  **Original finding, kept for the pattern:** citing a specific tuning-pass
  number ("X went from A to B") with no historical framing reads as a
  present-tense claim about the live constant — a technically literate reader
  can check the public repo and find it wrong if the value has since moved.
  Fix is cheap: keep the real numbers (they're the actual story — a human's
  hands catching what the sim missed) but frame explicitly as one pass in a
  longer tuning history, e.g. "in one early tuning pass... (the number's
  since moved again, but that pass is the one that came from hands, not the
  sim)."
- **STANDING ELEVATION (not gate, DRAFT-stage pass 2026-07-16): "three bots"
  reads as the full roster when the repo has ~12 named strategy files.**
  `tools/sim/strategies/` in the tower-defense repo has greedy-optimizer,
  upgrade-heavy, prestige-loop (the three the post uses) plus ~9 more
  (under-build, over-build, mixed-damage, meta-progression, deep-research,
  idle-only, all-dlc, start-at-wave-n...). Spotlighting three as "the bots"
  I run is a legitimate editorial simplification (they're the three built to
  disagree on purpose, and the post's own claim is about deliberate diversity
  not exhaustive coverage) — not a wrong-fact, so keep this an elevation, not
  a gate. Honest reframe if a future draft wants it sharper: "three of my AI
  playtesting bots" instead of "three AI playtesting bots," so a reader
  doesn't infer the roster tops out at three. **CONFIRMED applied** at
  DRAFT-stage 2026-07-16 pass 2 ("three of my AI playtesting bots" is the
  live phrasing) — don't re-flag.
- **GATE, DRAFT-stage pass 2, 2026-07-16 — "verifies and decides" stretches
  TechBullion's hybrid framing past what it says, and past what this same
  ledger's own outline-stage note (above) claimed was verbatim.** Fresh
  WebFetch of the source confirms its actual line is "agents flag suspicious
  traces, then humans verify and triage," and the "triage" is scoped
  narrowly: reproducible crashes, reward-sequence exploits, timing bugs,
  balance edge cases. The article never discusses subjective/fun judgment.
  The draft's "## What the sim can and cannot tell you" beat renders this as
  "agents flag the suspicious traces; then a human verifies and decides,"
  introduced by "The framing I'll repeat with a straight face is
  TechBullion's" right after a sentence about "who decides whether any of it
  is fun" — which reads as TechBullion itself validating the fun-judgment
  split, when the source's hybrid loop is about triaging technical flags,
  not taste. (The prior outline-stage note above calling this "verbatim"
  was checking an earlier outline pass that used "triage"; something drifted
  the wording to "decides" by this draft — watch for this specific
  triage→decides substitution on future passes of this post.) Fix: keep
  "triage" (the source's real word, scoped to crashes/exploits/balance
  edge cases) and mark the extension to fun/taste explicitly as this post's
  own move, not TechBullion's claim.
- **RESOLVED as of DRAFT-stage pass 3 (2026-07-16).** The "verifies and
  decides" drift above is fixed: the current draft's "## What the sim can and
  cannot tell you" beat reads "agents flag suspicious traces like crashes and
  exploits, then a human verifies and triages them. Widen that same shape to
  taste and it still holds" — back to "triages," and "widen that same shape"
  explicitly marks the taste/fun extension as this post's own move, not
  TechBullion's claim. Fresh WebFetch reconfirms TechBullion's exact line
  ("agents flag suspicious traces, then humans verify and triage... human-in-
  the-loop step reduces false positives") is scoped to technical validation
  only (crashes, exploits, timing, balance edge cases) — the article never
  addresses fun/subjective judgment, which the draft now correctly treats as
  Scout's own widening rather than something TechBullion said. Watch for
  "decides" resurfacing on any future pass of this post.
- **NEW GATE, DRAFT-stage pass 3, 2026-07-16.** See the ratio-vs-latency
  overclaim entry in "Overclaim patterns" above (headless rig beat, "before
  the frame would've drawn"). Also confirmed clean this pass: Game Developer's
  "especially good at finding bugs, game parameter tuning, player pass rate,
  and difficulty prediction" matches the draft's "AI agents are good at game
  parameter tuning and difficulty prediction" verbatim-in-substance, and the
  "tuning that used to eat my evenings now runs while I get coffee" line stays
  correctly first-person, not attributed to the source (the article's own
  weeks-to-hours line is a general claim, not scoped to tuning specifically —
  right call not to cite it for that). HP_SCALING_BASE and boss-orbit beats
  both still hold the historically-framed/exact-number versions confirmed
  clean in the prior pass. No other new gate findings this pass.
