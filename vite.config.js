import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    // honour an assigned port (e.g. from a preview runner); default to Vite's 5173
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  build: {
    // three.js accounts for most of the bundle; ~200 kB gzipped is expected.
    chunkSizeWarningLimit: 900,
  },
});
