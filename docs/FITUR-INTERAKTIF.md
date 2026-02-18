# Fitur Interaktif Dashboard UMKM - Dokumentasi

## Daftar Fitur Interaktif Baru

Dashboard UMKM Jawa Barat telah ditambahkan **4 section interaktif utama** yang memungkinkan pengguna untuk bereksplorasi, mengkustomisasi, dan mensimulasikan data secara langsung.

---

## 1. 🤖 ML Playground (Machine Learning Playground)

**File:** `ml-playground-section.tsx`

### Deskripsi
Section yang memungkinkan pengguna untuk bereksperimen dengan model Machine Learning dengan mengubah-ubah parameter dan melihat hasilnya secara real-time.

### Fitur Interaktif

#### A. Model Selection
- **Pilihan Model:**
  - Random Forest Classifier (Klasifikasi risiko wilayah)
  - K-Means Clustering (Segmentasi kecamatan)
  - Linear Regression (Forecasting pertumbuhan)

- **Cara Penggunaan:**
  1. Klik card model yang ingin dieksplorasi
  2. Model akan highlight dengan border berwarna
  3. Parameter di panel kanan akan update sesuai model

#### B. Parameter Tuning
Setiap model memiliki parameter yang bisa diatur dengan slider:

**Random Forest:**
- `n_estimators`: 50-300 (jumlah trees)
- `max_depth`: 5-30 (kedalaman tree)
- `min_samples_split`: 2-20 (minimum sample split)

**K-Means:**
- `n_clusters`: 2-8 (jumlah cluster)
- `max_iter`: 100-500 (maximum iterations)

**Linear Regression:**
- `forecast_horizon`: 1-5 tahun (jangka prediksi)
- `confidence_interval`: 80-99% (interval kepercayaan)

#### C. Training Simulation
- Tombol "Jalankan Model" memicu simulasi training
- Progress bar menampilkan progress 0-100%
- Setelah selesai, hasil muncul dengan:
  - Akurasi model (%)
  - Waktu training (detik)
  - 3 insight otomatis

#### D. Reset Function
- Tombol "Reset" mengembalikan parameter ke default
- Memungkinkan eksperimen berulang kali

### Business Value
- Pengguna bisa memahami trade-off parameter vs akurasi
- Eksplorasi model tanpa coding
- Educational tool untuk pemahaman ML

---

## 2. 🎨 BI Dashboard Builder

**File:** `bi-builder-section.tsx`

### Deskripsi
Tool untuk membangun dashboard custom dengan memilih KPI dan visualisasi sesuai kebutuhan pengguna.

### Fitur Interaktif

#### A. KPI Selection (Kiri)
KPI dikelompokkan dalam 4 kategori:

**Ekonomi (Green):**
- Total UMKM (9.45 Juta)
- Kontribusi PDRB (23.4%)
- Formalisasi (34.2%)
- Akses Pembiayaan (28.5%)
- Pertumbuhan YoY (+12.5%)
- Market Size (Rp 124T)

**Sosial (Blue):**
- Tenaga Kerja (18.46 Juta)
- UMKM per Kecamatan (1,247)
- Butuh Intervensi (23%)

**Digital (Purple):**
- Digitalisasi (42.3%)

**Geografis (Amber):**
- Wilayah Cakupan (27 Kab/Kota)

**Cara Penggunaan:**
- Klik KPI untuk select/unselect
- Icon checkmark muncul jika terpilih
- Warna border menyesuaikan kategori

#### B. Visualization Selection
6 pilihan visualisasi:
1. Tren Pertumbuhan UMKM (Line Chart)
2. Perbandingan Kabupaten (Bar Chart)
3. Distribusi Sektor (Pie Chart)
4. Peta Sebaran UMKM (Heatmap)
5. Indeks Kesehatan (Gauge)
6. Digitalisasi per Wilayah (Stacked Bar)

**Cara Penggunaan:**
- Klik visualisasi untuk menambahkan ke dashboard
- Icon dan deskripsi membantu pemilihan

#### C. Live Preview (Kanan)
- Preview dashboard update real-time saat user memilih
- KPI muncul sebagai cards dengan warna kategori
- Visualisasi muncul dengan placeholder chart
- Tombol X untuk remove item
- Input field untuk rename dashboard

#### D. Export & Share
- Tombol "Simpan" untuk menyimpan konfigurasi
- Tombol "Bagikan" untuk share dashboard
- Toggle "Sembunyikan/Tampilkan Preview"

### Business Value
- Self-service BI - user bisa bikin dashboard sendiri
- Personalized view untuk kebutuhan spesifik
- No-code dashboard building

---

## 3. 🧮 What-If Scenario Simulator

**File:** `what-if-simulator-section.tsx`

### Deskripsi
Simulator untuk memprediksi dampak kebijakan dengan mengubah variabel-variabel input dan melihat hasil proyeksi.

### Fitur Interaktif

#### A. Policy Variables (6 Variabel)
Semua variabel menggunakan slider dengan range yang realistis:

1. **Anggaran Program** (10-200 Miliar Rp)
   - Default: 50 Miliar
   - Impact: Budget per UMKM menentukan kualitas intervensi

2. **Jumlah UMKM Target** (100-5000 Unit)
   - Default: 500 unit
   - Impact: Coverage vs depth trade-off

3. **Target Digitalisasi** (20-90%)
   - Default: 60%
   - Impact: Adoption rate

4. **Akses Pembiayaan** (10-70%)
   - Default: 40%
   - Impact: Financial inclusion

5. **Waktu Implementasi** (6-36 Bulan)
   - Default: 18 bulan
   - Impact: Risk factor (longer = higher risk)

6. **Tingkat Keberhasilan** (30-95%)
   - Default: 75%
   - Impact: Realistic expectation setting

#### B. Real-time Calculation
Setiap perubahan slider otomatis menghitung:
- Pertumbuhan UMKM (+X unit)
- Lapangan Kerja (+X tenaga kerja)
- Dampak Ekonomi (Rp XM per tahun)
- ROI (%)

#### C. Risk Assessment
- **Risk Level:** Low / Medium / High (badge berwarna)
- **Confidence Score:** 0-100%
- Berdasarkan kombinasi parameter

#### D. Scenario Insights
Setelah simulasi, muncul 4 insight:
1. Analisis anggaran per UMKM
2. Balance digitalisasi vs pembiayaan
3. Timeline risk assessment
4. ROI recommendation

#### E. Conclusion Box
Summary dalam bahasa natural:
> "Dengan anggaran Rp X miliar dan target Y UMKM, program diproyeksikan menghasilkan ROI Z% dengan risk profile [low/medium/high]"

### Business Value
- Evidence-based policy planning
- Compare multiple scenarios before commitment
- Budget optimization
- Stakeholder communication tool

---

## 4. 🔍 Data Explorer

**File:** `data-explorer-section.tsx`

### Deskripsi
Interactive table explorer untuk jelajahi data UMKM dengan filter, search, dan sorting.

### Fitur Interaktif

#### A. Search & Filter

**Search Bar:**
- Real-time search by kecamatan or kabupaten
- Case insensitive
- Partial match support

**Filter Dropdowns:**
1. **Kab/Kota:** Semua, Bandung, Bogor, Bekasi, Depok, Cimahi, Tasikmalaya
2. **Sektor:** Semua, Kuliner, Fashion, Kerajinan, Elektronik, Jasa, Otomotif, Tekstil
3. **Priority:** Semua, High, Medium, Low

#### B. Real-time Stats
Tiga metrics cards update otomatis saat filter berubah:
- **Total UMKM:** Sum dari filtered data
- **Rata-rata Digitalisasi:** Average dari filtered data
- **Wilayah Prioritas Tinggi:** Count high priority

#### C. Sortable Columns
Click header untuk sort:
- **Jumlah UMKM:** Ascending/Descending
- **Digital Rate:** Ascending/Descending
- Visual indicator (chevron icon) menunjukkan sort direction

#### D. Expandable Rows
Click row untuk expand dan lihat detail:
- Formalisasi Rate
- Omzet Tahunan
- Estimasi Tenaga Kerja
- Tombol "Lihat Detail"

#### E. Visual Indicators
- **Progress Bar:** Digital rate visualisasi
- **Priority Badge:** Red (High), Yellow (Medium), Green (Low)
- **Sektor Badge:** Default style

#### F. Export Function
Tombol "Export Data" untuk download filtered data

### Business Value
- Self-service data exploration
- Ad-hoc analysis without SQL
- Quick insight discovery
- Data-driven storytelling

---

## Ringkasan Interaktivitas

| Fitur | Interaksi | Output |
|-------|-----------|--------|
| **ML Playground** | Slider, Button | Accuracy, Insights |
| **BI Builder** | Checkbox, Input | Custom Dashboard |
| **What-If** | Slider | ROI, Risk, Projections |
| **Data Explorer** | Search, Filter, Sort | Filtered Table |

---

## Teknis Implementation

### State Management
Semua section menggunakan React Hooks:
- `useState` untuk local state
- `useMemo` untuk computed values
- No external state library needed

### Performance
- Lazy calculation (hanya saat user berinteraksi)
- Memoization untuk expensive operations
- Smooth animations dengan CSS transitions

### Accessibility
- Keyboard navigation support
- ARIA labels untuk screen readers
- High contrast colors

---

## User Guide

### Untuk Dosen/Peneliti
1. Gunakan **ML Playground** untuk demonstrasi konsep ML
2. Gunakan **What-If** untuk analisis kebijakan
3. Gunakan **Data Explorer** untuk validasi data

### Untuk Mahasiswa
1. Eksperimen dengan **ML Playground** untuk pemahaman algoritma
2. Bangun dashboard dengan **BI Builder** untuk latihan desain
3. Simulasi skenario dengan **What-If** untuk analisis kasus

### Untuk Pemerintah
1. **BI Builder** untuk personalisasi view
2. **What-If** untuk perencanaan anggaran
3. **Data Explorer** untuk monitoring real-time

---

## Future Enhancements

### Phase 2 (Next Semester)
1. **Save/Load Session:** Simpan konfigurasi user
2. **Compare Scenarios:** Bandingkan multiple what-if scenarios
3. **Chart Rendering:** Render real charts (Recharts integration)
4. **Data Export:** CSV, PDF, Excel export

### Phase 3 (Advanced)
1. **Real-time Collaboration:** Multi-user editing
2. **AI Assistant:** Rekomendasi otomatis untuk BI Builder
3. **Advanced ML:** Upload custom dataset untuk training
4. **Mobile App:** Native app untuk Camat

---

## Conclusion

Dashboard sekarang menjadi **platform eksplorasi interaktif**, bukan hanya reporting tool. User bisa:
- 🧠 Belajar ML dengan eksperimen
- 🎨 Design dashboard sendiri
- 🧮 Simulasi kebijakan
- 🔍 Explore data secara mandiri

Semua tanpa coding! 🎉
