'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastId = 0
const toastListeners: ((toast: Toast) => void)[] = []

export function showToast(message: string, type: ToastType = 'info') {
  const toast: Toast = {
    id: `toast-${toastId++}`,
    message,
    type
  }
  toastListeners.forEach(listener => listener(toast))
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts(prev => [...prev, toast])
      
      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 3000)
    }

    toastListeners.push(listener)

    return () => {
      const index = toastListeners.indexOf(listener)
      if (index > -1) {
        toastListeners.splice(index, 1)
      }
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600'
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg pointer-events-auto min-w-[300px] max-w-md',
        colors[toast.type]
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', iconColors[toast.type])} />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 rounded p-1 hover:bg-black/5 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
