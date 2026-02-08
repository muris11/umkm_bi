"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-teal text-white hover:bg-teal-700 shadow-md hover:shadow-lg border-transparent",
      secondary: "bg-white text-slate-900 hover:bg-slate-50 border-gray-200 border",
      outline: "border-2 border-slate-200 bg-transparent hover:border-slate-300 text-slate-700",
      ghost: "bg-transparent text-slate-600 hover:bg-slate-100/50 hover:text-slate-900",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    const Component = motion.button as any

    return (
      <Component
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
