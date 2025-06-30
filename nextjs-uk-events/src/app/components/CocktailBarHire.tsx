'use client'
import React, {useEffect, useState} from 'react'
// import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import Image from 'next/image'
import {urlFor} from '../../lib/sanityImage'
import '../styles/cocktailBarHire.css'
import PortableTextRenderer from '../components/PortableTextRenderer'

const COCKTAIL_BAR_HIRE_QUERY = `*[_type == "cocktailBarHire"][0]{
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

type CocktailBarHireData = {
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

export default function CocktailBarHire() {
  const [data, setData] = useState<CocktailBarHireData | null>(null)

  useEffect(() => {
    async function fetchData() {
      const result = await client.fetch(COCKTAIL_BAR_HIRE_QUERY)
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
              <div className="image-wrapper-cocktail">
                <Image
                  width={1200}
                  height={800}
                  src={urlFor(data.image).width(1200).url()}
                  alt={data.image?.alt || 'Cocktail bar image'}
                  className="cocktail-hero-image"
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
