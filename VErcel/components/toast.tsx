"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title: string
  description?: string
  duration?: number
  onClose: (id: string) => void
}

export function Toast({ id, type, title, description, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (type !== 'loading') {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, type, duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(id), 300)
  }

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
    loading: Loader2
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    loading: "bg-gray-50 border-gray-200 text-gray-800"
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm w-full bg-white border rounded-lg shadow-lg transform transition-all duration-300",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        colors[type]
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={cn(
              "h-5 w-5",
              type === 'loading' && "animate-spin"
            )} />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium">{title}</h3>
            {description && (
              <p className="mt-1 text-sm opacity-90">{description}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id, onClose: removeToast }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (title: string, description?: string) => {
    addToast({ type: 'success', title, description })
  }

  const error = (title: string, description?: string) => {
    addToast({ type: 'error', title, description })
  }

  const warning = (title: string, description?: string) => {
    addToast({ type: 'warning', title, description })
  }

  const info = (title: string, description?: string) => {
    addToast({ type: 'info', title, description })
  }

  const loading = (title: string, description?: string) => {
    addToast({ type: 'loading', title, description })
  }

  return {
    toasts,
    success,
    error,
    warning,
    info,
    loading,
    removeToast
  }
}

// Toast Container Component
export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[], onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}