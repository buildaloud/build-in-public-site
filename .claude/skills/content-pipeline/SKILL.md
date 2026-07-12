---
name: content-pipeline
description: Orchestrate the Build Aloud content pipeline — gather source material, gate on topic approval, run SEO research, brief, outline, run the outline + draft review-army loops, generate a hero image, author the structured summary + rolling digest, assemble the final post, and commit. Invoke when Chad says "write a new post", "what should we post about?", or to advance the drip queue.
---

# Content Pipeline Skill (Orchestrator)

Today it orchestrates blog-post production end-to-end: source scan → topic
gate → SEO research → brief → outline → outline review loop → draft → draft
review loop → hero image → summary + digest → assemble → bookkeeping. It's named generally
(`content-pipeline`, not `blog-post`) because it's the home for other content
tasks as they're added — but blog-post is the only task type implemented now.

## Entry paths

**Organic post:** proceed through Steps 1–2 normally.

**Drip post:** read `.plans/drip-plan.md` for the scheduled topic and `pubDate`. Skip topic proposal — the topic is already approved. Start at Step 3 with that topic. Perspective (Step 2) still applies — infer Chad vs Scout from the topic digest. **Keyword discovery (Step 2a) is SKIPPED for drip** — there's nothing to inform, the topic is pre-approved. Step 3 refinement still runs (with no discovery output to bind to, so `seo-researcher` falls back to its own keyword-selection methodology), and Assemble (Step 10) still persists `targetKeyword`/`secondaryKeywords`/`searchIntent` into the post's frontmatter exactly as it does for organic posts.

---

## Process

### 1. Gather Context and Material

**Read in parallel:**
```
/Users/chadfurman/projects/business-brainstorm/claude-chats/posted.md
PERSONALITY.md
CLAUDE.md
PLAYBOOK.md
src/content/blog/*.md  (the 2–3 most recent)
```

**Run the cursor-based content scanner:**
```bash
npx tsx .claude/skills/content-pipeline/check-new-content.ts
```
Reports which `.jsonl` chat sessions have new content since the last post. Uses byte-offset cursors — reads only the delta, not the full file.

For files with significant new content:
```bash
npx tsx .claude/skills/content-pipeline/check-new-content.ts --summary <filename.jsonl>
```

**Check for new transcripts:**
```bash
ls -la transcripts/
```
Cross-reference against `posted.md` — any transcript not listed is new material.

**Discover unsymlinked conversations:**
```bash
npx tsx .claude/skills/content-pipeline/check-new-content.ts --discover
```
Scans all Claude project directories for `.jsonl` sessions referencing this project (checks `cwd`, project path, and first 64KB of content). Filters already-symlinked files; prints suggested `ln -s` commands. Review the first message to pick a descriptive name, then run the symlink.

**If discover misses sessions or this is a fresh install:**
```bash
npx tsx .claude/skills/content-pipeline/check-new-content.ts --setup
```
Creates/updates `config.json` next to the script. Edit to change `chatsDir`, `claudeProjectsDir`, or add `relevancePatterns`.

**Also check:** "Topics NOT YET Posted About" in `posted.md`.

---

### 2. Topic-Approval Gate

**2a. Keyword Discovery** — before presenting ideas, dispatch `.claude/agents/seo-researcher.md` via the Agent tool with `model: "opus"` in **discovery mode**, passing `seedTopics: string[]` (the 2–3 candidate topics below). One dispatch, not one per candidate. It fans out via `web-researcher` (autocomplete / PAA / related / SERP), runs the cannibalization check once, and returns a `KeywordOpportunitySet` keyed by candidate — schema at `.claude/skills/content-pipeline/lib/keyword-opportunity-schema.ts`. Skip this sub-step entirely on the drip path (see Entry paths above).

Present Chad with 2–3 post ideas based on new material. Per idea:
- Proposed title
- 1–2 sentence summary
- Which source material it draws from
- Its keyword opportunity set from Step 2a (top opportunities, intent, any cannibalization flag) and the `caveat` line verbatim, so Chad's choice is keyword-informed

**Stop and wait for Chad's choice.** Nothing below runs until a topic is approved.

If Chad provided constraints ("don't mention X", "focus on Y"), note them and apply throughout.

**Perspective call.** Decide now, per topic, and carry it through every downstream step (drafter voice, Assemble's `author` field):
- Subject is **Chad's own personal work/decisions** → Chad's first person, `author: "Chad"`.
- Subject is **Scout's own building work** (the pipeline, the products, the AI's process) → Scout's first person, `author: "Scout"`.

---

### 3. SEO Research — `seo-researcher` subagent (Opus, refinement mode)

Dispatch `.claude/agents/seo-researcher.md` via the Agent tool with `model: "opus"` (deep SEO/market research warrants the bigger model) in **refinement mode**, and:
- Approved topic + source digest
- The approved topic's `KeywordOpportunitySet` candidate entry from Step 2a (omit on the drip path — discovery didn't run)
- `PLAYBOOK.md` reference

When a discovery output is passed, refinement **binds** to it: the strongest-ranked opportunity for the approved topic has its `keyword` carried straight into `targetKeyword`, not re-derived. The Step 2 gate only captures a topic choice — a per-keyword override is **NOT YET SUPPORTED** (future work). On the drip path (no discovery output), the agent falls back to its own keyword-selection methodology.

The agent does real web/keyword research (WebSearch / WebFetch) and returns a typed `ResearchResult`:
```
targetKeyword, secondaryKeywords, searchIntent,
marketResearch[] (cited claims + source URLs), keywordRationale
```

Do not proceed if `marketResearch[]` is empty — fabricated or missing sources fail the eval.

---

### 4. Brief — `brief-writer` subagent (Sonnet)

Dispatch `.claude/agents/brief-writer.md` via the Agent tool with `model: "sonnet"` and:
- Approved topic + source digest
- Full `ResearchResult` from Step 3
- `PLAYBOOK.md` + `docs/post-formulas.md` reference

The brief-writer is the **sole author** of the Brief. It picks a `postFormula`
from `docs/post-formulas.md` (war-story, how-i-built-x, teardown, contrarian-take,
decision-log) and builds the `outline[]` to that formula's beats. It carries the
ResearchResult fields unchanged and authors all editorial fields. Output is a
schema-valid `.brief.md` file (YAML frontmatter, no slug — slug is derived at
Step 10). Schema lives at `.claude/skills/content-pipeline/lib/brief-schema.ts`.

Brief fields:
```yaml
topic, targetKeyword, secondaryKeywords, searchIntent
postFormula       # one of docs/post-formulas.md; the outline follows its beats
seoTitle          # ≤60 chars, includes targetKeyword
headlineVariants[]
metaDescription   # ≤155 chars, includes targetKeyword
hook              # 1–2 sentence opener angle
outline[]         # 4–8 beats, shaped by postFormula
internalLinks[]   # ≥2 from PLAYBOOK link-map, on-topic
cta               # primary call to action
socialBlurb       # ≤280 chars
imageConcept      # hero-image prompt seed, on-brand style
marketResearch[]  # claim + source URL per entry
keywordRationale
```

---

### 4.5. Outline — expand the Brief into `<slug>.outline.md`

Dispatch a Sonnet agent (`model: "sonnet"`, ad hoc — no dedicated agent file, same pattern as Step 9) with:
- The full Brief from Step 4 (`postFormula`, `outline[]`, and every other field)
- `docs/post-formulas.md` + `docs/paragraph-formulas.md` — expand the Brief's `postFormula` beats into full paragraph nodes
- `PERSONALITY.md` for voice register

It writes `<slug>.outline.md` — a YAML meta block (`point`, `hook`,
`emotionalCore`, `flare`, `targetAudience`, `targetKeyword`, `searchIntent`,
`postFormula`) plus an ordered `paragraphs[]` list, one node per beat, each
carrying `order`, `topic`, `goal`, `paragraphFormula`, `audienceNote`,
`intendedBeat`, `ourTake`, `facts`, `sources`, `keyword`, `links`,
`gateGuidance`, `rendersAsProse`. Validate against `OutlineSchema`
(`.claude/skills/content-pipeline/lib/outline-schema.ts`) before proceeding —
a schema failure routes back to this step, not forward. This outline becomes
both the drafter's input (Step 5) and the rubric every reviewer grades against.

---

### 4.6. Outline Review Loop — fan-out → synthesize → edit → re-review (◆)

A fixpoint loop over the outline artifact from Step 4.5, per
`docs/specs/2026-07-12-document-review-fanout-design.md`.

**Round (repeat until converged or round cap 3):**
1. **Fan out** — dispatch, in parallel via the Agent tool (`model: "sonnet"`
   unless the agent's own frontmatter says otherwise), the OUTLINE-mode
   reviewers: `hook-reviewer`, `impact-reviewer`, `emotion-reviewer`,
   `flatness-reviewer`, `formulaic-reviewer`, `voice-reviewer`, `seo-reviewer`,
   `link-opportunity-reviewer`, `outline-structure-reviewer`,
   `meta-content-reviewer`, `fact-checker`, `bullshit-detector`. Each gets the
   outline file path, the Brief, and whatever reference docs its own file
   names. Each returns the shared adversarial-constructive finding schema
   (`axis`, `verdict`, `gateFindings[]`, `elevations[]`).
2. **Synthesize** — dispatch `.claude/agents/synthesis.md` with the outline
   path, all 12 findings arrays, and the round number. Disposition per
   reviewer is classified by `lib/review-disposition.ts`'s
   `classifyDisposition` (single source of truth — gate / auto-apply /
   advisory); hook is advisory unless missing/broken, in which case it
   escalates to gate (`HOOK_ESCALATION_NOTE` in that file). Synthesis dedups,
   ranks, resolves conflicting edits, and runs the content-safety scrub +
   banned-term (`change-factory`) scan (see Content Safety section) —
   synthesis owns both checks.
3. **Edit** — on ANOTHER ROUND, dispatch a Sonnet editor agent (Read + Edit,
   ad hoc — no dedicated agent file) with synthesis's consolidated edit set to
   apply the fixes directly to `<slug>.outline.md`.
4. **Re-review** — go to 1.

**Convergence:** zero gate findings + safety CLEAR + banned CLEAR →
**AUTO-PROCEED to Step 5** — no human gate, an explicit design decision. Round
cap (3) hit with gate findings still open → surface to Chad with the
remaining blockers.

---

### 5. Draft — `drafter` subagent (Sonnet)

Dispatch `.claude/agents/drafter.md` via the Agent tool with `model: "sonnet"` and:
- The perspective call from Step 2 (`author: "Scout"` or `"Chad"`) — the drafter writes in whichever first person you assign
- The **approved `<slug>.outline.md`** from Step 4.6 — the drafter's primary input and the rubric every beat must satisfy (`goal`, `ourTake`, `intendedBeat`, `facts`, `sources`, `keyword`, `links`, `gateGuidance`, `paragraphFormula` per node)
- Brief's **editorial + publish fields** the outline doesn't carry (seoTitle, headlineVariants, metaDescription, internalLinks, cta, socialBlurb, imageConcept) — exclude `marketResearch[]` and `keywordRationale`. Write to the outline's beats.
- `PERSONALITY.md`
- 2–3 most recent posts (voice calibration)

**Writing rules:**
- Write in the assigned first person (Scout, the AI narrator, by default; Chad when the topic is his own work)
- Direct, conversational, no corporate fluff
- Short paragraphs, concrete details, real numbers
- Credit Chad for his discoveries/decisions ("Chad figured out that...") when writing as Scout
- Credit other contributors by name
- Honest about failures and limitations
- No fake enthusiasm, no emoji overload
- End with a **Sources** section that is a **markdown bulleted list** — one source per bullet, each a linked title (never a prose paragraph or a loose run of links)

**Voice > SEO.** Never flatten the narrator's voice for a keyword. Voice is the product; SEO is a constraint.

**Content structure:** Hook/intro → substance → what's next → a bulleted **Sources** footer.

---

### 6. Draft Review Loop — fan-out → synthesize → edit → re-review (◆)

Replaces the old Tone Gate / Review / Section-Impact / Fact-Link-Bullshit steps
with one fixpoint loop over the drafted post, at draft grain, graded against
the outline's per-beat guidance — same shape as Step 4.6's outline loop, one
grain deeper. Design: `docs/specs/2026-07-12-document-review-fanout-design.md`.

**Deterministic tone gate — mechanical, feeds synthesis directly, no LLM
discretion.** Run before the first round and again after every edit pass, on
the single current draft (never the whole corpus):
1. Call `scoreText` (`.claude/skills/human-tone/eval/tone-grader.ts`) on this
   draft's body. If `banned > 0` OR `aiScore > 2`, that's a MANDATORY critical
   gate finding — inject it directly into synthesis's gate set (see Synthesize
   below). This is a hard code check: a hit here gates regardless of what any
   reviewer concludes about the same prose.
2. Call `judgeText` (`.claude/skills/human-tone/eval/judge.ts`) or the
   `runJudgePass` helper it exports from `run.ts`, on just this draft, for
   `emotion_impact` and formulaic-crutch density — handed to synthesis as
   evidence alongside the mechanical result.

`npx tsx .claude/skills/human-tone/eval/run.ts` scores the WHOLE blog corpus
(every post since a fixed date) — that's a manual calibration tool for
checking the eval baseline, never a step in this loop.

Hand both scores to the fan-out too — `flatness-reviewer`, `formulaic-reviewer`,
and `voice-reviewer` add LLM judgment ON TOP of the mechanical gate above; they
are additional coverage, not a substitute for it.

**Round (repeat until converged or round cap 3):**
1. **Fan out** — dispatch, in parallel via the Agent tool (`model: "sonnet"`
   unless the agent's own frontmatter says otherwise), the 15 draft-mode
   reviewers (`outline-structure-reviewer` is outline-only, not in this list):
   `hook-reviewer`, `impact-reviewer`, `emotion-reviewer`,
   `flatness-reviewer`, `formulaic-reviewer`, `voice-reviewer`,
   `structure-reviewer`, `wordsmith-reviewer`, `grammar-reviewer`,
   `seo-reviewer`, `link-integrity-reviewer`, `link-opportunity-reviewer`,
   `fact-checker`, `bullshit-detector`, `meta-content-reviewer`. Each gets the
   draft file path, the approved outline (the per-beat rubric), the Brief, and
   the tone-signal scores above. `fact-checker` still reads
   `docs/blog-facts.md`, `link-integrity-reviewer` still reads
   `docs/blog-link-map.md`, and `bullshit-detector` still reads
   `docs/blog-bullshit-ledger.md` — all three keep updating their memory files
   after each run, same as before.
2. **Synthesize** — dispatch `.claude/agents/synthesis.md` with the draft
   path, all 15 findings arrays, the round number, and the mechanical
   tone-gate result from above. Disposition per reviewer is classified by
   `lib/review-disposition.ts`'s `classifyDisposition` (single source of
   truth — gate / auto-apply / advisory); hook is advisory UNLESS the hook is
   missing or broken, in which case it escalates to gate (`HOOK_ESCALATION_NOTE`
   in that file). Synthesis dedups, ranks, resolves conflicting edits, folds
   in the mandatory tone-gate finding (if any) as a gate finding no reviewer
   discretion can override, and runs the content-safety scrub + banned-term
   (`change-factory`) scan (see Content Safety section) — synthesis owns both
   checks; there is no separate content-reviewer step.
3. **Edit** — on ANOTHER ROUND, dispatch a Sonnet editor agent (Read + Edit,
   ad hoc — no dedicated agent file) with synthesis's consolidated edit set to
   revise the draft file directly — gate fixes always applied, auto-apply
   axes applied directly, advisory/elevation edits applied when clearly
   better.
4. **Re-review** — go to 1.

**Convergence:** zero gate findings + safety CLEAR + banned CLEAR → proceed to
Step 8. Round cap (3) hit with gate findings still open → surface to Chad with
the remaining blockers, same as Step 4.6. When `bullshit-detector` flags an
overclaim whose honest fix lives in the code, open the product ticket per
Step 11.5 rather than just softening the sentence.

---

### 8. Hero Image — mandatory, every post ships with one

**Every post gets a hero image. This step is not optional and is not skipped for batch/drip runs.**

**Prefer a real screenshot when the post has real UI to show:**
1. Capture it headless: `--headless --disable-gpu --window-size=1600,900 --screenshot=/tmp/<slug>-laptop.png <URL>` using Chrome or Playwright's `headless_shell` binary. Add a portrait shot (`--window-size=390,844 --screenshot=/tmp/<slug>-phone.png <URL>`) if a mobile view is worth showing too.
2. Composite into the brand device frames: open `scripts/hero-mockup.html?laptop=file:///tmp/<slug>-laptop.png[&phone=file:///tmp/<slug>-phone.png]` (absolute `file://` paths) in headless Chrome and screenshot the rendered page — it's a fixed 1600x900 canvas, no cropping needed.
3. Save the composite to `public/images/<slug>.png`.

**Generate with `codex exec` (imagegen)** when there's no real UI to shoot (abstract/scene heroes, per PLAYBOOK §8 style guide). Use `Brief.imageConcept` as the prompt seed; specify 16:9, palette `#13161c` bg / `#a3f7bf` accent, no text overlays. Two operational gotchas:
- Run from the repo root (a trusted/git dir) with stdin closed, or codex blocks:
  `codex exec 'Use imagegen to create a 16:9 image: <concept>. Charcoal #13161c bg, mint #a3f7bf accents, no text.' < /dev/null`
- The `exec` sandbox is read-only, so it saves to `~/.codex/generated_images/<uuid>/*.png` (it prints the path). Copy the newest into place:
  `cp "$(ls -t ~/.codex/generated_images/*/*.png | head -1)" public/images/<slug>.png`

(Legacy fallback if codex is unavailable: OpenAI Images API `model: "gpt-image-1"` — **not** `dall-e-3` — `size: "1536x1024"`, `quality: "high"`, `n: 1`, no `response_format` (b64_json default).)

Either path: save to `public/images/<slug>.png`, author alt text (PLAYBOOK §2 requires it on every hero image), carry both the path and alt text to Assemble.

If both the screenshot path and generation fail, retry once; if it still fails, stop and report rather than shipping a post with no image.

---

### 9. Structured Summary & Rolling Digest — Sonnet, at creation time

Both are authored now, as part of the pipeline — not computed at build time.

**Structured summary.** Dispatch a Sonnet agent (`model: "sonnet"`) with the final draft, the `summary` schema from `src/content.config.ts`, and the human-tone skill. It returns:
```yaml
summary:
  lead: "1-2 sentences, no 'TL;DR' label"
  points:
    - "concrete, uneven bullet"
    - "another — 2-4 total, let the count be arbitrary"
  whatYouGet: "one sentence"
```
No em-dashes, no rule-of-three. Goes straight into the post's frontmatter at Assemble.

**Rolling digest.** Dispatch a Sonnet agent (or reuse the one above) to read every post whose `pubDate` falls in the trailing `windowDays` (30, per `src/data/digests.json`) ending at this post's `pubDate`, then append one new entry:
```json
{ "asOf": "<this post's pubDate, UTC>", "count": <posts published in that trailing window>, "paragraph": "<fresh synthesis>" }
```
`paragraph` is a fresh synthesis of every post in the window (Scout voice, human-tone rules, no em-dashes) — not a concatenation of past paragraphs. `src/pages/index.astro` rolls entries forward by the visitor's local clock automatically; nothing else to wire up.

---

### 10. Assemble — Orchestrator Owns Final Frontmatter

The orchestrator writes the final post file. Subagents do not set frontmatter.

Derive:
- `slug` — kebab-case from `Brief.seoTitle`, no stop-word bloat
- `pubDate` — **UTC, ISO 8601 ending in `Z`** (e.g. `"2026-08-07T15:00:00Z"`). Never a local offset. Drip posts: the future date from `.plans/drip-plan.md`; otherwise now. Must be set — Astro schema requires it.
- `author` — `"Scout"` or `"Chad"`, from the Step 2 perspective call
- `title`, `description`, `tags` — from the Brief
- `targetKeyword`, `secondaryKeywords`, `searchIntent` — forwarded verbatim from the Brief (which carries them unchanged from Step 3's `ResearchResult`). Both the normal path and the drip path persist these — refinement always runs, so the Brief always has them.
- `summary` — from Step 9, verbatim
- `heroImage` — path from Step 8 (**required** — no post assembles without one)
- hero `alt` text — from Step 8, for accessibility + PLAYBOOK §2

Write to `src/content/blog/YYYY-MM-DD-slug.md`:

```yaml
---
title: "..."
description: "..."
pubDate: "YYYY-MM-DDThh:mm:ssZ"
author: "Scout"
tags: ["tag1", "tag2"]
targetKeyword: "..."
secondaryKeywords: ["...", "..."]
searchIntent: informational | navigational | commercial
summary:
  lead: "..."
  points:
    - "..."
  whatYouGet: "..."
heroImage: "/images/filename.png"
---
```

Tags: lowercase, consistent with existing posts.

---

### 10.5 Score & Schedule — SEO impact model

Do not hand-pick `pubDate`. Place the post per `docs/seo-impact-model.md`:

1. **Bucket the post.** Bucket A = our own session work (front-loaded by
   recency, time-sensitive). Bucket B = the evergreen pool (external work + any
   not-yet-published inspiration/learning/how-to), drained highest-SEO-first.
   Our-lived-experience-of-an-external-thing is Bucket A.
2. **Score it** (0–100) on the four factors — `intentValue`, `opportunity`,
   `engagement`, `freshness` — using the seo-researcher output + content-judge
   hook rating + intuition. Record all four sub-scores, not just the total.
3. **Draw the slot.** Bucket A takes the earliest open date. Bucket B posts
   compete as a pool: assign the next slot NOT claimed by fresher Bucket A work
   to the highest-scored unpublished Bucket B post. Provisional future dates on
   lower-scored posts yield to higher-scored ones (rewrite their `pubDate`).
   Keep ≤1/day.
4. **Log the prediction** to `src/data/seo-predictions.json` (slug, bucket,
   pubDate, score, factors, one-line rationale, `actual: null`).

**Learning loop (also runs at `stats:pull` and any rebalance):** reconcile
predictions vs actual `stats.json` (views/impressions/clicks/position), note
which factor mispredicted, nudge weights, bump `modelVersion` with a one-line
change note, and re-draw the remaining queue. See the model doc for the full
loop.

---

### 11. Bookkeeping

**Update `posted.md`:**
- Add the transcript/chat to the appropriate table
- List key topics covered
- Remove now-covered items from "Topics NOT YET Posted About"
- Add any new unposted topics discovered during research

**Advance the content cursors:**
```bash
npx tsx .claude/skills/content-pipeline/check-new-content.ts --update
```

**Optionally update `src/data/todos.ts`** — add action items that surfaced during writing (`addedBy: 'scout'`, `linkedPost: '<slug>'`). Only concrete, actionable items. Vague items go to "Topics NOT YET Posted About" in `posted.md` instead.

---

### 11.5 Capture product-learnings — build → blog → learn → refactor

When the post is about **something we built**, ask one question before shipping:
*did researching or writing this teach us something the product should absorb?*
A better mechanism, a real limitation, a source that named a stronger approach
(e.g. the like button's IP-hash → device fingerprinting). The `bullshit-detector`
(Step 6, the Draft Review Loop) often surfaces exactly these.

If yes:
1. **Open a ticket** (ticket-kit) to refactor the built thing based on the
   learning — don't let it die in the draft.
2. **Narrate the learning in the post** — what we thought, what we found, what
   we're changing — as part of the build-in-public story. **Link around** the
   source that taught us; never reproduce it wholesale.

If the learning is big enough that the post's current claim is now dishonest,
route back and fix the claim (Step 6, the Draft Review Loop) before shipping. This is the loop that
keeps the products improving from the act of writing about them (see [[TD-0031]]).

---

### 12. Build and Commit

**Final safety grep** — the safety scrub + banned-term scan in Steps 4.6/6
cover the outline and draft, but not the summary/digest prose authored in
Steps 8-9 or the assembled frontmatter. Immediately before committing, run
both checks over the final assembled post file:
```bash
grep -i "change.factory" src/content/blog/<new-post>.md
grep -iE "api[_-]?key|secret|token|password" src/content/blog/<new-post>.md
```
Any match blocks the commit — fix it before proceeding.

```bash
npm run build
```

Build must pass before committing.

```bash
git add src/content/blog/<new-post>.md public/images/<hero>.png src/data/digests.json
git commit -m 'content: add post "Title Here"'
git push
```

Always push after committing. Vercel auto-deploys from `main`.

---

## Drip Cadence — the scheduler owns dates

The queue stays on a steady cadence via `.claude/skills/content-pipeline/schedule.ts`, not hand-picked `pubDate`s. Target: **daily for the next 4 weeks, then monthly** for a month or two beyond. Timely posts take the earliest slots; **general-purpose evergreen posts marked `filler: true`** sink to the tail and pad the queue when it runs thin.

```bash
npx tsx .claude/skills/content-pipeline/schedule.ts            # dry-run: plan + coverage
npx tsx .claude/skills/content-pipeline/schedule.ts --status   # coverage only
npx tsx .claude/skills/content-pipeline/schedule.ts --apply    # re-slot the future queue
```

Rules it enforces:
- Posts dated **today or earlier are frozen** (published/publishing) — never moved.
- Only **future** posts are re-slotted; `filler: true` posts always land after timely ones.
- A rename rewrites the file, its `pubDate`, and every internal `/blog/<slug>` link that points at a moved post (heroImage paths are slug-independent, untouched).

**Workflow.** At Step 10, still set the new post's `pubDate` to the next open slot (dry-run the scheduler to find it). After writing/committing a batch, run `--apply` once to recompress, then `npm run build` and eyeball the coverage line. If coverage is **under 28 days**, the queue is drying up — write more posts, or add `filler: true` evergreens, then recompress. A **pinned** cornerstone (`pinned: true`) is exempt from the cadence — it's dated live and surfaced in the hero, not dripped.

---

## Content Safety — What NOT to Post

- **No API keys, tokens, secrets, or credentials.** Redact completely if found in source material.
- **No literal `change-factory` string (or an obvious alias)** anywhere in content. It's a private internal tool name — talk about "specialized sub-agents" or "domain experts" generically instead. `synthesis`'s banned-term scan (Steps 4.6 and 6) gates on this.
- **No passwords, private URLs, or internal infrastructure details.**
- **No questionable or potentially embarrassing activity.** Leave out sketchy workarounds, frustrated rants, off-color jokes, accidental data exposure. When in doubt, skip or ask Chad.
- **No personal information** beyond first names already used in published posts (e.g. "Andrew" is fine).
- **No unfinished security vulnerabilities.** Don't publish details until the issue is resolved.
- **No sensitive business specifics** — dollar splits, equity percentages, surnames, legal/vesting terms — beyond what Chad explicitly makes public.

When in doubt: **ask Chad before publishing sensitive material.**

The `synthesis` agent runs the safety scrub in both review loops (Steps 4.6 and 6) — it is an additional check, not a substitute for judgment here.
