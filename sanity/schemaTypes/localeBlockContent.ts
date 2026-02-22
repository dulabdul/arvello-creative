import { defineType } from 'sanity';

export default defineType({
  name: 'localeBlockContent',
  title: 'Localized Portable Text',
  type: 'object',
  fields: [
    {
      name: 'id',
      title: 'Indonesian Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'en',
      title: 'English Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
  ],
});
