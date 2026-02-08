"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Map } from "lucide-react"
import Link from "next/link"
import { MapWrapper } from "../maps/map-wrapper"

interface MapPreviewProps {
  data: { kabKota: string; count: number }[];
}

export function MapPreview({ data }: MapPreviewProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Visualisasi Geospasial
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-grotesk mb-6 leading-tight">
                        Peta Sebaran Interaktif
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Analisis persebaran UMKM di 27 Kabupaten/Kota Jawa Barat. Identifikasi klaster industri dan potensi wilayah dengan data real-time.
                    </p>
                    <Link href="/dashboard">
                        <Button size="lg" className="h-12 px-8 bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-900/50">
                            <Map className="mr-2 h-5 w-5" />
                            Buka Peta Interaktif
                        </Button>
                    </Link>
                </motion.div>
            </div>
            
            <div className="lg:w-1/2 w-full h-[400px]">
                <MapWrapper data={data} />
            </div>
        </div>
      </div>
    </section>
  )
}
