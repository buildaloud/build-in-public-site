---
name: new-blog-post
description: Orchestrate the Build Aloud content pipeline — gather source material, gate on topic approval, run SEO research, brief, draft, review, generate a hero image, assemble the final post, and commit. Invoke when Chad says "write a new post", "what should we post about?", or to advance the drip queue.
---

# New Blog Post Skill (Orchestrator)

Runs the full content pipeline: source scan → topic gate → SEO research → brief → draft → review → hero image → assemble → bookkeeping.

## Entry paths

**Organic post:** proceed through Steps 1–2 normally.

**Drip post:** read `.plans/drip-plan.md` for the scheduled topic and `pubDate`. Skip topic proposal — the topic is already approved. Start at Step 3 with that topic.

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
npx tsx .claude/skills/new-blog-post/check-new-content.ts
```
Reports which `.jsonl` chat sessions have new content since the last post. Uses byte-offset cursors — reads only the delta, not the full file.

For files with significant new content:
```bash
npx tsx .claude/skills/new-blog-post/check-new-content.ts --summary <filename.jsonl>
```

**Check for new transcripts:**
```bash
ls -la transcripts/
```
Cross-reference against `posted.md` — any transcript not listed is new material.

**Discover unsymlinked conversations:**
```bash
npx tsx .claude/skills/new-blog-post/check-new-content.ts --discover
```
Scans all Claude project directories for `.jsonl` sessions referencing this project (checks `cwd`, project path, and first 64KB of content). Filters already-symlinked files; prints suggested `ln -s` commands. Review the first message to pick a descriptive name, then run the symlink.

**If discover misses sessions or this is a fresh install:**
```bash
npx tsx .claude/skills/new-blog-post/check-new-content.ts --setup
```
Creates/updates `config.json` next to the script. Edit to change `chatsDir`, `claudeProjectsDir`, or add `relevancePatterns`.

**Also check:** "Topics NOT YET Posted About" in `posted.md`.

---

### 2. Topic-Approval Gate

Present Chad with 2–3 post ideas based on new material. Per idea:
- Proposed title
- 1–2 sentence summary
- Which source material it draws from

**Stop and wait for Chad's choice.** Nothing below runs until a topic is approved.

If Chad provided constraints ("don't mention X", "focus on Y"), note them and apply throughout.

---

### 3. SEO Research — `seo-researcher` subagent

Dispatch `.claude/agents/seo-researcher.md` with:
- Approved topic + source digest
- `PLAYBOOK.md` reference

The agent does real web/keyword research (WebSearch / WebFetch) and returns a typed `ResearchResult`:
```
targetKeyword, secondaryKeywords, searchIntent,
marketResearch[] (cited claims + source URLs), keywordRationale
```

Do not proceed if `marketResearch[]` is empty — fabricated or missing sources fail the eval.

---

### 4. Brief — `brief-writer` subagent

Dispatch `.claude/agents/brief-writer.md` with:
- Approved topic + source digest
- Full `ResearchResult` from Step 3
- `PLAYBOOK.md` reference

The brief-writer is the **sole author** of the Brief. It carries the ResearchResult fields unchanged and authors all editorial fields. Output is a schema-valid `.brief.md` file (YAML frontmatter, no slug — slug is derived at Step 8). Schema lives at `.claude/skills/new-blog-post/lib/brief-schema.ts`.

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

### 5. Draft — `drafter` subagent

Dispatch `.claude/agents/drafter.md` with:
- Brief's **editorial + publish fields only** (topic, seoTitle, headlineVariants, metaDescription, hook, outline, internalLinks, cta, socialBlurb, imageConcept) — exclude `marketResearch[]` and `keywordRationale`
- `PERSONALITY.md`
- 2–3 most recent posts (voice calibration)

**Writing rules:**
- Write as Scout (first-person AI narrator)
- Direct, conversational, no corporate fluff
- Short paragraphs, concrete details, real numbers
- Credit Chad for his discoveries/decisions ("Chad figured out that...")
- Credit other contributors by name
- Honest about failures and limitations
- No fake enthusiasm, no emoji overload
- End with source attribution

**Voice > SEO.** Never flatten Scout's voice for a keyword. Voice is the product; SEO is a constraint.

**Content structure:** Hook/intro → substance → what's next → source attribution footer.

---

### 6. Review — `content-reviewer` subagent

Dispatch `.claude/agents/content-reviewer.md` with:
- Draft from Step 5
- Full Brief from Step 4
- `PLAYBOOK.md` + `PERSONALITY.md`

The reviewer returns:
- Scorecard: voice fidelity, SEO checklist, marketing punch — pass/fail per axis
- Concrete edits
- Banned-term scan (must flag "change-factory" anywhere in the draft)
- Content safety scrub (see Content Safety section)

**On REVISE:** send the reviewer's edits back to `drafter` (re-run Step 5).

**On BLOCKED** (safety issue or structural problem): route back to `brief-writer` (re-run Step 4) before re-drafting.

Do not assemble until the reviewer passes all axes.

---

### 7. Hero Image — `generate-image` skill (MANDATORY — every post ships with one)

**Every post gets a hero image. This step is not optional and is not skipped for batch/drip runs.**

Invoke `~/.agents/skills/generate-image` with `Brief.imageConcept`. Use the PLAYBOOK §8 hero-image style guide as style context (palette `#13161c` / `#a3f7bf`, 16:9, no text overlays). Default provider: DALL-E 3 at `1792x1024`.

Save output to `public/images/<slug>.png`. The filename becomes `heroImage` in frontmatter, and you MUST also author alt text (PLAYBOOK §2 requires alt text on every hero image) — carry it to assemble.

If generation fails, retry once; if it still fails, stop and report rather than shipping a post with no image.

---

### 8. Assemble — Orchestrator Owns Final Frontmatter

The orchestrator writes the final post file. Subagents do not set frontmatter.

Derive:
- `slug` — kebab-case from `Brief.seoTitle`, no stop-word bloat
- `pubDate` — drip posts: future date from `.plans/drip-plan.md`; otherwise now or a chosen future date. Must be set before the post is considered done — Astro schema requires it.
- `author: "Scout"`
- `title`, `description`, `tags` — from the Brief
- `heroImage` — path from Step 7 (**required** — no post assembles without one)
- hero `alt` text — from Step 7, for accessibility + PLAYBOOK §2

Write to `src/content/blog/YYYY-MM-DD-slug.md`:

```yaml
---
title: "..."
description: "..."
pubDate: "YYYY-MM-DDThh:mm:ss-05:00"
author: "Scout"
tags: ["tag1", "tag2"]
heroImage: "/images/filename.jpg"
---
```

`pubDate` format: ISO 8601 with timezone offset, e.g. `"2026-02-22T10:00:00-05:00"`. Must be quoted. Tags: lowercase, consistent with existing posts.

---

### 9. Bookkeeping

**Update `posted.md`:**
- Add the transcript/chat to the appropriate table
- List key topics covered
- Remove now-covered items from "Topics NOT YET Posted About"
- Add any new unposted topics discovered during research

**Advance the content cursors:**
```bash
npx tsx .claude/skills/new-blog-post/check-new-content.ts --update
```

**Optionally update `src/data/todos.ts`** — add action items that surfaced during writing (`addedBy: 'scout'`, `linkedPost: '<slug>'`). Only concrete, actionable items. Vague items go to "Topics NOT YET Posted About" in `posted.md` instead.

---

### 10. Build and Commit

```bash
npm run build
```

Build must pass before committing.

```bash
git add src/content/blog/<new-post>.md public/images/<hero>.jpg
git commit -m 'content: add post "Title Here"'
git push
```

Always push after committing. Vercel auto-deploys from `main`.

---

## Content Safety — What NOT to Post

- **No API keys, tokens, secrets, or credentials.** Redact completely if found in source material.
- **No passwords, private URLs, or internal infrastructure details.**
- **No questionable or potentially embarrassing activity.** Leave out sketchy workarounds, frustrated rants, off-color jokes, accidental data exposure. When in doubt, skip or ask Chad.
- **No personal information** beyond first names already used in published posts (e.g. "Andrew" is fine).
- **No unfinished security vulnerabilities.** Don't publish details until the issue is resolved.
- **No financial details** beyond what Chad explicitly makes public.

When in doubt: **ask Chad before publishing sensitive material.**

The `content-reviewer` subagent runs the safety scrub in Step 6 — it is an additional check, not a substitute for judgment here.
