# RAG API Instructions for AI Agents

## Overview

This is a **Retrieval-Augmented Generation (RAG) API** that answers Philippine legislative questions by:
1. Generating optimized search queries from the user's question
2. Searching a database of 30,000+ Philippine legislative documents
3. Generating AI-powered summaries based on the retrieved documents

## Available Endpoints

### 1. Simple RAG Endpoint (Recommended)

**Endpoint:** `POST /api/research/simple-rag`

**Purpose:** Execute full RAG pipeline in one request

**Request Format:**
```json
{
  "query": "What is RA 9003 and its main requirements?",
  "user_id": "optional_user_id"
}
```

**Response Format:**
```json
{
  "status": "completed",
  "query": "What is RA 9003 and its main requirements?",
  "summary": "# EXECUTIVE SUMMARY\n\nRA 9003 (Ecological Solid Waste Management Act of 2000) is a comprehensive Philippine law...",
  "search_queries_used": ["RA 9003", "solid waste management", "DENR regulation"],
  "documents_found": 15
}
```

**Response Fields:**
- `status`: "completed" | "no_results" | "error"
- `query`: The original user question
- `summary`: Markdown-formatted AI summary with sections:
  - Direct Answer to the question
  - Applicable Legislation (RA numbers, dates, agencies)
  - Key Requirements and Provisions
  - Who Is Affected
  - Next Steps and Resources
- `search_queries_used`: The 3-7 search terms generated internally
- `documents_found`: Total unique documents retrieved

**Example Usage (cURL):**
```bash
curl -X POST "http://localhost:8000/api/research/simple-rag" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are workplace safety requirements in Philippines?",
    "user_id": "agent_001"
  }'
```

**Example Usage (Python):**
```python
import requests

response = requests.post(
    "http://localhost:8000/api/research/simple-rag",
    json={
        "query": "What is RA 9003?",
        "user_id": "my_agent"
    }
)

data = response.json()
print(data["summary"])
```

**Example Usage (JavaScript/Node.js):**
```javascript
const response = await fetch("http://localhost:8000/api/research/simple-rag", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: "What is RA 9003?",
    user_id: "my_agent"
  })
});

const data = await response.json();
console.log(data.summary);
```

---

### 2. WebSocket Streaming Endpoint

**Endpoint:** `WebSocket /api/research/ws/simple-rag`

**Purpose:** Stream pipeline stages in real-time

**Connection:**
```bash
ws://localhost:8000/api/research/ws/simple-rag
```

**Send Message (after connection):**
```json
{
  "query": "What is RA 9003?"
}
```

**Receive Events (streaming):**
```json
{"stage": "query_generation", "status": "in_progress", "message": "Generating search queries..."}
{"stage": "query_generation", "status": "completed", "message": "Generated 5 queries", "queries": ["RA 9003", "..."]}
{"stage": "search", "status": "in_progress", "message": "Searching legislation database..."}
{"stage": "search", "status": "completed", "message": "Found 15 relevant documents"}
{"stage": "summarization", "status": "in_progress", "message": "Generating summary..."}
{"stage": "summarization", "status": "completed", "message": "Summary generated", "summary": "# EXECUTIVE SUMMARY..."}
```

**Event Fields:**
- `stage`: "query_generation" | "search" | "summarization"
- `status`: "in_progress" | "completed"
- `message`: Human-readable status message
- `queries`: (query_generation only) Array of generated search terms
- `summary`: (summarization only) Final markdown summary

**Example Usage (Python WebSocket):**
```python
import asyncio
import websockets
import json

async def research():
    async with websockets.connect("ws://localhost:8000/api/research/ws/simple-rag") as ws:
        # Send query
        await ws.send(json.dumps({"query": "What is RA 9003?"}))
        
        # Receive events
        async for message in ws:
            event = json.loads(message)
            print(f"[{event['stage']}] {event['message']}")
            if event['stage'] == 'summarization' and event['status'] == 'completed':
                print(event['summary'])
                break

asyncio.run(research())
```

---

### 3. Health Check Endpoint

**Endpoint:** `GET /api/research/health`

**Response:**
```json
{
  "status": "ok",
  "service": "simple_rag"
}
```

---

## Query Requirements

**Valid Queries:**
- 5-500 characters
- Must be a reasonable legislative research question
- Examples:
  - "What is RA 9003?"
  - "What are workplace safety requirements?"
  - "Tell me about environmental protection laws"
  - "What legislation covers solid waste management?"

**Invalid Queries:**
- Empty or too short (< 5 chars)
- Unrelated to Philippine legislation
- Extremely long (> 500 chars)

---

## Response Examples

### Example 1: RA 9003 Query

**Request:**
```json
{
  "query": "What is RA 9003 and what are its main requirements?"
}
```

**Response:**
```json
{
  "status": "completed",
  "query": "What is RA 9003 and what are its main requirements?",
  "summary": "# EXECUTIVE SUMMARY\n\n**RA 9003** (Ecological Solid Waste Management Act of 2000) is Philippines' comprehensive solid waste management law. It mandates source segregation, composting, and recycling.\n\n## APPLICABLE LEGISLATION\n\n- **Republic Act No. 9003**\n  - Date: December 30, 2000\n  - Administering Agency: DENR (Department of Environment and Natural Resources)\n  - Congress: 10th\n\n## KEY REQUIREMENTS\n\n- Source segregation at the point of generation\n- Ban on dumping of mixed waste (effective 2003)\n- Establishment of material recovery facilities\n- Composting of biodegradable waste\n- Producer responsibility for packaging materials\n- Local government units must develop waste management plans\n\n## WHO IS AFFECTED\n\n- Local government units (mandatory)\n- Manufacturing and commercial establishments\n- Households (source segregation requirement)\n- Waste management facilities\n\n## NEXT STEPS\n\n- Contact your Local Government Unit's Environmental Management Office\n- Review the full RA 9003 at Congress website\n- Contact DENR for compliance guidance",
  "search_queries_used": ["RA 9003", "solid waste management Philippines", "ecological waste act"],
  "documents_found": 24
}
```

### Example 2: No Results

**Request:**
```json
{
  "query": "What is the oldest law in Philippine history?"
}
```

**Response:**
```json
{
  "status": "no_results",
  "query": "What is the oldest law in Philippine history?",
  "summary": "No relevant legislation found. Please try a different query.",
  "search_queries_used": ["oldest Philippine law", "historical legislation"],
  "documents_found": 0
}
```

---

## Error Handling

**HTTP 400 - Bad Request:**
```json
{"detail": "Query must be 5-500 characters"}
```

**HTTP 422 - Validation Error:**
```json
{"detail": [{"loc": ["body", "query"], "msg": "field required", "type": "value_error.missing"}]}
```

**HTTP 500 - Server Error:**
```json
{"detail": "Error message describing what went wrong"}
```

---

## Performance

**Typical Latency:**
- Query Generation: 1-2 seconds
- Search: 2-3 seconds
- Summarization: 2-3 seconds
- **Total: 5-8 seconds**

**Concurrent Requests:**
- Supports multiple simultaneous requests
- Each request is independent
- No session/state maintained between requests

---

## Integration Examples

### As a Tool for an AI Agent

```python
# Define as a tool that an LLM agent can call
def research_philippines_legislation(query: str) -> str:
    """Research Philippine legislation and get AI-powered summary.
    
    Args:
        query: The legislative question to research
        
    Returns:
        Markdown-formatted summary of findings
    """
    import requests
    
    response = requests.post(
        "http://localhost:8000/api/research/simple-rag",
        json={"query": query, "user_id": "ai_agent"}
    )
    
    if response.status_code == 200:
        data = response.json()
        return data.get("summary", "No results")
    else:
        return f"Error: {response.status_code}"

# Agent can now use this tool
# Agent: "I need to research RA 9003"
# → Calls: research_philippines_legislation("What is RA 9003?")
# → Returns: Full markdown summary
# Agent: "Based on this summary, the user needs..."
```

### In a Chatbot

```python
# Flask/FastAPI chatbot integration
@app.post("/chat")
async def chat(message: str):
    # If user asks about legislation, use RAG
    if "law" in message.lower() or "RA" in message:
        response = requests.post(
            "http://localhost:8000/api/research/simple-rag",
            json={"query": message}
        )
        return response.json()["summary"]
    else:
        # Use regular chatbot
        return general_chatbot_response(message)
```

---

## Best Practices

1. **Query Formulation**
   - Be specific: "What is RA 9003?" instead of "Tell me about laws"
   - Include RA numbers if known
   - Ask about specific aspects: "What are requirements?", "Who is affected?"

2. **Error Handling**
   - Check `status` field first (completed vs no_results vs error)
   - For no_results: Try a different query formulation
   - For errors: Log error details and retry after delay

3. **Caching**
   - Same queries should return same results (good for caching)
   - Consider caching summaries for frequently asked questions

4. **Rate Limiting**
   - No built-in rate limiting (implement if needed)
   - Typical use: 1-5 requests per minute per agent

---

## Troubleshooting

**Issue: "No results found" but legislation exists**
- Solution: Try different keywords
- Example: "RA 9003" vs "Ecological Solid Waste"

**Issue: Summary is incomplete or missing sections**
- Solution: The legislation may not have been retrieved
- Try: Simpler query, different keywords

**Issue: Response takes > 10 seconds**
- Solution: ChromaDB search is slow on first request
- Try: Subsequent requests are faster (cached)

---

## Deployment

**Start Server:**
```bash
cd /path/to/rag_backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

**With Production Settings:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

**Docker:**
```bash
docker build -t rag-backend .
docker run -p 8000:8000 rag-backend
```

---

## Support

- **Documentation**: See `README_RAG_SYSTEM.md`
- **Database**: 30,000+ Philippine legislative documents
- **Update Frequency**: As needed (run `python scrape.py`)
- **Search Coverage**: Philippine laws, acts, regulations, resolutions
