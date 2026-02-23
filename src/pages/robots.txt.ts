// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  // Mendapatkan root URL secara dinamis
  const siteUrl = new URL(request.url).origin;

  // Aturan dasar robots.txt
  const robotsTxt = `
User-agent: *
Allow: /

# Cegah Google mengindeks halaman CMS / Admin Panel
Disallow: /admin/
Disallow: /admin/*

# Tunjukkan lokasi sitemap
Sitemap: ${siteUrl}/sitemap.xml
  `.trim();

  // Kembalikan response sebagai file teks biasa (text/plain)
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
