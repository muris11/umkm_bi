import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Download, FileSpreadsheet } from "lucide-react"
import Link from "next/link"

export default function DownloadPage() {
  const datasets = [
    {
      title: "Dataset Lengkap UMKM Jabar 2024-2025",
      description: "Data mentah (raw data) mencakup seluruh variabel di level kecamatan.",
      format: "JSON/CSV",
      size: "6.5 MB",
      date: "08 Feb 2026",
      link: "/api/download?type=full" 
    },
    {
      title: "Ringkasan Per Kabupaten/Kota",
      description: "Agregasi data indikator utama UMKM per wilayah administrasi.",
      format: "CSV",
      size: "45 KB",
      date: "08 Feb 2026",
      link: "/api/download?type=kabkota"
    },
    {
      title: "Analisis Sektor Usaha",
      description: "Data persebaran dan kinerja berdasarkan kategori sektor usaha.",
      format: "CSV",
      size: "28 KB",
      date: "08 Feb 2026",
      link: "/api/download?type=sektor"
    }
  ]

  return (
    <div className="container mx-auto px-4 pt-24 md:pt-28 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 md:mb-10 text-center">
             <div className="inline-flex items-center justify-center p-3 bg-brand-teal/10 rounded-2xl mb-4 text-brand-teal">
                <Database className="w-8 h-8" />
             </div>
            <h1 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 mb-4">Download Center</h1>
            <p className="text-slate-600 text-lg leading-relaxed">
                Unduh dataset resmi UMKM Jawa Barat untuk keperluan analisis, penelitian, dan pengembangan kebijakan.
            </p>
        </div>

        <div className="grid gap-6">
          {datasets.map((dataset, i) => (
            <Card key={i} className="hover:shadow-md transition-all border-slate-200">
                <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <CardTitle className="text-lg md:text-xl font-bold text-slate-900 mb-2">{dataset.title}</CardTitle>
                            <CardDescription className="text-slate-500 text-sm md:text-base">{dataset.description}</CardDescription>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500 shrink-0">
                            <FileSpreadsheet className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-slate-100 gap-4">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400 font-medium">
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{dataset.format}</span>
                            <span className="hidden md:inline">•</span>
                            <span>{dataset.size}</span>
                            <span className="hidden md:inline">•</span>
                            <span>Update: {dataset.date}</span>
                        </div>

                        <a href={dataset.link} download className="w-full md:w-auto">
                           <Button variant="outline" size="sm" className="gap-2 w-full md:w-auto justify-center">
                                <Download className="w-4 h-4" />
                                Download File
                           </Button>
                        </a>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12">
            <h3 className="text-xl font-bold font-grotesk text-slate-900 mb-4">Sumber Referensi Resmi</h3>
            <p className="text-slate-600 mb-4">
                Yang ada adalah link sumber rujukan resmi yang aku pakai buat struktur variabel & cakupan wilayah (biar formatnya mirip dataset pemerintah dan bisa dipakai buat BI→DSS):
            </p>
            <ul className="space-y-4">
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-3 group">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm md:text-base leading-relaxed text-slate-700 group-hover:text-brand-teal transition-colors">
                            <strong>Open Data Jabar</strong> — UMKM binaan berdasarkan jenis usaha (data real, 2019–2023)
                        </span>
                    </a>
                </li>
                <li>
                    <a href="https://data.go.id/dataset/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-3 group">
                         <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm md:text-base leading-relaxed text-slate-700 group-hover:text-brand-teal transition-colors">
                            <strong>Satu Data Indonesia</strong> — Mirror metadata dataset UMKM binaan Jabar
                        </span>
                    </a>
                </li>
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/proyeksi-penduduk-berdasarkan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-3 group">
                         <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm md:text-base leading-relaxed text-slate-700 group-hover:text-brand-teal transition-colors">
                            <strong>Open Data Jabar</strong> — Jumlah penduduk per kab/kota (2010–2025)
                        </span>
                    </a>
                </li>
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-pengangguran-terbuka-berdasarkan-pendidikan-dan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-3 group">
                         <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm md:text-base leading-relaxed text-slate-700 group-hover:text-brand-teal transition-colors">
                            <strong>Open Data Jabar</strong> — Pengangguran terbuka per kab/kota (2011–2024)
                        </span>
                    </a>
                </li>
            </ul>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <h4 className="font-bold text-blue-900 mb-2">Butuh Data Spesifik?</h4>
            <p className="text-blue-700 text-sm mb-4">
                Gunakan fitur filter di halaman Dashboard untuk menyeleksi data yang Anda butuhkan, lalu unduh secara spesifik.
            </p>
            <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">Ke Dashboard</Button>
            </Link>
        </div>
      </div>
    </div>
  )
}
