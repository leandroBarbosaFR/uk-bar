import HeroSection from '../components/HeroSection'
// import Header from '../app/components/Header'
import AboutSection from '../components/AboutSection'
// import Footer from '../app/components/Footer'
import Marquee from '../components/Marquee'
import WhyUsSection from '../components/WhyUsSection'
import TextMarqueeSection from '../components/TextMarqueeSection'
import EmbedSection from '../components/EmbedSection'
import TextImgSectionLeft from '../components/TextImgSectionLeft'
import TextImgSectionRight from '../components/TextImgSectionRight'
import Carousel from '../components/Carousel'
export const dynamic = 'force-dynamic'

export default async function IndexPage() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <HeroSection />
      <Marquee />
      <AboutSection />
      <WhyUsSection />
      <TextMarqueeSection />
      <TextImgSectionRight />
      <TextImgSectionLeft />
      <Carousel />
      <EmbedSection />
      {/* <Footer /> */}
    </main>
  )
}
