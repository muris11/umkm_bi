import type { DashboardViewModelExtended } from '../types/dashboard-view-model-extended';
import type { AggregatedKabKota, AggregatedKecamatan, AggregatedSektor } from './data-aggregator';

interface InsightInput {
  kpiSummary: DashboardViewModelExtended['kpiSummary'];
  byKabKota: AggregatedKabKota[];
  bySektor: AggregatedSektor[];
  topKecamatan: (AggregatedKecamatan & { priorityScore: number })[];
  yoyComparison: DashboardViewModelExtended['yoyComparison'];
}

export function generateExtendedInsights(data: InsightInput): string[] {
  const insights: string[] = [];
  const { kpiSummary, byKabKota, bySektor, topKecamatan, yoyComparison } = data;

  // 1. Overall Performance Insight
  if (yoyComparison) {
    const growth = yoyComparison.umkmGrowth;
    const direction = growth >= 0 ? 'meningkat' : 'menurun';
    insights.push(
      `Pertumbuhan UMKM di Jawa Barat ${direction} sebesar ${Math.abs(growth).toFixed(1)}% dibandingkan tahun sebelumnya.`
    );
  }

  // 2. Sector Dominance Insight
  if (bySektor.length > 0) {
    const topSektor = [...bySektor].sort((a, b) => b.totalUmkm - a.totalUmkm)[0];
    const percent = ((topSektor.totalUmkm / kpiSummary.totalUmkm) * 100).toFixed(1);
    insights.push(
      `Sektor ${topSektor.sektor} mendominasi ekonomi UMKM dengan kontribusi ${percent}% dari total unit usaha.`
    );
  }

  // 3. Digitalization/Formalization Gap
  if (kpiSummary.avgPersenDigital > kpiSummary.avgPersenFormal) {
    insights.push(
      `Adopsi digital (${kpiSummary.avgPersenDigital.toFixed(1)}%) lebih tinggi dari tingkat formalisasi (${kpiSummary.avgPersenFormal.toFixed(1)}%), mengindikasikan banyak usaha informal yang sudah go-digital.`
    );
  }

  // 4. Regional Disparity
  if (byKabKota.length > 0) {
    const sorted = [...byKabKota].sort((a, b) => b.avgUmkmPer1000 - a.avgUmkmPer1000);
    const top = sorted[0];
    const bottom = sorted[sorted.length - 1];
    insights.push(
      `Kepadatan UMKM tertinggi di ${top.kabKota} (${top.avgUmkmPer1000.toFixed(1)} unit/1000 penduduk), sementara terendah di ${bottom.kabKota}.`
    );
  }

  // 5. Priority Area
  if (topKecamatan.length > 0) {
    const top = topKecamatan[0];
    insights.push(
      `Wilayah prioritas intervensi utama adalah Kecamatan ${top.kecamatan} (${top.kabKota}) dengan skor prioritas ${top.priorityScore}.`
    );
  }

  return insights;
}
