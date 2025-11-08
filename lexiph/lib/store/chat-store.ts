'use client'

import { create } from 'zustand'
import { Chat, Message } from '@/types'
import { createClient } from '@/lib/supabase/client'

interface ChatStore {
  // State
  chats: Chat[]
  activeChat: Chat | null
  messages: Record<string, Message[]> // chatId -> messages
  loading: boolean
  loadingMessages: boolean
  
  // Actions
  fetchChats: () => Promise<void>
  fetchMessages: (chatId: string) => Promise<void>
  createChat: (title?: string) => Promise<Chat>
  selectChat: (id: string) => void
  deleteChat: (id: string) => Promise<void>
  updateChatTitle: (id: string, title: string) => Promise<void>
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'created_at'>) => Promise<void>
  addRAGMessage: (query: string, response: any) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  activeChat: null,
  messages: {},
  loading: false,
  loadingMessages: false,

  fetchChats: async () => {
    set({ loading: true })
    
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        set({ chats: [], loading: false })
        return
      }
      
      // Fetch chats with message counts
      const { data: chats, error } = await supabase
        .from('chats')
        .select(`
          id,
          title,
          mode,
          created_at,
          updated_at,
          user_id,
          messages (
            id,
            content,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
      
      if (error) throw error
      
      // Transform data to include message_count and last_message_preview
      const transformedChats: Chat[] = (chats || []).map((chat: any) => {
        const messages = (chat.messages as any[]) || []
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null
        
        return {
          id: chat.id,
          title: chat.title,
          mode: chat.mode,
          created_at: chat.created_at,
          updated_at: chat.updated_at,
          user_id: chat.user_id,
          message_count: messages.length,
          last_message_preview: lastMessage?.content?.substring(0, 100)
        }
      })
      
      set({ 
        chats: transformedChats,
        loading: false 
      })
    } catch (error) {
      console.error('Failed to fetch chats:', error)
      set({ loading: false })
    }
  },

  fetchMessages: async (chatId: string) => {
    set({ loadingMessages: true })
    
    try {
      const supabase = createClient()
      
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })
      
      if (error) throw error
      
      set(state => ({
        messages: {
          ...state.messages,
          [chatId]: messages || []
        },
        loadingMessages: false
      }))
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      set({ loadingMessages: false })
    }
  },

  createChat: async (title?: string) => {
    try {
      const supabase = createClient()
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      const { data: newChat, error } = await supabase
        .from('chats')
        .insert({
          title: title || 'New Chat',
          user_id: user.id,
          mode: 'general'
        })
        .select()
        .single()
      
      if (error) throw error
      
      const chatWithCount: Chat = {
        ...newChat,
        message_count: 0
      }
      
      set(state => ({ 
        chats: [chatWithCount, ...state.chats],
        activeChat: chatWithCount,
        messages: {
          ...state.messages,
          [chatWithCount.id]: []
        }
      }))
      
      return chatWithCount
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
      const supabase = createClient()
      
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      set(state => {
        const newChats = state.chats.filter(c => c.id !== id)
        const newActiveChat = state.activeChat?.id === id ? null : state.activeChat
        const newMessages = { ...state.messages }
        delete newMessages[id]
        
        return {
          chats: newChats,
          activeChat: newActiveChat,
          messages: newMessages
        }
      })
    } catch (error) {
      console.error('Failed to delete chat:', error)
      throw error
    }
  },

  updateChatTitle: async (id: string, title: string) => {
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('chats')
        .update({ title })
        .eq('id', id)
      
      if (error) throw error
      
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

  addMessage: async (chatId: string, message: Omit<Message, 'id' | 'created_at'>) => {
    try {
      const supabase = createClient()
      
      const { data: newMessage, error } = await supabase
        .from('messages')
        .insert({
          chat_id: chatId,
          role: message.role,
          content: message.content,
          metadata: message.metadata || {}
        })
        .select()
        .single()
      
      if (error) throw error
      
      // Update chat's updated_at timestamp
      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatId)
      
      set(state => {
        const chatMessages = state.messages[chatId] || []
        
        // Update chat's last_message_preview and updated_at
        const updatedChats = state.chats.map(chat =>
          chat.id === chatId
            ? {
                ...chat,
                last_message_preview: message.content.substring(0, 100),
                updated_at: new Date().toISOString(),
                message_count: (chat.message_count || 0) + 1
              }
            : chat
        )
        
        return {
          messages: {
            ...state.messages,
            [chatId]: [...chatMessages, newMessage]
          },
          chats: updatedChats
        }
      })
    } catch (error) {
      console.error('Failed to add message:', error)
      throw error
    }
  },

  // Add RAG message to chat history
  addRAGMessage: (query: string, response: any) => {
    const activeChat = get().activeChat
    
    if (!activeChat) {
      console.warn('No active chat to add RAG message to')
      return
    }
    
    // Add user message
    get().addMessage(activeChat.id, {
      role: 'user',
      content: query
    })
    
    // Add assistant message with RAG metadata
    get().addMessage(activeChat.id, {
      role: 'assistant',
      content: response.summary,
      metadata: {
        ragResponse: response,
        searchQueries: response.search_queries_used,
        documentCount: response.documents_found,
      }
    })
  }
}))
