// components/WhyUsSection.tsx
'use client'

import Image from 'next/image'

const features = [
  {
    title: 'Expert Mixologists',
    description:
      'Our skilled bartenders are cocktail artists. Expect classic favourites and bold tropical infusions.',
    image: '/assets/cocktail6.jpg',
  },
  {
    title: 'Unique Brazilian Flair',
    description:
      'Inspired by Rio’s carnival spirit, we bring exotic flavours and unforgettable vibes.',
    image: '/assets/cocktail7.jpg',
  },
  {
    title: 'Mobile & Fully Equipped',
    description: 'From ballrooms to garden parties, our sleek bar setup is ready for any venue.',
    image: '/assets/cocktail8.jpg',
  },
  {
    title: 'Bespoke Packages',
    description:
      'Tailored experiences – tiki, prosecco, or elegant cocktails. Your event, your way.',
    image: '/assets/cocktail9.jpg',
  },
  {
    title: 'Professional & Reliable',
    description:
      'On time, well-organized, and service-focused. We make your event seamless and stress-free.',
    image: '/assets/cocktail10.jpg',
  },
]

export default function WhyUsSection() {
  return (
    <section className="w-full  py-30 bg-[#33483e] " id="whyUs">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#FAFAFA]">Why Us</h2>
      <p
        className="text-1xl font-bold text-center w-1/2 mb-12 text-[#FAFAFA]"
        style={{margin: '0 auto 40px auto'}}
      >
        At Samba Bar Events, we don’t just serve cocktails – we deliver unforgettable experiences.
        Whether you're planning a wedding, corporate event, private party, or festival, our mobile
        cocktail bar brings style, sophistication, and vibrant Brazilian energy directly to your
        home or venue.
      </p>
      <div className="flex w-full h-[600px] gap-x-4 px-4">
        {features.map((item, index) => (
          <div key={index} className="relative w-1/5 h-full overflow-hidden group">
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Title Bar at Bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-[#33483e] text-white text-center py-4 transition-all duration-500 group-hover:translate-y-full">
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#33483e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-center p-6">
              <div className="text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
