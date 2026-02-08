import { FAQSection } from "@/components/landing/faq-section"
import { KeyStats } from "@/components/landing/key-stats"
import { LandingHero } from "@/components/landing/landing-hero"
import { MapPreview } from "@/components/landing/map-preview"
import { Partners } from "@/components/landing/partners"
import { SectorHighlight } from "@/components/landing/sector-highlight"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <Partners />
      <KeyStats />
      <SectorHighlight />
      <MapPreview />
      <FAQSection />
    </div>
  )
}

