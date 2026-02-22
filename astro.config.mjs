// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // 1. TIDAK PERLU lagi menuliskan output: 'hybrid' atau 'static'.
  // Astro 5+ sudah otomatis menangani ini.

  // 2. Adapter Vercel tetap wajib ada agar `prerender = false` bisa bekerja.
  adapter: vercel(),

  integrations: [
    react(),
    sanity({
      projectId: 'z4nqj7jz',
      dataset: 'production',
      // Pastikan studioRoute tetap dihapus/di-comment karena kita pakai rute manual
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
