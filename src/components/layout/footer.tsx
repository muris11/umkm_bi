import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src="/logo.png" alt="Logo UMKM Jabar" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold font-grotesk tracking-tight text-slate-900 leading-none">
                      UMKM Jabar
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Data & Analisis Terbuka</span>
                </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Portal data terbuka untuk memantau perkembangan Usaha Mikro, Kecil, dan Menengah di Provinsi Jawa Barat. Transparan, Akurat, dan Terkini.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/dashboard" className="hover:text-brand-teal">Dashboard Data</Link></li>
              <li><Link href="/download" className="hover:text-brand-teal">Download Center</Link></li>
              <li><Link href="/about" className="hover:text-brand-teal">Metodologi</Link></li>
              <li><Link href="/about" className="hover:text-brand-teal">Tentang Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Dinas Koperasi & UMKM</li>
              <li>Provinsi Jawa Barat</li>
              <li>Jl. Soekarno Hatta No. 123</li>
              <li>Bandung, Jawa Barat</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Pemprov Jawa Barat. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
