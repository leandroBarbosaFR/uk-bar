'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'

import '../styles/TextImgSectionLeft.css'

const TextImgSectionLeft_QUERY = `*[_type == "TextImgSectionLeft"][0]{ _id, title, subtitle, image, body }`

export default function TextImgSectionLeft() {
  interface TextImgSectionLeftData {
    title: string
    subtitle: string
    body: PortableTextBlock[]
    image: {
      asset: {
        _ref: string
        _type: string
      }
    }
  }
  const [TextImgSectionLeft, setTextImgSectionLeft] = useState<TextImgSectionLeftData | null>(null)

  useEffect(() => {
    // Fetch data client-side
    async function fetchTextImgSectionLeft() {
      const data = await client.fetch(TextImgSectionLeft_QUERY)
      setTextImgSectionLeft(data)
    }
    fetchTextImgSectionLeft()
  }, [])

  if (!TextImgSectionLeft) return null // or show a loader, placeholder, etc.

  return (
    <section className="left-image-section bg-[#f1f0e7]">
      <div className="gap-8 grid grid-cols-12">
        <h1
          className="row-start-2 text-4xl sm:text-7xl md:text-8xl lg:text-[200px] font-bold whitespace-normal sm:whitespace-nowrap"
          style={{gridColumn: '1/12'}}
        >
          {TextImgSectionLeft.title}
        </h1>
        <h3
          className="text-[#33483e] font-bold text-center row-start-2 text-1xl sm:text-4xl md:text-4xl lg:text-[30px] whitespace-normal sm:whitespace-nowrap"
          style={{gridColumn: '1/12'}}
        >
          {TextImgSectionLeft.subtitle}
        </h3>
        <div className="col-start-1 col-end-12 row-start-3 lg:col-start-2 lg:col-end-7 lg:row-start-3 text-[#33483e] text-[16px] sm:text-base md:text-lg lg:text-[16px] item-description">
          <PortableText value={TextImgSectionLeft.body} />
        </div>
        <div className="col-start-2 col-end-11 row-start-4 lg:col-start-7 lg:col-end-12 lg:row-start-3">
          {TextImgSectionLeft.image && (
            <div className="text-img-wrapper">
              <Image
                width={1200}
                height={800}
                src={urlFor(TextImgSectionLeft.image).width(1200).url()}
                alt={TextImgSectionLeft.title || 'Image section'}
                className="text-img"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
