import { defineField, defineType } from 'sanity';

export const profileDemoType = defineType({
  name: 'profileDemo',
  title: 'Profile Demo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 6,
      validation: (rule) => rule.required().min(20),
    }),
  ],
});
