import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Indonesian (Default)',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
  ],
});
