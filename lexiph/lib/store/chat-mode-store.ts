'use client'

import { create } from 'zustand'

export type ChatMode = 'general' | 'compliance'

interface ChatModeStore {
  mode: ChatMode
  setMode: (mode: ChatMode) => void
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
}

export const useChatModeStore = create<ChatModeStore>((set) => ({
  mode: 'general',
  setMode: (mode) => set({ mode }),
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
}))
