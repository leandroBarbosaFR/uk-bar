import {defineField, defineType} from 'sanity'

export const TextImgSectionLeftType = defineType({
  name: 'TextImgSectionLeft',
  title: 'Text Image Section Image on the left side',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
