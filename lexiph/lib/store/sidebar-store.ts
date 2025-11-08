'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  // State
  isOpen: boolean
  isMobile: boolean
  
  // Actions
  toggle: () => void
  open: () => void
  close: () => void
  setIsMobile: (isMobile: boolean) => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
      isMobile: false,

      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      
      open: () => set({ isOpen: true }),
      
      close: () => set({ isOpen: false }),
      
      setIsMobile: (isMobile: boolean) => set((state) => ({ 
        isMobile,
        // On mobile, close sidebar by default; on desktop, keep it open
        isOpen: isMobile ? false : true
      }))
    }),
    {
      name: 'sidebar-storage', // localStorage key
      partialState: (state) => ({ isOpen: state.isOpen }) // Only persist isOpen state
    }
  )
)
