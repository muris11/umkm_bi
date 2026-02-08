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
        "bg-orb-container relative min-h-screen w-full px-4 pt-24 pb-12 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="mx-auto max-w-7xl space-y-8">
        {children}
      </div>
    </motion.main>
  )
}
