// sanity/schemaTypes/localeStringArray.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localeStringArray',
  title: 'Localized String Array',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Indonesian (Default)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
