"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

interface DashboardButtonProps {
  variant?: "header" | "floating" | "inline"
  className?: string
}

export default function DashboardButton({ variant = "header", className = "" }: DashboardButtonProps) {
  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          asChild
          size="lg"
          className={`bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-6 py-3 ${className}`}
        >
          <Link href="/dashboard">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Home className="h-4 w-4" />
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
          </Link>
        </Button>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <Button
        asChild
        variant="outline"
        className={`border-blue-200 text-blue-700 hover:bg-blue-50 ${className}`}
      >
        <Link href="/dashboard">
          <Home className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
      </Button>
    )
  }

  // Default header variant
  return (
    <Button
      asChild
      className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold ${className}`}
    >
      <Link href="/dashboard">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Home className="h-3 w-3" />
          </div>
          <span>Dashboard</span>
        </div>
      </Link>
    </Button>
  )
}
