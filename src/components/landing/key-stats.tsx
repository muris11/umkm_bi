"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowUpRight, Building2, Store, TrendingUp, Users } from "lucide-react"

export function KeyStats() {
  const stats = [
    {
      label: "Total Unit Usaha",
      value: "9.4 Juta",
      trend: "+12.5%",
      icon: Store,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Serapan Tenaga Kerja",
      value: "25.4 Juta",
      trend: "+8.2%",
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    {
      label: "Indeks Digitalisasi",
      value: "79.1",
      trend: "+15.3%",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
     {
      label: "Wilayah Terdaftar",
      value: "27",
      sub: "Kabupaten/Kota",
      icon: Building2,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
  ]

  return (
    <section className="py-24 bg-white relative">
       <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
               >
                 <Card className="p-6 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
                    <div className="flex items-start justify-between mb-4">
                       <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                          <stat.icon className="h-6 w-6" />
                       </div>
                       {stat.trend && (
                         <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            {stat.trend}
                         </div>
                       )}
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                         <div className="text-sm text-slate-500 font-medium">
                            {stat.label} {stat.sub && <span className="opacity-70">({stat.sub})</span>}
                         </div>
                    </div>
                 </Card>
               </motion.div>
            ))}
          </div>
       </div>
    </section>
  )
}
