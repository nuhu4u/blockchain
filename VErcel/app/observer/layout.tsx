"use client"

import { ObserverAuthProvider } from "@/hooks/useObserverAuth"

export default function ObserverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ObserverAuthProvider>
      {children}
    </ObserverAuthProvider>
  )
}
