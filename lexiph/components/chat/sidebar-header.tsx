'use client'

import { useRouter } from 'next/navigation'
import { Plus, PanelLeftClose, PanelLeft } from 'lucide-react'
import { useSidebarStore } from '@/lib/store/sidebar-store'
import { useChatStore } from '@/lib/store/chat-store'
import { Button } from '@/components/ui/button'

export function SidebarHeader() {
  const router = useRouter()
  const { isOpen, toggle, isMobile, close } = useSidebarStore()
  const { createChat } = useChatStore()

  const handleNewChat = async () => {
    try {
      // Create new chat with default title
      const newChat = await createChat('New Chat')
      
      // Navigate to the new chat route
      router.push(`/chat/${newChat.id}`)
      
      // Close sidebar on mobile after creating new chat
      if (isMobile) {
        close()
      }
    } catch (error) {
      console.error('Failed to create new chat:', error)
      // TODO: Show error toast notification
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
      {/* App Branding Area */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold text-slate-900 truncate">Lexiph</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* New Chat Button */}
        <Button
          onClick={handleNewChat}
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 transition-colors duration-150"
          aria-label="Create new chat"
        >
          <Plus className="h-5 w-5" />
        </Button>

        {/* Sidebar Toggle Button */}
        <Button
          onClick={toggle}
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 transition-colors duration-150"
          aria-label="Toggle sidebar"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  )
}
