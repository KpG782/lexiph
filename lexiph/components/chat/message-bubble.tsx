'use client'

import { useState } from 'react'
import { Message } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Copy, Download, FileText, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { showToast } from '@/components/ui/toast'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)
  
  // Format timestamp
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      showToast('Copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      showToast('Failed to copy', 'error')
    }
  }

  // Download as Markdown
  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([message.content], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `response-${Date.now()}.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showToast('Downloaded as Markdown', 'success')
    } catch (error) {
      showToast('Failed to download', 'error')
    }
  }

  // Download as Word (using HTML format that Word can open)
  const handleDownloadWord = () => {
    try {
      // Convert markdown to basic HTML for Word
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LexInsight Response</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
    h1, h2, h3 { color: #3F33BD; }
    code { background-color: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    blockquote { border-left: 4px solid #3F33BD; padding-left: 15px; margin-left: 0; color: #666; }
  </style>
</head>
<body>
  <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${message.content}</pre>
</body>
</html>
      `
      const blob = new Blob([htmlContent], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `response-${Date.now()}.doc`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      showToast('Downloaded as Word document', 'success')
    } catch (error) {
      showToast('Failed to download', 'error')
    }
  }

  return (
    <div
      className={`mb-4 max-w-[90%] sm:max-w-[85%] lg:max-w-[90%] rounded-xl p-4 sm:p-5 shadow-md transition-all hover:shadow-lg ${
        isUser
          ? 'ml-auto bg-gradient-to-br from-iris-500 to-purple-500 text-white border-2 border-iris-300'
          : 'mr-auto border-2 border-slate-200 bg-white text-slate-900'
      }`}
    >
      {isUser ? (
        // User message - simple text with better contrast
        <p className="font-body whitespace-pre-wrap text-base leading-relaxed break-word font-semibold text-white">
          {message.content}
        </p>
      ) : (
        // AI message - formatted markdown
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-4 pb-2 border-b-2 border-slate-200" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-bold text-slate-800 mt-5 mb-3" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold text-slate-700 mt-4 mb-2" {...props} />
              ),
              // Paragraphs
              p: ({ node, ...props }) => (
                <p className="text-base text-slate-700 leading-relaxed my-3" {...props} />
              ),
              // Lists
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-2 my-3 text-slate-700" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside space-y-2 my-3 text-slate-700" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-slate-700 leading-relaxed" {...props} />
              ),
              // Strong/Bold
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-slate-900" {...props} />
              ),
              // Code
              code: ({ node, inline, ...props }: any) => 
                inline ? (
                  <code className="bg-slate-100 text-iris-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                ) : (
                  <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg text-sm font-mono overflow-x-auto my-3" {...props} />
                ),
              // Links
              a: ({ node, ...props }) => (
                <a className="text-iris-600 hover:text-iris-700 underline font-medium" {...props} />
              ),
              // Blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-iris-500 pl-4 py-2 my-3 italic text-slate-600 bg-slate-50 rounded-r" {...props} />
              ),
              // Horizontal rule
              hr: ({ node, ...props }) => (
                <hr className="my-6 border-slate-300" {...props} />
              ),
              // Tables
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border-collapse border border-slate-300" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th className="border border-slate-300 bg-slate-100 px-4 py-2 text-left font-semibold text-slate-900" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-slate-300 px-4 py-2 text-slate-700" {...props} />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
      
      {/* Action Buttons - Only for assistant messages */}
      {!isUser && (
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-iris-600 hover:bg-iris-50 rounded-md transition-all duration-150"
            aria-label="Copy to clipboard"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="h-3.5 w-3.5 text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-iris-600 hover:bg-iris-50 rounded-md transition-all duration-150"
            aria-label="Download as Markdown"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Markdown</span>
          </button>

          <button
            onClick={handleDownloadWord}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-iris-600 hover:bg-iris-50 rounded-md transition-all duration-150"
            aria-label="Download as Word"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Word</span>
          </button>
        </div>
      )}
      
      <p
        className={`mt-3 font-body text-xs font-semibold ${
          isUser ? 'text-white/90' : 'text-slate-500'
        }`}
      >
        {formatTime(message.created_at)}
      </p>
    </div>
  )
}
