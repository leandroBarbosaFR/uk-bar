import HeroSection from '../app/components/HeroSection'
import Header from '../app/components/Header'
import AboutSection from '../app/components/AboutSection'
import Footer from '../app/components/Footer'

export default async function IndexPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
