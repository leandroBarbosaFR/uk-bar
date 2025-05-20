'use client'
import type {YouTubeConfig} from 'react-player/youtube'
import dynamic from 'next/dynamic'
import '../styles/embedSection.css'

const ReactPlayerNoSSR = dynamic(() => import('react-player/youtube'), {ssr: false})

export default function EmbedSection() {
  const config: YouTubeConfig = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
    },
  }
  return (
    <section className="bg-[#33483e] overflow-hidden relative isolate " id="embed-section">
      <div className="title-wrapper-embed">
        <h1 className="title-section-embed">CAIPIRINHA MASTER CLASS</h1>
      </div>
      <div className="w-[100%] max-w-[1000px] aspect-video overflow-hidden relative">
        <ReactPlayerNoSSR
          url="https://www.youtube.com/watch?v=QeRyu5-Zv-o"
          width="100%"
          height="100%"
          config={config}
        />
        {/* your custom controls here if needed */}
      </div>
    </section>
  )
}
