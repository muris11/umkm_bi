export interface UmkmDashboardData {
  meta: {
    sumber: string;
    jumlahBaris: number;
    tahun: number;
    catatanMetodologi: string[];
  };
  kpi: {
    totalUmkm: number;
    rataUmkmPer1000Penduduk: number;
    rataPersenUmkmFormal: number;
    rataPersenUmkmDigital: number;
    rataPersenAksesPembiayaan: number;
    totalTenagaKerjaUmkm: number;
    rataOmzetBulananJuta: number;
  };
  prioritas: Array<{
    label: string;
    kecamatan: string;
    kabKota: string;
    umkmPer1000Penduduk: number;
    persenUmkmFormal: number;
    persenUmkmDigital: number;
    persenAksesPembiayaan: number;
    indeksBiayaLogistik: number;
    anggaranMiliar: number;
    skorPrioritas: number;
  }>;
  insight: {
    wilayahPrioritasUtama: string;
    wilayahPalingStabil: string;
    narasi: string[];
  };
  alternatifDss: Array<{
    alternatif: string;
    dampak: string;
    biaya: string;
    risiko: string;
    skorEfektivitas: number;
    skorKelayakanAnggaran: number;
  }>;
  keputusan: {
    pilihanUtama: string;
    alasan: string;
    wilayahFokus: string[];
  };
}
