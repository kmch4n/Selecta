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
- **Styling**: 自前 CSS デザインシステム "Hum"。CSS フレームワークは使わない（Bulma は廃止済み）。
  リテラル値は `src/styles/tokens.css` にのみ置き、`src/styles/main.css` はそれを参照する。
  判断の根拠はルートの [`design.md`](../design.md) にある。
  **glassmorphism は禁止**（旧 "Frost" の frosted glass は撤去済み。復活させない）。
- **PWA**: `@vite-pwa/astro`（autoUpdate, Workbox）。**SW の登録は `Layout.astro` の手動配線が前提** —
  自動注入は Astro では効かない。詳細は `.memory/pwa-registration-wiring.md`。

## Layout

- `src/pages/index.astro` — クイズプレイヤー / `src/pages/convert.astro` — 形式変換
- `src/components/` — `Layout` / `NavBar` / `Footer`
- `src/styles/tokens.css` — 全トークン（色・余白・型・モーション、light/dark 両方）
- `src/styles/main.css` — Hum デザインシステム本体 / `design.md` — 判断の根拠
- `quiz-schema.json` — クイズデータの JSON Schema / `public/` — `favicon.svg`, `sample-quiz.json`

## 契約 (Conventions)

- **データ契約**: `options` はちょうど 4 要素、`correct` は 0–3 のインデックス。`quiz-schema.json` に準拠。
- **デザイン**: **デザインを触る前に `design.md` を読む。** 色・余白・書体は `tokens.css` の
  トークン経由でのみ扱い、`main.css` や `.astro` に生の値を直書きしない。
  light/dark 両テーマを必ず維持する（Hum は light 専用テーマなので、dark は自前の派生）。
- **ブランド**: 表記は "Selecta" のみ。旧名 "AnySlash" / "anyslash" / "Osumi Akari" / "oageo" は使わない。
  作者は kmch4n（https://kmchan.jp）、リポジトリは https://github.com/kmch4n/Selecta。
- **エンコード**: すべて UTF-8（BOM なし）/ LF。

## メモリ (.memory/)

エージェント（Claude / Codex）が暗黙知をセッションや頭の中に溜め込まないための共有メモリ。

- **作業前に `.memory/MEMORY.md` を読み**、関連メモリを参照する。
- セッションを超えて有用で、コードや本ファイルからは自明でない非自明な知見
  （設計判断の理由・ハマりどころ・外部制約・確定した方針）を得たら、`.memory/` に
  1 ファイル 1 事項で記録し、`.memory/MEMORY.md` のインデックスに 1 行追記する。
- コードや本ファイルで自明なこと・そのセッション限りのこと・憶測は書かない。
  誤りが判明したメモリは修正・削除する。詳しい運用は `.memory/MEMORY.md` 冒頭を参照。
