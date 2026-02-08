import { FAQSection } from "@/components/landing/faq-section"
import { KeyStats } from "@/components/landing/key-stats"
import { LandingHero } from "@/components/landing/landing-hero"
import { MapPreview } from "@/components/landing/map-preview"
import { Partners } from "@/components/landing/partners"
import { SectorHighlight } from "@/components/landing/sector-highlight"
import { aggregateByKabKota, aggregateBySektor } from "@/features/dashboard/lib/data-aggregator"
import { loadDashboardData } from "@/features/dashboard/lib/data-loader"

export default async function LandingPage() {
  const { rawData, meta } = await loadDashboardData();
  const latestYear = Math.max(...meta.tahun);
  
  // Filter data for latest year
  const latestYearData = rawData.filter(d => d.tahun === latestYear);
  
  // Calculate KPI summary
  const totalUmkm = latestYearData.reduce((acc, d) => acc + d.jumlahUmkm, 0);
  const totalTenagaKerja = latestYearData.reduce((acc, d) => acc + d.tenagaKerjaUmkm, 0);
  const avgPersenDigital = latestYearData.reduce((acc, d) => acc + d.persenUmkmDigital, 0) / latestYearData.length;
  
  // Calculate YoY if we have 2 years
  const years = [...new Set(rawData.map(d => d.tahun))].sort();
  let yoyGrowth;
  if (years.length >= 2) {
    const [prevYear] = years.slice(-2);
    const prevYearData = rawData.filter(d => d.tahun === prevYear);
    const prevTotalUmkm = prevYearData.reduce((acc, d) => acc + d.jumlahUmkm, 0);
    const prevAvgDigital = prevYearData.reduce((acc, d) => acc + d.persenUmkmDigital, 0) / prevYearData.length;
    yoyGrowth = {
      umkmGrowth: prevTotalUmkm > 0 ? ((totalUmkm - prevTotalUmkm) / prevTotalUmkm) * 100 : 0,
      digitalGrowth: prevAvgDigital > 0 ? ((avgPersenDigital - prevAvgDigital) / prevAvgDigital) * 100 : 0,
    };
  }

  // Aggregate by KabKota for map
  const aggregatedKabKota = aggregateByKabKota(rawData, latestYear);
  const mapData = aggregatedKabKota.map(d => ({
    kabKota: d.kabKota,
    count: d.totalUmkm
  }));

  // Aggregate by Sektor
  const aggregatedSektor = aggregateBySektor(rawData, latestYear);
  const sectorData = aggregatedSektor.map(d => ({
    sektor: d.sektor,
    totalUmkm: d.totalUmkm
  }));

  // Count unique wilayah and sektor
  const totalWilayah = new Set(latestYearData.map(d => d.kabKota)).size;
  const totalSektor = new Set(latestYearData.map(d => d.sektorUtama)).size;

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero 
        totalUmkm={totalUmkm}
        totalTenagaKerja={totalTenagaKerja}
        avgPersenDigital={avgPersenDigital}
        totalWilayah={totalWilayah}
        totalSektor={totalSektor}
      />
      <Partners />
      <KeyStats 
        totalUmkm={totalUmkm}
        totalTenagaKerja={totalTenagaKerja}
        avgPersenDigital={avgPersenDigital}
        totalWilayah={totalWilayah}
        yoyGrowth={yoyGrowth}
      />
      <SectorHighlight sectors={sectorData} />
      <MapPreview data={mapData} />
      <FAQSection />
    </div>
  )
}
