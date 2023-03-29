import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    viteCompression(),
    visualizer() as PluginOption
  ],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: './src/main.tsx',
      output: {
        compact: true,
        format: 'iife'
      }
    }
  },
  base: 'https://cdn.jsdelivr.net/gh/stenwall/nft-gated-shopify/dist/'
});
