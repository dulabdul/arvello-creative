import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'howItWorks',
  title: 'How It Works Section',
  type: 'document',
  fields: [
    // --- KOLOM KIRI (Headline, Deskripsi, Gambar) ---
    defineField({
      name: 'headline',
      title: 'Section Headline',
      // Menggunakan localeString (teks pendek) yang sudah kita buat sebelumnya
      type: 'localeString',
      description: 'Judul utama seksi ini.',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      // Menggunakan localeText (textarea panjang) untuk deskripsi/subheadline
      type: 'localeText',
      description: 'Deskripsi paragraf di bawah judul.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Left Side)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text (SEO)',
          description:
            'Penting untuk aksesibilitas dan SEO. Deskripsikan gambarnya.',
          validation: (Rule) =>
            Rule.required().warning('Sebaiknya isi alt text untuk SEO.'),
        },
      ],
    }),

    // --- KOLOM KANAN (Langkah-langkah / Steps) ---
    defineField({
      name: 'steps',
      title: 'Process Steps list',
      description:
        'Tambahkan langkah-langkah proses di sini. Urutan di CMS menentukan nomor urut di website.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Step Item',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'localeString', // Contoh: "Discovery"
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'localeText', // Penjelasan langkah tersebut
            },
          ],
          // Kustomisasi tampilan preview di Studio agar rapi
          preview: {
            select: {
              titleId: 'title.id',
              titleEn: 'title.en',
            },
            prepare({ titleId, titleEn }) {
              const title = titleId || titleEn || 'Untitled Step';
              return {
                title: title,
                subtitle: 'Step Item',
                media: undefined, // Tidak butuh ikon di preview CMS karena di frontend pakai nomor
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline.id',
    },
    prepare({ title }) {
      return {
        title: title || 'How It Works Section',
      };
    },
  },
});
