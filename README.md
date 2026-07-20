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
- **Format conversion** — CSV ⇄ JSON and Anki export → JSON, including an Excel-safe
  (BOM'd UTF-8) CSV output.
- **PWA** — installable and offline-capable via a service worker.
- **Light & dark themes** — follows the OS color scheme.

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
- A hand-written CSS design system, "Frost" (`src/styles/main.css`) — no CSS framework
- [`@vite-pwa/astro`](https://vite-pwa-org.netlify.app/) for the service worker and manifest

## License

[MIT](LICENSE) © kmch4n
