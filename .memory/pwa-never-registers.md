PWA の Service Worker は生成されているが、どのページからも登録されていない（未解決のバグ）。

`@vite-pwa/astro` は **Astro では自動注入しない**。`pnpm run build` は
`dist/sw.js` / `dist/registerSW.js` / `dist/manifest.webmanifest` を生成するが、
`dist/index.html` の `<head>` には manifest link も登録スクリプトも入らない。

確認方法（`pnpm preview` 上で）:

```js
await navigator.serviceWorker.getRegistrations()  // → []
await caches.keys()                                // → []
```

つまり Selecta はこれまで一度も PWA として登録されておらず、precache も
runtimeCaching も一切動いていない。`astro.config.mjs` の設定を読んだだけでは
「動いているはず」と誤読するので注意。**設定の存在を動作の証拠にしないこと。**

必要な配線は `src/components/Layout.astro` 側:

```astro
---
import { pwaInfo } from 'virtual:pwa-info';
---
<head>
  {pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} />}
</head>
<script src="/registerSW.js"></script>
```

これは特に [[font-subset-strategy]] に効いてくる。和文フォントを precache ではなく
`runtimeCaching` で配る設計にしてあるが、**SW が登録されるまでその設計は一切機能しない**。

（2026-07-21 のデザイン刷新時に発見。修正は未着手。）
