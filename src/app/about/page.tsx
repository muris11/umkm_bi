import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 mb-8 text-center">Tentang & Metodologi</h1>
        
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Latar Belakang</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                    Dashboard UMKM Jawa Barat dibangun sebagai inisiatif transparansi data untuk memetakan potensi dan tantangan Usaha Mikro, Kecil, dan Menengah di 27 Kabupaten/Kota. Platform ini menyediakan data real-time (simulasi) yang dapat diakses oleh publik, akademisi, dan pemerintah daerah.
                </p>
            </section>

             <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Metodologi Pengukuran</h2>
                <Card className="border-slate-200">
                    <CardContent className="pt-6">
                        <div className="prose prose-slate max-w-none">
                            <h3 className="text-lg font-bold text-slate-800">1. Indeks Prioritas Wilayah</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Penentuan wilayah prioritas menggunakan metode <strong>Weighted Product (WP)</strong> dengan variabel pembobot sebagai berikut:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                                <li className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <span className="font-bold text-slate-900 block">Formalisasi (30%)</span>
                                    Persentase UMKM yang memiliki NIB/Izin usaha. Semakin rendah, semakin prioritas.
                                </li>
                                <li className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <span className="font-bold text-slate-900 block">Digitalisasi (25%)</span>
                                    Persentase UMKM yang menggunakan platform digital. Semakin rendah, semakin prioritas.
                                </li>
                                <li className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <span className="font-bold text-slate-900 block">Akses Pembiayaan (20%)</span>
                                    Keterjangkauan kredit perbankan. Semakin rendah, semakin prioritas.
                                </li>
                                <li className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <span className="font-bold text-slate-900 block">Biaya Logistik (15%)</span>
                                    Indeks kemahalan distribusi barang. Semakin tinggi, semakin prioritas.
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                 <h2 className="text-2xl font-bold text-brand-teal mb-4">Sumber Data</h2>
                 <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>
                        <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">
                            Open Data Jabar — UMKM Binaan Berdasarkan Jenis Usaha (2019–2023)
                        </a>
                    </li>
                    <li>
                        <a href="https://data.go.id/dataset/jumlah-usaha-mikro-kecil-dan-menengah-umkm-binaan-berdasarkan-jenis-usaha-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">
                            Satu Data Indonesia (Mirror Metadata UMKM Jabar)
                        </a>
                    </li>
                    <li>
                        <a href="https://opendata.jabarprov.go.id/id/dataset/proyeksi-penduduk-berdasarkan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">
                            Open Data Jabar — Jumlah Penduduk per Kab/Kota (2010–2025)
                        </a>
                    </li>
                    <li>
                        <a href="https://opendata.jabarprov.go.id/id/dataset/jumlah-pengangguran-terbuka-berdasarkan-pendidikan-dan-kabupatenkota-di-jawa-barat" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">
                            Open Data Jabar — Pengangguran Terbuka per Kab/Kota (2011–2024)
                        </a>
                    </li>

                 </ul>
            </section>
        </div>
      </div>
    </div>
  )
}
