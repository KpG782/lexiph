'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/auth-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormError } from '@/components/ui/form-error'
import { Spinner } from '@/components/ui/spinner'

export function LoginForm() {
  const router = useRouter()
  const { signIn, loading, error, clearError } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Clear any previous errors on form re-submission
    clearError()

    await signIn(email, password)
    
    // Check if login was successful (no error means success)
    const currentError = useAuthStore.getState().error
    if (!currentError) {
      router.push('/chat')
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 p-4 sm:p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome back</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Enter your credentials to access LexInSight
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            aria-invalid={!!error}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            aria-invalid={!!error}
          />
        </div>

        {/* Display auth store errors with enhanced styling */}
        <FormError message={error || ''} />

        <Button
          type="submit"
          className="w-full min-h-[44px] text-base"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Spinner size="sm" />
              Signing in...
            </span>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      <div className="text-center text-sm sm:text-base">
        Don't have an account?{' '}
        <Link
          href="/auth/signup"
          className="text-primary hover:underline font-medium min-h-[44px] inline-flex items-center"
        >
          Sign up
        </Link>
      </div>
    </div>
  )
}
