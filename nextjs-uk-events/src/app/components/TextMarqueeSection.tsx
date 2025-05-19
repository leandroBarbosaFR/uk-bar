'use client'

import React, {useEffect, useState} from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'

const TextMarqueeSection_QUERY = `*[_type == "TextMarqueeSection"]{
  _id,
  title,
  subtitle,
  body,
  cta {
    text,
    link
  },
  topMarqueeImages[]{
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
  bottomMarqueeImages[]{
    asset->{
      _id,
      url
    },
    alt,
    caption
  }
}`

const TextMarqueeSection = () => {
  interface CTA {
    text: string
    link: string
  }

  interface MarqueeImage {
    asset: {
      _id: string
      url: string
    }
    alt?: string
    caption?: string
  }

  interface TextMarqueeSectionData {
    _id: string
    title: string
    subtitle: string
    body: PortableTextBlock[]
    cta: CTA
    topMarqueeImages: MarqueeImage[]
    bottomMarqueeImages: MarqueeImage[]
  }
  const [sectionData, setSectionData] = useState<TextMarqueeSectionData | null>(null)

  useEffect(() => {
    async function fetchTextMarqueeSection() {
      const data = await client.fetch(TextMarqueeSection_QUERY)
      setSectionData(data[0]) // Use o primeiro item do array, se houver mais de um
    }
    fetchTextMarqueeSection()
  }, [])

  if (!sectionData) return null

  const {title, subtitle, body, cta, topMarqueeImages, bottomMarqueeImages} = sectionData

  return (
    <section
      className="grid grid-cols-12 gap-8 p-10 items-center"
      style={{padding: '150px 0 300px 0'}}
    >
      {/* Text content */}
      <div className="col-span-12 md:col-start-2 md:col-end-7">
        {title && <h2 className=" text-[#33483e] text-3xl font-bold mb-4">{title}</h2>}
        {subtitle && <h3 className="text-xl mb-3">{subtitle}</h3>}
        {body && (
          <div className="mb-6 text-[#33483e]">
            <PortableText value={body} />
          </div>
        )}
        {cta?.text && (
          <a href={cta.link} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#33483e] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-all cursor-pointer">
              {cta.text}
            </button>
          </a>
        )}
      </div>

      {/* Marquee content */}
      <div className="col-span-12 md:col-span-6 space-y-6">
        {topMarqueeImages && topMarqueeImages.length > 0 && (
          <Marquee speed={20} gradient={false} direction="right">
            {topMarqueeImages.map((image: MarqueeImage, index: number) => (
              <div key={`top-${index}`} className="mr-4 rounded overflow-hidden">
                <Image
                  src={urlFor(image.asset).width(300).height(200).url()}
                  alt={image.alt || `Image ${index + 1}`}
                  width={300}
                  height={200}
                  className="object-cover rounded"
                />
              </div>
            ))}
          </Marquee>
        )}

        {bottomMarqueeImages && bottomMarqueeImages.length > 0 && (
          <Marquee speed={20} gradient={false} direction="left">
            {topMarqueeImages.map((image: MarqueeImage, index: number) => (
              <div key={`top-${index}`} className="mr-4 rounded overflow-hidden">
                <Image
                  src={urlFor(image.asset).width(300).height(200).url()}
                  alt={image.alt || `Image ${index + 1}`}
                  width={300}
                  height={200}
                  className="object-cover rounded"
                />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  )
}

export default TextMarqueeSection
