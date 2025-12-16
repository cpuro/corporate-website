import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';
import path from 'path'; 

export default defineConfig({
  base: '/',
  publicDir: 'public',

  plugins: [
    react(),

    // ✅ Manipulación del <head> (CSS diferido)
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

    // ✅ SVG como React Component (?react)
    svgr({
      exportAsDefault: false,
    }),

    // ✅ Compresión gzip y Brotli
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ Alias ahora funcional  
    },
  },

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
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react', 'react-icons'],
        },
      },
      external: ['pdfjs-dist/legacy/build/pdf.worker.min.mjs'],
    },
  },
});
