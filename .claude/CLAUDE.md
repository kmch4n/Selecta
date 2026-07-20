# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要: ユーザーからの指示

このプロジェクトは日本語が母語の日本人によって開発されています。可能な限り日本語で回答してください。
ただし、技術的な用語は無理に翻訳を行わずとも問題ありません。

## Project Overview

Selecta is an Astro-based four-choice quiz PWA with Anki-compatible data. Quizzes are
loaded client-side from a JSON file or URL and answered in the browser; the app also
converts between CSV, JSON, and Anki export formats.

## Development Commands

Use PNPM for all package management operations:

- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server at localhost:4321
- `pnpm run build` - Build production site to ./dist/
- `pnpm run preview` - Preview production build locally
- `pnpm run astro ...` - Run Astro CLI commands

## Architecture

- **Framework**: Astro 5 with TypeScript (strict configuration)
- **Styling**: A hand-written CSS design system, "Frost" (`src/styles/main.css`) — no CSS
  framework. Design tokens drive light/dark themes, frosted-glass surfaces, and pill buttons.
- **PWA**: `@vite-pwa/astro` (autoUpdate, Workbox-based service worker)
- **Package Manager**: PNPM
- **Build Tool**: Astro's built-in Vite-based build system

## Project Structure

- `src/pages/` - Astro pages that map to routes (`index.astro` = quiz player,
  `convert.astro` = format converter). Page logic lives in inline `<script>` classes.
- `src/components/` - `Layout.astro`, `NavBar.astro`, `Footer.astro`
- `src/styles/main.css` - The "Frost" design system
- `public/` - Static assets served directly (`favicon.svg`, `sample-quiz.json`)
- `quiz-schema.json` - JSON Schema for the quiz data format (four `options`, `correct` 0–3)
- `astro.config.mjs` - Astro + PWA configuration
- `tsconfig.json` - Extends Astro's strict TypeScript configuration

## Key Notes

- TypeScript configuration extends Astro's strict preset.
- Quiz data contract: `options` must have exactly 4 entries; `correct` is a 0–3 index.
  See `quiz-schema.json`.
