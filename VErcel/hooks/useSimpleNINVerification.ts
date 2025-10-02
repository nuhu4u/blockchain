"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSimpleAuth } from './useSimpleAuth'

interface NINVerificationState {
  isChecking: boolean
  hasNIN: boolean
  ninVerified: boolean
  shouldRedirect: boolean
}

export const useSimpleNINVerification = () => {
  const { user, isAuthenticated, isLoading, ready } = useSimpleAuth()
  const router = useRouter()
  const [ninState, setNinState] = useState<NINVerificationState>({
    isChecking: true,
    hasNIN: false,
    ninVerified: false,
    shouldRedirect: false
  })

  useEffect(() => {
    if (!ready || isLoading) {
      setNinState(prev => ({ ...prev, isChecking: true }))
      return
    }

    if (!isAuthenticated || !user) {
      setNinState({
        isChecking: false,
        hasNIN: false,
        ninVerified: false,
        shouldRedirect: true
      })
      return
    }

    // Check if user has complete NIN verification (with fallback for hashed_nin)
    const hasNIN = !!(user.nin_verified && user.user_unique_id && user.wallet_address && (user.encrypted_nin || user.hashed_nin))
    const ninVerified = user.nin_verified === true

    setNinState({
      isChecking: false,
      hasNIN,
      ninVerified,
      shouldRedirect: !hasNIN
    })

    // Redirect to NIN submission if no NIN exists
    if (!hasNIN) {
      router.push('/verify-nin')
    }
  }, [ready, isLoading, isAuthenticated, user, router])

  return {
    ...ninState,
    user
  }
}
