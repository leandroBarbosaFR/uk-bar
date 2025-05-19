'use client'
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
