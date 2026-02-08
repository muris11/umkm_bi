"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Cog, Gavel, Leaf, Monitor, Shirt, ShoppingBag, Utensils, type LucideIcon } from "lucide-react"
import Link from "next/link"

interface SectorData {
  sektor: string;
  totalUmkm: number;
}

interface SectorHighlightProps {
  sectors: SectorData[];
}

const SECTOR_ICONS: Record<string, LucideIcon> = {
  'Kuliner': Utensils,
  'Fashion': Shirt,
  'Kerajinan': Gavel,
  'Jasa': Cog,
  'Pertanian Olahan': Leaf,
  'Perdagangan': ShoppingBag,
  'Teknologi': Monitor,
};

const SECTOR_DESCRIPTIONS: Record<string, string> = {
  'Kuliner': 'Didominasi oleh industri makanan olahan',
  'Fashion': 'Tekstil dan produk garmen berkualitas',
  'Kerajinan': 'Kriya lokal dengan nilai ekspor',
  'Jasa': 'Layanan profesional dan pariwisata',
  'Pertanian Olahan': 'Hilirisasi produk agro',
  'Perdagangan': 'Retail dan grosir konvensional',
  'Teknologi': 'Startup dan solusi digital',
};

function formatSectorCount(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M+`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K+`;
  }
  return `${num}+`;
}

export function SectorHighlight({ sectors }: SectorHighlightProps) {
  const sortedSectors = [...sectors].sort((a, b) => b.totalUmkm - a.totalUmkm).slice(0, 7);

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
            {sortedSectors.map((sector, i) => {
                const IconComponent = SECTOR_ICONS[sector.sektor] || Cog;
                const description = SECTOR_DESCRIPTIONS[sector.sektor] || 'Sektor usaha unggulan';
                return (
                 <motion.div
                    key={sector.sektor}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="group"
                 >
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-teal/30 hover:shadow-lg transition-all h-full cursor-default">
                        <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                            <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{sector.sektor}</h3>
                        <div className="text-brand-teal font-semibold text-sm mb-2">{formatSectorCount(sector.totalUmkm)} <span className="text-slate-400 font-normal">Unit Usaha</span></div>
                        <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
                    </div>
                 </motion.div>
                );
            })}
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
