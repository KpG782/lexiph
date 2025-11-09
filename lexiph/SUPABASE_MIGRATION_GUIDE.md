# Supabase Migration Guide

This guide will help you migrate from mock data to Supabase for production.

## Database Schema

### 1. Create Tables

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chats table
CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message_count INTEGER DEFAULT 0,
  last_message_preview TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_chats_user_id ON public.chats(user_id);
CREATE INDEX idx_chats_updated_at ON public.chats(updated_at DESC);
CREATE INDEX idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
```

### 2. Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Chats policies
CREATE POLICY "Users can view own chats"
  ON public.chats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own chats"
  ON public.chats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chats"
  ON public.chats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chats"
  ON public.chats FOR DELETE
  USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own chats"
  ON public.messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in own chats"
  ON public.messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete messages in own chats"
  ON public.messages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND chats.user_id = auth.uid()
    )
  );
```

### 3. Database Functions

```sql
-- Function to update chat's updated_at timestamp
CREATE OR REPLACE FUNCTION update_chat_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.chats
  SET updated_at = NOW()
  WHERE id = NEW.chat_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update chat timestamp when message is added
CREATE TRIGGER update_chat_on_message
AFTER INSERT ON public.messages
FOR EACH ROW
EXECUTE FUNCTION update_chat_timestamp();

-- Function to update message count
CREATE OR REPLACE FUNCTION update_message_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.chats
    SET message_count = message_count + 1,
        last_message_preview = LEFT(NEW.content, 100)
    WHERE id = NEW.chat_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.chats
    SET message_count = GREATEST(message_count - 1, 0)
    WHERE id = OLD.chat_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update message count
CREATE TRIGGER update_message_count_trigger
AFTER INSERT OR DELETE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION update_message_count();
```

## Code Migration Steps

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Update Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Create Supabase Client

Create `lib/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 4: Update Chat Store

Replace mock functions in `lib/store/chat-store.ts`:

```typescript
import { supabase } from '@/lib/supabase/client'

// Replace fetchChats
fetchChats: async () => {
  set({ loading: true })
  
  try {
    const { data, error } = await supabase
      .from('chats')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    
    set({ 
      chats: data || [],
      loading: false 
    })
  } catch (error) {
    console.error('Failed to fetch chats:', error)
    set({ loading: false })
  }
},

// Replace createChat
createChat: async (title?: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const newChat = {
    title: title || 'New Chat',
    user_id: user.id,
    message_count: 0
  }
  
  try {
    const { data, error } = await supabase
      .from('chats')
      .insert(newChat)
      .select()
      .single()
    
    if (error) throw error
    
    set(state => ({ 
      chats: [data, ...state.chats],
      activeChat: data,
      messages: {
        ...state.messages,
        [data.id]: []
      }
    }))
    
    return data
  } catch (error) {
    console.error('Failed to create chat:', error)
    throw error
  }
},

// Replace deleteChat
deleteChat: async (id: string) => {
  try {
    const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    set(state => {
      const newChats = state.chats.filter(c => c.id !== id)
      const newActiveChat = state.activeChat?.id === id ? null : state.activeChat
      const newMessages = { ...state.messages }
      delete newMessages[id]
      
      return {
        chats: newChats,
        activeChat: newActiveChat,
        messages: newMessages
      }
    })
  } catch (error) {
    console.error('Failed to delete chat:', error)
    throw error
  }
},

// Replace fetchMessages
fetchMessages: async (chatId: string) => {
  set({ loadingMessages: true })
  
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    set(state => ({
      messages: {
        ...state.messages,
        [chatId]: data || []
      },
      loadingMessages: false
    }))
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    set({ loadingMessages: false })
  }
},

// Replace addMessage
addMessage: async (chatId: string, message: Omit<Message, 'id' | 'created_at'>) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_id: chatId,
        role: message.role,
        content: message.content,
        metadata: message.metadata
      })
      .select()
      .single()
    
    if (error) throw error
    
    set(state => {
      const chatMessages = state.messages[chatId] || []
      
      return {
        messages: {
          ...state.messages,
          [chatId]: [...chatMessages, data]
        }
      }
    })
  } catch (error) {
    console.error('Failed to add message:', error)
    throw error
  }
}
```

### Step 5: Update Message Functions

Replace `lib/mock-data/messages.ts` with `lib/supabase/messages.ts`:

```typescript
import { supabase } from './client'
import { Message } from '@/types'

export async function getMessagesForChat(chatId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function addMessage(
  chatId: string, 
  message: Omit<Message, 'id' | 'created_at'>
): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      chat_id: chatId,
      role: message.role,
      content: message.content,
      metadata: message.metadata
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteMessagesForChat(chatId: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('chat_id', chatId)
  
  if (error) throw error
}
```

## Real-time Updates (Optional)

Add real-time subscriptions for live updates:

```typescript
// In chat store
useEffect(() => {
  const channel = supabase
    .channel('chats')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chats',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        // Handle real-time updates
        if (payload.eventType === 'INSERT') {
          set(state => ({
            chats: [payload.new, ...state.chats]
          }))
        } else if (payload.eventType === 'UPDATE') {
          set(state => ({
            chats: state.chats.map(chat =>
              chat.id === payload.new.id ? payload.new : chat
            )
          }))
        } else if (payload.eventType === 'DELETE') {
          set(state => ({
            chats: state.chats.filter(chat => chat.id !== payload.old.id)
          }))
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [user])
```

## Testing Checklist

- [ ] Create new chat
- [ ] Fetch chats list
- [ ] Select chat and load messages
- [ ] Send message
- [ ] Delete chat
- [ ] Update chat title
- [ ] Test RLS policies (try accessing other user's data)
- [ ] Test real-time updates (if implemented)
- [ ] Test error handling
- [ ] Test loading states

## Performance Optimization

1. **Pagination**: Implement cursor-based pagination for large chat lists
2. **Caching**: Use React Query or SWR for client-side caching
3. **Indexes**: Ensure all foreign keys have indexes
4. **Lazy Loading**: Load messages only when chat is opened
5. **Optimistic Updates**: Update UI before API response

## Security Considerations

1. **RLS Policies**: Always test RLS policies thoroughly
2. **Input Validation**: Validate all user inputs
3. **Rate Limiting**: Implement rate limiting for API calls
4. **API Keys**: Never expose service role key in client code
5. **CORS**: Configure CORS properly in Supabase dashboard

## Monitoring

1. **Error Tracking**: Integrate Sentry or similar
2. **Analytics**: Track user interactions
3. **Performance**: Monitor query performance in Supabase dashboard
4. **Logs**: Review Supabase logs regularly
