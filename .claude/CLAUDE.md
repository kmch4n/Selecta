# CLAUDE.md

このリポジトリで作業する際の契約。グローバル規約（コミット・コードスタイル等）と重複する内容は書かない。

## 言語

日本語で回答する。技術用語は無理に訳さない。コード・コミット・PR 等の成果物は英語。

## Project

Selecta — Anki 互換の 4 択クイズ PWA。JSON ファイルまたは URL でクイズを読み込みブラウザで解答する。
CSV / JSON / Anki の相互変換も持つ。すべてクライアントサイドで完結し、サーバは不要。

## Commands (PNPM)

- `pnpm run dev` — dev server @ localhost:4321
- `pnpm run build` — build to `./dist/`
- `pnpm run preview` — preview the production build

## Architecture

- **Astro 5 + TypeScript (strict)**。ページロジックは各 `.astro` のインライン `<script>` 内クラスに集約
  （独立した JS モジュールは持たない）。
- **Styling**: 自前 CSS デザインシステム "Frost"（`src/styles/main.css`）。CSS フレームワークは使わない
  （Bulma は廃止済み）。デザイントークンで light/dark、frosted glass、pill button を駆動。
- **PWA**: `@vite-pwa/astro`（autoUpdate, Workbox）。

## Layout

- `src/pages/index.astro` — クイズプレイヤー / `src/pages/convert.astro` — 形式変換
- `src/components/` — `Layout` / `NavBar` / `Footer`
- `src/styles/main.css` — Frost デザインシステム
- `quiz-schema.json` — クイズデータの JSON Schema / `public/` — `favicon.svg`, `sample-quiz.json`

## 契約 (Conventions)

- **データ契約**: `options` はちょうど 4 要素、`correct` は 0–3 のインデックス。`quiz-schema.json` に準拠。
- **デザイン**: 色やスペースは `main.css` の `:root` トークン経由で扱い、直書きしない。light/dark 両テーマを必ず維持する。
- **ブランド**: 表記は "Selecta" のみ。旧名 "AnySlash" / "anyslash" / "Osumi Akari" / "oageo" は使わない。
  作者は kmch4n（https://kmchan.jp）、リポジトリは https://github.com/kmch4n/Selecta。
- **エンコード**: すべて UTF-8（BOM なし）/ LF。
