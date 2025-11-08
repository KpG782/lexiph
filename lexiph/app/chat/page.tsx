'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { supabase } from '@/lib/supabase/client'
import { ChatContainer } from '@/components/chat/chat-container'
import { Message } from '@/types'

// Mock messages for MVP demonstration
const mockMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m LexiPH, your Philippine legal compliance assistant. How can I help you today?',
    created_at: new Date().toISOString(),
  },
]

export default function ChatPage() {
  const router = useRouter()
  const { user, loading } = useAuthStore()
  const [checkingVerification, setCheckingVerification] = useState(true)

  // Check authentication and email verification
  useEffect(() => {
    const checkAuth = async () => {
      if (!loading && !user) {
        router.push('/auth/login')
        return
      }

      if (user) {
        // Check if email is verified
        const { data } = await supabase.auth.getUser()
        
        if (data.user && !data.user.email_confirmed_at) {
          // Email not verified, redirect to verification page
          router.push(`/auth/verify-email?email=${encodeURIComponent(user.email)}`)
        } else {
          setCheckingVerification(false)
        }
      }
    }

    checkAuth()
  }, [user, loading, router])

  // Show loading state while checking session or verification
  if (loading || checkingVerification) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  // Don't render chat if user is not authenticated (will redirect)
  if (!user) {
    return null
  }

  return (
    <div className="relative">
      {/* Demo banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 sm:py-3 text-center text-xs sm:text-sm text-blue-800">
        This is a demo - AI chat coming soon
      </div>
      
      <ChatContainer messages={mockMessages} />
    </div>
  )
}
