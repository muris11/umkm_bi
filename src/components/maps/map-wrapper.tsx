"use client"

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
      Loading Map...
    </div>
  ),
})

interface MapWrapperProps {
  data: { kabKota: string; count: number }[];
}

export function MapWrapper({ data }: MapWrapperProps) {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
       <LeafletMap data={data} />
    </div>
  )
}
