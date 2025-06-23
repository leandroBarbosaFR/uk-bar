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
      to: [
        {type: 'contactPage'},
        {type: 'cocktailBarHire'},
        {type: 'mobileBarHirePackages'},
        {type: 'privacyPolicyPage'},
        {type: 'termsAndConditionsPage'},
        {type: 'entertainmentPage'},
        {type: 'aboutUsPage'},
        {type: 'masterclassPage'},
      ],
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor Link (e.g. #about)',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((val) => {
          if (val && !val.startsWith('#')) return 'Anchor must start with "#"'
          return true
        }),
    }),
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

      const hasDestination = link.internal || link.external || link.anchor
      if (!hasDestination) {
        return 'You must specify an internal, external, or anchor link'
      }

      return true
    }),
})
