# UMKM Dashboard - Implementation Plan

Dokumen ini adalah rencana implementasi komprehensif untuk dashboard pemberdayaan UMKM berbasis BI → DSS → keputusan data-driven, mengacu pada implementasi aktif saat ini.

## 1. Executive Summary
- Tujuan: menerjemahkan data UMKM Jawa Barat menjadi insight prioritas wilayah, membandingkan opsi kebijakan pemberdayaan, lalu memilih keputusan paling efektif dan layak.
- Deliverable utama: dashboard satu halaman yang menampilkan KPI UMKM, analisis BI, tabel alternatif DSS, dan keputusan akhir berbasis data.
- Stack: Next.js 16 App Router, TypeScript, Tailwind CSS v4, Recharts, data CSV terstruktur.
- Status implementasi: UI dan data pipeline aktif; dokumen ini memformalkan metodologi dan roadmap.

## 2. Project Overview
- Domain: Smart City (fokus Smart Governance & Smart Economy) dengan konteks pemberdayaan UMKM berbasis data.
- Stakeholder: pemda/bappeda, dinas koperasi & UMKM, pengambil kebijakan, tim operasional.
- Alur keputusan: Data CSV → KPI UMKM → Analisis BI → Insight → DSS → Keputusan.
- Target output: rekomendasi program pemberdayaan yang seimbang pada dampak, biaya, risiko, dan keterbatasan anggaran.

## 3. Dataset Analysis & Transformation
- **Sumber data:** `dataset_umkm_jabar_1000rows.csv`
- **Data olahan:** `src/data/umkm-dashboard.json`
- **Struktur JSON aktif:**
  - `meta` (sumber, jumlahBaris, tahun, catatanMetodologi)
  - `kpi` (totalUmkm, rataUmkmPer1000Penduduk, rataPersenUmkmFormal, rataOmzetBulananJuta)
  - `prioritas` (array wilayah prioritas dengan KPI lengkap)
  - `insight` (narasi + wilayahPrioritasUtama + wilayahPalingStabil)
  - `alternatifDss` (opsi program + skor)
  - `keputusan` (pilihanUtama, alasan, wilayahImplementasi)

## 4. KPI Methodology
**KPI Utama UMKM:**
- **totalUmkm:** Total unit UMKM Jawa Barat
- **rataUmkmPer1000Penduduk:** Kepadatan UMKM relatif per 1000 penduduk
- **rataPersenUmkmFormal:** Rata-rata tingkat formalisasi UMKM (%)
- **rataOmzetBulananJuta:** Rata-rata omzet bulanan UMKM (juta rupiah)

**KPI per Wilayah Prioritas:**
- umkmPer1000Penduduk
- persenUmkmFormal
- persenUmkmDigital
- persenAksesPembiayaan
- indeksBiayaLogistik
- skorPrioritas (komposit terbobot)

**Metode Normalisasi:**
Min-Max scaling pada himpunan kecamatan yang dibandingkan untuk skor komposit.

## 5. BI Workflow Implementation (6 Phases)
- **Fase 1 - KPI:** tetapkan indikator jumlah UMKM, tingkat formalisasi, digitalisasi, akses pembiayaan, dan omzet.
- **Fase 2 - Diagnosa:** petakan kecamatan paling membutuhkan pemberdayaan dari kombinasi KPI utama.
- **Fase 3 - BI Dashboard:** sajikan visual komparatif per kecamatan prioritas untuk membaca pola UMKM.
- **Fase 4 - Insight:** rangkum temuan kritis yang berdampak langsung pada strategi pemberdayaan UMKM.
- **Fase 5 - DSS:** bandingkan minimal empat alternatif program pemberdayaan berdasarkan dampak, biaya, risiko.
- **Fase 6 - Keputusan:** pilih program terbaik berbasis data dan batas anggaran, lalu tetapkan wilayah fokus implementasi.

## 6. Architecture & Component Design
- Layout root: `src/app/layout.tsx`
- Halaman utama: `src/app/page.tsx`
- Styling global + token visual: `src/app/globals.css`
- Data layer: `src/data/umkm-dashboard.json`
- Komponen chart: `src/components/charts/`
  - UmkmDensityChart
  - UmkmFormalDigitalChart
  - UmkmFinanceChart
  - OmzetTenagaKerjaScatter
- Komponen DSS: `src/components/dss/`
  - AlternativesTable
  - DecisionPanel
- Komponen diskusi: `src/components/discussion/`
  - DiscussionBrief

## 7. UI/UX Design Specifications
- Arah visual: profesional, modern, data-centric
- Tipografi:
  - Sans: Plus Jakarta Sans
  - Display/heading: Space Grotesk
- Hierarki visual: Ringkasan (hero + KPI) → analitik (charts) → keputusan (decision panel)
- Bahasa antarmuka: Indonesia
- Prinsip konten: singkat, operasional, bisa dibaca cepat oleh pengambil keputusan

## 8. Visualization Specifications
- Library: Recharts untuk semua chart interaktif
- Chart utama:
  - **Density Chart:** Bar chart kepadatan UMKM per 1000 penduduk
  - **Formal/Digital Chart:** Grouped bar tingkat formalisasi vs digitalisasi
  - **Finance Chart:** Bar chart akses pembiayaan per wilayah
  - **Scatter Plot:** Omzet vs Tenaga Kerja dengan ukuran titik = skor prioritas
- Format nilai: `Intl.NumberFormat("id-ID")` untuk konsistensi
- Responsif: Charts adaptif pada mobile, tablet, desktop

## 9. DSS Framework (MCDA)
- Tujuan: membandingkan program pemberdayaan UMKM secara objektif
- Kriteria evaluasi:
  - Dampak terhadap UMKM
  - Biaya implementasi
  - Risiko kegagalan
  - Kesesuaian dengan anggaran tersedia
- Skor output:
  - `skorEfektivitas` (0-100)
  - `skorKelayakanAnggaran` (0-100)
  - `skorTotal` (weighted average)
- Alternatif tersortir otomatis berdasarkan skorTotal descending

## 10. Decision-Making Module
- Input: Hasil scoring DSS + insight BI
- Output: Program terpilih dengan alasan jelas dan target wilayah spesifik
- Prinsip: Keputusan harus traceable ke KPI, insight, dan hasil komparasi DSS
- Komponen: DecisionPanel menampilkan pilihan utama, alasan, dan wilayah implementasi

## 11. Responsive Design Strategy
- Breakpoint CSS:
  - >= 640px: KPI grid 2 kolom
  - >= 1024px: KPI grid 4 kolom, layout charts multi-kolom
- Mobile-first approach: Default 1 kolom, tabel dengan `overflow-x: auto`
- Target: Keterbacaan optimal pada mobile, tablet, desktop

## 12. Accessibility Considerations
- Sudah ada:
  - `html lang="id"`
  - ARIA labels pada region penting
  - Struktur heading hierarkis
- Prioritas peningkatan:
  - Keyboard navigation testing
  - WCAG contrast audit
  - Screen reader optimization
  - verifikasi focus-visible konsisten

## 13. Implementation Phases
- **Phase A (Data Foundation):** Validasi CSV, transformasi ke JSON terstruktur
- **Phase B (Dashboard Core):** Hero, KPI cards, charts, insight BI
- **Phase C (DSS & Decision):** Tabel alternatif, decision panel, diskusi
- **Phase D (Quality):** Testing (vitest), lint, build verification
- **Phase E (Documentation):** Panduan pengguna, dokumentasi teknis

## 14. Testing Strategy
- **Unit tests:** Vitest + React Testing Library
  - Component rendering tests
  - Integration tests untuk Home page
  - Snapshot tests untuk critical components
- **Build verification:**
  - `npm run build` (production build)
  - `npm run lint` (ESLint checks)
  - `npm test` (full test suite)
- **Manual QA:**
  - Cross-browser testing (Chrome, Firefox, Safari)
  - Responsive layout verification
  - Data accuracy validation

## 15. Future Enhancements Roadmap
- **Short-term:**
  - Interactive filters per wilayah/tahun
  - Export functionality (PDF/CSV)
  - Enhanced tooltips pada charts
- **Mid-term:**
  - Real-time data via API
  - Historical trend analysis
  - Scenario simulation module
## 16. Appendix

**Referensi Internal:**
- Data: `src/data/umkm-dashboard.json`
- Main page: `src/app/page.tsx`
- Styles: `src/app/globals.css`
- Layout: `src/app/layout.tsx`
- Charts: `src/components/charts/`
- DSS: `src/components/dss/`
- Discussion: `src/components/discussion/`
- Guide: `docs/umkm-dashboard-bi-dss-guide.md`

**Referensi Eksternal:**
- Next.js: https://nextjs.org/docs/app
- Recharts: https://recharts.org/en-US/examples
- WCAG: https://www.w3.org/WAI/WCAG22/quickref/
- Tailwind CSS: https://tailwindcss.com/docs

---

## Validation Checklist
- [x] Dashboard menampilkan data CSV UMKM Jawa Barat
- [x] 4 KPI utama tampil dengan format Indonesia
- [x] 4 charts interaktif (density, formal/digital, finance, scatter)
- [x] Insight BI dengan wilayah prioritas
- [x] Tabel DSS dengan sorting otomatis
- [x] Decision panel dengan alasan dan wilayah
- [x] Diskusi Smart City pillars terintegrasi
- [x] Tests (vitest) berjalan dan pass
- [x] Build production berhasil
- [x] Dokumentasi panduan lengkap
- [x] Responsive mobile/tablet/desktop
- [x] Accessibility basics (ARIA, semantic HTML)
- [x] File `docs/plan.md` dibuat
- [x] 16 section tersedia
- [x] Formula KPI sesuai sumber data
- [x] DSS weights sesuai plan
- [x] Token dan breakpoint sesuai CSS aktif
