'use client'

import {useEffect, useState} from 'react'
import type {YouTubeConfig} from 'react-player/youtube'
import dynamic from 'next/dynamic'
import {client} from '@/sanity/client'
import '../styles/embedSection.css'

const ReactPlayerNoSSR = dynamic(() => import('react-player/youtube'), {ssr: false})
const ReactPlayerFileNoSSR = dynamic(() => import('react-player/file'), {ssr: false})

const EMBED_QUERY = `*[_type == "embed"][0]{
  _id,
  title,
  videoType,
  youtubeUrl,
  videoFile{
    asset->{
      url,
      originalFilename,
      mimeType
    }
  }
}`

interface EmbedData {
  _id: string
  title: string
  videoType: 'youtube' | 'file'
  youtubeUrl?: string
  videoFile?: {
    asset: {
      url: string
      originalFilename: string
      mimeType: string
    }
  }
}

export default function EmbedSection() {
  const [embedData, setEmbedData] = useState<EmbedData | null>(null)

  const config: YouTubeConfig = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
    },
  }

  useEffect(() => {
    async function fetchEmbedData() {
      const data = await client.fetch(EMBED_QUERY)
      setEmbedData(data)
    }
    fetchEmbedData()
  }, [])

  if (!embedData) return null // or loading spinner

  const renderPlayer = () => {
    if (embedData.videoType === 'youtube' && embedData.youtubeUrl) {
      return (
        <ReactPlayerNoSSR
          url={embedData.youtubeUrl}
          width="100%"
          height="100%"
          config={config}
        />
      )
    } else if (embedData.videoType === 'file' && embedData.videoFile?.asset.url) {
      return (
        <ReactPlayerFileNoSSR
          url={embedData.videoFile.asset.url}
          width="100%"
          height="100%"
          controls
        />
      )
    } else {
      return <p className="text-white text-center">No video available</p>
    }
  }

  return (
    <section className="bg-[#f1f0e7] overflow-hidden relative isolate" id="embed-section">
       <div className='textMarqueeSection-bg-section'></div>
      <div className="title-wrapper-embed">
        <h1 className="title-section-embed text-4xl sm:text-7xl text-center md:text-5xl lg:text-[100px]">
          {embedData.title}
        </h1>
      </div>
      <div className="w-[100%] max-w-[1000px] aspect-video overflow-hidden relative mx-auto">
        {renderPlayer()}
      </div>
    </section>
  )
}
