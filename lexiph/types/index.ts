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
