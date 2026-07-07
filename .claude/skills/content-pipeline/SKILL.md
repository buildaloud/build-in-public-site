---
name: content-pipeline
description: Orchestrate the Build Aloud content pipeline — gather source material, gate on topic approval, run SEO research, brief, draft, tone-gate, review, generate a hero image, author the structured summary + rolling digest, assemble the final post, and commit. Invoke when Chad says "write a new post", "what should we post about?", or to advance the drip queue.
---

# Content Pipeline Skill (Orchestrator)

Today it orchestrates blog-post production end-to-end: source scan → topic
gate → SEO research → brief → draft → tone gate → review → hero image →
summary + digest → assemble → bookkeeping. It's named generally
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
- `PLAYBOOK.md` reference

The brief-writer is the **sole author** of the Brief. It carries the ResearchResult fields unchanged and authors all editorial fields. Output is a schema-valid `.brief.md` file (YAML frontmatter, no slug — slug is derived at Step 10). Schema lives at `.claude/skills/content-pipeline/lib/brief-schema.ts`.

Brief fields:
```yaml
topic, targetKeyword, secondaryKeywords, searchIntent
seoTitle          # ≤60 chars, includes targetKeyword
headlineVariants[]
metaDescription   # ≤155 chars, includes targetKeyword
hook              # 1–2 sentence opener angle
outline[]         # 4–8 beats
internalLinks[]   # ≥2 from PLAYBOOK link-map, on-topic
cta               # primary call to action
socialBlurb       # ≤280 chars
imageConcept      # hero-image prompt seed, on-brand style
marketResearch[]  # claim + source URL per entry
keywordRationale
```

---

### 5. Draft — `drafter` subagent (Sonnet)

Dispatch `.claude/agents/drafter.md` via the Agent tool with `model: "sonnet"` and:
- The perspective call from Step 2 (`author: "Scout"` or `"Chad"`) — the drafter writes in whichever first person you assign
- Brief's **editorial + publish fields only** (topic, seoTitle, headlineVariants, metaDescription, hook, outline, internalLinks, cta, socialBlurb, imageConcept) — exclude `marketResearch[]` and `keywordRationale`
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
- End with source attribution

**Voice > SEO.** Never flatten the narrator's voice for a keyword. Voice is the product; SEO is a constraint.

**Content structure:** Hook/intro → substance → what's next → source attribution footer.

---

### 6. Tone Gate — hard gate, not optional

The draft does not proceed to Review until it passes both checks below. Loop until clean — do not skip or cap retries.

1. **Score it.** Run `npx tsx .claude/skills/human-tone/eval/run.ts` (scores every post in `src/content/blog/`, ranks worst-first) or grade just this draft with `eval/tone-grader.ts`'s `scoreText`. Require **aiScore < 15**.
2. **Sonnet tone double-check.** Dispatch an Agent (`model: "sonnet"`) to read the draft cold against `.claude/skills/human-tone/SKILL.md` — the tell table (em-dash, rule-of-three, hedging, signposting, AI-vocab, negative parallelism, tidy-bow) AND the texture checklist (a fragment? a real number? a flat opinion?). A draft that scores clean but reads voiceless still fails here.

If either check fails: dispatch a Sonnet tone-fix pass (`model: "sonnet"`) against `.claude/skills/human-tone/SKILL.md`'s tell→fix table, rewrite the flagged passages, then re-run both checks.

---

### 7. Review — `content-reviewer` subagent (Sonnet)

Dispatch `.claude/agents/content-reviewer.md` via the Agent tool with `model: "sonnet"` and:
- Draft from Step 5 (post-Tone-Gate)
- Full Brief from Step 4
- `PLAYBOOK.md` + `PERSONALITY.md`

The reviewer returns:
- Scorecard: voice fidelity, SEO checklist, marketing punch — pass/fail per axis
- Concrete edits
- Banned-term scan (must flag "change-factory" anywhere in the draft)
- Content safety scrub (see Content Safety section)

**On REVISE:** send the reviewer's edits back to `drafter` (re-run Step 5), then re-run the Tone Gate (Step 6) before returning here.

**On BLOCKED** (safety issue or structural problem): route back to `brief-writer` (re-run Step 4) before re-drafting.

Do not assemble until the reviewer passes all axes.

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

### 12. Build and Commit

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

## Content Safety — What NOT to Post

- **No API keys, tokens, secrets, or credentials.** Redact completely if found in source material.
- **No literal `change-factory` string (or an obvious alias)** anywhere in content. It's a private internal tool name — talk about "specialized sub-agents" or "domain experts" generically instead. content-reviewer's banned-term scan (Step 7) gates on this.
- **No passwords, private URLs, or internal infrastructure details.**
- **No questionable or potentially embarrassing activity.** Leave out sketchy workarounds, frustrated rants, off-color jokes, accidental data exposure. When in doubt, skip or ask Chad.
- **No personal information** beyond first names already used in published posts (e.g. "Andrew" is fine).
- **No unfinished security vulnerabilities.** Don't publish details until the issue is resolved.
- **No sensitive business specifics** — dollar splits, equity percentages, surnames, legal/vesting terms — beyond what Chad explicitly makes public.

When in doubt: **ask Chad before publishing sensitive material.**

The `content-reviewer` subagent runs the safety scrub in Step 7 — it is an additional check, not a substitute for judgment here.
