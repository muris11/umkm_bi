type Priority = {
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
};

export function generateInsights(priorities: Priority[]): string[] {
  if (!priorities || priorities.length === 0) {
    return [];
  }

  const insights: string[] = [];

  // Find highest priority area
  const topPriority = priorities[0];
  insights.push(
    `Wilayah prioritas utama adalah ${topPriority.kecamatan}, ${topPriority.kabKota} dengan skor prioritas ${topPriority.skorPrioritas.toFixed(2)}.`
  );

  // Check formalization rate
  if (topPriority.persenUmkmFormal < 35) {
    insights.push(
      `Formalisasi UMKM di wilayah prioritas masih rendah (${topPriority.persenUmkmFormal.toFixed(1)}%). Diperlukan program intensif untuk meningkatkan legalitas bisnis.`
    );
  } else {
    insights.push(
      `Formalisasi UMKM di wilayah prioritas sudah cukup baik (${topPriority.persenUmkmFormal.toFixed(1)}%). Fokus dapat dialihkan ke aspek lain seperti digitalisasi.`
    );
  }

  // Check digitalization rate
  if (topPriority.persenUmkmDigital < 40) {
    insights.push(
      `Digitalisasi UMKM perlu ditingkatkan di wilayah prioritas (${topPriority.persenUmkmDigital.toFixed(1)}%). Investasi dalam pelatihan digital dapat meningkatkan daya saing.`
    );
  } else {
    insights.push(
      `Digitalisasi UMKM di wilayah prioritas sudah berkembang (${topPriority.persenUmkmDigital.toFixed(1)}%). Manfaatkan momentum untuk diversifikasi saluran penjualan.`
    );
  }

  // Check financing access
  if (topPriority.persenAksesPembiayaan < 15) {
    insights.push(
      `Akses pembiayaan UMKM sangat terbatas di wilayah prioritas (${topPriority.persenAksesPembiayaan.toFixed(1)}%). Program fasilitasi kredit mikro menjadi urgensi.`
    );
  } else if (topPriority.persenAksesPembiayaan < 30) {
    insights.push(
      `Akses pembiayaan UMKM masih perlu ditingkatkan di wilayah prioritas (${topPriority.persenAksesPembiayaan.toFixed(1)}%). Kolaborasi dengan lembaga keuangan mikro dapat memperluas jangkauan.`
    );
  } else {
    insights.push(
      `Akses pembiayaan UMKM di wilayah prioritas sudah cukup memadai (${topPriority.persenAksesPembiayaan.toFixed(1)}%). Perhatian dapat diberikan pada kualitas pembiayaan dan penggunaan yang produktif.`
    );
  }

  // Check logistics cost burden
  if (topPriority.indeksBiayaLogistik > 70) {
    insights.push(
      `Indeks biaya logistik tinggi (${topPriority.indeksBiayaLogistik.toFixed(1)}) menjadi hambatan kompetitif utama. Perlu inisiatif logistik bersama untuk mengoptimalkan distribusi.`
    );
  }

  // Check UMKM density
  if (topPriority.umkmPer1000Penduduk > 30) {
    insights.push(
      `Tingginya kepadatan UMKM per 1000 penduduk (${topPriority.umkmPer1000Penduduk.toFixed(2)}) menunjukkan potensi ekonomi lokal yang besar. Pemberdayaan terkoordinasi dapat menciptakan ekosistem UMKM yang kuat.`
    );
  }

  return insights;
}
