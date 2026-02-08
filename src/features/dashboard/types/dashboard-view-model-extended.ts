import type { AggregatedKabKota, AggregatedKecamatan, AggregatedSektor } from '../lib/data-aggregator';
import type { ScoredAlternative } from './alternative';
import type { SektorUmkm, UmkmRawDataRow } from './umkm-raw-data';

/**
 * Extended Dashboard View Model for full dataset
 */
export interface DashboardViewModelExtended {
  meta: {
    sumber: string;
    jumlahBaris: number;
    tahun: number[];
    kabKotaCount: number;
    kecamatanCount: number;
    sektorList: SektorUmkm[];
    catatanMetodologi: string[];
    generatedAt: string;
  };
  
  // Filter state
  filters: {
    selectedTahun: number;
    selectedKabKota: string | null;
    selectedSektor: SektorUmkm | null;
  };
  
  // Summary KPIs
  kpiSummary: {
    totalUmkm: number;
    totalTenagaKerja: number;
    avgPersenFormal: number;
    avgPersenDigital: number;
    avgPersenAksesPembiayaan: number;
    totalOmzetMiliar: number;
    avgOmzetBulananJuta: number;
  };
  
  // Aggregated data
  byKabKota: AggregatedKabKota[];
  bySektor: AggregatedSektor[];
  
  // Top kecamatan with priority score
  topKecamatan: (AggregatedKecamatan & { priorityScore: number })[]; 
  
  // Year-over-year comparison
  yoyComparison: {
    umkmGrowth: number;
    formalGrowth: number;
    digitalGrowth: number;
    omzetGrowth: number;
  } | null;
  
  // Insights generated from data
  insights: string[];
  
  // DSS alternatives
  scoredAlternatives: ScoredAlternative[];
  decision: {
    pilihanUtama: string;
    alasan: string;
    wilayahFokus: string[];
  };

  // Raw data that matches current filters (for download)
  filteredData: UmkmRawDataRow[]; // Using existing import
}

// Re-export as standard ViewModel if needed or keep separate
export type DashboardViewModel = DashboardViewModelExtended;
