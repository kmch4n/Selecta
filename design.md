# Design — Selecta

The locked design system for this app. Every page reads this file before it is
changed. Do not regenerate it per page: extend or amend it when the system needs
to grow.

Selecta is a two-screen client-side app, not a marketing site. Consistency
across its pages is the goal; the usual "make every page different" rule is
inverted here.

## Genre

modern-minimal — the quiet, Stripe/Linear register. Near-white paper, deep-navy
ink, one restrained accent, generous space. Nothing decorative earns its place
by being loud.

## Theme — custom "quiet"

A made-to-measure light palette, not a catalog theme. It replaced the warm-cream
"Hum" (playful, pear-yellow, rounded) after that read as generic and, in its
dark variant, as AI-shaped. The whole point of this theme is restraint.

## Colour

Values live in `src/styles/tokens.css` as the OKLCH of these hex, kept
pixel-faithful. Nothing outside that file may declare a raw colour.

| role | hex | notes |
| --- | --- | --- |
| paper / paper-2 / paper-3 | `#fbfcfd` / `#f3f5f8` / `#e9edf2` | near-white, faint cool cast — never pure white |
| ink / ink-2 | `#1a2432` / `#5a6675` | deep navy, never pure black; ink is also the primary fill |
| rule | `#dde2e9` | hairline |
| accent | `#2b4570` | one restrained indigo |
| ok / ng | `#2f6b46` / `#9e3b36` | right / wrong (fills) |
| ok-ink / ng-ink | `#245e39` / `#833029` | right / wrong as text (darker, for contrast) |

Three rules govern it:

1. **The accent owns interactive intent only** — links, focus, the current track
   segment, the selected-option border — and nothing else. Its footprint stays
   well under 5% of any screen. The primary button is *ink*, not accent, so the
   accent never has to carry a large fill.
2. **Semantics are reserved before decoration.** Green always means a right
   answer, red always means a wrong one; the accent is neither.
3. **Never pure white paper, never pure black ink.** The faint cool cast and the
   navy tilt are what keep the neutrals from reading as unconsidered.

## Light by default, dark on request

Light is the default and the app's identity — the near-white world is what
Selecta looks like unless the user says otherwise. A dark theme rides alongside
it as an opt-in, toggled from the nav.

- The switch is a `data-theme="dark"` attribute on `<html>`. `:root[data-theme=
  "dark"]` in `tokens.css` redeclares every `--color-*` and `--shadow-*`; the
  light `:root` is never touched.
- **Dark is designed, not inverted.** It obeys the same three colour rules as
  light (accent owns interactive intent only; ok/ng semantics stay reserved;
  neither pole is pure — near-black navy paper, near-white ink).
- The default `:root` keeps `color-scheme: light`; the dark block sets
  `color-scheme: dark` so the UA controls follow the active theme.
- **The OS preference is not consulted.** Do not add a `prefers-color-scheme`
  block — only an explicit stored choice (`localStorage` key `selecta.theme.v1`)
  opts into dark. With no stored choice the app renders light even on a dark OS.
- A pre-paint `is:inline` script in `Layout.astro` applies the stored theme
  before first paint, so dark never flashes light on load.

## Typography

Self-hosted via `@fontsource`, so nothing leaves the origin and the PWA still
works offline.

- **Display and body:** Plus Jakarta Sans 400 / 600 / 700 (Latin and figures)
- **Japanese:** Zen Kaku Gothic New 400 / 700 — a clean, low-contrast gothic.
  The rounded Zen Maru Gothic it replaced read too soft for the quiet direction.
  Latin resolves to Jakarta first; Japanese falls through to Zen Kaku.
- **Labels and figures:** JetBrains Mono 500, uppercase, tracked
- Display tracking `-0.025em`, headings always roman — never italic

Import the **chunked** `@fontsource` entries (`400.css`, `700.css`), never the
`japanese-*.css` ones. The chunked entries split coverage across ~121
unicode-range slices the browser fetches on demand; a page loads only a handful.

## Japanese line-breaking

This is a first-class concern, not an afterthought.

- `html` sets `line-break: strict` so **all** text honours kinsoku: a line never
  begins with `。`/`、` or a small kana (the `手元のフ／ァイル` break).
- Headings keep `overflow-wrap: anywhere` as the overflow guard, so a long Latin
  token in user-supplied quiz text can't push the page sideways.
- The hero headline breaks **by phrase**: `word-break: keep-all` plus a `<wbr>`
  at each phrase boundary, with `overflow-wrap: anywhere` as the last resort so a
  phrase too long for a 320px line still wraps rather than clipping.

## Spacing

A 4-point named scale in `tokens.css`. Pages use `var(--space-md)`, never a raw
length.

## Shape

Small, quiet radii: buttons/inputs 8px, cards 14px, chips/keys 6px. Pills are
reserved for the answer track. No large rounded corners anywhere.

## Motion

- Easings: `--ease-out` for state, `--ease-snap` for the track, `--ease-spring`
  only for the one gentle score-counter pulse. Never the browser default.
- Buttons and options press down 1px on `:active`; no chunky edge, no lift.
- Focus rings appear instantly and are never transitioned.
- The score counter ticks up once on the result screen, and must **land on its
  real value** even under reduced motion or a hidden tab (rAF suspended) — it
  never freezes at zero.
- No decorative motion: the breathing wordmark dot and the correct-answer
  star-burst were removed. Quiet does not celebrate.

## Microinteractions

- Silent success. No celebratory toast for something the user can already see.
- Every interactive element has a visible response in all its states.
- Hover affordances always have a focus equivalent.

## CTA voice

- Primary: ink-filled rectangle, white text — the one confident element
- Secondary (`--soft`): filled paper chip with a hairline
- Tertiary (`--outline`): transparent hairline, fills faintly on hover
- The three tiers must stay visually distinct — a `--soft` and an `--outline`
  sit side by side in `/convert`.
- Labels are short enough never to wrap. A wrapped label is a bug; shorten it,
  don't reach for `white-space: nowrap` (that trades a wrap for a scroll).

## What pages must share

The wordmark; the palette and its reserved semantics; the font stack; the CTA
voice; the 4-point scale; the line-break rules; the motion rules.

## What pages may differ on

Macrostructure, within the app-page family: `/` is a Marquee Hero, `/convert` is
a two-pane Workbench.

## Non-negotiables

- No glassmorphism, in any form.
- Light is the default; dark is an opt-in toggle only, never OS-driven.
- No pill or large radius on controls.
- No horizontal scroll at 320 / 375 / 414 / 768px. `overflow-x: clip` on both
  `html` and `body` — never `hidden`, which would break the sticky nav.
- No decorative eyebrow over every section. Ordinal labels only where the
  content is genuinely ordered.
- Every page has exactly one `<h1>`.

## Exports

### tokens.css

The canonical token set lives at `src/styles/tokens.css` and is the source for
any port of this system. It carries `--color-*`, `--font-*`, `--text-*`,
`--space-*`, `--radius-*`, `--ease-*`, `--dur-*`, and `--z-*`. The default
`:root` is the light theme; `:root[data-theme="dark"]` redeclares the colour and
shadow tokens for the opt-in dark theme.
