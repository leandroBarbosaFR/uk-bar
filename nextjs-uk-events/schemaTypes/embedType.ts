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
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Local File', value: 'local'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'string',
      description: 'Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      hidden: ({parent}) => parent?.videoType !== 'youtube',
    }),
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'string',
      description: 'Example: https://vimeo.com/123456789',
      hidden: ({parent}) => parent?.videoType !== 'vimeo',
    }),
    defineField({
      name: 'videoFile',
      title: 'Local Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.videoType !== 'local',
    }),
  ],
})
