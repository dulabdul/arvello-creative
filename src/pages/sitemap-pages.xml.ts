// src/pages/sitemap-pages.xml.ts
import { sanityClient } from '@/lib/sanity';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = import.meta.env.SITE || 'https://www.arvellocreative.com';

  // 1. Static Mappings
  const staticMappings = [
    { id: '', en: '/en' },
    { id: '/blog', en: '/en/blog' },
    { id: '/layanan', en: '/en/services' },
    { id: '/refund-policy', en: '/en/refund-policy' },
  ];

  // 2. Fetch Service Categories
  const pricingCategories: string[] = await sanityClient.fetch(
    `*[_type == "pricingSection"][0].pricingPackages[].category.id`
  );
  const uniqueCategories = [...new Set(pricingCategories.filter(Boolean))];
  const toSlug = (s: string) =>
    s.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const categoryMappings = uniqueCategories.map((cat) => {
    const slug = toSlug(cat);
    return { id: `/layanan/${slug}`, en: `/en/services/${slug}` };
  });

  const allMappings = [...staticMappings, ...categoryMappings];

  // 3. Generate XML
  const urls = allMappings
    .map((mapping) => {
      const idUrl = `${siteUrl}${mapping.id}`;
      const enUrl = `${siteUrl}${mapping.en}`;

      return `
<url>
<loc>${idUrl}</loc>
<xhtml:link rel="alternate" hreflang="id" href="${idUrl}"/>
<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
<changefreq>weekly</changefreq>
<priority>${mapping.id === '' ? '1.0' : '0.8'}</priority>
</url>
<url>
<loc>${enUrl}</loc>
<xhtml:link rel="alternate" hreflang="id" href="${idUrl}"/>
<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
<changefreq>weekly</changefreq>
<priority>0.8</priority>
</url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
