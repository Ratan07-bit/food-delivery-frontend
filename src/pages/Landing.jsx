import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { StatsSection } from '@/components/stats-section'
import { AppSection } from '@/components/app-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CuisinesSection } from '@/components/cuisines-section'
import { Footer } from '@/components/footer'
import './Landing.css'

export default function Landing() {
  return (
    <main className="light bg-background text-foreground font-sans min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CuisinesSection />
      <StatsSection />
      <TestimonialsSection />
      <AppSection />
      <Footer />
    </main>
  )
}
