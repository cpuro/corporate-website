import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  base: './',
  plugins: [
    react(),

    // ✅ Plugin para manipular el <head> de index.html
    createHtmlPlugin({
      inject: {
        tags: [
          {
            tag: 'link',
            attrs: {
              rel: 'stylesheet',
              href: '/assets/index.css',
              media: 'print',
              onload: "this.media='all'",
            },
            injectTo: 'head',
          },
        ],
      },
    }),

    // ✅ SVG como React components
    svgr({
      exportAsDefault: false,
    }),

    // ✅ Compresión gzip y Brotli
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],

  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },

  build: {
    minify: 'esbuild', // ✅ Asegura minificación de JS y CSS
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
          // 🔥 Quitado: "swiper" si no lo usas directamente
        },
      },
      external: ['pdfjs-dist/legacy/build/pdf.worker.min.mjs'],
    },
    assetsInlineLimit: 4096,
  },
});
