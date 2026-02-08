import fullData from '@/data/umkm-jabar-full.json';
import type { DashboardViewModelExtended } from '../types';
import type { UmkmRawDataRow } from '../types/umkm-raw-data';

export async function loadDashboardData(): Promise<{
  rawData: UmkmRawDataRow[];
  meta: DashboardViewModelExtended['meta'];
}> {
  // Cast to any to bypass strict JSON import types
  const data = fullData as any;

  return {
    rawData: data.data as UmkmRawDataRow[],
    meta: {
        ...data.meta,
        tahun: data.meta.tahun as number[], 
        sektorList: data.meta.sektorList as any[],
        catatanMetodologi: [
             "Data bersumber dari Open Data Jabar (Simulasi)",
             "Semua nilai uang dalam Miliar Rupiah kecuali rata-rata omzet bulanan (Juta Rupiah)",
             "Peringkat prioritas menggunakan metode Weighted Product (WP)"
        ]
    }
  };
}
