// sanity/schemaTypes/siteSettings.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & SEO',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'General Info' },
    { name: 'seo', title: 'Advanced SEO Options' },
    { name: 'social', title: 'Social Media Sharing (OG & Twitter)' },
    { name: 'tracking', title: 'Analytics & Tracking' },
  ],
  fields: [
    defineField({
      name: 'publishNotice',
      title: '⚠️ Informasi Sistem',
      type: 'string',
      description:
        'Setiap kali Anda mempublikasikan perubahan (Publish), sistem membutuhkan waktu 1-3 menit untuk memperbarui server global. Silakan tunggu sejenak sebelum me-refresh halaman website Anda.',
      readOnly: true, // Klien tidak bisa mengedit teks ini
      initialValue: 'Proses Sinkronisasi Server Global',
    }),
    // --- GENERAL (Universal, tidak perlu bahasa) ---
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      description: 'Nama brand yang muncul di Navbar (kiri atas).',
    }),
    defineField({
      name: 'title',
      title: 'Site Brand / Name',
      type: 'string',
      fieldset: 'general',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site Live URL',
      type: 'url',
      description:
        'URL utama website untuk kebutuhan Canonical Link (contoh: https://corpbrand.com)',
      fieldset: 'general',
    }),

    // --- SEO (Wajib Bilingual) ---
    defineField({
      name: 'seoTitleSuffix',
      title: 'SEO Title Suffix',
      type: 'localeString', // <-- Diubah ke localeString
      description:
        'Contoh ID: " | Agensi Web Terbaik", EN: " | Best Web Agency"',
      fieldset: 'seo',
    }),
    defineField({
      name: 'description',
      title: 'Global Meta Description',
      type: 'localeString', // <-- Diubah ke localeString
      fieldset: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Meta Keywords',
      type: 'localeString', // <-- Diubah ke localeString
      description: 'Pisahkan dengan koma (contoh: agency, digital, Agency)',
      fieldset: 'seo',
    }),
    defineField({
      name: 'allowIndexing',
      title: 'Allow Search Engine Indexing',
      type: 'boolean',
      initialValue: true,
      description: 'MATIKAN jika website masih dalam tahap testing/staging.',
      fieldset: 'seo',
    }),

    // --- SOCIAL SHARING (Universal) ---
    defineField({
      name: 'ogImage',
      title: 'Global Share Image (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Rekomendasi rasio: 1200x630px.',
      fieldset: 'social',
    }),
    defineField({
      name: 'twitterHandle',
      title: 'Twitter Handle',
      type: 'string',
      description: 'Contoh: @corpbrand',
      fieldset: 'social',
    }),

    // --- TRACKING (Universal) ---
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Site Verification Code',
      type: 'string',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gaId',
      title: 'Google Analytics ID (G-XXXXX)',
      type: 'string',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      fieldset: 'tracking',
    }),
    defineField({
      name: 'pixelId',
      title: 'Meta Pixel ID',
      type: 'string',
      fieldset: 'tracking',
    }),

    defineField({
      name: 'paymentMethods',
      title: 'Payment Channels (Footer)',
      description: 'Tambahkan logo pembayaran (Bank, E-Wallet, dll)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'categoryName',
              title: 'Category Name',
              type: 'string',
              description: 'Contoh: Bank, E-Wallet, Credit Card',
            },
            {
              name: 'logos',
              title: 'Payment Logos',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Payment Name',
                      type: 'string',
                      description: 'Contoh: BCA, Mandiri, OVO',
                    },
                    { name: 'image', title: 'Logo', type: 'image' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'categoryName' },
          },
        },
      ],
    }),
  ],
});
