import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@shared': path.resolve('./src/shared'),
      '@entities': path.resolve('./src/entities'),
      '@features': path.resolve('./src/features'),
      '@widgets': path.resolve('./src/widgets'),
      '@pages': path.resolve('./src/pages'),
      '@app': path.resolve('./src/app'),
      '$lib': path.resolve('./src/lib'),
    },
  },
});
