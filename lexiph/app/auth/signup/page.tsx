'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { SignupForm } from '@/components/auth/signup-form'

export default function SignupPage() {
  const router = useRouter()
  const { user, loading } = useAuthStore()

  // Redirect to chat if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.push('/chat')
    }
  }, [user, loading, router])

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  // Don't render form if user is authenticated (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6">
      <SignupForm />
    </div>
  )
}
