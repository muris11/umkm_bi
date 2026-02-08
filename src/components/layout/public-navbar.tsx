"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Download, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Tentang", href: "/about" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg shadow-brand-teal/20 transition-transform group-hover:scale-105 overflow-hidden border border-slate-100">
             <img src="/logo.png" alt="Logo UMKM Jabar" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
                "text-lg font-bold font-grotesk tracking-tight leading-none transition-colors",
                scrolled ? "text-slate-900" : "text-slate-900" // Keep dark text for now as hero is light
            )}>
              UMKM Jabar
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Public Portal</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all rounded-full hover:text-brand-teal",
                  pathname === item.href 
                    ? "text-brand-teal font-semibold bg-white shadow-sm" 
                    : "text-slate-600 hover:bg-white/50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <Link href="/download">
            <Button size="sm" className="rounded-full px-5 shadow-lg shadow-brand-teal/20 hover:shadow-brand-teal/40 transition-all hover:scale-105 bg-brand-teal hover:bg-brand-teal/90 text-white border-none">
              <Download className="mr-2 h-4 w-4" />
              Download Data
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-700 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className="md:hidden absolute top-full left-0 w-full border-t border-slate-100 bg-white/95 backdrop-blur-xl shadow-xl"
        >
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "bg-brand-teal/10 text-brand-teal"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <Link href="/download" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center rounded-xl bg-brand-teal text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Data Center
                </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
