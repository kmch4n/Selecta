// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
    integrations: [AstroPWA({
        registerType: 'autoUpdate',
        workbox: {
            // Fonts are deliberately excluded from the precache manifest.
            // Zen Maru Gothic ships its Japanese coverage as 122 unicode-range
            // chunks per weight (~1.9 MB in total). Precaching is eager, so
            // globbing woff2 here would pull every chunk of every weight down
            // on install — roughly 3.9 MB — even though a page renders only a
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
            theme_color: '#f9f5eb',
            background_color: '#f9f5eb',
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
