`@vite-pwa/astro` は Astro に自動注入しない。`Layout.astro` の手動配線が SW 登録の前提。

## なぜ必要か

`@vite-pwa/astro` は README で "auto inject Web App Manifest" と書いているが、実体は
`injectRegister` を `vite-plugin-pwa` に素通しするだけ。`vite-plugin-pwa` は Vite の
`transformIndexHtml` フックで注入するが、**Astro はページ HTML を自前で生成する**
（`astro:build:done`）ため、このフックがページに発火しない。

結果として 2026-07-21 以前の Selecta は、`sw.js` / `registerSW.js` / `manifest.webmanifest`
を生成しながら **どのページからも参照せず、SW が一度も登録されていなかった**。
`astro.config.mjs` の設定を読んだだけでは動いているように見えるので、
**設定の存在を動作の証拠にしないこと。**

## 配線（現在の実装）

`astro.config.mjs`:
```js
injectRegister: 'script',   // 既定の 'auto' では下記の理由で機能しない
```

`src/components/Layout.astro`:
```astro
import { pwaInfo } from 'virtual:pwa-info';
...
{pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} />}      // head
{pwaInfo?.registerSW && <Fragment set:html={pwaInfo.registerSW.scriptTag} />}  // body 末尾
```

`src/env.d.ts` に `vite-plugin-pwa/info` と `/client` の型参照が要る。

## 落とし穴

- **`injectRegister: 'auto'`（既定）だと `pwaInfo.registerSW` が `undefined` になる。**
  `info.d.ts` に明記されている仕様（virtual モジュールを import した場合は公開しない）。
  配線したのに登録されない、という二重の嵌まり方をする。必ず `'script'` を明示する。
- **`pwaInfo` は dev サーバでは `undefined`**（`devOptions.enabled` が false のため）。
  必ず存在チェックで包む。dev で SW は有効にしない — 編集のたびにキャッシュが挟まる方が害。
  **検証は必ず `pnpm preview`** で行う。`pnpm dev` では SW が動かないので素通りする。
- **初回ロードでは `selecta-fonts` はまだ空。** SW は install しても reload するまで
  ページを制御しないため、初回のフォント取得は SW を経由しない。1回リロードして確認する。

## 期待される実測値（2026-07-21 時点）

```
navigator.serviceWorker.getRegistrations()  → 1 (active)
caches.keys()  → ['selecta-fonts', 'workbox-precache-v2-...']
selecta-fonts       : 23 entries, すべて woff2
workbox-precache-v2 : 9 entries, woff2 は 0 件
```

dist には woff2 が 243個あるので、**23 / 243 しかキャッシュしていない**ことが
[[font-subset-strategy]] の設計どおり動いている証拠になる。数字がここから大きく増えたら
precache に woff2 が混入していないか疑う。

（2026-07-21 に修正。それ以前の状態は [[design-system-is-design-md]] と同じ刷新作業で発見。）
