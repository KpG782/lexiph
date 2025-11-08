'use client'

import { useState, useRef, useCallback } from 'react'
import { Send, Paperclip, X } from 'lucide-react'
import { useChatModeStore } from '@/lib/store/chat-mode-store'
import { useRAGStore } from '@/lib/store/rag-store'
import { useAuthStore } from '@/lib/store/auth-store'
import { ChatModeToggle } from './chat-mode-toggle'

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function ChatInput() {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { mode, uploadedFile, setUploadedFile } = useChatModeStore()
  const { submitQuery, loading } = useRAGStore()
  const { user } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Debounced submit for better UX
  const debouncedSubmit = useCallback(
    debounce(async (query: string, userId?: string) => {
      await submitQuery(query, userId)
    }, 500),
    []
  )

  const handleSend = async () => {
    if ((!message.trim() && !uploadedFile) || isSending || loading) return

    setIsSending(true)
    
    // Route to appropriate API based on mode
    if (mode === 'general') {
      // General chat API call (sample)
      console.log('Calling general chat API with message:', message)
      await new Promise(resolve => setTimeout(resolve, 500))
    } else {
      // Compliance mode - use RAG API
      if (message.trim()) {
        await submitQuery(message.trim(), user?.id)
      }
      
      // If file is uploaded, handle file processing
      if (uploadedFile) {
        console.log('Processing compliance file:', uploadedFile.name)
        // File processing would be implemented here
      }
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
        // Announce to screen readers
        const announcement = `File ${file.name} uploaded successfully`
        const liveRegion = document.createElement('div')
        liveRegion.setAttribute('role', 'status')
        liveRegion.setAttribute('aria-live', 'polite')
        liveRegion.className = 'sr-only'
        liveRegion.textContent = announcement
        document.body.appendChild(liveRegion)
        setTimeout(() => document.body.removeChild(liveRegion), 1000)
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
    <div className="border-t bg-white p-3 sm:p-4" role="region" aria-label="Message input">
      <div className="mx-auto max-w-3xl space-y-3">
        {/* Mode Toggle */}
        <div className="flex justify-center">
          <ChatModeToggle />
        </div>

        {/* File Upload Preview (Compliance Mode) */}
        {mode === 'compliance' && uploadedFile && (
          <div 
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
            role="status"
            aria-label={`Uploaded file: ${uploadedFile.name}`}
          >
            <Paperclip className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span className="flex-1 truncate text-sm text-slate-700">
              {uploadedFile.name}
            </span>
            <button
              onClick={handleRemoveFile}
              className="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors"
              aria-label={`Remove file ${uploadedFile.name}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end gap-2 rounded-lg border-2 border-slate-200 bg-white p-2 focus-within:border-iris-500 focus-within:ring-2 focus-within:ring-iris-100 transition-all">
          {/* File Upload Button (Compliance Mode Only) */}
          {mode === 'compliance' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.md,.txt,.doc,.docx"
                onChange={handleFileSelect}
                className="sr-only"
                id="file-upload"
                aria-label="Upload compliance document (PDF, Markdown, Text, or Word)"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                aria-label="Upload compliance document"
                type="button"
              >
                <Paperclip className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          <label htmlFor="message-input" className="sr-only">
            {placeholder}
          </label>
          <textarea
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isSending || loading}
            rows={1}
            aria-label={placeholder}
            aria-describedby="message-hint"
            className="flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none disabled:opacity-50 transition-opacity"
            style={{
              minHeight: '36px',
              maxHeight: '100px',
            }}
          />
          <span id="message-hint" className="sr-only">
            Press Enter to send, Shift+Enter for new line
          </span>
          
          <button
            onClick={handleSend}
            disabled={(!message.trim() && !uploadedFile) || isSending || loading}
            className="rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-iris-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label={isSending || loading ? 'Sending message...' : 'Send message'}
            type="submit"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">{isSending || loading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
