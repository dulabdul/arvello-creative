// sanity/schemaTypes/pricingSection.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pricingSection',
  title: 'Pricing Section Settings',
  type: 'document',
  fields: [
    // --- KOLOM KIRI (Header & CTA Card) ---
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'subheadline',
      title: 'Section Subheadline',
      type: 'localeText',
    }),
    defineField({
      name: 'leftCardTitle',
      title: 'Left Card Title (Schedule Meeting)',
      type: 'localeString',
    }),
    defineField({
      name: 'leftCardButtonText',
      title: 'Left Card Button Text',
      type: 'localeString',
    }),

    // --- WHATSAPP SETTINGS ---
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description:
        'Gunakan format internasional tanpa tanda +. Contoh: 6281234567890',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultWhatsappMessage',
      title: 'Default WhatsApp Message (Left CTA)',
      type: 'localeText',
      description: 'Pesan default saat user klik tombol di kolom kiri.',
    }),

    // --- KOLOM KANAN (Daftar Paket Harga / Carousel) ---
    defineField({
      name: 'pricingPackages',
      title: 'Pricing Packages',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Pricing Package',
          fields: [
            {
              name: 'packageName',
              title: 'Package Name',
              type: 'localeString',
            },
            // --- TAMBAHAN: BOOLEAN UNTUK POPULAR CARD ---
            {
              name: 'isPopular',
              title: 'Highlight as Popular / Hot Sales?',
              type: 'boolean',
              initialValue: false,
              description:
                'Nyalakan ini agar kartu memiliki border khusus dan lencana "Popular".',
            },
            {
              name: 'packageDescription',
              title: 'Package Description',
              type: 'localeText',
            },
            {
              name: 'priceIdr',
              title: 'Price (IDR)',
              type: 'string',
              description: 'Contoh: Rp 5.000.000',
            },
            {
              name: 'priceUsd',
              title: 'Price (USD)',
              type: 'string',
              description: 'Contoh: $3,250',
            },
            {
              name: 'billingCycle',
              title: 'Billing Cycle (Suffix)',
              type: 'localeString',
              description: 'Contoh ID: "/bulan", EN: "/mo"',
            },
            {
              name: 'features',
              title: 'Features List',
              type: 'array',
              of: [{ type: 'localeString' }],
            },
            {
              name: 'packageWhatsappMessage',
              title: 'WhatsApp Message for this Package',
              type: 'localeText',
              description: 'Pesan spesifik saat user klik paket ini.',
            },
          ],
          preview: {
            select: {
              title: 'packageName.id',
              subtitle: 'priceIdr',
              isPopular: 'isPopular',
            },
            prepare({ title, subtitle, isPopular }) {
              return {
                title: `${isPopular ? '🔥 ' : ''}${title || 'Unnamed Package'}`,
                subtitle: subtitle || 'No Price',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline.id' },
    prepare({ title }) {
      return { title: title || 'Pricing Settings' };
    },
  },
});
