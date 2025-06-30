'use client'
import React, {useEffect, useState} from 'react'
// import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/mobileBarHirePackages.css'
import PortableTextRenderer from './PortableTextRenderer'

const MOBILE_BAR_HIRE_PACKAGES_QUERY = `*[_type == "mobileBarHirePackages"][0]{
  title,
  subtitle,
  body,
  image{
    asset->{
      _id,
      url
    },
    alt
  }
}`

type MobileBarHirePackagesData = {
  title?: string
  subtitle?: string
  body: string | PortableTextBlock[]
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export default function MobileBarHirePackages() {
  const [data, setData] = useState<MobileBarHirePackagesData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const result = await client.fetch(MOBILE_BAR_HIRE_PACKAGES_QUERY)
      setData(result)
    }
    fetchData()
  }, [])

  if (!data) return null

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-grow bg-[#f1f0e7] main-contact-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-[#33483e]">
              {data.title || 'Cocktail Bar Hire'}
            </h1>
            {data.subtitle && (
              <h2 className="text-xl font-semibold text-gray-700 mb-4">{data.subtitle}</h2>
            )}
            {data.body && typeof data.body !== 'string' ? (
              <PortableTextRenderer value={data.body} />
            ) : (
              <p>{data.body}</p>
            )}
            {data.image?.asset?.url && (
              <div className="mobile-bar-image-wrapper">
                <Image
                  src={urlFor(data.image).width(1600).height(900).quality(75).format('webp').url()}
                  alt={data.image?.alt || data.title || 'Mobile bar hire image'}
                  width={1600}
                  height={900}
                  className="mobile-bar-img"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
