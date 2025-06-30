import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug * ( do not change this value please )',
      type: 'slug',
      initialValue: {current: 'contact'},
      options: {
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      hidden: ({currentUser}) => {
        return !currentUser?.roles?.some((role) => role.name === 'administrator')
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'infosTitle',
      title: 'Title',
      type: 'string',
      initialValue: 'How to Reach Us:',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Label',
      type: 'string',
      initialValue: 'Email',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Phone Label',
      type: 'string',
      initialValue: 'Phone',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'addressLabel',
      title: 'Address Label',
      type: 'string',
      initialValue: 'Address',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
  ],
})
