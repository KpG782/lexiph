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

export interface AuthError {
  message: string
  status?: number
}
