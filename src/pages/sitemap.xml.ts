// src/pages/sitemap.xml.ts
import { sanityClient } from '@/lib/sanity';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Mendapatkan root URL secara dinamis (misal: https://arvellocreative.com)
  const siteUrl = new URL(request.url).origin;
  const posts = await sanityClient.fetch(`
    *[_type == "post"] {
      _updatedAt,
      slug
    }
  `);

  // 2. Daftar Halaman Statis Utama (Beranda, Blog Index, Legal)
  const staticPages = [
    '', // Halaman Utama ID (/)
    '/en', // Halaman Utama EN
    '/blog', // Feed Blog ID
    '/en/blog', // Feed Blog EN
    '/refund-policy', // Legal ID
    '/en/refund-policy', // Legal EN
  ];

  // 3. Generate Format XML untuk Halaman Statis
  const staticUrls = staticPages
    .map(
      (page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' || page === '/en' ? '1.0' : '0.8'}</priority>
    </url>
  `,
    )
    .join('');

  // 4. Generate Format XML untuk Blog Posts Dinamis (ID & EN)
  const dynamicUrls = posts
    .map((post: any) => {
      let urls = '';
      // Konversi format _updatedAt dari Sanity ke standar ISO 8601 XML
      const lastMod = new Date(post._updatedAt).toISOString();

      // Cek dan buat URL versi ID jika slug-nya tersedia
      if (post.slug?.id?.current) {
        urls += `
        <url>
          <loc>${siteUrl}/blog/${post.slug.id.current}</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
      }

      // Cek dan buat URL versi EN jika slug-nya tersedia
      if (post.slug?.en?.current) {
        urls += `
        <url>
          <loc>${siteUrl}/en/blog/${post.slug.en.current}</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
      }

      return urls;
    })
    .join('');

  // 5. Susun struktur utama Sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${dynamicUrls}
    </urlset>
  `;

  // 6. Kembalikan response sebagai file XML
  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      // Cache selama 1 jam di browser/CDN agar performa tetap kencang
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
