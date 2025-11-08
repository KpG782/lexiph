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
      className={cn('flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-iris-50 to-purple-50 rounded-xl border-2 border-iris-200 w-fit shadow-sm', className)}
      role="status"
      aria-live="polite"
      aria-label="AI is typing"
    >
      {/* Animated dots */}
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 bg-gradient-to-br from-iris-500 to-purple-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }} />
        <span className="h-2.5 w-2.5 bg-gradient-to-br from-iris-500 to-purple-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }} />
        <span className="h-2.5 w-2.5 bg-gradient-to-br from-iris-500 to-purple-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }} />
      </div>
      
      {/* Text with animation */}
      <span className="text-sm font-medium text-iris-700 animate-pulse">
        AI is thinking...
      </span>
    </div>
  )
}

interface EnhancedLoadingProps {
  stage?: 'searching' | 'analyzing' | 'generating'
  progress?: number
  className?: string
}

export function EnhancedLoading({ stage = 'searching', progress, className }: EnhancedLoadingProps) {
  const stageInfo = {
    searching: {
      icon: '🔍',
      text: 'Searching documents...',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    analyzing: {
      icon: '⚡',
      text: 'Analyzing results...',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200'
    },
    generating: {
      icon: '✨',
      text: 'Generating response...',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  }

  const current = stageInfo[stage]

  return (
    <div 
      className={cn('flex flex-col gap-3 px-5 py-4 bg-gradient-to-r', current.bgColor, 'rounded-xl border-2', current.borderColor, 'w-full max-w-md shadow-md', className)}
      role="status"
      aria-live="polite"
      aria-label={current.text}
    >
      {/* Header with icon and text */}
      <div className="flex items-center gap-3">
        <span className="text-2xl animate-pulse">{current.icon}</span>
        <span className="text-sm font-semibold text-slate-700">{current.text}</span>
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
          <div 
            className={cn('h-full bg-gradient-to-r', current.color, 'transition-all duration-500 ease-out rounded-full')}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Animated wave effect */}
      <div className="flex gap-1 justify-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={cn('w-1 bg-gradient-to-t', current.color, 'rounded-full')}
            style={{
              height: '4px',
              animation: 'wave 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </div>
  )
}
