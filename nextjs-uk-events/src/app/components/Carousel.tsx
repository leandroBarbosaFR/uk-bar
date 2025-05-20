'use client'

import Image from 'next/image'
import '../styles/carousel.css'
import LogoSvg from '../components/LogoSvgBarPackages'

const images = [
  {
    src: '/assets/cocktail11.jpg',
    alt: 'Image 1',
    title: 'Dry Hire Package',
    description:
      'Want to supply your own alcohol and ingredients but still get a professional cocktail experience? Our Dry Hire Package is the perfect solution.',
  },
  {
    src: '/assets/cocktail7.jpg',
    alt: 'Image 2',
    title: 'All-Inclusive Package',
    description:
      'Want a fully stress-free cocktail experience? Our All-Inclusive Package is the most popular choice — perfect for those who want everything taken care of, from start to finish.',
  },
  {
    src: '/assets/cocktail9.jpg',
    alt: 'Image 3',
    title: 'Bartenders & Shopping List',
    description:
      'Already got your own bar setup and ingredients? No problem — let us bring the expertise!',
  },
]

export default function CurvedCardGallery() {
  return (
    <section className="bg-[transparent] carousel-section">
      <div className="title-wraper-gallery">
        <div className="flex justify-center svg-title-wrap">
          <LogoSvg />
        </div>
      </div>
      <div className="curved-wrapper bg-[#33483e] relative text-white">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Signature Cocktails</h2>

        {/* Cards row */}
        <div className="flex flex-wrap cards-container justify-center gap-6 relative z-10">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group w-full sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[600px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#33483e] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold">{img.title}</h3>
                <p className="text-sm mt-1">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
