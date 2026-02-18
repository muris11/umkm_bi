import type { AggregatedKabKota, AggregatedKecamatan, AggregatedSektor } from '../lib/data-aggregator';
import type { ScoredAlternative } from './alternative';
import type { BIDashboardData } from './bi-dashboard';
import type { DataDrivenDecision } from './data-driven-decision';
import type { MLAnalysisData } from './ml-analysis';
import type { SektorUmkm, UmkmRawDataRow } from './umkm-raw-data';

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
  filters: {
    selectedTahun: number;
    selectedKabKota: string | null;
    selectedSektor: SektorUmkm | null;
  };
  kpiSummary: {
    totalUmkm: number;
    totalTenagaKerja: number;
    avgPersenFormal: number;
    avgPersenDigital: number;
    avgPersenAksesPembiayaan: number;
    totalOmzetMiliar: number;
    avgOmzetBulananJuta: number;
  };
  byKabKota: AggregatedKabKota[];
  bySektor: AggregatedSektor[];
  topKecamatan: (AggregatedKecamatan & { priorityScore: number })[];
  
  // Year-over-year comparison
  yoyComparison: {
    umkmGrowth: number;
    formalGrowth: number;
    digitalGrowth: number;
    omzetGrowth: number;
  } | null;
  insights: string[];
  scoredAlternatives: ScoredAlternative[];
  decision: {
    pilihanUtama: string;
    alasan: string;
    wilayahFokus: string[];
  };

  filteredData: UmkmRawDataRow[];
  mlAnalysis: MLAnalysisData;
  biDashboard: BIDashboardData;
  dataDrivenDecision: DataDrivenDecision;
}

export type DashboardViewModel = DashboardViewModelExtended;
