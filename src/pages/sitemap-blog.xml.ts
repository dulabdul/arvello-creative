// src/pages/sitemap-blog.xml.ts
import { sanityClient } from '@/lib/sanity';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = import.meta.env.SITE || 'https://www.arvellocreative.com';

  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      _updatedAt,
      slug
    }
  `);

  const urls = posts
    .map((post: any) => {
      let xml = '';
      const lastMod = new Date(post._updatedAt).toISOString();
      const idSlug = post.slug?.id?.current;
      const enSlug = post.slug?.en?.current;

      const idUrl = idSlug ? `${siteUrl}/blog/${idSlug}` : null;
      const enUrl = enSlug ? `${siteUrl}/en/blog/${enSlug}` : null;

      // 1. Generate URL entry for ID version
      if (idUrl) {
        xml += `
<url>
<loc>${idUrl}</loc>
<lastmod>${lastMod}</lastmod>
<xhtml:link rel="alternate" hreflang="id" href="${idUrl}"/>
${enUrl ? `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>` : ''}
<changefreq>monthly</changefreq>
<priority>0.7</priority>
</url>`;
      }

      // 2. Generate URL entry for EN version
      if (enUrl) {
        xml += `
<url>
<loc>${enUrl}</loc>
<lastmod>${lastMod}</lastmod>
<xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>
${idUrl ? `<xhtml:link rel="alternate" hreflang="id" href="${idUrl}"/>` : ''}
<changefreq>monthly</changefreq>
<priority>0.7</priority>
</url>`;
      }

      return xml;
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
