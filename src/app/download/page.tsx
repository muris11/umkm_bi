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
    <div className="container mx-auto px-4 pt-28 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
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
                    <div className="flex items-start justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-slate-900 mb-2">{dataset.title}</CardTitle>
                            <CardDescription className="text-slate-500">{dataset.description}</CardDescription>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                            <FileSpreadsheet className="w-6 h-6" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                            <span>{dataset.format}</span>
                            <span>•</span>
                            <span>{dataset.size}</span>
                            <span>•</span>
                            <span>Update: {dataset.date}</span>
                        </div>

                        <a href={dataset.link} download>
                           {/* For demo, we direct to dashboard download button or simulate link */}
                           <Button variant="outline" size="sm" className="gap-2">
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
            <ul className="space-y-3">
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                        <span>(1) Open Data Jabar — UMKM binaan berdasarkan jenis usaha (data real, 2019–2023)</span>
                    </a>
                </li>
                <li>
                    <a href="https://data.go.id/dataset/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-2">
                         <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                        <span>(2) Satu Data Indonesia (Mirror metadata dataset UMKM binaan Jabar)</span>
                    </a>
                </li>
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/proyeksi-penduduk-berdasarkan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-2">
                         <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                        <span>(3) Open Data Jabar — Jumlah penduduk per kab/kota (2010–2025)</span>
                    </a>
                </li>
                <li>
                    <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-pengangguran-terbuka-berdasarkan-pendidikan-dan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline flex items-start gap-2">
                         <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-teal flex-shrink-0" />
                        <span>(4) Open Data Jabar — Pengangguran terbuka per kab/kota (2011–2024)</span>
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
