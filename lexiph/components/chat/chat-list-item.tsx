'use client'

import { Chat } from '@/types'
import { MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatListItemProps {
  chat: Chat
  isActive: boolean
  onClick: () => void
}

export function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  // Format timestamp to relative time
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-lg px-3 py-2.5 text-left transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50',
        isActive 
          ? 'bg-slate-100 text-slate-900 hover:bg-slate-200 shadow-sm' 
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
      )}
      aria-current={isActive ? 'page' : undefined}
      role="listitem"
    >
      <div className="flex items-start gap-3">
        <MessageSquare 
          className={cn(
            'mt-0.5 h-4 w-4 flex-shrink-0 transition-colors duration-150',
            isActive ? 'text-slate-600' : 'text-slate-400'
          )} 
        />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'truncate text-sm font-medium leading-snug',
              isActive ? 'text-slate-900' : 'text-slate-700'
            )}
            title={chat.title}
          >
            {chat.title}
          </p>
          <p className={cn(
            'mt-1 text-xs transition-colors duration-150',
            isActive ? 'text-slate-600' : 'text-slate-500'
          )}>
            {formatTimestamp(chat.updated_at)}
          </p>
        </div>
      </div>
    </button>
  )
}
