// sanity/schemaTypes/templateSection.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'templateSection',
  title: 'Template Section Settings',
  type: 'document',
  fields: [
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
      name: 'seeMoreText',
      title: '"See More" Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'templatesPageLink',
      title: 'templates Page Link',
      type: 'string',
      description: 'Contoh: /templates',
      initialValue: '/templates',
    }),

    // --- PENYATUAN DATA templateS DI SINI ---
    defineField({
      name: 'templates',
      title: 'templates Carousel List',
      type: 'array',
      description:
        'Tambahkan proyek-proyek yang akan muncul di dalam Carousel/Slider.',
      of: [
        {
          type: 'object',
          title: 'template Item',
          fields: [
            {
              name: 'title',
              title: 'template Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'template Screenshot',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text (SEO)',
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'templateUrl',
              title: 'template Link (Optional)',
              type: 'url',
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline.id' },
    prepare({ title }) {
      return { title: title || 'Template Settings' };
    },
  },
});
