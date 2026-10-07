import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/first-fly-international/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'First Fly International',
        short_name: 'First Fly',
        description: 'আপনার ভিসা, আমাদের অগ্রাধিকার — ভিসা এজেন্সি ওয়ার্কস্পেস',
        theme_color: '#f6f8fb',
        background_color: '#f6f8fb',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'bn-BD',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest,woff2}'],
        navigateFallback: '/first-fly-international/index.html',
        runtimeCaching: []
      }
    })
  ],
  build: {
    outDir: 'docs',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('/@supabase/')) return 'vendor-supabase';
          if (id.includes('/framer-motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) return 'vendor-motion';
          if (id.includes('/lucide-react/')) return 'vendor-icons';
          if (id.includes('/react-dom/') || id.includes('/scheduler/') || id.includes('/react/')) return 'vendor-react';
          return undefined;
        }
      }
    }
  }
});
