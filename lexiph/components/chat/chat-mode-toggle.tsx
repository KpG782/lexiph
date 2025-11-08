'use client'

import { MessageSquare, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useChatModeStore } from '@/lib/store/chat-mode-store'

export function ChatModeToggle() {
  const { mode, setMode } = useChatModeStore()

  return (
    <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1">
      {/* General Chat Mode */}
      <Button
        onClick={() => setMode('general')}
        variant="ghost"
        size="sm"
        className={cn(
          'h-8 gap-2 rounded-md px-3 transition-all duration-150',
          mode === 'general'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        )}
        aria-label="General chat mode"
        title="General chat mode"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-xs font-medium">General</span>
      </Button>

      {/* Compliance/Document Mode */}
      <Button
        onClick={() => setMode('compliance')}
        variant="ghost"
        size="sm"
        className={cn(
          'h-8 gap-2 rounded-md px-3 transition-all duration-150',
          mode === 'compliance'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        )}
        aria-label="Compliance document mode"
        title="Compliance document mode"
      >
        <FileText className="h-4 w-4" />
        <span className="text-xs font-medium">Compliance</span>
      </Button>
    </div>
  )
}
