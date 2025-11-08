# General Chat RAG Integration

## Overview

The **General Chat** mode now uses the RAG API to answer questions about Philippine legislation. When you send a message, it searches through 33,562+ documents to provide accurate, referenced answers.

---

## How It Works

### General Mode Flow

1. **User types a question** about Philippine law
2. **Clicks Send button** (or presses Enter)
3. **RAG API is called** (50-90 seconds processing)
4. **Response appears** in the chat as a message
5. **Conversation continues** with full context

### Example Conversation

```
User: What is RA 9003?


[Loading indicator appears...]

AI: # EXECUTIVE SUMMARY

RA 9003, also known as the Ecological Solid Waste Management Act of 2000, is a comprehensive law that establishes a systematic, comprehensive, and ecological waste management program...

[Full 8-section response with references]

User: What are the penalties for non-compliance?

AI: Based on RA 9003, the penalties for non-compliance include...
```

---

## Differences Between Modes

### General Mode
- **Purpose:** Answer questions about Philippine law
- **Input:** Text queries only
- **Output:** Chat messages with AI responses
- **Display:** Conversation-style interface
- **Use Case:** Quick questions, research, learning

### Compliance Mode
- **Purpose:** Analyze documents for compliance
- **Input:** Documents + optional text
- **Output:** Compliance canvas with detailed report
- **Display:** Split-screen with report viewer
- **Use Case:** Document review, compliance checking

---

## Features in General Mode

### ✅ What Works

1. **RAG-Powered Responses**
   - Searches 33,562+ documents
   - Provides referenced answers
   - 8-section structured summaries

2. **Conversation History**
   - Messages stay in chat
   - Scroll through previous Q&A
   - Context maintained

3. **Loading States**
   - Typing indicator while processing
   - Disabled input during search
   - Clear visual feedback

4. **Error Handling**
   - Graceful failure messages
   - Retry capability
   - Network error detection

### ❌ What's Different

1. **No File Upload** - General mode is text-only
2. **No Compliance Canvas** - Responses appear as messages
3. **No Deep Search** - Standard RAG search only
4. **No Document Analysis** - For documents, use Compliance mode

---

## API Integration

### Endpoint Used
```
POST /api/research/rag-summary
```

### Request
```json
{
  "query": "What is RA 9003?",
  "user_id": "user-123"
}
```

### Response
```json
{
  "status": "completed",
  "query": "What is RA 9003?",
  "summary": "# EXECUTIVE SUMMARY\n\n...",
  "search_queries_used": ["RA 9003", "Solid Waste Management"],
  "documents_found": 42
}
```

### Processing Time
- **Expected:** 50-90 seconds
- **Timeout:** 300 seconds (5 minutes)
- **Stages:**
  1. Query Generation (1-2s)
  2. Database Search (20-30s)
  3. AI Summarization (30-60s)

---

## User Experience

### Sending a Message

1. **Type your question**
   ```
   "What are the requirements for business permits in the Philippines?"
   ```

2. **Click Send or press Enter**
   - Input is disabled
   - Typing indicator appears
   - Message is added to chat

3. **Wait for response** (50-90 seconds)
   - Loading animation shows
   - "AI is typing..." indicator
   - Progress feedback

4. **Read the response**
   - Full 8-section summary
   - References included
   - Formatted markdown

5. **Continue conversation**
   - Ask follow-up questions
   - Build on previous context
   - Explore related topics

---

## Message Format

### User Messages
```
Simple text display
- Left-aligned (or right, depending on design)
- User avatar/icon
- Timestamp
```

### AI Responses
```
Formatted markdown with:
- Executive Summary
- Applicable Legislation
- Key Provisions
- Who Is Affected
- Compliance Timeline
- Penalties
- Related Laws
- Resources & Next Steps
```

---

## Sample Questions

### Good Questions for General Mode

1. **Specific Laws**
   - "What is RA 10173 (Data Privacy Act)?"
   - "Explain RA 9003 requirements"
   - "What does RA 10121 cover?"

2. **General Topics**
   - "What are workplace safety requirements in the Philippines?"
   - "How do I comply with environmental laws?"
   - "What are the penalties for labor violations?"

3. **Compliance Questions**
   - "What documents are needed for business registration?"
   - "What are the requirements for food establishments?"
   - "How do I comply with fire safety regulations?"

4. **Comparative Questions**
   - "What's the difference between RA 9003 and RA 9275?"
   - "How do local and national DRRM laws relate?"
   - "What laws govern data privacy vs information access?"

### Questions Better for Compliance Mode

1. **Document Analysis**
   - "Review this contract for compliance"
   - "Check if this policy meets requirements"
   - "Analyze this disaster plan"

2. **File-Based Queries**
   - Upload PDF + "Is this compliant?"
   - Upload policy + "What's missing?"
   - Upload plan + "Check against RA 10121"

---

## Technical Implementation

### Event Flow

```
User types message
    ↓
Clicks Send
    ↓
chat-input.tsx dispatches 'query-submitted' event
    ↓
chat-container.tsx listens for event
    ↓
Stores query in state
    ↓
submitQuery() called (RAG API)
    ↓
Loading state shown
    ↓
Response received
    ↓
User message + AI message added to chat
    ↓
Messages displayed
```

### State Management

```typescript
// In ChatContainer
const [messages, setMessages] = useState<Message[]>([])
const [currentQuery, setCurrentQuery] = useState<string>('')

// When response arrives
useEffect(() => {
  if (currentResponse && mode === 'general') {
    const userMessage = { role: 'user', content: currentQuery }
    const aiMessage = { role: 'assistant', content: currentResponse.summary }
    setMessages(prev => [...prev, userMessage, aiMessage])
  }
}, [currentResponse])
```

### Message Structure

```typescript
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
  metadata?: {
    ragResponse?: RAGResponse
    searchQueries?: string[]
    documentCount?: number
  }
}
```

---

## Troubleshooting

### Message Not Sending

**Symptoms:**
- Click Send, nothing happens
- No loading indicator
- Message stays in input

**Solutions:**
1. Check network connection
2. Verify RAG API is running
3. Check browser console for errors
4. Try refreshing the page

### Response Takes Too Long

**Symptoms:**
- Loading for more than 2 minutes
- No response after 5 minutes

**Solutions:**
1. Wait up to 5 minutes (timeout)
2. Check API server status
3. Try a simpler question
4. Check server logs

### Response Not Appearing

**Symptoms:**
- Loading completes
- No message appears
- Chat stays empty

**Solutions:**
1. Check browser console
2. Verify message state
3. Check event listeners
4. Refresh and try again

### Formatting Issues

**Symptoms:**
- Response appears as plain text
- No markdown formatting
- Missing sections

**Solutions:**
1. Check MessageBubble component
2. Verify markdown rendering
3. Check CSS styles
4. Review response structure

---

## Future Enhancements

### Planned Features

1. **Streaming Responses**
   - Show response as it's generated
   - Real-time updates
   - Better UX for long responses

2. **Message Actions**
   - Copy response
   - Share message
   - Save to favorites
   - Export conversation

3. **Context Awareness**
   - Remember previous questions
   - Build on conversation history
   - Smarter follow-ups

4. **Rich Formatting**
   - Collapsible sections
   - Interactive references
   - Inline citations
   - Visual highlights

5. **Voice Input**
   - Speak questions
   - Voice responses
   - Accessibility improvements

---

## Comparison Table

| Feature | General Mode | Compliance Mode |
|---------|-------------|-----------------|
| Input | Text only | Text + Files |
| Output | Chat messages | Compliance canvas |
| RAG API | ✅ Yes | ✅ Yes |
| File Upload | ❌ No | ✅ Yes |
| Deep Search | ❌ No | ✅ Yes |
| Canvas View | ❌ No | ✅ Yes |
| Message History | ✅ Yes | ⚠️ Limited |
| Use Case | Q&A, Research | Document Review |

---

## Best Practices

### For Users

1. **Be Specific** - Ask clear, focused questions
2. **One Topic** - Don't combine multiple questions
3. **Wait Patiently** - RAG search takes 50-90 seconds
4. **Read Fully** - Responses are comprehensive
5. **Follow Up** - Ask clarifying questions

### For Developers

1. **Handle Errors** - Graceful failure messages
2. **Show Progress** - Clear loading indicators
3. **Manage State** - Clean message handling
4. **Test Thoroughly** - Various question types
5. **Monitor Performance** - Track response times

---

## Related Documentation

- `RAG_TESTING_QUICKSTART.md` - API testing guide
- `API_INSTRUCTIONS_NEW.md` - API specifications
- `CHAT_INPUT_BUTTONS.md` - Button functionality
- `DEEP_SEARCH_FEATURE.md` - Deep search details

---

*Last updated: November 8, 2025*
