import { FAQSection } from "@/components/landing/faq-section"
import { KeyStats } from "@/components/landing/key-stats"
import { LandingHero } from "@/components/landing/landing-hero"
import { MapPreview } from "@/components/landing/map-preview"
import { Partners } from "@/components/landing/partners"
import { SectorHighlight } from "@/components/landing/sector-highlight"
import { aggregateByKabKota } from "@/features/dashboard/lib/data-aggregator"
import { loadDashboardData } from "@/features/dashboard/lib/data-loader"

export default async function LandingPage() {
  const { rawData, meta } = await loadDashboardData();
  const latestYear = Math.max(...meta.tahun);
  const aggregatedData = aggregateByKabKota(rawData, latestYear);

  const mapData = aggregatedData.map(d => ({
    kabKota: d.kabKota,
    count: d.totalUmkm
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <Partners />
      <KeyStats />
      <SectorHighlight />
      <MapPreview data={mapData} />
      <FAQSection />
    </div>
  )
}

