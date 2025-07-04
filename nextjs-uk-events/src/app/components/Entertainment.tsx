'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'

import '../styles/entertainment.css'

const ENTERTAINMENT_QUERY = `*[_type == "entertainmentPage"][0]{ _id, title, subtitle, image, body }`

export default function Entertainment() {
  interface EntertainmentData {
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
  const [Entertainment, setEntertainment] = useState<EntertainmentData | null>(null)

  useEffect(() => {
    // Fetch data client-side
    async function fetchEntertainment() {
      const data = await client.fetch(ENTERTAINMENT_QUERY)
      setEntertainment(data)
    }
    fetchEntertainment()
  }, [])

  if (!Entertainment) return null // or show a loader, placeholder, etc.

  return (
    <section className="right-image-section-entertainment">
      <div className="gap-8 grid grid-cols-12 px-4">
        <h1
          className=" row-start-1 text-4xl sm:text-7xl text-center text-[#33483e] md:text-5xl lg:text-[130px] font-bold "
          style={{gridColumn: '1/13'}}
        >
          {Entertainment.title}
        </h1>
        <h3
          className="col-span-12 text-[#33483e] font-bold text-center row-start-2 text-1xl sm:text-4xl md:text-4xl lg:text-[30px] whitespace-normal sm:whitespace-nowrap"
          style={{gridColumn: '1/12'}}
        >
          {Entertainment.subtitle}
        </h3>
        <div className="col-start-1 col-end-12 row-start-4 lg:col-start-7 lg:col-end-12 lg:row-start-3 text-[#33483e] text-lg sm:text-lg md:text-base lg:text-[16px] item-description">
          <PortableText value={Entertainment.body} />
        </div>
        <div className="col-start-2 col-end-11 row-start-3 lg:col-start-2 lg:col-end-7 lg:row-start-3">
          {Entertainment.image && (
            <div className="image-wrapper-entertainment">
              <Image
                width={1200}
                height={800}
                src={urlFor(Entertainment.image).width(1200).url()}
                alt="Entertainment image"
                className="entertainment-hero-image"
                quality={100}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
