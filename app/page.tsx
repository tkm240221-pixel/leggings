import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Intro } from "@/components/intro"
import { Courses } from "@/components/courses"
import { Guide } from "@/components/guide"
import { FAQ } from "@/components/faq"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { LocationBanner } from "@/components/location-banner"
import { BenefitsBanner } from "@/components/benefits-banner"

export default function Home() {
  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <LocationBanner />
      <Header />
      <Hero />
      <BenefitsBanner />
      <Intro />
      <Courses />
      <Guide />
      <FAQ />
      <BlogSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
