'use client'

import { useState, useRef } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface CenteredInputProps {
  onSend: (message: string) => void
  placeholder?: string
  disabled?: boolean
  isTransitioning?: boolean
}

export function CenteredInput({ 
  onSend, 
  placeholder = "Ask me anything about Philippine legal compliance...",
  disabled = false,
  isTransitioning = false
}: CenteredInputProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!message.trim() || disabled) return
    onSend(message.trim())
    setMessage('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isTransitioning ? 0 : 1, 
        y: 0 
      }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div
        className={`relative rounded-xl border transition-all duration-200 ${
          isFocused
            ? 'border-iris-500 shadow-lg shadow-iris-100'
            : 'border-slate-200 shadow-sm'
        } bg-white`}
      >
        <div className="flex items-end gap-2 p-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-50"
            style={{
              minHeight: '42px',
              maxHeight: '150px',
            }}
          />

          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 rounded-lg bg-iris-600 p-2.5 text-white transition-all duration-200 hover:bg-iris-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-iris-600"
            aria-label="Send message"
          >
            {disabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
