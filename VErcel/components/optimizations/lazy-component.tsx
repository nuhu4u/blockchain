"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export function LazyComponent({
  children,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded" />,
  threshold = 0.1,
  rootMargin = "50px",
  className
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true)
          setHasLoaded(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, hasLoaded])

  return (
    <div ref={ref} className={cn("", className)}>
      {isVisible ? children : fallback}
    </div>
  )
}