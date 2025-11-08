'use client'

import { create } from 'zustand'
import { Chat } from '@/types'

interface ChatStore {
  // State
  chats: Chat[]
  activeChat: Chat | null
  loading: boolean
  
  // Actions
  fetchChats: () => Promise<void>
  createChat: (title?: string) => Promise<Chat>
  selectChat: (id: string) => void
  deleteChat: (id: string) => Promise<void>
  updateChatTitle: (id: string, title: string) => Promise<void>
}

// Mock data for MVP
const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user_id: 'mock-user',
    message_count: 5,
    last_message_preview: 'How do I set up a new Next.js project?'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user_id: 'mock-user',
    message_count: 12,
    last_message_preview: 'What are some TypeScript best practices?'
  },
  {
    id: '3',
    title: 'Zustand State Management',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    user_id: 'mock-user',
    message_count: 8,
    last_message_preview: 'How does Zustand compare to Redux?'
  },
  {
    id: '4',
    title: 'Tailwind CSS Tips',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    user_id: 'mock-user',
    message_count: 15,
    last_message_preview: 'What are some useful Tailwind utilities?'
  }
]

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: mockChats,
  activeChat: null,
  loading: false,

  fetchChats: async () => {
    set({ loading: true })
    
    try {
      // For MVP, we're using mock data
      // In production, this would fetch from Supabase
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate API call
      
      set({ 
        chats: mockChats,
        loading: false 
      })
    } catch (error) {
      console.error('Failed to fetch chats:', error)
      set({ loading: false })
    }
  },

  createChat: async (title?: string) => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: title || 'New Chat',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: 'mock-user',
      message_count: 0
    }
    
    try {
      // For MVP, we're adding to local state
      // In production, this would create in Supabase
      await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API call
      
      set(state => ({ 
        chats: [newChat, ...state.chats],
        activeChat: newChat
      }))
      
      return newChat
    } catch (error) {
      console.error('Failed to create chat:', error)
      throw error
    }
  },

  selectChat: (id: string) => {
    const chat = get().chats.find(c => c.id === id)
    if (chat) {
      set({ activeChat: chat })
    }
  },

  deleteChat: async (id: string) => {
    try {
      // For MVP, we're removing from local state
      // In production, this would delete from Supabase
      await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API call
      
      set(state => {
        const newChats = state.chats.filter(c => c.id !== id)
        const newActiveChat = state.activeChat?.id === id ? null : state.activeChat
        
        return {
          chats: newChats,
          activeChat: newActiveChat
        }
      })
    } catch (error) {
      console.error('Failed to delete chat:', error)
      throw error
    }
  },

  updateChatTitle: async (id: string, title: string) => {
    try {
      // For MVP, we're updating local state
      // In production, this would update in Supabase
      await new Promise(resolve => setTimeout(resolve, 200)) // Simulate API call
      
      set(state => {
        const updatedChats = state.chats.map(chat =>
          chat.id === id
            ? { ...chat, title, updated_at: new Date().toISOString() }
            : chat
        )
        
        const updatedActiveChat = state.activeChat?.id === id
          ? { ...state.activeChat, title, updated_at: new Date().toISOString() }
          : state.activeChat
        
        return {
          chats: updatedChats,
          activeChat: updatedActiveChat
        }
      })
    } catch (error) {
      console.error('Failed to update chat title:', error)
      throw error
    }
  }
}))
