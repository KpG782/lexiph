import { Message } from '@/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  // Format timestamp
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div
      className={`mb-4 max-w-[85%] sm:max-w-[80%] rounded-xl p-4 sm:p-5 shadow-md transition-all hover:shadow-lg ${
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
