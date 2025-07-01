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
      name: 'socialNetworks',
      title: 'Social Networks',
      type: 'array',
      of: [
        defineField({
          name: 'social',
          title: 'Social Network',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.uri({allowRelative: false}).required(),
            },
          ],
        }),
      ],
    }),
  ],
})
