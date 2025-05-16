'use client'

import {useEffect} from 'react'
import Marquee from 'react-fast-marquee'
import Image from 'next/image'
import '../styles/marquee.css'

const IMAGES = [
  '/assets/cocktail1.png',
  '/assets/cocktail2.png',
  '/assets/cocktail3.png',
  '/assets/cocktail4.png',
]
// Sample words for the marquee
const WORDS = ['SAMBA', 'COCKTAIL', 'MIXOLOGY', 'PARTY']

export default function MarqueeComponent() {
  // Install the Marquee package if it's being used in a project
  useEffect(() => {
    console.log('Marquee component mounted. Make sure to install react-fast-marquee:')
    console.log('npm install react-fast-marquee')
    // or
    console.log('yarn add react-fast-marquee')
  }, [])

  return (
    <div className="marquee-wrapper">
      <Marquee
        speed={200}
        gradient={false}
        direction="left"
        pauseOnHover={false}
        pauseOnClick={false}
        className="custom-marquee"
      >
        {/* Repeat the pattern of word then image */}
        {WORDS.map((word, index) => (
          <div key={index} className="marquee-item-container">
            <div className="marquee-word">{word}</div>
            <div className="marquee-image">
              <Image
                src={IMAGES[index % IMAGES.length]}
                alt={`Marquee image ${index}`}
                width={300}
                height={300}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
