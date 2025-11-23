# LexInSight Architecture

This document provides a comprehensive overview of LexInSight's architecture, design decisions, and technical implementation.

## ���️ System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   Next.js 16 App (React 19 + TypeScript)           │   │
│  │   - Server Components                                │   │
│  │   - Client Components                                │   │
│  │   - API Routes                                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ State Mgmt   │  │   Services   │  │   Hooks      │     │
│  │  (Zustand)   │  │  (API/RAG)   │  │  (Custom)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      Backend Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Supabase   │  │   RAG API    │  │  WebSocket   │     │
│  │ - PostgreSQL │  │ - Analysis   │  │  - Real-time │     │
│  │ - Auth       │  │ - Embeddings │  │  - Streaming │     │
│  │ - Storage    │  │ - Search     │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## ��� Technology Stack

### Frontend

#### Core Framework
- **Next.js 16.0.1**: React framework with App Router
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API routes
  - File-based routing
  - Image optimization

#### React Ecosystem
- **React 19.2.0**: UI library
  - Server Components
  - Client Components
  - Suspense boundaries
  - Concurrent rendering

#### TypeScript
- **TypeScript 5.x**: Type safety
  - Strict mode enabled
  - Path aliases configured
  - Custom type definitions

#### UI Components
- **Radix UI**: Accessible component primitives
  - Avatar
  - Dialog
  - Dropdown Menu
  - Separator
  - Slot

#### Styling
- **Tailwind CSS 4**: Utility-first CSS
  - Custom design system
  - Responsive utilities
  - Dark mode support (planned)
  - Custom plugins

#### Animation
- **Framer Motion 12.x**: Animation library
  - Page transitions
  - Component animations
  - Gesture handling
  - Layout animations

#### State Management
- **Zustand 5.0.8**: Lightweight state management
  - Auth store
  - Chat store
  - File upload store
  - RAG store
  - Sidebar store

#### Icons
- **Lucide React 0.553.0**: Icon library
  - Tree-shakeable
  - Customizable
  - Consistent design

### Backend

#### Supabase (BaaS)
- **PostgreSQL**: Relational database
  - ACID compliance
  - Full-text search
  - JSON support
  - Row-level security

- **Supabase Auth**: Authentication
  - Email/password
  - OAuth providers (planned)
  - JWT tokens
  - Session management

- **Supabase Storage**: File storage
  - S3-compatible
  - Signed URLs
  - Access policies
  - 5MB file limit

#### External APIs
- **RAG API**: Document analysis
  - Natural language processing
  - Document embeddings
  - Semantic search
  - Compliance checking

- **WebSocket**: Real-time communication
  - Streaming responses
  - Live updates
  - Connection pooling

### Development Tools

- **ESLint 9**: Code linting
- **Git**: Version control
- **npm**: Package management

## ��� Data Flow

### Authentication Flow

```
User → Login Form → Supabase Auth
                         ↓
                    JWT Token
                         ↓
                   Auth Context
                         ↓
                  Protected Routes
```

### Chat Message Flow

```
User Input → Chat Store → API Route
                              ↓
                         RAG Service
                              ↓
                        WebSocket
                              ↓
                     Streaming Response
                              ↓
                       Message Display
```

### File Upload Flow

```
File Selection → Validation → Upload Store
                                   ↓
                            Supabase Storage
                                   ↓
                           Database Record
                                   ↓
                           RAG Processing
                                   ↓
                        Compliance Analysis
```

## ���️ Project Structure

### Directory Organization

```
lexiph/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth route group
│   │   ├── login/              # Login page
│   │   └── signup/             # Signup page
│   ├── (main)/                  # Main app route group
│   │   ├── chat/               # Chat interface
│   │   └── documents/          # Document management
│   ├── api/                     # API routes
│   │   ├── rag/                # RAG proxy endpoints
│   │   └── deep-search/        # Deep search endpoints
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── auth/                    # Authentication
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   ├── chat/                    # Chat components
│   │   ├── ChatContainer.tsx   # Main container
│   │   ├── ChatInput.tsx       # Input component
│   │   ├── ChatMessages.tsx    # Message list
│   │   ├── MessageBubble.tsx   # Individual message
│   │   ├── EmptyState.tsx      # Empty chat state
│   │   └── CenteredInput.tsx   # Initial input
│   ├── layout/                  # Layout components
│   │   ├── ChatHeader.tsx      # Header with user menu
│   │   └── UserMenu.tsx        # User dropdown
│   ├── navigation/              # Navigation
│   │   └── AppSidebar.tsx      # Sidebar with chat list
│   └── ui/                      # Reusable UI
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Dialog.tsx
│       └── Avatar.tsx
│
├── lib/                          # Utilities & services
│   ├── store/                   # Zustand stores
│   │   ├── auth-store.ts       # Auth state
│   │   ├── chat-store.ts       # Chat state
│   │   ├── chat-mode-store.ts  # Mode toggle
│   │   ├── file-upload-store.ts # Upload state
│   │   ├── rag-store.ts        # RAG state
│   │   └── sidebar-store.ts    # Sidebar state
│   ├── services/                # API services
│   │   ├── rag-api.ts          # RAG API client
│   │   └── deep-search-api.ts  # Search client
│   ├── supabase/                # Supabase config
│   │   └── client.ts           # Supabase client
│   ├── utils/                   # Utility functions
│   └── utils.ts                 # Shared utils
│
├── types/                        # TypeScript types
│   └── index.ts                 # Global types
│
├── public/                       # Static assets
│   ├── logo/                    # Logo files
│   └── favicon.ico              # Favicon
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # This file
│   ├── CONTRIBUTING.md          # Contribution guide
│   ├── API.md                   # API documentation
│   └── SETUP.md                 # Setup guide
│
├── .env.local                    # Environment variables
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # Project overview
```

## �� Design Patterns

### Component Patterns

#### 1. Server Components (Default)
```typescript
// app/chat/page.tsx
export default async function ChatPage() {
  // Fetch data on server
  const chats = await getChats()
  
  return <ChatContainer initialChats={chats} />
}
```

#### 2. Client Components (Interactive)
```typescript
'use client'

import { useState } from 'react'

export function ChatInput() {
  const [message, setMessage] = useState('')
  
  return (
    <input 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />
  )
}
```

#### 3. Custom Hooks Pattern
```typescript
// lib/hooks/use-chat.ts
export function useChat(chatId: string) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  
  const sendMessage = async (content: string) => {
    setLoading(true)
    // API call
    setLoading(false)
  }
  
  return { messages, loading, sendMessage }
}
```

#### 4. Store Pattern (Zustand)
```typescript
// lib/store/chat-store.ts
import { create } from 'zustand'

interface ChatState {
  chats: Chat[]
  currentChat: Chat | null
  setChats: (chats: Chat[]) => void
  setCurrentChat: (chat: Chat) => void
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [],
  currentChat: null,
  setChats: (chats) => set({ chats }),
  setCurrentChat: (chat) => set({ currentChat: chat })
}))
```

### State Management Strategy

#### Local State
Use `useState` for:
- Form inputs
- UI toggles
- Component-specific data

#### Global State (Zustand)
Use stores for:
- Authentication state
- Chat data
- File uploads
- Cross-component state

#### Server State
Use Next.js for:
- Initial data fetching
- SEO-critical content
- Static content

## ��� Security Architecture

### Authentication

```
User → Supabase Auth → JWT Token
                            ↓
                    HTTP-only Cookie
                            ↓
                     Middleware Check
                            ↓
                    Protected Routes
```

### Row-Level Security (RLS)

Every database table has RLS policies:

```sql
-- Example: Users can only see their own chats
CREATE POLICY "Users can view own chats"
  ON public.chats
  FOR SELECT
  USING (auth.uid() = user_id);
```

### File Storage Security

```
Upload → Type Check → Size Check
              ↓
      Supabase Storage
              ↓
      Access Policy
              ↓
      Signed URL (1 hour)
```

## ��� Performance Optimization

### Code Splitting

- Route-based splitting (automatic)
- Dynamic imports for heavy components
- Lazy loading for non-critical features

### Caching Strategy

- Static assets: CDN cached
- API responses: Short-term cache
- Database queries: Connection pooling
- Images: Next.js Image optimization

### Database Optimization

- Indexes on frequently queried columns
- Pagination for large datasets
- Efficient query patterns
- Connection pooling

## ��� Data Models

### User Profile
```typescript
interface Profile {
  id: string              // UUID
  email: string           // Unique
  full_name?: string
  avatar_url?: string
  created_at: Date
  updated_at: Date
}
```

### Chat
```typescript
interface Chat {
  id: string              // UUID
  user_id: string         // Foreign key
  title: string
  mode: 'general' | 'compliance'
  created_at: Date
  updated_at: Date
}
```

### Message
```typescript
interface Message {
  id: string              // UUID
  chat_id: string         // Foreign key
  role: 'user' | 'assistant'
  content: string
  metadata?: MessageMetadata
  created_at: Date
}
```

### Document
```typescript
interface Document {
  id: string              // UUID
  user_id: string         // Foreign key
  chat_id?: string        // Optional foreign key
  file_name: string
  file_size: number       // Bytes
  file_type: string       // MIME type
  storage_path: string    // Supabase path
  status: 'pending' | 'processed' | 'error'
  metadata?: DocumentMetadata
  created_at: Date
  updated_at: Date
}
```

## ��� API Integration

### Internal API Routes

```typescript
// app/api/rag/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  
  // Process request
  const response = await ragService.analyze(body)
  
  return Response.json(response)
}
```

### External API Integration

```typescript
// lib/services/rag-api.ts
export async function analyzeDocument(
  file: File,
  query: string
): Promise<AnalysisResult> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('query', query)
  
  const response = await fetch('/api/rag', {
    method: 'POST',
    body: formData
  })
  
  return response.json()
}
```

## ��� Monitoring & Logging

### Error Tracking
- Console errors in development
- Sentry integration (planned)
- Error boundaries for graceful failures

### Performance Monitoring
- Next.js Analytics
- Web Vitals tracking
- Supabase query logs

## �� Testing Strategy

### Unit Tests
- Utility functions
- Custom hooks
- Store logic

### Integration Tests
- Component interactions
- API routes
- Database operations

### E2E Tests
- User workflows
- Critical paths
- Cross-browser testing

## ��� Deployment Architecture

### Production Setup

```
User → Vercel Edge Network
              ↓
       Next.js App (Serverless)
              ↓
     ┌────────┴────────┐
     ↓                 ↓
Supabase          RAG API
(Managed)      (External)
```

### Environment Configuration

- **Development**: `npm run dev`
- **Staging**: Vercel preview deployments
- **Production**: Vercel production deployment

## ��� Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: November 2025
