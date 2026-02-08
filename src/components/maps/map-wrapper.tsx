"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading Map...
    </div>
  ),
})

export function MapWrapper() {
  // Mock data for preview (or we could fetch from API)
  // Since this is landing page, hardcoded approximate values are acceptable for the "Preview" visual
  // to avoid fetching 6MB JSON on landing page load.
  const data = useMemo(() => [
    { kabKota: "Kabupaten Bogor", count: 850000 },
    { kabKota: "Kota Bandung", count: 420000 },
    { kabKota: "Kabupaten Sukabumi", count: 650000 },
    { kabKota: "Kabupaten Bandung", count: 700000 },
    { kabKota: "Kabupaten Karawang", count: 580000 },
    { kabKota: "Kabupaten Bekasi", count: 620000 },
    { kabKota: "Kota Depok", count: 310000 },
    { kabKota: "Kota Bekasi", count: 450000 },
    { kabKota: "Kabupaten Garut", count: 590000 },
    { kabKota: "Kabupaten Tasikmalaya", count: 520000 },
    { kabKota: "Kabupaten Cirebon", count: 480000 },
    { kabKota: "Kabupaten Indramayu", count: 460000 },
    // Add rest if needed or just key ones for visualization
    { kabKota: "Kabupaten Subang", count: 410000 },
    { kabKota: "Kabupaten Cianjur", count: 530000 },
    { kabKota: "Kabupaten Kuningan", count: 380000 },
    { kabKota: "Kabupaten Majalengka", count: 350000 },
    { kabKota: "Kabupaten Sumedang", count: 320000 },
    { kabKota: "Kabupaten Purwakarta", count: 290000 },
    { kabKota: "Kabupaten Bandung Barat", count: 430000 },
    { kabKota: "Kabupaten Ciamis", count: 340000 },
    { kabKota: "Kabupaten Pangandaran", count: 90000 },
    { kabKota: "Kota Bogor", count: 180000 },
    { kabKota: "Kota Sukabumi", count: 85000 },
    { kabKota: "Kota Cirebon", count: 95000 },
    { kabKota: "Kota Tasikmalaya", count: 150000 },
    { kabKota: "Kota Cimahi", count: 120000 },
    { kabKota: "Kota Banjar", count: 45000 },
  ], [])

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
       <LeafletMap data={data} />
    </div>
  )
}
