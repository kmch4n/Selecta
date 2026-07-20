// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
    integrations: [AstroPWA({
        registerType: 'autoUpdate',
        workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
        },
        includeAssets: ['favicon.svg'],
        manifest: {
            name: 'Selecta',
            short_name: 'Selecta',
            description: '4択クイズアプリ（Anki互換）',
            theme_color: '#ecf4fa',
            background_color: '#ecf4fa',
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
