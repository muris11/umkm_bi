import type { DashboardViewModelExtended } from '../types/dashboard-view-model-extended';
import type { UmkmRawDataRow } from '../types/umkm-raw-data';
import {
    aggregateByKabKota,
    aggregateByKecamatan,
    aggregateBySektor
} from './data-aggregator';
import { generateExtendedInsights } from './extended-insight-engine';
import { calculatePriorityScore } from './priority-scorer';
import { generateMLAnalysis, generateBIDashboardData, generateDataDrivenDecision } from './ml-bi-data-generator';

interface BuildOptions {
  tahun?: number;
  kabKota?: string;
  sektor?: string;
}

export function buildExtendedViewModel(
  rawData: UmkmRawDataRow[],
  meta: DashboardViewModelExtended['meta'],
  options: BuildOptions = {}
): DashboardViewModelExtended {
  const { tahun, kabKota, sektor } = options;
  
  // Apply filters
  let filtered = rawData;
  if (tahun) filtered = filtered.filter(d => d.tahun === tahun);
  if (kabKota) filtered = filtered.filter(d => d.kabKota === kabKota);
  if (sektor) filtered = filtered.filter(d => d.sektorUtama === sektor);
  
  // Calculate KPI summary
  const kpiSummary = calculateKpiSummary(filtered);
  
  // Aggregate data
  const byKabKota = aggregateByKabKota(filtered, tahun);
  const bySektor = aggregateBySektor(filtered, tahun);
  const allKecamatan = aggregateByKecamatan(filtered, tahun);
  
  // Score and rank kecamatan
  const scoredKecamatan = allKecamatan
    .map(k => ({ ...k, priorityScore: calculatePriorityScore(k) }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
  
  const topKecamatan = scoredKecamatan.slice(0, 10);
  
  // Calculate year-over-year if we have both years
  const yoyComparison = calculateYoYComparison(rawData); // Use rawData (unfiltered by year) for YoY
  
  // Generate insights
  const insights = generateExtendedInsights({
    kpiSummary,
    byKabKota,
    bySektor,
    topKecamatan: scoredKecamatan,
    yoyComparison,
  });
  
  const hasHistoricalData = meta.tahun.length >= 2;
  const mlAnalysis = generateMLAnalysis(hasHistoricalData, meta.jumlahBaris);
  
  const topSektorName = bySektor.sort((a, b) => b.totalUmkm - a.totalUmkm)[0]?.sektor || 'Kuliner';
  const biDashboard = generateBIDashboardData(
    kpiSummary.totalUmkm,
    kpiSummary.totalTenagaKerja,
    kpiSummary.avgPersenDigital,
    meta.kabKotaCount,
    topSektorName
  );
  
  const dataDrivenDecision = generateDataDrivenDecision(
    topKecamatan,
    bySektor,
    kpiSummary.avgPersenDigital
  );
  
  return {
    meta,
    filters: {
      selectedTahun: tahun || (meta.tahun.length > 0 ? meta.tahun[meta.tahun.length - 1] : 2025),
      selectedKabKota: kabKota || null,
      selectedSektor: sektor as any || null,
    },
    kpiSummary,
    byKabKota,
    bySektor,
    topKecamatan,
    yoyComparison,
    insights,
    scoredAlternatives: [],
    decision: {
      pilihanUtama: topKecamatan.length > 0 ? `Program Pemberdayaan ${topKecamatan[0].sektorDominan} di ${topKecamatan[0].kecamatan}` : 'Belum adaa data',
      alasan: topKecamatan.length > 0 
        ? `Kecamatan ${topKecamatan[0].kecamatan} memiliki skor prioritas tertinggi (${topKecamatan[0].priorityScore}) dengan dominasi sektor ${topKecamatan[0].sektorDominan} dan tingkat kebutuhan intervensi tinggi.`
        : 'Data tidak cukup untuk mengambil keputusan.',
      wilayahFokus: topKecamatan.map(k => k.kecamatan),
    },
    filteredData: filtered,
    mlAnalysis,
    biDashboard,
    dataDrivenDecision,
  };
}

function calculateKpiSummary(data: UmkmRawDataRow[]) {
  const count = data.length;
  if (count === 0) return {
    totalUmkm: 0,
    totalTenagaKerja: 0,
    avgPersenFormal: 0,
    avgPersenDigital: 0,
    avgPersenAksesPembiayaan: 0,
    totalOmzetMiliar: 0,
    avgOmzetBulananJuta: 0,
  };
  
  return {
    totalUmkm: sum(data, d => d.jumlahUmkm),
    totalTenagaKerja: sum(data, d => d.tenagaKerjaUmkm),
    avgPersenFormal: avg(data, d => d.persenUmkmFormal),
    avgPersenDigital: avg(data, d => d.persenUmkmDigital),
    avgPersenAksesPembiayaan: avg(data, d => d.persenAksesPembiayaan),
    totalOmzetMiliar: sum(data, d => d.omzetTahunanMiliar),
    avgOmzetBulananJuta: avg(data, d => d.rataOmzetBulananJuta),
  };
}

function calculateYoYComparison(data: UmkmRawDataRow[]) {
  const years = [...new Set(data.map(d => d.tahun))].sort();
  if (years.length < 2) return null;
  
  const [prevYear, currYear] = years.slice(-2);
  const prevData = data.filter(d => d.tahun === prevYear);
  const currData = data.filter(d => d.tahun === currYear);
  
  const prev = calculateKpiSummary(prevData);
  const curr = calculateKpiSummary(currData);
  
  const growth = (currVal: number, prevVal: number) => 
    prevVal === 0 ? 0 : ((currVal - prevVal) / prevVal) * 100;
  
  return {
    umkmGrowth: growth(curr.totalUmkm, prev.totalUmkm),
    formalGrowth: growth(curr.avgPersenFormal, prev.avgPersenFormal),
    digitalGrowth: growth(curr.avgPersenDigital, prev.avgPersenDigital),
    omzetGrowth: growth(curr.totalOmzetMiliar, prev.totalOmzetMiliar),
  };
}

// Helpers local to this file to avoid circular imports or small utilities
function sum<T>(arr: T[], fn: (item: T) => number): number {
  return arr.reduce((acc, item) => acc + fn(item), 0);
}

function avg<T>(arr: T[], fn: (item: T) => number): number {
  if (arr.length === 0) return 0;
  return sum(arr, fn) / arr.length;
}
