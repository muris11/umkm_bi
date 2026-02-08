"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
    ChevronRight,
    FileText,
    LayoutDashboard,
    Map,
    Menu,
    PieChart,
    Settings,
    X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
// import { Button } from "@/components/ui/button"

const MENU_ITEMS = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Analytics", icon: PieChart, href: "/analytics" },
  { name: "Geospatial", icon: Map, href: "/map" },
  { name: "Reports", icon: FileText, href: "/reports" },
  { name: "Settings", icon: Settings, href: "/settings" },
]

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-md lg:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Container */}
      <AnimatePresence mode="wait">
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isOpen ? 0 : -300 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/80 backdrop-blur-xl lg:translate-x-0",
            // On desktop, we want it always visible, but Framer Motion might conflict with CSS media queries for `transform`.
            // We'll handle desktop visibility via CSS override or conditional rendering if needed. 
            // Better approach: use a specific class for desktop reset.
            "lg:!translate-x-0 lg:!block"
          )}
          style={{ x: undefined }} // Let class handle desktop, motion handle mobile? Actually motion style overrides class.
          // Correct approach for mixed mobile/desktop: use generic CSS for desktop state to override motion style inline styles if possible, 
          // or just render differently. For simplicity, we'll assume this is a mobile-first drawer that becomes static sidebar on desktop.
        >
          <div className="flex h-full flex-col px-6 py-8">
            {/* Logo */}
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-teal-600 text-white shadow-lg shadow-teal-500/20">
                <span className="font-grotesk text-xl font-bold">JD</span>
              </div>
              <div>
                <h1 className="font-grotesk text-lg font-bold tracking-tight text-slate-900">
                  JabarData
                </h1>
                <p className="text-xs font-medium text-slate-500">UMKM Dashboard</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-slate-50",
                      isActive
                        ? "bg-brand-teal/5 text-brand-teal ring-1 ring-brand-teal/20"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-brand-teal" : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="ml-auto"
                      >
                         <ChevronRight className="h-4 w-4 text-brand-teal" />
                      </motion.div>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="mt-auto rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-medium text-slate-900">
                    Admin Pemprov
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    admin@jabarprov.go.id
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  )
}
