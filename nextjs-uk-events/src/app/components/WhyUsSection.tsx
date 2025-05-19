'use client'
import {useEffect, useState} from 'react'
import {client} from '@/sanity/client'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {urlFor} from '../../lib/sanityImage'
import {TypedObject} from 'sanity'
// Styles
import '../styles/whyusSection.module.css'

const WHYUS_QUERY = `*[_type == "whyus"][0] {
  title,
  body,
  features[] {
    title,
    description,
    image {
      asset->{
        url
      }
    }
  }
}`

type RawFeature = {
  title: string
  description: string
  image: {
    asset: {
      url: string
    }
  }
}

type Feature = {
  title: string
  description: string
  image: string
}

export default function WhyUsSection() {
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionBody, setSectionBody] = useState<TypedObject[]>([])

  const [features, setFeatures] = useState<
    Array<{title: string; description: string; image: string}>
  >([])

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(WHYUS_QUERY)

      setSectionTitle(data.title || '')
      setSectionBody(data.body || '')
      const parsedFeatures: Feature[] = data.features.map((item: RawFeature) => ({
        title: item.title,
        description: item.description,
        image: item.image.asset.url,
      }))
      setFeatures(parsedFeatures)
    }

    fetchData()
  }, [])

  return (
    <section className="w-full py-30 bg-[#33483e]" id="whyUs">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#FAFAFA]">{sectionTitle}</h2>
      {sectionBody && (
        <div className="prose text-white text-center mx-auto w-1/3 mb-12  item-description">
          <PortableText value={sectionBody} />
        </div>
      )}
      <div className="flex flex-wrap w-full gap-4 px-4" style={{justifyContent: 'center'}}>
        {features.map((item, index) => (
          <div
            key={index}
            className="relative w-full sm:w-1/2 lg:w-1/6 h-[500px] sm:h-[500px] lg:h-[600px] overflow-hidden group"
          >
            <Image
              src={urlFor(item.image).width(7172).url()}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full bg-[#33483e] text-white text-center py-4 transition-all duration-500 group-hover:translate-y-full">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <div className="absolute inset-0 bg-[#33483e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-center p-6">
              <div className="text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm item-description">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
