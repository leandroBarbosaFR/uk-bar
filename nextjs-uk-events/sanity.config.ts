import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {linkField} from 'sanity-plugin-link-field'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'uk-events',
  basePath: '/studio',
  projectId: 'qixelqle',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    linkField({
      linkableSchemaTypes: ['header'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
