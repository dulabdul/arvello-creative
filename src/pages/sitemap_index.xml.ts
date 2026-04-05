// src/pages/sitemap_index.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = import.meta.env.SITE || 'https://www.arvellocreative.com';
  
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${siteUrl}/sitemap-pages.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${siteUrl}/sitemap-blog.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>
  `;

  return new Response(sitemapIndex.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
