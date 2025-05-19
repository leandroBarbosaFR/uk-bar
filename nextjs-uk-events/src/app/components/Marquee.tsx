'use client'
import {useEffect, useState} from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import {client} from '@/sanity/client'
import '../styles/marquee.css'

const MARQUEE_QUERY = `*[_type == "marqueeSection"][0] {
  words[],
  images[]{
    asset->{
      url
    }
  }
}`

interface MarqueeData {
  words: string[]
  images: {
    asset: {
      url: string
    }
  }[]
}

export default function MarqueeComponent() {
  const [words, setWords] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: MarqueeData = await client.fetch(MARQUEE_QUERY)
        setWords(data.words || [])
        setImages(data.images.map((img) => img.asset.url))
      } catch (error) {
        console.error('Failed to fetch marquee data:', error)
      }
    }

    fetchData()
  }, [])

  if (words.length === 0 || images.length === 0) return null

  return (
    <section className="marquee-wrapper">
      <Marquee
        speed={200}
        gradient={false}
        direction="left"
        pauseOnHover={false}
        pauseOnClick={false}
        className="custom-marquee"
      >
        {words.map((word, index) => (
          <div key={index} className="marquee-item-container">
            <div className="marquee-word">{word}</div>
            <div className="marquee-image">
              <Image
                src={images[index % images.length]}
                alt={`Marquee image ${index}`}
                width={300}
                height={300}
                className="img"
              />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  )
}
