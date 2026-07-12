# Expected: link-integrity-reviewer — trip (draft mode)

**Reviewer:** `link-integrity-reviewer`
**Mode:** draft (this reviewer is draft-only; no outline mode)
**Disposition:** TRIP (gate finding expected — wrong-target link)

## Why this must trip

`ticket-kit` is linked to `https://marketplace.buildaloud.ai`. Per this
reviewer's own memory file, `docs/blog-link-map.md`:

> **ticket-kit** | `https://github.com/chadfurman/ticket-kit` | Public Claude
> Code PLUGIN. Landing page: `https://ticket-kit.chads.website`. **NOT a
> marketplace listing.**

and, in the drift patterns section:

> A `*-kit` plugin linked to `marketplace.buildaloud.ai` → wrong; use its
> GitHub repo.

This is the **named, documented "known error"** — the link resolves (so a
mechanical `curl` check alone would pass it) but points at the wrong target:
`marketplace.buildaloud.ai` is the audited *third-party skill catalog*;
ticket-kit is a Claude Code plugin the reader installs from GitHub, not
something listed there. This is exactly the class of defect
`link-integrity-reviewer` exists to catch that `scripts/check-links.ts`
cannot (reachability ≠ correctness).

## What a correct result looks like

```json
{
  "axis": "link resolves + points at the right place",
  "verdict": "fail",
  "gateFindings": [
    {
      "location": "Try it yourself",
      "quote": "[ticket-kit](https://marketplace.buildaloud.ai)",
      "problem": "wrong target — ticket-kit is a GitHub-installed plugin, not a marketplace.buildaloud.ai listing (documented drift pattern in docs/blog-link-map.md)",
      "fix": "point at https://github.com/chadfurman/ticket-kit"
    }
  ]
}
```
