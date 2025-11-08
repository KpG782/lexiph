'use client'

// RAG API Service for Philippine Legislation Research

const RAG_API_BASE_URL = process.env.NEXT_PUBLIC_RAG_API_URL || 'http://66.181.46.44:7767'

export interface RAGQuery {
  query: string
  user_id?: string
}

export interface RAGResponse {
  status: 'completed' | 'no_results' | 'error'
  query: string
  summary: string
  search_queries_used: string[]
  documents_found: number
}

export interface RAGError {
  detail: string
}

export interface HealthResponse {
  status: string
  service: string
}

export interface WebSocketEvent {
  stage: 'query_generation' | 'search' | 'summarization'
  status: 'started' | 'in_progress' | 'completed' | 'error'
  message: string
  timestamp?: string
  data?: {
    queries_generated?: number
    documents_found?: number
    summary?: string
  }
}

// Simple RAG API call
export async function queryRAG(params: RAGQuery): Promise<RAGResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000)

  try {
    const response = await fetch(`${RAG_API_BASE_URL}/api/research/simple-rag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData: RAGError = await response.json()
      throw new Error(`API Error ${response.status}: ${errorData.detail}`)
    }

    const data: RAGResponse = await response.json()
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. The query may be too complex.')
      }
      throw error
    }
    
    throw new Error('Unknown error occurred')
  }
}

// Health check
export async function checkRAGHealth(): Promise<HealthResponse> {
  try {
    const response = await fetch(`${RAG_API_BASE_URL}/api/research/health`)
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('RAG Health Check Error:', error)
    throw error
  }
}

// WebSocket streaming (for real-time updates)
export class RAGWebSocket {
  private ws: WebSocket | null = null
  private onMessage: ((event: WebSocketEvent) => void) | null = null
  private onError: ((error: any) => void) | null = null
  private wsUrl: string

  constructor() {
    this.wsUrl = process.env.NEXT_PUBLIC_RAG_WS_URL || 'ws://66.181.46.44:7767'
  }

  connect(onMessage: (event: WebSocketEvent) => void, onError?: (error: any) => void) {
    this.onMessage = onMessage
    this.onError = onError || null

    try {
      this.ws = new WebSocket(`${this.wsUrl}/api/research/ws/simple-rag`)
      
      this.ws.onopen = () => {
        console.log('RAG WebSocket connected')
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.onMessage?.(data)
        } catch (error) {
          console.error('WebSocket message parse error:', error)
        }
      }

      this.ws.onerror = (error) => {
        console.error('RAG WebSocket error:', error)
        this.onError?.(error)
      }

      this.ws.onclose = () => {
        console.log('RAG WebSocket disconnected')
      }
    } catch (error) {
      console.error('WebSocket connection error:', error)
      this.onError?.(error)
    }
  }

  sendQuery(query: string, userId?: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ query, user_id: userId }))
    } else {
      console.error('WebSocket not connected')
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}

// Sample queries for testing
export const SAMPLE_QUERIES = [
  'What is RA 9003 and its main requirements?',
  'What are workplace safety requirements in Philippines?',
  'Tell me about environmental protection laws',
  'What legislation covers solid waste management?',
  'What is the Data Privacy Act of 2012?',
  'What are the requirements for business permits?',
  'What laws govern labor and employment?',
  'What is RA 10173 about?',
]
