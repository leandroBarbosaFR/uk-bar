'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'
import '../styles/about.css'

const ABOUT_QUERY = `*[_type == "aboutUsPage"][0]{ _id, title, subtitle, image, body }`

export default function About() {
  interface AboutData {
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

  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    async function fetchAbout() {
      const data = await client.fetch(ABOUT_QUERY)
      setAboutData(data)
    }
    fetchAbout()
  }, [])

  if (!aboutData) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-[#f1f0e7]">
        <p className="text-[#33483e] text-lg animate-pulse">Chargement...</p>
      </section>
    )
  }

  return (
    <section className="right-image-section-about min-h-screen">
      <div className="gap-8 grid grid-cols-12 px-4">
        <h1 className="row-start-1 col-span-12 text-4xl sm:text-7xl text-center text-[#33483e] font-bold">
          {aboutData.title}
        </h1>
        <h3 className="col-span-12 text-[#33483e] font-bold text-center text-xl sm:text-4xl">
          {aboutData.subtitle}
        </h3>
        <div className="col-span-12 lg:col-start-7 lg:col-end-13 text-[#33483e] text-lg item-description">
          <PortableText value={aboutData.body} />
        </div>
        <div className="col-span-12 lg:col-span-5">
          {aboutData.image && (
            <div className="about-image-wrapper">
              <Image
                src={urlFor(aboutData.image).width(800).url()}
                alt={`À propos – ${aboutData.title}`}
                width={800}
                height={533}
                className="responsive-img"
                priority={true}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
