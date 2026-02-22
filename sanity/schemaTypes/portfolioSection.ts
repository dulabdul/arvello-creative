// sanity/schemaTypes/portfolioSection.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'portfolioSection',
  title: 'Portfolio Section Settings',
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
      name: 'projectsPageLink',
      title: 'Projects Page Link',
      type: 'string',
      description: 'Contoh: /projects',
      initialValue: '/projects',
    }),

    // --- PENYATUAN DATA PROJECTS DI SINI ---
    defineField({
      name: 'projects',
      title: 'Projects Carousel List',
      type: 'array',
      description:
        'Tambahkan proyek-proyek yang akan muncul di dalam Carousel/Slider.',
      of: [
        {
          type: 'object',
          title: 'Project Item',
          fields: [
            {
              name: 'title',
              title: 'Project Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Project Screenshot',
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
              name: 'projectUrl',
              title: 'Project Link (Optional)',
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
      return { title: title || 'Portfolio Settings' };
    },
  },
});
