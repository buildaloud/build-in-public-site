# Research stage — idea → validation brief

Turn a raw product idea into a one-page go/no-go brief. AI does the research;
Chad reads the brief in 10 minutes and makes one decision.

## Run it

Give Claude the idea plus any constraints (audience, price point, why now),
and ask for a validation brief. Claude then:

1. Fans out research (deep-research skill or web-researcher agents):
   - **Problem + who pays** — who has this pain, evidence they pay for relief
   - **Competitors** — top 3 with pricing, positioning, and visible traction
   - **Demand signals** — search volume/keywords (seo-researcher, Opus),
     community complaints, existing-tool gaps
   - **Wedge** — what we'd do differently that the incumbents structurally won't
2. Checks the cost floor: can validation run at $0 on the standard stack
   (Cloudflare + Supabase + Buttondown free tiers)?
3. Fills `validation-brief.md` (copy it to `briefs/<idea-slug>.md`), including
   explicit **kill criteria** — the numbers that mean stop.
4. Hands Chad the brief. **Chad decides: go / no-go / park.** No building
   before the decision.

## Rules

- Every claim in the brief carries a source link. No invented numbers.
- Weak demand signal is a finding, not a failure — say it plainly.
- A "park" verdict goes back in the idea list with the brief attached, so the
  next look starts warm.
- Time cap: a brief is one AI session. If it needs more, that itself is
  evidence the idea is fuzzy.
