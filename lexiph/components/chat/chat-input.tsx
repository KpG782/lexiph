'use client'

import { useState, useRef } from 'react'
import { Send, Paperclip, X } from 'lucide-react'
import { useChatModeStore } from '@/lib/store/chat-mode-store'
import { ChatModeToggle } from './chat-mode-toggle'

export function ChatInput() {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { mode, uploadedFile, setUploadedFile } = useChatModeStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if ((!message.trim() && !uploadedFile) || isSending) return

    setIsSending(true)
    
    // Sample API calls based on mode
    if (mode === 'general') {
      // General chat API call (sample)
      console.log('Calling general chat API with message:', message)
      await new Promise(resolve => setTimeout(resolve, 500))
    } else {
      // Compliance API call (sample)
      console.log('Calling compliance API with file:', uploadedFile?.name, 'and message:', message)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    // Clear textarea and file after send
    setMessage('')
    setUploadedFile(null)
    setIsSending(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const validTypes = [
        'application/pdf',
        'text/markdown',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ]
      
      if (validTypes.includes(file.type) || file.name.endsWith('.md')) {
        setUploadedFile(file)
      } else {
        alert('Please upload a valid file: PDF, MD, TXT, or Word document')
      }
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const placeholder = mode === 'general' 
    ? 'Ask about Philippine compliance laws...'
    : 'Upload a document and ask about compliance...'

  return (
    <div className="border-t bg-white p-3 sm:p-4">
      <div className="mx-auto max-w-3xl space-y-3">
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <ChatModeToggle />
        </div>

        {/* File Upload Preview (Compliance Mode) */}
        {mode === 'compliance' && uploadedFile && (
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Paperclip className="h-4 w-4 text-slate-500" />
            <span className="flex-1 truncate text-sm text-slate-700">
              {uploadedFile.name}
            </span>
            <button
              onClick={handleRemoveFile}
              className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end gap-2 rounded-lg border border-slate-200 bg-white p-2 sm:p-3">
          {/* File Upload Button (Compliance Mode Only) */}
          {mode === 'compliance' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.md,.txt,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Upload file"
              >
                <Paperclip className="h-5 w-5" />
              </button>
            </>
          )}

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
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
            disabled={(!message.trim() && !uploadedFile) || isSending}
            className="rounded-lg bg-blue-500 p-2.5 sm:p-3 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
