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
  convergence with no human sign-off. If either loop hits its 3-round cap with
  gate findings still open, it stops and surfaces to Chad.
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
