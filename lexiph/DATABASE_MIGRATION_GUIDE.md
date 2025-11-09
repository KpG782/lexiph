# Database Migration Guide
## From Mock Data to Supabase

This guide explains how to set up your Supabase database and migrate from mock data to real database integration.

## Step 1: Set Up Supabase Database

### 1.1 Run Main Setup SQL
1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the entire `supabase-setup.sql` file
3. Click **Run** (Ctrl/Cmd + Enter)
4. Wait for "Success" message

This creates:
- All tables (profiles, chats, messages, documents, etc.)
- Row Level Security policies
- Indexes
- Triggers and functions
- Realtime subscriptions

### 1.2 Create Storage Bucket
1. Go to **Storage** → **New bucket**
2. Settings:
   - Name: `documents`
   - Public: **OFF**
   - File size limit: `5242880` (5MB)
   - Allowed MIME types:
     ```
     application/pdf
     application/msword
     application/vnd.openxmlformats-officedocument.wordprocessingml.document
     text/plain
     ```
3. Click **Create**

### 1.3 Apply Storage Policies
1. Go back to **SQL Editor** → New query
2. Copy and paste `supabase-storage-setup.sql`
3. Click **Run**

## Step 2: Sign Up Your User

1. Run your app: `npm run dev`
2. Go to `/auth/signup`
3. Sign up with: **kenpatrickgarcia123@gmail.com**
4. Complete the signup process

## Step 3: Insert Mock Data

### 3.1 Get Your User ID
1. Go to Supabase Dashboard → **SQL Editor**
2. Run this query:
```sql
SELECT id, email FROM auth.users WHERE email = 'kenpatrickgarcia123@gmail.com';
```
3. Copy the UUID (your user ID)

### 3.2 Insert Sample Chats and Messages
1. Open `supabase-insert-mock-data.sql`
2. The script will automatically use your user ID
3. Copy the entire file
4. Paste in SQL Editor
5. Click **Run**

This inserts:
- ✅ 6 sample chats
- ✅ 16 sample messages with realistic Philippine law content
- ✅ Proper timestamps and metadata

### 3.3 Verify Data
Run this query to verify:
```sql
SELECT 
  c.id,
  c.title,
  c.mode,
  COUNT(m.id) as message_count
FROM public.chats c
LEFT JOIN public.messages m ON c.id = m.chat_id
WHERE c.user_id = (SELECT id FROM auth.users WHERE email = 'kenpatrickgarcia123@gmail.com')
GROUP BY c.id, c.title, c.mode
ORDER BY c.created_at DESC;
```

You should see 6 chats with their message counts.

## Step 4: Update Environment Variables

Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 5: Test the Integration

### 5.1 Test Chat List
1. Restart your dev server: `npm run dev`
2. Login with kenpatrickgarcia123@gmail.com
3. You should see 6 chats in the sidebar:
   - Barangay Disaster Preparedness Plan
   - Waste Management Compliance
   - Flood Control Project Permits
   - Employee Data Privacy Compliance
   - Environmental Compliance Certificate
   - Workplace Safety Requirements

### 5.2 Test Messages
1. Click on any chat
2. You should see the conversation history
3. Messages should load from Supabase

### 5.3 Test Create New Chat
1. Click "New Chat" button
2. A new chat should be created in Supabase
3. Check Supabase Dashboard → Table Editor → chats

### 5.4 Test Send Message
1. Type a message and send
2. Message should be saved to Supabase
3. Check Supabase Dashboard → Table Editor → messages

### 5.5 Test Delete Chat
1. Hover over a chat
2. Click delete icon
3. Confirm deletion
4. Chat and all messages should be deleted from Supabase

## What Changed in the Code

### Before (Mock Data):
```typescript
// Using local mock data
const mockChats = [...]
chats: mockChats
```

### After (Supabase):
```typescript
// Fetching from Supabase
const { data: chats } = await supabase
  .from('chats')
  .select('*')
  .eq('user_id', user.id)
```

## Updated Files

### ✅ `lib/supabase/client.ts`
- Added `createClient()` function
- Exports Supabase client instance

### ✅ `lib/store/chat-store.ts`
- `fetchChats()` - Now fetches from Supabase
- `fetchMessages()` - Now fetches from Supabase
- `createChat()` - Now inserts to Supabase
- `deleteChat()` - Now deletes from Supabase
- `updateChatTitle()` - Now updates in Supabase
- `addMessage()` - Now inserts to Supabase
- Removed all mock data

## Database Schema

### Chats Table
```sql
chats (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT,
  mode TEXT ('general' | 'compliance'),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
```

### Messages Table
```sql
messages (
  id UUID PRIMARY KEY,
  chat_id UUID REFERENCES chats,
  role TEXT ('user' | 'assistant' | 'system'),
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ
)
```

## Security Features

### Row Level Security (RLS)
All tables have RLS enabled:
- Users can only see their own chats
- Users can only see messages from their own chats
- All operations are user-scoped

### Policies Applied
- `SELECT`: Users can view own data
- `INSERT`: Users can create own data
- `UPDATE`: Users can update own data
- `DELETE`: Users can delete own data

## Troubleshooting

### Issue: No chats showing
**Solution:**
1. Check if you're logged in
2. Verify user_id in database matches auth.users
3. Check browser console for errors
4. Verify RLS policies are applied

### Issue: "relation does not exist"
**Solution:**
1. Re-run `supabase-setup.sql`
2. Check that all tables were created
3. Verify you're in the correct project

### Issue: "permission denied"
**Solution:**
1. Check RLS policies are enabled
2. Verify user is authenticated
3. Check that user_id matches in queries

### Issue: Messages not loading
**Solution:**
1. Check chat_id is correct
2. Verify messages table has data
3. Check browser console for errors
4. Verify foreign key relationships

## Sample Data Content

The mock data includes realistic Philippine law scenarios:

1. **Barangay Disaster Preparedness** - RA 10121 compliance
2. **Waste Management** - RA 9003 requirements
3. **Flood Control Permits** - DPWH and MMDA requirements
4. **Data Privacy** - RA 10173 compliance
5. **Environmental Clearance** - ECC requirements
6. **Workplace Safety** - Labor Code requirements

## Next Steps

After successful migration:

1. ✅ Test all CRUD operations
2. ✅ Verify realtime updates work
3. ✅ Test with multiple users
4. ✅ Add more sample data if needed
5. ✅ Set up proper error handling
6. ✅ Add loading states
7. ✅ Implement optimistic updates
8. ✅ Add data validation

## Production Checklist

Before deploying:

- [ ] Enable email confirmations
- [ ] Set up database backups
- [ ] Review all RLS policies
- [ ] Test with production data
- [ ] Set up monitoring
- [ ] Configure rate limiting
- [ ] Review security settings
- [ ] Test error scenarios
- [ ] Verify data retention policies
- [ ] Set up analytics

## Support

For issues:
- Check Supabase logs in Dashboard
- Review browser console errors
- Verify environment variables
- Check network requests in DevTools
- Review RLS policies in Supabase

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Guide](https://supabase.com/docs/guides/realtime)
- [Storage Guide](https://supabase.com/docs/guides/storage)
