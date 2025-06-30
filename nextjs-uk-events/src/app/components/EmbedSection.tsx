'use client'

import {useEffect, useState} from 'react'
import type {YouTubeConfig} from 'react-player/youtube'
import type {VimeoConfig} from 'react-player/vimeo'
import dynamic from 'next/dynamic'
import {client} from '@/sanity/client'
import '../styles/embedSection.css'

const ReactPlayerNoSSR = dynamic(() => import('react-player/youtube'), {ssr: false})
const ReactPlayerVimeoNoSSR = dynamic(() => import('react-player/vimeo'), {ssr: false})
const ReactPlayerFileNoSSR = dynamic(() => import('react-player/file'), {ssr: false})

const EMBED_QUERY = `*[_type == "embed"][0]{
  _id,
  title,
  videoType,
  youtubeUrl,
  vimeoUrl,
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
  videoType: 'youtube' | 'vimeo' | 'local'
  youtubeUrl?: string
  vimeoUrl?: string
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

  const youtubeConfig: YouTubeConfig = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
    },
  }

  const vimeoConfig: VimeoConfig = {
    playerOptions: {
      byline: false,
      portrait: false,
      title: false,
      controls: true,
      badge: false, // Retire le badge Vimeo
      autopause: false, // Désactive la pause automatique
      autoplay: true, // Autoplay (attention aux politiques navigateur)
      muted: true, // Nécessaire pour autoplay dans la plupart des navigateurs
      responsive: true, // Player responsive
      // Options pour réduire les overlays
      speed: false, // Cache les contrôles de vitesse
      quality: false, // Cache les options de qualité
      pip: false, // Cache picture-in-picture
      fullscreen: true, // Garde le plein écran
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
    switch (embedData.videoType) {
      case 'youtube':
        if (embedData.youtubeUrl) {
          return (
            <ReactPlayerNoSSR
              url={embedData.youtubeUrl}
              width="100%"
              height="100%"
              config={youtubeConfig}
            />
          )
        }
        break

      case 'vimeo':
        if (embedData.vimeoUrl) {
          return (
            <ReactPlayerVimeoNoSSR
              url={embedData.vimeoUrl}
              width="100%"
              height="100%"
              config={vimeoConfig}
            />
          )
        }
        break

      case 'local':
        if (embedData.videoFile?.asset.url) {
          return (
            <ReactPlayerFileNoSSR
              url={embedData.videoFile.asset.url}
              width="100%"
              height="100%"
              controls
            />
          )
        }
        break

      default:
        return <p className="text-gray-500 text-center">Unsupported video type</p>
    }

    return <p className="text-gray-500 text-center">No video available</p>
  }

  return (
    <section className="bg-[#f1f0e7] overflow-hidden relative isolate" id="embed-section">
      <div className="textMarqueeSection-bg-section"></div>
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
