このリポジトリで作業する際の契約。グローバル規約（コミット・コードスタイル等）と重複する内容は書かない。

## 言語

日本語で回答する。技術用語は無理に訳さない。コード・コミット・PR 等の成果物は英語。
ただし**ユーザー向けドキュメント（`README.md`・`docs/`）は日本語**で書く。`design.md`
だけは英語のまま据え置く（デザインシステムのロック文書で、契約から参照される）。

## Project

Selecta — Anki 互換の選択式クイズ PWA。JSON ファイルまたは URL でクイズを読み込みブラウザで解答する。
CSV / JSON / Anki の相互変換も持つ。すべてクライアントサイドで完結し、サーバは不要。

## Commands (PNPM)

- `pnpm run dev` — dev server @ localhost:4321
- `pnpm run build` — build to `./dist/`
- `pnpm run preview` — preview the production build

## Architecture

- **Astro 5 + TypeScript (strict)**。ページロジックは各 `.astro` のインライン `<script>` 内クラスに集約
  （独立した JS モジュールは持たない）。
- **Styling**: 自前 CSS デザインシステム（modern-minimal / custom-quiet：近白の紙・濃紺の墨・
  藍一色）。CSS フレームワークは使わない（Bulma は廃止済み）。リテラル値は
  `src/styles/tokens.css` にのみ置き、`src/styles/main.css` はそれを参照する。判断の根拠はルートの
  [`design.md`](../design.md) にある。**glassmorphism は禁止。**
  **ライト専用**（ダークテーマは持たない。過去の Hum/Frost は撤去済みで、復活させない）。
- **PWA**: `@vite-pwa/astro`（autoUpdate, Workbox）。**SW の登録は `Layout.astro` の手動配線が前提** —
  自動注入は Astro では効かない。詳細は `.memory/pwa-registration-wiring.md`。
- **復習ストア**: 間違えた設問を `localStorage`（キー `selecta.review.v1`）に永続化し、ホームの
  復習セクションと終了画面の再挑戦で出題する。設問の識別は **問題文＋選択肢の内容ハッシュ**（設問
  `id` には依存しない）。誤答で苦手リストに入り、正解で外れる。詳細は `.memory/review-store.md`。

## Layout

- `src/pages/index.astro` — クイズプレイヤー / `src/pages/convert.astro` — 形式変換
- `src/components/` — `Layout` / `NavBar` / `Footer`
- `src/styles/tokens.css` — 全トークン（色・余白・型・モーション。ライト専用）
- `src/styles/main.css` — デザインシステム本体 / `design.md` — 判断の根拠
- `quiz-schema.json` — クイズデータの JSON Schema / `public/` — `favicon.svg`, `sample-quiz.json`

## 契約 (Conventions)

- **データ契約**: プレイヤーは可変選択肢。`options` は **2 要素以上**、`correct` は 0 始まりで
  `options.length` 未満のインデックス。`quiz-schema.json` に準拠。キーボードは `1`–`9` が 1〜9 番目、
  `0` が 10 番目、11 個以上はクリック / タップのみ。**ただし変換ツール（`convert.astro`）は
  4 択固定のまま**（CSV は `option1`–`option4` の 4 列、Anki 取り込みも 4 択前提）。
- **デザイン**: **デザインを触る前に `design.md` を読む。** 色・余白・書体は `tokens.css` の
  トークン経由でのみ扱い、`main.css` や `.astro` に生の値を直書きしない。
  **ライト専用**（ダークテーマは追加しない。`prefers-color-scheme: dark` のブロックを足さない）。
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
