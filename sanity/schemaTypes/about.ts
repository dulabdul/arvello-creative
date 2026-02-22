import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString', // Teks pendek (string)
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText', // Teks panjang (text/textarea)
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics Grid (Max 4)',
      type: 'array',
      validation: (Rule) =>
        Rule.max(4).warning('Maksimal 4 statistik agar UI Grid tetap rapi.'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'value',
              title: 'Value / Angka',
              type: 'string',
              description: 'Contoh: 245% atau 10K+',
            },
            {
              name: 'label',
              title: 'Label / Deskripsi Angka',
              type: 'localeString',
              description: 'Contoh ID: "Klien Puas" | EN: "Happy Clients"',
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label.id',
            },
          },
        },
      ],
    }),
  ],
});
