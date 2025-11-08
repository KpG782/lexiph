'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FileText, X, File } from 'lucide-react'
import { useFileUploadStore } from '@/lib/store/file-upload-store'
import { showToast } from '@/components/ui/toast'

export function UploadedFilesList() {
  const { uploadedFiles, removeFile, maxFiles } = useFileUploadStore()

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return '📄'
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return '📝'
    if (fileName.endsWith('.md')) return '📋'
    if (fileName.endsWith('.txt')) return '📃'
    return '📁'
  }

  const handleRemove = (id: string, fileName: string) => {
    removeFile(id)
    showToast(`Removed ${fileName}`, 'info')
  }

  if (uploadedFiles.length === 0) return null

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-600">
          Ready to analyze ({uploadedFiles.length}/{maxFiles})
        </h3>
        <p className="text-xs text-slate-500">
          Click send to analyze documents
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {uploadedFiles.map((uploadedFile) => (
            <motion.div
              key={uploadedFile.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm"
            >
              {/* File Icon */}
              <div className="flex-shrink-0 text-lg">
                {getFileIcon(uploadedFile.file.name)}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate max-w-[150px]">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(uploadedFile.file.size)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(uploadedFile.id, uploadedFile.file.name)}
                className="flex-shrink-0 rounded-full p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label={`Remove ${uploadedFile.file.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
