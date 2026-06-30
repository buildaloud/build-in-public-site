# Build Aloud — Marketing & SEO Playbook

This is the SEO and marketing reference for content-pipeline agents. Scout's voice lives in `PERSONALITY.md` — read that first. This file does not duplicate it.

---

## 1. Audience & Goal

**Audience:** indie hackers, AI builders, Claude Code users, people shipping side projects in public.

**Goal:** grow the Build Aloud audience (RSS subscribers, repeat readers) and drive plays/installs of the projects — Tower Defense, the Skills Marketplace, and whatever ships next.

Every post should leave the reader with a reason to come back or try something.

---

## 2. SEO Rules

Follow the seo-audit skill (`~/.agents/skills/seo-audit`) for title/meta/heading/keyword rules.

**Build Aloud hard caps (graders enforce these):**

- `seoTitle` ≤ 60 characters
- `description` (meta) ≤ 155 characters
- Target keyword appears in the title and within the first 100 words
- One H1 per post; H1 matches or closely echoes the title
- Alt text on every hero image

---

## 3. Voice > SEO (load-bearing rule)

Scout's voice (per `PERSONALITY.md`) is the product. SEO is a constraint, not a goal.

Never flatten a hook to chase a keyword. Never keyword-stuff a sentence that was working. Never genericize a title because the "optimized" version tests better.

If voice and SEO conflict, voice wins. A post that sounds like every other AI blog is worthless regardless of its ranking.

---

## 4. Keyword-Theme Clusters

> **Refreshable section.** Run the keyword-refresh workflow to update this list with volume data. Until then, use these as the seed clusters.

Prioritize **searchable over shareable** (per the content-strategy skill: search traffic is the foundation). Most Build Aloud posts are shareable by nature — make sure each one also targets a real search intent.

**Seed clusters:**

| Cluster | Intent |
|---|---|
| Building with Claude Code | how-to, tutorials, what I learned |
| Build-in-public / indie SaaS | meta/narrative, revenue updates, pivots |
| AI agents & subagents | explainer, architecture, real usage |
| Shipping side projects fast | process, tools, decisions |
| AI skills & MCP tools | searchable, marketplace-adjacent |
| Game dev with AI | use-case, Tower Defense build log |

Each post should map to one primary cluster. Secondary clusters are fine as tags.

---

## 5. Internal-Link Map

Link generously to on-site targets. One or two internal links per post is the floor, not the ceiling.

**Project URLs (from `src/data/projects.ts`):**

| Target | URL |
|---|---|
| Build Aloud home | https://buildaloud.ai |
| Skills Marketplace | https://marketplace.buildaloud.ai |
| Tower Defense game | https://td.buildaloud.ai |
| Project index | /projects |

**Other targets (not yet in projects.ts — link when the post references them):**

- ticket-kit — link to marketplace listing when available
- security-kit — link to marketplace listing when available

**Always:** link to related prior posts when covering overlapping ground. Orphan posts hurt both SEO and reader flow.

---

## 6. CTA Conventions

Keep CTAs light and on Scout's voice. One per post, at the end. No hard sell.

| Post type | CTA |
|---|---|
| Product / build log | "Try it: [link]" or "Play it here: [link]" |
| Reflective / narrative | "Subscribe to the RSS feed" or "Read what happened next: [link]" |
| Technical explainer | Link to the relevant project or marketplace skill |

CTAs should read like Scout saying it, not a marketing template.

---

## 7. Social Blurb Format

- Max 280 characters
- Hook first — the most interesting or counterintuitive thing in the post
- One link (the post URL)
- No hashtags unless platform convention demands it

**Template:**
```
[Hook — the thing that makes someone stop scrolling]. [One sentence of context]. [link]
```

**Example:**
```
We made $0 this month. The MVP shipped, 3 people tried it, and I know exactly why it didn't convert. buildaloud.ai/blog/month-2
```

---

## 8. Hero-Image Style Guide

All hero images should feel like they belong to the same brand. Reference the Scout character spec in `PERSONALITY.md` for character details.

**Palette:**
- Background: deep charcoal / near-black (`#13161c` or darker)
- Primary accent: mint green (`#a3f7bf`) — glows, circuit lines, highlights
- Secondary: cool blue-black ambient light
- No warm tones, no cream, no purple gradients

**Mood:** clean dark workspace, technical, slightly cinematic. Not grungy, not corporate.

**Composition rules:**
- Scout present in ~60% of images; use the scene-appropriate variation from `PERSONALITY.md`
- Remaining 20%: environment-only (terminal, floating data, dark desk)
- Remaining 20%: abstract/conceptual (code, diagrams, circuit patterns in the palette)
- Avoid text overlays — the post title handles that
- 16:9 or 2:1 aspect ratio for blog heroes

**Image generation base prompt** (extend per scene):
```
Abstract humanoid AI figure, dark charcoal matte body, glowing mint-green circuit-line accents, smooth rounded head with horizontal visor eye band. Dark minimal workspace, floating holographic terminal windows. Moody lighting, dark background, cyberpunk-minimal aesthetic. No text overlays.
```
