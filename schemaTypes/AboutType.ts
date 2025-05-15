import {defineField, defineType} from 'sanity'

export const AboutType = defineType({
  name: 'about',
  title: 'AboutSection',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'leftImage',
      title: 'Left Image',
      type: 'image',
    }),
    defineField({
      name: 'middleImage',
      title: 'Middle Image',
      type: 'image',
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Image',
      type: 'image',
    }),
    defineField({
      name: 'titleImages',
      title: 'Title Images',
      type: 'string',
      // validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Body Images',
      name: 'bodyImages',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
