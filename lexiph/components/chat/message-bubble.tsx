import { Message } from '@/types'

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
      className={`mb-4 max-w-[85%] sm:max-w-[80%] rounded-lg p-3 sm:p-4 shadow-sm ${
        isUser
          ? 'ml-auto bg-blue-500 text-white'
          : 'mr-auto border border-slate-200 bg-white text-slate-900'
      }`}
    >
      <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{message.content}</p>
      <p
        className={`mt-1 text-xs ${
          isUser ? 'text-blue-100' : 'text-slate-400'
        }`}
      >
        {formatTime(message.created_at)}
      </p>
    </div>
  )
}
