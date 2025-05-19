'use client'

import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Embed from '../../../public/assets/cocktail7.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function EmbedSection() {
  return (
    <section
      className="h-[100vh] bg-[#33483e0] flex items-center justify-center overflow-hidden relative isolate"
      id="embed-section"
    >
      <div className="w-[500px] h-[500px]">
        <Image src={Embed} alt="Scroll Zoom Image" sizes="1000px" style={{objectFit: 'cover'}} />
      </div>
    </section>
  )
}
