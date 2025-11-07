'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || isSending) return

    setIsSending(true)
    
    // MVP: Simulate sending (no actual API call)
    // In the future, this will send to the AI backend
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Clear textarea after send
    setMessage('')
    setIsSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t bg-white p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-lg border border-slate-200 bg-white p-2 sm:p-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Philippine compliance laws..."
          disabled={isSending}
          rows={1}
          className="flex-1 resize-none bg-transparent px-2 py-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-50"
          style={{
            minHeight: '24px',
            maxHeight: '200px',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || isSending}
          className="rounded-lg bg-blue-500 p-2.5 sm:p-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Send message"
        >
          <Send className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}
