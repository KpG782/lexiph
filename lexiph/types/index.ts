export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
  metadata?: {
    ragResponse?: {
      status: string
      query: string
      summary: string
      search_queries_used: string[]
      documents_found: number
    }
    searchQueries?: string[]
    documentCount?: number
  }
}

export interface Chat {
  id: string
  title: string
  created_at: string
  updated_at: string
  user_id: string
  message_count?: number
  last_message_preview?: string
}

export interface AuthError {
  message: string
  status?: number
}
