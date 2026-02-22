// sanity/schemaTypes/whatWeDo.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'whatWeDo',
  title: 'What We Do Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'localeText',
    }),
    defineField({
      name: 'gridItems',
      title: 'Grid Items (Services & Visuals)',
      type: 'array',
      validation: (Rule) =>
        Rule.max(6).warning('Maksimal 6 item sesuai desain.'),
      of: [
        // TIPE 1: Service Card
        {
          type: 'object',
          name: 'serviceBlock',
          title: 'Service Card (Icon + Text)',
          fields: [
            {
              name: 'iconSvgPath',
              title: 'SVG Icon Path Data (d="...")',
              type: 'text',
              rows: 3,
            },
            { name: 'title', title: 'Service Title', type: 'localeString' },
            {
              name: 'description',
              title: 'Service Description',
              type: 'localeText',
            },
          ],
          preview: {
            select: { title: 'title.id' },
            prepare({ title }) {
              return {
                title: title || 'Service Card',
                subtitle: 'Type: Icon + Text',
              };
            },
          },
        },
        // TIPE 2: Brand Block (Sekarang HANYA Image, sama seperti imageBlock)
        {
          type: 'object',
          name: 'brandBlock',
          title: 'Brand Image Card',
          fields: [
            {
              name: 'image',
              title: 'Brand Full Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          // CARA FIX TS ERROR: Gunakan properti media langsung dari select
          preview: {
            select: { media: 'image' },
            prepare({ media }) {
              return {
                title: 'Brand Card',
                subtitle: 'Type: Full Brand Image',
                media: media, // Sanity akan otomatis mengenali objek gambar ini
              };
            },
          },
        },
        // TIPE 3: Photo Block
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Full Photo Card',
          fields: [
            {
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          // CARA FIX TS ERROR: Gunakan properti media langsung dari select
          preview: {
            select: { media: 'photo' },
            prepare({ media }) {
              return {
                title: 'Photo Card',
                subtitle: 'Type: Full Image',
                media: media,
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
      return { title: title || 'What We Do Section' };
    },
  },
});
