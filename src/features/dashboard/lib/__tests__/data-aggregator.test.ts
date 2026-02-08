import { describe, expect, it } from 'vitest';
import type { UmkmRawDataRow } from '../../types/umkm-raw-data';
import {
    aggregateByKecamatan,
    aggregateBySektor
} from '../data-aggregator';

const mockData: UmkmRawDataRow[] = [
  {
    tahun: 2024,
    provinsi: 'Jawa Barat',
    kabKota: 'Kabupaten Bogor',
    kecamatan: 'Cibinong',
    sektorUtama: 'Kuliner',
    penduduk: 100000,
    jumlahUmkm: 1000,
    umkmPer1000Penduduk: 10,
    persenUmkmFormal: 50,
    persenUmkmDigital: 60,
    persenAksesPembiayaan: 40,
    rataOmzetBulananJuta: 15,
    omzetTahunanMiliar: 180,
    tenagaKerjaUmkm: 3000,
    indeksInfrastrukturInternet: 80,
    indeksBiayaLogistik: 40,
    jumlahPelatihanInkubasi: 5,
    anggaranPemberdayaanMiliar: 1,
    indeksKemudahanBerusaha: 70,
    tingkatPengangguranPersen: 5,
    tingkatKemiskinanPersen: 6,
    gangguanDistribusiTahun: 2,
  },
  {
    tahun: 2024,
    provinsi: 'Jawa Barat',
    kabKota: 'Kabupaten Bogor',
    kecamatan: 'Cibinong',
    sektorUtama: 'Fashion',
    penduduk: 100000,
    jumlahUmkm: 500,
    umkmPer1000Penduduk: 5,
    persenUmkmFormal: 40,
    persenUmkmDigital: 50,
    persenAksesPembiayaan: 30,
    rataOmzetBulananJuta: 12,
    omzetTahunanMiliar: 72,
    tenagaKerjaUmkm: 1500,
    indeksInfrastrukturInternet: 80,
    indeksBiayaLogistik: 40,
    jumlahPelatihanInkubasi: 3,
    anggaranPemberdayaanMiliar: 0.5,
    indeksKemudahanBerusaha: 70,
    tingkatPengangguranPersen: 5,
    tingkatKemiskinanPersen: 6,
    gangguanDistribusiTahun: 1,
  },
];

describe('aggregateByKecamatan', () => {
  it('aggregates data correctly', () => {
    const result = aggregateByKecamatan(mockData);
    
    expect(result).toHaveLength(1);
    expect(result[0].kecamatan).toBe('Cibinong');
    expect(result[0].totalUmkm).toBe(1500);
    expect(result[0].sektorDominan).toBe('Kuliner');
  });

  it('filters by tahun', () => {
    const result = aggregateByKecamatan(mockData, 2025);
    expect(result).toHaveLength(0);
  });
});

describe('aggregateBySektor', () => {
  it('groups by sektor correctly', () => {
    const result = aggregateBySektor(mockData);
    
    expect(result).toHaveLength(2);
    const kuliner = result.find(r => r.sektor === 'Kuliner');
    expect(kuliner?.totalUmkm).toBe(1000);
  });
});
