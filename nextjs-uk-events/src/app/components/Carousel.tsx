'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import '../styles/carousel.css'
import {client} from '@/sanity/client'

const CAROUSEL_QUERY = `*[_type == "carouselSection"] {
  _id,
  _type,
  title,
  features[] {
    title,
    description,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      hotspot,
      crop
    }
  }
}[0]` // Added [0] to get the first carousel section

type CarouselFeature = {
  _id?: string
  title: string
  description: string
  image: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
        lqip?: string
      }
    }
    hotspot?: Hotspot
    crop?: Crop
  }
}

type CarouselSection = {
  _id: string
  _type: string
  title: string
  features: CarouselFeature[]
}

type Hotspot = {
  x: number
  y: number
  height: number
  width: number
}

type Crop = {
  top: number
  bottom: number
  left: number
  right: number
}

export default function CurvedCardGallery() {
  const [carouselData, setCarouselData] = useState<CarouselSection | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const data = await client.fetch(CAROUSEL_QUERY)
        setCarouselData(data)
      } catch (error) {
        console.error('Error fetching carousel data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarouselData()
  }, [])

  if (loading) {
    return (
      <section className="bg-[#f1f0e7] carousel-section">
        <div className="title-wraper-gallery">
          <div className="flex justify-center svg-title-wrap"></div>
        </div>
        <div className="curved-wrapper bg-[#33483e] relative text-white">
          {/* <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Loading...</h2> */}
        </div>
      </section>
    )
  }

  if (!carouselData) {
    return (
      <section className="bg-[#f1f0e7] carousel-section">
        <div className="title-wraper-gallery">
          <div className="flex justify-center svg-title-wrap"></div>
        </div>
        <div className="curved-wrapper bg-[#33483e] relative text-white">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            No carousel data found
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#f1f0e7] carousel-section">
      <div className="title-wraper-gallery">
        <div className="flex justify-center svg-title-wrap"></div>
      </div>
      <div className="curved-wrapper bg-[#33483e] relative text-white">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{carouselData.title}</h2>

        {/* Cards row */}
        <div className="flex flex-wrap cards-container justify-center gap-6 relative">
          {carouselData.features?.map((feature: CarouselFeature, index: number) => (
            <div
              key={feature._id || index}
              className="relative group w-full sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[600px] overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden">
                <Image
                  src={feature.image?.asset?.url || '/placeholder-image.jpg'}
                  alt={feature.title || 'Feature image'}
                  fill
                  sizes="100vw"
                  className="feature-image"
                  priority={index === 0}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#33483e] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm mt-1">{feature.description}</p>
                </div>
              </div>

              {/* Title under image (hidden on hover) */}
              <div className="bg-[#33483e] p-4 text-center group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
