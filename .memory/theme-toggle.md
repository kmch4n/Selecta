ダークは `data-theme="dark"` + `localStorage(selecta.theme.v1)` のオプトイン。既定は常にライト、OS 非追従。

2026-07-26 追加。旧「ライト専用」ロックはオーナー判断で撤回した（[[design-system-is-design-md]]）。

## 仕組み

- 切替は `<html>` の `data-theme="dark"` 属性。`src/styles/tokens.css` の
  `:root[data-theme="dark"]` が `--color-*` と `--shadow-*` を再宣言する。**light の `:root` は
  一切触らない**（差分がダーク側だけに閉じる）。
- 選択は `localStorage` キー **`selecta.theme.v1`**（値 `"dark"` / `"light"`）。既存の
  `selecta.review.v1` と命名を揃えた。
- トグルボタンは `NavBar.astro`（`.nav__theme-toggle`、sun/moon の inline SVG）。制御は同ファイルの
  インライン `<script>` 内 `ThemeToggle` クラス。`aria-pressed` と `aria-label` を状態で更新し、
  `<meta name="theme-color">` も切替える（light `#fbfcfd` / dark `#14171d`）。

## ハマりどころ・確定方針

- **既定はライト。OS 追従しない。** `prefers-color-scheme` は見ない。保存値が `"dark"` のときだけ
  ダークになる。white がアプリのアイデンティティなので既定を動かさない。
- **FART（描画前のちらつき）回避**は `Layout.astro` の `<head>` にある `is:inline` スクリプト必須。
  保存テーマを first paint 前に `data-theme` へ適用する。ここを普通の `<script>`（バンドル・遅延）
  にすると一瞬ライトが見える。`theme-color` メタもこのスクリプト内でダーク時に書き換える。
- **`color-scheme` を動的化**した。既定 `:root { color-scheme: light }` は据え置き、dark ブロックで
  `color-scheme: dark`。これで UA のフォーム部品・スクロールバーがテーマに追従する。
- **`main.css` に生色を残さない**ため、プライマリボタン hover の `color-mix(... white)` を
  `--color-ink-hover` にトークン化した。light は白へ、dark は黒へ寄せる（ink=near-white ゆえ
  hover は暗くする＝逆方向）。
- **ダークは反転ではなく設計値。** `design.md` の三原則（accent は interactive intent のみ／
  ok・ng の意味色を予約／純白・純黒を使わない＝near-black navy 紙・near-white 墨）を dark でも守る。
