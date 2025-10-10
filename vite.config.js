import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Important for subdomain deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
  },
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'https://hrmbackend.ucc.bsit4c.com',
    //     // changeOrigin: true,
    //     // headers: {
    //     //   Accept: 'application/json',
    //     //   'Content-Type': 'application/json',
    //     // },
    //   },
    // },
  },
});
