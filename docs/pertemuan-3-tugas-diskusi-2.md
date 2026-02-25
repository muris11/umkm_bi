# Pertemuan 3 - Tugas Diskusi 2

## Perbedaan Big Data, Machine Learning, dan BI dalam Ekosistem Smart City

Dalam konteks Smart City, ketiganya bukan saling menggantikan, tetapi saling melengkapi.

| Komponen | Fungsi utama | Pertanyaan yang dijawab | Contoh pada proyek UMKM Dashboard |
|---|---|---|---|
| Big Data | Fondasi data skala besar dan beragam | Data apa yang tersedia, seberapa lengkap, seberapa cepat diperbarui | Data UMKM lintas kecamatan/kabupaten, ribuan baris, multi-atribut |
| Business Intelligence (BI) | Analisis deskriptif dan diagnostik | Apa yang sedang terjadi dan faktor utamanya apa | KPI utama, dashboard prioritas wilayah, insight per role pengguna |
| Machine Learning (ML) | Prediksi, klasifikasi, dan segmentasi | Apa yang kemungkinan terjadi berikutnya, pola apa yang tersembunyi | Klasifikasi risiko kecamatan, prediksi pertumbuhan UMKM, clustering kecamatan |

Ringkasnya: Big Data = bahan baku, BI = alat baca kondisi saat ini, ML = alat antisipasi masa depan.

---

## 2) Analisis Potensi Machine Learning

### A. Apakah masalah bisa diselesaikan dengan pendekatan prediktif?

Ya, bisa, dengan catatan:

- Dataset saat ini sudah cukup kuat untuk analisis deskriptif dan prioritas kebijakan berbasis skor.
- Untuk prediksi jangka menengah-panjang, kualitas model akan naik signifikan jika histori diperpanjang (minimal 3-5 tahun) dan ada pembaruan periodik.
- Dengan data historis lebih lengkap, dashboard dapat beralih dari "reaktif" ke "proaktif" (early warning dan intervensi dini).

### B. Model yang paling mungkin digunakan

#### 1. Klasifikasi

**Tujuan:** mengelompokkan kecamatan menjadi risiko tinggi/sedang/rendah untuk intervensi program.

**Contoh target:** `risk_category` berdasarkan kombinasi indikator:
- persen UMKM formal,
- persen UMKM digital,
- persen akses pembiayaan,
- indeks biaya logistik,
- omzet rata-rata,
- kepadatan UMKM.

**Model kandidat:**
- Decision Tree / Random Forest (mudah dijelaskan ke stakeholder pemerintah, robust untuk data non-linear).
- Gradient Boosting (jika target akurasi lebih tinggi).

#### 2. Regresi

**Tujuan:** memprediksi nilai numerik, misalnya:
- jumlah UMKM tahun berikutnya,
- rata-rata omzet bulanan,
- kebutuhan anggaran intervensi per kecamatan,
- proyeksi kenaikan digitalisasi setelah program.

**Model kandidat:**
- Linear Regression (baseline, interpretasi jelas).
- Random Forest Regressor / XGBoost Regressor (jika relasi variabel kompleks).
- Time-series regression/ARIMA (jika histori waktu sudah cukup panjang).

#### 3. Clustering

**Tujuan:** mengelompokkan kecamatan dengan karakteristik serupa agar intervensi tepat sasaran.

**Contoh segmen yang bisa muncul:**
- Klaster A: UMKM tinggi, digital rendah, akses pembiayaan rendah.
- Klaster B: UMKM sedang, formalisasi baik, logistik buruk.
- Klaster C: UMKM rendah, membutuhkan intervensi dasar.

**Model kandidat:**
- K-Means (cepat, cocok untuk segmentasi awal).
- Hierarchical Clustering (lebih informatif untuk memahami kedekatan antar-kecamatan).
- DBSCAN (jika ingin mendeteksi outlier/wilayah anomali).

### C. Rekomendasi implementasi bertahap

1. Mulai dari clustering untuk segmentasi kebijakan.
2. Lanjut klasifikasi risiko untuk prioritas intervensi.
3. Terakhir regresi untuk forecast target dan anggaran.

Urutan ini paling realistis karena tingkat kesiapan data dan kebutuhan kebijakan harian.

---

## 3) Rancang Dashboard Business Intelligence

Berikut rancangan berdasarkan KPI pada praktikum (data dashboard saat ini):

- Total UMKM: **3,338,788**
- Rata UMKM per 1000 penduduk: **30.39**
- Rata formalisasi: **40.21%**
- Rata digitalisasi: **47.95%**
- Rata akses pembiayaan: **28.88%**
- Total tenaga kerja UMKM: **7,572,417**
- Rata omzet bulanan: **20.24 juta**

### A. KPI paling relevan untuk ditampilkan

#### KPI Strategis (eksekutif)
- Total UMKM
- Total tenaga kerja UMKM
- Rata omzet bulanan
- Cakupan wilayah prioritas

#### KPI Diagnostik (dinas teknis)
- Persentase digitalisasi
- Persentase formalisasi
- Persentase akses pembiayaan
- Indeks biaya logistik

#### KPI Operasional (wilayah)
- Skor prioritas per kecamatan
- Gap KPI per kecamatan terhadap rata-rata provinsi
- Status program (belum mulai/berjalan/selesai)

### B. Visualisasi yang digunakan

- **Bar chart**: perbandingan KPI antar kecamatan/kabupaten.
- **Line chart**: tren periodik (misal digitalisasi dari waktu ke waktu).
- **Heatmap / choropleth map**: intensitas masalah per wilayah.
- **Scatter plot**: hubungan omzet vs tenaga kerja, ukuran bubble = skor prioritas.
- **Stacked bar**: komposisi sektor UMKM per wilayah.
- **Table + conditional formatting**: ranking prioritas + indikator merah-kuning-hijau.

### C. Siapa pengguna dashboard

#### 1. Wali Kota / pimpinan daerah
Fokus: gambaran strategis, prioritas anggaran, dampak kebijakan lintas wilayah.

#### 2. Dinas Koperasi/UMKM dan Dinas terkait
Fokus: monitoring KPI program, identifikasi bottleneck, evaluasi efektivitas intervensi.

#### 3. Camat
Fokus: daftar UMKM prioritas lokal, tindak lanjut program lapangan, progress per kecamatan.

Model terbaik adalah **role-based dashboard**: satu data source, tampilan disesuaikan kebutuhan keputusan tiap peran.

---

## 4) Rumuskan Keputusan Berbasis Data

### A. Kebijakan yang dipilih

Berdasarkan data dashboard dan alternatif yang tersedia, kebijakan prioritas:

**Program Pelatihan Digital UMKM + fasilitasi akses pembiayaan terarah pada kecamatan prioritas tinggi.**

Alasan:
- digitalisasi dan pembiayaan adalah bottleneck utama,
- dampak cepat terhadap penjualan dan daya tahan UMKM,
- dapat diukur jelas melalui KPI bulanan.

### B. Alternatif yang dibandingkan

1. Program Pelatihan Digital UMKM
2. Fasilitasi Formalisasi UMKM
3. Program Akses Pembiayaan UMKM
4. Optimasi Logistik UMKM

Perbandingan dilakukan menggunakan kombinasi:
- skor efektivitas,
- skor kelayakan anggaran,
- risiko implementasi,
- kesesuaian dengan masalah prioritas wilayah.

### C. Keputusan diambil berdasarkan indikator/insight apa

Indikator utama yang menjadi dasar:

- Persentase akses pembiayaan yang masih rendah (**28.88%** rata-rata)
- Gap digitalisasi/formalisasi di wilayah prioritas
- Skor prioritas kecamatan (contoh tertinggi: **Kecamatan_25 - 75.03**)
- Potensi dampak ke omzet dan tenaga kerja UMKM

Insight kunci:
- Wilayah prioritas memiliki kombinasi masalah: digital rendah, formalisasi rendah, akses modal rendah.
- Intervensi tunggal kurang efektif; paket kebijakan digital + pembiayaan lebih kuat untuk akselerasi.

### D. Keterkaitan dengan data-driven decision making

Keputusan ini mengikuti siklus DDDM:

1. **Data**: KPI dan skor prioritas wilayah.
2. **Analysis**: identifikasi gap dan akar masalah.
3. **Insight**: temuan bottleneck utama per wilayah.
4. **Decision**: memilih kebijakan berbasis skor, bukan intuisi semata.
5. **Action**: implementasi program terarah pada kecamatan prioritas.
6. **Feedback**: ukur ulang KPI (digitalisasi, pembiayaan, omzet, tenaga kerja) untuk iterasi kebijakan.

Dengan pola ini, keputusan pemerintah jadi lebih transparan, terukur, dan akuntabel.

---

## Ringkasan Singkat Jawaban Diskusi

- **Potensi ML:** layak, terutama klasifikasi risiko, regresi proyeksi, dan clustering segmentasi wilayah.
- **Rancangan BI:** KPI strategis-diagnostik-operasional + visualisasi sesuai tujuan analisis + role-based dashboard.
- **Keputusan berbasis data:** pilih kebijakan yang paling efektif- feasible-risiko terkendali berdasarkan KPI dan insight dashboard.
