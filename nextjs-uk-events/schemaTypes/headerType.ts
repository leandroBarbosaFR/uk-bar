import {defineType, defineField} from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Link Object',
          fields: [
            defineField({
              name: 'dropdownOption',
              title: 'Dropdown Option',
              type: 'string',
              options: {
                list: [{title: 'Our Services', value: 'ourServices'}],
                layout: 'dropdown', // This enables dropdown options
              },
            }),
            defineField({
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
              description: 'Enter an external URL (optional)',
            }),
            defineField({
              name: 'internalLinks',
              title: 'Internal Links',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {type: 'corporateBarHire'},
                    {type: 'cocktailBarHire'},
                    {type: 'contactPage'},
                    {type: 'mobileBarHirePackages'},
                    {type: 'privacyPolicyPage'},
                    {type: 'termsAndConditionsPage'},
                    {type: 'entertainmentPage'},
                    {type: 'aboutUsPage'},
                    {type: 'masterclassPage'},
                  ], // Change this to the correct type (e.g., "page" or your custom document type)
                },
              ],
              description: 'Choose internal links from your pages (optional)',
            }),
          ],
        },
      ],
    }),
  ],
})
