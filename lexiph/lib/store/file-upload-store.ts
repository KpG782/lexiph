'use client'

import { create } from 'zustand'

interface UploadedFile {
  id: string
  file: File
  uploadedAt: string
}

interface FileUploadStore {
  // State
  uploadedFiles: UploadedFile[]
  maxFiles: number
  
  // Actions
  addFiles: (files: File[]) => void
  removeFile: (id: string) => void
  clearFiles: () => void
  canAddMore: () => boolean
}

export const useFileUploadStore = create<FileUploadStore>((set, get) => ({
  uploadedFiles: [],
  maxFiles: 3,

  addFiles: (files: File[]) => {
    const currentFiles = get().uploadedFiles
    const maxFiles = get().maxFiles
    const availableSlots = maxFiles - currentFiles.length

    if (availableSlots <= 0) {
      return
    }

    const filesToAdd = files.slice(0, availableSlots).map(file => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      uploadedAt: new Date().toISOString()
    }))

    set(state => ({
      uploadedFiles: [...state.uploadedFiles, ...filesToAdd]
    }))
  },

  removeFile: (id: string) => {
    set(state => ({
      uploadedFiles: state.uploadedFiles.filter(f => f.id !== id)
    }))
  },

  clearFiles: () => {
    set({ uploadedFiles: [] })
  },

  canAddMore: () => {
    const currentFiles = get().uploadedFiles
    const maxFiles = get().maxFiles
    return currentFiles.length < maxFiles
  }
}))
