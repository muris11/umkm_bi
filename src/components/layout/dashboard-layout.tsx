"use client"

import { DashboardShell } from "./dashboard-shell"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  )
}
