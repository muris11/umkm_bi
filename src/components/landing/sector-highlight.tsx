"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Cog, Gavel, Leaf, Monitor, Shirt, ShoppingBag, Utensils } from "lucide-react"
import Link from "next/link"

export function SectorHighlight() {
  const sectors = [
    { name: "Kuliner", icon: Utensils, count: "3.2M+", desc: "Didominasi oleh industri makanan olahan" },
    { name: "Fashion", icon: Shirt, count: "1.8M+", desc: "Tekstil dan produk garmen berkualitas" },
    { name: "Kerajinan", icon: Gavel, count: "850K+", desc: "Kriya lokal dengan nilai ekspor" },
    { name: "Jasa", icon: Cog, count: "1.5M+", desc: "Layanan profesional dan pariwisata" },
    { name: "Pertanian Olahan", icon: Leaf, count: "920K+", desc: "Hilirisasi produk agro" },
    { name: "Perdagangan", icon: ShoppingBag, count: "2.1M+", desc: "Retail dan grosir konvensional" },
    { name: "Teknologi", icon: Monitor, count: "125K+", desc: "Startup dan solusi digital" },
  ]

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 mb-4">
                    Sebaran Sektor Unggulan
                </h2>
                <p className="text-slate-600 text-lg">
                    Jawa Barat memiliki ekosistem UMKM yang beragam, didominasi oleh ekonomi kreatif dan industri pengolahan.
                </p>
            </div>
            <Link href="/dashboard">
                <Button variant="outline" className="hidden md:flex gap-2">
                    Lihat Semua Sektor <ArrowRight className="h-4 w-4" />
                </Button>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sector, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                 >
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-lg transition-all h-full cursor-default">
                        <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                            <sector.icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{sector.name}</h3>
                        <div className="text-brand-teal font-semibold text-sm mb-2">{sector.count} <span className="text-slate-400 font-normal">Unit Usaha</span></div>
                        <p className="text-sm text-slate-500 line-clamp-2">{sector.desc}</p>
                    </div>
                 </motion.div>
            ))}
             <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-6"
             >
                <Link href="/dashboard" className="text-center group">
                    <div className="h-12 w-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3 group-hover:border-brand-teal group-hover:text-brand-teal transition-all">
                        <ArrowRight className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-slate-600 group-hover:text-brand-teal transition-colors">Tampilkan Lainnya</span>
                </Link>
             </motion.div>
        </div>
      </div>
    </section>
  )
}
