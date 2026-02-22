import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Hero Headline',
      type: 'localeString', // Gunakan custom type kita
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localeString', // Gunakan custom type kita
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
});
