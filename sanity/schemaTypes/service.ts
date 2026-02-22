import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description:
        'Gunakan tag <br/> jika ingin teks turun ke baris baru. Contoh: Web Design-<br/>& Development',
    }),
    defineField({
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    }),
    // Order digunakan untuk mengurutkan posisi kartu
    defineField({ name: 'order', title: 'Sorting Order', type: 'number' }),
  ],
});
