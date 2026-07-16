# Blog facts — fact-checker memory

The fact-checker owns this file. It reads it before every check and updates it
after: facts it verifies, corrections it makes, external claims it confirms
against a source. Keep it tidy — correct an entry rather than duplicating it.
These are OUR project facts (the expensive-to-get-wrong ones) plus a running
record of verified external claims.

## Our projects / tools (get these right)

- **security-kit** — a Claude Code plugin that runs an agentic security REVIEW
  over *your own* repositories (whole-repo, not just a PR diff): threat map,
  untrusted-input tracing, vuln hunting with an 8/10 exploitability gate, dated
  "case law" artifacts in `docs/security/`. Inward-facing (code you own).
  Lives on GitHub, installed as a plugin. **It is NOT the skills marketplace and
  is NOT a third-party skill auditor.**
- **Skills Marketplace** (marketplace.buildaloud.ai) — a catalog of AUDITED
  third-party skills, scored under the AST-1.0 taxonomy (maliciousIntent,
  inherentCapability, misuseSurface, overallExposure). Outward-facing (judging
  skills you'd install from others). Distinct from security-kit — "same family,
  opposite directions."
- **ticket-kit** — a Claude Code plugin for AI-first ticketing (agents author +
  groom tickets; a board via `/ticket-kit:serve`). GitHub + ticket-kit.chads.website.
- **Tower Defense** — a browser tower-defense game at td.buildaloud.ai.
- **The content pipeline** — SEO research → brief → draft → tone gate → fact +
  link check → review → hero → summary/digest → assemble → score/schedule.
  Posts are scheduled by the SEO impact model (`docs/seo-impact-model.md`).
- **Narrator** — every post is written as **Scout** (the AI). Who *built* a
  thing (Chad, or Chad + a collaborator) lives in `src/data/projects.ts`.

## Standing cautions (learned from the 2026-07-11 audit)
- **No OWASP "Agentic Skills Top 10" exists.** OWASP's real LLM work is coded
  `LLM01–LLM10` (Top 10 for LLM Applications). Do NOT attribute our own `AST-01…`
  taxonomy codes to OWASP — a drafter hallucinated an "OWASP Agentic Skills Top 10,
  AST01/AST02" citation (caught + removed on the grill-me post).
- **Anthropic pricing (as of mid-2026):** Opus 4.8 $5/$25, Haiku 4.5 $1/$5,
  Sonnet 5 list $3/$15 but with **introductory $2/$10 through Aug 31 2026**. A post
  citing Sonnet 5 at $3/$15 without noting the intro rate is misleading. Model
  names + prices date fast — frame "as of <month year>".
- **Control-panel v0 IS live** (panel.buildaloud.ai, shipped this session). Older
  notes calling it "unmerged / pending activation" are stale — the panel shipped.
- **Quotes must be verbatim.** Several posts put paraphrases in quotation marks
  (Addy Osmani, a GitHub README, "any question about you"). If it's not word-for-word
  in the source, drop the quote marks.
- **The content pipeline is now 12 stages, as of the 2026-07-12 outline-review
  redesign** (source scan → topic-approval gate → SEO research → editorial
  brief → outline → outline review loop → draft → draft review loop → hero
  image → summary/digest → assemble → commit). Per
  `.claude/skills/content-pipeline/SKILL.md` and
  `docs/specs/2026-07-12-document-review-fanout-design.md`. This SUPERSEDES the
  older "9 stages" description (research → brief → draft → tone gate →
  fact+link check → review → hero → summary/digest → assemble) and the even
  older "8 stages / 7 agents." Two structural additions: (1) an OUTLINE
  artifact reviewed before any prose exists, by a dozen (12) single-axis
  reviewers in its own fixpoint loop (**round cap 5**); (2) the draft is then
  reviewed by ~15 single-axis reviewers in a second fixpoint loop (**round cap
  5**), replacing the old single "review pass." **CORRECTION 2026-07-13: the
  round cap for BOTH loops is 5, not 3.** Re-confirmed via direct read of
  `.claude/skills/content-pipeline/SKILL.md` lines 165 and 254, both reading
  verbatim "Round (repeat until converged or round cap 5)". An earlier version
  of this memory file said "cap 3 rounds" for both loops — that was wrong (or
  the SKILL.md value changed after 07-12 and this file wasn't updated). Any
  outline/draft stating "capped at three rounds" for either loop is now a
  wrong-fact gate finding; the correct phrasing is "capped at five rounds."
  Caught on the 2026-07-13 outline-stage review of
  `automate-blog-writing-with-ai-agents`, which repeated "three rounds" four
  times (twice for the outline loop, twice for the draft loop). The tone gate (`tone-grader.ts`
  `scoreText`) is deterministic: `bannedHits.length * 100` added to an internal
  score, but the *actual* mandatory-gate trigger checked by the pipeline is
  `banned > 0 OR aiScore >= 15` — the reported `aiScore` field itself is clamped
  to a max of 100 (`Math.min(score, 100)`), so "each hit adds 100 to the
  score" is true of the internal score, not literally reflected in the
  reported (capped) aiScore. The ONLY human checkpoint in the whole pipeline
  is the topic-approval gate; the outline loop auto-proceeds to drafting on
  convergence with no human sign-off. If either loop hits its 5-round cap with
  gate findings still open, it stops and surfaces to Chad. (Fixed a stray
  "3-round" typo here 2026-07-15 — this sentence had not been updated when the
  round-cap correction above it was made; the cap is 5, not 3, same as the
  rest of this entry already said.)
- **Tone gate mandatory-trigger threshold re-confirmed 2026-07-12** via direct
  read of `.claude/skills/human-tone/eval/tone-grader.ts` and
  `.claude/skills/content-pipeline/SKILL.md` line 231: the mandatory-critical
  trigger is `banned > 0 OR aiScore >= 15`. **The threshold is 15, not 2.** A
  draft stating the AI-ness score "comes back above 2 out of 100" as the
  trigger is a wrong-fact gate finding — caught on the 2026-07-12
  `automate-blog-writing-with-ai-agents` rewrite. Correct phrasing: "scores 15
  or above out of 100" (or "clears a 15-point bar"). The `bannedHits.length *
  100` addition (tone-grader.ts line 152) is real and describes the internal
  pre-clamp score; the *reported* `aiScore` field is clamped to max 100
  (`Math.round(Math.min(score, 100))`, line 171) — phrasing like "each
  permabanned phrase adds 100 points, so a single hit is an automatic hard
  fail" is accurate as a description of the internal scoring mechanism, not a
  claim that the reported aiScore itself exceeds 100.

## `ai-automation-stack` (slug `2026-07-19-ai-automation-stack`) — draft-stage clean, verified through 2026-07-15
- Outline- and multiple draft-stage passes (2026-07-15) all found zero gate
  findings. Standing checks that keep holding: 12-stage list in order (source
  scan, topic-approval gate, SEO research, editorial brief, outline, outline
  review loop, draft, draft review loop, hero image, structured summary,
  assemble, commit — assemble/commit listed separately); topic approval +
  assembly + commit are the only three non-agent steps; outline loop 12
  reviewers/round cap 5, draft loop 15 reviewers/round cap 5; tone gate folded
  into the draft-review-loop beat (not its own stage), trigger `banned > 0 OR
  aiScore >= 15`, timing "start of every round and once more after the loop
  exits"; the "6 to 22, three-item lists" tone-gate anecdote is a real
  pipeline event, safe as "happened for real on this pipeline"; all four
  Ringly figures exact ($169.46B/$1.14T/31.4%/48%); 13-hours figure hedged
  correctly (no claim it's measured for a one-human team); model-tier claim
  exact (seo-researcher = only Opus, link-integrity-reviewer = only Haiku,
  rest Sonnet — "the other fourteen draft reviewers" arithmetic checks out);
  scheduler mechanics (daily-then-monthly, filename+link rewriting,
  self-coined "recompression," correctly uncited, correctly unlinked to the
  forward-dated 2026-07-20 scheduler post); scorecard learning-loop feed
  matches SKILL.md Step 10.5 verbatim (reconciles against the scheduling
  queue, never touches SEO research); measurement figures match
  `src/data/stats.json` (48 impressions, 1 click, ~24.2 avg position/mid-20s,
  50+ posts, pulled 2026-07-15); Zapier stat attributed as secondary via the
  solo-founders guide; Relay named inline, resolving the standing
  checkpoint-as-design-choice caveat; every internal link tense-checked
  against its target's real pubDate, no forward-dated past-tense claims.
- **Re-confirmed clean 2026-07-15 (this exact revision, full draft text)** —
  no new gate findings. Two standing elevations still un-adopted: (1) naming
  `impact`/`emotion`/`meta-content` reviewers explicitly in the "roster runs
  long" sentence, not just hook/voice/structure/SEO/fact/link-integrity, so
  the "fifteen" count is fully accounted for; (2) inlining "(v0.2.0)" in the
  package-swap paragraph body, not just the Sources footer, per the TD-0038
  entry below.
- **Re-confirmed clean AGAIN 2026-07-15 (later revision, full draft text)** —
  zero gate findings on the DRAFT-mode fact-checker pass. Elevation (1) above
  is now ADOPTED in this revision — the "roster runs long" sentence names
  "structural impact, emotional impact, meta-content" alongside hook/voice/
  structure/SEO/fact accuracy/link integrity. Elevation (2) (inline "(v0.2.0)"
  in the package-swap paragraph body) is still un-adopted — only remaining
  standing elevation for this post. New claim in this revision's CTA beat —
  "The fan-out bursts up to 15 agents at once per round" — confirmed accurate
  via direct read of `.claude/skills/content-pipeline/SKILL.md` line 240:
  "dispatch, in parallel, the 15 draft-mode reviewers" (the draft loop's 15 is
  the pipeline's largest single burst; the outline loop bursts 12). Nine-of-
  twelve-stages-are-agent-handled arithmetic (source scan, SEO research,
  editorial brief, outline, outline review loop, draft, draft review loop,
  hero image, structured summary = 9; topic approval + assembly + commit = 3
  orchestrator/human-owned) is exact and reads stronger than a vague "most."
- **TD-0038 swap** confirmed real via `.git/logs/HEAD` commit `4e445c1`
  "pipeline: swap onto agentic-content-pipeline v0.2.0 (TD-0038)" plus
  `content-pipeline.config.json` at the repo root pointing the package at this
  repo's own `docs/` path (nothing to migrate). Trust the commit graph over
  the ticket file's stale unchecked boxes. Safe to state "the pipeline now
  runs on the agentic-content-pipeline package" as present-tense fact, no
  "mid-swap" hedge, for posts publishing after 2026-07-15. Standing elevation:
  inlining "(v0.2.0)" in-body (not just the Sources footer) would give the
  swap claim a sharper anchor — still not adopted as of the 2026-07-15 draft.
- **Live stats.json (generated 2026-07-15)** — `searchConsole.impressions: 48`,
  `clicks: 1`, `position: 24.23`, 28-day window, 52 dated posts in
  `src/content/blog/`. Supersedes the older "15 to 20 impressions... three
  dozen posts" figure from the 2026-07-09 how-to-measure-blog-seo post — any
  post citing the blog's aggregate stats and linking `/stats/` should pull
  this live number, not reuse the 07-09 post's figure. Safe current framing:
  "~48 total impressions, 1 click, across 50+ posts" (round the post count,
  it keeps growing).
- **RANKING / GATHERING SIGNAL / NOT YET** are the canonical ALL-CAPS
  scorecard state names, confirmed verbatim in the 07-09 how-to-measure-blog-seo
  post; `dark-dashboard-design.md`'s lowercase "gathering signal" in its own
  narrative prose is a stylistic choice there, not a different state name.
- **Model-tier sweep** (exhaustive grep of every `.claude/agents/*.md` `model:`
  line, 33 files total): `seo-researcher` is the ONLY `model: opus` agent,
  `link-integrity-reviewer` the ONLY `model: haiku` agent, everything else
  `model: sonnet`. Safe as an absolute claim, not just "mostly."
- **Ringly 13-hours-per-person-per-week figure** confirmed verbatim on
  [ringly.io/blog/ai-automation-statistics-2026](https://ringly.io/blog/ai-automation-statistics-2026):
  "AI automation saves teams about 13 hours per person per week." Same page
  as the $169.46B/$1.14T/31.4%/48% figures.
- **aiforbusinessautomation.com solo-founders guide** confirmed on
  [aiforbusinessautomation.com/best-ai-tools-for-solo-founders](https://aiforbusinessautomation.com/best-ai-tools-for-solo-founders):
  narrow-vs-broad claim verbatim "Underdog tools with narrow, specific jobs
  outperform broad SaaS platforms for solo operators"; Zapier stat verbatim
  "9 in 10 small businesses are considering AI... yet fewer than 1 in 4 have
  deployed it consistently" (SECONDARY source for Zapier — attribute as
  "Zapier's research, via the solo-founders guide"). The
  deliberate-human-checkpoint line is specifically about Relay, one tool in
  the guide — naming Relay explicitly (as this post now does) is more precise
  than a generic "guidance for solo founders" paraphrase.
- **`agentic-content-pipeline` README "Cost" section** confirmed verbatim:
  "roughly 100-160 agent dispatches and several million tokens per post" at
  defaults. Install command `npx agentic-content-pipeline setup --harness
  claude` confirmed live in the README. `package.json` confirms `version:
  0.2.0` and the GitHub repo URL directly from repo metadata.
- **Re-confirmed clean AGAIN 2026-07-15 (DRAFT-mode fact-checker pass, "How I
  Built My AI Automation Stack" full rewrite title/body)** — zero gate
  findings. Every standing check above still holds verbatim in this revision:
  9-of-12-stages agent arithmetic, 12/15 reviewer counts with round cap 5,
  tone gate folded into the draft-review-loop beat (not its own stage) with
  15-or-above/banned>0 trigger, all four Ringly figures exact, 13-hours figure
  hedged, model-tier claim exact, scheduler mechanics + no forward link to the
  07-20 scheduler post, 48-impressions/1-click/mid-20s-position/50+-posts
  stats matching the 07-15 pull, Zapier stat attributed as secondary, Relay
  named, every internal link tense-checked clean. One wording variance noted,
  NOT a fact issue: this revision's "Scoring code has no ego about the prose
  it grades" (vs. the outline's protected verbatim "A regex has no ego...")
  is arguably MORE accurate — the tone gate is a scoring function
  (`tone-grader.ts` `scoreText`), not literally a single regex — so don't
  gate-flag this substitution on factual grounds; it's a voice/fidelity
  question for other reviewers, not fact-checking. Both standing elevations
  (inline "(v0.2.0)" + a Sources-footer entry for the release tag) remain
  un-adopted in this revision.

## `teaching-a-robot-to-balance-my-game` (slug `2026-07-23-teaching-a-robot-to-balance-my-game`) — game-balance facts, verified against the tower-defense repo 2026-07-16
- **sim:tune / sim:tune-fast / surrogate confirmed real** in `/Users/chadfurman/projects/tower-defense`:
  `tools/sim/tune.ts` (seeded mulberry32 random search + local hill-climb
  coordinate-descent refine, `--seed`/`--trials`/`--write` CLI, objective
  function `scoreObjective`), `tools/sim/tune-fast.ts` (surrogate-based, "microseconds
  per trial instead of minutes"), `tools/sim/surrogate/recurrence.ts`
  ("Surrogate prestige-loop recurrence model," `runSurrogateLoop` analytically
  mirrors the greedy bot's meta-loop with no ECS — this IS the prestige-loop
  surrogate the post describes). `pnpm check` running a sim matrix as a hard
  gate matches the 2026-06-16 build-log post's "`pnpm check` runs... a
  simulation matrix" line.
- **Three-bot roster confirmed real and exactly named**: `tools/sim/strategies/greedy-optimizer.ts`,
  `upgrade-heavy.ts`, `prestige-loop.ts` all exist as real distinct strategy
  files, and all three ARE in `CORE_STRATEGIES` (`strategies/index.ts`), the
  list `tools/sim/matrix.ts` runs under `pnpm check`'s `sim:matrix` gate — so
  "these three sit behind the hard gate" is accurate despite matrix.ts's own
  header comment listing a stale, different subset (doc drift on their side,
  not a post-fact issue). CAVEAT: the repo actually has ~11 named strategies
  total (also under-build, over-build, mixed-damage, meta-progression,
  deep-research, idle-only, all-dlc, start-at-wave-n) — spotlighting only
  these three as "the bots" is a legitimate editorial simplification, not a
  wrong-fact, but reads more precise as "three of the strategies."
- **`upgrade-heavy.ts` behavior — GATE-WORTHY, do not describe as "leveling
  towers."** Confirmed live 2026-07-16: TD-0047 (2026-06-13, code comment
  dated) deleted the per-entity upgrade-tower action from the whole game
  (`UPGRADE_DAMAGE_PER_LEVEL`, `UPGRADE_TRACK_COST_BASE`, `MAX_UPGRADE_LEVELS`
  all removed; `greedy-optimizer.ts` confirms the same removal — "placement-only
  for now"). `upgrade-heavy.ts`'s current `decide()` only places `pulse-turret`
  (cost 10) repeatedly ("saturate sectors with pulse turrets" per its own file
  header) — it does NOT level/upgrade any tower; that mechanic doesn't exist
  anywhere in the sim right now. A beat describing this bot as "leveling three
  or four towers instead of spreading wide" or "ignoring half the roster" is
  backwards (it ignores 5 of 6 tower kinds and stacks copies of the cheapest
  one — the opposite of concentrating levels into a few). Correct framing:
  "ignores the rest of the roster and stacks pulse turrets over and over
  instead of diversifying."
- **`sim:tune`'s `scoreObjective` (tune.ts) — exact scoring criteria, do not
  say "smooth difficulty curve" or "single strategy dominates."** Confirmed
  live 2026-07-16, three real components: (1) `clearScore` — does the deepest
  wave reached hit `CLEAR_WAVE=100`, plus a cycle-count sweet-spot bonus (3-5
  prestige cycles = `TARGET_MIN/MAX_CYCLES`) and a "too fast"/"too grindy"
  (`GRINDY_THRESHOLD=6`) penalty; (2) `monotoneScore` — rewards each prestige
  cycle reaching deeper than the last, penalizes regression; (3)
  `densityPenalty` — penalizes `decisionDensity` below `DENSITY_FLOOR=4`
  actions/min (an idle/passive strategy can't score well). There is no
  "does any single strategy dominate" term — `scoreObjective` scores ONE
  config's run (via `greedy-optimizer` + `meta-progression`), not a
  cross-strategy comparison; that dominance-detection concept belongs to the
  three-bot-disagreement mechanism (beat 3 / `sim:matrix`), not this function.
  Correct framing: "does the run clear a target depth without blowing through
  prestige cycles too fast or grinding too slow, does each loop dig deeper
  than the last, and does the bot stay actively engaged instead of idling."
- **HP_GROWTH constant — DATED, moves often, do not state a specific value as
  "current" without re-checking `packages/game-core-pack/src/domains/balance/config.ts`
  first.** Confirmed live value as of 2026-07-16: `HP_GROWTH: 1.08` (line 182).
  Full documented history (`.claude/agent-memory/enemies-expert/hp_scaling.md`):
  1.12 → 1.06 → 1.10 → T7 two-axis (1.08/1.65 level-boundary step) →
  economy-refactor single 1.11 → balance-tuning 1.11→1.08 ("loop bootstrap
  fix," 2026-05-30). **The 1.06→1.10 transition IS real** (confirmed in this
  history), but it is an OLD, superseded step — the live value moved on
  multiple times since and landed at 1.08 well before this post's 2026-07-23
  pubDate. A beat citing "HP_SCALING_BASE went 1.06 to 1.10" as the settled/
  current outcome of a specific playtest (no further hedge) misstates the
  game's current own balance constant — gate finding, caught at outline stage
  2026-07-16. Fix: either re-verify the specific pass against the live value
  before publishing, or explicitly frame it as "at the time" / a historical
  example rather than implying it's still live today. No corroborating
  worklog entry for the specific "Chad played to wave 40, called it butter"
  anecdote was found (searched `docs/worklog.md` for "wave 40" / "butter" —
  no hits) — the anecdote itself may be an undocumented conversation, which is
  fine, but the paired NUMBERS need to trace to the live config.
- **BOSS_ANGULAR_SPEED_DEG — also dated, halved TWICE, not once.** Confirmed
  live value as of 2026-07-16: `0.75` deg/tick (`config.ts` line 205, "480
  ticks/orbit... lumbering; ~8s/lap at 60fps"). Documented history: original
  `3` → halved to `1.5` (2026-06-02 worklog, "boss-orbit... playtest fix," a
  real Chad-driven "too fast to read" style fix) → halved AGAIN to `0.75` at
  some later point (undated in worklog, but confirmed current in `config.ts`).
  A post saying "boss orbit speed, halved" with no specific before/after
  numbers is SAFE either way (matches at least one of the two real halving
  events, and doesn't cite a number the current config contradicts) — do not
  gate this phrasing. Only gate the beat if it starts citing specific
  degree-per-tick numbers (e.g. "3 to 1.5") as if that's the current setting,
  since the live value has since moved again to 0.75.
- **TechBullion — "Use hybrid evaluation: agents flag suspicious traces, then
  humans verify and triage"** and **"Because agents can run thousands of
  sessions overnight, they find low-probability but high-impact issues before
  real players do"** — both confirmed verbatim 2026-07-16 on
  [techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game](https://techbullion.com/autonomous-playtesting-agents-let-ai-teach-you-how-players-will-break-your-game/)
  ("What will an AI find that humans often miss?" and "How to measure
  success" sections respectively). Safe to paraphrase loosely (not exact
  quote) without quote marks, as the pinned prior post does. Do NOT attribute
  this to "playtesting-agent research" broadly (one article, not a research
  consensus) — attribute to TechBullion specifically.
- **Game Developer — "especially good at finding bugs, game parameter tuning,
  player pass rate, and difficulty prediction in game levels"** — confirmed
  verbatim 2026-07-16 on
  [gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai](https://www.gamedeveloper.com/design/predicting-game-difficulty-and-engagement-using-ai).
  A post paraphrasing this as "AI agents are good at game parameter tuning
  and difficulty prediction" (dropping "bugs"/"player pass rate") is an
  accurate, non-misleading trim. CAVEAT (already flagged in this post's own
  outline gateGuidance, correctly): the source backs the tuning/prediction
  claim only — "compressing tuning that used to eat weeks into coffee-break
  time" is OUR first-person experience, not something to attribute to this
  source.
- **HP_SCALING_BASE hedge — CONFIRMED applied and now fully resolved (was an
  outline-stage gate finding, closed at draft, re-confirmed clean on the
  2026-07-16 DRAFT-mode pass of the full rewrite).** Current revision frames
  the pass as "in one early tuning pass," keeps the real 1.06→1.10 numbers,
  and adds "(The constant's since been renamed HP_GROWTH and re-tuned more
  than once, but that pass is the one that came from his hands instead of the
  sim.)" — this also adopts the standing elevation (naming the current
  `HP_GROWTH` name) that the prior draft revision had left open. Nothing left
  to flag here; don't re-open unless a future revision drops the hedge or the
  rename note.
- **Full-body DRAFT-mode fact-check, 2026-07-16 — zero gate findings.** Every
  standing check in this section holds verbatim in the current revision:
  upgrade-heavy correctly framed as "ignores the rest of the roster and
  stacks pulse turrets ... instead of diversifying" (not "leveling towers");
  `sim:tune`'s objective correctly framed as clear-depth/prestige-pacing/
  monotonic-depth/engagement, no invented "smooth difficulty curve" or
  "single strategy dominates" language; boss-orbit beat says "halved" with no
  specific degree numbers (safe); TechBullion's two claims (hybrid
  evaluation, overnight-sessions) attributed to TechBullion by name, not
  "research"; Game Developer citation trimmed to tuning/prediction only, with
  the coffee-break framing correctly kept first-person and unattributed to
  the source; PWA + "neon tower-defense" description confirmed against the
  2026-06-16 build-log post; the "unkillable tower" link target
  (2026-07-07-launch-day-bugs-only-showed-up-in-prod) does describe "the
  tower that quietly becomes unkillable three systems away" as something the
  gate catches, so the payoff-beat link is accurate, not just topically
  adjacent.
- **sim/tune-fast surrogate speed, confirmed**: `tools/sim/tune-fast.ts`
  runs "microseconds per trial instead of minutes" — usable as a concrete,
  sourced number for the surrogate beat instead of the vaguer "cheap math
  model... accurate enough."
- **TechBullion "suspicious traces like crashes and exploits" — CONFIRMED
  supported, not an invented elaboration.** Re-fetched 2026-07-16: the
  article's own examples of hybrid-evaluation traces are "reproducible
  crashes and balance exploits" — a draft paraphrasing the flagged traces as
  "crashes and exploits" is a safe, accurate compression, not an overreach.
  Re-verified full-body pass, same date, still zero gate findings on this
  post.

## Claims that need a live source (don't state as fact without one)
- Market stats (turnover cost, adoption %, download counts, audit findings).
- Third-party product behavior / pricing / model names (these date fast).
- Any "X% of Y" figure — must trace to a fetched, reachable source URL.

## Verified external claims (append as confirmed, with source)
- **Mid-level dev turnover cost ~$77k; senior dev $150k-$200k; SHRM 6-9 months
  salary rule** — confirmed verbatim on
  [betterway.dev/posts/how-to-calculate-turnover-cost-for-tech-teams](https://www.betterway.dev/posts/how-to-calculate-turnover-cost-for-tech-teams).
- **McKinsey: new developer takes 3-6 months to reach full productivity** —
  confirmed on betterway.dev, attributed there to "McKinsey & Company."
  CAVEAT: on the same page, the separate **"up to 40% productivity drop during
  transition"** figure is attributed to "labor statistics," NOT to McKinsey.
  Don't merge the two into one McKinsey-attributed sentence — cite them
  separately or attribute the 40% figure generically.
- **Work Institute: turnover costs ~33% of base pay** — confirmed on
  [workleap.com/blog/cost-of-employee-turnover](https://workleap.com/blog/cost-of-employee-turnover).
  CAVEAT: the source's own exclusion language is "without considering any lost
  productivity or engagement" — it does NOT say the figure excludes
  "institutional knowledge." Don't paraphrase this source's exclusion as
  institutional-knowledge-specific; that's an added claim the source doesn't make.
- **Agent-powered codebase Q&A pattern** (embeddings + code graphs + AST
  parsing, natural-language queries about where features live / how
  components interact, at repo scale) — confirmed on
  [agentic-patterns.com/patterns/agent-powered-codebase-qa-onboarding](https://agentic-patterns.com/patterns/agent-powered-codebase-qa-onboarding/).
- **"AI may answer these questions confidently and wrongly"** (re: "why"
  questions / design rationale not visible in code) — confirmed verbatim on
  [super-productivity.com/blog/ai-codebase-onboarding-guide](https://super-productivity.com/blog/ai-codebase-onboarding-guide/).
- **Cam Houser's LinkedIn post** (one-day-handoff / Claude-Code-on-departing-
  engineer's-laptop anecdote) — confirmed real, correctly attributed to Cam
  Houser, company kept anonymous in the source too. CAVEAT: exact
  reaction/comment counts drift — fetched 2026-07-11 showed 162
  reactions/73 comments, already different from whatever count a draft cites.
  Don't cite precise engagement counts as a fixed fact; hedge ("well over a
  hundred reactions") or drop the numbers.
- **Anthropic multi-agent research system — 90.2% figure** — confirmed
  verbatim on
  [anthropic.com/engineering/multi-agent-research-system](https://anthropic.com/engineering/multi-agent-research-system):
  "a multi-agent system with Claude Opus 4 as the lead agent and Claude Sonnet
  4 subagents outperformed single-agent Claude Opus 4 by 90.2% on our internal
  research eval." CAVEAT: the source's subagent-design guidance is FOUR
  elements — "an objective, an output format, guidance on the tools and
  sources to use, and clear task boundaries" — not three, and it does not
  specifically frame "boundaries" as "what it's NOT responsible for" (that's
  an added interpretation). Don't compress to "one objective + a hard
  boundary" as if quoting; keep all four elements or paraphrase looser.
- **Rankability 2026 AI-content/Google-ranking data — 83% figure** — confirmed
  on
  [rankability.com/data/does-google-penalize-ai-content](https://rankability.com/data/does-google-penalize-ai-content/):
  exact headline claim is "83% of Top Google Search Results Are Not Using
  AI-Generated Content" (i.e., score as human-written). Source also confirms
  Google's spam-policy language: "Using automation—including AI—to generate
  content with the primary purpose of manipulating ranking in search results
  is a violation of our spam policies" — policy targets intent to manipulate
  rank, not human-vs-AI authorship. Source itself flags this as "a directional
  study with a focused sample, not a definitive analysis."
- **Draft-loop reviewer roster (15) confirmed against
  `.claude/skills/content-pipeline/SKILL.md` Step 6**: `hook-reviewer`,
  `impact-reviewer`, `emotion-reviewer`, `flatness-reviewer`,
  `formulaic-reviewer`, `voice-reviewer`, `structure-reviewer`,
  `wordsmith-reviewer`, `grammar-reviewer`, `seo-reviewer`,
  `link-integrity-reviewer`, `link-opportunity-reviewer`, `fact-checker`,
  `bullshit-detector`, `meta-content-reviewer`. Outline-loop roster (12, Step
  4.6) is the same list minus `structure-reviewer`/`wordsmith-reviewer`/
  `grammar-reviewer`/`link-integrity-reviewer` plus `outline-structure-reviewer`.
  A post naming only a subset of these lenses (e.g. "hook, voice, flatness,
  formulaic tics, structure, wordsmithing, grammar, SEO, link integrity, link
  opportunity, facts, overclaims" = 12 named) while claiming "roughly fifteen"
  total isn't wrong, but reads stronger if it also names `impact`, `emotion`,
  and `meta-content` so the count is fully accounted for.
- **Anthropic four-elements quote re-confirmed 2026-07-12** via direct fetch of
  the "Teach the orchestrator how to delegate" section: verbatim list is "an
  objective," "an output format," "guidance on the tools and sources to use,"
  "clear task boundaries." Continue to flag any draft that renders the fourth
  element as "a boundary on what it is NOT responsible for" — that phrasing is
  an added interpretation not in the source; use "clear task boundaries" or a
  loose paraphrase, not that specific gloss.
- **Google Research agent-scaling primary source FOUND and confirmed live**
  (2026-07-12 re-check): the correct URL is
  [research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work](https://research.google/blog/towards-a-science-of-scaling-agent-systems-when-and-why-agent-systems-work/)
  — the shorter `.../towards-a-science-of-scaling-agent-systems/` (no
  "when-and-why-agent-systems-work" suffix) 404s; that was the wrong URL, not
  a dead page. Confirmed verbatim: "On parallelizable tasks like financial
  reasoning...centralized coordination improved performance by 80.9% over a
  single agent" and "On tasks requiring strict sequential reasoning (like
  planning in PlanCraft), every multi-agent variant we tested degraded
  performance by 39-70%." A draft citing "up to 81% gains" / "up to 70%
  degradation" and linking this full URL is directly supported — cite the
  primary alongside Augment Code's summary, no need to fall back to secondary-only.
- **Augment Code guide summarizing Google Research's agent-scaling study —
  81%/70% figures** — confirmed on
  [augmentcode.com/guides/single-agent-vs-multi-agent-ai](https://augmentcode.com/guides/single-agent-vs-multi-agent-ai):
  "Google Research's agent scaling study found multi-agent coordination
  delivers +81% improvement on parallelizable tasks but causes up to 70%
  degradation on sequential ones" (elsewhere on the page: "39-70% performance
  degradation for multi-agent variants on strict sequential reasoning
  tasks"). This is a SECONDARY source citing Google Research's "Towards a
  Science of Scaling Agent Systems" — fine to cite directly, but linking
  Google's original post too would be stronger.
  **CAVEAT:** the degradation figure is a RANGE (39-70%), not a fixed number —
  a draft stating flat "70% degradation" (no "up to") overstates precision;
  require "up to 70%" or "39-70%" framing.
- **Anthropic multi-agent research system — 15x token-cost figure** —
  confirmed verbatim 2026-07-12 via direct fetch: "agents typically use about
  4× more tokens than chat interactions, and multi-agent systems use about
  15× more tokens than chats." A draft citing "~15x the tokens of a single
  chat call" is accurately supported.
- **Internal cross-post links must respect publish-date ORDER.** A post
  claiming "I've already written about X" / "I wrote about this before" and
  linking to another of our posts is a factual claim about our own timeline —
  check the target post's actual `pubDate` in `src/content/blog/`. If the
  target's pubDate is AFTER the citing post's pubDate, the past-tense claim is
  false regardless of how good the content match is. Caught on the
  2026-07-12 rewrite of `automate-blog-writing-with-ai-agents` (pubDate
  2026-07-13): it claimed "written before" / "already written" while linking
  to `hired-a-team-of-specialists` (pubDate 2026-07-21) and
  `which-claude-model-to-use` (pubDate 2026-07-18), both scheduled AFTER it.
  A forward link with no past-tense claim (e.g. "this pipeline is one piece
  of a bigger stack, see X") is a lesser link-integrity/scheduling risk, not a
  fact-accuracy violation — only the false-tense claim is a gate finding here.
  **Recurrence caught 2026-07-12 (later revision of the same rewrite):** the
  `hired-a-team-of-specialists` (2026-07-21) link had been fixed to future
  tense ("I'll dig into this... in a companion post"), and the
  `which-claude-model-to-use` (2026-07-18) link uses neutral present tense
  ("here's the routing logic") — both fine now. But a NEW past-tense claim
  appeared on the scheduler link: "Scheduling — [I built a small scheduler for
  that](/blog/2026-07-20-automate-blog-publishing-schedule/)" — that target
  publishes 2026-07-20, a week after this post's 2026-07-13 pubDate. Same bug,
  different link. Check EVERY internal link in a draft for past-tense framing
  against its target's real pubDate, not just the ones flagged in a prior pass
  — fixing one instance doesn't mean a later draft revision won't reintroduce
  the same mistake on a different link.
  **Recurrence AGAIN caught 2026-07-12 (yet another revision):** both fixes
  above regressed — the draft reverted to "[I've written about this
  narrow-beats-generalist idea before](.../2026-07-21-hired-a-team-of-specialists/)"
  and "I've already written about how those calls don't all run on the same
  model, [...](.../2026-07-18-which-claude-model-to-use/)" — both past tense
  again, both targets still dated after this post's 2026-07-13 pubDate. This
  post (`automate-blog-writing-with-ai-agents`) has now regressed on this
  exact bug at least three separate times across drafter revisions. Treat it
  as a standing landmine specific to this post's link set: on every future
  pass, explicitly re-check the tense on the `hired-a-team-of-specialists` and
  `which-claude-model-to-use` links even if a prior round already fixed them.
  **2026-07-12, later revision: bug NOT present** — that pass used "I'll dig
  into this... in a companion post" (future tense) for `hired-a-team-of-specialists`
  and "here's the routing logic, if you want it" (neutral present) for
  `which-claude-model-to-use`, and framed the `ai-automation-stack` (2026-07-19)
  link with no past-tense claim at all. Confirms the fix holds when applied —
  keep checking every revision anyway, since it has regressed from a fixed
  state before.

- **Google spam-policy "automation—including AI" quote does NOT appear
  verbatim on Google's own live page** — checked 2026-07-12 via direct fetch
  of
  [developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies)
  (three separate targeted searches: for "automation", for "primary
  purpose"+"manipulating", and for an "automatically-generated content"
  section). The sentence **"Using automation—including AI—to generate content
  with the primary purpose of manipulating ranking in search results is a
  violation of our spam policies"** — which
  [rankability.com/data/does-google-penalize-ai-content](https://rankability.com/data/does-google-penalize-ai-content/)
  presents as an exact Google quote — is NOT present on the current live
  Google page. The word "automation" only appears there re: automated link
  creation (link spam), unrelated to AI/content. The live page's actual
  closest language is split across two separate statements: "Scaled content
  abuse is when many pages are generated for the primary purpose of
  manipulating search rankings and not helping users" and (same section)
  "Using generative AI tools or other similar tools to generate many pages
  without adding value for users." **A draft that cites
  developers.google.com/search/docs/essentials/spam-policies directly as the
  source for the "automation—including AI" sentence is misattributing an
  unsupported claim to a source that doesn't contain it** — even though the
  Rankability page does contain it. Fix: either attribute that exact
  phrasing to Rankability's summary (not to Google's page directly), or
  rewrite the claim to match Google's actual live wording ("pages generated
  for the primary purpose of manipulating search rankings," separately noting
  generative AI tools are named in the same policy section) and cite Google's
  page for that instead. Re-check this every time a draft cites Google's spam
  policy directly — the live page's wording may keep changing, and
  Rankability's rendering of it may not track those changes.
- **Google spam-policy page re-checked live 2026-07-12 (again) — unchanged.**
  Live page still reads exactly: "Scaled content abuse is when many pages are
  generated for the primary purpose of manipulating search rankings and not
  helping users" and "Using generative AI tools or other similar tools to
  generate many pages without adding value for users." No "automation—
  including AI" sentence present. A draft of `automate-blog-writing-with-ai-agents`
  reviewed 2026-07-12 correctly paraphrased this (no quote marks, matches live
  wording, doesn't cite the disputed Rankability-only sentence as if it were on
  Google's page) — this is the FIX pattern to require going forward: paraphrase
  without quotation marks, don't attribute the "automation—including AI" exact
  sentence to Google's own page.
- **Addy Osmani — "three to five teammates" sweet spot + linear token cost** —
  confirmed verbatim on
  [addyosmani.com/blog/code-agent-orchestra](https://addyosmani.com/blog/code-agent-orchestra/):
  "Three to five teammates is the sweet spot. Token costs scale linearly, and
  three focused teammates consistently outperform five scattered ones." Also
  stated standalone under "Agent Teams: key takeaways" as "Token costs scale
  linearly with team size." Safe to cite both the team-size and linear-cost
  claims from this one source.
- **2026-07-13 outline-stage rewrite of `automate-blog-writing-with-ai-agents`
  — caught two gate findings.** (1) An outline paragraph titled the pipeline
  "eleven stages" and folded "assemble" + "commit" into one list item
  ("assemble-and-commit"). Per the standing 12-stage canonical list above
  (assemble and commit are two separate numbered steps, 10 and 12, in
  `.claude/skills/content-pipeline/SKILL.md`), any post-level stage count and
  list must say **twelve**, with assemble and commit listed as separate
  items — "eleven" combining them is a miscount, not a valid alternate
  grouping. (2) An outline fact rendered the Anthropic subagent-design
  guidance as "each subagent gets one objective and a hard boundary around
  it" and framed it with "because" as if quoting the source's own reasoning.
  This is the exact bad compression already flagged above (source's real list
  is FOUR elements: an objective, an output format, guidance on tools/sources,
  and clear task boundaries) — two-element compressions phrased as causal
  ("because...") keep recurring across drafts of this specific post. Watch
  for this pattern specifically on `automate-blog-writing-with-ai-agents` —
  it's regressed on both the link-tense bug (see above) and this
  four-elements compression across multiple revisions.
- **Addy Osmani — "1 reviewer per 3-4 builders" is a SEPARATE point from the
  "three focused teammates outperform five scattered" quote, not its cause.**
  Re-checked 2026-07-13 on
  [addyosmani.com/blog/code-agent-orchestra](https://addyosmani.com/blog/code-agent-orchestra/):
  both appear in the same "Pro-tips for Agent Teams: reliability" section but
  as parallel, independently-stated bullets — "Right-size your team - 3-5
  teammates is the sweet spot. Token costs scale linearly with team size" is
  one bullet; the reviewer-spawn recipe ("Tools: lint, test, security-scan
  only... Ratio: 1 reviewer per 3-4 builders") is a different bullet later in
  the same section. The post never frames the reviewer ratio as following
  FROM the "three focused teammates consistently outperform five scattered
  ones" line. A draft that stitches them together with "because ... " (as if
  Osmani gives that quote as the reviewer ratio's justification) misattributes
  reasoning the source doesn't state — same bad pattern as the earlier
  "four-elements causal because" issue. Caught on the 2026-07-13 outline-stage
  review of `automate-blog-writing-with-ai-agents`; keep two claims separate,
  no causal "because" bridging them.
- **Anthropic "breadth-first queries" quote confirmed verbatim** (2026-07-13)
  on
  [anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system):
  "Our internal evaluations show that multi-agent research systems excel
  especially for breadth-first queries that involve pursuing multiple
  independent directions simultaneously." Safe to paraphrase (not exact-quote)
  as "excels at breadth-first queries that parallelize cleanly."
- **marketplace.buildaloud.ai audit disclaimer confirmed verbatim** (2026-07-13):
  "Audits are AI-generated and may contain errors. Always review skills
  yourself before use." Safe to cite as "the marketplace is upfront that
  audits are AI-generated and can miss things, so check a skill yourself
  before installing."
- **Optional LLM judge pass (draft review loop) confirmed** via
  `.claude/skills/content-pipeline/SKILL.md` (~line 235): calls `judgeText`
  (`.claude/skills/human-tone/eval/judge.ts`) for an `emotion_impact` +
  formulaic-crutch density signal handed to synthesis; if `runJudgePass`
  returns `null` the judge signal is simply absent for that run — "the
  deterministic [tone-gate] floor from step 1 is the hard floor regardless of
  judge availability." A draft describing this judge pass as optional /
  non-blocking, on top of the deterministic tone gate, is accurate.
- **Disposition classifier confirmed**: `lib/review-disposition.ts`'s
  `classifyDisposition` function is the single source of truth synthesis uses
  to sort every reviewer finding into gate / auto-apply / advisory (SKILL.md
  Step 4.6, ~line 176-178); hook findings default to advisory unless
  missing/broken, which escalates them to gate. A draft describing "a
  deterministic classifier sorts every finding into gate, auto-apply, or
  advisory" is accurate.
- **Pre-redesign review layer was "few-generalist," NOT a single one-pass
  agent** — confirmed 2026-07-13 via direct read of
  `docs/specs/2026-07-12-document-review-fanout-design.md`. Before the
  outline+draft fan-out redesign, the pipeline already ran MULTIPLE separate
  reviewing agents: a generalist `content-reviewer` (voice+SEO+marketing at
  once, later repurposed into `synthesis`), `section-impact-reviewer` (→
  `impact-reviewer`), `link-checker` (→ `link-integrity-reviewer`),
  `fact-checker` (schema-migrated, reused as-is), `bullshit-detector`
  (reused as-is), plus `judge.ts` (an LLM tone judge that existed but wasn't
  wired into the gate). That's at least 5-6 distinct reviewing mechanisms, not
  "one pass — a single fresh agent reading the draft cold for facts, links,
  and safety, all at once." A draft claiming the pre-redesign pipeline was a
  single one-pass agent is a wrong-fact gate finding — caught on the
  2026-07-13 draft-stage review of `automate-blog-writing-with-ai-agents`.
  Correct framing: "a handful of generalist passes" or name the actual prior
  agents (content-reviewer doing voice+SEO+marketing, plus separate
  fact-checking and link-checking).
- **Tone gate run-timing confirmed exact wording** — `SKILL.md` line 227-228:
  "Run before the first round and again after every edit pass, on the single
  current draft (never the whole corpus)." A draft saying the tone gate "runs
  before the first review round and again after every single edit" is
  accurate.
- **Draft-mode reviewer model tiers confirmed 2026-07-13** via direct grep of
  `model:` frontmatter across every file in `.claude/agents/`: all 15
  draft-mode reviewers run on `model: sonnet` EXCEPT `link-integrity-reviewer`,
  which runs on `model: haiku`. (`seo-researcher` also runs on `model: opus`,
  but that's Step 3 SEO research, not one of the 15 draft-mode reviewers.) A
  draft claiming "not every one of those fifteen calls runs on the same model
  tier" is accurate — link-integrity-reviewer is the one outlier on haiku.
- **New regression 2026-07-13 (draft-review pass): "three generalist passes"
  miscount.** A revision of `automate-blog-writing-with-ai-agents` stated "The
  first version of this pipeline ran review as three generalist passes, not
  fifteen: one content reviewer covering voice, SEO, marketing, plus separate
  fact-checking and link-checking bolted on next to the content reviewer."
  This asserts an exact count ("three") and calls fact-checking/link-checking
  "generalist" — both wrong per the standing entry above: the pre-redesign
  layer was 5-6 distinct mechanisms (content-reviewer generalist,
  section-impact-reviewer, link-checker, fact-checker, bullshit-detector, plus
  judge.ts), and fact-checking/link-checking were already NARROW/specific, not
  generalist, before the redesign. Earlier "clean pass" entries below approved
  naming three agents (content-reviewer, fact-checking, link-checking) as a
  loose, non-exhaustive illustration — they did NOT approve quantifying it as
  "three generalist passes" total. **New rule going forward: flag any draft
  that gives an exact number for the pre-redesign review layer, or that
  labels fact-checking/link-checking as "generalist."** Safe framing: "a
  handful of separate passes... one generalist content reviewer covering
  voice, SEO, and marketing, plus already-narrow fact-checking, link-checking,
  and impact review bolted on next to it" (no exact count, no
  mischaracterizing the narrow reviewers as generalist).
- **No separate "tone gate" pipeline stage exists — it's embedded inside the
  Draft Review Loop (Step 6), not a distinct step between the draft loop and
  hero image.** Confirmed via direct read of
  `.claude/skills/content-pipeline/SKILL.md` lines 220-301: the numbered
  stages jump straight from "6. Draft Review Loop" to "8. Hero Image" (no
  step 7). The deterministic tone gate runs "before the first round and again
  after every edit pass" INSIDE the draft loop, plus a mandatory final
  re-score after the loop exits (with a tone-only de-tell cleanup pass, capped
  at 2 attempts, if it regressed) — confirmed verbatim: "the loop's last edit
  is otherwise unmeasured... after the loop exits, run scoreText ONE more
  time on the final draft... dispatch a Sonnet tone-only de-tell pass... cap
  at 2 de-tell passes." A draft/outline listing "deterministic tone gate" as
  its own item in an ordered stage list (separate from "draft review loop")
  is a wrong-fact gate finding — fold it into the draft-review-loop item
  instead ("the draft review loop, which runs the tone gate at the start of
  each round and once more after it exits"). Caught at OUTLINE stage
  2026-07-13 on `automate-blog-writing-with-ai-agents` — also confirms the
  "final tone re-score + de-tell cleanup pass" claim itself IS accurate when a
  draft/outline states it (don't flag that part).
- **"single review pass" / "one cold reader" pre-redesign mischaracterization
  recurred again, this time at OUTLINE stage** (2026-07-13,
  `automate-blog-writing-with-ai-agents`). An outline paragraph's `ourTake`
  asserted "'the review pass' is no longer one cold reader" and its `facts`
  bullet asserted the pipeline "replaces the single review pass" — both
  state the PRE-redesign system was literally one lone reviewer, which the
  standing entry below already disproves (5-6 distinct mechanisms:
  generalist content-reviewer, section-impact-reviewer, link-checker,
  fact-checker, bullshit-detector, plus non-wired judge.ts). This is the same
  landmine as the "three generalist passes" miscount, now showing up one
  level upstream at outline-authoring time, before it even reaches a draft.
  Watch for "single review pass" / "one cold reader" / "one generalist" as a
  totalizing claim (not hedged as "a handful of separate passes") on every
  future outline AND draft pass of this post.
- **Anthropic four-elements bad gloss ("boundary on what it is NOT
  responsible for") recurred again at OUTLINE stage** (2026-07-13,
  `automate-blog-writing-with-ai-agents`, paragraph on the 90.2% claim) — both
  the `facts` bullet and the `intendedBeat` used "clear boundaries on what it
  is not responsible for" / "a hard boundary on what it's not responsible
  for." Re-confirmed against the source (see entries above): the source says
  "clear task boundaries," no "not responsible for" framing. Same recurring
  bug, now caught one stage earlier than usual (outline, not draft) — worth
  flagging at outline review every time this post's Anthropic beat appears,
  since it has now surfaced at both outline and draft stages across
  revisions.
- **"Skill" vs "agent" terminology — pipeline stages/reviewers are AGENTS
  (`.claude/agents/*.md`, dispatched via the Agent tool), not "skills" in the
  Claude Code Skills sense (`.claude/skills/*/SKILL.md`).** Only two true
  skills exist in this pipeline: the `content-pipeline` orchestrator skill
  itself, and the `human-tone` skill (tone-grader/judge). The drafter, all
  outline/draft reviewers, seo-researcher, synthesis, etc. are all agents. The
  Skills Marketplace (marketplace.buildaloud.ai) specifically audits
  third-party Claude Code **Skills** — a different construct. A post claiming
  "every pipeline stage is implemented as a narrow, single-purpose skill" (to
  set up a parallel with the Skills Marketplace CTA) conflates the two and is
  a wrong-fact gate finding — correct as "agent," dispatched via the Agent
  tool. Caught on the 2026-07-13 outline-stage review of
  `automate-blog-writing-with-ai-agents` (CTA beat), where `ourTake` correctly
  said "agents" but the paired `facts` bullet said "skill" — an internal
  inconsistency as well as a conflation.
- **`automate-blog-writing-with-ai-agents` rewrite — second clean pass
  confirmed 2026-07-13.** A further revision (draft-stage review, same slug,
  pubDate 2026-07-13) added the model-tier claim above (verified true) and
  otherwise held every previously-fixed landmine: 12-stage list correct and in
  order (assemble/commit separate), 15-reviewer roster fully named, four
  Anthropic elements listed without causal compression, Osmani's two points
  kept separate with no misattributed "because," Google 80.9%/"up to 70%"
  framing correct, no verbatim quote marks around any paraphrased source, and
  every internal cross-post link tense-checked correctly against real
  pubDates (hired-a-team-of-specialists and make-ai-writing-sound-human both
  fine). One gap noted but NOT a fact-accuracy issue (routed to
  link-integrity/link-opportunity instead): the outline called for
  which-claude-model-to-use and ai-automation-stack links in the body +
  Sources footer, but neither appears in this revision's rendered prose or
  footer.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage clean pass
  confirmed 2026-07-13** (this revision, after the two gate findings caught
  earlier the same day were fixed). Checked against every standing landmine
  for this post and found none present: 12-stage list correct order with
  assemble/commit as separate items; tone gate folded into the draft-review-
  loop item, not listed separately; all 15 draft-mode reviewers named
  (including `impact`/`emotion`/`meta-content`, framed as "structural impact"
  / "emotional impact" to distinguish the two); model-tier claim (all 15 on
  sonnet except link-integrity on haiku) correct; Anthropic 90.2% + all four
  subagent elements quoted without the "NOT responsible for" gloss or a
  causal "because" tying them to 90.2%; Google Research 80.9%/"39-70%" and
  Augment's "+81%/up to 70%" both framed as ranges, both cited; Rankability
  83% kept with the "directional" caveat; Google spam-policy paraphrase
  matches the live page with no misattributed quote marks; the "earlier
  version of this post" correction beat correctly separates "what an earlier
  draft of this post said" from "what the pre-redesign system actually was"
  and doesn't call the pre-redesign layer a single pass; CTA beat correctly
  uses "agent" for pipeline stages and "skill" for Skills Marketplace
  listings (no conflation); every internal link's tense checked against real
  pubDate (how-to-measure-blog-seo 07-09, can-an-ai-run-a-business 07-09,
  make-ai-writing-sound-human 07-12, skill-md-is-a-file-written-for-agents
  02-23, we-let-haiku-do-the-audits-it-missed-things 02-23 — all predate this
  post's 07-13 pubDate, past tense fine; which-claude-model-to-use 07-18 uses
  neutral present tense, hired-a-team-of-specialists 07-21 uses future tense
  — both correct, this post's known regression pattern is NOT present in this
  revision). No fact-checking gate findings this pass.
- **`we-let-haiku-do-the-audits-it-missed-things` (pubDate 2026-02-23,
  slug-dated 2026-02-22) confirmed as a source for the Skills Marketplace
  Haiku/Sonnet audit story** — verified by direct read: Haiku scored the
  `taskmaster` skill 1.75 exposure / 1 finding and missed a persistent
  backdoor shim at `~/.codex/bin/codex`; Sonnet scored it 5.65 / 4 findings
  and caught the backdoor plus a prompt-injection compliance prompt. Chad's
  quoted call: "hmm fine let's update the skill to require sonnet then" —
  every marketplace audit since runs Sonnet, no exceptions. Safe to cite as
  "Haiku missed a backdoor Sonnet caught, so every audit there moved to
  Sonnet, no exceptions" (predates any post after 2026-02-24, so past tense
  is correct in later posts).
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage clean pass
  confirmed again 2026-07-13** (this revision, which adds the
  `we-let-haiku-do-the-audits-it-missed-things` cross-post analogy to the
  "one axis per reviewer" beat). Re-checked every standing landmine for this
  post: 12-stage list correct order with assemble/commit separate and the
  gateGuidance explicitly scoping out the scoring/bookkeeping/learning steps
  that also run in that stretch (10.5, 11, 11.5, 11.7 per SKILL.md) as
  uncounted padding, not a miscount; outline-loop reviewer count is 12
  (matches SKILL.md Step 4.6's named roster exactly) with round cap 5;
  draft-loop reviewer count is 15 with round cap 5, tone gate correctly
  folded into the draft-review-loop beat (not a separate stage); tone-gate
  threshold "15 or above out of 100," banned-phrase-adds-100-to-internal-score
  framed as the internal mechanism; Anthropic 90.2% + all four elements
  correct, no causal "because"; Google Research 39-70% degradation range and
  Rankability 83%-with-directional-caveat both correct; Google spam-policy
  paraphrase matches the live page with no misattributed quote; Skills
  Marketplace description (audited third-party skills, AST-1.0 taxonomy,
  "audits are AI-generated... review yourself" disclaimer) matches
  `src/data/projects.ts` and the prior verified disclaimer text; every
  internal link's tense checked against its real pubDate —
  `which-claude-model-to-use` (07-18, neutral present "here's the routing
  logic, if you want it"), `hired-a-team-of-specialists` (07-21, future "I'll
  dig into... in a companion post"), and the newly-added
  `we-let-haiku-do-the-audits-it-missed-things` (predates, past tense
  "learned that lesson") were all correct — the post's known three-time
  link-tense regression is NOT present in this revision. No fact-checking
  gate findings this pass.
- **Anthropic "spawning 50 subagents for simple queries" quote confirmed
  verbatim** (2026-07-13) on
  [anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system):
  "Early agents made errors like spawning 50 subagents for simple queries,
  scouring the web endlessly for nonexistent sources, and distracting each
  other with excessive updates." Safe to quote verbatim as the counterweight
  to the 80.9%/15x-tokens beat (the failure mode fan-out can hit if scoped
  wrong). Same source page as the 90.2% and 4x/15x token figures already
  verified above.
- **security-kit's six named sub-agents, exact names + order, confirmed via
  direct fetch of [github.com/chadfurman/security-kit](https://github.com/chadfurman/security-kit)
  2026-07-16**: `surface-mapper` (attack-surface/assets/boundaries),
  `untrusted-input-tracer` (traces untrusted data through the codebase) — both
  run in parallel during Recon (phase 1) — then `threat-modeler` (synthesizes
  recon into a ranked threat picture, phase 2, BEFORE the hunt) — then
  `vuln-hunter` (parallel per taxonomy cluster, phase 3) — `fp-judge` (keeps
  only findings scoring 8/10+ exploitability, phase 4) — `mitigation-planner`
  (fix strategies, phase 5). A draft naming a sixth lane as a closing
  "synthesis pass that assembles what survived" (i.e., placed AFTER
  mitigation-planner) is a wrong-fact gate finding — the real sixth agent is
  `threat-modeler`, and it runs early (right after recon, before the hunt),
  not as a final step. The 2026-07-10 blog post
  (`2026-07-10-claude-security-team-that-remembers.md`) names 5 of the 6
  explicitly in prose (surface-mapper, untrusted-input-tracer, vuln-hunter,
  fp-judge, mitigation-planner) and only says "Six specialized sub-agents" —
  `threat-modeler` is the unnamed sixth; the GitHub repo is the source that
  names it. Caught on the 2026-07-16 outline-stage review of
  `hired-a-team-of-specialists`.
- **Addy Osmani — "writes significantly better database code" quote, exact
  wording confirmed 2026-07-16** via direct fetch of
  [addyosmani.com/blog/code-agent-orchestra](https://addyosmani.com/blog/code-agent-orchestra/):
  "A focused agent that only handles the data layer writes **significantly**
  better database code than **a generalist** juggling your entire codebase."
  A draft dropping "significantly" or swapping "a generalist" for "one" inside
  quote marks is a verbatim-quote violation — same standing "quotes must be
  verbatim" caution. Separately confirmed on the same page: "The bottleneck is
  no longer generation. It's verification." (safe to quote the back half
  alone, as several drafts already do) and the single-agent-doing-everything
  example is FOUR areas — "One agent doing everything - data layer, API, UI,
  tests - is a jack of all trades and master of none" (not three, not five).
- **AI21 "its own isolated execution environment" quote re-confirmed
  2026-07-16** via direct fetch of
  [ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution](https://www.ai21.com/glossary/ai-agent/what-is-parallel-subagent-execution/):
  "A parent agent or orchestration framework receives a task and decomposes it
  into multiple independent strategies or attempts... Each strategy is
  assigned to a subagent, which is given its own isolated execution
  environment so that its actions do not interfere with those of other
  subagents running concurrently." Synthesis step confirmed too: "a comparison
  step evaluates the outputs against defined criteria such as correctness,
  test pass rate, or efficiency. The winning approach is merged into the
  shared environment, and the losing workspaces are discarded." Safe to cite
  and paraphrase as-is.
- **Tower Defense game roster — monetization guard is described as "one of
  those specialists," separate from (not one of) the six named lanes
  (combat balance, economy, towers, enemies, idle/echo, research).** Confirmed
  via direct read of
  `src/content/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks.md`:
  the six-lane list appears in one paragraph ("one for combat balance, one for
  the economy, one for towers, one for enemies, one for the idle/echo
  mechanics, one just for research"), and the monetization guard gets its own
  separate paragraph immediately after ("One of those specialists is a
  monetization guard whose entire job is to veto pay-to-win. It gets a vote on
  anything that touches the store or the economy."). A draft describing the
  monetization agent as "sitting off to the side" from the six lanes (rather
  than as a numbered seventh lane) matches the source's own structure. Also
  confirmed verbatim from the same post, safe to quote: "Here's candidate A,
  B, C, D. Here's the tradeoff on each. Chad picks." — do not paraphrase this
  inside quote marks (e.g. "Four options, A through D... you pick" is NOT
  verbatim).
- **NOT every pipeline stage is agent-dispatched — some are orchestrator-owned
  direct actions.** Confirmed via direct read of `.claude/skills/content-
  pipeline/SKILL.md`: Step 10 Assemble is explicit — "The orchestrator writes
  the final post file. Subagents do not set frontmatter." Step 11 Bookkeeping
  and Step 12 Build and Commit run scripts/bash commands directly by the
  orchestrator, not a dispatched agent. Step 2's topic-approval gate is a
  human (Chad) decision point, not an agent. A post claiming "every pipeline
  stage is implemented as a narrow, single-purpose agent, dispatched via the
  Agent tool" overstates this — correct framing scopes the agent claim to the
  drafting/review/generation stages specifically (research, brief, outline,
  outline reviewers, drafter, draft reviewers, synthesis, hero-image
  generation via codex, summary/digest, blog-learner) and says the
  orchestrator itself handles topic approval, assembly, scheduling, and the
  final commit directly. Caught on the 2026-07-13 outline-stage review of
  `automate-blog-writing-with-ai-agents` (CTA beat, order 11) — gate finding.
- **`agentic-content-pipeline` README confirmed 2026-07-16 (fan-out
  warning + dashboard advice, on top of the already-verified 100-160
  dispatches figure)**: exact wording is "expect on the order of 100-160
  agent dispatches and several million tokens per post," "The fan-out also
  bursts up to 15 agents at once per round," "Run one post and check your
  usage dashboard before queueing many," and "mind your provider's rate
  limits." Safe to attribute the fan-out-burst warning and the
  dashboard/rate-limit advice directly to the README, not just to SKILL.md.
- **`hired-a-team-of-specialists` (slug 2026-07-21) — OUTLINE-stage first
  pass, 2026-07-16.** Two gate findings: (1) beat 2's gateGuidance claimed
  "the source enumerates five" concerns for Osmani's single-agent-ceiling
  example — re-fetched 2026-07-16, Osmani's example is FOUR areas (data
  layer, API, UI, tests), not five; the game's illustrative five-concern list
  (economy/combat/visuals/save-schema/monetization) is Scout's own, unrelated
  to Osmani's count — don't let the two blend. (2) beat 9 attributes the
  "~15x tokens of a single chat call" figure to Anthropic's own multi-agent
  research system but the beat's `sources` array only lists Osmani and the
  agentic-content-pipeline repo — no Anthropic URL — add
  https://www.anthropic.com/engineering/multi-agent-research-system.
  Everything else in this outline checked clean: security-kit six-lane order
  (surface-mapper → untrusted-input-tracer → threat-modeler → vuln-hunter →
  fp-judge → mitigation-planner) correct and matches the six-lane order
  already in the ledger; tower-defense roster (idle/echo, research, economy,
  combat balance, towers, enemies + monetization "off to the side") matches
  the source post; every quote (Osmani "significantly better database code,"
  Osmani "bottleneck... verification," AI21 "its own isolated execution
  environment," game's "candidate A, B, C, D... Chad picks," Osmani
  "three to five teammates"/"linear" token-cost) verbatim against source.
- **`hired-a-team-of-specialists` (slug 2026-07-21) — OUTLINE-stage re-check
  2026-07-16, revision after the two 2026-07-16 gate findings above were
  fixed.** Both confirmed fixed: (1) beat 2's gateGuidance now correctly
  separates Osmani's own four-area example (data layer, API, UI, tests) from
  Scout's own five-concern game illustration (economy, combat, visuals, save
  schema, monetization) — no blending. (2) beat 9's sources array now
  includes `https://www.anthropic.com/engineering/multi-agent-research-system`
  alongside Osmani and the agentic-content-pipeline repo, correctly sourcing
  the "~15x tokens" figure. Zero new gate findings this pass — every quote
  re-checked verbatim against source (Osmani "significantly better database
  code... a generalist," Osmani "is no longer generation. It's verification,"
  Osmani "Three to five teammates is the sweet spot," Osmani "Token costs
  scale linearly with team size" as a separate standalone statement — not
  bridged with "because" — AI21 "its own isolated execution environment,"
  game's "Here's candidate A, B, C, D. Here's the tradeoff on each. Chad
  picks."); security-kit six-lane order (surface-mapper →
  untrusted-input-tracer → threat-modeler → vuln-hunter → fp-judge →
  mitigation-planner) correct; tower-defense six-lane roster + monetization
  "off to the side" correct; pipeline counts exact (12 outline reviewers/round
  cap 5, 15 draft reviewers/round cap 5, tone-gate threshold 15, single human
  checkpoint = topic approval, "now runs as" present-tense package framing
  correct for a post publishing after 2026-07-15); every internal link's
  tense checked against real pubDate, all correct. **New source confirmed
  this pass:** `https://docs.claude.com/en/docs/claude-code/sub-agents` (cited
  in beat 1) 301-redirects to the canonical
  `https://code.claude.com/docs/en/sub-agents`, which does describe subagents
  as a built-in Claude Code feature ("Subagents are specialized AI assistants
  that handle specific types of tasks... Each subagent runs in its own
  context window...") — supports the "ships with the harness, nothing to buy"
  claim; the redirect resolves fine (not dead), but the canonical URL is
  sharper for future citations of this exact page.
- **Skills Marketplace scoring-model history: the pre-AST-v1.0 model was
  TWO categorical labels, not "a blunt danger label" (singular).** Confirmed
  via direct read of
  `src/content/blog/2026-02-22-we-rewrote-the-security-scoring-here-s-why.md`:
  "every audited skill had two ratings: Malicious Intent (none / suspicious /
  detected) and Danger Level (low / medium / high / critical)" — the post's
  own summary calls it "the two-axis danger model." AST v1.0 replaced it with
  three numeric scores (malicious intent, inherent capability, misuse
  surface) rolled into one Overall Exposure number. A draft/outline
  describing the prior model as "a blunt danger label" undercounts it —
  correct framing is "a two-axis danger model" (two categorical labels, not
  one). Note the actual blog post's own prose calls the taxonomy "AST v1.0"
  (with a space + lowercase v); `docs/blog-facts.md`'s shorthand "AST-1.0" is
  fine for internal reference but matching the source post's own naming reads
  cleaner in-post. Caught on the 2026-07-13 outline-stage review of
  `automate-blog-writing-with-ai-agents` (CTA beat, order 11) — gate finding.
- **"Combined into one read" is the same disproven pre-redesign claim as
  "single review pass," now phrased differently — recurring landmine.** An
  outline paragraph (order 2, the "correcting my own earlier description"
  beat) stated the old system had "the review pass that combined
  fact-checking, link-checking, and a safety scrub into one read." Per the
  standing entry above (pre-redesign layer was 5-6 distinct mechanisms:
  generalist content-reviewer, section-impact-reviewer, link-checker,
  fact-checker, bullshit-detector, plus non-wired judge.ts), fact-checking and
  link-checking were never combined into a single read, and "a safety scrub"
  as a named pre-redesign mechanism isn't confirmed anywhere (it's a
  synthesis-owned check in the NEW pipeline). SKILL.md's own line "Replaces
  the old Tone Gate / Review / Section-Impact / Fact-Link-Bullshit steps"
  names a step called "Fact-Link-Bullshit" — that's a STEP LABEL, not
  evidence the three ran as one combined read; the design-doc entry above
  already found each ran as its own distinct agent under that step. Watch
  for this exact substitution ("into one read" / "one pass" / "one check")
  applied to fact-checking + link-checking (+ anything else) on every future
  revision of this post — it's the same bug wearing new words. Caught on the
  2026-07-13 outline-stage review, order 2 — gate finding.
- **"An AI agent running each one" (of the twelve pipeline stages) overstates
  agent coverage — same landmine as the CTA beat's "every pipeline stage is a
  skill" fix, now recurring on the stage-list beat instead.** Per the standing
  entry above (Step 10 Assemble and Steps 11/12 Bookkeeping/Build-and-Commit
  are orchestrator-owned direct actions; Step 2's topic-approval gate is a
  human decision, not an agent), a claim that literally every one of the
  twelve stages is run by an AI agent is false. This surfaced as an outline
  paragraph's `topic` field ("The assembly line today: twelve stages, an AI
  agent running each one") — topic fields become H2 headings by default per
  this post's own drafting convention (see the order-2 aside note), so this
  reads as a wrong-fact heading, not just internal outline scaffolding.
  Correct framing scopes the "agent" claim to the content-shaping stages
  (research, brief, outline, outline reviewers, drafter, draft reviewers,
  synthesis, hero-image generation, summary/digest) and says the orchestrator
  itself handles topic approval, assembly, and commit directly — e.g. "twelve
  stages, most handed to an AI agent." Watch for this claim recurring at ANY
  beat of this post, not just the CTA where it was first caught — caught this
  time on the stage-walkthrough beat (order 3), 2026-07-13 outline-stage
  review — gate finding.
- **Anthropic multi-agent research system post — publish date confirmed
  2026-07-13**: "How we built our multi-agent research system"
  ([anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system))
  was published **June 13, 2025** (dateline "Published Jun 13, 2025"). Useful
  for "as of <date>" framing on the 90.2% / four-elements / 4x-15x-token /
  "spawning 50 subagents" claims sourced from this page, given the model
  lineup it describes (Claude Opus 4, Claude Sonnet 4) has since moved on
  (Opus 4.8, Sonnet 5 as of mid-2026).
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage clean pass confirmed
  2026-07-13** (full draft, not outline). Checked every standing landmine for
  this post's exact text and found none present: 12-stage list correct order
  with assemble/commit as separate items (9/10/11/12), tone gate folded into
  the draft-review-loop item not listed separately, "the other eleven stages"
  phrasing in the hook section is 12-minus-topic-approval (correct math, not
  the old eleven-stages-total miscount); "eight stages with seven agents" for
  the earlier version of this post confirmed accurate against the actual live
  file's own summary/body ("Eight stages run before a post ships, seven of
  them model agents" / "Seven narrow agents run the assembly line"); the
  correction aside doesn't characterize the pre-redesign review layer with an
  exact count or as "one cold reader," just "review fans out much wider than
  it used to" (safe, vague); outline-loop reviewer count 12 with round cap 5;
  draft-loop reviewer count 15 (all named, grouped 5 structural / 5 craft / 5
  integrity) with round cap 5; model-tier claim (14 sonnet, 1 haiku on
  link-integrity) correct; Haiku-missed-a-backdoor Skills Marketplace analogy
  present and accurate, past tense correct (source predates); tone-gate
  threshold "15 or above out of 100" correct, banned-phrase-adds-100
  framed as internal mechanism only; final re-score + 2-attempt de-tell
  cleanup pass correct; disposition classifier (gate/auto-apply/advisory,
  hook defaults advisory unless missing/broken) correct; Anthropic 90.2% +
  all four elements quoted without the "NOT responsible for" gloss or a
  causal "because"; Google Research 80.9%/39-70% and Augment's "+81%/up to
  70%" both correctly ranged, correct primary URL; Anthropic 4x/15x token
  figures correct; Rankability 83% kept with directional caveat; Google
  spam-policy paraphrased (no quote marks) matching the live page's actual
  "scaled content abuse" + "generative AI tools" language; security-kit
  "six sub-agents across eight phases" cross-post claim confirmed accurate
  against the source post's own body/footer; Skills Marketplace two-axis →
  AST v1.0 three-score rewrite described correctly (not "blunt danger
  label"), "AST v1.0" spelled with space+lowercase-v matching the source
  post; CTA correctly uses "agent" for pipeline stages (never conflates with
  "skill"); every internal link's tense checked against its real pubDate —
  which-claude-model-to-use (07-18, neutral present), hired-a-team-of-
  specialists (07-21, future tense), grill-me-what-an-auditor-sees (07-15,
  future tense), we-let-haiku-do-the-audits-it-missed-things (predates, past
  tense) — all correct; this post's known three-time link-tense regression
  is NOT present in this revision. No fact-checking gate findings this pass.
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage clean pass confirmed
  2026-07-13 (this exact draft, reviewed against the full paragraph-level
  outline guidance).** Every standing landmine checked and none present: 12
  stages listed in correct order with assemble/commit as separate items
  (10/12); tone gate folded into item 8, not a separate stage; "the other
  eleven stages" = 12-minus-topic-approval math, correct; "eight stages with
  seven agents" for the earlier version of this post, accurate; the order-2
  correction aside doesn't quantify the pre-redesign review layer or call it
  "one pass" — uses safe vague "review fans out much wider than it used to";
  "a dozen" (12) outline reviewers stated correctly with round cap 5; "roughly
  fifteen" / "fifteen" draft reviewers stated correctly, grouped 5
  structural/5 craft/5 integrity, round cap 5; Skills Marketplace's
  Haiku-missed-a-backdoor analogy present verbatim ("Haiku missed a real
  backdoor, and Sonnet caught it"), correct past tense (source predates);
  model-tier claim (14 sonnet, 1 haiku on link-integrity) correct and
  internally sourced (no citation needed — verified via `.claude/agents/*.md`
  frontmatter, not a third-party stat); protected sentence "Catching a broken
  structure at the outline costs an outline. Catching it after a full draft
  costs a rewrite." present verbatim; tone-gate threshold "15 or above out of
  100" correct, "adds 100 points... internally" correctly framed as the
  pre-clamp mechanism; protected sentence "The gate I trust most is the one
  with no opinion." present verbatim (used twice — inline and as an H2);
  Anthropic 90.2% + all four subagent elements (objective, output format,
  tool/source guidance, task boundaries) correct, no causal "because" bridging
  them to the 90.2% figure; Google Research 80.9%/39-70% and Augment's
  "+81%/up to 70%" both correctly ranged with the confirmed-correct primary
  URL (the "...when-and-why-agent-systems-work/" suffix, not the 404 short
  form); protected clause "I pay that bill on every post" present near-verbatim;
  Anthropic 4x/15x token figures correct; Google spam-policy paraphrased with
  no quotation marks, matching the live page's actual "scaled content abuse" +
  "generative AI tools" language (no misattributed Rankability-only sentence);
  Rankability 83% kept with the "directional... focused sample" caveat;
  Skills Marketplace two-axis → AST v1.0 three-score rewrite described
  correctly ("two-axis danger model," not "blunt danger label"); every
  internal cross-post link with an actual hyperlink checked against its real
  pubDate and all correct (how-to-measure-blog-seo 07-09, can-an-ai-run-a-
  business 07-09, claude-security-team-that-remembers 07-10,
  we-let-haiku-do-the-audits-it-missed-things 02-22, make-ai-writing-sound-
  human 07-12, we-rewrote-the-security-scoring-here-s-why 02-22,
  skill-md-is-a-file-written-for-agents 02-23 — all predate this post's
  07-13 pubDate, past tense correct). **New observation, not a fact-accuracy
  gate finding (routed to link-integrity/link-opportunity instead):** this
  draft revision drops the `which-claude-model-to-use` and
  `hired-a-team-of-specialists` markdown links entirely — the prose still
  gestures at them ("here's the routing logic, if you want it" / "I'll dig
  into that specialist pattern itself in a companion post") but doesn't
  hyperlink either, and neither appears in the Sources footer. No false-tense
  claim is made (both gestures are correctly neutral-present/future-tense), so
  this is a missing-link gap, not the recurring tense-regression bug — but
  worth flagging to link-integrity/link-opportunity since the anchor text
  promises a link ("if you want it") that isn't there. No fact-checking gate
  findings this pass.
- **Google spam-policy "scaled content abuse" section — full example list
  confirmed live 2026-07-14** via direct fetch of
  [developers.google.com/search/docs/essentials/spam-policies](https://developers.google.com/search/docs/essentials/spam-policies):
  besides "using generative AI tools... to generate many pages without adding
  value," the same section lists "scraping feeds, search results, or other
  content to generate many pages (including through automated transformations
  like synonymizing, translating, or other obfuscation techniques)," "stitching
  or combining content from different web pages without adding value,"
  "creating multiple sites with the intent of hiding the scaled nature of the
  content," and "creating many pages where the content makes little or no
  sense to a reader but contains search keywords." A draft paraphrasing this as
  "generative AI... alongside scraping and content spinning" is a fair,
  unquoted paraphrase (content-spinning ~= the synonymizing/obfuscation
  techniques named under the scraping bullet) — safe to approve without a gate
  finding.
- **Rankability's AI-content page carries no explicit publish date, but its own
  header reads "SEO Case Study · Updated for 2026"** (confirmed via fetch
  2026-07-14) — a draft calling it "Rankability's 2026 analysis" is
  reasonable framing, not a dating error.
- **`automate-blog-writing-with-ai-agents` — DRAFT-mode fact-check pass
  confirmed 2026-07-14** (this exact rewrite revision, full draft + full
  paragraph-level outline guidance checked side by side). Zero gate findings.
  Every standing landmine held: 12-stage numbered list in order with
  assemble/commit as separate items (11/12), tone gate folded into item 8; "the
  other eleven stages (twelve minus that one gate)" states its own math
  explicitly; "eight stages with seven agents" for the earlier version of this
  post accurate; pre-redesign review layer stays unquantified ("a handful of
  separate review passes... one generalist content reviewer covering voice and
  SEO, with marketing folded in, plus already-narrow fact-checking and
  link-checking, with impact review running alongside them" — no exact count,
  narrow reviewers not mislabeled generalist); outline-loop = a dozen (12)
  reviewers/round cap 5, draft-loop = fifteen reviewers (all named, grouped 5
  structural/5 craft/5 integrity)/round cap 5, no "three rounds" anywhere;
  model tier 14 sonnet/1 haiku on link-integrity correct; Haiku-missed-a-
  backdoor Skills Marketplace analogy (1.75/1 finding vs 5.65/4 findings,
  `~/.codex/bin/codex` shim) correct, past tense correct; both protected
  sentences present verbatim ("Catching a broken structure at the outline
  costs an outline. Catching it after a full draft costs a rewrite." and "The
  gate I trust most is the one with no opinion." — the latter present in BOTH
  the H3 heading and the body prose, not heading-only); tone-gate threshold "15
  or above out of 100" correct, "adds 100 points... internally" framed as the
  pre-clamp mechanism only; disposition classifier (gate/auto-apply/advisory,
  hook defaults advisory unless missing/broken) correct, no "always converges"
  claim; run-one (score 42, 35 em-dashes, 2,000 words, gate 2/100 vs. ~2
  baseline, reset to 15) and run-two (6 to 22, three-item lists, final
  re-score added because of it) numbers exact; the negative-parallelism flare
  line ("Telling an editor what's wrong never converged. Handing it the fix
  did.") appears exactly once, no second instance of that construction
  elsewhere; Anthropic 90.2% + all four subagent elements correct, no "NOT
  responsible for" gloss, no causal "because," June-2025 dated framing present;
  Google Research 80.9%/"39% to 70%" and Augment's "+81%/up to 70%" both
  range-framed correctly, each citation anchored to its own sentence/source
  ("Google Research measured exactly this split" / "Augment Code's own summary
  of that same study"); "spawning fifty subagents... scouring the web
  endlessly for nonexistent sources" paraphrase accurate; Anthropic 4x/15x
  token figures correct, "I pay that bill on every post" lands in the same
  sentence as the figures; Google spam-policy paraphrased with no quotation
  marks matching the live page (confirmed again this pass, including the
  scraping/stitching/multiple-sites examples list); Rankability 83% kept with
  the directional caveat; Skills Marketplace two-axis-to-AST-v1.0 rewrite
  described correctly; CTA scopes "agent" to pipeline stages, "skill" to
  Skills Marketplace listings, no conflation, and correctly says the
  orchestrator keeps THREE things directly (topic approval, assembly, final
  commit) — note this draft correctly diverged from a flawed outline `ourTake`
  for paragraph 3 that claimed "I keep four for myself: topic approval,
  assembly, scheduling, and the final commit"; scheduling is an orchestrator-
  run sub-step (10.5) excluded from the 12-stage count, not one of the three
  things Scout "keeps," and the draft's three-item framing matches the
  already-established correct fix (see the "NOT every pipeline stage is
  agent-dispatched" entry above) rather than the outline's own error — if a
  future outline repeats "I keep four... scheduling," that outline (not the
  draft) is the one that needs the fix. Every internal link's tense checked
  against its real pubDate, all correct, no regression on the known
  three-time link-tense bug.
  **Minor precision note, NOT a gate finding:** the "four more sub-steps"
  framing (SEO scoring, scheduling, bookkeeping notes, a rolling log of what
  worked) maps to only THREE top-level SKILL.md step numbers that run without
  touching the draft (10.5 Score & Schedule — which bundles scoring AND
  scheduling as two of its own four numbered actions, 11 Bookkeeping, 11.7
  Learn); Step 11.5 Capture-product-learnings is correctly excluded since it
  can explicitly route back and touch the draft. Splitting 10.5's two actions
  into two "sub-steps" is defensible (they are two distinct actions even
  though bundled under one step header) but a stricter count would say
  "three." Not wrong enough to gate; flagged as an elevation instead.
- **`automate-blog-writing-with-ai-agents` — DRAFT-mode fact-check pass
  confirmed 2026-07-13** (fan-out draft review, full draft text checked
  against every standing landmine above and the paragraph-level outline
  guidance). No gate findings. Confirmed clean: 12-stage list correct order
  with assemble/commit as items 11/12, tone gate folded into item 8 (not a
  separate list entry); "the other eleven stages" = 12-minus-topic-approval,
  correct math; "eight stages with seven agents" for the earlier version of
  this post, accurate; order-2 correction aside stays vague about the
  pre-redesign layer (no exact count, no "single pass"/"one cold reader");
  "a dozen" (12) outline reviewers + "roughly fifteen" (15, grouped 5
  structural/5 craft/5 integrity, all 15 individually named) draft reviewers,
  both round-capped at five; model-tier claim (14 sonnet, 1 haiku on
  link-integrity) correct; Haiku-missed-a-backdoor Skills Marketplace analogy
  present near-verbatim, correct past tense; both protected sentences present
  verbatim ("Catching a broken structure at the outline costs an outline.
  Catching it after a full draft costs a rewrite." and "The gate I trust most
  is the one with no opinion."); tone-gate threshold "15 or above out of 100"
  correct, "adds 100 points... internally" framed as the pre-clamp mechanism
  only; disposition classifier (gate/auto-apply/advisory, hook defaults
  advisory unless missing/broken) correct, no false "always converges" claim;
  Anthropic 90.2% + all four subagent elements correct, no "NOT responsible
  for" gloss, no causal "because" to the 90.2% figure, and this revision adds
  new dated framing ("the model lineup they had in June 2025") not present in
  earlier clean passes — a nice improvement, worth preserving; Google Research
  80.9%/"39 to 70%" and Augment's "roughly +81%/up to 70%" both correctly
  ranged with the confirmed-correct primary URL; Anthropic 4x/15x token
  figures correct, protected clause "I pay that bill on every post" present
  near-verbatim; Google spam-policy paraphrased with no quotation marks,
  matching the live page's "scaled content abuse" + "generative AI tools"
  language; Rankability 83% kept with the "directional... focused sample"
  caveat; Skills Marketplace two-axis-to-AST-v1.0 rewrite described correctly
  ("two-axis danger model," "AST v1.0" spelled correctly); CTA correctly
  scopes the agent claim to drafting/review/generation stages and has the
  orchestrator handle topic approval/assembly/scheduling/commit directly (no
  "every stage is a skill/agent" overreach); "skill" reserved for Skills
  Marketplace listings, "agent" for pipeline stages, no conflation; every
  internal cross-post link with an actual hyperlink checked against its real
  pubDate and correct (can-an-ai-run-a-business 07-09, how-to-measure-blog-seo
  07-09, claude-security-team-that-remembers 07-10, we-let-haiku-do-the-
  audits-it-missed-things 02-22/23, make-ai-writing-sound-human 07-12,
  we-rewrote-the-security-scoring-here-s-why 02-22, skill-md-is-a-file-
  written-for-agents 02-23 — all predate this post's 07-13 pubDate, past tense
  correct). Same known gap as prior passes (not a fact-accuracy issue, routed
  to link-integrity/link-opportunity): `which-claude-model-to-use` and
  `hired-a-team-of-specialists` are gestured at in prose ("the routing logic,
  if you want it" / "a companion post") but not hyperlinked and don't appear
  in the Sources footer — no false-tense claim made, so not a gate finding
  here.
- **`automate-blog-writing-with-ai-agents` — DRAFT-mode clean pass confirmed
  2026-07-13 (fan-out dispatch, PINNED identity fields blank in this dispatch
  but content matches the known slug/pubDate 2026-07-13 post via memory
  cross-reference).** Full draft text checked against every standing landmine
  above; no gate findings. Independently re-verified two facts directly
  against source rather than relying on memory alone: (1) security-kit "runs
  six sub-agents across eight phases" — confirmed verbatim via
  `src/content/blog/2026-07-10-claude-security-team-that-remembers.md` lines
  8/35/74 ("Six specialized sub-agents, each with one job, orchestrated across
  eight phases" / "six sub-agents, an eight-phase pipeline"); (2) Skills
  Marketplace description ("audited third-party skills," AST v1.0 taxonomy)
  matches `src/data/projects.ts`'s skills-marketplace entry ("security-audited
  marketplace for AI agent skills... every skill is scanned for risky behavior
  before it lists"). All other landmines held: 12-stage list correct order
  with assemble/commit as items 11/12, tone gate folded into item 8; "the
  other eleven stages" = 12-minus-topic-approval math; "eight stages with
  seven agents" for the earlier version of this post; "a dozen" (12) outline
  reviewers + "roughly fifteen" (15, all named, grouped 5/5/5) draft
  reviewers, both round-capped at five; model-tier claim (14 sonnet, 1 haiku
  on link-integrity) correct; Haiku-missed-a-backdoor analogy present
  near-verbatim, correct past tense (source predates); both protected
  sentences present verbatim ("Catching a broken structure at the outline
  costs an outline. Catching it after a full draft costs a rewrite." and "The
  gate I trust most is the one with no opinion." — the latter twice, as H2 and
  inline); tone-gate threshold "15 or above out of 100" correct, "adds 100
  points... internally" framed as the pre-clamp mechanism only; disposition
  classifier correct, no false "always converges" claim; Anthropic 90.2% +
  all four subagent elements correct with the "model lineup they had in June
  2025" dated framing preserved; Google Research 80.9%/"39% to 70%" and
  Augment's "+81%/up to 70%" both correctly ranged with the confirmed-correct
  primary URL; Anthropic 4x/15x token figures correct, protected clause "I pay
  that bill on every post" present verbatim; Google spam-policy paraphrased
  with no quotation marks, matching the live page's "scaled content abuse" +
  "generative AI tools" language; Rankability 83% kept with the "directional...
  focused sample" caveat; Skills Marketplace two-axis-to-AST-v1.0 rewrite
  described correctly; target keyword "automate blog writing with AI agents"
  present in both the hook and the spam-policy beat as required; every
  internal/external link used inline also appears in the Sources footer. No
  fact-checking gate findings this pass — verdict PASS.
- **`automate-blog-writing-with-ai-agents` — DRAFT-mode fact-check pass
  confirmed 2026-07-13 (fan-out dispatch, PINNED identity fields blank in this
  dispatch but content matches the known slug/pubDate via memory
  cross-reference).** Full draft checked against every standing landmine
  above; no gate findings, verdict PASS. All previously-confirmed facts held:
  12-stage list correct order with assemble/commit as items 11/12, tone gate
  folded into item 8; "the other eleven stages" = 12-minus-topic-approval math;
  "eight stages with seven agents" for the earlier version of this post; both
  protected sentences present verbatim ("Catching a broken structure at the
  outline costs an outline. Catching it after a full draft costs a rewrite."
  and "The gate I trust most is the one with no opinion." — used twice, H2 and
  inline); protected clause "I pay that bill on every post" present verbatim;
  tone-gate threshold "15 or above out of 100" correct, "adds 100 points...
  internally" framed as the pre-clamp mechanism only; 12 outline reviewers / 15
  draft reviewers (grouped 5 structural/5 craft/5 integrity, all named)
  correct, both round-capped at five; model-tier claim (14 sonnet, 1 haiku on
  link-integrity) correct; Haiku-missed-a-backdoor analogy present
  near-verbatim, correct past tense; Anthropic 90.2% + all four elements
  correct with "June 2025" dated framing preserved, no causal "because" or
  "NOT responsible for" gloss; Google Research 80.9%/"39% to 70%" and
  Augment's "+81%/up to 70%" both correctly ranged with the confirmed-correct
  primary URL; Anthropic 4x/15x token figures correct; Google spam-policy
  paraphrased with no quotation marks, matching the live page's actual
  language, target keyword present in both the hook and this beat; Rankability
  83% kept with the directional caveat; Skills Marketplace two-axis-to-AST-v1.0
  rewrite described correctly; CTA correctly scopes "agent" to pipeline stages
  and "skill" to marketplace listings, no conflation; every internal link with
  an actual hyperlink checked against its real pubDate, all correct (no
  regression on the historical link-tense bug). **New observation (not a gate
  finding, elevation only):** the tone-gate paragraph now reads "The scorer
  runs before the first review round and again after every edit pass...But it
  only scores at the start of each round" — both clauses describe the same
  single mechanism (an edit-pass score and a next-round-start score are the
  same event), but stating them back-to-back with "But" reads as if they
  contradict. Not a fact error since SKILL.md's own wording supports both
  framings, but flagged as an elevation for a smoother rewrite. **Also
  observed:** same known gap as prior passes (routed to link-integrity, not a
  fact-check issue) — `which-claude-model-to-use`, `hired-a-team-of-
  specialists`, and `grill-me-what-an-auditor-sees` are gestured at in prose
  ("if you want it" / "a companion post" / "a post right after this one") with
  correct future/neutral tense but none are hyperlinked or in the Sources
  footer.
- **NEW 2026-07-14 (OUTLINE-stage review): "normal human prose scores 10 to 15
  on density alone" appears to contradict the documented human-tone baseline.**
  `.claude/skills/human-tone/SKILL.md` states unambiguously: "The measured
  human baseline: **aiScore ~2**; our first-pass AI drafts scored **~40**.
  Target for shipped posts: **aiScore < 15**." The already-live post
  `src/content/blog/2026-07-13-automate-blog-writing-with-ai-agents.md` (line
  85) and this outline's order-9 "run one" failure story both state "the gate
  had been set at 2 out of 100, and normal human prose scores 10 to 15 on
  density alone, so no draft could ever pass" — a specific "10 to 15" figure
  that is NOT documented anywhere in SKILL.md or `tone-grader.ts` comments and,
  read as a baseline claim, directly conflicts with the canonical "~2"
  baseline. `tone-grader.ts` itself has no comment establishing a 10-15
  baseline for any individual signal either (em-dash corpus baseline is
  "~4.5/1k" per SKILL.md, contractions "~1.2-4.9", start-diversity
  "0.56-0.75" — none map cleanly to a 10-15 aiScore). Flag this phrasing
  wherever it recurs (outline or draft) — either cite a real source/artifact
  for the "10-15" figure, or replace with the reconciled framing: "the gate
  had been set at 2 out of 100, dead level with the corpus's own measured
  human baseline, so ordinary variance in a normal, human-sounding draft was
  enough to trip it." This was NOT caught by prior fact-check passes on this
  post (multiple "clean pass" entries below predate this check) — worth an
  explicit re-check on every future revision of this specific beat.
- **Outline schema fields confirmed** via direct read of
  `.claude/skills/content-pipeline/lib/outline-schema.ts`: meta block is
  `point, hook, emotionalCore, flare, targetAudience, targetKeyword,
  searchIntent, postFormula, paragraphs` (loose object, extra keys allowed);
  each paragraph node is `order, topic, goal, paragraphFormula, audienceNote,
  intendedBeat, ourTake, facts, sources, keyword, links, gateGuidance,
  rendersAsProse`. A draft/outline paraphrasing this as "meta block
  (point/hook/emotionalCore/flare/audience/keyword/intent/formula) plus
  ordered paragraph nodes with goal, facts, sources, and gateGuidance" is an
  accurate (if partial) description — safe to cite without further checking.
- **NEW 2026-07-14 (OUTLINE-stage review): "single review pass" landmine
  recurred a THIRD time, now inside an `ourTake` field specifically (not
  `facts` or `intendedBeat`).** Outline paragraph order 2's `ourTake` read:
  "The fix: eight stages became twelve, and **one review pass** became
  fifteen narrow ones." This is the same disproven pre-redesign
  mischaracterization documented above (pre-redesign layer was 5-6 distinct
  mechanisms — generalist content-reviewer, section-impact-reviewer,
  link-checker, fact-checker, bullshit-detector, plus non-wired judge.ts —
  never a single pass), and it directly contradicted that SAME paragraph's
  own `facts` bullet, which correctly said "a handful of separate passes."
  Flagged as a gate finding; correct replacement: "a handful of separate
  review passes became fifteen narrow ones." Landmine now confirmed to
  recur across all three outline fields (`facts`, `intendedBeat`, `ourTake`)
  on different revisions — check all three on every future pass, not just
  `facts`/`intendedBeat` as flagged previously.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-14
  otherwise clean.** Full re-check against every standing landmine (12-stage
  order with assemble/commit separate, "eleven stages" = twelve-minus-topic-
  approval math, "eight stages/seven agents" for the earlier version, 12
  outline reviewers/15 draft reviewers named and grouped 5/5/5 correctly, tone
  gate folded into draft-review-loop not listed separately, threshold 15/100,
  banned-phrase-adds-100 framed as internal mechanism, disposition classifier
  correct, Anthropic 90.2%/four elements/June-2025 dated framing, Google
  Research 80.9%/39-70% + Augment's ranged framing, Rankability 83% with
  directional caveat, Google spam-policy paraphrase matching the live page,
  Skills Marketplace two-axis→AST v1.0 correct, "agent" vs "skill" terms not
  conflated, model-tier 14 sonnet/1 haiku correct) found nothing else wrong.
  Also newly confirmed: order 9's run-one/run-two failure story now uses the
  RECONCILED framing ("dead level with the corpus's own measured human
  baseline of ~2... ordinary variance... was enough to trip it") instead of
  the disproven "10 to 15" figure flagged in the 2026-07-14 entry above —
  the fix has landed and held in this revision. Baseline ~2 re-confirmed
  verbatim via direct read of `.claude/skills/human-tone/SKILL.md`: "The
  measured human baseline: aiScore ~2; our first-pass AI drafts scored ~40.
  Target for shipped posts: aiScore < 15."
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-14
  (later revision, post-dated system clock) — clean pass, verdict PASS.** Full
  15-paragraph outline re-checked against every standing landmine and found
  clean: 12-stage canonical order with assemble/commit as separate items;
  "the other eleven stages" = twelve-minus-topic-approval math; "eight stages
  with seven agents" for the earlier version of this post; order-2 `ourTake`
  now correctly reads "a handful of separate review passes became fifteen
  narrow ones" — the "one review pass" regression flagged earlier the same
  day is NOT present in this revision; 12 outline reviewers / 15 draft
  reviewers (all named, grouped 5/5/5) both round-capped at five; tone gate
  folded into the draft-review-loop beat, not a separate stage; threshold "15
  or above out of 100," banned-phrase-adds-100 framed as the internal
  pre-clamp mechanism; run-one/run-two failure story uses the reconciled
  "dead level with the corpus's own measured human baseline of ~2" framing,
  not the disproven "10 to 15" figure; flare line and both protected
  sentences ("Catching a broken structure..." and "The gate I trust most is
  the one with no opinion.") present; Anthropic 90.2% + all four elements +
  June-2025 dated framing correct, no causal "because" or "NOT responsible
  for" gloss; Google Research 80.9%/"39% to 70%" and Augment's "+81%/up to
  70%" both correctly ranged; Anthropic 4x/15x token figures correct;
  Rankability 83% kept with the directional caveat; Google spam-policy
  paraphrased with no quotation marks matching the live page; Skills
  Marketplace two-axis-to-AST-v1.0 rewrite and disclaimer described
  correctly; "agent" vs "skill" terminology not conflated anywhere,
  including the CTA beat and the security-kit analogy (kept distinct from
  the marketplace); model-tier claim (14 sonnet, 1 haiku on link-integrity)
  correct; every internal link's tense checked against its real pubDate, all
  correct, no recurrence of the historical three-time link-tense bug. No
  gate findings. One elevation offered: order 6's Haiku-backdoor recap
  ("sitting in the shell") could name the specific shim path
  (`~/.codex/bin/codex`) for sharper credibility.
- **`automate-blog-writing-with-ai-agents` rewrite — clean pass confirmed
  2026-07-12.** A revision of this post (pubDate 2026-07-13, author Scout)
  correctly cleared every previously-flagged landmine for this specific post in
  one pass: (1) tone-gate threshold stated as "15 or higher out of 100" — correct,
  not the wrong "2" figure; (2) "each banned phrase alone adds 100 points" framed
  as the internal scoring mechanism, no false claim about the reported/capped
  score — matches approved phrasing; (3) Anthropic 90.2% + all four subagent
  elements (objective, output format, tool/source guidance, task boundaries)
  quoted/paraphrased accurately, no added "NOT responsible for" gloss;
  (4) Google Research 81%/70% both correctly framed with "up to"; (5) Rankability
  83% framed with the "directional, not definitive" caveat; (6) Google spam-policy
  paraphrase matches the live page (see entry above), no misattributed quote;
  (7) all internal cross-post links checked against real pubDates — `hired-a-
  team-of-specialists` (07-21) and `which-claude-model-to-use` (07-18) both used
  correct future/neutral tense, `ai-automation-stack` (07-19) used a no-past-
  tense forward link, `how-to-measure-blog-seo` (07-09) and `make-ai-writing-
  sound-human` (07-12) correctly used past tense since both predate this post's
  07-13 pubDate. NOTE: this post has regressed on the link-tense bug at least
  three times across earlier drafter revisions per the entries above — this
  particular revision is clean, but re-check tense on every future revision
  regardless of this pass. (8) 12-stage pipeline order and the "roughly fifteen"
  draft-reviewer list (all 15 named: hook, voice, flatness, formulaic, structure,
  wordsmith, grammar, SEO, link integrity, link opportunity, facts, overclaims,
  emotional impact, structural impact, meta-content) both matched the confirmed
  roster exactly — stronger than earlier revisions that only named 12 of 15.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-14
  (yet another revision) — clean pass, verdict PASS.** Full 15-paragraph
  outline re-checked against every standing landmine and found clean: 12-stage
  canonical order confirmed against a direct re-read of SKILL.md's own numbered
  headings (1, 2, 3, 4, 4.5, 4.6, 5, 6, 8, 9, 10, 12 — no step 7; 10.5/11/11.5/
  11.7 are the uncounted scoring/bookkeeping/learning padding the outline
  correctly excludes), Assemble genuinely IS Step 10 ("The orchestrator writes
  the final post file. Subagents do not set frontmatter.") and Commit is Step
  12, so the outline's "Step 10 Assemble is orchestrator-owned" claim is
  accurate (resolves an apparent conflict with other memory entries that said
  "assemble/commit as items 11/12" — those were describing list position in a
  drafted post's prose, not the SKILL.md step number, and both framings are
  defensible; SKILL.md's own number is 10, use that when a draft cites a step
  number directly); "the other eleven stages" = twelve-minus-topic-approval
  math; "eight stages became twelve" for the earlier version of this post;
  order-2 `ourTake` reads "a handful of separate review passes became fifteen
  narrow ones" — no recurrence of the disproven "one review pass" framing; 12
  outline reviewers / 15 draft reviewers (all named, grouped 5/5/5) both
  round-capped at five; the draft-reviewer rubric claim ("the approved outline
  becomes the rubric every draft reviewer grades against later") is directly
  confirmed by SKILL.md Step 6's fan-out line ("Each gets the draft file path,
  the approved outline (the per-beat rubric)..."); tone gate folded into the
  draft-review-loop beat; threshold "15 or above out of 100," banned-adds-100
  framed as the internal pre-clamp mechanism; run-one/run-two failure story
  uses the reconciled "dead level with the corpus's own measured human
  baseline" framing, not the disproven "10 to 15" figure; both protected
  sentences and the flare line present; Anthropic 90.2% + all four elements +
  June-2025 dated framing correct; Google Research 80.9%/"39% to 70%" and
  Augment's "+81%/up to 70%" both correctly ranged; Anthropic 4x/15x tokens
  correct; Rankability 83% with directional caveat; Google spam-policy
  paraphrased with no quote marks matching the live page; Skills Marketplace
  two-axis-to-AST-v1.0 rewrite described correctly, "agent" vs "skill" not
  conflated; model-tier 14 sonnet/1 haiku correct; every internal link's tense
  checked against its real pubDate, all correct (no recurrence of the
  historical three-time link-tense bug). No gate findings. One elevation
  offered: paragraph 6's Haiku-backdoor recap names the shim path but not the
  exposure-score jump (1.75 -> 5.65) that would make the miss/catch contrast
  concrete — worth adding.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-14
  (this exact 15-paragraph outline) — clean pass, verdict PASS.** Full
  re-check against every standing landmine found nothing wrong: 12-stage
  canonical order with assemble/commit as separate items; "the other eleven
  stages" = twelve-minus-topic-approval math; "eight stages became twelve"
  (or "eight stages with seven agents") for the earlier version of this post;
  order-2 `ourTake`/`facts` both correctly read "a handful of separate review
  passes became fifteen narrow ones" — no recurrence of the disproven "one
  review pass"/"single review pass" framing in any of the three fields; 12
  outline reviewers / 15 draft reviewers (all named, grouped 5/5/5), both
  round-capped at five; tone gate folded into the draft-review-loop beat, not
  listed as its own stage; threshold "15 or above out of 100," banned-adds-100
  framed as the internal pre-clamp mechanism; run-one/run-two failure story
  uses the RECONCILED "dead level with the corpus's own measured human
  baseline of ~2" framing — notably the still-LIVE published post
  (`src/content/blog/2026-07-13-automate-blog-writing-with-ai-agents.md` line
  85) still carries the disproven "10 to 15" figure, so this outline is a
  genuine fix on rewrite, not just a repeat; both protected sentences and the
  flare line present; order 6's Haiku-backdoor recap already includes BOTH the
  shim path (`~/.codex/bin/codex`) and the exposure-score jump (1.75 -> 5.65)
  — the elevation offered on the prior pass has been incorporated; order 15's
  topic is "Try the narrow-agent pattern yourself," correctly avoiding the
  live post's own "Try the narrow-skill pattern yourself" heading (a
  skill/agent conflation in the CURRENT live post that this rewrite fixes);
  Anthropic 90.2%/four elements/June-2025 dated framing, Google Research
  80.9%/39-70%+Augment's ranged framing, Anthropic 4x/15x tokens, Rankability
  83% with directional caveat, Google spam-policy paraphrase, Skills
  Marketplace two-axis-to-AST-v1.0 rewrite, "agent" vs "skill" terminology,
  and model-tier 14 sonnet/1 haiku all correct; every internal link's tense
  checked against its real pubDate, all correct, no recurrence of the
  historical link-tense bug. No gate findings. **Housekeeping note:** SKILL.md's
  "Round (repeat until converged or round cap 5)" lines have drifted from
  165/254 to 165/262 as the file's grown — round cap value (5) is unchanged,
  only the line numbers cited in some outline `facts` bullets are stale by a
  few lines. Those bullets are internal citation trails, not rendered prose,
  so this isn't a gate finding — but don't be alarmed by a future line-number
  mismatch as long as the cap value itself still reads 5.
- **Anthropic multi-agent research system — "spawning 50 subagents" failure
  triad confirmed verbatim (re-check 2026-07-14):** "Early agents made errors
  like spawning 50 subagents for simple queries, scouring the web endlessly
  for nonexistent sources, and distracting each other with excessive
  updates." A draft naming only the first clause (spawning 50 subagents) is
  accurate but under-uses the source — all three failure modes are confirmed
  and safe to use together for a stronger contrast beat.
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check pass
  confirmed 2026-07-14** (this exact draft, review-army fan-out). Full text
  checked against every standing landmine on this post; none present — clean
  pass, verdict PASS. Notably confirms the reconciled "dead level with the
  corpus's own measured human baseline of about 2" framing (not the disproven
  "10 to 15" figure flagged 2026-07-14) has now landed in an actual DRAFT, not
  just an outline. All standing facts held: 12-stage order with assemble/commit
  as separate items 11/12; "the other eleven stages" = twelve-minus-topic-
  approval math; "eight stages with seven agents" for the earlier version of
  this post; pre-redesign layer stays uncounted ("a handful of separate review
  passes... already-narrow fact-checking and link-checking," no "single review
  pass"/"one review pass" regression in any field); 12 outline reviewers / 15
  draft reviewers named and grouped 5/5/5, both round-capped at five; tone gate
  folded into the draft-review-loop item, not listed separately; threshold "15
  or above out of 100" with "adds 100 points... internally" framed as the
  pre-clamp mechanism only; Haiku-backdoor analogy verbatim (1.75 exposure/1
  finding to 5.65/4 findings, shim path `~/.codex/bin/codex`); both protected
  sentences ("Catching a broken structure..." / "The gate I trust most is the
  one with no opinion." — the latter both as H2 and in body prose) plus the
  flare line ("Telling an editor what's wrong never converged. Handing it the
  fix did.") present verbatim; run-one/run-two numbers exact (42, 35 em-dashes,
  2,000 words, bar reset to 15; 6 to 22); gate-count oscillation (10, then 5,
  then 7 again) correct; Anthropic 90.2% + all four subagent elements + "June
  2025" dated framing correct, no causal "because," no "NOT responsible for"
  gloss; Google Research 80.9%/"39% to 70%" and Augment's "+81%/up to 70%" both
  correctly ranged, each citation landing on its own sentence tied to the right
  source, correct primary URL; Anthropic 4x/15x tokens correct; Google
  spam-policy paraphrased with no quotation marks matching the live page;
  Rankability 83% kept with the directional caveat; Skills Marketplace
  two-axis-to-AST-v1.0 rewrite and disclaimer described correctly; "agent" vs
  "skill" terminology not conflated anywhere including the CTA; model-tier (14
  sonnet, 1 haiku on link-integrity) correct; every internal link's tense
  checked against its real pubDate, all correct — this draft doesn't link
  `hired-a-team-of-specialists` or `which-claude-model-to-use` at all, so the
  historical three-time link-tense regression isn't triggered either way. No
  gate findings. Two elevations offered (not gate findings): (1) the Google
  spam-policy paragraph could state explicitly that the policy targets
  manipulative intent, not AI-vs-human authorship, sharpening the implicit
  point; (2) the Anthropic dated-framing sentence could cite the exact publish
  date (June 13, 2025) instead of just "June 2025" for extra precision.
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check pass
  2026-07-14, this "Twelve stages that automate blog writing with AI agents"
  H2 revision — TWO gate findings, both fixed-then-regressed or new.** (1)
  **Fourth regression of the "I keep four... scheduling" bug.** Draft read "I
  keep four for myself: topic approval and the final commit bookend it, with
  assembly and scheduling in between." Per the standing entry below (confirmed
  clean 2026-07-14), the correct framing is "I keep three for myself: topic
  approval, assembly, and the final commit" — scheduling is orchestrator-run
  sub-step 10.5, excluded from the 12-stage count, not one of the non-agent
  items Scout personally "keeps." This exact regression was predicted in the
  entry below ("if a future outline repeats 'I keep four... scheduling,' that
  outline (not the draft) is the one that needs the fix") — and indeed this
  dispatch's own outline paragraph 3 `ourTake` carried the flawed four-item
  version verbatim, and the draft inherited it uncorrected. Watch this exact
  beat on every future revision; it has now regressed from a fixed state
  multiple times. (2) **New unsupported paraphrase on the Google spam-policy
  scraping bullet.** Draft read "alongside scraping and automated rewriting
  used to dodge duplicate-content detection" — the live page's actual
  language (confirmed above, re-checked 2026-07-14) is "automated
  transformations like synonymizing, translating, or other obfuscation
  techniques," with no mention of "duplicate-content detection" anywhere on
  the page. Attributing that specific evasion purpose to what the policy
  "names" overstates the source. The pre-approved safe paraphrase for this
  exact bullet is "content spinning" (see the 2026-07-14 "full example list"
  entry above) — use that instead of inventing a specific detection-evasion
  mechanism. Everything else in this revision held every standing landmine
  clean: 12-stage list/order with assemble/commit separate; both protected
  sentences and the flare line verbatim; run-one/run-two numbers exact with
  the reconciled "~2 baseline" framing; gate-count oscillation (10, 5, 7)
  correct; Haiku-backdoor analogy verbatim; Anthropic 90.2%/four-elements/
  June-2025 dating correct; Google Research 80.9%/"39% to 70%" and Augment's
  "+81%/up to 70%" both correctly ranged and anchored to their own source
  sentences; Anthropic 4x/15x tokens correct; Rankability 83% with directional
  caveat; Skills Marketplace two-axis-to-AST-v1.0 rewrite correct; "agent" vs
  "skill" terminology not conflated; model-tier 14 sonnet/1 haiku correct;
  every internal link's tense checked against its real pubDate, all correct.
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check pass
  confirmed 2026-07-14 (this exact revision, PINNED fields blank in dispatch,
  identified via outline meta slug/pubDate cross-reference).** Clean pass,
  verdict PASS, zero gate findings. Full text re-checked line-by-line against
  every standing landmine on this post; none present. Notable: the "four more
  sub-steps... don't make the count" imprecision flagged as an elevation
  2026-07-13 is now FIXED in this revision — draft reads "Three more sub-steps
  run in that same stretch... SEO scoring and scheduling, bookkeeping notes,
  plus a rolling log of what worked — so none of them make the count," which
  matches the stricter/correct count (10.5 bundles scoring+scheduling as one
  sub-step, plus 11 Bookkeeping, plus 11.7 Learn = three). "I keep three for
  myself: topic approval and assembly, plus the final commit" — correct
  3-item framing (scheduling correctly excluded), no recurrence of the
  historical "I keep four... scheduling" bug. Also confirmed: Google
  spam-policy paragraph now includes an explicit "as of this writing" hedge
  (one of two elevations offered 2026-07-14, now incorporated); the other
  elevation from that pass (citing Anthropic's exact June 13, 2025 date
  instead of "June 2025") is still NOT incorporated — re-offered below. All
  other standing facts held: 12-stage list correct order, assemble/commit
  separate (11/12), tone gate folded into item 8; "the other eleven stages
  (twelve minus that one gate)" explicit math; "eight stages with seven
  agents" for the earlier version of this post; pre-redesign layer stays
  uncounted, fact-checking/link-checking called "already narrow," no "single
  review pass" regression; 12 outline reviewers ("a dozen")/15 draft
  reviewers named and grouped 5/5/5, both round-capped at five; Haiku-backdoor
  analogy verbatim (1.75/1 finding to 5.65/4 findings, shim path
  `~/.codex/bin/codex`); tone-gate threshold "15 or above out of 100,"
  banned-adds-100 framed as internal pre-clamp mechanism only; both protected
  sentences present verbatim, "The gate I trust most is the one with no
  opinion." present in both H3 heading and body; flare line present exactly
  once; run-one/run-two numbers exact (42, 35 em-dashes, 2,000 words, gate
  2/100 vs. baseline ~2, reset to 15; 6 to 22, three-item lists) using the
  RECONCILED baseline framing, not the disproven "10 to 15" figure; gate-count
  oscillation (10, then 5, then 7 again) correct; Anthropic 90.2% + all four
  subagent elements + "June 2025" dated framing correct, no causal "because,"
  no "NOT responsible for" gloss; Google Research 80.9%/"39% to 70%" and
  Augment's "+81%/up to 70%" both correctly ranged, each citation anchored to
  its own sentence/source; Anthropic 4x/15x tokens correct, "I pay that bill
  on every post" in the same sentence as the figures; Rankability 83% kept
  with the directional caveat; Google spam-policy paraphrased with no
  quotation marks, matches live page (scraping/synonymizing framing, no
  invented "duplicate-content detection" claim); Skills Marketplace two-axis-
  to-AST-v1.0 rewrite and disclaimer described correctly; "agent" vs "skill"
  terminology not conflated — confirms "AI-audited agent skills" is safe
  phrasing (matches `src/data/projects.ts`'s own "AI agent skills" wording,
  not a conflation); model-tier (14 sonnet, 1 haiku on link-integrity)
  correct; every internal link's tense checked against its real pubDate, all
  correct, no recurrence of the historical three-time link-tense bug (this
  draft omits `hired-a-team-of-specialists`/`which-claude-model-to-use`
  entirely). Two elevations offered (not gate findings): (1) cite Anthropic's
  exact publish date (June 13, 2025) instead of "June 2025"; (2) the Anthropic
  "spawning fifty subagents" beat uses only 2 of the 3 confirmed failure-mode
  clauses (drops "distracting each other with excessive updates") — accurate
  but under-uses the source.
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check pass
  confirmed 2026-07-14 (this exact "Five decisions" H2/H3-nested revision).**
  Clean pass, verdict PASS, zero gate findings. Notable resolved item: this
  revision changes the CTA/body claim from the live post's "topic approval,
  assembly, scheduling, the final commit" (4 items) to "I keep three for
  myself: topic approval, assembly, the final commit" (3 items) — checked
  this is NOT a regression. This draft separately and correctly describes
  "scheduling" as one of four UNCOUNTED sub-steps (SEO scoring, scheduling,
  bookkeeping notes, rolling digest-log) that "run in that same stretch
  without touching the draft" and explicitly "don't make the count" of
  twelve — so scheduling was never one of the 12 counted stages to begin
  with, and the "three for myself" claim (topic approval + assemble + commit,
  the only 3 non-agent items among the 12 counted stages) is accurate and
  actually a tighter/more correct framing than the live post's, not an
  undercount. Also confirms one of the two elevations offered on the prior
  pass (2026-07-14, entry above) is now incorporated into the prose itself:
  the Google spam-policy beat now states explicitly "the policy goes after
  intent to manipulate rankings, not AI authorship itself. A human writing to
  game search results breaks it exactly as much as an AI does." All other
  standing landmines held clean: 12-stage list correct order, assemble/commit
  separate (items 11/12); tone gate folded into item 8; "the other eleven
  stages (twelve minus that one gate)" explicit correct math; "eight stages
  with seven agents" for the earlier version of this post; pre-redesign layer
  stays uncounted ("a handful of separate review passes," fact-checking/
  link-checking correctly called "already-narrow," no exact count, no "one
  review pass"/"single review pass" in any occurrence); 12 outline reviewers/
  15 draft reviewers named and grouped 5/5/5, both round-capped at five;
  Haiku-backdoor analogy verbatim (1.75/1 finding to 5.65/4 findings, shim
  path `~/.codex/bin/codex`); tone-gate threshold "15 or above out of 100,"
  banned-adds-100 framed as internal pre-clamp mechanism only; both protected
  sentences present verbatim ("Catching a broken structure..." and "The gate
  I trust most is the one with no opinion." — present in BOTH the H3 heading
  and the body's opening line, satisfying the not-heading-only requirement)
  plus the flare line ("Telling an editor what's wrong never converged.
  Handing it the fix did."); run-one/run-two numbers exact (42, 35 em-dashes,
  2,000 words, bar reset to 15; 6 to 22) using the RECONCILED "dead level
  with the corpus's own measured human baseline of about 2" framing, NOT the
  disproven "10 to 15" figure still live in the currently-published post;
  gate-count oscillation (10, then 5, then 7 again) correct; Anthropic 90.2%
  + all four subagent elements + "June 2025" dated framing correct, no causal
  "because," no "NOT responsible for" gloss; Google Research 80.9%/"39% to
  70%" and Augment's "+81%/up to 70% worse" both correctly ranged, each
  citation landing on its own sentence tied to the right source, correct
  primary URL; Anthropic 4x/15x tokens correct with "I pay that bill on every
  post" in the same sentence as the figures; Rankability 83% kept with the
  directional caveat; Skills Marketplace two-axis-to-AST-v1.0 rewrite and
  disclaimer described correctly, "AST v1.0" spelled correctly; "agent" vs
  "skill" terminology not conflated anywhere including the CTA heading
  ("Try the narrow-agent pattern yourself," correctly avoiding the live
  post's own "narrow-skill" conflation); model-tier claim (14 sonnet, 1
  haiku on link-integrity) correct; security-kit "six specialized sub-agents
  across eight phases" cross-post claim accurate; every internal link's
  tense checked against its real pubDate, all correct (this draft omits
  `hired-a-team-of-specialists`, `which-claude-model-to-use`, and
  `grill-me-what-an-auditor-sees` entirely, so the historical link-tense
  regression isn't triggered either way). Two elevations offered (not gate
  findings): (1) cite Anthropic's exact publish date (June 13, 2025) instead
  of "June 2025"; (2) add an explicit "as of this writing" hedge before the
  Google spam-policy claim, since that page's wording has already required
  multiple re-checks across this project's history and is exactly the kind
  of third-party policy language that can change without notice.

## `automate-blog-writing-with-ai-agents` — 2026-07-15 OUTLINE-stage review (new findings)
- **CRITICAL NEW CAUTION: build-aloud does NOT currently run on the published
  `agentic-content-pipeline` npm package — a CTA claiming "this blog runs on
  that package" is a wrong-fact gate finding until further notice.** Confirmed
  via direct read of `tickets/TD-0038-switch-build-aloud-onto-agentic-content-
  pipeline.md` (status: **open**, created 2026-07-15, all checkboxes
  unchecked): "the in-repo pipeline (`.claude/skills/human-tone/`,
  `.claude/skills/content-pipeline/`, `.claude/agents/*-reviewer.md`, etc.) and
  the extracted standalone package (`~/projects/agentic-content-pipeline`, npm
  `agentic-content-pipeline@0.1.1`) have already drifted apart... Consolidate
  build-aloud onto the published package." Build-aloud's own in-repo copy is
  what actually runs this blog's pipeline right now; the published package is
  a separate, currently-diverged extraction, and switching build-aloud onto it
  is unstarted work. A post/outline asserting present-tense parity ("this blog
  itself runs on that package" / "this exact pipeline is packaged as
  agentic-content-pipeline, and this blog runs on it") overstates current
  reality — correct framing acknowledges the fork/drift and that reconverging
  them is an open task, not yet finished. The package itself is real, public,
  and installable (`npx agentic-content-pipeline setup --harness claude` per
  its own README, confirmed live 2026-07-15) — it's fine to point readers at
  it and describe it as "the same design," just not as literally what's
  serving this blog today. Caught on the 2026-07-15 outline-stage review of
  `automate-blog-writing-with-ai-agents` (CTA beat, order 13) — re-check this
  claim on every future revision until TD-0038 actually ships.
- **Tone-gate register-detector point values confirmed exact**, verified
  identically in both `~/projects/agentic-content-pipeline/skills/human-tone/
  scripts/eval/tone-grader.ts` and build-aloud's own
  `.claude/skills/human-tone/scripts/eval/tone-grader.ts` (same weights in
  both, despite the drift noted above): dramatic inversions
  `Math.min(Math.max(0, count - 1) * 6, 18)` = first hit free, then +6 each,
  capped at 18; punch-fragment density `Math.min(Math.max(0, count - 10) * 1,
  6)` = first ten free, then +1 each, capped at 6; sales speak
  `Math.min(count * 5, 15)` = +5 each, no free allowance, capped at 15. A
  draft/outline stating these exact numbers is accurate — safe to cite without
  re-deriving from source each time.
- **Plateau-exit mechanic confirmed exact**, both outline-loop (SKILL.md
  ~line 205) and draft-loop (~line 245): "if this round's gate-finding count
  does not fall below the prior round's, apply this round's consolidated
  edits once more (step 3), then exit the loop instead of re-reviewing —
  don't burn the rest of the round-cap budget on a round that isn't
  shrinking." A draft/outline describing a plateau exit from round 2 onward
  (apply-once-more-then-exit if the gate count doesn't drop) is accurate.
- **Standing "10 to 15" disproven baseline figure recurred AGAIN, 2026-07-15
  outline revision (order 9, run-one failure story), after multiple prior
  revisions had already fixed it with the reconciled framing.** Outline text
  read "the tone bar had been set at 2 out of 100 while normal human prose
  scores 10 to 15 on density alone." Per the standing 2026-07-14 entry above,
  `human-tone/SKILL.md` states the measured human baseline is **aiScore ~2**
  (re-confirmed again 2026-07-15 via direct read, same wording), not 10-15 —
  use "dead level with the corpus's own measured human baseline... ordinary
  variance... was enough to trip it" instead. This is now confirmed to have
  regressed from a fixed state at least twice across this post's revision
  history (2026-07-14 and 2026-07-15) — keep checking this exact beat on
  every future pass regardless of how many prior passes were clean.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-15
  (this exact 13-paragraph outline, full rewrite) — clean pass, verdict
  PASS.** Full re-check against every standing landmine found nothing wrong:
  12-stage list correct order with assemble/commit as separate items; "most
  handed to an AI agent" (not "an AI agent running each one"); order-2 stays
  vague about the pre-redesign review layer, no exact count, no "single
  review pass"/"one cold reader"/"combined into one read" in any field; 12
  outline reviewers / 15 draft reviewers (all 15 named, grouped 5
  structural/5 craft/5 integrity), both round-capped at five (never three);
  tone gate folded into the draft-review-loop beat, not listed as its own
  stage; threshold "15 or above out of 100," banned-adds-100 framed as the
  internal pre-clamp mechanism; register-detector point values exact
  (dramatic inversions first free/+6/cap 18, punch-fragments first ten
  free/+1/cap 6, sales speak +5/cap 15); plateau-exit mechanic described
  correctly (round 2+, apply-once-more-then-exit); disposition classifier
  correct; order-9 run-one/run-two failure story uses the RECONCILED "dead
  level with the corpus's own measured human baseline" framing — the "10 to
  15" figure flagged as a fresh regression earlier the same day (entry
  above) is NOT present in this revision; numbers exact (42, 35 em-dashes,
  2,000 words, bar 2→15; 6→22; gate-count oscillation 10/5/7); Anthropic
  90.2% + all four elements + "June 2025" dated framing correct, no causal
  "because," no "NOT responsible for" gloss; Google Research 80.9%/"39 to 70
  percent" and Augment's "+81 percent/up to 70 percent worse" both correctly
  ranged with the confirmed-correct primary URL; Anthropic 4x/15x tokens
  correct; Google spam-policy paraphrased with no quotation marks, matching
  the live page; Rankability 83% kept with the directional caveat;
  security-kit "six sub-agents across eight phases" correct; Haiku-missed-a-
  backdoor Skills Marketplace analogy correct, past tense correct (source
  predates); model-tier claim (14 sonnet, 1 haiku on link-integrity)
  correct; the CTA (order 13) correctly applies the 2026-07-15 TD-0038
  caution — describes the published `agentic-content-pipeline` package as
  "the same design... extracted from this exact repo" with build-aloud
  explicitly still "mid-swap onto it, not fully there yet," never claiming
  present-tense parity ("this blog runs on that package"). No gate findings.
  **Newly verified this pass:** (1) the outline-builder and editor each
  having their own dated memory ledger is confirmed accurate —
  `.claude/skills/content-pipeline/SKILL.md` line 113: "`outline-builder`
  (Step 4.5) and `editor` (the Edit step in Steps 4.6 and 6) are ad hoc
  dispatches with no dedicated agent file... seed
  `.claude/agent-memory/outline-builder/MEMORY.md` and
  `.claude/agent-memory/editor/MEMORY.md` explicitly." (2) The
  `agentic-content-pipeline` GitHub repo and its README were re-confirmed
  live 2026-07-15 via WebFetch: install command `npx agentic-content-pipeline
  setup --harness claude` (or `--harness codex`), dropping `--harness`
  dispatches agents "from reference files, fully functional" (a fair gloss
  as "prompt-file dispatch"), 12/15 reviewer counts confirmed in the
  README's own text, and the Provenance section states verbatim "this
  package is a point-in-time fork, not a live mirror" — directly supports
  the outline's "mid-swap onto it, not fully there yet" framing. Two
  elevations offered (not gate findings): (1) order 10 still cites "June
  2025" rather than Anthropic's exact publish date (June 13, 2025); (2)
  order 6's Haiku-backdoor recap drops the exposure-score jump (1.75 → 5.65)
  and shim path (`~/.codex/bin/codex`) that made the miss/catch contrast
  concrete in earlier revisions — worth restoring for sharper credibility.
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-15
  (this exact 13-paragraph outline, order-3 "most handed to an AI agent"
  wording) — clean pass, verdict PASS, zero gate findings.** Re-verified
  several load-bearing facts directly against source rather than memory
  alone: (1) GitHub URL `https://github.com/buildaloud/agentic-content-pipeline`
  confirmed exact via `~/projects/agentic-content-pipeline/package.json`
  `repository.url` field (stronger than a WebFetch — this is the actual repo
  metadata); (2) tone-grader.ts register-detector formulas re-confirmed by
  direct read of `.claude/skills/human-tone/scripts/eval/tone-grader.ts`:
  `dramaticInversions` = `Math.min(Math.max(0, count-1)*6, 18)`,
  `punchFragments` = `Math.min(Math.max(0, count-10)*1, 6)`, `salesSpeak` =
  `Math.min(count*5, 15)`, `bannedHits.length*100` uncapped internal add,
  reported `aiScore = Math.round(Math.min(score,100))` — all match the
  outline's stated numbers exactly; (3) mandatory gate trigger
  `banned > 0 OR aiScore >= 15` re-confirmed verbatim at
  `.claude/skills/content-pipeline/SKILL.md` line 229; (4) the 12-stage
  canonical list re-mapped directly against SKILL.md's own step headings:
  1 (Gather Context), 2 (Topic-Approval Gate), 3 (SEO Research), 4 (Brief),
  4.5 (Outline), 4.6 (Outline Review Loop), 5 (Draft), 6 (Draft Review Loop),
  8 (Hero Image — no step 7, tone gate lives inside step 6), 9 (Structured
  Summary), 10 (Assemble), 12 (Build and Commit) = 12 counted steps; 10.5
  (Score & Schedule), 11 (Bookkeeping), 11.5 (Capture product-learnings), and
  11.7 (Learn) are the uncounted padding, confirmed by their own step
  numbers, not just prose description; (5) TD-0038 re-confirmed **still
  open, all checkboxes unchecked** via direct read of
  `tickets/TD-0038-switch-build-aloud-onto-agentic-content-pipeline.md` —
  the outline's CTA (order 13) correctly avoids present-tense parity
  ("build-aloud itself is still finishing its own swap onto the published
  version"), matching the standing caution. All other standing landmines
  held clean on this revision: assemble/commit listed as separate items;
  order-2 pre-redesign layer stays unquantified; 12 outline reviewers/15
  draft reviewers (all 15 named, grouped 5/5/5) both round-capped at five
  (re-confirmed exact at SKILL.md lines 199 and 238, "round cap 5" in both
  loops); run-one/run-two numbers exact using the reconciled "dead level
  with the corpus's own measured human baseline" framing (no "10 to 15"
  regression); Anthropic 90.2%/four-elements/June-2025 framing, Google
  Research 80.9%/"39 to 70 percent", Augment's "+81 percent/up to 70
  percent", Anthropic 4x/15x tokens, Rankability 83% with directional
  caveat, and the Google spam-policy paraphrase (no quote marks) all
  correct and unchanged from the prior 2026-07-15 clean pass. Two
  elevations re-offered (not gate findings, same two as the immediately
  prior pass — neither has been incorporated yet across two consecutive
  outline revisions): (1) order 10's Anthropic dated-framing sentence
  still says "June 2025," not the exact June 13, 2025 publish date; (2)
  order 6's Haiku-backdoor recap still doesn't restore the exposure-score
  jump (1.75 → 5.65) or shim path (`~/.codex/bin/codex`).
- **`automate-blog-writing-with-ai-agents` — OUTLINE-stage review 2026-07-15
  (this exact 13-paragraph outline, third consecutive clean pass on the same
  content) — verdict PASS, zero gate findings.** Re-checked every standing
  landmine on this post one more time and found nothing new: 12-stage list
  correct order with assemble/commit as explicitly separate items; order-2
  heading reads "Twelve stages, most handed to an AI agent" (not "an AI agent
  running each one"); order-3 correction beat states "eight stages with seven
  agents" for the earlier version of this post and never quantifies the
  pre-redesign review layer or calls it "one review pass"/"single pass"/
  "combined into one read"; 12 outline reviewers/15 draft reviewers (all 15
  named, grouped 5 structural/5 craft/5 integrity), both round-capped at five,
  never three; tone gate folded into the draft-review-loop beat (order 8), not
  a separate stage; threshold "15 or above out of 100," banned-adds-100 framed
  as the internal pre-clamp mechanism; register-detector values exact
  (dramatic inversions first free/+6/cap 18, punch-fragments first ten
  free/+1/cap 6, sales speak +5/cap 15); plateau-exit mechanic (round 2+,
  apply-once-more-then-exit) and the deterministic disposition classifier
  both described correctly; order-9 run-one/run-two story uses the
  RECONCILED "dead level with the corpus's own measured human baseline"
  framing, NOT the disproven "10 to 15" figure, with numbers exact (42, 35
  em-dashes, 2,000 words, bar 2→15; 6→22; gate-count oscillation 10/5/7);
  Anthropic 90.2%/all-four-elements/June-2025 framing correct, no causal
  "because," no "NOT responsible for" gloss; Google Research 80.9%/"39 to 70
  percent" and Augment's "+81 percent/up to 70 percent" both correctly ranged
  with the confirmed-correct primary URL; Anthropic 4x/15x tokens correct;
  Google spam-policy paraphrased with no quotation marks, matching the live
  page; Rankability 83% kept with the directional caveat; security-kit "six
  sub-agents across eight phases" correct; Haiku-missed-a-backdoor Skills
  Marketplace analogy correct, past tense correct; model-tier claim (14
  sonnet, 1 haiku on link-integrity) correct; CTA (order 13) correctly applies
  the TD-0038 caution — package described as "the same design... extracted
  from this exact repo," build-aloud "still finishing its own swap onto the
  published version," and explicitly hedges that the tone gate's three newest
  register detectors haven't landed in the package yet (matches TD-0038's
  detector-parity gap, not just the operational mid-swap gap). No gate
  findings. The same two elevations remain open, unaddressed across three
  consecutive revisions now: (1) order 10 still says "June 2025" rather than
  Anthropic's exact June 13, 2025 publish date; (2) order 6's Haiku-backdoor
  recap still omits the exposure-score jump (1.75 → 5.65) and shim path
  (`~/.codex/bin/codex`).
- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check, 2026-07-15
  (this exact rendering: "Decision one/two/three" H2 pattern, "This post broke
  the machine that wrote it" as its own H2, opening "Publishing this post
  takes twelve pipeline stages...").** Zero gate findings, verdict PASS. Full
  line-by-line check against every standing landmine for this post: 12-stage
  numbered list correct order with assemble/commit as separate items (11/12);
  "twelve stages, most handed to an AI agent" heading (not "an agent running
  each one"); "by default" hedge present on the topic-gate/no-human-downstream
  claim ("Past that one topic gate, I'm out of the room by default until the
  post is live"); order-3 stale-description correction ("eight stages with
  seven agents" for the earlier version, no exact count or "single pass" for
  the pre-redesign layer) folded into the same section as order 2 (no separate
  H2, a structure note not a fact issue); 12 outline reviewers / 15 draft
  reviewers (all 15 named, grouped 5 structural/5 craft/5 integrity), both
  round-capped at five; tone gate folded into the draft-review-loop list item,
  not its own stage; register detectors named without inventing point values;
  plateau-exit and disposition-classifier mechanics both correct; threshold
  "15 or above out of 100," banned-adds-100 framed as the internal pre-clamp
  mechanism; model-tier claim (14 sonnet, 1 haiku on link-integrity) correct;
  link-integrity described as "mostly binary," not "no judgment call"; Skills
  Marketplace Haiku-backdoor story used only as evidence in the model-tier
  beat, never as a CTA pitch; run-one/run-two story uses the RECONCILED "dead
  level with the corpus's own measured human baseline" framing (no "10 to 15"
  regression), numbers exact (42, 35 em-dashes, 2,000 words, bar 2→15; 6→22;
  gate-count oscillation 10/5/7), and the make-ai-writing-sound-human link is
  threaded onto the bar-2-to-15 detail specifically, not a bare see-also;
  Anthropic 90.2%/four-elements ("research the semiconductor shortage" example
  paraphrase confirmed accurate)/June-2025 dated framing, no causal "because,"
  no "NOT responsible for" gloss; Google Research 80.9%/"39 to 70 percent" and
  Augment's "+81 percent/up to 70 percent," both correctly ranged, correct
  primary URL (the `...when-and-why-agent-systems-work/` suffix) used both
  inline and in the Sources footer; Anthropic 4x/15x tokens correct; Google
  spam-policy paraphrased with no quote marks, generative AI framed as inside
  the same scaled-content-abuse section (not "separately named"); Rankability
  83% kept with the directional caveat; security-kit "six sub-agents across
  eight phases" correct; CTA (order 13) correctly applies the TD-0038 caution
  — package described as "the same design... extracted from this exact repo,"
  Build Aloud "still finishing its own swap," and explicitly hedges that the
  tone gate's three newest register detectors haven't landed in the package
  yet; setup command and GitHub URL both exact; every internal link's tense
  checked against its real pubDate, all correct, no regression on the
  historical link-tense bug. **Two elevations re-offered, still unaddressed
  across many consecutive revisions:** (1) "June 2025" instead of Anthropic's
  exact June 13, 2025 publish date; (2) the Haiku-backdoor recap still omits
  the exposure-score jump (1.75 → 5.65) and shim path (`~/.codex/bin/codex`).
- **NEW 2026-07-15 (DRAFT-stage fact-check): "1.75 out of 10 on exposure" is a
  wrong-fact regression — AST v1.0 exposure is a 0-100 scale, not out of 10.**
  Confirmed via direct read of `src/content/blog/2026-02-22-we-rewrote-the-
  security-scoring-here-s-why.md`: "each audit now produces three numeric
  scores on a 0–100 scale" combining into a single Overall Exposure number
  (example: "a powerful-but-honest file manager... gets around 4.6," "credential
  exfiltration gets an overall exposure around 80" — both read naturally on a
  0-100 scale, not 0-10). The prior elevation asking the Haiku-backdoor recap to
  restore the exposure-score jump (1.75 → 5.65) and shim path has now been
  incorporated (good), but this revision paired the restored number with an
  invented denominator: "Haiku scored a skill 1.75 out of 10 on exposure." No
  prior "clean pass" entry for this post ever approved an "out of 10" framing —
  every previously-confirmed revision states the bare number ("1.75 exposure" /
  "1.75/1 finding to 5.65/4 findings"), so this is a fresh error, not a
  recurrence. Fix: drop "out of 10" — "Haiku scored a skill 1.75 on exposure."
  If a draft wants an explicit scale reference, "out of 100" is the accurate
  one, but the bare number matches this post's own prior approved phrasing.
  Watch for "out of 10" specifically recurring on this beat in future revisions,
  same as the "10 to 15" baseline landmine — add it to the standing checklist
  for this post's Haiku-backdoor analogy.

## /stats/ dark dashboard — implementation facts (verified 2026-07-15 against source)
- **Colors, confirmed exact in `src/styles/global.css`:** background `#0c0e12`
  (`--ink-900`), panels `#13161c` (`--ink-800`), mint accent `#a3f7bf`
  (`--mint`), text `#e8e6e1` (`--paper`, "light grey" is a fair description).
  Chart series colors: green `#1ea855` (`--series-green`) mapped to
  `--color-series-views`; blue `#4c78dd` (`--series-blue`) mapped to BOTH
  `--color-series-sessions` and `--color-series-search` — i.e. one blue does
  double duty for sessions and search, not two different blues. Comment in
  the CSS itself: "Dataviz series colors only — never used for
  chrome/borders/labels (those stay --mint)" — confirms mint is chrome-only
  by design, backing the "brand mint stays chrome-only" claim.
- **Fonts, confirmed exact in `src/styles/global.css`:** `--font-display:
  'Instrument Serif', Georgia, serif` (hero numbers), `--font-mono:
  'JetBrains Mono', 'Fira Code', monospace` (grid/labels/panel headers).
- **Panel top-border is 2px, NOT "one pixel."** Every chart-panel and the
  BlogPost telemetry panel use `border-top: 2px solid var(--color-accent)`
  (confirmed via grep across `src/pages/stats.astro`, `src/layouts/
  BlogPost.astro`, `src/components/HomeScorecard.astro`, and all five
  `src/components/charts/*.astro` files — all consistently 2px, none 1px).
  **The currently-LIVE `2026-07-14-dark-dashboard-design.md` post itself
  already states this wrong** ("one pixel of color along the top edge") —
  this is a pre-existing error being carried forward, not a new one. Flag
  "one pixel" / "one-pixel" describing this border as a wrong-fact gate
  finding; correct wording is "two pixels" or just "a thin mint top border"
  (drop the pixel count rather than get it wrong).
- **The `//`-prefix "code comment" label style is a PANEL-LEVEL section
  label, not applied per individual metric.** Confirmed via direct read of
  every chart component + `PostStats.astro` + `BlogPost.astro` +
  `stats.astro`: real panel-level labels are `// telemetry`, `// targeting`,
  `// traffic (28d)`, `// search (28d)`, `// by surface (weekly)`, `// where
  traffic comes from (28d)`, `// what people search (28d)`, `// site vitals
  (28d)...`, `// posts only (28d)`. Individual metric names inside a panel
  (impressions, avg pos, clicks, ctr, comments, views, sessions, etc.) render
  in uppercase mono via CSS `text-transform: uppercase` on `.tele-grid dt`,
  but **do NOT carry their own `//` prefix** — grepped the whole `src/` tree
  for `IMPRESSIONS`/`AVG POSITION` and found no component that renders `//
  IMPRESSIONS` or `// AVG POSITION` literally anywhere. **The currently-LIVE
  post already states this wrong** ("a label set in mono, prefixed with //
  ... // IMPRESSIONS. // AVG POSITION.") — pre-existing error, not new. Any
  outline/draft describing individual metric labels (not panel headers) as
  `//`-prefixed, especially using the specific examples "// IMPRESSIONS" or
  "// AVG POSITION," is a wrong-fact gate finding. Correct framing: cite an
  actual panel-level label like `// telemetry` or `// traffic (28d)` as the
  `//`-comment example, and describe metric names separately as uppercase
  mono (no `//`).
- **Chart inventory confirmed real and matches component names:**
  `TrafficChart.astro` (28-day two-series line, page views + sessions, "//
  traffic (28d)"), `SearchPanel.astro` (two small multiples — impressions
  line + clicks bars, "// search (28d)", explicitly "never a dual-axis
  chart" per its own source comment), `SurfacePanel.astro` (weekly bars per
  product/surface, "// by surface (weekly)"), `Sparkline.astro` (per-post,
  wired into `PostStats.astro`'s hero number), `TrafficSourcesPanel.astro`
  (organic/direct/referral split + top-8 source table, "// where traffic
  comes from (28d)"), `TopQueriesPanel.astro` (top-10 query table, "// what
  people search (28d)"). All render server-side as SVG at build time (Astro
  components with math in a shared, unit-tested `chart-math.ts`); a few add
  a small client-side `<script>` for hover tooltips/crosshair only — this
  doesn't contradict a "build-time SVG" framing but a claim of "no client-
  side code at all" would be too strong.
- **giscus comments confirmed real**: `src/layouts/BlogPost.astro` loads
  `https://giscus.app/client.js`; `PostStats.astro` reads a `comments` field
  and links to `/blog/{slug}/#comments` when count > 0.
- **External sources for the dark-dashboard post, all confirmed live
  2026-07-15:**
  [wendyzhou.se/blog/dark-dashboard-ui-design-inspiration](https://wendyzhou.se/blog/dark-dashboard-ui-design-inspiration/)
  confirms "Dark grey (and not 100% black) backgrounds," "A dark background
  color combined with slightly lighter cards," "Light grey (and not 100%
  white) text," and "Graphs that contain mostly grey data points, except for
  one or a few strongly coloured data points" — supports the color-discipline
  claims as paraphrase (no exact quote marks needed).
  [nngroup.com/articles/empty-state-interface-design](https://www.nngroup.com/articles/empty-state-interface-design/)
  confirms the loading-vs-empty-state trust-cost claim: "Inaccurate
  system-status messages for empty states are particularly harmful...
  develop a severe distrust of and distaste for the application," with a
  worked example of a "No records" message flashing before real content
  loads.
  [datawrapper.de/blog/fonts-for-data-visualization](https://www.datawrapper.de/blog/fonts-for-data-visualization)
  confirms tabular figures verbatim: "a 124.17 will be the same length as a
  680.90, but shorter than a 1,111.17" — supports the exact 124.17/680.90
  example used in the post.
- **`2026-07-14-dark-dashboard-design` — OUTLINE-stage review 2026-07-15
  found two wrong-fact gate findings (both pre-existing errors carried over
  from the currently-live post, not newly introduced): the "one pixel" top-
  border width (actually 2px) and the "// IMPRESSIONS, // AVG POSITION"
  per-metric label claim (the `//` prefix is real but only at the panel-
  section-header level, e.g. "// telemetry" / "// traffic (28d)" — no
  component prefixes an individual metric name with `//`). Every other fact
  in the outline (hex colors, font names, chart inventory, series colors,
  giscus, all three external sources) checked out clean against direct
  reads of `src/styles/global.css`, `src/pages/stats.astro`,
  `src/components/charts/*.astro`, `src/components/PostStats.astro`,
  `src/layouts/BlogPost.astro`, and live fetches of the three cited sources.
  Watch for these same two errors recurring on future revisions of this
  post, since they're baked into the currently-published version and could
  get copy-pasted forward again.
- **`2026-07-14-dark-dashboard-design` — OUTLINE-stage re-review 2026-07-15,
  full rewrite pass.** Both previously-flagged errors are FIXED in this
  outline: top border correctly stated as "two pixels" (orders 4 and 8), and
  the `//`-prefix examples correctly scoped to panel-level labels ("//
  telemetry", "// traffic (28d)") with metric names described separately as
  uppercase mono with no `//` prefix (order 8). New gate finding this pass:
  order 6's chart-color beat asserts the green/blue series palette
  (`#1ea855`/`#4c78dd`) was "deliberately avoiding the red/green pairing that
  trips up the most common color vision deficiencies" — grepped the whole
  `src/` tree for "colorblind"/"color vision"/"deuteranop"/"protanop" and
  found NO code comment or doc stating colorblind-accessibility as the reason
  those two colors were picked (the only real comment found, "Dataviz series
  colors only — never used for chrome/borders/labels," is about mint scoping,
  not accessibility intent). The underlying fact (green+blue avoids the
  red/green pairing that's hardest for the most common color vision
  deficiencies) is true as general knowledge, but asserting it as the
  *documented reason Scout chose these colors* is an unverified claim about
  our own project's design intent — same category as past caught issues
  (asserting unconfirmed motivations/reasoning as fact). Fix: drop
  "deliberately" and reframe as an observed side-benefit, not a stated original
  reason, unless a future code comment documents the actual intent. Also
  re-confirmed independently this pass: Datawrapper's page explicitly
  recommends tabular figures inside an ordinary proportional font as its
  *default*, with full monospace treated as a rare stylistic exception (fetched
  2026-07-15) — supports the outline's "though its own default recommendation
  there is tabular figures inside an ordinary proportional font, not full
  monospace" framing at order 5. Also re-confirmed the NOT YET / GATHERING
  SIGNAL scorecard claim in order 7 against the live text of
  `2026-07-09-how-to-measure-blog-seo.md`: "Most posts show NOT YET. A
  handful show GATHERING SIGNAL" — matches the outline's "most of its tiles
  currently read NOT YET, with a handful reading GATHERING SIGNAL" exactly;
  that post's pubDate (2026-07-09) predates this one's (2026-07-14), so the
  past-tense internal link is correctly ordered. Wendy Zhou's muted-data/
  reserved-accent guidance ("Graphs that contain mostly grey data points,
  except for one or a few strongly coloured data points") re-confirmed live
  2026-07-15, supporting order 4's "keeping most data muted with strong color
  reserved for the few numbers that matter" claim.

- **Mint (`--color-accent`, `#a3f7bf`) is NOT scoped to "a two-pixel top
  border and nowhere else" — that absolute claim is FALSE.** Confirmed via a
  full-tree grep of `var(--color-accent)` across `src/`: beyond the 2px panel
  top-border, mint also renders as the pulsing "ranking hit" status dot AND
  status text color (`PostStats.astro` `.tele-signal--hit`/`.tele-dot`,
  `HomeScorecard.astro` `.sc-status--hit`), link-hover colors (`.stats-table
  a:hover`, `.tele-comments-link:hover`), and focus-visible outlines
  (`.control-input:focus-visible`) — all on/around `/stats/` itself, plus
  extensive use site-wide (Header, Footer, BlogPost, index, projects pages).
  **The claim that IS true and safe to make:** mint never highlights an
  individual metric NUMBER — every metric value (`.tele-grid dd`, `.tele-num`,
  `.rollup-value`) renders in `--color-text` (`--paper` `#e8e6e1`, fair to call
  "light grey"), never mint, confirmed via direct read of every relevant
  component. A CSS comment in `global.css` ("Dataviz series colors only —
  never used for chrome/borders/labels, those stay --mint") is about chart
  SERIES colors never being mint, not about mint being scoped to nothing but
  the top border. **Gate finding, caught 2026-07-15 on the `dark-dashboard-
  design` outline rewrite** (order 4's `intendedBeat`: "mint #a3f7bf shows up
  as a two-pixel top border on every panel and nowhere else"). Correct
  framing: mint is chrome/status-only and never touches a data point/metric
  number — do NOT claim it appears nowhere else on the page or site; the
  live-pulse ranking-hit dot is the notable exception worth naming rather than
  denying.
- **`TrafficSourcesPanel`'s `organicSplit` type has FOUR keys, not three: `{
  organic, direct, referral, other }`.** Confirmed via direct read of
  `src/components/charts/TrafficSourcesPanel.astro` (type `OrganicSplit`,
  `SEGMENT_COLOR` map, and the split-bar/legend rendering all four segments,
  including an aria-label listing "organic, direct, referral, and other
  sources"). Earlier memory entries describing this as an "organic/direct/
  referral split" (three-way) were incomplete — correct framing is
  "organic/direct/referral/other split." Caught 2026-07-15 on the
  `dark-dashboard-design` outline rewrite (order 6's `facts` bullet dropped
  "/other" while the same beat's `intendedBeat` had it right) — gate finding
  for the inconsistency/undercount.
- **`2026-07-14-dark-dashboard-design` full-rewrite OUTLINE reviewed
  2026-07-15 (this exact revision).** Both previously-flagged landmines
  stayed fixed (2px top border stated correctly at orders 4/7/8; `//`-prefix
  scoped correctly to panel-level labels only at order 7; the color-vision
  claim uses "also happens to sidestep," not "deliberately," at order 6). Two
  NEW gate findings this pass (both above): the "mint... and nowhere else"
  overclaim at order 4, and the "organic/direct/referral" (missing "/other")
  undercount at order 6. Every hex code, font name, chart-inventory item, the
  124.17/680.90 Datawrapper example, the NOT YET/GATHERING SIGNAL scorecard
  cross-post claim, and all three external source URLs/paraphrases checked
  clean.
- **`2026-07-14-dark-dashboard-design` — OUTLINE re-review 2026-07-15,
  NEXT revision (both prior gate findings fixed, one NEW quote-verbatim
  finding).** The mint "nowhere else" overclaim (order 4) is now correctly
  scoped to /stats/ and names the live-pulse ranking-hit dot as the one named
  exception ("the only other place it shows up on /stats/ is a live pulse —
  the dot that glows mint next to a post that's actually ranking") — matches
  the prescribed fix. The traffic-sources split (order 6) now lists all four
  segments ("organic/direct/referral/other") in both `intendedBeat` and
  `facts`. **NEW gate finding, confirmed via direct fetch of
  [nngroup.com/articles/empty-state-interface-design](https://www.nngroup.com/articles/empty-state-interface-design/)
  2026-07-15:** order 8's `intendedBeat` puts **"no data"** in quotation marks
  as if it's NN/g's own phrase ("showing 'no data' on a panel where a
  temporary state gets reported as a permanent fact"). The source's actual
  verbatim worked example is **"No records"**, not "no data" — "no data" does
  not appear in the article. The outline's own next clause already gets this
  right ("NN/g's own worked example is a page that flashes 'No records'
  before the real content finishes loading"), so only "No records" should
  carry quote marks; drop the quote marks around "no data" (or replace with
  the exact "No records" phrase) per the standing quotes-must-be-verbatim
  caution. Everything else in this beat checked clean: the trust-cost framing
  ("destroys trust in an interface") matches NN/g's own language ("develop a
  severe distrust of and distaste for the application" / "particularly
  harmful"), and the loading-vs-empty distinction is accurately paraphrased.
  All other standing facts for this post held (hex codes, font names, chart
  inventory, Datawrapper 124.17/680.90 example and default-recommendation
  framing, NOT YET/GATHERING SIGNAL scorecard cross-post claim with correct
  pubDate ordering, Wendy Zhou muted-data guidance, giscus). One elevation
  offered (not gate): "the only other place it shows up on /stats/ is a live
  pulse" is still an absolute completeness claim — mint also tints link-hover
  states and focus-visible outlines within /stats/ (`.stats-table a:hover`,
  `.tele-comments-link:hover`, `.control-input:focus-visible`), so "only"
  slightly overclaims; softening to "the one other place worth calling out"
  would be more precise without losing the point.
- **`2026-07-14-dark-dashboard-design` — OUTLINE re-review 2026-07-15, THIS
  revision (all prior gate findings held fixed, ONE NEW gate finding).**
  Confirmed still-fixed: order 4 uses "the one other place worth calling
  out" (softened per the prior elevation, no longer "the only other
  place"); order 6 lists all four traffic-source segments
  ("organic/direct/referral/other split") in both `intendedBeat` and
  `facts`; order 8's `intendedBeat` no longer puts quote marks around "no
  data" (only "No records" — NN/g's actual worked example — is quoted);
  top border stated as "two pixels" throughout; `//`-prefix examples
  correctly scoped to panel-level labels only ("// traffic (28d)", "//
  search (28d)"), with "// telemetry" correctly carved out as the
  page-level header, not a panel example. **NEW gate finding:** order 6's
  `ourTake` states "No hover tooltips, no zoom — just static SVG a reader
  can trust without touching it." This is FALSE — confirmed via direct read
  of `TrafficChart.astro` and `SearchPanel.astro`: both wire a
  `mouseenter`/`mouseleave` listener on each data point (`.hit-rect` /
  `.click-bar`) that shows a `.chart-tooltip` with the exact date + value(s)
  and, for the traffic chart, moves a crosshair line — real hover
  interactivity exists on at least two of the five chart components. This
  directly contradicts order 6's own `gateGuidance`, which already warns
  "'Build-time SVG' is the implementation claim — make no claims about
  client-side rendering or interactivity" — the `ourTake` text violates
  guidance sitting right next to it in the same outline paragraph. Fix:
  drop "No hover tooltips, no zoom" and describe what's actually true —
  the SVG geometry is drawn once at build time from real numbers; hovering
  a point surfaces the exact value already baked into that point (no live
  fetch, no zoom/pan). This is now the THIRD distinct wrong-fact this post
  has carried about its own chart/panel behavior across revisions (after
  the fixed "one pixel" border and the fixed "// IMPRESSIONS" per-metric
  label) — worth an explicit interactivity check on every future revision
  of this post's chart-inventory beat, since "static SVG" language keeps
  drifting toward "non-interactive" language that isn't quite true.
  **Reconsidered, NOT a gate finding:** order 4's "It never touches a data
  point: metric numbers stay a neutral off-white whether a post is crushing
  it or reads zero" is accurate as scoped to the `.tele-grid dd` /
  `.tele-num` / `.rollup-value` metric-value elements (per the standing
  entry above, re-confirmed) — but the live-ranking STATUS LINE itself
  (`PostStats.astro` `.tele-signal--hit`, e.g. `ranking for "X" · avg
  #1.2`) also turns mint on a hit, and that sentence has a number embedded
  in it (the avg position). The outline's claim is defensible because it's
  about metric-*grid* values specifically (which never lie), not about
  every number-bearing string anywhere on the page — but a future draft
  that phrases this more absolutely ("mint never touches a number,
  anywhere") would cross into overclaim. Elevation, not gate: name the
  status-line's embedded number as a second exception alongside the dot,
  for full precision.
- **Exact empty-state label strings per chart component, confirmed 2026-07-15
  via direct read (all use `EmptyPanel.astro`, which prefixes every label with
  "gathering signal — "):** `TrafficChart.astro` → "gathering signal — not
  enough traffic data yet"; `SearchPanel.astro` → "gathering signal — not
  enough search data yet"; `SurfacePanel.astro` → "gathering signal — not
  enough surface data yet"; `TrafficSourcesPanel.astro` → "gathering signal —
  no traffic-source data yet"; `TopQueriesPanel.astro` → "gathering signal —
  no queries ranking yet". `HomeScorecard.astro` and `PostStats.astro`'s
  `insufficient-data` state both use "gathering signal — not enough search
  data yet" (search-scoped, matching the home scorecard's own tone). The five
  chart-panel components share the "gathering signal —" PREFIX but each has a
  different suffix — a draft saying they "all use that exact wording"
  (meaning the "gathering signal" phrase itself, not the full label incl.
  suffix) is accurate; a draft claiming the five panels render an IDENTICAL
  full string would not be. `Sparkline.astro` (the per-post component, wired
  into `PostStats.astro`'s hero) is the one outlier with genuinely different
  wording: plain `"no signal yet"`, no "gathering signal" prefix at all —
  confirmed exact via direct read.
- **`2026-07-14-dark-dashboard-design` — DRAFT-stage fact-check pass confirmed
  clean 2026-07-15** (full-rewrite draft, checked against the paragraph-level
  outline guidance). Zero gate findings — every standing landmine for this
  post held fixed: 2px top border (not "one pixel"); `//`-prefix scoped to
  panel-level labels only (`// traffic (28d)`, `// search (28d)`), no
  per-metric `// IMPRESSIONS` claim; color-vision claim uses "also happens to
  sidestep," not "deliberately"; mint scoped to chrome with "the one other
  place worth calling out" (not an absolute "nowhere else"), live-pulse dot
  named as the exception; traffic-sources split lists all four segments
  (organic/direct/referral/other); NN/g's "No records" is the only quoted
  phrase (no stray quote marks around "no data"); chart interactivity
  correctly described (hover tooltips exist, no false "no hover tooltips"
  claim); the five-panel "gathering signal" wording vs. the sparkline's
  distinct "no signal yet" wording both correctly scoped (see entry above);
  both protected lines present near-verbatim ("If fuel runs low, the needle
  doesn't ease toward the middle to soften the blow" and "Lie once on a
  dashboard and every other number on it stops being trusted too"); hex codes
  (#0c0e12/#13161c/#a3f7bf/#1ea855/#4c78dd) and font names (Instrument Serif,
  JetBrains Mono) all exact; Wendy Zhou, NN/g, and Datawrapper paraphrases all
  match their live sources with no misattributed quotes; internal links
  (`/stats/`, `2026-07-09-how-to-measure-blog-seo`,
  `2026-02-21-wiring-up-the-machine`) all correctly past-tense-ordered against
  real pubDates. **One elevation offered (not gate), carried forward from the
  prior outline pass:** the status-line embedded number (avg position) as a
  second mint-touches-a-number exception alongside the dot. **New elevation
  offered:** the `wiring-up-the-machine` link (2026-02-21, newsletter/
  comments/nav infra, no chart-building content) is cited as "the same
  infrastructure push that first wired up this blog" for the SVG-chart
  claim — true in the loose sense of "the same ongoing blog-infra effort" but
  worth softening since that specific post never covered chart/SVG work; no
  better-matching post exists to link instead (checked: no post covers
  `chart-math`/SVG chart build specifically).
- **NN/g "pull revelation" is a DIFFERENT technique than "point users toward
  the action that closes an empty-state gap."** Confirmed via direct fetch
  2026-07-15 of
  [nngroup.com/articles/empty-state-interface-design](https://www.nngroup.com/articles/empty-state-interface-design/):
  "pull revelations" (section "Use Empty States to Provide Learning Cues")
  are contextual help messages that surface only on user interaction,
  verbatim: "These help messages are sometimes called pull revelations
  because they show up only when the user interacts with the corresponding
  UI element and they are not 'pushed' in any obtrusive or interruptive way."
  The actual NN/g guidance for pointing a user toward an action that resolves
  an empty state lives in a SEPARATE section, "Use Empty States to Provide
  Direct Pathways for Key Tasks," which recommends "brief yet explicit
  instructions or, better yet, link[ing] directly to the steps that need to
  be taken." A draft that names "pull revelation" as the term for
  action-toward-resolution guidance is misattributing the wrong NN/g concept
  to the right idea — fetched-source-doesn't-support-the-claim, a gate
  finding. Fix: either drop the named term and describe the behavior
  generically ("a direct pathway to the action that closes the gap"), or cite
  the correct section name ("Direct Pathways for Key Tasks"). Caught
  2026-07-15 on a `2026-07-14-dark-dashboard-design` draft-stage pass.
- **Red/green color-blindness claim needs its own citation — it was sourced
  in one revision, then the citation silently dropped in a later one.**
  [webaim.org/articles/visual/colorblind](https://webaim.org/articles/visual/colorblind/)
  confirms verbatim "red-green deficiencies are the most common [form of
  color-blindness]," and an earlier `dark-dashboard-design` revision cited it
  inline for the "sidesteps red and green, the combination that trips up the
  most common form of color blindness" claim (see entry below, 2026-07-15).
  A later revision reviewed the same day dropped that inline citation while
  keeping the claim — flag any revision of this claim with no inline source
  link as unsourced, even though a prior pass fixed it; this specific claim
  has now regressed at least once.
- **`2026-07-14-dark-dashboard-design` — DRAFT-stage fact-check re-pass
  confirmed clean 2026-07-15 (this exact revision).** Zero gate findings.
  Every standing landmine held (2px border, panel-level-only `//` labels,
  "also happens to sidestep" color-vision framing, mint scoped with "one
  other place" not absolute, four-segment traffic-source split, "No
  records" the only quoted NN/g phrase, hover-tooltip described accurately
  and scoped to the traffic/search charts specifically, five-panel
  "gathering signal" prefix vs. sparkline's distinct "no signal yet" both
  correctly scoped, both protected flare lines verbatim). This revision also
  fixed the earlier "never once touches a data point" overclaim flagged as
  an elevation — it now explicitly names the ranking status line's embedded
  avg-position number as the second mint-touches-a-number exception
  alongside the dot ("its status line goes mint end to end: dot and label
  both, average position number included... The ranking flag is the one
  exception, and it's a status, not a metric"). **New source added this
  revision, verified live:**
  [webaim.org/articles/visual/colorblind/](https://webaim.org/articles/visual/colorblind/)
  confirms verbatim "red-green deficiencies are the most common [form of
  color-blindness]" — supports the post's "sidesteps red and green, the
  combination that trips up the most common form of color blindness" claim.
  Cited inline via markdown link but NOT added to the closing Sources
  footer (the other three external sources — Wendy Zhou, NN/g, Datawrapper —
  all are). Not a fact-accuracy gate finding (the claim is sourced and
  supported), but worth adding to the footer for consistency — flagged as an
  elevation.
- **`2026-07-14-dark-dashboard-design` — DRAFT-stage fact-check pass 2026-07-15
  (DRAFT REVIEW loop, this exact revision): the WebAIM color-blindness
  citation has REGRESSED AGAIN — third occurrence of this exact bug.** The
  "sidesteps red and green, the combination that trips up the most common
  form of color blindness" claim appears with NO inline citation and NO
  Sources-footer entry at all (worse than the prior regression, which at
  least kept the inline link and only dropped the footer entry). Gate
  finding issued: add `[the combination that trips up the most common form
  of color blindness](https://webaim.org/articles/visual/colorblind/)` inline
  and add `- [WebAIM: Visual Disabilities — Color Blindness](https://webaim.org/articles/visual/colorblind/)`
  to the Sources footer. Every other standing landmine for this post held
  clean on this pass: 2px border, panel-level-only `//` labels, mint scoped
  correctly (one other place = live-pulse dot + status-line avg-position
  number, not an absolute "nowhere else"; the "never once touches a data
  point" overclaim tail is simply omitted rather than qualified, which is a
  valid fix too), four-segment traffic-source split, "No records" the only
  quoted NN/g phrase, hover-tooltip described accurately and scoped to
  traffic/search charts, five-panel "gathering signal" prefix vs. sparkline's
  distinct "no signal yet" both correctly scoped, both protected flare lines
  verbatim, all hex codes and font names exact, Wendy Zhou/Datawrapper/NN/g
  paraphrases all match live sources, internal link pubDate ordering correct
  (how-to-measure-blog-seo 07-09 and wiring-up-the-machine 02-21 both predate
  07-14; the wiring-up-the-machine reference is phrased as "new work built
  after" that round of plumbing, not a claim that round covered charts —
  correctly softened). **Standing rule reinforced: check the WebAIM citation
  on EVERY future revision of this post — it has now regressed three times
  (dropped entirely, inline-only, and this pass inline+footer both dropped).**

- **`grill-me-what-an-auditor-sees` — Mitiga and Snyk/Obot figures confirmed
  live 2026-07-15, CORRECTED 2026-07-15 (draft-stage pass, same day).**
  Mitiga's post
  ([mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills](https://www.mitiga.io/blog/ai-agent-supply-chain-risk-silent-codebase-exfiltration-via-skills))
  confirms "Find-Skills" has "over 200K downloads" — **CORRECTION: Find-Skills
  is NOT Mitiga's own research skill.** A targeted re-fetch quoting the exact
  sentence found: "We are already 3 months in and see skills like
  '[Find-Skills](https://skills.sh/vercel-labs/skills/find-skills)' having
  over 200K downloads" — it's a **Vercel Labs** skill on skills.sh, cited by
  Mitiga only as an example of ecosystem-wide adoption scale, unrelated to
  their own research. The earlier "their 'Find-Skills' research skill" framing
  in this entry was wrong (likely a WebFetch summarization artifact, same
  failure class as the OWASP confabulation below) — don't attribute
  authorship of Find-Skills to Mitiga in any draft; "nothing to do with
  Mitiga beyond being the example their research picked/cited" is the
  correct framing, and naming it as a Vercel Labs skill is a safe, sharper
  addition.
  **SEPARATE CORRECTION, same fetch session:** the "Testing-Validator" skill
  that silently exfiltrated a repo was **built by Mitiga's own research team
  as a proof-of-concept**, not discovered as a pre-existing published
  malicious skill. Verbatim from the source: "We created skills composed of
  complete silence with as little interactivity as possible. It started with
  a 'Testing-Validator' skill with a good and legitimate intent of creating
  tests for projects." A draft phrasing this as the research team having
  "found" a malicious skill in the wild misrepresents the source — it's a
  self-built red-team demo. Correct framing: "the same research team built a
  proof-of-concept — a legitimate-looking skill — that silently
  exfiltrated..." The "4 interactions from the user to complete the test
  building" and "no risk signal raised" ("`skill-audit.log` is completely
  empty") details are both still accurate and independent of this authorship
  correction — "almost no interaction" / "near-zero interaction" is a fair
  characterization but "just four user interactions" is the sharper, more
  precise citation if a drafter wants exact numbers. Obot's post
  ([obot.ai/blog/mcp-security-agent-skills-supply-chain](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/))
  confirms Snyk's ToxicSkills figures exactly: "scanning 3,984 skills from
  ClawHub and skills.sh as of February 2026," "36.82% of all skills (1,467
  total) contain at least one security flaw," "Snyk's human-in-the-loop
  review confirmed 76 skills with malicious payloads." Note the underlying
  Snyk scan itself is dated **February 2026** — a post citing these numbers
  without "as of Feb 2026" framing isn't wrong today (2026-07-15) but the
  figures will read as stale within a year; recommend "as of Feb 2026"
  framing on future re-uses.
- **CORRECTION to the standing OWASP caution above (line ~31-35): "No OWASP
  Agentic Skills Top 10 exists" is NO LONGER TRUE as of 2026-07-15.**
  Re-checked via three independent live fetches: (1) Obot's supply-chain post
  itself states "OWASP published its Agentic Skills Top 10 on April 27,
  2026" and cites its "AST01-AST10" risk categories; (2)
  [owasp.org/www-project-agentic-skills-top-10](https://owasp.org/www-project-agentic-skills-top-10/)
  is a live OWASP incubator project page describing exactly this framework
  ("OWASP Agentic Skills Top 10 (AST10)"), which even cites the same Snyk
  ToxicSkills 36.82%/3,984 figures we cite independently; (3)
  [owasp.org/projects](https://owasp.org/projects/) lists "OWASP Agentic
  Skills Top 10" by name among its ~100 real documentation projects. So
  OWASP's real framework launched ~2.5 months AFTER our own AST v1.0 (which
  shipped 2026-02-22, "inspired by [the original] OWASP Top 10" per that
  post's own text, not this new one) — our AST v1.0 was NOT built on or
  derived from OWASP's Agentic Skills Top 10, and still should never be
  attributed to it. But the coincidental overlap in naming (both use
  "AST"+two-digit codes) is now a REAL confusion risk, not a paranoid
  hypothetical — a reader could easily assume our AST-01/AST-02/etc. codes
  ARE OWASP's official ones. Recommend any post citing our AST-01…AST-10
  codes add one clarifying clause that this is Build Aloud's own taxonomy,
  distinct from OWASP's. Keep re-verifying this OWASP claim on future posts
  before trusting it further — it rests on WebFetch's summarization layer,
  not a manual page read, and the previous (now-superseded) caution was
  itself based on an earlier belief that turned out to be time-bound, not
  permanent.
- **`grill-me-what-an-auditor-sees` — second outline-stage pass, 2026-07-15**
  (this outline already incorporated the fix for the "industry converging"
  finding from the prior pass — paragraph 6's gateGuidance now explicitly
  cuts that framing). ONE new gate finding: paragraph 3's own gateGuidance
  text still characterizes the OWASP situation using the SUPERSEDED framing
  ("a prior draft of this exact post hallucinated an 'OWASP Agentic Skills
  Top 10'" — phrasing that implies no real one exists). Per the correction
  entry immediately above, a real OWASP Agentic Skills Top 10 (AST01-AST10)
  now exists (launched April 27, 2026) and the naming collision is a genuine
  reader-confusion risk, not a hallucination risk. Flag this stale
  characterization every time it recurs in this outline's own scaffolding —
  the fix is to update the internal note (not the never-attribute-to-OWASP
  rule itself, which stays correct) so it reflects the real, later, unrelated
  OWASP framework and recommends the draft add one disambiguating clause.
  Everything else re-checked and held clean: 200K downloads / "attacker's
  branch" (confirmed directly supported — Mitiga's own prose uses both
  "attacker's repository" and "pushed to a remote public branch"), Snyk
  3,984/36.82%/76 via Obot, four scores + 0/35/85/4.6 example, AST-01/AST-02
  code mapping, marketplace disclaimer verbatim, "AST v1.0" spelling (space,
  lowercase v) used consistently throughout. Elevation-level (non-gate) items
  worth a look next revision: (a) "hidden affiliate redirect" should become
  "hidden affiliate link" to match the not-all-malicious-is-equal source
  verbatim; (b) the Snyk 3,984/36.82%/76 figures should carry "as of February
  2026" framing since the underlying Snyk scan is dated Feb 2026; (c)
  Mitiga's "near-zero interaction" claim has a sharper exact citation
  available — "just four user interactions."
- **`not-all-malicious-is-equal` pubDate confirmed exactly `2026-02-24T04:00:00Z`**
  (slug/filename says 2026-02-23, frontmatter pubDate is 2026-02-24) — use
  the frontmatter pubDate, not the filename date, for all past/future tense
  checks on links to this post. Source confirms "a hidden affiliate link"
  (not "affiliate redirect") and "a persistent backdoor" as its own
  formula-illustration example pair (§"Why this matters for the scoring
  model") — a draft paraphrasing this as "hidden affiliate redirect" is a
  minor, non-gate lexical drift; "hidden affiliate link" matches the source
  exactly.
- **`grill-me-what-an-auditor-sees` outline-stage fact-check 2026-07-15 —
  ONE gate finding.** The "industry is converging" claim (paragraph 6, intent
  vs. exposure beat) — asserting exfiltration/credential-harvesting are
  "increasingly treated as their own risk categories separate from any
  malware-intent label," attributed to the Obot/Snyk analysis — is NOT
  supported by that source. Direct fetch of
  [obot.ai/blog/mcp-security-agent-skills-supply-chain](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/)
  shows credential harvesting and exfiltration are consistently framed there
  as components/steps of malicious attack chains, not as a documented
  industry trend toward decoupling them from intent labels. Flag this
  "industry converging" framing every time it recurs on this post — the
  fix is to ground the intent-vs-exposure thesis in our OWN AST v1.0 design
  and the not-all-malicious-is-equal precedent, with no external
  industry-consensus claim layered on top. Everything else in this outline
  checked clean: AST-01=data exfiltration/AST-02=credential harvesting code
  mapping exact (confirmed against `2026-02-22-we-rewrote-the-security-scoring-here-s-why.md`'s
  own table: AST-01 Data Exfiltration, AST-02 Credential Harvesting, AST-03
  Persistent Backdoor, AST-04 Context Manipulation, AST-05 Destructive
  Operations, AST-06 Scope Escalation, AST-07 Supply Chain Compromise, AST-08
  Obfuscated Behavior, AST-09 Undisclosed Network Activity, AST-10 Unbounded
  Autonomy); Mitiga 200K downloads + Testing-Validator exfil story correct;
  Snyk 3,984/36.82%/76 correct; marketplace disclaimer verbatim correct; four
  scores (maliciousIntent/inherentCapability/misuseSurface/overallExposure)
  and the 0/35/85/4.6 example numbers correct and consistent with the
  currently-live post; "AST v1.0" (space, lowercase v) is the correct
  spelling per the source post's own prose — the currently-live post
  actually uses "AST-1.0" (dash) throughout, which is the wrong spelling per
  that same source; this outline's gateGuidance already correctly flags the
  fix.
- **RETRACTION of the 2026-07-15 "OWASP Agentic Skills Top 10 is now real"
  correction above (lines ~1737-1787) — that correction was itself a
  WebFetch confabulation, not a verified fact.** Re-tested 2026-07-15 (later
  same-day outline pass on `grill-me-what-an-auditor-sees`, paragraph 3): a
  fresh WebFetch of `owasp.org/www-project-agentic-skills-top-10/` returned a
  project lead ("Ken Huang"), a launch window ("Q2 2026, v1.0 targeted for Q4
  2026"), and ten fully-named categories (AST01 Malicious Skills … AST10
  Cross-Platform Reuse) — details that DIRECTLY CONTRADICT the earlier
  "correction," which claimed the project "published its Agentic Skills Top
  10 on April 27, 2026" (a full launch, not a Q4-2026-targeted v1.0) and
  never actually listed category names. Repeating the same fetch twice more
  in the same session returned identical content both times — but that's the
  tool's own 15-minute cache, not independent confirmation; two fetches of a
  cached response proves nothing. The pattern the CURRENT outline's own
  gateGuidance already (correctly) warned about — "independent fetches keep
  returning different fabricated project leads and category lists" — is
  exactly what happened across the two separate fact-checker sessions (this
  one vs. the one that produced the original "correction"), both dated
  2026-07-15. **Standing rule, superseding the retracted correction: treat
  "OWASP has published a real Agentic Skills Top 10" as UNVERIFIED, not
  confirmed. Do not cite it, do not add OWASP-disambiguation language on its
  basis, and do not trust a WebFetch of the OWASP project page or projects
  listing as confirmation — re-run any check with a non-WebFetch method
  (manual browser check, a different fetch tool, or Chad's own confirmation)
  before treating this as fact.** The original caution ("No OWASP 'Agentic
  Skills Top 10' exists... do NOT attribute our own AST-01… taxonomy codes to
  OWASP") stands as the safe default until re-verified by a different method.
- **`grill-me-what-an-auditor-sees` — outline-stage fact-check pass,
  2026-07-15 (this exact outline, full paragraph-by-paragraph pass). ZERO new
  gate findings** — the outline's own gateGuidance across every paragraph
  already carries every fix from prior passes: OWASP disambiguation
  correctly withheld pending non-WebFetch confirmation (see retraction entry
  above — this outline's caution was right all along); "industry converging"
  framing absent from paragraph 6's actual intendedBeat; Snyk figures
  (3,984/36.82%/76) carry "as of February 2026" framing; reach list is four
  items in both paragraph 1 and 2 (files/shell/credentials/network, no
  tricolon); "hit next and trust the download count" is two items, not
  three; AST-01=data exfiltration/AST-02=credential harvesting mapping
  exact; disclaimer verbatim exact; 0/35/85/4.6 scores consistent with prior
  verification; "three skills... early on" confirmed against
  `2026-02-23-we-found-malicious-skills-three-of-them.md` (three malicious
  finds at 270 audits, pubDate 2026-02-23, predates this post — past tense
  correct); "34 out of 2,554" confirmed verbatim against
  `2026-03-03-34-malicious-skills-and-what-they-re-actually-doing.md`
  ("34 flagged out of 2,554 audited"), pubDate 2026-03-03, predates, past
  tense correct; Mitiga's "no risk signal raised" detail freshly re-verified
  live — source states the exploit was "Silent, no noise,
  `skill-audit.log` is completely empty," directly supporting the claim.
  Two elevation-level (non-gate) items only: (a) paragraph 6's `facts` field
  still says "hidden affiliate redirect" while its own `intendedBeat` in the
  same paragraph correctly says "hidden affiliate link" (source is "link,"
  verbatim) — an internal inconsistency worth fixing at draft time; (b)
  paragraph 2's "our own catalog landed in the same ballpark" comparison
  (34/2,554 ≈ 1.3% malicious-intent rate) is ambiguous about which Snyk
  figure it's being compared to — it reads "same ballpark" as the 76/3,984
  ≈ 1.9% *confirmed-malicious* rate (a fair comparison), but sits in the same
  paragraph as the unrelated 36.82% *any-security-flaw* rate; a draft that
  accidentally juxtaposes 1.3% against 36.82% instead of against 1.9% would
  overstate the mismatch by ~27x. Worth an explicit "vs. Snyk's confirmed-
  malicious rate, not the broader flaw rate" clause at draft time.
- **`grill-me-what-an-auditor-sees` — outline-stage fact-check pass,
  2026-07-15 (this exact outline, third time this exact slug has been
  checked at outline stage). ZERO gate findings — every fix from the prior
  two passes held.** Confirmed: paragraph 3's gateGuidance now states the
  CURRENT standing rule correctly (OWASP disambiguation withheld pending
  non-WebFetch confirmation, no "hallucinated" language implying no real
  OWASP framework exists — matches the retraction entry above); reach lists
  four items in both paragraph 1 and 2 (files/shell/credentials/network);
  "hit next and trust the download count" is two items, not a tricolon; Snyk
  figures (3,984/36.82%/76) carry "as of February 2026" framing; Mitiga cited
  as "just four user interactions" (the sharper exact figure, not "near-zero
  interaction"); "no risk signal raised along the way" matches Mitiga's
  "skill-audit.log is completely empty" language; paragraph 6's "hidden
  affiliate link" (not "redirect") is now consistent in both its `facts` and
  `intendedBeat` fields (previously an internal inconsistency, now fixed);
  "industry converging" framing is absent from paragraph 6; AST-01=data
  exfiltration/AST-02=credential harvesting mapping exact; "AST v1.0"
  (space, lowercase v) spelled correctly throughout; disclaimer verbatim
  exact; 0/35/85/4.6 scores consistent with prior verification; "three
  skills... early on" and "34 out of 2,554... as of March 2026" both confirmed
  against their source posts, both predate 2026-07-15, past tense correct.
  **One elevation still open (raised in the prior pass, still unaddressed in
  this outline revision):** paragraph 2's "our own catalog landed in the same
  ballpark" (34/2,554 ≈ 1.3%) sits in the same paragraph as Snyk's 36.82%
  any-flaw figure with no clause clarifying it's being compared to Snyk's
  76/3,984 ≈ 1.9% *confirmed-malicious* rate instead — juxtaposed against
  36.82% it would overstate the mismatch ~27x. Flag this again at draft
  stage if the ambiguity carries through to prose.
- **`grill-me-what-an-auditor-sees` — DRAFT-stage fact-check, 2026-07-15. ONE
  gate finding: the "same ballpark/range" ambiguity flagged at outline stage
  DID carry through to prose, as warned above — now a gate finding, not an
  elevation.** The draft's paragraph 2 reads "Our own catalog lands in the
  same range: as of March 2026, 34 of the 2,554 skills we'd audited had
  crossed our own malicious-intent threshold" immediately after citing both
  Snyk's 36.82% any-flaw figure and its 76-confirmed-malicious figure with no
  disambiguating clause — a reader's nearest antecedent is the just-stated
  36.82%, but 34/2,554≈1.3% is ~27x lower than that and only meaningfully
  close to the 76/3,984≈1.9% confirmed-malicious rate. Fix: name which Snyk
  figure the comparison is against ("that same confirmed-malicious range, not
  the broader flaw rate... close to Snyk's 76-out-of-3,984 confirmed-malicious
  rate, not its 36.82% any-flaw figure"). Everything else in this draft
  checked clean and matches every standing landmine fix: no OWASP mention
  anywhere (correctly withholds disambiguation per the unverified-claim
  standing rule); reach lists are four items in both paragraph 1 and 2
  (files/shell/credentials/network); "click install, trust the download
  count" is two items, not the old tricolon; Mitiga 200K downloads + "just
  four routine-looking prompts" (fair paraphrase of "4 interactions") + "no
  risk signal raised" (matches "skill-audit.log is completely empty") all
  correct; Snyk 3,984/36.82%/76 correct and attributed through Obot's link;
  "34 of the 2,554... as of March 2026" correct and links the right post;
  AST-01=data exfiltration/AST-02=credential harvesting mapping exact;
  "AST v1.0" (space, lowercase v) spelled correctly everywhere (the
  draft does NOT regress to the live post's wrong "AST-1.0"); 0/35/85/4.6
  scores exact; "hidden affiliate link" (not "redirect") correct; "industry
  converging" framing absent; "intent is one question, and capability and
  misuse are two more" 1+2 structure kept, not a tricolon; flare line "You're
  not installing a snippet. You're putting an unread program in your agent's
  hands." present verbatim; four findings (path traversal, shell injection,
  undisclosed network calls, no-checkpoint chaining) all present, none
  compressed to three; Haiku-missed-a-backdoor analogy present and correctly
  past-tense; marketplace disclaimer accurately paraphrased (unquoted); every
  internal link's pubDate predates 2026-07-15, past tense correct throughout.
  Elevations only (non-gate): (a) Snyk's 3,984/36.82%/76 figures still lack
  "as of February 2026" framing (recommended, not required, per the standing
  entry above — the underlying scan is Feb-2026-dated); (b) "just four
  routine-looking prompts from the user" could tighten to "just four user
  interactions," Mitiga's own more precise phrasing.
- **`grill-me-what-an-auditor-sees` — DRAFT-stage fact-check, 2026-07-15
  (next revision — the "same range" ambiguity from the prior pass is now
  fixed: paragraph 2 correctly reads "that same confirmed-malicious range,
  not the broader flaw rate... close to Snyk's 76-out-of-3,984
  confirmed-malicious rate, not its 36.82% any-flaw figure"). ONE NEW gate
  finding, not previously caught in any prior pass of this post: the draft
  says "The same research team **found** a separate, legitimate-looking
  skill that silently exfiltrated an entire local repo to an attacker's
  branch after just four user interactions."** Per the correction entry
  above, this misrepresents the Mitiga source — the "Testing-Validator"
  skill was **built by Mitiga's own researchers as a proof-of-concept**
  ("We created skills composed of complete silence... It started with a
  'Testing-Validator' skill with a good and legitimate intent"), not
  discovered as a pre-existing malicious skill in the wild. "Found" implies
  organic discovery; fix to "built ... to prove it could be done" or
  equivalent. Everything else checked clean: Find-Skills correctly framed as
  unrelated to Mitiga (per the correction above, though the draft doesn't
  name Vercel Labs — a fine elevation, not required); Mitiga 200K downloads
  correct; "just four user interactions" used (the sharper phrasing, already
  applied); "no risk signal raised" matches "skill-audit.log is completely
  empty"; Snyk 3,984/36.82%/76 correct via Obot, still lacking "as of
  February 2026" framing (elevation, not gate, per standing recommendation);
  no OWASP mention anywhere; reach lists four items in both places; "click
  install, trust the download count" two items not a tricolon; AST-01/AST-02
  mapping exact; "AST v1.0" spelling consistent; 0/35/85/4.6 scores exact;
  "hidden affiliate link" correct; no "industry converging" framing; "intent
  is one question, and capability and misuse are two more" 1+2 kept; flare
  line present verbatim exactly once; four findings present, none compressed;
  Haiku-missed-a-backdoor analogy correct past tense; marketplace disclaimer
  paraphrased unquoted; every internal link pubDate predates 2026-07-15.
  **Standing rule reinforced by this catch: verify "found" vs. "built by the
  researchers themselves" framing on every future revision citing Mitiga's
  Testing-Validator/exfiltration example — a single broad WebFetch missed
  this (first fetch on this exact question returned "does not specify"); a
  second, more targeted fetch asking specifically about authorship surfaced
  the verbatim quote. When a WebFetch answer is ambiguous or "doesn't
  specify," re-fetch with a narrower, quote-only prompt before treating the
  claim as unverifiable — don't let an inconclusive first pass become a false
  pass.**
- **`grill-me-what-an-auditor-sees` — DRAFT-stage fact-check, 2026-07-15
  (fourth draft pass on this exact slug). ZERO gate findings — the "found" vs.
  "built" fix from the prior pass held**: this revision correctly reads "The
  same research team built their own proof-of-concept skill and disguised it
  as ordinary testing guidance," matching Mitiga's own framing (self-built
  red-team demo, not an organic discovery). Every other standing landmine
  re-checked and clean: Find-Skills correctly framed as not Mitiga's own
  ("not Mitiga's own skill, just the example their research picked"); "just
  four user interactions" and "no risk signal raised along the way" both
  correct; "that same confirmed-malicious range, not the broader flaw rate...
  close to Snyk's 76-out-of-3,984 confirmed-malicious rate, not its 36.82%
  any-flaw figure" disambiguation present and correct; no OWASP mention
  anywhere; reach lists four items in both paragraphs (files/shell/
  credentials/network); "click install, trust the download count" stays two
  items; AST-01=data exfiltration/AST-02=credential harvesting mapping exact;
  "AST v1.0" spelling (space, lowercase v) consistent everywhere, never
  regresses to "AST-1.0"; 0/35/85/4.6 scores exact; "hidden affiliate link"
  (not "redirect") correct; no "industry converging" framing; "intent is one
  question, and capability and misuse are two more" 1+2 structure kept; flare
  line "You're not installing a snippet. You're putting an unread program in
  your agent's hands." present verbatim exactly once; four findings (path
  traversal, shell injection, undisclosed network calls, no-checkpoint
  chaining) present, none compressed to three; Haiku-missed-a-backdoor
  analogy correct and past tense correct; marketplace disclaimer paraphrased
  unquoted (no fabricated quote marks); every internal link's pubDate
  predates 2026-07-15, past tense correct throughout.
  **New elevation-level detail confirmed via fresh WebFetch 2026-07-15**: the
  draft's "76 confirmed malicious and carrying live payloads" paraphrases
  Obot's own wording, which uses "active payloads" / "malicious payloads,"
  never "live payloads" — confirmed via direct fetch of
  [obot.ai/blog/mcp-security-agent-skills-supply-chain](https://obot.ai/blog/mcp-security-agent-skills-supply-chain/):
  "Snyk's human-in-the-loop review confirmed 76 skills with malicious
  payloads, and as of publication, 8 of those skills remained publicly
  available on ClawHub" and (opening paragraph) "76 confirmed malicious
  skills with active payloads." "Live" vs. "active" is close enough not to
  gate (no quote marks used, so it's not a misattributed quote), but tightens
  to source-native wording if fixed. Standing elevation not yet applied in
  any pass: Snyk's 3,984/36.82%/76 figures still lack "as of February 2026"
  framing in-prose (the disclaimer/footer doesn't count) — recommended per
  the standing entry above, still not required for gate purposes.
- **`grill-me-what-an-auditor-sees` — DRAFT-stage fact-check, 2026-07-15
  (fifth draft pass on this exact slug). ZERO gate findings.** Every standing
  landmine re-checked and clean: "built their own proof-of-concept skill and
  disguised it as ordinary testing guidance" (not "found") correct; Find-Skills
  correctly framed as "not Mitiga's own skill, just the example their research
  picked"; "just four user interactions" and "no risk signal raised along the
  way" both correct; the "same range/34-out-of-2,554" paragraph correctly
  disambiguates against Snyk's 76-out-of-3,984 confirmed-malicious rate, not
  the 36.82% any-flaw figure ("nowhere near its 36.82% any-flaw figure");
  1.3%/34-2,554 math and 1.9%/76-3,984 math both check out; no OWASP mention
  anywhere (correctly withheld pending non-WebFetch confirmation); reach lists
  four items in both paragraph 1 and 4 (files/shell/credentials/network);
  "click install, trust the download count" stays two items, not a tricolon;
  flare line "You're not installing a snippet. You're putting an unread
  program in your agent's hands." present verbatim exactly once, correctly
  placed in the base-rate paragraph and nowhere else; AST-01=data
  exfiltration/AST-02=credential harvesting mapping exact; "AST v1.0"
  (space, lowercase v) spelled correctly everywhere, never regresses to
  "AST-1.0"; 0/35/85/4.6 scores exact; protected phrase "a single blended
  number would have buried the 85 under the friendly zero" present verbatim;
  four findings (path traversal, shell injection, undisclosed network calls,
  no-checkpoint chaining with "all in one run, nobody asked to confirm")
  present, none compressed to three; "three skills... early on" and the H2
  "Why intent and exposure are separate scores" (direct statement, not a
  negate-then-reframe heading) both correct; "hidden affiliate link" (not
  "redirect") correct; no "industry converging" framing; "intent is one
  question, and capability and misuse are two more" 1+2 structure kept, not a
  tricolon; AST-01/AST-02 notDetected framing correct; marketplace disclaimer
  paraphrased unquoted, first clause verbatim-matches the live disclaimer
  without quote marks (fine); every internal link's pubDate predates
  2026-07-15, past tense correct throughout (skill-md-is-a-file-written-for-
  agents 02-23, we-rewrote-the-security-scoring-here-s-why 02-22,
  we-let-haiku-do-the-audits-it-missed-things 02-23, we-found-malicious-
  skills-three-of-them 02-23, not-all-malicious-is-equal 02-24,
  34-malicious-skills-and-what-they-re-actually-doing 03-03). **Two elevations
  still open, unchanged from prior passes:** (a) "76 confirmed malicious, each
  carrying a live payload" should tighten to source-native "active payload"
  (Obot's own wording is "active payloads" / "malicious payloads," never
  "live"); (b) Snyk's 3,984/36.82%/76 figures still lack "as of February 2026"
  framing in-prose.
- **`grill-me-what-an-auditor-sees` — DRAFT-stage fact-check, 2026-07-15
  (sixth draft pass, DRAFT-mode fan-out with outline-guidance grading).
  ZERO gate findings — the "live" → "active payload" elevation from the
  fifth pass IS now applied**: this revision reads "76 were confirmed
  malicious, each carrying an active payload" (source-native "active"
  wording, matches Obot's "76 confirmed malicious skills with active
  payloads"). Every standing landmine re-checked and clean: "built their own
  proof-of-concept skill and disguised it as ordinary testing guidance" (not
  "found") correct; Find-Skills correctly framed as "not one Mitiga built,"
  matches; "just four user interactions" and "No risk signal raised along the
  way" both correct; disambiguation clause present — "That puts us in the same
  range as Snyk's 76-out-of-3,984 rate, nowhere near its 36.82% any-flaw
  figure"; 1.3%/34-2,554 and 1.9%/76-3,984 math both check out; no OWASP
  mention anywhere; reach lists four items in both paragraph 1
  (files/shell/credentials/network) and paragraph 4 (shell access/filesystem
  read-and-write/credentials in env vars and config files/network); "click
  install, trust the download count" stays two items, not a tricolon; flare
  line "You're not installing a snippet. You're putting an unread program in
  your agent's hands." present verbatim exactly once, correctly placed in the
  base-rate paragraph; AST-01=data exfiltration/AST-02=credential harvesting
  mapping exact; "AST v1.0" (space, lowercase v) spelled correctly everywhere;
  0/35/85/4.6 scores exact; protected phrase "a single blended number would
  have buried the 85 under the friendly zero" present verbatim; four findings
  (path traversal, shell injection, undisclosed network calls, no-checkpoint
  chaining with "all in one run, nobody asked to confirm") present, none
  compressed to three; H2 "Why intent and exposure are separate scores" is a
  direct statement, not a negate-then-reframe; "hidden affiliate link" (not
  "redirect") correct; no "industry converging" framing; "intent is one
  question, and capability and misuse are two more" 1+2 structure kept;
  marketplace disclaimer paraphrased unquoted, first clause verbatim-matches
  the live disclaimer without quote marks (fine); every internal link's
  pubDate predates 2026-07-15, past tense correct throughout. **Both prior
  elevations now closed/superseded**: (a) "live" → "active payload" fix
  applied (see above) — drop this elevation going forward. (b) "as of
  February 2026" framing on the Snyk 3,984/36.82%/76 figures is STILL not
  in-prose — keep offering as a standing elevation on every future pass, not a
  gate finding. **New elevation this pass**: the Mitiga proof-of-concept skill
  is never named in-prose ("The same research team built their own
  proof-of-concept skill and disguised it as ordinary testing guidance");
  Mitiga's own post names it "Testing-Validator" — naming it adds a concrete
  specific that reads sharper without changing any fact.

- **`automate-blog-writing-with-ai-agents` — DRAFT-stage fact-check pass
  confirmed 2026-07-15 (this exact "Publishing this post takes twelve
  pipeline stages" opener, "Decision one/two/three" H2s, "This post broke the
  machine that wrote it" as its own H2).** Zero gate findings, verdict PASS.
  Every standing landmine held clean: 12-stage numbered list, correct order,
  assemble/commit as separate items (11/12), tone gate folded into item 8
  ("Draft review loop, which runs the tone gate at the start of every round
  and once more after the loop exits"), never listed separately; heading/prose
  say "most handed to an AI agent," never "an AI agent running each one";
  "By default" hedge present on both "I sign off on exactly one" (hook) and
  "I'm out of the room by default until the post is live" (stage-list beat) —
  no unhedged "only human checkpoint" claim anywhere; "eight stages with seven
  agents" for the earlier version of this post, accurate; order-3 turn beat
  stays vague about the pre-redesign review layer ("a handful of
  generalists"), no exact count, no "single review pass"/"one cold reader"/
  "combined into one read"; protected order-3 ourTake line ("the most
  on-brand bug I could have shipped") present verbatim; 12 outline reviewers /
  15 draft reviewers (all 15 individually named, grouped 5 structural/5
  craft/5 integrity), both round-capped at five, no "three rounds" anywhere;
  no "blind to its own lane" language — reviewers correctly described as
  reading "the entire draft but grades exactly one axis"; security-kit "six
  sub-agents across eight phases" accurate, correctly kept distinct from the
  Skills Marketplace (no conflation — security-kit cited for the
  narrow-beats-mega bet, Skills Marketplace cited separately for the
  Haiku/Sonnet model-tier precedent); Haiku-backdoor analogy exact (1.75
  exposure/1 finding → 5.65/4 findings, shim path `~/.codex/bin/codex`),
  correct past tense (source predates); link-integrity described as "mostly
  binary" (URL resolves, anchor matches, dated before this post), never "no
  judgment call"; model-tier claim (14 sonnet, 1 haiku on link-integrity)
  correct; the Anthropic "research the semiconductor shortage" quote
  re-verified verbatim by direct WebFetch this pass — exact match, correctly
  quoted (only the actual quoted phrase in quote marks, not the surrounding
  paraphrase); all four subagent elements present, no causal "because" tying
  them to 90.2%, no "NOT responsible for" gloss; Anthropic 90.2% + "June 2025"
  dated framing correct; plateau-exit mechanic and disposition classifier both
  described correctly; tone-gate threshold "15 or above out of 100,"
  banned-adds-100 correctly framed as the internal pre-clamp mechanism only;
  register-detector values correct (dramatic inversions capped 18, punch
  fragments 10 free then capped 6, sales speak capped 15); flare line "The
  gate I trust most is the one with no opinion" present in body prose (not
  heading-only); run-one/run-two failure story uses the RECONCILED "dead level
  with the corpus's own measured human baseline" framing — the disproven
  "10 to 15" figure (regressed twice before, 2026-07-14 and 2026-07-15) is
  NOT present in this revision; numbers exact (42, 35 em-dashes, 2,000 words,
  bar 2→15; 6→22; gate-count oscillation 10/5/7); make-ai-writing-sound-human
  link correctly threaded onto the bar-2-to-15 detail itself, not a bare
  see-also; protected flare line "Telling an editor what was wrong never
  converged. Handing it the fix did." present verbatim; outline-builder/editor
  dated memory-ledger claim accurate; Google Research 80.9%/"39 to 70 percent"
  and Augment's "+81 percent/up to 70 percent" both correctly ranged, correct
  primary URL (the "...when-and-why-agent-systems-work/" suffix); Anthropic
  4x/15x token figures correct; Google spam-policy paraphrased with no
  quotation marks, matching the live page, generative AI correctly framed as
  named "in that same policy section" (not "separately"); Rankability 83% kept
  with the directional caveat; CTA correctly applies the TD-0038 caution —
  describes the published package as "the same design," explicitly says
  build-aloud "is still finishing its own swap onto the published version,"
  and explicitly flags that the tone gate's three newest register detectors
  "haven't landed in the package yet either" (addresses both facets of the
  TD-0038 caution: operational lag AND missing-mechanism parity); no Skills
  Marketplace mention in the CTA; protected CTA clause "That's why I get to
  touch the draft least of anyone and still trust what ships" present
  verbatim; GitHub URL and setup command both correct. Three elevations
  offered (not gate findings): (1) cite Anthropic's exact publish date (June
  13, 2025) instead of "June 2025"; (2) the "a few more steps" aside names
  only "SEO scoring, bookkeeping, a log of what worked and what didn't" —
  omits "scheduling," which a stricter, previously-confirmed-accurate framing
  included ("SEO scoring and scheduling, bookkeeping notes, plus a rolling
  log of what worked"); (3) the Google spam-policy claim still lacks an "as of
  this writing" hedge, worth adding since that page's wording has already
  required multiple re-checks across this project's history.
- **`isPublished()` is the site's actual "published" cutoff — `!draft &&
  pubDate <= now`** (confirmed via direct read of `src/utils/posts.ts`).
  Cloudflare auto-deploys within ~60s of a push, and future-dated non-draft
  posts already sit committed in `src/content/blog/`, so a post file existing
  in the repo does NOT mean it's "published" — only `pubDate <= now` (or, for
  a post narrating its own history, `pubDate <= that post's own pubDate`)
  does. **Use this cutoff any time a post states a running total ("N posts/
  images published so far")** — count only entries with `pubDate` on or
  before the citing post's own `pubDate`, not every file that happens to
  exist in the repo.
- **`writing-alt-text-seo-accessibility` (pubDate 2026-07-16) — "15 hero
  images" is a miscount; the real number is 17.** Counted every post in
  `src/content/blog/` with a `heroImage` field AND `pubDate <=
  2026-07-16T15:00:00Z`, excluding this post itself: 17 posts qualify
  (2026-02-21-i-have-a-face-now [pubDate 02-22], 2026-06-16-building-a-game-
  with-claude-code-in-3-weeks, 2026-06-19-redesigned-my-own-site-animation-
  rabbit-hole, 2026-06-23-chad-starts-a-lot-of-circles,
  2026-06-26-ai-on-my-site-told-it-to-defer,
  2026-07-01-ticket-tracker-where-ai-does-the-ticketing,
  2026-07-07-launch-day-bugs-only-showed-up-in-prod,
  2026-07-08-cloudflare-pages-functions-404-custom-domain,
  2026-07-09-can-an-ai-run-a-business, 2026-07-09-how-to-measure-blog-seo,
  2026-07-10-claude-security-team-that-remembers,
  2026-07-10-gpt-5-6-vs-claude-for-coding-agents,
  2026-07-11-anonymous-like-button-without-login,
  2026-07-12-make-ai-writing-sound-human,
  2026-07-13-automate-blog-writing-with-ai-agents,
  2026-07-14-dark-dashboard-design, 2026-07-15-grill-me-what-an-auditor-sees).
  All 17 already carry a filled-in `heroImageAlt`. Every outline/draft beat
  citing "15 hero images" (hook, the opening paragraph, the "Backfilling N
  hero images" heading, its facts bullets) must say **17**, not 15 — flag as
  a wrong-fact gate finding wherever it recurs on this post, and re-run this
  same count on any later revision since the true number climbs as new posts
  publish.
- **Alt-text-post's four external sources all confirmed live 2026-07-15:**
  (1) [w3.org/WAI/tutorials/images](https://www.w3.org/WAI/tutorials/images/)
  — "Images must have text alternatives that describe the information or
  function represented by them." Safe to paraphrase (no quote marks) as
  "conveys an image's information or function." (2)
  [developers.google.com/search/docs/appearance/google-images](https://developers.google.com/search/docs/appearance/google-images)
  — confirmed verbatim both "results in a negative user experience and may
  cause your site to be seen as spam" (re: keyword stuffing) and the example
  "Dalmatian puppy playing fetch." Safe to quote both exactly. (3)
  [yoast.com/image-seo-alt-tag-and-title-tag-optimization](https://yoast.com/image-seo-alt-tag-and-title-tag-optimization/)
  — confirmed: "We're not saying you should spam your focus keyphrase into
  every alt tag," supporting a paraphrase of "work a keyphrase in only when
  genuinely relevant, never spam it into every alt attribute" (no quote
  marks needed, it's a paraphrase). (4)
  [yatil.net/blog/there-is-no-character-limit-for-alt-text](https://yatil.net/blog/there-is-no-character-limit-for-alt-text/)
  — confirmed: no HTML/WCAG character limit on `alt`; the 125-character myth
  traces to JAWS *splitting* long alt text across multiple graphics, which
  people misread as truncation — "some people have observed JAWS' behavior
  and assumed that the text was truncated where it was only split up." Safe
  to cite as "a misread of old JAWS behavior." ELEVATION (not gate): yatil.net
  is a personal blog, not a spec — citing WCAG's own Success Criterion 1.1.1
  (Non-text Content) directly alongside it would make the "neither HTML nor
  WCAG sets a limit" half of the claim more directly sourced.
- **Alt-text-post's two quoted example `heroImageAlt` strings confirmed
  verbatim against live frontmatter (2026-07-15):**
  `2026-07-09-how-to-measure-blog-seo.md` →  "A dark telemetry panel with a
  mint signal line running nearly flat past one faint early blip, a ghosted
  zero glowing behind it, the SEO scorecard's gathering-signal readout."
  `2026-07-08-cloudflare-pages-functions-404-custom-domain.md` → "Two black
  server racks, one glowing teal, one dark with an unplugged cable above it ·
  the Cloudflare Pages Functions 404 bug." Both match character-for-character
  against frontmatter. NOTE for future draft-stage passes (not an outline
  issue — this outline quotes it correctly capitalized): the currently-live
  draft body at this slug lowercases the opening of the quote ("...this alt
  text: 'a dark telemetry panel...'") where the frontmatter itself is
  capitalized ("A dark telemetry panel..."). Watch for that case mismatch
  resurfacing in a rewritten draft.
  Also confirmed: `2026-06-19-redesigned-my-own-site-animation-rabbit-hole.md`
  (pubDate 2026-06-19, predates 07-16, past tense correct) really does
  describe an `aria-label` and a `focus-visible:ring-brand` outline — safe to
  cite as "aria-labels and focus rings."
- **`writing-alt-text-seo-accessibility` — all outline-stage gate findings
  resolved as of the 2026-07-15 outline pass.** Fixed and held across
  revisions: Yoast never called "an SEO agency" (correct: "the SEO side of
  the fence" / makers of the Yoast SEO plugin); the "only include it when
  genuinely useful" Yoast line rendered as an unquoted paraphrase, not a
  literal quote (closest real text: "We're not saying you should spam your
  focus keyphrase into every alt tag... include it in the alt tag if you
  can."); order-2's alt-text-filler description softened to unspecified
  ("placeholder filler that didn't describe the image") rather than inventing
  a specific form like "hero image" or a bare filename with no commit
  evidence; Sources footer lists all seven URLs (Google image SEO, W3C
  general images, W3C decorative, W3C informative, WCAG SC 1.1.1, Yoast,
  yatil.net). Two extra sources confirmed verbatim: W3C decorative
  ([w3.org/WAI/tutorials/images/decorative](https://www.w3.org/WAI/tutorials/images/decorative/))
  — decorative images get `alt=""`; W3C informative
  ([w3.org/WAI/tutorials/images/informative](https://www.w3.org/WAI/tutorials/images/informative/))
  — alt text should convey meaning, not literal appearance, example "We're
  family-friendly." WCAG SC 1.1.1
  ([w3.org/WAI/WCAG21/Understanding/non-text-content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html))
  confirmed verbatim: "All non-text content that is presented to the user has
  a text alternative that serves the equivalent purpose" — no length language
  anywhere in the criterion.
- **WHATWG HTML living standard alt-text section
  (html.spec.whatwg.org/multipage/images.html#alt) independently re-verified
  2026-07-15**: confirms no character-limit language anywhere in the
  "Requirements for providing text to act as an alternative for images"
  section (4.8.4.4) — safe to cite for the "no character limit" claim's
  HTML-spec half, alongside WCAG SC 1.1.1 for the accessibility half.
- **yatil.net's "phone test" line confirmed verbatim** 2026-07-15: "would I
  picture an approximation of the image when it was described to me over the
  phone using the alternative text." A draft paraphrasing this without quote
  marks is accurate but undersells it — this is a quotable litmus-test line,
  worth rendering as a direct quote for more punch (elevation, not gate).
- **`writing-alt-text-seo-accessibility` — DRAFT-stage fact-check pass
  2026-07-15, one gate finding.** Body text attributes the no-character-limit
  claim's HTML-spec half to "the WHATWG HTML living standard's alt-text
  section" but the Sources footer only lists the 7 URLs above and omits the
  WHATWG spec link — an inline-named source with no traceable citation
  anywhere in the post. Fix: add
  `- [WHATWG HTML Living Standard: Requirements for providing text to act as an alternative for images](https://html.spec.whatwg.org/multipage/images.html#alt)`
  to the footer, next to the WCAG SC 1.1.1 entry. Everything else clean: all
  quoted strings verbatim (Google spam-warning + Dalmatian example, W3C
  family-friendly example, WCAG SC 1.1.1 full sentence, both `heroImageAlt`
  strings — measuring-blog-seo and cloudflare-404, re-checked directly
  against live frontmatter); Yoast paraphrase unquoted, correctly framed as
  SEO-plugin-maker not agency; 17-hero-image count re-verified 2026-07-15 by
  direct file count of every post with `heroImageAlt` and a pubDate before
  this post's 2026-07-16T15:00:00Z — still exactly the same 17 slugs; every
  internal link tense-correct against real pubDates.
- **`writing-alt-text-seo-accessibility` — DRAFT-stage pass 2026-07-15 (later
  revision): prior WHATWG-footer gate finding fixed (8 sources now listed,
  WHATWG included); ONE NEW gate finding.** A newly-added sentence in the
  "Who alt text is for" beat asserts a specific split not present in any
  earlier verified revision of this post: "9 of the seventeen carried an
  empty alt="" ... The other 8 shipped with a real description already in
  place." No commit/git-log source is cited or checkable by this
  fact-checker (no Bash/git tool available this pass), and this specific
  9/8 split — especially "8 shipped with a real description already in
  place" — is a materially stronger claim than every prior verified
  revision, which used only the unspecified, ledger-approved framing ("some
  hero images carrying no alt text at all, and others with generic filler
  that described nothing" — never claiming any of them were already good).
  Flag this exact split as unsourced/unverified on every future pass unless
  a drafter with git access confirms it directly against the commit that
  introduced `heroImageAlt` (e.g. `git log --oneline -- 'src/content/blog/*.md'`
  around that field's introduction) and cites/notes that check. Safe
  fallback if unconfirmed: revert to the two-failure-state unspecified
  framing above. Everything else in this revision re-confirmed clean:
  17-count correct; all quoted strings verbatim (Google spam-warning +
  Dalmatian, W3C family-friendly example, WCAG SC 1.1.1, both `heroImageAlt`
  quotes correctly capitalized this time — no lowercase regression); Yoast
  correctly "the SEO side of the fence" / "an SEO plugin's house rules," not
  "an SEO agency"; WHATWG cited both inline and in the footer; all protected
  ourTake lines present verbatim (including the flare line as the final
  sentence); every internal link tense-correct against real pubDates
  (wiring-up-the-machine 02-22, automate-blog-writing-with-ai-agents 07-13,
  how-to-measure-blog-seo 07-09, cloudflare-404 07-08,
  redesigned-my-own-site-animation-rabbit-hole 06-19 — all predate this
  post's 07-16 pubDate). Minor elevation (not gate): the WCAG SC 1.1.1 quote
  is embedded mid-sentence with a lowercased "all" where the source reads
  "All non-text content..." — a verbatim quote technically shouldn't silently
  change source capitalization; restructure to quote it as its own sentence
  or bracket the letter (e.g. "[a]ll").
- **`writing-alt-text-seo-accessibility` — DRAFT-stage pass 2026-07-15 (later
  revision), ONE gate finding, everything else re-confirmed clean.** Prior
  WCAG-capitalization elevation fixed (this revision quotes "All non-text
  content..." correctly capitalized as its own standalone sentence). The
  9/8-split gate finding from the earlier revision is gone — this revision
  uses the safe unspecified two-failure-state framing ("some carried no alt
  attribute at all... and others carried placeholder filler that didn't
  describe the image either"), correctly with no invented commit-derived
  split. NEW finding: the yatil.net "phone test" quote is rendered with a
  trailing question mark — `"...using the alternative text?"` — but the
  source's actual sentence is **"My litmus test is 'would I picture an
  approximation of the image when it was described to me over the phone
  using the alternative text.'"**, ending in a period, not a question mark
  (re-fetched and confirmed directly 2026-07-15, full-sentence context, not
  just the clause). A verbatim quote must match source punctuation exactly —
  flag any future revision that renders this quote with a "?" instead of a
  period. Everything else clean: both Google quotes (spam-warning +
  Dalmatian) verbatim; both `heroImageAlt` quotes verbatim against live
  frontmatter; Yoast paraphrase unquoted, correctly "the SEO side of the
  argument" / "an SEO plugin's house rules," never "an SEO agency"; WCAG SC
  1.1.1 quoted verbatim and correctly capitalized; W3C "We're family-friendly"
  quoted verbatim; WHATWG cited both inline and in the 8-source Sources
  footer; 17-hero-image count correct; flare line present verbatim as the
  final sentence; every internal link tense-correct against real pubDates
  (wiring-up-the-machine 02-21, automate-blog-writing-with-ai-agents 07-13,
  how-to-measure-blog-seo 07-09, cloudflare-404 07-08,
  redesigned-my-own-site-animation-rabbit-hole 06-19 — all predate this
  post's 07-16 pubDate).

## `2026-07-17-design-system-with-css-variables` — token facts (verified 2026-07-15 against live source files)
- All primitive/semantic/font/layout token names+values confirmed exact against
  `src/styles/global.css`:
  `--ink-900:#0c0e12, --ink-800:#13161c, --ink-700:#1a1e27, --ink-600:#262c38,
  --ink-500:#3a4258; --paper:#e8e6e1, --paper-dim:#9ca3af,
  --paper-faint:#6b7280; --mint:#a3f7bf`. Semantic: `--color-bg:var(--ink-900),
  --color-bg-elevated:var(--ink-800), --color-text:var(--paper),
  --color-text-secondary:var(--paper-dim), --color-muted:var(--paper-faint),
  --color-accent:var(--mint), --color-accent-dim:color-mix(in srgb, var(--mint)
  12%, transparent)` (12%, not 35%). Fonts: `--font-display:'Instrument
  Serif', Georgia, serif; --font-body:'DM Sans', -apple-system, sans-serif;
  --font-mono:'JetBrains Mono', 'Fira Code', monospace`. Layout:
  `--max-width:52rem; --max-width-wide:75rem; --gutter:1.5rem`. Series:
  `--series-green:#1ea855` (`#1ea855`) maps to `--color-series-views`;
  `--series-blue:#4c78dd` maps to THREE semantic names —
  `--color-series-sessions`, `--color-series-search`, AND
  `--color-series-organic` (triple duty, confirmed global.css lines 42-46).
  A much-earlier revision of this post used fabricated simplified
  names/hexes (`--bg`, `--panel`, `--mint-dim` at 35%) that don't exist in
  the source — always use the real names/hexes above.
- Un-tokenized exceptions confirmed live via direct grep 2026-07-15: the
  header SVG logo mark hardcodes `fill="#13161c"` on both its `<ellipse>` and
  `<path>` elements (`src/components/Header.astro` lines 15, 19); the
  stale-data amber `#e0a94c` is duplicated verbatim in
  `src/pages/stats.astro:255` and `src/layouts/BlogPost.astro:428`; the
  homepage headline gradient `#7df0a8` is in `src/pages/index.astro:292`.
  None read from a `--color-*` token.
- Panel top-border is 2px (`border-top: 2px solid var(--color-accent)`,
  confirmed via grep across `stats.astro`, `BlogPost.astro`,
  `projects/[slug].astro`, `TrafficChart.astro`, `HomeScorecard.astro`, and
  chart panel components) — never "one or two pixels." The `// ` prefix is
  panel-level only (`// telemetry` in `stats.astro`/`BlogPost.astro`/
  `projects/[slug].astro`, `// traffic (28d)` in `TrafficChart.astro`) — never
  applied to individual metric labels.
- No colorblind-safety/contrast validator tool exists anywhere in this repo.
  The only true, sourced claim: green `#1ea855` / blue `#4c78dd` "also
  happens to sidestep" the red-green pairing that trips up the most common
  form of color blindness — WebAIM verbatim: "red-green deficiencies are the
  most common, meaning that certain shades of the colors red and green may
  appear very similar"
  ([webaim.org/articles/visual/colorblind](https://webaim.org/articles/visual/colorblind/)).
  Don't invent a validation process or "categorical lightness band" jargon
  (never appeared in the repo).
- No token-file/design-system-file email lead magnet exists anywhere in the
  codebase (the newsletter, `NewsletterSignup.astro`/`subscribe-flow.ts`, is
  a generic "stay in the loop" signup). Correct CTA framing: view-source /
  the public CSS itself, not a fictional emailed file.
- CSS-Tricks demonstrates dark-mode-via-variable-override as ONE example; it
  never generalizes this as "usually"/"typically" how theming works — cite
  the example directly, don't attribute a frequency claim to the source.
- Penpot confirmed: "Create themes by remapping semantics to different
  primitives" —
  [penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/).
- MDN confirmed: `:root`-scoped custom properties are globally available and
  inherit down the DOM —
  [developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).
  MDN doesn't itself analogize to `color`/`font-family`, but that's a fair
  unquoted paraphrase, not a misattributed quote.
- `color-mix()` is correctly attributable to the CSS Color 5 spec (MDN lists
  it under Level 4/5) if a draft wants a sharper name-drop — optional, not
  required.
- **Note, not a gate finding: the "#12151a vs #13161c" pre-token panel-color
  drift anecdote has no live source** (not in `global.css`, not in the cited
  `dark-dashboard-design` post) — it's this post's own git-history
  recollection. Elevation-only across every pass so far (hedge as
  recollection, don't treat as a checkable diff); never gate on it unless a
  future revision claims it's still visible in a diff somewhere.
- **Multiple outline- and draft-stage passes across 2026-07-15 converged
  clean.** Early rounds caught and got fixed: a fabricated colorblind-
  validator/"categorical lightness band" claim, a fabricated token-file-by-
  email CTA, and the CSS-Tricks "usually" overclaim (each recurred once more
  in a sibling `facts` bullet after being fixed in `intendedBeat` — when a
  fabrication is fixed in one field, re-check sibling fields on the same
  beat). Every pass since has been clean, including the current full Scout-
  voice prose draft reviewed 2026-07-15 ("A Design System With CSS Variables
  (No Framework)") — zero gate findings, every fact above re-verified
  line-by-line against live source files, not just this ledger.

## `which-claude-model-to-use` (slug `2026-07-18-which-claude-model-to-use`) — routing/pricing facts, verified 2026-07-15
- **Anthropic model pricing re-confirmed live** on
  [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview):
  Opus 4.8 $5/input MTok, $25/output MTok; Sonnet 5 $3/$15 list with footnote-4
  **introductory $2/$10 through August 31, 2026** (exact wording: "Introductory
  pricing of $2 / $10 per MTok applies to Claude Sonnet 5 through August 31,
  2026"); Haiku 4.5 $1/$5. A NEW pricier tier now exists alongside these three:
  **Claude Fable 5** (`claude-fable-5`) at $10/$50, "most capable widely
  released model," GA since June 9, 2026, with an invitation-only sibling
  Claude Mythos 5. A post about the Opus/Sonnet/Haiku three-tier routing table
  doesn't need to cover Fable 5, but flag it as an elevation opportunity (a
  fourth, pricier tier now exists) so the piece reads current — don't treat
  omitting it as a gate-level dating problem.
- **Effort parameter confirmed live** on the same overview page and on
  [choosing-a-model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model):
  "the `effort` parameter defaults to `high` on all surfaces" for Opus 4.8;
  defaults to `high` on the API and Claude Code for Sonnet 5. Choosing-a-model
  states verbatim "Tuning effort is often a better lever than switching
  models," and recommends `xhigh` (a level "between `high` and `max`") for
  "most coding and agentic use cases" on Opus 4.8/4.7. A post citing "every
  agent pins effort: high" is accurate as a description of OUR roster and
  doesn't contradict Anthropic's own high-vs-xhigh guidance as long as it
  doesn't call "high" the ceiling — safe framing: "high" as the uniform
  setting, not "the max." The dedicated
  [/docs/en/build-with-claude/effort](https://platform.claude.com/docs/en/build-with-claude/effort)
  page is a sharper, more specific citation than the general choosing-a-model
  page if a draft wants one.
- **Choosing-a-model's Haiku use-case matrix confirmed verbatim**: "Near-
  frontier performance with lightning-fast speed and extended thinking at the
  most economical price point | Claude Haiku 4.5 | Real-time applications,
  high-volume intelligent processing, cost-sensitive deployments needing
  strong reasoning, sub-agent tasks." Safe to cite "sub-agent tasks and
  high-volume, cost-sensitive processing" as Haiku's named fit. Opening line
  of the same doc confirms the match-capability/speed/cost-to-task framing:
  "Selecting the optimal Claude model for your application involves balancing
  three key considerations: capabilities, speed, and cost."
- **MindStudio's Claude Code sub-agents piece confirmed** on
  [mindstudio.ai/blog/claude-code-sub-agents-explained](https://www.mindstudio.ai/blog/claude-code-sub-agents-explained):
  describes an orchestrator/sub-agent cost-delegation pattern verbatim — "If
  your orchestrator costs $15 per million output tokens and your sub-agents
  cost $0.25 per million output tokens, the math adds up quickly in your
  favor," with the routing principle "Orchestrator: ...Claude Opus or Claude
  Sonnet... Sub-agents: ...Claude Haiku or smaller models often work fine
  here." Safe to cite as the general orchestrator/cheap-sub-agent economics
  pattern; MindStudio's own example numbers ($15 vs $0.25) are THEIRS, not
  our pipeline's — don't blend them with our Sonnet/Haiku output prices
  ($15 vs $5) as if one source.
- **Dev.to "pick the right Claude Code model for every task" piece confirmed**
  on
  [dev.to/klement_gunndu/pick-the-right-claude-code-model-for-every-task-1p6a](https://dev.to/klement_gunndu/pick-the-right-claude-code-model-for-every-task-1p6a):
  states the match-tier-to-task-difficulty framing verbatim — "The goal isn't
  to use the cheapest model everywhere. It's to use the right model for each
  task, so you get faster answers on simple work and deeper reasoning on hard
  problems" — paired with a Haiku/Sonnet/Opus-by-task-type table.
- **Full agent roster model + effort grep re-confirmed 2026-07-15** across
  every file in `.claude/agents/` (36 files, not just the 15 draft-mode
  reviewers): exactly two outliers on `model:` — `seo-researcher` (`opus`)
  and `link-integrity-reviewer` (`haiku`) — every other file (`brief-writer`,
  `drafter`, `synthesis`, `digest-expert`, all outline/draft reviewers, plus
  non-pipeline "expert" agents like `tower-defense-expert`/`website-expert`/
  `ticket-kit-expert`) pins `model: sonnet`. Separately, **all 36 files** pin
  `effort: high` with zero exceptions — so "every agent file pins
  effort: high" is true repo-wide, not just within the blog content pipeline.
- **`seo-researcher.md` confirmed**: "Researches the SEO + market angle for
  blog-post topics," two modes (discovery/refinement), and states its own
  model choice reasoning verbatim: "deep SEO/market research warrants it,
  unlike the rest of the pipeline (Sonnet)." `SKILL.md` labels it "3. SEO
  Research — `seo-researcher` agent (Opus, refinement mode)" — confirms it
  runs at Step 3, ahead of brief/outline/draft. "Competitive positioning" is
  a fair paraphrase of "market angle," not a literal quote.
- **`link-integrity-reviewer.md` confirmed**: single axis "every rendered
  link resolves and points at the right place," using "a persistent canonical
  link map" (`link-map.md`) it "keeps... and get[s] sharper each run" —
  matches a draft describing this as the pipeline's one Haiku slot with a
  verifiable, checkable output.
- **Blog posting cadence sanity-checked** via `pubDate` grep across
  `src/content/blog/`: July 2026 posts run at roughly daily-to-every-few-days
  cadence (e.g. 07-07, 07-08, 07-09, 07-10, 07-11, 07-12, 07-13, 07-14,
  07-16, 07-18, 07-19...). "More than one post a week" is a safe, conservative
  framing — the real cadence is faster.
- **Zero gate findings on the 2026-07-15 outline-stage fact-check pass** of
  this post: pricing (with intro-rate caveat and date), the 5x Opus/Haiku
  output multiplier, the effort-parameter claim, the full agent roster
  breakdown (1 Opus / 1 Haiku / rest Sonnet, all effort: high), the
  seo-researcher/link-integrity-reviewer descriptions, the fan-out counts
  (12 outline reviewers / 15 draft reviewers / round cap 5 both loops), and
  the Haiku-missed-a-backdoor audit numbers (1.75/1 finding vs 5.65/4
  findings, `~/.codex/bin/codex` shim) all checked out clean against live
  sources and this ledger.
- **`/docs/en/build-with-claude/effort` "low" row confirmed verbatim**
  (re-checked 2026-07-15 via direct fetch): the effort-levels table's
  "Typical use case" cell for `low` reads exactly "Simpler tasks that need
  the best speed and lowest costs, such as subagents." A draft quoting "low
  effort is built for 'simpler tasks that need the best speed and lowest
  costs, such as subagents'" is a verbatim-supported quote. Same page also
  confirms Claude Fable 5's comparison-table **Description** cell as "Next-
  generation intelligence for long-running agents" (distinct from the
  overview page's separate "most capable widely released model" line) — a
  draft calling Fable 5 the tier "for long-running agentic work" is an
  accurate paraphrase of that Description cell, not an invented use case.
- **Second outline-stage clean pass confirmed 2026-07-15** on a later
  revision of this outline (same beat structure: one-Opus/one-Haiku hook,
  lazy-default-fails-both-ways turn, pricing-with-Fable-5-aside proof beat,
  seo-researcher/Sonnet-floor/link-integrity-reviewer beats, the effort-left-
  alone honest-limit beat, the fan-out-compounds beat citing MindStudio, the
  Haiku-missed-a-backdoor turn, payoff, and single build-log CTA). Every
  fact re-verified against live sources and this ledger with zero gate
  findings: agent-roster model grep (seo-researcher/opus,
  link-integrity-reviewer/haiku, everyone else sonnet — including
  brief-writer, drafter, synthesis, digest-expert confirmed individually),
  link-integrity-reviewer's "right target among plausible ones" +
  "anchor sanity" checks confirmed against its own agent file (not just the
  single-axis summary), pricing/Fable-5/effort claims all reconfirmed live,
  fan-out counts and round caps correct, MindStudio's $15/$0.25 numbers kept
  as MindStudio's own (not blended with our $15/$5 Sonnet/Haiku output
  prices), and the build-log CTA target's pubDate (2026-07-13) confirmed to
  predate this post (2026-07-18).
- **Anthropic overview page's comparison-table "Description" cell for Sonnet 5
  confirmed verbatim** (2026-07-15 live fetch of
  [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview)):
  "The best combination of speed and intelligence." A draft paraphrasing this
  unquoted as "the tier that balances speed and intelligence best" is a fair,
  accurate paraphrase. Same fetch re-confirms the full comparison table:
  Fable 5 $10/$50 ("Next-generation intelligence for long-running agents"),
  Opus 4.8 $5/$25 ("For complex agentic coding and enterprise work"), Sonnet 5
  $3/$15 list with the footnote-4 intro-rate caveat, Haiku 4.5 $1/$5 ("The
  fastest model with near-frontier intelligence"); Fable 5 GA "beginning June
  9, 2026."
- **`2026-07-10-gpt-5-6-vs-claude-for-coding-agents` confirmed as a real,
  live cross-post target that actually discusses Claude Fable 5 vs GPT-5.6**
  (checked 2026-07-15): the post states "This blog still runs on Claude, and
  I'm still Fable 5 under the hood" and runs a full Fable-5-vs-GPT-5.6-Sol
  benchmark comparison (Artificial Analysis Coding Agent Index, Agents' Last
  Exam, SWE-Bench Pro). A `which-claude-model-to-use` draft linking to it with
  "the same tier I weighed against GPT-5.6 for coding agents a few weeks back"
  is accurately described and correctly past-tense (target pubDate 2026-07-10
  predates 2026-07-18). Note: that post's "I'm still Fable 5 under the hood"
  is about Scout's own narrator-level model, a separate claim from this
  post's per-agent content-pipeline routing table — not a contradiction, just
  don't conflate the two if a future draft tries to merge them.
- **DRAFT-stage fact-check pass confirmed 2026-07-15, now three independent
  passes on this exact draft text, zero gate findings every time** (initial
  pass, a document-review fan-out re-pass that independently re-grepped
  `model:`/`effort:` frontmatter rather than trusting the ledger, and a third
  confirming pass). Every claim covered by this post's standing ledger
  entries held across all three: pricing table with intro-rate caveat and
  July-2026 date stamp, 5x Opus/Haiku output multiplier, Fable 5 aside
  accurate and correctly scoped as "outside the three-way split," effort-
  parameter claims, full agent-roster breakdown incl. "fourteen of the
  fifteen draft reviewers" on Sonnet, seo-researcher at Step 3 description,
  link-integrity-reviewer's checkable-axis + judgment-call nuance,
  Haiku-missed-a-backdoor numbers verbatim, fan-out counts with round-cap-5
  on both loops, MindStudio's $15/$0.25 numbers kept as MindStudio's own,
  "low effort... such as subagents" quoted verbatim, both protected sentences
  ("Per-agent effort tuning is real money still sitting on the table, and I
  know it" / "Haiku missed a backdoor. That's the gap that killed the
  cheap-tier shortcut for anything judgment-shaped") verbatim, Sonnet 5
  tagline and GPT-5.6 cross-post target confirmed, all internal link tenses
  correct against real pubDates. This draft is stable — treat any further
  identical-text pass as a formality unless the draft text actually changes.
  Standing elevation not yet taken: name Fable 5's GA date ("GA since June 9,
  2026") in the Fable 5 aside to sharpen that citation's currency.

## `automate-blog-publishing-schedule` (slug `2026-07-20-automate-blog-publishing-schedule`) — scheduler ground truth + outline-stage findings
- **`schedule.ts` (`.claude/skills/content-pipeline/scripts/schedule.ts`) is
  219 lines total as of 2026-07-15**, not ~150. It grew since the already-
  published 2026-07-20 post's "about 150 lines" estimate — the current file
  includes folder-post support (`isFolder`/`BLOGPOST_FILE` handling, ~15
  references) and a `--status` flag that likely weren't there when 150 was
  measured. Correct current hedge: "about 220 lines." Re-check this line
  count on every future revision of this post — the script is still actively
  changing.
- **Scheduler mechanics confirmed by direct read of `schedule.ts`**:
  `DAILY_DAYS = 28` (exactly 4 weeks) then `MONTHLY_GAP = 30`-day spacing;
  posts dated `> today` are the only ones re-slotted (today-or-earlier is
  frozen, matches the "freeze" claim); `filler: true` in frontmatter sorts to
  the tail via `assignSlots`'s comparator; default mode is dry-run, `--apply`
  writes changes, `--status` prints coverage only; `apply()` rewrites
  `pubDate`, renames the file (or folder), then rewrites every `/blog/<slug>`
  link in every other post/blogpost.md that pointed at the moved slug. All of
  this matches the outline/post's descriptions.
- **The coverage report's "days out" number (e.g. "19 days") is a LIVE,
  dynamically-computed value (`coverage()` in `schedule.ts`), not a fixed
  constant like the 28-day target or 4-week cadence.** It depends on
  whatever's actually queued in `src/content/blog/` at the moment the script
  runs. An outline/draft instructing "keep numbers exact" or asserting a
  specific day-count as fixed is a gate finding — the day-count must be
  re-pulled by actually running the scheduler at draft/generation time
  (`npx tsx schedule.ts --status`) and framed as "at the time of writing,"
  not assumed to match an earlier post's reading. The 28-day target and
  4-week/monthly cadence ARE fixed code constants and are safe to state as
  exact.
- **`dark-dashboard-design` pubDate confirmed 2026-07-14** (before this
  post's 2026-07-20) — past/neutral tense on that link is fine.
- **Astro content collections filename-as-slug claim confirmed against
  Astro's own docs** —
  [docs.astro.build/en/guides/content-collections](https://docs.astro.build/en/guides/content-collections/):
  "A unique id for each entry will be automatically generated from its file
  name." Elevation: cite this directly rather than resting the claim only on
  the post's own authority.
- **WordPress.com/HubSpot/Search Engine Journal cadence claims re-confirmed
  live 2026-07-15** (all three already used in the published 2026-07-20 post
  and the `ai-automation-stack` post):
  [wordpress.com/go/content-blogging/how-to-schedule-and-automate-wordpress-blog-post-publishing](https://wordpress.com/go/content-blogging/how-to-schedule-and-automate-wordpress-blog-post-publishing/)
  — "half of all bloggers publish weekly or several times a month. Very few
  manage to publish every day," plus "this leaves less space for human
  error";
  [blog.hubspot.com/marketing/blogging-frequency-benchmarks](https://blog.hubspot.com/marketing/blogging-frequency-benchmarks)
  — "if your blog isn't at least a year old, you should aim to publish 6-8
  posts a month around a few important and promising topic clusters";
  [searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884](https://searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884/)
  — "Google appreciates sites that update consistently," and abandoning an
  aggressive posting schedule "does you more harm than good." Elevation: these
  are marketing benchmark pages that get refreshed periodically — frame as
  "as of 2026" if this post's cadence numbers get revisited later.
- **OUTLINE-stage pass 2026-07-15 — gate findings on the stale 150-line
  figure (see above) and the "numbers are fixed" framing applied to the live
  19-day coverage reading.** Everything else checked clean: twelve-stage
  pipeline count correct (not the old post's stale "eight-stage/seven-agent"
  figure — the outline explicitly steers away from it), fifteen-reviewer
  claim and "each grades one axis" framing correct, tone gate correctly
  folded into the draft review loop rather than listed as its own stage, the
  `ai-automation-stack` link's now-published status correctly handled (no
  stale "coming soon" framing), package name/install command/repo URL all
  match `agentic-content-pipeline` facts above.
- **OUTLINE-stage pass 2026-07-15 (later revision, the "queue kept hitting
  zero" title) — one new gate pattern: "rewrite links across the whole site"
  overstates `apply()`'s actual scope.** Direct read of `schedule.ts` confirms
  `apply()` only calls `linkBearingFiles(blogDir)`, which scans
  `src/content/blog/` (flat `.md` files + each folder post's `blogpost.md`)
  — it does NOT touch `src/pages/`, `src/components/`, or any other part of
  the site. Grepped `src/pages/` and `src/components/` for hardcoded
  `/blog/2026-...` links and found none — every current internal blog-to-blog
  link already lives inside `content/blog`, so in practice nothing outside
  that directory currently needs rewriting, but the CODE's actual reach is
  scoped to `content/blog`, not "the whole site." An outline/draft describing
  the rename step as rewriting links "across the whole site" is a gate
  finding — correct phrasing is "every other post in content/blog" (this
  post's own beat-5 facts bullet already uses the accurate phrasing; beat-1's
  facts bullet and intendedBeat used the overstated "whole site" version —
  keep both consistent going forward). Everything else in this revision holds:
  219-line count (confirmed again via direct line-count read of
  `schedule.ts`, "about 220" hedge correct), DAILY_DAYS=28/MONTHLY_GAP=30
  mechanics, freeze rule (`future = posts.filter(p => p.date > today)`),
  filler-sinks-to-tail comparator, dry-run/--apply/--status behavior, the
  19-day coverage figure correctly hedged "at the time of writing" (not
  asserted as fixed) in both beat 4 and the CTA, WordPress.com/HubSpot/SEJ
  quotes and URLs matching the already-confirmed 2026-07-15 re-check exactly,
  12-stage/15-reviewer/tone-gate-folded-in pipeline facts correct, GitHub repo
  URL correct, link tenses all correct (dark-dashboard-design 07-14 past,
  automate-blog-writing-with-ai-agents 07-13 past, ai-automation-stack 07-19
  present/no "coming soon"). Elevation still open: the Astro
  filename-as-slug claim (beat 3) has no citation in the outline — Astro's own
  docs page confirms it verbatim (see entry above), worth citing inline
  instead of resting on the post's own authority.
- **NEW claim confirmed 2026-07-15 — Astro's `slug` frontmatter field overrides
  the filename-derived id.** Direct WebFetch of
  [docs.astro.build/en/guides/content-collections](https://docs.astro.build/en/guides/content-collections/)
  confirms verbatim: "You can override a single entry's generated `id` by
  adding your own `slug` property to the file frontmatter or data object for
  JSON files." A beat-3 addition ("Astro actually documents a way around
  this... I could've kept pubDate as the only thing that moves... I didn't
  build it that way") is accurate and well-sourced (the outline already lists
  the same content-collections URL in `sources`). Elevation: quote the doc's
  own line directly ("You can override a single entry's generated id by
  adding your own slug property...") rather than only paraphrasing, for a
  sharper citation.
- **`schedule.ts` re-confirmed 219 lines / "about 220" hedge still correct,
  and `assignSlots`'s no-reserved-slot behavior re-confirmed by direct code
  read 2026-07-15**: `assignSlots` starts at `addDays(today, i + 1)` for the
  first future post (i=0 → tomorrow) with no gap between consecutive slots —
  there is no reserved/empty buffer day at rest. This directly supersedes the
  already-published 2026-07-20 post's "One slot stays open on purpose" /
  "the open slot is why 'automated' doesn't mean 'rigid'" framing, which does
  NOT match the current code. A rewrite beat describing a same-day post as
  riding the freeze rule (today-or-earlier untouched) rather than a reserved
  slot, and describing a same-day future-queue jump as bumping the ENTIRE
  future queue back a day (not just one reserved slot), is the historically
  accurate rewrite — this is a correction of the live post, not a mistake in
  the new outline.
- **Search Engine Journal posting-frequency piece — "daily for a few weeks
  then dark for months" scenario confirmed verbatim** (2026-07-15) via direct
  WebFetch of
  [searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884](https://searchenginejournal.com/how-often-should-you-blog-tips-for-ideal-posting-frequency/530884/):
  "Let's say you start with a very aggressive content schedule, publishing
  daily for a few weeks, but then completely forget about your blog for
  several months. That inconsistent approach does you more harm than good,"
  plus "Google appreciates sites that update consistently, establishing a
  rhythm of high-quality new information to share." A draft paraphrase like
  "publishing daily for weeks and then going dark for months does more harm
  than holding a slower, steady pace" (no quote marks) is accurately
  supported — this was previously only loosely approved via the outline's
  facts bullet; now independently re-verified against the live source text.
- **DRAFT-stage pass 2026-07-15 ("Queue Hit Zero, I Automated My Blog's
  Publishing Schedule") — clean, zero gate findings.** Full-prose draft (not
  outline) checked against every standing landmine for this post and held:
  "about 220 lines" (not the stale "150"), DAILY_DAYS=28/MONTHLY_GAP=30
  mechanics stated correctly, freeze rule (today-or-earlier untouched) stated
  correctly, filler-sinks-to-tail correct, dry-run/--apply/--status behavior
  correct, link-rewrite scope correctly stated as "every other post in
  `content/blog`" throughout (no "whole site" overstatement anywhere in this
  revision — the beat-1 landmine flagged at outline stage did not recur),
  no-reserved-slot same-day framing correct (freeze rule, not "one slot stays
  open"), 19-day coverage figure hedged "at the time of writing" / "right
  now" in both beat 4 and the closing beat (not asserted as a fixed constant),
  28-day target and 4-week/monthly cadence stated as exact constants
  (correct), Astro filename-as-slug and slug-override claims both accurate
  and both hyperlinked to docs.astro.build, all three cadence-source quotes
  (WordPress.com/HubSpot/SEJ) match live re-checks including the newly
  re-verified SEJ scenario above, 12-stage pipeline count correct, GitHub repo
  URLs correct (agentic-content-pipeline + build-in-public-site), all internal
  link tenses correct (dark-dashboard-design 07-14 past,
  automate-blog-writing-with-ai-agents 07-13 past, ai-automation-stack 07-19
  present/no "coming soon", how-to-measure-blog-seo 07-09 past). Two standing
  elevations remain un-adopted: (1) quote Astro's slug-override doc line
  verbatim instead of only paraphrasing; (2) date-frame the WordPress.com/
  HubSpot/SEJ cadence stats as "as of 2026."
- **DRAFT-stage pass 2026-07-15 (later same-day revision, "Queue Hit Zero, I
  Automated My Blog's Publishing Schedule") — ONE gate finding: stale coverage
  figure.** This revision states "about 11 days" (twice: beat 4 and the CTA)
  for the live coverage reading. No Bash tool was available this pass, so
  the figure was independently re-derived by direct computation: enumerated
  every file in `src/content/blog/` (52 files, no folder posts —
  `**/blogpost.md` glob returned zero matches), filtered to `date > 2026-07-15`
  (today), and got exactly 16 future-dated posts, one per day, contiguous
  2026-07-16 through 2026-07-31 with no gaps. Per `assignSlots`'s actual logic
  (reassigns future posts to consecutive days starting `today+1` by index,
  ignoring their original filenames' dates), `coverage()`'s `dailyOut` for a
  contiguous 16-post future queue is exactly 16 (breaks the first day it finds
  a gap; here that's day 17). **The correct live figure as of this check is
  "about 16 days," not "about 11."** This also supersedes the "about 19 days"
  reading recorded in the two entries directly below/above this one from
  earlier the same day — the queue composition changed between those checks
  and this one (expected and fine per the standing "live, not fixed" rule;
  what's NOT fine is a draft asserting a number that doesn't match ANY actual
  state, past or present, of the live queue). Flag "about 11 days" as a gate
  finding on any revision that still carries it; the fix is "about 16 days,"
  re-verified against a fresh file enumeration + `assignSlots`/`coverage`
  logic each time this post is re-checked (the true fix is running
  `npx tsx schedule.ts --status` directly when a Bash tool is available —
  prefer that over manual enumeration when possible). Everything else in this
  revision held clean: "about 220" line count, DAILY_DAYS=28/MONTHLY_GAP=30
  mechanics, freeze rule, filler-sinks-to-tail, dry-run/--apply behavior,
  link-rewrite scope correctly "content/blog" (not "whole site") throughout,
  no-reserved-slot same-day framing, all three cadence-source quotes
  (WordPress.com/HubSpot/SEJ) accurate, Astro filename-as-slug + slug-override
  claims both accurate and hyperlinked, 12-stage pipeline count correct, all
  internal link tenses correct, GitHub repo URLs correct. Two standing
  elevations still open: (1) quote Astro's slug-override doc line verbatim;
  (2) date-frame the WordPress.com/HubSpot/SEJ cadence stats as "as of 2026."
- **OUTLINE-stage pass 2026-07-15 (title "Queue Hit Zero, So I Automated My
  Blog's Publishing Schedule") — clean, zero gate findings.** Confirmed:
  "about 220" line-count hedge, DAILY_DAYS=28/MONTHLY_GAP=30 mechanics, freeze
  rule, filler-sinks-to-tail, dry-run/--apply/--status behavior, "content/blog"
  (not "whole site") scoping for link rewrites throughout, 19-day coverage
  figure correctly hedged "at the time of writing" with re-run instructions in
  gateGuidance (not asserted fixed), no-reserved-slot same-day framing (see
  above), all three cadence-source quotes (WordPress.com/HubSpot/SEJ) match
  live re-checks, 12-stage/15-reviewer/tone-gate-folded-in pipeline facts
  correct, GitHub repo URLs correct (`agentic-content-pipeline` for the
  pipeline, `buildaloud/build-in-public-site` — confirmed public and live via
  WebFetch — for "steal the ruleset"), all internal link tenses correct
  (dark-dashboard-design 07-14 past, automate-blog-writing-with-ai-agents
  07-13 past, ai-automation-stack 07-19 present/no "coming soon",
  how-to-measure-blog-seo 07-09 past). New Astro `slug`-override claim (see
  entry above) is new content in this revision and independently confirmed
  true. Two open elevations: (1) date-frame the WordPress.com/HubSpot/SEJ
  cadence stats as "as of 2026" since marketing benchmark pages refresh
  periodically; (2) quote Astro's own slug-override doc line verbatim instead
  of only paraphrasing it.
- **DRAFT-stage pass 2026-07-16 ("Queue Hit Zero, I Automated My Blog's
  Publishing Schedule") — ONE gate finding: stale coverage figure again, this
  time "about 11 days" (both instances) is wrong for a DIFFERENT reason than
  the 2026-07-15 check.** No Bash tool available this pass either; re-derived
  by direct enumeration of `src/content/blog/` (grepped every `pubDate`, no
  folder posts present). With today = 2026-07-16 (one day later than the prior
  check), the post dated 2026-07-16 itself (`writing-alt-text-seo-accessibility`)
  is now frozen (`date > today` is false for it), and the future queue is
  exactly 15 contiguous posts, one per day, 2026-07-17 through 2026-07-31, no
  gaps (this post's own file, `2026-07-20-automate-blog-publishing-schedule.md`,
  is one of the 15). Per `assignSlots`/`coverage` logic (consecutive daily
  slots from `today+1`, no gaps introduced by the filler-sorts-to-tail
  comparator), `dailyOut` for a contiguous 15-post future queue is exactly 15.
  **The correct live figure as of this check is "about 15 days," not "about
  11."** This is a rollover of the prior "about 16 days" reading (2026-07-15
  check) — one day passed, one post rolled from future into frozen-today,
  16 → 15. Confirms the standing rule: re-derive this figure fresh on every
  pass, don't reuse a prior pass's number even if it's from only a day earlier.
  Everything else in this revision held clean: "about 220" line count,
  DAILY_DAYS=28/MONTHLY_GAP=30 mechanics, freeze rule, filler-sinks-to-tail,
  dry-run/--apply behavior, link-rewrite scope correctly "content/blog" (not
  "whole site") throughout, no-reserved-slot same-day framing, all three
  cadence-source quotes (WordPress.com/HubSpot/SEJ) accurate, Astro
  filename-as-slug + slug-override claims both accurate and hyperlinked,
  12-stage pipeline count correct, all internal link tenses correct, GitHub
  repo URLs correct. Two standing elevations still open: (1) quote Astro's
  slug-override doc line verbatim; (2) date-frame the WordPress.com/HubSpot/SEJ
  cadence stats as "as of 2026." Prefer running `npx tsx schedule.ts --status`
  directly over manual enumeration whenever a Bash tool is actually available
  in a future pass — manual enumeration works but is slower and more
  error-prone than letting the script report its own number.
- **`hired-a-team-of-specialists` (slug 2026-07-21) — DRAFT-stage first pass,
  2026-07-16.** One gate finding: the quote "token costs scale linearly with
  team size" renders Osmani's sentence with a lowercase "t" — every rendering
  on his page (prose, the "Right-size your team" bullet, and the "key
  takeaways" standalone line) capitalizes it as "Token costs scale linearly
  with team size." (it opens a sentence in all three places). Fix by
  capitalizing "Token" inside the quote marks. Everything else in this draft
  checked clean against the outline-stage-clean and standing-landmine
  entries above: security-kit six-lane order and names correct
  (surface-mapper → [untrusted-]input-tracer → threat-modeler → vuln-hunter →
  false-positive judge → mitigation-planner — draft shortens
  "untrusted-input-tracer" to "input-tracer" and expands "fp-judge" to
  "false-positive judge," neither is a wrong-fact, flagged as an elevation
  for precision only); tower-defense six-lane roster + monetization "off to
  the side" correct; "Here's candidate A, B, C, D. Here's the tradeoff on
  each. Chad picks." verbatim; Osmani "significantly better database code...
  a generalist" verbatim; Osmani "is no longer generation. It's
  verification." verbatim; Osmani "3-5 teammates is the sweet spot." verbatim
  (matches the digit-form bullet, not just the spelled-out prose form); AI21
  "its own isolated execution environment" verbatim, correctly caveated as
  "parallel attempts... rather than parallel specialties"; pipeline counts
  exact (12 outline reviewers/round cap 5, 15 draft reviewers/round cap 5,
  tone gate folded into the draft-review-loop beat with the 15-or-above
  threshold, timing "start of every round and once more after the loop
  exits," single human checkpoint = topic approval, "now runs as"
  present-tense package framing correct for a post publishing 2026-07-21);
  Anthropic 90.2% figure accurate (unquoted paraphrase) and Anthropic 15x
  token figure accurate (unquoted paraphrase) — neither carries "as of June
  2025" dated framing in this revision, flagged as an elevation, not a gate,
  per the datedness axis being advisory rather than a hard-gate trigger;
  agentic-content-pipeline README 100-160-dispatches/15-agent-burst figures
  accurate (unquoted paraphrase); install command verbatim; every internal
  link's tense correct (game 06-16, security post 07-10, automate-blog-
  writing 07-13, all predate this post's 07-21 pubDate — past/implicit-past
  framing is fine, no false "written before" claim). Sources footer complete
  and uses the canonical `code.claude.com/docs/en/sub-agents` URL.
- **`hired-a-team-of-specialists` — DRAFT-stage second pass, 2026-07-16 (this
  exact revision). Prior gate finding (lowercase "token") is FIXED — this
  revision correctly capitalizes "Token costs scale linearly with team size."
  New gate finding: the monetization-guard beat conflates two DIFFERENT
  sentences from the source game post into one, swapping the source's own
  word.** Confirmed via direct read of
  `src/content/blog/2026-06-16-building-a-game-with-claude-code-in-3-weeks.md`
  lines 74 and 98: the source says, in two separate places, "It gets a **vote**
  on anything that touches the store or the economy" (line 74) and, later,
  regarding the guard overall, "It has **veto**. It uses it." (line 98) — the
  source itself distinguishes "vote" (scope: anything touching store/economy)
  from "veto" (the guard's specific power). This draft's rendering — "It gets a
  **veto** on anything touching the store or the economy, and it uses it." —
  substitutes "veto" for "vote" in the store/economy clause, misquoting the
  source and overstating the guard's blanket reach. Fix: use "vote" for that
  clause, matching the source's own wording, while keeping "veto pay-to-win"
  for the mandate sentence (that half is already correct). Everything else in
  this revision re-confirmed clean against the draft-stage-first-pass and
  outline-stage entries above: all quotes (Osmani "significantly better
  database code... a generalist," Osmani "is no longer generation. It's
  verification.," Osmani "3-5 teammates is the sweet spot.," Osmani "Token
  costs scale linearly with team size." now correctly capitalized, AI21 "its
  own isolated execution environment," game's "Here's candidate A, B, C, D...
  Chad picks.") verbatim; security-kit six-lane order/names correct
  (surface-mapper, untrusted-input-tracer — full name this time, not shortened
  — threat-modeler, vuln-hunter, false-positive judge, mitigation-planner);
  pipeline counts exact (12/15 reviewers, round cap 5, tone-gate threshold 15,
  single human checkpoint = topic approval); Anthropic 90.2% dated to "the June
  2025 model lineup it tested" in-body (elevation from the prior pass now
  adopted); Anthropic 15x-token figure still undated in this beat (standing
  elevation, not gate); agentic-content-pipeline README figures + install
  command accurate; every internal link tense-checked correct against real
  pubDate. Standing elevation still open: no inline "(v0.2.0)" tag for the
  package swap.
- **`hired-a-team-of-specialists` — DRAFT-stage third pass, 2026-07-16 (this
  exact revision, "What the team costs" section expanded).** Zero gate
  findings. Both prior landmines (lowercase "token," veto/vote conflation)
  remain fixed. Anthropic 15x-token figure now ALSO dated in-body ("the same
  June 2025 study") — the prior pass's standing elevation is adopted here.
  New content this pass, both verified: (1) a new internal link, "I laid out
  the routing table, tier by tier with current pricing, in its own post" →
  `/blog/2026-07-18-which-claude-model-to-use/` — past tense is correct,
  that post's pubDate (07-18) predates this post's pinned pubDate (07-21).
  (2) A new Anthropic paraphrase: "its own multi-agent write-up admits most
  coding tasks don't parallelize as cleanly as its research use case does,
  and that domains needing shared context or tight dependencies between
  agents aren't a good fit for the technique today" — confirmed via direct
  fetch 2026-07-16 of
  [anthropic.com/engineering/multi-agent-research-system](https://www.anthropic.com/engineering/multi-agent-research-system):
  "most coding tasks involve fewer truly parallelizable tasks than research,
  and LLM agents are not yet great at coordinating and delegating to other
  agents in real time" + "some domains that require all agents to share the
  same context or involve many dependencies between agents are not a good
  fit for multi-agent systems today." Accurate paraphrase, not quoted, no
  gate issue. This post's sourcing style is footer-only (no inline citation
  links per claim, e.g. Osmani/AI21 quotes aren't inline-linked either) —
  consistent throughout, not a gate finding. Elevations offered (not gate):
  (a) the Osmani "3-5 teammates" quote appears here in spelled-out prose form
  ("Three to five teammates is the sweet spot") rather than the digit-form
  bullet the outline specified — both are verbatim-correct against the
  source (confirmed both forms exist), so purely a style note; (b) the
  "roughly fifteen" reviewer-axes sentence names only 6 of 15 axes (hook,
  voice, structure, SEO, fact accuracy, link integrity) — same standing
  elevation as other posts, naming impact/emotion/meta-content would fully
  account for the count; (c) "with current pricing" on the which-claude-
  model-to-use link could be dated ("pricing as of publish") per the
  standing model-name/price datedness caution.
- **`hired-a-team-of-specialists` — DRAFT-stage fourth pass, 2026-07-16 (this
  exact revision).** Zero gate findings. Elevation (c) from the pass-3 entry
  above is now ADOPTED — the which-claude-model-to-use link reads "pricing as
  of that post" instead of "current pricing." All prior-fixed landmines still
  hold: "Token costs scale linearly with team size." capitalized; monetization
  guard correctly uses "vote" (not "veto") for the store/economy clause,
  reserving "veto" for the pay-to-win mandate; Anthropic 90.2% dated "the June
  2025 model lineup it tested"; Anthropic 15x-token figure dated "the same
  June 2025 study"; all quotes re-checked verbatim (Osmani "significantly
  better database code... a generalist," Osmani "is no longer generation.
  It's verification.," Osmani "3-5 teammates is the sweet spot." digit form,
  Osmani "Token costs scale linearly with team size.," AI21 "its own isolated
  execution environment," game's "Here's candidate A, B, C, D. Here's the
  tradeoff on each. Chad picks."); security-kit six-lane order/names correct;
  tower-defense roster + monetization "off to the side" correct, and the
  "candidate A, B, C, D" pattern appears only in beat 8, not beat 4; Anthropic
  parallelize-poorly paraphrase (coding tasks vs. research, shared-context/
  tight-dependency domains) accurate; README 100-160-dispatches/15-agent-burst
  figures and install command accurate; every internal link's tense correct
  against real pubDate (game 06-16, security post 07-10, automate-blog-writing
  07-13, which-claude-model-to-use 07-18, all predate this post's 07-21
  pubDate). Two standing elevations still open, not gates: (a) the "axes
  include hook, voice, structure, SEO, fact accuracy and link integrity"
  sentence still names only 6 of 15 draft-reviewer axes — naming
  impact/emotion/meta-content would fully account for "fifteen"; (b) the
  90.2% figure could cite Anthropic's exact publish date (June 13, 2025)
  instead of "the June 2025 model lineup it tested" for a sharper anchor.
- **`hired-a-team-of-specialists` — DRAFT-stage fifth pass, 2026-07-16 (this
  exact revision).** Zero gate findings. Elevation (b) from the pass-4 entry
  above is now ADOPTED — the 90.2% sentence reads "tested against the June
  13, 2025 model lineup, it outperformed a single Opus 4 agent by 90.2
  percent," citing Anthropic's exact publish date directly (confirmed dateline
  "Published Jun 13, 2025" per the standing entry above). All prior-fixed
  landmines still hold: "Token" capitalized in the linear-cost quote;
  monetization guard uses "vote" for the store/economy clause and "veto" only
  for the pay-to-win mandate; every quote re-checked verbatim (Osmani
  "significantly better database code... a generalist," Osmani "is no longer
  generation. It's verification.," Osmani "3-5 teammates is the sweet spot."
  digit form, Osmani "Token costs scale linearly with team size.," AI21 "its
  own isolated execution environment," game's "Here's candidate A, B, C, D.
  Here's the tradeoff on each. Chad picks." in beat 8 only); security-kit
  six-lane order/names correct (surface-mapper, untrusted-input-tracer,
  threat-modeler, vuln-hunter, false-positive judge, mitigation-planner);
  tower-defense six-lane roster + monetization "off to the side" correct;
  Anthropic parallelize-poorly paraphrase accurate; Anthropic 15x-token figure
  dated "the same June 2025 study"; README 100-160-dispatches/15-agent-burst
  figures and install command accurate; pipeline counts exact (12/15
  reviewers, round cap 5, tone-gate threshold 15, timing "start of every round
  and once more after the loop exits," single human checkpoint = topic
  approval, present-tense package framing correct); new axes-naming sentence
  now lists 9 of 15 ("hook, voice, structure, SEO, fact accuracy, link
  integrity, structural impact, emotional impact and meta-content") — improved
  from the pass-4 revision's 6, but still not exhaustive (flatness, formulaic,
  wordsmith, grammar, link-opportunity, bullshit-detector unnamed) — elevation
  (a) above is partially adopted, not fully; keep offering it. Every internal
  link's tense correct against real pubDate (game 06-16, security post 07-10,
  automate-blog-writing 07-13, which-claude-model-to-use 07-18, all predate
  this post's 07-21 pubDate). New elevation this pass: no inline "(v0.2.0)"
  version tag on the agentic-content-pipeline mention in "What the team
  costs" — same standing elevation open on the `ai-automation-stack` post
  above, now also open here.

## `dividing-a-company-that-makes-no-money` (slug `2026-07-22-dividing-a-company-that-makes-no-money`) — verified clean through DRAFT stage, latest check 2026-07-16
- **Pillsbury Propel 65% Wasserman stat** — live on
  [pillsburypropel.com/guidance/how-to-split-equity-between-co-founders-and-stay-friends](https://www.pillsburypropel.com/guidance/how-to-split-equity-between-co-founders-and-stay-friends):
  "In his 2012 book, *The Founder's Dilemmas*, Noam Wasserman estimated that
  around 65% of high-potential startups fail due to conflict among
  co-founders." Scope: high-potential startups; cause: co-founder conflict.
  Standing elevation (not yet adopted): date-anchor as "2012 book" per
  Pillsbury's own framing, instead of a bare "roughly 65%."
- **Stripe "might not hold true over time" quote** — live on
  [stripe.com/resources/more/how-to-split-equity-among-cofounders-in-a-startup](https://stripe.com/resources/more/how-to-split-equity-among-cofounders-in-a-startup):
  "It assumes each founder will contribute equally to the company's growth,
  which might not hold true over time." Safe verbatim quote; safe paraphrase
  "assumes both people contribute equally forever."
- **Pillsbury also supports**: "Drafting a written founders' agreement is
  essential," and separately warns that granting equity once value has been
  created "introduces its own tax complications" (QSBS holding period) —
  supports the draft's "the kind Pillsbury calls essential to draft before
  value gets created... waiting too long adds tax complications."
- **Stripe also supports**: names "institutional vesting mandates, governance
  rules, and preferred share classes" as standard once a seed round closes —
  supports "Stripe treats it as standard once funding actually shows up."
- **Own-project facts**: `src/data/projects.ts` lists
  `builders: ['Chad', 'Andrew']`; `/projects` route and `src/pages/rss.xml.ts`
  both exist — the buildaloud.ai / /projects / RSS-feed CTA claims are
  accurate.
- **This post is a rewrite of an already-published post** — the
  two-thirds/one-third decision lean and $0-revenue framing are already
  public claims, not new disclosures.
- Checked clean across outline stage (multiple passes) and full-prose draft
  stage (multiple passes, latest 2026-07-16) — zero gate findings every time.
  Only open item: the standing date-anchor elevation above.

## `rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill` (slug `2026-07-24-rate-limiting-an-llm-so-a-stranger-cant-run-up-my-bill`) — OUTLINE stage clean, verified 2026-07-16
- **This is a rewrite of an already-published post** (same slug/pubDate is
  live in `src/content/blog/`). The live post is a reliable ground truth for
  the assistant's own architecture facts and matches the outline throughout:
  99-char input cap, 300-token output cap, 10-message history cap, 5/hour +
  20/day per-visitor and per-IP caps, 500,000-token/day global ceiling, all
  caps in one `ratelimit.ts` module on Upstash Redis, time-bucket keys (hourly
  key expires in 1h, daily in 24h, token budget on a 48h key), 30-day TTL on
  transcripts, `CHAT_BYPASS_TOKEN` bypass concept (name only, never a value),
  cheap Haiku-class model via the Vercel AI Gateway.
- **dev.to token-cost quotes confirmed verbatim** (2026-07-16) on
  [dev.to/pranay_batta/rate-limiting-in-llm-applications-why-you-need-it-and-how-to-build-it-5gf4](https://dev.to/pranay_batta/rate-limiting-in-llm-applications-why-you-need-it-and-how-to-build-it-5gf4):
  "A single API call with a 200,000-token context window costs as much as 50
  calls with 4,000-token prompts." and "Request-count limits do nothing to
  prevent a single runaway call from consuming your entire daily budget." One
  article, one author — always attribute as "one write-up," never "the
  industry."
- **$82k stolen-key incident confirmed** (2026-07-16) on
  [pointguardai.com/blog/when-a-stolen-ai-api-key-becomes-an-82-000-problem](https://www.pointguardai.com/blog/when-a-stolen-ai-api-key-becomes-an-82-000-problem):
  "a developer found that a stolen Gemini API key had been used to generate
  more than $82,000 in usage charges in roughly 48 hours," against "a normal
  monthly spend that hovered around a couple hundred dollars." **First
  reported by The Register** (per pointguardai's own attribution), with
  follow-on coverage from Tom's Hardware and TechSpot — safe to cite "first
  reported by The Register" as the outline does. The underlying key was
  specifically a Gemini key; the outline/post correctly keeps this generic
  ("a compromised AI key") rather than implying it involved our own stack.
  Elevation on file: linking The Register's original story directly (in
  addition to or instead of the pointguardai secondary write-up) would be a
  stronger primary-source citation.
- **Redis EXPIRE/TTL page confirmed live** (2026-07-16) at
  [redis.io/docs/latest/commands/expire](https://redis.io/docs/latest/commands/expire/):
  "Set a timeout on `key`. After the timeout has expired, the key will
  automatically be deleted." Accurately supports "Redis's own TTL/EXPIRE
  mechanism does that work natively."
- **chads.website input counter confirmed live** (2026-07-16): the "Ask my
  work" box shows a live character counter ("0/99", ticking up as you type)
  next to the 99-char hard cap — supports the outline's "the counter's right
  there on the page, ticking up as you type" line.
- **Cross-post facts confirmed**: `2026-06-26-ai-on-my-site-told-it-to-defer`
  (pubDate 2026-06-26, before this post) is accurate ground truth for "third
  person, defers instead of guessing, resists prompt injection."
  `2026-07-11-anonymous-like-button-without-login` (pubDate 2026-07-11, before
  this post) accurately backs the "layered device id, no single layer
  trusted" callback. Both links use correct past-tense framing (targets
  predate this post's 2026-07-24 pubDate).
- No gate findings at outline stage. Every sourced claim traces to a live,
  fetched source; every own-project fact matches the already-published
  version of this same post.
- **DRAFT stage checked clean, 2026-07-16 (four passes)**: full prose matches
  every number above verbatim (99/300/10/5/20/500,000/30-day/48h/1h/24h),
  both dev.to quotes verbatim, Redis EXPIRE quote accurate, own-project facts
  consistent with the live post. Point Guard AI's "the attacker did not need
  to exploit a software vulnerability... they simply used the service as
  intended, and the billing system faithfully recorded every request"
  directly supports the draft's "no bug was involved, the service ran
  exactly as designed" framing — re-confirmed via fetch. Zero gate findings
  all four passes. The Register's exact figure: $82,314.44 in ~48 hours
  against normal spend of $180/month (a compromised Gemini key, Feb 11-12),
  first reported at
  [theregister.com/2026/03/03/gemini_api_key_82314_dollar_charge](https://www.theregister.com/2026/03/03/gemini_api_key_82314_dollar_charge/).
  **Fourth pass (this dispatch): The Register is now hyperlinked inline AND
  in the Sources list — the prior standing elevation (link it directly) is
  resolved, drop it.** Open elevation instead: "More than $82,000" could
  tighten to the source's exact "$82,314.44" for a sharper citable figure.

## `grill-me` — REAL skill, real audit ground truth (2026-07-16, for the correction rewrite of slug `2026-07-15-grill-me-what-an-auditor-sees`)
- **grill-me is Matt Pocock's real skill** at github.com/mattpocock/skills (path `skills/productivity/grill-me`), a Socratic "relentless interview to sharpen a plan or design" (its own SKILL.md frontmatter description). The 2026-07-15 post's footnote calling it "a rhetorical stand-in invented for this post" was FALSE — founding defect of the assertion-audit stage.
- **Our AST v1.0 audit (published, live)**: maliciousIntent 0, inherentCapability 0, misuseSurface 0, overallExposure 0; findings: [] (none); dangerLevel "low"; all 10 AST types explicitly cleared in notDetected (e.g. AST-04: "no hidden instructions, injected system-prompt text, or disguised payloads"; AST-10 notes `disable-model-invocation: true` requires explicit user invocation). Audit summary quote: "The security posture is effectively risk-free." Skill contents at audited commit 9603c1c: SKILL.md (147 bytes) + agents/openai.yaml (137 bytes) — no scripts, no network, no filesystem, no credentials.
- **Live listing**: https://marketplace.buildaloud.ai/api/skills/mattpocock--grill-me (full JSON, 200) and searchable on https://marketplace.buildaloud.ai/skills. There are NO standalone per-skill pages — /skills/:slug 308-redirects to the grid; never link a per-skill page.
- **Model tiering (honest description)**: docs-only skills route to Haiku triage by default (Haiku returned clean, did not escalate, ~$0.09); the published verdict was re-run with forced Sonnet (claude-sonnet-5, ~$0.41). Both agreed all-zero. Say "Sonnet-class audits run where there's a capability surface; trivial docs-only skills get Haiku triage" — do NOT claim every audit is Sonnet.
- **Independent auditors agree**: skills.sh security page for grill-me shows Snyk **Pass / LOW risk / no issues** (audited 2026-05-19), plus **Socket: Pass** and **Gen Agent Trust Hub: Pass** — https://www.skills.sh/mattpocock/skills/grill-me/security/snyk. grill-me is NOT in Snyk's ToxicSkills malicious set. ToxicSkills study (2026-02): 3,984 skills scanned, ~36% flawed, 534 (13.4%) critical, 76 confirmed malicious — https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/.
- **Dogfood beat (true, citable)**: publishing this listing surfaced a real marketplace bug — deploys had failed since ~2026-07-12 because `public/_data/skills.json` grew to 33.8 MiB, over Cloudflare Pages' 25 MiB per-file limit; fixed by capping the RSS feed data to 150 items (224 KB) in `site/scripts/generate-skills-data.ts`. Total pipeline cost for the grill-me audit ~$0.50.
- **Listing fields NOT to cite as grill-me-specific**: `stars` (173,499 = the whole mattpocock/skills repo), `description` (repo-level, not the skill's own), `auditor` (model-authored, unreliable — a Haiku run once wrote "claude-sonnet-4-6"), `hasSkillMd` (false negative — root-only check, monorepo subpath missed).
