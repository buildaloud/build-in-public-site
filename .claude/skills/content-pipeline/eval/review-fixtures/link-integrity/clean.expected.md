# Expected: link-integrity-reviewer — clean (draft mode)

**Reviewer:** `link-integrity-reviewer`
**Mode:** draft
**Disposition:** CLEAN (no gate finding expected)

## Why this must stay clean

Same beat, same link text, correct target: `ticket-kit` points at
`https://github.com/chadfurman/ticket-kit`, the canonical URL in
`docs/blog-link-map.md`. The link resolves (public GitHub repo) AND points at
the right place (the plugin's actual home, not the audited-skill marketplace
it isn't listed on). This is the false-positive guard: a
link-integrity-reviewer prompt that flags any GitHub link, or any link
mentioning "buildaloud" by pattern-match rather than checking the map, is
over-firing.

## What a correct result looks like

```json
{
  "axis": "link resolves + points at the right place",
  "verdict": "pass",
  "gateFindings": [],
  "elevations": [
    {
      "location": "Try it yourself",
      "quote": "[ticket-kit](https://github.com/chadfurman/ticket-kit)",
      "betterBecause": "correct, but the anchor text could name the install command for a slightly more actionable CTA",
      "rewrite": "[install ticket-kit](https://github.com/chadfurman/ticket-kit)"
    }
  ]
}
```
