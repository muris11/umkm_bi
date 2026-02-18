import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function DashboardShell({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "bg-orb-container relative min-h-screen w-full px-3 sm:px-4 pt-20 sm:pt-24 pb-8 sm:pb-12 lg:px-8",
        className
      )}
    >
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
        {children}
      </div>
    </motion.main>
  )
}
