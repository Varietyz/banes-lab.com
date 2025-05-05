import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: '*.cjs', dest: 'assets' },
        { src: '*.js', dest: 'assets' }
      ]
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Manual chunking splits vendor code from app code
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        }
      }
    },
    // Adjust warning limit if necessary
    chunkSizeWarningLimit: 600
  },
  server: {
    host: '0.0.0.0',
    port: 3001
  }
});
