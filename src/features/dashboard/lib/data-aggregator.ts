import type { SektorUmkm, UmkmRawDataRow } from '../types/umkm-raw-data';

export interface AggregatedKecamatan {
  kecamatan: string;
  kabKota: string;
  tahun: number;
  totalUmkm: number;
  totalPenduduk: number;
  umkmPer1000Penduduk: number;
  avgPersenFormal: number;
  avgPersenDigital: number;
  avgPersenAksesPembiayaan: number;
  avgOmzetBulananJuta: number;
  totalOmzetTahunanMiliar: number;
  totalTenagaKerja: number;
  avgIndeksInfrastrukturInternet: number;
  avgIndeksBiayaLogistik: number;
  totalPelatihan: number;
  totalAnggaranMiliar: number;
  avgIndeksKemudahanBerusaha: number;
  avgTingkatPengangguran: number;
  avgTingkatKemiskinan: number;
  totalGangguanDistribusi: number;
  sektorBreakdown: Record<SektorUmkm, number>;
  sektorDominan: SektorUmkm;
}

export interface AggregatedKabKota {
  kabKota: string;
  tahun: number;
  totalKecamatan: number;
  totalUmkm: number;
  totalPenduduk: number;
  avgUmkmPer1000: number;
  avgPersenFormal: number;
  avgPersenDigital: number;
  avgPersenAksesPembiayaan: number;
  totalOmzetMiliar: number;
  totalTenagaKerja: number;
  sektorBreakdown: Record<SektorUmkm, number>;
}

export interface AggregatedSektor {
  sektor: SektorUmkm;
  tahun: number;
  totalUmkm: number;
  totalKecamatan: number;
  avgPersenFormal: number;
  avgPersenDigital: number;
  avgOmzetBulananJuta: number;
  totalTenagaKerja: number;
}

/**
 * Aggregate raw data by Kecamatan
 */
export function aggregateByKecamatan(
  data: UmkmRawDataRow[],
  tahun?: number
): AggregatedKecamatan[] {
  const filtered = tahun ? data.filter(d => d.tahun === tahun) : data;
  
  const grouped = new Map<string, UmkmRawDataRow[]>();
  for (const row of filtered) {
    const key = `${row.kecamatan}|${row.kabKota}|${row.tahun}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(row);
  }

  return Array.from(grouped.entries()).map(([key, rows]) => {
    const [kecamatan, kabKota, tahunStr] = key.split('|');
    const count = rows.length;
    
    const sektorBreakdown = {} as Record<SektorUmkm, number>;
    for (const row of rows) {
      sektorBreakdown[row.sektorUtama] = 
        (sektorBreakdown[row.sektorUtama] || 0) + row.jumlahUmkm;
    }
    
    // Determine dominant sector safely
    const sortedSectors = Object.entries(sektorBreakdown)
      .sort(([,a], [,b]) => b - a);
      
    const sektorDominan = (sortedSectors.length > 0 ? sortedSectors[0][0] : 'Kuliner') as SektorUmkm;

    return {
      kecamatan,
      kabKota,
      tahun: parseInt(tahunStr),
      totalUmkm: sum(rows, r => r.jumlahUmkm),
      totalPenduduk: sum(rows, r => r.penduduk),
      umkmPer1000Penduduk: avg(rows, r => r.umkmPer1000Penduduk),
      avgPersenFormal: avg(rows, r => r.persenUmkmFormal),
      avgPersenDigital: avg(rows, r => r.persenUmkmDigital),
      avgPersenAksesPembiayaan: avg(rows, r => r.persenAksesPembiayaan),
      avgOmzetBulananJuta: avg(rows, r => r.rataOmzetBulananJuta),
      totalOmzetTahunanMiliar: sum(rows, r => r.omzetTahunanMiliar),
      totalTenagaKerja: sum(rows, r => r.tenagaKerjaUmkm),
      avgIndeksInfrastrukturInternet: avg(rows, r => r.indeksInfrastrukturInternet),
      avgIndeksBiayaLogistik: avg(rows, r => r.indeksBiayaLogistik),
      totalPelatihan: sum(rows, r => r.jumlahPelatihanInkubasi),
      totalAnggaranMiliar: sum(rows, r => r.anggaranPemberdayaanMiliar),
      avgIndeksKemudahanBerusaha: avg(rows, r => r.indeksKemudahanBerusaha),
      avgTingkatPengangguran: avg(rows, r => r.tingkatPengangguranPersen),
      avgTingkatKemiskinan: avg(rows, r => r.tingkatKemiskinanPersen),
      totalGangguanDistribusi: sum(rows, r => r.gangguanDistribusiTahun),
      sektorBreakdown,
      sektorDominan,
    };
  });
}

/**
 * Aggregate raw data by Kabupaten/Kota
 */
export function aggregateByKabKota(
  data: UmkmRawDataRow[],
  tahun?: number
): AggregatedKabKota[] {
  const filtered = tahun ? data.filter(d => d.tahun === tahun) : data;
  
  const grouped = new Map<string, UmkmRawDataRow[]>();
  for (const row of filtered) {
    const key = `${row.kabKota}|${row.tahun}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(row);
  }

  return Array.from(grouped.entries()).map(([key, rows]) => {
    const [kabKota, tahunStr] = key.split('|');
    
    const sektorBreakdown = {} as Record<SektorUmkm, number>;
    for (const row of rows) {
      sektorBreakdown[row.sektorUtama] = 
        (sektorBreakdown[row.sektorUtama] || 0) + row.jumlahUmkm;
    }
    
    const uniqueKecamatan = new Set(rows.map(r => r.kecamatan));

    return {
      kabKota,
      tahun: parseInt(tahunStr),
      totalKecamatan: uniqueKecamatan.size,
      totalUmkm: sum(rows, r => r.jumlahUmkm),
      totalPenduduk: sum(rows, r => r.penduduk),
      avgUmkmPer1000: avg(rows, r => r.umkmPer1000Penduduk),
      avgPersenFormal: avg(rows, r => r.persenUmkmFormal),
      avgPersenDigital: avg(rows, r => r.persenUmkmDigital),
      avgPersenAksesPembiayaan: avg(rows, r => r.persenAksesPembiayaan),
      totalOmzetMiliar: sum(rows, r => r.omzetTahunanMiliar),
      totalTenagaKerja: sum(rows, r => r.tenagaKerjaUmkm),
      sektorBreakdown,
    };
  });
}

/**
 * Aggregate raw data by Sektor
 */
export function aggregateBySektor(
  data: UmkmRawDataRow[],
  tahun?: number
): AggregatedSektor[] {
  const filtered = tahun ? data.filter(d => d.tahun === tahun) : data;
  
  const grouped = new Map<string, UmkmRawDataRow[]>();
  for (const row of filtered) {
    const key = `${row.sektorUtama}|${row.tahun}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(row);
  }

  return Array.from(grouped.entries()).map(([key, rows]) => {
    const [sektor, tahunStr] = key.split('|');
    const uniqueKecamatan = new Set(rows.map(r => r.kecamatan));

    return {
      sektor: sektor as SektorUmkm,
      tahun: parseInt(tahunStr),
      totalUmkm: sum(rows, r => r.jumlahUmkm),
      totalKecamatan: uniqueKecamatan.size,
      avgPersenFormal: avg(rows, r => r.persenUmkmFormal),
      avgPersenDigital: avg(rows, r => r.persenUmkmDigital),
      avgOmzetBulananJuta: avg(rows, r => r.rataOmzetBulananJuta),
      totalTenagaKerja: sum(rows, r => r.tenagaKerjaUmkm),
    };
  });
}

// Helper functions
function sum<T>(arr: T[], fn: (item: T) => number): number {
  return arr.reduce((acc, item) => acc + fn(item), 0);
}

function avg<T>(arr: T[], fn: (item: T) => number): number {
  if (arr.length === 0) return 0;
  return sum(arr, fn) / arr.length;
}
