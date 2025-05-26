import {defineField, defineType} from 'sanity'

export const embedType = defineType({
  name: 'embed',
  title: 'Embed section (Video section)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Local File', value: 'local' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      hidden: ({ parent }) => parent?.videoType !== 'youtube',
    }),
    defineField({
      name: 'videoFile',
      title: 'Local Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.videoType !== 'local',
    }),
  ],
})
