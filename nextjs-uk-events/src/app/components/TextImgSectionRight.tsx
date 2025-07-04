'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'

import '../styles/TextImgSectionRight.css'

const TextImgSectionRight_QUERY = `*[_type == "TextImgSectionRight"][0]{ _id, title, subtitle, image, body }`

export default function TextImgSectionRight() {
  interface TextImgSectionRightData {
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
  const [TextImgSectionRight, setTextImgSectionRight] = useState<TextImgSectionRightData | null>(
    null,
  )

  useEffect(() => {
    // Fetch data client-side
    async function fetchTextImgSectionRight() {
      const data = await client.fetch(TextImgSectionRight_QUERY)
      setTextImgSectionRight(data)
    }
    fetchTextImgSectionRight()
  }, [])

  if (!TextImgSectionRight) return null // or show a loader, placeholder, etc.

  return (
    <section className="right-image-section bg-[#f1f0e7]">
      <div className="gap-8 grid grid-cols-12 px-4">
        <h1
          className=" row-start-1 text-4xl sm:text-7xl text-center text-[#33483e] md:text-5xl lg:text-[130px] font-bold "
          style={{gridColumn: '1/13'}}
        >
          {TextImgSectionRight.title}
        </h1>
        <h3
          className="col-span-12 text-[#33483e] font-bold text-center row-start-2 text-1xl sm:text-4xl md:text-4xl lg:text-[30px] whitespace-normal sm:whitespace-nowrap"
          style={{gridColumn: '1/12'}}
        >
          {TextImgSectionRight.subtitle}
        </h3>
        <div className="col-start-1 col-end-12 row-start-4 lg:col-start-7 lg:col-end-12 lg:row-start-3 text-[#33483e] text-[16px] sm:text-base md:text-lg lg:text-[16px] item-description">
          <PortableText value={TextImgSectionRight.body} />
        </div>
        <div className="col-start-2 col-end-11 row-start-3 lg:col-start-2 lg:col-end-7 lg:row-start-3">
          {TextImgSectionRight.image && (
            <div className="text-img-right-wrapper">
              <Image
                width={1200}
                height={800}
                src={urlFor(TextImgSectionRight.image).width(1200).url()}
                alt={TextImgSectionRight.title || 'Right section image'}
                className="text-img-right"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
