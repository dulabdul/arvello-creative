// sanity/schemaTypes/post.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'localeString',
    }),

    // --- FIX SEO: LOCALIZED SLUG ---
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'object',
      description: 'Generate slug untuk masing-masing bahasa agar SEO optimal.',
      fields: [
        {
          name: 'id',
          title: 'Indonesian Slug',
          type: 'slug',
          options: { source: 'title.id', maxLength: 96 },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English Slug',
          type: 'slug',
          options: { source: 'title.en', maxLength: 96 },
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Short Summary)',
      type: 'localeText',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'localeBlockContent',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title.id', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
