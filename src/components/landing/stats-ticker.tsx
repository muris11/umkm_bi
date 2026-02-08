"use client"

import { motion } from "framer-motion"
import { Building2, Factory, MapPin, Monitor, TrendingUp, Users } from "lucide-react"

export function StatsTicker() {
  const stats = [
    { icon: Building2, text: "Total UMKM: 9.4 Juta+" },
    { icon: Users, text: "Tenaga Kerja: 25.4 Juta+" },
    { icon: TrendingUp, text: "Kontribusi PDRB: 60%+" },
    { icon: Monitor, text: "Digitalisasi: 79%" },
    { icon: MapPin, text: "27 Kabupaten/Kota" },
    { icon: Factory, text: "18 Sektor Usaha" },
  ]

  return (
    <div className="w-full bg-brand-teal/5 border-y border-brand-teal/10 overflow-hidden py-4">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
          className="flex gap-16"
        >
          {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
               <div className="p-1.5 rounded-full bg-brand-teal/10 text-brand-teal">
                  <stat.icon className="h-4 w-4" />
               </div>
               <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  {stat.text}
               </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
