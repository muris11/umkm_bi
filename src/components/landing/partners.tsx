"use client"

import { motion } from "framer-motion"

export function Partners() {
  const partners = [
    "Pemerintah Provinsi Jawa Barat",
    "Dinas Koperasi & Usaha Kecil",
    "Badan Pusat Statistik",
    "Satu Data Indonesia",
    "Bank Indonesia Perwakilan Jabar",
  ]

  return (
    <section className="py-12 border-b border-slate-100 bg-white">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">
            Sumber Data & Kolaborasi Strategis
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           {/* Placeholder text logos since we don't have real svg assets yet, keeping it clean */}
           {partners.map((partner, i) => (
             <motion.span 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-lg md:text-xl font-bold font-grotesk text-slate-800"
             >
                {partner}
             </motion.span>
           ))}
        </div>
      </div>
    </section>
  )
}
