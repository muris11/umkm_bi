/**
 * Raw data row from Excel dataset (normalized to camelCase)
 * Source: dataset_umkm_jabar_2024_2025_full_kecamatan_sektor_8778rows.xlsx
 */
export interface UmkmRawDataRow {
  tahun: number;
  provinsi: string;
  kabKota: string;
  kecamatan: string;
  sektorUtama: SektorUmkm;
  penduduk: number;
  jumlahUmkm: number;
  umkmPer1000Penduduk: number;
  persenUmkmFormal: number;
  persenUmkmDigital: number;
  persenAksesPembiayaan: number;
  rataOmzetBulananJuta: number;
  omzetTahunanMiliar: number;
  tenagaKerjaUmkm: number;
  indeksInfrastrukturInternet: number;
  indeksBiayaLogistik: number;
  jumlahPelatihanInkubasi: number;
  anggaranPemberdayaanMiliar: number;
  indeksKemudahanBerusaha: number;
  tingkatPengangguranPersen: number;
  tingkatKemiskinanPersen: number;
  gangguanDistribusiTahun: number;
}

export type SektorUmkm = 
  | 'Kuliner'
  | 'Fashion'
  | 'Kerajinan'
  | 'Jasa'
  | 'Pertanian Olahan'
  | 'Perdagangan'
  | 'Teknologi';

export const SEKTOR_UMKM_LIST: SektorUmkm[] = [
  'Kuliner',
  'Fashion',
  'Kerajinan',
  'Jasa',
  'Pertanian Olahan',
  'Perdagangan',
  'Teknologi',
];
