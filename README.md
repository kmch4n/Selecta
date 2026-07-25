# Selecta

A four-choice quiz PWA with Anki-compatible data. Load a quiz from a JSON file or
a URL, answer in the browser, and review your results — all client-side, no server
required. Selecta also converts between CSV, JSON, and Anki export formats.

> This README is an initial draft and will be refined later.

## Features

- **Quiz player** — answer four-choice questions with an answer track that fills in
  by correct/incorrect as you go, plus keyboard shortcuts (`1`–`4`, `Enter`).
- **Flexible loading** — pick a local JSON file, or supply one or more URLs to run
  several quiz sets back to back.
- **Shareable links** — append `?source=<quiz-url>` to auto-load a quiz on open, so
  sharing a set is just sharing a link. Repeat the parameter
  (`?source=a.json&source=b.json`) to chain several.
- **Format conversion** — CSV ⇄ JSON and Anki export → JSON, including an Excel-safe
  (BOM'd UTF-8) CSV output.
- **PWA** — installable and offline-capable via a service worker.
- **A quiet, considered light theme** — near-white paper, deep-navy ink, one
  restrained accent. Deliberately light-only.

## Getting Started

Selecta uses [PNPM](https://pnpm.io/).

```sh
pnpm install       # install dependencies
pnpm run dev       # start the dev server at http://localhost:4321
pnpm run build     # build the production site to ./dist/
pnpm run preview   # preview the production build locally
```

## Quiz Data Format

Quiz files are JSON with a `meta` block and a `questions` array. Each question has
exactly four `options` and a `correct` index (0–3). The full schema is defined in
[`quiz-schema.json`](quiz-schema.json), and a working sample lives at
[`public/sample-quiz.json`](public/sample-quiz.json).

```json
{
    "meta": { "title": "Sample Quiz" },
    "questions": [
        {
            "id": "q-1",
            "question": "Which tag creates a link in HTML?",
            "options": ["<link>", "<a>", "<href>", "<url>"],
            "correct": 1,
            "explanation": "The <a> tag's href attribute defines the link target."
        }
    ]
}
```

## Tech Stack

- [Astro 5](https://astro.build/) with TypeScript (strict)
- A hand-written CSS design system — no CSS framework. Tokens live in
  `src/styles/tokens.css`; the reasoning behind them is in [`design.md`](design.md)
- Plus Jakarta Sans, Zen Kaku Gothic New, and JetBrains Mono, self-hosted so the
  app stays offline-capable and no request leaves the origin
- [`@vite-pwa/astro`](https://vite-pwa-org.netlify.app/) for the service worker and manifest

## License

[MIT](LICENSE) © kmch4n
