'use client'

import { ChatHeader } from '@/components/layout/chat-header'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { Message } from '@/types'

interface ChatContainerProps {
  messages: Message[]
}

export function ChatContainer({ messages }: ChatContainerProps) {
  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <ChatHeader />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-2 sm:px-4">
        <ChatMessages messages={messages} />
      </div>
      <ChatInput />
    </div>
  )
}
