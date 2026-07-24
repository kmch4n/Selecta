// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
    integrations: [AstroPWA({
        registerType: 'autoUpdate',
        // Must be explicit. vite-plugin-pwa's default ('auto') injects the
        // registration through Vite's transformIndexHtml hook, which never fires
        // for Astro pages because Astro emits their HTML itself — so nothing was
        // ever injected and the service worker never registered. On top of that,
        // 'auto' deliberately withholds pwaInfo.registerSW once a virtual module
        // is imported, which would leave the manual wiring in Layout.astro with
        // nothing to render. 'script' both fixes the default and populates it.
        injectRegister: 'script',
        workbox: {
            // Fonts are deliberately excluded from the precache manifest.
            // Zen Kaku Gothic New ships its Japanese coverage as 121 unicode-
            // range chunks per weight (~1.3 MB each). Precaching is eager, so
            // globbing woff2 here would pull every chunk of every weight down
            // on install — several MB — even though a page renders only a
            // handful of them. The runtime rule below caches each chunk the
            // browser actually requests, keeping offline support without the
            // install cost.
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
            runtimeCaching: [
                {
                    urlPattern: /\.woff2$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'selecta-fonts',
                        expiration: {
                            maxEntries: 60,
                            maxAgeSeconds: 60 * 60 * 24 * 365
                        },
                        cacheableResponse: { statuses: [0, 200] }
                    }
                }
            ]
        },
        includeAssets: ['favicon.svg'],
        manifest: {
            name: 'Selecta',
            short_name: 'Selecta',
            description: '4択クイズアプリ（Anki互換）',
            theme_color: '#fbfcfd',
            background_color: '#fbfcfd',
            display: 'standalone',
            start_url: '/',
            icons: [
                {
                    src: 'favicon.svg',
                    sizes: 'any',
                    type: 'image/svg+xml'
                }
            ]
        }
    })]
});
