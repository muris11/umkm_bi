# 📊 Dashboard UMKM Jawa Barat

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Portal Data Terbuka untuk Usaha Mikro, Kecil, dan Menengah di Provinsi Jawa Barat**

[Live Demo](#) • [Dokumentasi](#dokumentasi) • [Kontribusi](#kontribusi)

</div>

---

## 🌟 Tentang Proyek

Dashboard UMKM Jawa Barat adalah portal data terbuka yang menyediakan visualisasi dan analisis komprehensif mengenai perkembangan **9.4+ Juta** unit usaha mikro, kecil, dan menengah di seluruh **27 Kabupaten/Kota** Provinsi Jawa Barat.

Portal ini dibangun untuk mendukung transparansi data publik, membantu pengambilan keputusan berbasis data, dan memberikan wawasan mendalam tentang potensi ekonomi UMKM di Jawa Barat.

### ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🗺️ **Peta Interaktif** | Visualisasi geospasial sebaran UMKM per wilayah menggunakan Leaflet |
| 📈 **Dashboard Analitik** | Grafik dan chart interaktif untuk analisis data UMKM |
| 🔍 **Filter Dinamis** | Filter berdasarkan tahun, kabupaten/kota, dan sektor usaha |
| 📥 **Download Center** | Unduh dataset lengkap dalam format CSV/Excel |
| 📱 **Responsif** | Tampilan optimal di desktop, tablet, dan mobile |
| ⚡ **Performa Tinggi** | Optimasi gambar dan lazy loading untuk kecepatan maksimal |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Data & Processing
- **Data Source**: Open Data Jawa Barat, BPS, dan Dinas Koperasi UMKM
- **Data Format**: JSON (6.7MB dataset)
- **Processing**: Python scripts untuk ETL pipeline

### DevOps
- **Package Manager**: npm
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Image Optimization**: Sharp
- **Deployment**: Vercel

---

## 📁 Struktur Proyek

```
dashboard-app/
├── public/                 # Static assets
│   └── logo.png           # Logo aplikasi
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/         # Halaman metodologi
│   │   ├── dashboard/     # Halaman dashboard utama
│   │   ├── download/      # Halaman download center
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   ├── landing/       # Komponen landing page
│   │   ├── layout/        # Navbar, Footer, dll
│   │   ├── maps/          # Komponen peta Leaflet
│   │   └── ui/            # Komponen UI reusable
│   ├── data/              # Dataset JSON
│   │   └── umkm-jabar-full.json
│   ├── features/
│   │   └── dashboard/     # Fitur dashboard (charts, filters, sections)
│   └── lib/               # Utility functions
├── scripts/               # Python scripts untuk data processing
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Instalasi & Penggunaan

### Prasyarat
- Node.js 18+ 
- npm atau yarn
- Python 3.8+ (opsional, untuk data processing)

### Langkah Instalasi

```bash
# 1. Clone repository
git clone https://github.com/muris11/umkm_bi.git
cd umkm_bi/dashboard-app

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Build untuk Produksi

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

### Menjalankan Tests

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

---

## 📊 Sumber Data

Data yang digunakan dalam dashboard ini bersumber dari:

1. **Open Data Jawa Barat** - Portal data terbuka resmi Pemprov Jabar
2. **Badan Pusat Statistik (BPS)** - Data statistik UMKM nasional
3. **Dinas Koperasi dan UMKM Jabar** - Data sektoral dan digitalisasi
4. **Bank Indonesia** - Data kontribusi PDRB

> ⚠️ **Disclaimer**: Data yang ditampilkan merupakan agregasi dan simulasi untuk keperluan demonstrasi dashboard. Untuk data resmi, silakan merujuk ke sumber asli.

---

## 🎨 Screenshots

### Landing Page
Tampilan halaman utama dengan hero section, statistik, dan peta interaktif.

### Dashboard
Visualisasi data dengan chart interaktif dan filter dinamis.

### Download Center
Pusat unduhan dataset dengan berbagai format.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan ikuti langkah berikut:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👤 Author

<div align="center">

**muris11**

[![GitHub](https://img.shields.io/badge/GitHub-muris11-181717?style=for-the-badge&logo=github)](https://github.com/muris11)

</div>

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Composable charting library
- [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Platform for frontend developers

---

<div align="center">

**Dibuat dengan ❤️ untuk kemajuan UMKM Jawa Barat**

© 2025 Dashboard UMKM Jawa Barat

</div>
