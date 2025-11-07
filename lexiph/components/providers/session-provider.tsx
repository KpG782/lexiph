'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const checkSession = useAuthStore((state) => state.checkSession)

  useEffect(() => {
    // Check for existing session on app load
    checkSession()
  }, [checkSession])

  return <>{children}</>
}
