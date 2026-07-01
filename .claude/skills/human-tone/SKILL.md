---
name: human-tone
description: Make Build Aloud writing read as human, not AI. Strip the AI tells (em-dashes, rule-of-three, hedging, signposting, AI-vocab) and inject dev-voice texture (burstiness, concrete specifics, flat opinions). Grounded in Chad's real Slack + Claude-prompt corpus. Use when drafting or editing any post, summary, or digest — and gate with the eval.
---

# Human Tone

Two jobs, both required: **strip AI tells** and **add human texture**. Removing tells alone yields sterile voiceless prose, which reads just as synthetic. (Reference: `blader/humanizer` on GitHub — good pattern bank; its hard em-dash ban is the right instinct for us.)

Grounded in the Build Aloud corpus — Chad's Claude prompts + team Slack (last 90 days). The measured human baseline: **aiScore ~2**; our first-pass AI drafts scored **~40**. Target for shipped posts: **aiScore < 15** (run the eval).

## Registers

- **Scout blog prose** (most posts): published, so clean and readable — but casual, opinionated, bursty. Not chat. Don't fake typos or lowercase-everything; do keep fragments, flat opinions, concrete detail.
- **Chad-authored posts** (author: "Chad" — e.g. the personal/reflective ones): his published voice per root `CLAUDE.md` "Writing as Chad" — casual, dry, understated, first person. Same tell-stripping applies.
- **Chat/DM** (not blog): his rawest voice — lowercase starts, trailing `...`, stacked questions, left-in typos. Don't import typos into published posts.

## The tells to strip

| Tell | Fix |
|---|---|
| **Em-dash** `—` (our #1 offender) | Use a period, comma, colon, or parens. If you truly need a dash, `--`. Corpus human rate is ~4.5/1k; keep near zero. |
| **Rule-of-three** ("fast, clean, and reliable") | Use one, two, or an uneven four. Let the count be arbitrary. |
| **Hedging** ("it's worth noting", "arguably", "genuinely") | Say it flat or cut it. "This is slow." |
| **Signposting** ("Let's dive in", "In this section", "In conclusion") | Start with the substance. No throat-clearing, no recap. |
| **AI-vocab** (delve, leverage, showcase, robust, seamless, intricate, tapestry, underscore, boasts) | Plain words: use, dig into, show, solid. |
| **Negative parallelism** ("it's not just X, it's Y" / "not only… but…") | State the thing directly. Cut the contrast setup. |
| **"From X to Y"** breadth filler | Name the actual specific things, once. |
| **Copula avoidance** ("serves as", "boasts") | Just write "is". |
| **Transitions** (Furthermore, Moreover, Additionally) | Drop most. Start with "And" or "But". |
| **Tidy bow conclusion** ("the future looks bright") | Pick a side, or end abruptly when the point's made. |

## The texture to add (Chad + dev corpus)

- **Burstiness.** Jam a 3-word fragment against a 30-word run. Vary hard. (Chad's writing swings 4→60 words in one message.)
- **Concrete specifics over abstraction.** Named tools, exact numbers, real costs, file paths, elapsed time. "wasted $4k", "about 3 hours in", "wave 40 was butter". Never "a range of improvements".
- **Flat opinions, no hedge theater.** "forget it, I don't care about the dashboard." State findings as fact; hedge only when genuinely unsure, then commit.
- **Self-correction in the open** ("Eh no that won't work. Hmm — maybe it's not worth it.") reads human.
- **Symptom → cause → fix** when explaining a bug (his commit-body structure).
- **Understated, dry.** No hype adjectives, no exclamation stacks, no "I'm pleased to announce".
- **Functional emoji only** (Scout mostly none; a single `:sob:`/`:fire:` is the ceiling, and only where it does a job).

## Workflow

1. Draft (Sonnet writes the posts/summaries; Opus does SEO research).
2. Run the eval: `npx tsx .claude/skills/human-tone/eval/run.ts` — scores every post, ranks worst-first, lists tells.
3. Fix the flagged tells top-down; re-run until each post is **< 15**.
4. Re-read once for texture: is there a fragment? a real number? a flat opinion? If it's clean but voiceless, it still fails.

## Eval

`eval/tone-grader.ts` scores any string (em-dash/1k, tricolons, hedges, signposts, ai-vocab, negative-parallelism, copula, burstiness → `aiScore` 0-100). `eval/run.ts` compares the human corpus against the drafts. The human corpus lives in `eval/corpus/` (gitignored — it's Chad's redacted private Slack/prompts; local calibration only).
