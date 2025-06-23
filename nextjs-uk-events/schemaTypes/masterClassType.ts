import {defineField, defineType} from 'sanity'

export const masterClassType = defineType({
  name: 'masterclassPage',
  title: 'Master Class Page',
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
      initialValue: {current: 'master-class'},
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
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],
})
