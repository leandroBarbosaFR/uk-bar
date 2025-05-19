'use client'

import {useEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {client} from '@/sanity/client'
import {urlFor} from '../../lib/sanityImage'
import '../styles/AboutSection.css'
import {type SanityDocument} from 'next-sanity'
import gsap from 'gsap'

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  subtitle,
  body,
  leftImage,
  rightImage,
  middleImage,
  titleImages,
  bodyImages
}`

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const [about, setAbout] = useState<SanityDocument | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Fetch content first
          client.fetch(ABOUT_QUERY).then((data) => {
            setAbout(data)
            // Allow content to render first
            setTimeout(() => {
              const tl = gsap.timeline()
              tl.from(subtitleRef.current, {
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: 'power2.out',
              })
                .from(
                  titleRef.current,
                  {
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    ease: 'power2.out',
                  },
                  '-=0.8',
                )
                .from(
                  bodyRef.current,
                  {
                    opacity: 0,
                    y: 30,
                    duration: 1.1,
                    ease: 'power2.out',
                  },
                  '-=0.8',
                )
                .from(
                  imageRefs.current,
                  {
                    opacity: 0,
                    y: 50,
                    duration: 1.3,
                    ease: 'power2.out',
                    stagger: 0.3,
                  },
                  '-=0.8',
                )
            }, 50) // short delay after render
          })
        }
      },
      {threshold: 0.3},
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="AboutUs" ref={sectionRef} className="aboutPageSection">
      {about && (
        <div className="container px-0 md:px-8">
          <div className="aboutPageGrid grid grid-cols-12 gap-6">
            <div className="aboutPageSubtitle">
              <h3 ref={subtitleRef}>{about.subtitle}</h3>
            </div>
            <div className="aboutPageTitle">
              <h1 ref={titleRef}>{about.title}</h1>
            </div>
            <div className="aboutPageBody col-span-12" ref={bodyRef}>
              <PortableText value={about.body} />
            </div>
            <div
              className="aboutPageImage col-span-12 md:col-span-6"
              ref={(el) => {
                imageRefs.current[0] = el
              }}
            >
              {about.leftImage && (
                <Image
                  src={urlFor(about.leftImage).width(1200).url()}
                  alt="Left image"
                  layout="responsive"
                  width={1200}
                  height={600}
                />
              )}
            </div>
            <div className="grid col-span-12 md:col-span-6 gap-6 mt-12">
              <div
                className="col-span-12 md:col-span-7"
                ref={(el) => {
                  imageRefs.current[1] = el
                }}
              >
                {about.middleImage && (
                  <Image
                    src={urlFor(about.middleImage).width(1200).url()}
                    alt="Middle image"
                    layout="responsive"
                    width={1200}
                    height={600}
                  />
                )}
              </div>
              <div
                className="col-span-12 md:col-span-5"
                ref={(el) => {
                  imageRefs.current[2] = el
                }}
              >
                {about.rightImage && (
                  <Image
                    src={urlFor(about.rightImage).width(1200).url()}
                    alt="Right image"
                    layout="responsive"
                    width={1200}
                    height={600}
                  />
                )}
              </div>
              <h1 className="col-span-12 text-2xl font-bold title-images">{about.titleImages}</h1>
              <div className="col-span-12 body-images">
                <PortableText value={about.bodyImages} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
