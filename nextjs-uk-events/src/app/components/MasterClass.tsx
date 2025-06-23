'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'

import '../styles/masterClass.css'

const MASTERCLASS_QUERY = `*[_type == "masterclassPage"][0]{ _id, title, subtitle, image, body }`

export default function MasterClass() {
  interface MasterClassData {
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
  const [MasterClass, setMasterClass] = useState<MasterClassData | null>(null)

  useEffect(() => {
    // Fetch data client-side
    async function fetchMasterClass() {
      const data = await client.fetch(MASTERCLASS_QUERY)
      setMasterClass(data)
    }
    fetchMasterClass()
  }, [])

  if (!MasterClass) return null // or show a loader, placeholder, etc.

  return (
    <section className="right-image-section-masterclass">
      <div className="gap-8 grid grid-cols-12">
        <h1
          className=" row-start-1 text-4xl sm:text-7xl text-center text-[#33483e] md:text-5xl lg:text-[130px] font-bold "
          style={{gridColumn: '1/13'}}
        >
          {MasterClass.title}
        </h1>
        <h3
          className="col-span-12 text-[#33483e] font-bold text-center row-start-2 text-1xl sm:text-4xl md:text-4xl lg:text-[30px] whitespace-normal sm:whitespace-nowrap"
          style={{gridColumn: '1/12'}}
        >
          {MasterClass.subtitle}
        </h3>
        <div className="col-start-1 col-end-12 row-start-4 lg:col-start-7 lg:col-end-12 lg:row-start-3 text-[#33483e] text-1xl sm:text-4xl md:text-4xl lg:text-[16px] item-description">
          <PortableText value={MasterClass.body} />
        </div>
        <div className="col-start-2 col-end-11 row-start-3 lg:col-start-2 lg:col-end-7 lg:row-start-3">
          {MasterClass.image && (
            <Image
              width={7172}
              height={7172}
              src={urlFor(MasterClass.image).width(7172).url()}
              alt="Hero image"
              quality={100}
            />
          )}
        </div>
      </div>
    </section>
  )
}
