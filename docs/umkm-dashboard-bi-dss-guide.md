# Panduan UMKM Dashboard: BI & DSS

Dokumen panduan praktis untuk menggunakan, memahami, dan memanfaatkan dashboard pemberdayaan UMKM Jawa Barat secara efektif.

## 1. Sumber Data

**Dataset Utama:** `dataset_umkm_jabar_1000rows.csv`

**Struktur Data:**
- **Jumlah baris:** 1.000 data UMKM
- **Tahun observasi:** 2025
- **Variabel utama:**
  - Jumlah UMKM per kecamatan
  - Kepadatan UMKM per 1000 penduduk
  - Persentase formalisasi UMKM
  - Persentase digitalisasi UMKM
  - Persentase akses pembiayaan
  - Rata-rata omzet bulanan (juta)
  - Jumlah tenaga kerja
  - Indeks biaya logistik
  - Anggaran alokasi (miliar)

**Catatan Metodologi:**
- Data telah dinormalisasi menggunakan metode Min-Max
- Skor prioritas dihitung berbasis kombinasi terbobot dari KPI utama
- Proyeksi prioritas wilayah didasarkan pada kondisi saat ini

## 2. Definisi KPI UMKM

### KPI Utama

**Total UMKM Jawa Barat**
- Definisi: Jumlah total unit UMKM di seluruh Jawa Barat
- Satuan: Unit UMKM
- Interpretasi: Indikator skala ekonomi UMKM regional

**Rata UMKM per 1000 Penduduk**
- Definisi: Kepadatan UMKM relatif terhadap jumlah penduduk
- Formula: `(Jumlah UMKM / Jumlah Penduduk) × 1000`
- Interpretasi: Semakin tinggi = penetrasi UMKM lebih baik di masyarakat

**Rata Tingkat Formalisasi**
- Definisi: Persentase UMKM yang memiliki legalitas formal (NPWP, izin usaha)
- Satuan: Persentase (%)
- Interpretasi: Semakin tinggi = UMKM lebih terstruktur dan terlindungi hukum

**Rata Omzet Bulanan**
- Definisi: Rata-rata pendapatan bulanan UMKM
- Satuan: Rupiah (juta)
- Interpretasi: Indikator performa finansial dan potensi pertumbuhan

### KPI Pendukung

**Persentase Digitalisasi UMKM**
- UMKM yang menggunakan platform digital untuk pemasaran atau transaksi

**Persentase Akses Pembiayaan**
- UMKM yang memiliki akses ke lembaga pembiayaan formal

**Indeks Biaya Logistik**
- Skor komposit efisiensi logistik per wilayah (skala 1-10)

## 3. Cara Membaca Visualisasi

### Dashboard Kepadatan UMKM (Bar Chart)
**Sumbu X:** Wilayah prioritas (A, B, C, D)
**Sumbu Y:** UMKM per 1000 penduduk
**Interpretasi:**
- Bar lebih tinggi = kepadatan UMKM lebih besar
- Bandingkan antar wilayah untuk identifikasi disparitas
- Wilayah dengan kepadatan rendah = kandidat program akselerasi

### Dashboard Formalisasi & Digitalisasi (Grouped Bar)
**Dua Bar per Wilayah:**
- Bar Biru: Tingkat formalisasi (%)
- Bar Hijau: Tingkat digitalisasi (%)

**Interpretasi:**
- Gap besar antara formalisasi dan digitalisasi = peluang untuk program digitalisasi
- Keduanya rendah = butuh program komprehensif (legal + digital)

### Dashboard Akses Pembiayaan (Bar Chart)
**Sumbu Y:** Persentase UMKM dengan akses pembiayaan
**Interpretasi:**
- <30%: Akses sangat terbatas, prioritas tinggi untuk program permodalan
- 30-50%: Akses moderat, fokus pada ekspansi program
- >50%: Akses baik, fokus pada optimasi dan diversifikasi

### Scatter Plot: Omzet vs Tenaga Kerja
**Sumbu X:** Jumlah tenaga kerja
**Sumbu Y:** Omzet bulanan (juta)
**Ukuran Titik:** Skor prioritas wilayah

**Interpretasi Kuadran:**
- Kanan Atas: UMKM besar & produktif → strategi pertumbuhan
- Kiri Atas: Produktivitas tinggi meski kecil → model efisiensi
- Kanan Bawah: Banyak pekerja, omzet rendah → masalah efisiensi
- Kiri Bawah: UMKM mikro → program pemberdayaan dasar

## 4. Cara Interpretasi Insight BI

### Membaca Panel Insight
Panel Insight menyajikan **3-5 temuan kritis** hasil analisis data. Setiap insight mengikuti struktur:
- **Kondisi saat ini** (fakta data)
- **Implikasi** (dampak terhadap kebijakan)
- **Rekomendasi awal** (saran tindakan)

### Contoh Interpretasi
**Insight:** "Wilayah prioritas A memiliki kepadatan UMKM tertinggi (45 per 1000 penduduk) namun tingkat digitalisasi terendah (18%)"

**Interpretasi:**
- **Potensi:** Banyak UMKM siap untuk ditingkatkan
- **Tantangan:** Adopsi teknologi masih rendah
- **Tindakan:** Program pelatihan digital prioritas di wilayah A

### Menggunakan Insight untuk DSS
Insight BI menjadi **basis data** untuk evaluasi alternatif kebijakan:
1. Identifikasi masalah utama dari insight
2. Cari alternatif DSS yang langsung menjawab masalah tersebut
3. Evaluasi kelayakan berdasarkan skor efektivitas dan anggaran

## 5. Cara Memilih Keputusan Akhir

### Langkah 1: Evaluasi Tabel Alternatif DSS
**Kolom Penting:**
- **Alternatif:** Nama program/kebijakan
- **Dampak:** Deskripsi hasil yang diharapkan
- **Biaya:** Level investasi (Rendah/Sedang/Tinggi)
- **Risiko:** Tingkat ketidakpastian implementasi
- **Skor Efektivitas:** Nilai 0-100 (semakin tinggi semakin baik)
- **Skor Kelayakan Anggaran:** Nilai 0-100 (feasibility dengan anggaran tersedia)

**Cara Membandingkan:**
1. Urutkan berdasarkan Skor Efektivitas (descending)
2. Filter hanya yang Skor Kelayakan Anggaran ≥ 70
3. Prioritaskan yang Risiko = "Rendah" atau "Sedang"

### Langkah 2: Pertimbangkan Konteks Wilayah
**Dari Panel Keputusan, perhatikan:**
- **Wilayah Prioritas Utama:** Dimana dampak paling signifikan
- **Wilayah Paling Stabil:** Dimana implementasi paling aman

**Matching Program ke Wilayah:**
- Program digitalisasi → Wilayah dengan formalisasi tinggi, digital rendah
- Program permodalan → Wilayah dengan akses pembiayaan <30%
- Program pelatihan → Wilayah dengan omzet rendah meski tenaga kerja banyak

### Langkah 3: Validasi dengan Batasan Anggaran
**Anggaran Rata-rata:** Rp 15.68 miliar per kecamatan prioritas

**Keputusan Final:**
1. Pilih alternatif dengan **Skor Efektivitas tertinggi**
2. Pastikan **Skor Kelayakan Anggaran ≥ 70**
3. Konfirmasi **Risiko tidak "Tinggi"**
4. Tetapkan **Kecamatan Prioritas** berdasarkan skor masalah tertinggi
5. Dokumentasikan alasan pemilihan untuk akuntabilitas

### Contoh Keputusan Terbaik
**Program Terpilih:** Pelatihan Digitalisasi UMKM + Pendampingan Akses Pembiayaan

**Alasan:**
- Skor Efektivitas: 85/100
- Skor Kelayakan Anggaran: 90/100
- Biaya: Sedang (fit dengan budget rata-rata)
- Risiko: Rendah (program established)
- Dampak: Mengatasi dua masalah kritis sekaligus (digital + modal)

**Target Implementasi:** Kecamatan dengan:
- Tingkat digitalisasi <25%
- Akses pembiayaan <35%
- Jumlah UMKM >2500 unit

## 6. Tips Praktis

### Untuk Pembuat Kebijakan
1. **Mulai dari Insight BI**, jangan langsung ke DSS
2. **Validasi data** dengan kondisi lapangan sebelum implementasi
3. **Kombinasikan program** yang saling menguatkan (misal: digitalisasi + pembiayaan)
4. **Pantau KPI** secara berkala untuk evaluasi dampak

### Untuk Tim Operasional
1. **Gunakan filter wilayah** untuk fokus pada area tanggungjawab
2. **Export data** untuk analisis lebih detail jika diperlukan
3. **Bandingkan antar periode** untuk track progress
4. **Dokumentasikan learning** dari implementasi untuk iterasi berikutnya

### Untuk Stakeholder Eksternal
1. **Fokus pada Keputusan Panel** untuk quick overview
2. **Rujuk Insight BI** untuk memahami konteks keputusan
3. **Review Catatan Metodologi** untuk transparansi perhitungan

## 7. Checklist Sebelum Mengambil Keputusan

- [ ] Sudah membaca semua insight BI
- [ ] Sudah melihat minimal 3 visualisasi utama
- [ ] Sudah membandingkan semua alternatif DSS
- [ ] Sudah memvalidasi kelayakan anggaran
- [ ] Sudah menentukan wilayah prioritas spesifik
- [ ] Sudah mendokumentasikan alasan pemilihan
- [ ] Sudah mengidentifikasi metrik kesuksesan untuk monitoring
- [ ] Sudah menyiapkan rencana mitigasi risiko

---

**Kontak & Dukungan:**
Dashboard ini adalah bagian dari praktikum Smart City. Untuk pertanyaan teknis atau metodologi, hubungi tim pengembang melalui repository project.
