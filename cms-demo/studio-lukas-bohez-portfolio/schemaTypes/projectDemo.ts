import { defineField, defineType } from 'sanity';

export const projectDemoType = defineType({
  name: 'projectDemo',
  title: 'Project Demo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'profileDemo' }],
    }),
    defineField({
      name: 'stack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (Cloudinary)',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({
          scheme: ['https'],
        }),
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['https', 'http'],
          allowRelative: true,
        }),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
});
