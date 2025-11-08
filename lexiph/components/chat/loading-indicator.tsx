'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingIndicatorProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingIndicator({ 
  message = 'Processing...', 
  size = 'md',
  className 
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div 
      className={cn('flex items-center gap-2 text-slate-600', className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={cn(sizeClasses[size], 'animate-spin')} aria-hidden="true" />
      <span className={textSizeClasses[size]}>{message}</span>
    </div>
  )
}

interface TypingIndicatorProps {
  className?: string
}

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div 
      className={cn('flex items-center gap-1.5 px-4 py-3 bg-white rounded-lg border border-slate-200 w-fit', className)}
      role="status"
      aria-live="polite"
      aria-label="AI is typing"
    >
      <div className="flex gap-1">
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="sr-only">AI is typing</span>
    </div>
  )
}
