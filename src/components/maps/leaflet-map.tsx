"use client"

import { KAB_KOTA_COORDINATES } from "@/data/kab-kota-coordinates"
import "leaflet/dist/leaflet.css"
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet"
// We need to import raw data to show counts, or pass it as props.
// For the landing page preview, we can mock the counts or use a simplified subset if props are not passed.
// But ideally we read the real data json. However in a client component we can't read fs.
// We'll accept data as props.

interface MapProps {
  data?: { kabKota: string; count: number }[]
}

// Fix for Leaflet icon 404 issue in Next.js

export default function LeafletMap({ data }: MapProps) {
  // Default center: West Java
  const center: [number, number] = [-6.9175, 107.6191]
  const zoom = 9

  return (
    <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
        className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {data?.map((item) => {
        const coords = KAB_KOTA_COORDINATES[item.kabKota]
        if (!coords) return null
        
        // Scale radius based on count (logarithmic scale)
        const radius = Math.log(item.count) * 1.5

        return (
            <CircleMarker 
                key={item.kabKota} 
                center={coords} 
                className="animate-pulse-slow"
                pathOptions={{ 
                    color: '#0d9488', 
                    fillColor: '#0d9488', 
                    fillOpacity: 0.6,
                    weight: 1
                }}
                radius={radius}
            >
                <Popup>
                    <div className="p-2">
                        <h3 className="font-bold text-slate-900">{item.kabKota}</h3>
                        <p className="text-slate-600 text-sm">
                            {new Intl.NumberFormat('id-ID').format(item.count)} UMKM
                        </p>
                    </div>
                </Popup>
            </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
