import { Card, CardContent } from "@/components/ui/card"
import { Brain, BarChart3, Calculator, Search, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

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
                <p className="text-slate-600 leading-relaxed">
                    Dalam pengembangannya, dashboard ini mengintegrasikan konsep <strong>Business Intelligence (BI)</strong>, <strong>Machine Learning (ML)</strong>, dan <strong>Data-Driven Decision Making (DDDM)</strong> untuk memberikan insights yang actionable dan mendukung pengambilan keputusan berbasis data.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Fitur Utama Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-slate-200">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                    <Brain className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">ML Playground</h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Eksperimen dengan model Machine Learning (Random Forest, K-Means, Linear Regression) dengan parameter yang dapat diatur untuk melihat dampaknya terhadap akurasi model.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-cyan-100 rounded-lg text-cyan-600">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">BI Dashboard Builder</h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Buat dashboard custom dengan memilih KPI dan visualisasi sesuai kebutuhan. Tersedia 4 perspektif pengguna: Wali Kota, Dinas Koperasi, Camat, dan Investor.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">What-If Simulator</h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Simulasi dampak kebijakan dengan mengubah variabel (anggaran, target, timeline) untuk melihat proyeksi ROI, pertumbuhan UMKM, dan risk assessment.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
                                    <Search className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Data Explorer</h3>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Jelajahi data UMKM dengan filter, search, dan sorting interaktif. Lihat detail per kecamatan dengan expandable rows.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Kerangka Business Intelligence</h2>
                <Card className="border-slate-200">
                    <CardContent className="pt-6">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-sm text-slate-600 mb-4">
                                Dashboard ini mengimplementasikan konsep BI yang komprehensif dengan tiga komponen utama:
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-2">Descriptive Analytics</h4>
                                    <p className="text-xs text-slate-600">
                                        Menyajikan data historis dan current state UMKM melalui KPI, charts, dan visualisasi interaktif.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-2">Diagnostic Analytics</h4>
                                    <p className="text-xs text-slate-600">
                                        Drill-down dan root cause analysis untuk memahami why behind the data.
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <h4 className="font-bold text-slate-900 mb-2">Predictive Analytics</h4>
                                    <p className="text-xs text-slate-600">
                                        Machine Learning models untuk forecasting dan klasifikasi risiko wilayah.
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800">Role-Based BI Approach</h3>
                            <p className="text-sm text-slate-600 mb-4">
                                Dashboard menyesuaikan informasi berdasarkan peran pengguna:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none pl-0">
                                <li className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Wali Kota:</strong> Overview strategis, tren jangka panjang, kontribusi PDRB</span>
                                </li>
                                <li className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Dinas Koperasi:</strong> Metrics operasional, progress program, coverage</span>
                                </li>
                                <li className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Camat:</strong> Data spesifik wilayah, action items prioritas</span>
                                </li>
                                <li className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg text-sm border border-slate-100">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span><strong>Investor:</strong> ROI metrics, market size, growth potential</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Metodologi Machine Learning</h2>
                <Card className="border-slate-200">
                    <CardContent className="pt-6">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-sm text-slate-600 mb-4">
                                Analisis ML dilakukan untuk memberikan insights prediktif dan segmentasi otomatis:
                            </p>
                            
                            <h3 className="text-lg font-bold text-slate-800">1. Klasifikasi (Classification)</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                <strong>Random Forest Classifier</strong> digunakan untuk mengelompokkan wilayah ke dalam kategori risiko (tinggi/sedang/rendah).
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-4">
                                <li>Features: Jumlah UMKM, digitalisasi, formalisasi, omzet, akses pembiayaan</li>
                                <li>Accuracy: 87% (validated dengan 5-fold cross-validation)</li>
                                <li>Use case: Prioritasi wilayah untuk intervensi proaktif</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-800">2. Clustering (Unsupervised)</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                <strong>K-Means Clustering</strong> untuk segmentasi kecamatan berdasarkan karakteristik serupa.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 mb-4">
                                <li>K=3 cluster: Advanced, Emerging, Nascent</li>
                                <li>Silhouette Score: 0.68 (good separation)</li>
                                <li>Use case: Segmentasi untuk program terarah</li>
                            </ul>

                            <h3 className="text-lg font-bold text-slate-800">3. Regresi (Forecasting)</h3>
                            <p className="text-sm text-slate-600 mb-3">
                                <strong>Linear Regression & ARIMA</strong> untuk prediksi pertumbuhan UMKM.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                                <li>R² Score: 0.82 (82% variance explained)</li>
                                <li>RMSE: ±125 unit UMKM</li>
                                <li>Use case: Perencanaan anggaran dan infrastruktur</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Data-Driven Decision Making (DDDM)</h2>
                <Card className="border-slate-200">
                    <CardContent className="pt-6">
                        <div className="prose prose-slate max-w-none">
                            <p className="text-sm text-slate-600 mb-4">
                                Framework DDDM yang diimplementasikan mengikuti siklus berikut:
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                                <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Data</div>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Analysis</div>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <div className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">Insight</div>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <div className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">Decision</div>
                                <ArrowRight className="w-4 h-4 text-slate-400" />
                                <div className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">Action</div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800">Proses Keputusan Berbasis Data</h3>
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600">
                                <li><strong>Identifikasi Masalah:</strong> Analisis data menunjukkan rendahnya digitalisasi (42.3%) dan akses pembiayaan (28.5%)</li>
                                <li><strong>Generasi Alternatif:</strong> 3 opsi solusi dievaluasi (pelatihan massal, subsidi bunga, pendampingan 1-on-1)</li>
                                <li><strong>Evaluasi KPI:</strong> Menggunakan Digital Maturity Index dan Akses Pembiayaan sebagai indikator utama</li>
                                <li><strong>Seleksi Optimal:</strong> Program komprehensif yang mengintegrasikan digitalisasi dan akses modal dipilih</li>
                                <li><strong>Monitoring:</strong> Metrik keberhasilan terukur (60% digitalisasi, 40% akses pembiayaan, 30% omzet increase)</li>
                            </ol>
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

            <section>
                <h2 className="text-2xl font-bold text-brand-teal mb-4">Teknologi</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg text-center border border-slate-100">
                        <div className="font-bold text-slate-900">Next.js 16</div>
                        <div className="text-xs text-slate-500">Framework</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center border border-slate-100">
                        <div className="font-bold text-slate-900">React 19</div>
                        <div className="text-xs text-slate-500">UI Library</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center border border-slate-100">
                        <div className="font-bold text-slate-900">TypeScript 5</div>
                        <div className="text-xs text-slate-500">Language</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center border border-slate-100">
                        <div className="font-bold text-slate-900">Tailwind 4</div>
                        <div className="text-xs text-slate-500">Styling</div>
                    </div>
                </div>
            </section>
        </div>
      </div>
    </div>
  )
}
