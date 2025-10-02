"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  
  return (
    <Loader2 className={cn("animate-spin", sizes[size], className)} />
  )
}

interface LoadingButtonProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function LoadingButton({ 
  loading, 
  children, 
  className, 
  disabled, 
  onClick, 
  type = 'button' 
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

interface LoadingCardProps {
  loading: boolean
  children: React.ReactNode
  className?: string
  message?: string
}

export function LoadingCard({ loading, children, className, message = "Loading..." }: LoadingCardProps) {
  if (loading) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8", className)}>
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      </div>
    )
  }
  
  return <>{children}</>
}