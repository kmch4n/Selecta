# 開発

## セットアップ

Selecta は [PNPM](https://pnpm.io/) を使う。

```sh
pnpm install       # 依存関係をインストール
pnpm run dev       # 開発サーバを http://localhost:4321 で起動
pnpm run build     # 本番サイトを ./dist/ にビルド
pnpm run preview   # ビルド結果をローカルでプレビュー
```

## 技術スタック

- [Astro 5](https://astro.build/) + TypeScript（strict）
- 自前の CSS デザインシステム。CSS フレームワークは使わない。トークンは
  `src/styles/tokens.css` に集約し、判断の根拠は [`../design.md`](../design.md)（英語）にある。
- Plus Jakarta Sans / Zen Kaku Gothic New / JetBrains Mono をセルフホスト。
  オフライン対応を保ち、オリジンの外へリクエストを出さないため。
- [`@vite-pwa/astro`](https://vite-pwa-org.netlify.app/) — service worker と manifest。

## アーキテクチャ概要

- **ページロジック**は各 `.astro` のインライン `<script>` 内クラスに集約する
  （独立した JS モジュールは持たない）。`src/pages/index.astro` がクイズプレイヤー、
  `src/pages/convert.astro` が形式変換。
- **PWA**：service worker の登録は `src/components/Layout.astro` の手動配線が前提。
  vite-plugin-pwa の自動注入は Astro のページには効かない。
- **復習ストア**：間違えた設問を `localStorage`（キー `selecta.review.v1`）に永続化し、
  ホームの復習セクションと終了画面の再挑戦で出題する。設問の識別は問題文＋選択肢の
  内容ハッシュによる（設問 `id` には依存しない）。
- **ライト専用**。ダークテーマは持たない。

## もっと詳しく

- クイズデータの形式は [`quiz-format.md`](quiz-format.md) を参照。
- デザインの判断根拠は [`../design.md`](../design.md)（英語）。
- リポジトリで作業する際の契約は [`../.codex/AGENTS.md`](../.codex/AGENTS.md)。
