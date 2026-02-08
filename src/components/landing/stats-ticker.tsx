"use client"

import { motion } from "framer-motion";
import { Building2, Factory, MapPin, Monitor, TrendingUp, Users } from "lucide-react";

interface StatsTickerProps {
  totalUmkm: number;
  totalTenagaKerja: number;
  avgPersenDigital: number;
  totalWilayah: number;
  totalSektor: number;
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} Juta+`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(0)}K+`;
  }
  return `${num}+`;
}

export function StatsTicker({ totalUmkm, totalTenagaKerja, avgPersenDigital, totalWilayah, totalSektor }: StatsTickerProps) {
  const stats = [
    { icon: Building2, text: `Total UMKM: ${formatNumber(totalUmkm)}` },
    { icon: Users, text: `Tenaga Kerja: ${formatNumber(totalTenagaKerja)}` },
    { icon: TrendingUp, text: `Kontribusi PDRB: 60%+` },
    { icon: Monitor, text: `Digitalisasi: ${avgPersenDigital.toFixed(0)}%` },
    { icon: MapPin, text: `${totalWilayah} Kabupaten/Kota` },
    { icon: Factory, text: `${totalSektor} Sektor Usaha` },
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
