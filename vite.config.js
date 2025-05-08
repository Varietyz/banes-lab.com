import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: '*.cjs', dest: '.' },
        { src: '*.js', dest: '' }
      ]
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  server: {
    host: '0.0.0.0',
    port: 3001
  }
});
