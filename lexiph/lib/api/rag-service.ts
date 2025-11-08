/**
 * RAG API Service for Philippine Legislative Research
 * Base URL: http://66.181.46.44:7767
 */

const RAG_API_BASE_URL = process.env.NEXT_PUBLIC_RAG_API_URL || 'http://66.181.46.44:7767'

export interface RAGRequest {
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

/**
 * Simple RAG API Call
 * Executes full RAG pipeline in one request
 */
export async function simpleRAG(query: string, userId?: string): Promise<RAGResponse> {
  try {
    const response = await fetch(`${RAG_API_BASE_URL}/api/research/simple-rag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        user_id: userId || 'lexiph-user',
      }),
    })

    if (!response.ok) {
      const error: RAGError = await response.json()
      throw new Error(error.detail || `HTTP ${response.status}`)
    }

    const data: RAGResponse = await response.json()
    return data
  } catch (error) {
    console.error('RAG API Error:', error)
    throw error
  }
}

/**
 * Health Check
 * Verify API is available
 */
export async function healthCheck(): Promise<{ status: string; service: string }> {
  try {
    const response = await fetch(`${RAG_API_BASE_URL}/api/research/health`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Health Check Error:', error)
    throw error
  }
}

/**
 * WebSocket Streaming (for real-time updates)
 */
export interface RAGStreamEvent {
  stage: 'query_generation' | 'search' | 'summarization'
  status: 'in_progress' | 'completed'
  message: string
  queries?: string[]
  summary?: string
}

export function createRAGWebSocket(
  query: string,
  onEvent: (event: RAGStreamEvent) => void,
  onError?: (error: Error) => void
): WebSocket {
  const wsUrl = RAG_API_BASE_URL.replace('http://', 'ws://').replace('https://', 'wss://')
  const ws = new WebSocket(`${wsUrl}/api/research/ws/simple-rag`)

  ws.onopen = () => {
    ws.send(JSON.stringify({ query }))
  }

  ws.onmessage = (event) => {
    try {
      const data: RAGStreamEvent = JSON.parse(event.data)
      onEvent(data)
    } catch (error) {
      console.error('WebSocket parse error:', error)
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    if (onError) {
      onError(new Error('WebSocket connection failed'))
    }
  }

  return ws
}

/**
 * Validate query before sending
 */
export function validateQuery(query: string): { valid: boolean; error?: string } {
  if (!query || query.trim().length < 5) {
    return { valid: false, error: 'Query must be at least 5 characters' }
  }

  if (query.length > 500) {
    return { valid: false, error: 'Query must be less than 500 characters' }
  }

  return { valid: true }
}
