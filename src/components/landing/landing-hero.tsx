"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart3, ChevronRight } from "lucide-react"
import Link from "next/link"
import { StatsTicker } from "./stats-ticker"

interface LandingHeroProps {
  totalUmkm: number;
  totalTenagaKerja: number;
  avgPersenDigital: number;
  totalWilayah: number;
  totalSektor: number;
}

export function LandingHero({ totalUmkm, totalTenagaKerja, avgPersenDigital, totalWilayah, totalSektor }: LandingHeroProps) {
  return (
    <section className="relative pt-20 overflow-hidden flex flex-col min-h-[90vh] justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] -z-10" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-teal/10 blur-[100px]" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 text-center z-10 pt-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-all cursor-default"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Update Data Terbaru: 2025
        </motion.div>

        <motion.h1
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }} 
           className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-grotesk tracking-tight text-slate-900 mb-6 sm:mb-8 leading-[0.9] px-4"
        >
          Data UMKM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">
            Jawa Barat
          </span>
        </motion.h1>

        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          Portal resmi integrasi data Usaha Mikro, Kecil, dan Menengah. 
          Pantau pertumbuhan, sebaran, dan potensi ekonomi di {totalWilayah} Kabupaten/Kota.
        </motion.p>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto rounded-full shadow-xl shadow-brand-teal/20 bg-brand-teal hover:bg-brand-teal/90">
              <BarChart3 className="mr-2 h-5 w-5" />
              Explorasi Dashboard
            </Button>
          </Link>
          <Link href="/about">
             <Button variant="ghost" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto rounded-full text-slate-600 hover:bg-slate-100">
              Pelajari Metodologi <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 0.5 }}
         className="mt-20 w-full"
      >
        <StatsTicker 
          totalUmkm={totalUmkm}
          totalTenagaKerja={totalTenagaKerja}
          avgPersenDigital={avgPersenDigital}
          totalWilayah={totalWilayah}
          totalSektor={totalSektor}
        />
      </motion.div>
    </section>
  )
}
