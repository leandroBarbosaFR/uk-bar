import {defineType, defineField} from 'sanity'

export const linkType = defineType({
  name: 'links',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Internal Link',
      type: 'reference',
      to: [{type: 'contactPage'}, {type: 'cocktailBarHire'}, {type: 'mobileBarHirePackages'}],
    }),
    defineField({name: 'external', title: 'External URL', type: 'url'}),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((link) => {
      if (!link) return true
      if (!link.internal && !link.external) {
        return 'You must specify either an internal or external link'
      }
      return true
    }),
})
