import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        app: './src/main.tsx',
      },
    },
  },
});
