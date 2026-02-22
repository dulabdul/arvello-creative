// sanity/schemaTypes/faqSection.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'localeString',
      description:
        'Contoh ID: "Pertanyaan yang Sering Diajukan", EN: "Frequently Asked Questions"',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ List',
      type: 'array',
      description:
        'Tambahkan pertanyaan dan jawaban di sini. Anda bisa menambahkan sebanyak mungkin.',
      of: [
        {
          type: 'object',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'localeText',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: 'question.id', subtitle: 'answer.id' },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled FAQ',
                subtitle: subtitle || 'No answer provided',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline.id' },
    prepare({ title }) {
      return { title: title || 'FAQ Settings' };
    },
  },
});
