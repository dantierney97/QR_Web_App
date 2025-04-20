import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.svg', 'assets/icon192.png', 'assets/icon512.png'],
            manifest: {
                name: 'QR Code Generator',
                short_name: 'QRGen',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#1e1e1e',
                scope: '/',
                icons: [
                    {
                        src: 'assets/icon192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'assets/icon512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
});