const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'dataset_umkm_jabar_2024_2025_full_kecamatan_sektor_8778rows.xlsx';
const OUTPUT_FILE = 'src/data/umkm-jabar-full.json';

console.log('📖 Reading Excel file...');
if (!fs.existsSync(INPUT_FILE)) {
  console.error(`❌ Input file not found: ${INPUT_FILE}`);
  process.exit(1);
}

const workbook = XLSX.readFile(INPUT_FILE);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rawData = XLSX.utils.sheet_to_json(worksheet);

console.log(`📊 Found ${rawData.length} rows`);

// Validate and transform data (to camelCase)
const data = rawData.map((row, index) => {
  // Simple validation for critical fields
  if (!row.tahun || !row.kab_kota || !row.kecamatan) {
    // console.warn(`⚠️ Row ${index + 2}: Missing key fields`);
  }
  
  return {
    tahun: Number(row.tahun),
    provinsi: String(row.provinsi || 'Jawa Barat'),
    kabKota: String(row.kab_kota),
    kecamatan: String(row.kecamatan),
    sektorUtama: String(row.sektor_umkm_utama),
    penduduk: Number(row.penduduk || 0),
    jumlahUmkm: Number(row.jumlah_umkm || 0),
    umkmPer1000Penduduk: Number(row.umkm_per_1000_penduduk || 0),
    persenUmkmFormal: Number(row.persen_umkm_formal || 0),
    persenUmkmDigital: Number(row.persen_umkm_digital || 0),
    persenAksesPembiayaan: Number(row.persen_umkm_akses_pembiayaan || 0),
    rataOmzetBulananJuta: Number(row.rata2_omzet_bulanan_juta || 0),
    omzetTahunanMiliar: Number(row.omzet_tahunan_miliar || 0),
    tenagaKerjaUmkm: Number(row.tenaga_kerja_umkm || 0),
    indeksInfrastrukturInternet: Number(row.indeks_infrastruktur_internet || 0),
    indeksBiayaLogistik: Number(row.indeks_biaya_logistik || 0),
    jumlahPelatihanInkubasi: Number(row.jumlah_pelatihan_inkubasi || 0),
    anggaranPemberdayaanMiliar: Number(row.anggaran_pemberdayaan_umkm_miliar || 0),
    indeksKemudahanBerusaha: Number(row.indeks_kemudahan_berusaha || 0),
    tingkatPengangguranPersen: Number(row.tingkat_pengangguran_terbuka_persen || 0),
    tingkatKemiskinanPersen: Number(row.tingkat_kemiskinan_persen || 0),
    gangguanDistribusiTahun: Number(row.kejadian_gangguan_distribusi_tahun || 0),
  };
});

// Generate summary statistics
const stats = {
  totalRows: data.length,
  years: [...new Set(data.map(d => d.tahun))].sort(),
  kabKotaCount: new Set(data.map(d => d.kabKota)).size,
  kecamatanCount: new Set(data.map(d => d.kecamatan)).size,
  sektorList: [...new Set(data.map(d => d.sektorUtama))],
  totalUmkm: data.reduce((sum, d) => sum + d.jumlahUmkm, 0),
  totalTenagaKerja: data.reduce((sum, d) => sum + d.tenagaKerjaUmkm, 0),
};

const output = {
  meta: {
    sumber: 'Dataset UMKM Jawa Barat 2024-2025 Full Kecamatan & Sektor',
    jumlahBaris: stats.totalRows,
    tahun: stats.years,
    kabKotaCount: stats.kabKotaCount,
    kecamatanCount: stats.kecamatanCount,
    sektorList: stats.sektorList,
    generatedAt: new Date().toISOString(),
  },
  summary: {
    totalUmkm: stats.totalUmkm,
    totalTenagaKerja: stats.totalTenagaKerja,
  },
  data: data,
};

// Ensure output directory exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write JSON file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`✅ Converted to ${OUTPUT_FILE}`);
console.log(`📈 Stats: ${stats.totalRows} rows, ${stats.kabKotaCount} kab/kota, ${stats.kecamatanCount} kecamatan`);
