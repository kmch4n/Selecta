# Design — Selecta

The locked design system for this app. Every page reads this file before it is
changed. Do not regenerate it per page: extend or amend it when the system needs
to grow.

Selecta is a two-screen client-side app, not a marketing site. Consistency
across its pages is the goal; the usual "make every page different" rule is
inverted here.

## Genre

playful

## Theme — Hum, component scope only

Hum is the catalog's theme for learning platforms and daily-curiosity apps,
which is what Selecta is. But it is written for scrolling landing pages, and
half its vocabulary — section bands, hero archetypes, pricing, social proof,
footer rotation — has nothing to attach to in a two-screen app.

So the adoption is deliberately partial:

| Hum signature | Selecta |
| --- | --- |
| 1 · push-button physics | adopted — options and CTAs |
| 4 · counter tick-up | adopted — the score |
| 5 · character moment | adopted — the wordmark dot |
| 6 · big rounded surfaces | adopted |
| 7 · star-burst on success | adopted — a right answer |
| 2 · multi-accent section bands | **not applicable** — no scrolling sections exist |
| 3 · colour-shift card grid | **not applicable** — no card grid exists |

That is five of seven. Hum asks for six. The shortfall is a recorded, deliberate
deviation, not an oversight: inventing sections to host the missing two would be
worse design than going without them.

## Macrostructure family

Selecta has only app pages. They must not share a shape.

- `/` — **Marquee Hero**. Off-centre. The primary action is "try the sample";
  loading your own file is the secondary route.
- `/convert` — **Workbench**. An input pane and an output pane, side by side.

## Colour

Values live in `src/styles/tokens.css`. Nothing outside that file may declare a
raw colour.

Three rules govern the palette:

1. **Semantics are reserved before decoration.** Mint always means a right
   answer. Coral always means a wrong one. Pear means the primary action and the
   current position. The success burst is pear, not Hum's stock coral, because
   celebrating in the failure colour would be incoherent.
2. **Never pure white paper, never pure black ink.** The cream carries the
   theme's warmth; pure white drains it.
3. **Accents never blend into a gradient with each other.**

## Dark theme

The project contract requires light and dark. Hum ships no dark definition, so
this one is Selecta's own derivation, built on three rules:

1. **The paper keeps the pear hue (H 95) and only loses lightness.** Going
   neutral-grey would strip out the warmth that makes the theme itself.
2. **The palette narrows to pear plus one, and accents lose 6–8 points of
   lightness.** Five accents on a dark ground drifts into carnival, which the
   theme bans.
3. **The button's edge stays darker than its face, in both themes.** The edge
   reads against the button, not against the page. A lighter edge would light
   the button from below, which is the shadow-glow-on-dark anti-pattern.

## Typography

Self-hosted via `@fontsource`, so nothing leaves the origin and the PWA still
works offline.

- **Display and body:** Plus Jakarta Sans 400 / 600 / 700 (Latin and figures)
- **Japanese:** Zen Maru Gothic 400 / 700 — a rounded gothic, which matches the
  theme's rounded-sans register. Latin resolves to Jakarta first; Japanese has
  no glyphs there and falls through to Zen Maru. The fallthrough is the design,
  not an accident.
- **Labels and figures:** JetBrains Mono 500, uppercase, tracked
- Display tracking `-0.025em`, headings always roman — never italic

Import the **chunked** entries (`400.css`, `700.css`), never the `japanese-*.css`
ones. The chunked entries split coverage across 122 unicode-range slices the
browser fetches on demand; a page typically loads about 20 of 244. The
`japanese-*` entries are single ~1.4 MB files with no splitting.

The type scale must keep real range. The old design capped its display at
1.7 rem against a 1 rem body, and that flatness was the single largest reason it
read as generated.

## Spacing

A 4-point named scale in `tokens.css`. Pages use `var(--space-md)`, never a raw
length.

## Motion

- Easings: `--ease-press` for buttons, `--ease-spring` for lifts, `--ease-snap`
  for arrivals, `--ease-out` otherwise. Never the browser default.
- The press is the feedback: lift 2px on hover, press down 3px on `:active`.
  No `scale()`, no overshoot on UI state.
- Focus rings appear instantly and are never transitioned.
- One character moment per page. One burst per correct answer, never looping.

**Reduced motion is not "no motion".** Spatial movement collapses; colour and
opacity still carry state. Anything that conveys information must arrive at its
real value — the score counter lands on the score, it does not freeze at zero.
The same guarantee has to survive a hidden tab, where rAF is suspended.

## Microinteractions

- Silent success. No celebratory toast for something the user can already see.
- Every interactive element has a visible response in all its states.
- Hover affordances always have a focus equivalent.

## CTA voice

- Primary: pear push button, pill, one per moment
- Secondary: soft (flat lift, no colour edge)
- Tertiary: outline (hairline, fills on hover)
- Labels are short enough never to wrap. A wrapped label is a bug, and
  `white-space: nowrap` is not the fix — it just trades a wrap for a horizontal
  scroll. Shorten the label.

## What pages must share

The wordmark and its character moment; the palette and its reserved semantics;
the font stack; the CTA voice; the 4-point scale; the motion rules.

## What pages may differ on

Macrostructure, within the app-page family. Section rhythm and density.

## Non-negotiables

- No glassmorphism, in any genre.
- No square corners. Cards 20px, inputs 12px, pills 999px.
- No horizontal scroll at 320 / 375 / 414 / 768px. `overflow-x: clip` on both
  `html` and `body` — never `hidden`, which would break the sticky nav.
- No decorative eyebrow over every section. Ordinal labels only where the
  content is genuinely ordered.
- Every page has exactly one `<h1>`.

## Exports

### tokens.css

The canonical token set lives at `src/styles/tokens.css` and is the source for
any port of this system. It carries `--color-*`, `--font-*`, `--text-*`,
`--space-*`, `--radius-*`, `--ease-*`, `--dur-*`, and `--z-*`, in both themes.
