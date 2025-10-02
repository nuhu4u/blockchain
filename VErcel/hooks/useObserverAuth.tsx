"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'

interface ObserverUser {
  id: string
  email: string
  role: 'OBSERVER'
  isApproved: boolean
  organization?: string
  name?: string
  first_name?: string
  organization_name?: string
  organizationName?: string
  organization_type?: string
  organizationType?: string
  website?: string
  phone?: string
  country_code?: string
  address?: string
  state?: string
  lga?: string
  ward?: string
  polling_unit?: string
  status?: 'pending' | 'approved' | 'rejected'
  created_at?: string
  last_login?: string
}

interface ObserverAuthContextType {
  user: ObserverUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  refreshUser: () => Promise<void>
  setUser: (user: ObserverUser | null) => void
}

const ObserverAuthContext = createContext<ObserverAuthContextType | undefined>(undefined)

export function ObserverAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ObserverUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem('observer_token')
        if (storedToken) {
          // Get observer profile to verify token and get user data
          const response = await fetch('/api/observer/profile', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          })
          
          if (response.ok) {
            const data = await response.json()
            if (data.user && data.user.role === 'OBSERVER' && data.user.isApproved) {
              setUser(data.user)
              setToken(storedToken)
            } else {
              // Invalid or unapproved observer
              localStorage.removeItem('observer_token')
            }
          } else {
            // Token invalid or profile not found
            localStorage.removeItem('observer_token')
          }
        }
      } catch (error) {
        localStorage.removeItem('observer_token')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/observer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        // Check if user is an observer (approved or pending)
        if (data.user.role === 'OBSERVER') {
          setUser(data.user)
          setToken(data.token)
          localStorage.setItem('observer_token', data.token)
          
          if (data.user.isApproved) {
            return { success: true, message: 'Login successful' }
          } else {
            return { success: true, message: 'Login successful. Your account is pending approval - you can view and edit your profile.' }
          }
        } else {
          return { success: false, message: 'Access denied. Observer role required.' }
        }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('observer_token')
    router.push('/observer/login')
  }

  const refreshUser = async () => {
    if (!token) return
    
    try {
      const response = await fetch('/api/observer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          setUser(data.user)
        }
      }
    } catch (error) {
      }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    refreshUser,
    setUser
  }

  return (
    <ObserverAuthContext.Provider value={value}>
      {children}
    </ObserverAuthContext.Provider>
  )
}

export function useObserverAuth() {
  const context = useContext(ObserverAuthContext)
  if (context === undefined) {
    throw new Error('useObserverAuth must be used within an ObserverAuthProvider')
  }
  return context
}