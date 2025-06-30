'use client'

import React, {useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'
import '../styles/heroSection.css'

const HERO_QUERY = `*[_type == "hero"][0]{ _id, title, subtitle, image, body }`

interface HeroData {
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

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hero, setHero] = useState<HeroData | null>(null)

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.1},
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Fetch only if visible
  useEffect(() => {
    if (isVisible && !hero) {
      client.fetch(HERO_QUERY).then((data) => setHero(data))
    }
  }, [isVisible, hero])

  return (
    <section ref={containerRef} className="relative min-h-[100vh] aspect-[16/9]">
      {!hero ? (
        <div className="min-h-[100vh] flex items-center justify-center bg-[#f1f0e7]">
          <p className="text-[#33483e] text-lg animate-pulse">Chargement en cours…</p>
        </div>
      ) : (
        <>
          {/* Background Image */}
          {hero.image && (
            <Image
              src={urlFor(hero.image).width(1600).quality(75).format('webp').url()}
              alt={hero.title ? `Background image for ${hero.title}` : 'Hero background'}
              fill
              className="hero-bg-img"
              priority
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="justify-items-center hero-section-container absolute top-1/2 left-1/2">
            <h1 className="hero-title">{hero.title}</h1>
            <div className="hero-subtitle">
              <h3>{hero.subtitle}</h3>
            </div>
            <div className="hero-body">
              <PortableText value={hero.body} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}
