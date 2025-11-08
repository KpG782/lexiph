'use client'

import { useRouter } from 'next/navigation'
import { useChatStore } from '@/lib/store/chat-store'
import { useSidebarStore } from '@/lib/store/sidebar-store'
import { ChatListItem } from './chat-list-item'
import { MessageSquare } from 'lucide-react'

export function ChatList() {
  const router = useRouter()
  const { chats, activeChat, selectChat } = useChatStore()
  const { isMobile, close } = useSidebarStore()
  
  const handleSelectChat = (id: string) => {
    // Update active chat in store
    selectChat(id)
    
    // Navigate to chat route
    router.push(`/chat/${id}`)
    
    // Close sidebar on mobile after selection
    if (isMobile) {
      close()
    }
  }
  // Empty state when no chats exist
  if (chats.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <MessageSquare className="mb-4 h-12 w-12 text-slate-300" />
        <p className="text-sm font-medium text-slate-600">No chats yet</p>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Start a new conversation to get started
        </p>
      </div>
    )
  }

  return (
    <div
      className="flex-1 overflow-y-auto px-3 py-2"
      role="list"
      aria-label="Chat conversations"
    >
      <div className="space-y-1">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChat?.id}
            onClick={() => handleSelectChat(chat.id)}
          />
        ))}
      </div>
    </div>
  )
}
