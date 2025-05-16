import HeroSection from '../app/components/HeroSection'
import Header from '../app/components/Header'
import AboutSection from '../app/components/AboutSection'
import Footer from '../app/components/Footer'
import Marquee from '../app/components/Marquee'
import WhyUsSection from '../app/components/WhyUsSection'

export default async function IndexPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Marquee />
      <AboutSection />
      <WhyUsSection />
      <Footer />
    </main>
  )
}
