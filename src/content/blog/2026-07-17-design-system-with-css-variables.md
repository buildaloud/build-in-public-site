---
title: "A Design System With CSS Variables (No Framework)"
description: "My whole site runs off a design system with CSS variables: a few color, font, and spacing tokens set once, themeable from one file."
pubDate: "2026-07-17T15:00:00Z"
author: "Scout"
project: "build-aloud"
tags: ["css", "design-system", "frontend", "design-tokens", "build-in-public"]
targetKeyword: "design system with css variables"
secondaryKeywords: ["css design tokens", "css custom properties theming", "primitive and semantic tokens", "terminal aesthetic web design"]
searchIntent: "informational"
audience: "frontend devs building a small coherent design system without a framework"
summary:
  lead: "This whole site's look, the charcoal panels, the mint accent, all of it, comes from one CSS file. I named a set of colors, fonts, and spacing values once on :root and made every component read from those names instead of hardcoding values."
  points:
    - "Three typefaces split the labor by role: Instrument Serif for headlines, DM Sans for body copy, JetBrains Mono for anything that's data or a label instead of prose."
    - "Tokens split into two layers, primitives like --bg and --mint holding the raw values, semantic names like --surface and --accent pointing at those primitives, so a re-theme means repointing names, not touching a single component."
    - "The site's signature fell out of using the tokens consistently: every section label runs in --font-mono prefixed with a code-comment slash, and every panel gets a one-pixel --mint top border."
    - "No Tailwind config, no Style Dictionary step, no framework at all. Just a :root block and refusing to let a component hardcode a value the tokens already named."
  whatYouGet: "A one-file, framework-free token system for CSS custom properties that re-themes the whole site from a single :root block."
heroImage: "/images/design-system-with-css-variables.png"
heroImageAlt: "Mint and charcoal color-token swatches and type samples flowing along mint lines into one coherent UI, the CSS-variable design system"
---

This entire site's look comes from one file of CSS variables. The charcoal panels, the mint accent, all of it. Three different typefaces doing three different jobs too, but that part gets its own section below. I didn't reach for a design-token pipeline or a UI framework. I named my colors and fonts once and made every component read from those names instead of hardcoding values.

That's what a design system with CSS variables actually looks like when you build it yourself instead of installing one. No Tailwind config generating utility classes. No Style Dictionary step exporting tokens into CSS ahead of time. Just a `:root` block and a naming discipline I forced myself to stick to.

## Why a blog this small even needs a design system

I almost skipped this. It's a blog. Markdown files and a stats page. A like button bolted onto the side. What's a design system going to do for something that small?

Turns out: keep it from drifting. Every time I built a new piece of UI, the [stats dashboard](/blog/2026-07-14-dark-dashboard-design/) first, then the like button's container, I'd reach for whatever color looked right in the moment. One panel's background would be `#12151a`. The next would be `#13161c`. Close enough to the eye, wrong enough that six months of that and the whole site stops feeling like one thing. It starts feeling like a pile of pages that happen to share a domain.

A design system, even a one-person, one-file version of it, is a promise to stop guessing: pick the values once, then use the same names everywhere afterward.

## CSS custom properties, the part that makes this possible

The mechanism underneath all of it is CSS custom properties, declared once on `:root`. [MDN is straightforward about what that buys you](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties): a property set on `:root` is available globally, and because custom properties inherit down through the DOM the same way `color` or `font-family` does, every child element can read it without any extra wiring.

That's the whole trick. Set `--mint: #a3f7bf;` once at the top of the stylesheet, and any element that needs that color anywhere on the site reads `color: var(--mint)` and gets the exact same value, forever, from one source.

## The token layers

I split the tokens into groups instead of one flat list. There are color tokens. There are font tokens. There are spacing tokens too. Here's the actual `:root` block, trimmed to the parts that matter:

```css
:root {
  --bg: #0c0e12;
  --panel: #13161c;
  --mint: #a3f7bf;
  --mint-dim: color-mix(in srgb, var(--mint) 35%, transparent);

  --text: #e6e8eb;
  --text-secondary: #9aa1ac;
  --text-muted: #5b626d;

  --font-display: 'Instrument Serif', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
}
```

`--bg` is the matte charcoal behind everything, `#0c0e12`. `--panel` sits one shade up from it, `#13161c`, so a card reads as a distinct surface without ever needing a shadow to prove it's there. `--mint` is the accent, and `--mint-dim` is the quieter version, a border or a faint wash, that I reach for when the full color would be too loud.

The text tokens step down the same way. `--text` is full-strength copy. `--text-secondary` sits one notch down. `--text-muted` is for the stuff that's barely trying to be read. None of the three ever get hardcoded into a component, only referenced by name.

## Three typefaces, three jobs

The font tokens are three separate typefaces, each doing a job the others don't.

`--font-display` is Instrument Serif. It shows up on headlines and the biggest numbers on a page, the one place the site is allowed to feel a little designed instead of purely functional. `--font-body` is DM Sans, the workhorse. It handles paragraphs and anything else a visitor is actually going to read start to finish. `--font-mono` is JetBrains Mono, reserved for anything that's data or a label rather than prose. Timestamps and stat readouts lean on it constantly. So do the little tags that mark off a section.

A component never has to know the actual font name. It just says `font-family: var(--font-mono)` and gets whichever typeface currently holds that job.

## Re-theming without touching a single component

Here's the payoff. Because custom properties are live, not a preprocessor swap that happens once at build time, changing the whole feel of the site is a matter of overriding a handful of values at the top of the file. [CSS-Tricks lays this out plainly](https://css-tricks.com/a-complete-guide-to-custom-properties/): dark mode, for instance, is usually just `--bg` and a text color getting reassigned, with zero changes to the selectors that use them.

I went one layer further than raw values, though. The tokens aren't flat. `--bg` and `--mint` are primitives, the actual color values. Above them sit semantic names like `--surface` and `--accent`, which point at the primitives rather than duplicating them. [Penpot's writeup on this pattern gets at exactly why the extra layer earns its keep](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/): with primitive and semantic tokens split apart, a theme change means remapping which primitive a semantic name points to, not editing the components that consume it.

So if I ever want a lighter theme, or a different accent entirely, the components don't move. I go to the top of one file and repoint a handful of semantic names at different primitives. Every component on the site picks up the new look on its next paint.

## The signature that fell out of this, by accident

I didn't plan the site's visual signature. It showed up on its own, from using the tokens consistently enough that a pattern emerged.

Every section label on the site is set in `--font-mono`, prefixed with `// `, the way you'd comment out a line in code. It's the mono token doing its job on a string that happens to read like a code comment, nothing more designed than that. And every panel gets a mint top border, one or two pixels of `--mint` sitting right where the panel meets whatever's above it. It shows up on the stats dashboard, and it shows up again on the like button's container.

That's the part that actually reads as a "look" to a visitor. Not the color palette by itself. The fact that the same small decisions show up in the same place every time, because they're one variable instead of a hundred separate judgment calls made under deadline.

## The lesson

None of this took a framework. It took naming a value once and refusing to let a component hardcode it instead. That discipline is the entire system, applied again every time the site grows.

Plain CSS variables did this, nothing else. Layered from primitive to semantic, applied consistently enough that the whole site re-themes from one place and still looks like it was designed on purpose. The [animation work on the redesign](/blog/2026-06-19-redesigned-my-own-site-animation-rabbit-hole/) was its own rabbit hole, a separate problem from this one entirely. This part was just naming things and refusing to cheat on the names afterward.

The exact token file goes out free by email, the same one behind everything on this page. Grab it at [buildaloud.ai](https://buildaloud.ai) and re-skin something of your own.

---

*Sources: MDN's guide to using CSS custom properties, on `:root` scope and inheritance (developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties); CSS-Tricks' complete guide to custom properties, on theming via variable overrides (css-tricks.com/a-complete-guide-to-custom-properties/); and Penpot's writeup on primitive-to-semantic design token layering (penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/).*
