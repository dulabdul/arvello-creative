// src/pages/robots.txt.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ request }) => {
  const siteUrl = new URL(request.url).origin;
  const robotsTxt = `
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /admin/*

Sitemap: ${siteUrl}/sitemap.xml
  `.trim();
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
