'use client'

import React, {useEffect, useState, useRef} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger'
import '../styles/heroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const HERO_QUERY = `*[_type == "hero"][0]{ _id, title, subtitle, image, body }`

export default function HeroSection() {
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

  const [hero, setHero] = useState<HeroData | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch data client-side
    async function fetchHero() {
      const data = await client.fetch(HERO_QUERY)
      setHero(data)
    }
    fetchHero()
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    if (!hero) return

    const title = containerRef.current.querySelector('.hero-title')
    const subtitle = containerRef.current.querySelector('.hero-subtitle')
    const body = containerRef.current.querySelector('.hero-body')

    const ctx = gsap.context(() => {
      gsap.to([title, subtitle, body], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        ease: 'none',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [hero])

  if (!hero) return null // or loading spinner

  return (
    <section ref={containerRef} className="relative h-screen">
      {/* Background Image */}
      {hero.image && (
        <Image
          src={urlFor(hero.image).width(7172).url()}
          alt="Hero image"
          fill
          style={{objectFit: 'cover'}}
          quality={100}
          priority
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <div className="justify-items-center hero-section-container absolute z-20">
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
