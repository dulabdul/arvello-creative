// sanity/schemaTypes/contactSection.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactSection',
  title: 'Contact Section Settings',
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

    // --- EMAIL SETTINGS ---
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Button Label',
      type: 'localeString',
      description: 'Contoh ID: "Kirim Email", EN: "Send an Email"',
    }),

    // --- WHATSAPP SETTINGS ---
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Format internasional tanpa +. Contoh: 6281234567890',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappLabel',
      title: 'WhatsApp Button Label',
      type: 'localeString',
      description: 'Contoh ID: "Chat WhatsApp", EN: "Chat on WhatsApp"',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Default WhatsApp Message',
      type: 'localeText',
      description: 'Pesan otomatis saat user menekan tombol WA.',
    }),
  ],
  preview: {
    select: { title: 'headline.id' },
    prepare({ title }) {
      return { title: title || 'Contact Settings' };
    },
  },
});
