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
  addRAGMessage: (query: string, response: any) => void
}

// Mock data for MVP - Philippine Law & Compliance Use Cases
const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Barangay Disaster Plan Review',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    user_id: 'mock-user',
    message_count: 8,
    last_message_preview: 'What are the required sections for a barangay disaster preparedness plan?'
  },
  {
    id: '2',
    title: 'RA 9003 Solid Waste Compliance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user_id: 'mock-user',
    message_count: 12,
    last_message_preview: 'Does our waste management plan comply with RA 9003 requirements?'
  },
  {
    id: '3',
    title: 'DPWH Flood Control Permits',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    user_id: 'mock-user',
    message_count: 15,
    last_message_preview: 'What permits are needed for flood control projects in Metro Manila?'
  },
  {
    id: '4',
    title: 'Data Privacy Act Compliance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    user_id: 'mock-user',
    message_count: 10,
    last_message_preview: 'How do we ensure our employee records comply with RA 10173?'
  },
  {
    id: '5',
    title: 'LGU Environmental Clearance',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 1 week ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    user_id: 'mock-user',
    message_count: 6,
    last_message_preview: 'What documents are required for environmental compliance certificate?'
  },
  {
    id: '6',
    title: 'Labor Code Workplace Safety',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    user_id: 'mock-user',
    message_count: 9,
    last_message_preview: 'What are the mandatory workplace safety requirements under Philippine law?'
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
  },

  // Add RAG message to chat history
  addRAGMessage: (query: string, response: any) => {
    const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: query,
      created_at: new Date().toISOString(),
    }
    
    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: response.summary,
      created_at: new Date().toISOString(),
      metadata: {
        ragResponse: response,
        searchQueries: response.search_queries_used,
        documentCount: response.documents_found,
      }
    }
    
    // In production, this would add to Supabase and update state
    // For MVP, we're just logging
    console.log('RAG messages added:', { userMessage, assistantMessage })
  }
}))
