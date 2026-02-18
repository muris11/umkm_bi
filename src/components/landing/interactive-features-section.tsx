"use client"

import { motion } from "framer-motion"
import { Brain, BarChart3, Calculator, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "ML Playground",
    description: "Eksperimen dengan model Machine Learning. Atur parameter, lihat hasil accuracy, dan pahami cara kerja algoritma.",
    color: "indigo",
    href: "/dashboard"
  },
  {
    icon: BarChart3,
    title: "BI Dashboard Builder",
    description: "Buat dashboard custom dengan KPI dan visualisasi pilihan Anda. 4 perspektif pengguna: Wali Kota, Dinas, Camat, Investor.",
    color: "cyan",
    href: "/dashboard"
  },
  {
    icon: Calculator,
    title: "What-If Simulator",
    description: "Simulasi dampak kebijakan dengan mengubah variabel anggaran, target, dan timeline. Lihat proyeksi ROI dan risk assessment.",
    color: "emerald",
    href: "/dashboard"
  },
  {
    icon: Search,
    title: "Data Explorer",
    description: "Jelajahi data UMKM dengan filter, search, dan sorting interaktif. Lihat detail per kecamatan dengan expandable rows.",
    color: "violet",
    href: "/dashboard"
  }
]

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  indigo: { 
    bg: "bg-indigo-50", 
    text: "text-indigo-600", 
    border: "border-indigo-100",
    hover: "group-hover:bg-indigo-100"
  },
  cyan: { 
    bg: "bg-cyan-50", 
    text: "text-cyan-600", 
    border: "border-cyan-100",
    hover: "group-hover:bg-cyan-100"
  },
  emerald: { 
    bg: "bg-emerald-50", 
    text: "text-emerald-600", 
    border: "border-emerald-100",
    hover: "group-hover:bg-emerald-100"
  },
  violet: { 
    bg: "bg-violet-50", 
    text: "text-violet-600", 
    border: "border-violet-100",
    hover: "group-hover:bg-violet-100"
  },
}

export function InteractiveFeaturesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-medium mb-4">
            Fitur Interaktif Baru
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-grotesk text-slate-900 mb-4">
            Business Intelligence & Machine Learning
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dashboard kini dilengkapi dengan fitur interaktif untuk eksplorasi data, 
            eksperimen model ML, dan simulasi kebijakan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color]
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={feature.href}
                  className="group block p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${colors.bg} ${colors.hover} transition-colors`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-teal transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-brand-teal">
                        Coba Sekarang
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-teal transition-colors"
          >
            <span className="text-sm font-medium">Pelajari metodologi BI & ML kami</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
