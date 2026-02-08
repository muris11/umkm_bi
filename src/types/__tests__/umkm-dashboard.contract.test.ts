import { describe, it, expect } from 'vitest';
import type { UmkmDashboardData } from '../umkm-dashboard';

describe('UmkmDashboardData contract', () => {
  it('should have all required top-level fields', () => {
    const mockData: UmkmDashboardData = {
      meta: {
        sumber: 'test',
        jumlahBaris: 0,
        tahun: 2024,
        catatanMetodologi: [],
      },
      kpi: {
        totalUmkm: 0,
        rataUmkmPer1000Penduduk: 0,
        rataPersenUmkmFormal: 0,
        rataPersenUmkmDigital: 0,
        rataPersenAksesPembiayaan: 0,
        totalTenagaKerjaUmkm: 0,
        rataOmzetBulananJuta: 0,
      },
      prioritas: [],
      insight: {
        wilayahPrioritasUtama: '',
        wilayahPalingStabil: '',
        narasi: [],
      },
      alternatifDss: [],
      keputusan: {
        pilihanUtama: '',
        alasan: '',
        wilayahFokus: [],
      },
    };

    expect(mockData).toHaveProperty('meta');
    expect(mockData).toHaveProperty('kpi');
    expect(mockData).toHaveProperty('prioritas');
    expect(mockData).toHaveProperty('insight');
    expect(mockData).toHaveProperty('alternatifDss');
    expect(mockData).toHaveProperty('keputusan');
  });
});
