import {defineField, defineType} from 'sanity'

export const TextMarqueeSectionType = defineType({
  name: 'TextMarqueeSection',
  title: 'Text Marquee Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading for the section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle text',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Main content text for the section',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text displayed on the CTA button',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'URL or path the button links to',
        },
      ],
    }),
    defineField({
      name: 'topMarqueeImages',
      title: 'Top Marquee Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      description: 'Images to display in the top marquee row',
    }),
    defineField({
      name: 'bottomMarqueeImages',
      title: 'Bottom Marquee Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
      description: 'Images to display in the bottom marquee row',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'topMarqueeImages.0',
    },
  },
})
