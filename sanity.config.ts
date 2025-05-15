import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {linkField} from 'sanity-plugin-link-field'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'uk-events',

  projectId: 'qixelqle',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    linkField({
      linkableSchemaTypes: ['header'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
