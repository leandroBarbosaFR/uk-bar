import {defineField, defineType} from 'sanity'

export const MarqueeSectionType = defineType({
  name: 'marqueeSection',
  title: 'Marquee Section',
  type: 'document',
  fields: [
    defineField({
      name: 'words',
      title: 'Words',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
})
