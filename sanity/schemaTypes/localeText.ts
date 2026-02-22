import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeText',
  title: 'Localized Text (Paragraf)',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Indonesian (Default)',
      type: 'text', // Menggunakan 'text' agar menjadi textarea multi-baris
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
  ],
});
