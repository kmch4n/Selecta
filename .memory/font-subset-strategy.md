和文フォントは `@fontsource` の**チャンク分割版**を import し、woff2 は precache しない。

## import するファイルを間違えないこと

`@fontsource/zen-maru-gothic` は同じ字形に対して2系統の入口を持つ。

| 入口 | 中身 | 使う? |
|---|---|---|
| `400.css` / `700.css` | `@font-face` **122個**、`unicode-range` 分割、1チャンク平均 27KB | **これを使う** |
| `japanese-400.css` 等 | 単一ファイル **1.4MB**、分割なし | 使わない |

チャンク版ならブラウザは実際に描画する範囲だけ取得する。実測で
**244チャンク中 20だけ**がロードされた（`document.fonts` の status で確認可能）。

代償として **CSS が gzip 後 139KB** になる（`unicode-range` の羅列は圧縮が効かない）。
単一ファイル版は CSS 2KB で済むがフォント実体が 2.9MB になるので、チャンク版が妥当。

## woff2 を `globPatterns` に足さないこと

Workbox の precache は**遅延しない**。`unicode-range` はブラウザの fetch を制御するだけで
マニフェストには効かないため、`globPatterns` に `woff2` を入れると
**dist の 243チャンク / 4.6MB を初回インストールで全部抱える**。
代わりに `runtimeCaching` の `CacheFirst`（cacheName `selecta-fonts`）で配る。

さらに Workbox の `maximumFileSizeToCacheInBytes` は既定 2MiB で、
**超えたファイルはエラーを出さず黙って捨てられる**。「設定したのに効かない」がここで起きる。

ただし現状 [[pwa-never-registers]] のため、この runtimeCaching はまだ動作していない。

## フォントが効いているかの確認方法

`document.fonts.check()` は既定のテスト文字列が **latin** なので、和文フォントの判定に使うと
誤って `false` を返す。必ず判定文字列を渡す:

```js
document.fonts.check('400 32px "Zen Maru Gothic"', '手元のファイル')  // → true
```

幅の実測（`getBoundingClientRect`）でも判別できない。**和文グリフは全て 1em 幅**なので、
どの和文フォントでも文字数 × font-size で一致してしまう。

（2026-07-21 記録）
