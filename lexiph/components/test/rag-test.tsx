'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { queryRAG, checkRAGHealth, RAGWebSocket, SAMPLE_QUERIES, type RAGResponse } from '@/lib/services/rag-api'
import { Loader2, CheckCircle, XCircle, Send, Wifi, WifiOff } from 'lucide-react'

export function RAGTestComponent() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<RAGResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [healthStatus, setHealthStatus] = useState<string | null>(null)
  const [wsConnected, setWsConnected] = useState(false)
  const [wsEvents, setWsEvents] = useState<any[]>([])
  const [ragWs, setRagWs] = useState<RAGWebSocket | null>(null)

  // Test simple RAG API
  const handleTestRAG = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await queryRAG({
        query: query.trim(),
        user_id: 'LexInSight_test_user'
      })
      setResponse(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Test health check
  const handleHealthCheck = async () => {
    try {
      const health = await checkRAGHealth()
      setHealthStatus(`${health.status} - ${health.service}`)
    } catch (err) {
      setHealthStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  // Test WebSocket connection
  const handleWebSocketTest = () => {
    if (ragWs) {
      ragWs.disconnect()
      setRagWs(null)
      setWsConnected(false)
      setWsEvents([])
      return
    }

    const ws = new RAGWebSocket()
    ws.connect(
      (event) => {
        setWsEvents(prev => [...prev, { ...event, timestamp: new Date().toLocaleTimeString() }])
        if (event.stage === 'summarization' && event.status === 'completed') {
          setResponse({
            status: 'completed',
            query: query,
            summary: event.data?.summary || '',
            search_queries_used: [],
            documents_found: event.data?.documents_found || 0
          })
        }
      },
      (error) => {
        setError('WebSocket error: ' + error)
        setWsConnected(false)
      }
    )
    
    setRagWs(ws)
    setWsConnected(true)
    setWsEvents([])
  }

  const handleWebSocketQuery = () => {
    if (ragWs && query.trim()) {
      setWsEvents([])
      setResponse(null)
      ragWs.sendQuery(query.trim())
    }
  }

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">
          RAG API Test Interface
        </h1>
        <p className="font-body text-neutral-600">
          Test the Philippine Legislation Research API
        </p>
      </div>

      {/* Health Check */}
      <Card className="p-4 border-iris-100">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-neutral-900">API Health Check</h2>
          <Button onClick={handleHealthCheck} variant="outline" size="sm" className="border-iris-300 text-iris-700 hover:bg-iris-50">
            Check Status
          </Button>
        </div>
        {healthStatus && (
          <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-iris-50">
            {healthStatus.includes('Error') ? (
              <XCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-iris-600" />
            )}
            <span className="font-body text-sm text-neutral-700">{healthStatus}</span>
          </div>
        )}
      </Card>

      {/* Sample Queries */}
      <Card className="p-4 border-iris-100">
        <h2 className="font-display text-lg font-semibold mb-3 text-neutral-900">Sample Queries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SAMPLE_QUERIES.map((sampleQuery, index) => (
            <Button
              key={index}
              onClick={() => handleSampleQuery(sampleQuery)}
              variant="outline"
              size="sm"
              className="text-left justify-start h-auto p-2.5 whitespace-normal border-iris-200 hover:bg-iris-50 hover:border-iris-300 transition-colors"
            >
              <span className="font-body text-xs text-neutral-700">{sampleQuery}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Query Input */}
      <Card className="p-4">
        <h2 className="font-display text-lg font-semibold mb-3">Test Query</h2>
        <div className="space-y-3">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your Philippine legislation question..."
            className="w-full h-20 p-3 border border-slate-200 rounded-lg font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-iris-500 focus:border-iris-500 transition-colors"
            maxLength={500}
          />
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>{query.length}/500 characters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleTestRAG}
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 bg-iris-600 hover:bg-iris-700 text-white"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Test Simple RAG
            </Button>
            
            <Button
              onClick={handleWebSocketTest}
              variant="outline"
              className="flex items-center gap-2 border-iris-300 text-iris-700 hover:bg-iris-50"
            >
              {wsConnected ? (
                <Wifi className="h-4 w-4 text-iris-600" />
              ) : (
                <WifiOff className="h-4 w-4" />
              )}
              {wsConnected ? 'Disconnect WS' : 'Connect WebSocket'}
            </Button>
            
            {wsConnected && (
              <Button
                onClick={handleWebSocketQuery}
                disabled={!query.trim()}
                variant="outline"
                className="border-iris-300 text-iris-700 hover:bg-iris-50"
              >
                Send via WebSocket
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* WebSocket Events */}
      {wsEvents.length > 0 && (
        <Card className="p-4 border-iris-100">
          <h2 className="font-display text-lg font-semibold mb-3 text-neutral-900">WebSocket Events</h2>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {wsEvents.map((event, index) => (
              <div key={index} className="text-sm font-mono bg-iris-50 p-2.5 rounded border border-iris-100">
                <span className="text-iris-600">[{event.timestamp}]</span>
                <span className="ml-2 font-semibold text-neutral-800">{event.stage}:</span>
                <span className="ml-1 text-neutral-700">{event.message}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <h2 className="font-display text-lg font-semibold text-red-800">Error</h2>
          </div>
          <p className="font-body text-red-700 mt-2">{error}</p>
        </Card>
      )}

      {/* Response Display */}
      {response && (
        <Card className="p-4 border-iris-100">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-5 w-5 text-iris-600" />
            <h2 className="font-display text-lg font-semibold text-neutral-900">API Response</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-sm font-semibold text-neutral-700 mb-1">Status</h3>
              <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                response.status === 'completed' ? 'bg-iris-100 text-iris-800 border border-iris-200' :
                response.status === 'no_results' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {response.status}
              </span>
            </div>
            
            <div>
              <h3 className="font-display text-sm font-semibold text-neutral-700 mb-1">Query</h3>
              <p className="font-body text-sm text-neutral-600 bg-iris-50 p-2 rounded border border-iris-100">{response.query}</p>
            </div>
            
            {response.search_queries_used.length > 0 && (
              <div>
                <h3 className="font-display text-sm font-semibold text-neutral-700 mb-2">
                  Search Queries Used ({response.search_queries_used.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {response.search_queries_used.map((searchQuery, index) => (
                    <span key={index} className="bg-iris-100 text-iris-700 px-2.5 py-1 rounded text-xs font-medium border border-iris-200">
                      {searchQuery}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-display text-sm font-semibold text-neutral-700 mb-1">
                Documents Found
              </h3>
              <span className="inline-flex items-center gap-1.5 bg-iris-100 text-iris-700 px-2.5 py-1 rounded text-sm font-medium border border-iris-200">
                {response.documents_found} documents
              </span>
            </div>
            
            <div>
              <h3 className="font-display text-sm font-semibold text-neutral-700 mb-2">Summary</h3>
              <div className="bg-iris-50 p-4 rounded-lg border border-iris-100">
                <pre className="font-body text-sm text-neutral-800 whitespace-pre-wrap">
                  {response.summary}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
