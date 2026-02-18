import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    direction: "up" | "down" | "neutral"
  }
  className?: string
  delay?: number
}

export function StatCard({ title, value, description, icon, className, delay = 0 }: StatCardProps) {
  return (
    <Card
      className={cn("relative overflow-hidden p-3 sm:p-4", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
          <div className="mt-1 sm:mt-2 flex items-baseline gap-2">
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold font-grotesk tracking-tight text-slate-900">
              {value}
            </h4>
          </div>
          {description && (
            <p className="mt-1 text-[10px] sm:text-xs text-muted-foreground truncate">{description}</p>
          )}
        </div>
        {icon && (
          <div className="rounded-full bg-slate-100 p-1.5 sm:p-2 text-slate-600 shrink-0">
            {icon}
          </div>
        )}
      </div>
      
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-teal/10 blur-2xl" />
    </Card>
  )
}
