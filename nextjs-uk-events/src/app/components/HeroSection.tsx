'use client'

import React, {useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import gsap from 'gsap'
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
  const [hero, setHero] = useState<HeroData | null>(null)

  useEffect(() => {
    client.fetch(HERO_QUERY).then((data) => {
      setHero(data)
    })
  }, [])

  useEffect(() => {
    if (!hero) return

    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    })
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 0.4,
      ease: 'power3.out',
    })
    gsap.from('.hero-body', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.6,
      ease: 'power3.out',
    })
  }, [hero])

  if (!hero) {
    return (
      <section className="min-h-screen bg-[transparent] flex items-center justify-center">
        <div className="flex gap-1 text-2xl font-semibold text-neutral-700">
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative min-h-[100vh]">
      {hero.image && (
        <Image
          src={urlFor(hero.image).width(1200).url()}
          alt={`Hero image for ${hero.title}`}
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="hero-section-container">
        <h1 className="hero-title">{hero.title}</h1>
        <div className="hero-subtitle">
          <h3>{hero.subtitle}</h3>
        </div>
        <div className="hero-body">
          <PortableText value={hero.body} />
        </div>
      </div>
    </section>
  )
}
