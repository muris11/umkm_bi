export function AppHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-20 flex h-20 items-center justify-between px-6 py-4 transition-all duration-300">
      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-sm">
         <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
         <span className="text-xs font-semibold text-slate-600">Live Data 2024</span>
      </div>

      <div className="flex items-center gap-4">
         {/* Could add Search, Notifications here */}
      </div>
    </header>
  )
}
