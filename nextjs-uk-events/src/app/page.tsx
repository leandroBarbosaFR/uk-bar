import HeroSection from '../app/components/HeroSection'
import Header from '../app/components/Header'
import AboutSection from '../app/components/AboutSection'
import Footer from '../app/components/Footer'
import Marquee from '../app/components/Marquee'
import WhyUsSection from '../app/components/WhyUsSection'
import TextMarqueeSection from '../app/components/TextMarqueeSection'
// import EmbedSection from '../app/components/EmbedSection'
import TextImgSectionLeft from '../app/components/TextImgSectionLeft'
import TextImgSectionRight from '../app/components/TextImgSectionRight'

export default async function IndexPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <WhyUsSection />
      <TextMarqueeSection />
      {/* <EmbedSection /> */}
      <TextImgSectionRight />
      <TextImgSectionLeft />
      <Footer />
    </main>
  )
}
