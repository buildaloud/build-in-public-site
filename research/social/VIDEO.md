# Programmatic video — research synthesis

3-agent fan-out, 2026-07-04 (code-driven tools, AI narration/visuals,
YouTube automation + policy). Verdict: **a fully AI-runnable video pipeline
costs ~$0/month** on top of the existing OpenAI sub, and the only human
step pre-audit is a one-minute Studio upload.

## v1 pipeline (all scriptable by Scout)

1. **Capture** — charmbracelet VHS (`.tape` scripts → terminal videos as
   code; MP4/WebM/GIF out) for build-log clips; Playwright context
   recording (already in the stack) for product-demo walkthroughs
   (WebM → ffmpeg → MP4).
2. **Narration** — OpenAI `gpt-4o-mini-tts`: one fixed voice = consistent
   Scout persona, commercially clean, ~$0.015/min (a 6-min build log
   < $0.10). Fallback noted: `edge-tts` is $0/no-key but rides an
   unofficial Microsoft endpoint — license-gray, don't build the brand on it.
3. **Captions** — whisper.cpp locally (~10x real-time on Apple Silicon):
   SRT sidecar for YouTube CC + burned word-highlight ASS for Shorts.
4. **Visuals** — static Scout avatar (existing imagegen identity) +
   waveform over the screen capture. No animated-avatar tools.
5. **Assembly** — ffmpeg concat; one script renders both 16:9 and 9:16.
   Proven pattern renders a 10-min video in 4-6 min in GitHub Actions.
6. **Graduate later** — Remotion (free ≤3-person team, React-based,
   highest ceiling) or Revideo (MIT, built for headless batch) for
   animated stats/intros once cadence exists.

## YouTube publishing — the gotcha and the flow

**Unaudited API projects force-lock uploads to private** (not flippable).
So until/unless we pass the API compliance audit:

- Scout renders everything: video, title, description, tags, SRT, thumbnail.
- **Chad drag-drops into Studio** (~1 min) — that's the approve gate itself.
- Apply for the API audit when cadence is real; after it passes, the flow
  becomes API-native queue+approve: `videos.insert` private → Chad approves
  → set `publishAt` (auto-flips public; scheduling only works from private).
- Quota is a non-issue since Dec 2025 (~100 units/upload vs 10k/day).
- Shorts: vertical + ≤3 min auto-classifies. Post Shorts for discovery,
  long-form for authority (RPM ~$1-10 vs ~$0.03-0.08).

## Policy checkboxes

- "Altered content" disclosure only for could-be-mistaken-for-real footage —
  a clearly-AI Scout narrating builds is **exempt**; openly-AI branding is
  explicitly fine (rules target deception, not disclosure).
- The real monetization risk is "inauthentic content" (Jul 2025): templated
  mass-produced sameness hits the whole channel. Vary formats; keep real
  build numbers and human context in every video.

## Skip list (verdicts, not vibes)

- HeyGen/Synthesia animated avatars: watermarked frees, $29+/mo real, ~$3/min API.
- Text-to-video APIs (Sora/Veo/Runway/Luma): retry-heavy b-roll toys for
  this content; ~$1/usable 5-sec clip.
- ElevenLabs: free tier is non-commercial + attribution; revisit at revenue.
- Opus Clip/Descript free tiers: watermarked exports — cut Shorts manually
  until cadence justifies $9/mo.

## First three videos (candidate queue)

1. "An AI tears down and rebuilds its own product" — VHS capture of
   `lifecycle down demo` → `up demo`, Scout narrating. The money shot.
2. "The $0/month stack" — Playwright walkthrough of demo.buildaloud.ai +
   the console, numbers on screen.
3. "I built a referral loop overnight" — the redeem flow end-to-end.

## Costs

TTS pennies/video · whisper.cpp $0 · VHS/Playwright/ffmpeg $0 · GitHub
Actions render $0 · YouTube $0. Total: **≈$0/mo** until deliberate upgrades.
