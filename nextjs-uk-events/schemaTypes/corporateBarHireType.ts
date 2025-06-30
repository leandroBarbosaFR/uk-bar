import {defineField, defineType} from 'sanity'

export const corporatelBarHireType = defineType({
  name: 'corporateBarHire',
  title: 'Corporate Bar Hire Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug * ( do not change this value please )',
      type: 'slug',
      initialValue: {current: 'corporate-bar-hire'},
      options: {
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      hidden: ({currentUser}) => {
        return !currentUser?.roles?.some((role) => role.name === 'administrator')
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
