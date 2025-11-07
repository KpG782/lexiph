# Zustand Store Specification

## Store Structure

### AuthStore
```typescript
{
  user: User | null,
  session: Session | null,
  loading: boolean,
  
  // Actions
  setUser: (user: User | null) => void,
  setSession: (session: Session | null) => void,
  signIn: (email: string, password: string) => Promise<void>,
  signUp: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  checkSession: () => Promise<void>
}
```

### ChatStore (Future Phase)
```typescript
{
  messages: Message[],
  loading: boolean,
  
  // Actions
  addMessage: (message: Message) => void,
  clearMessages: () => void,
  sendMessage: (content: string) => Promise<void>
}
```

## Persistence
- AuthStore: No persistence (Supabase handles it)
- ChatStore: LocalStorage for message history (future)

## State Updates
- Optimistic updates for UX
- Error rollback on API failure
- Loading states for all async actions