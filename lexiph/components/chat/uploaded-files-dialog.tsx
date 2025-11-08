'use client'

import { useState, useEffect } from 'react'
import { FileText, X, Download, Eye, Trash2, Calendar, FileIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface UploadedFilesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: string
  url?: string
}

export function UploadedFilesDialog({ open, onOpenChange }: UploadedFilesDialogProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])

  // Load uploaded files from localStorage or state
  useEffect(() => {
    // Mock data - replace with actual file storage logic
    const mockFiles: UploadedFile[] = [
      {
        id: '1',
        name: 'Barangay_Disaster_Plan.pdf',
        size: 2457600, // 2.4 MB
        type: 'application/pdf',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Compliance_Checklist.docx',
        size: 524288, // 512 KB
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        id: '3',
        name: 'Policy_Draft.md',
        size: 102400, // 100 KB
        type: 'text/markdown',
        uploadedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ]
    
    setFiles(mockFiles)
  }, [open])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('markdown') || type.includes('text')) return '📋'
    return '📁'
  }

  const handleView = (file: UploadedFile) => {
    console.log('View file:', file.name)
    // Implement file preview logic
  }

  const handleDownload = (file: UploadedFile) => {
    console.log('Download file:', file.name)
    // Implement file download logic
  }

  const handleDelete = (fileId: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      setFiles(files.filter(f => f.id !== fileId))
      // Implement actual deletion logic
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[75vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-iris-600" />
            Uploaded Files
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-2">
          {files.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileIcon className="h-16 w-16 mx-auto mb-3 text-slate-300" />
              <p className="text-lg font-medium">No files uploaded yet</p>
              <p className="text-sm mt-1">Upload documents to analyze them for compliance</p>
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-iris-300 hover:bg-iris-50/30 transition-colors group"
              >
                {/* File Icon */}
                <div className="text-3xl flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 truncate">{file.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{formatFileSize(file.size)}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(file)}
                    className="h-8 w-8"
                    title="View file"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(file)}
                    className="h-8 w-8"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(file.id)}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    title="Delete file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {files.length > 0 && (
          <div className="pt-3 border-t text-sm text-slate-500">
            Total: {files.length} file{files.length !== 1 ? 's' : ''} ({formatFileSize(files.reduce((acc, f) => acc + f.size, 0))})
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
