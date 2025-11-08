# Quick Instructions: Insert Sample Data

## For User: kenpatrickgarcia123@gmail.com
**User ID:** `c887ef8b-7af0-4701-a879-4d16e1e5d768`

## Step-by-Step

### 1. Open Supabase SQL Editor
- Go to your Supabase Dashboard
- Click **SQL Editor** in the left sidebar
- Click **New query**

### 2. Copy and Paste SQL
- Open file: `supabase-insert-data-ken.sql`
- Copy the ENTIRE file contents
- Paste into the SQL Editor

### 3. Run the Script
- Click **Run** button (or press Ctrl/Cmd + Enter)
- Wait for "Success" message
- Should see: "Mock data inserted successfully for user: c887ef8b-7af0-4701-a879-4d16e1e5d768"

### 4. Verify Data
The script includes verification queries at the bottom. You should see:

**Chats Created:**
```
6 chats total:
1. Barangay Disaster Preparedness Plan (4 messages)
2. Waste Management Compliance (2 messages)
3. Flood Control Project Permits (2 messages)
4. Employee Data Privacy Compliance (2 messages)
5. Environmental Compliance Certificate (2 messages)
6. Workplace Safety Requirements (2 messages)
```

**Total Messages:** 16

### 5. Test in App
1. Login with: `kenpatrickgarcia123@gmail.com`
2. You should see 6 chats in the sidebar
3. Click any chat to view messages
4. All data is now from Supabase!

## What Gets Inserted

### Sample Chat Topics (Philippine Law Focus)
- ✅ RA 10121 - Disaster Risk Reduction
- ✅ RA 9003 - Solid Waste Management
- ✅ DPWH/MMDA - Flood Control Permits
- ✅ RA 10173 - Data Privacy Act
- ✅ DENR - Environmental Compliance
- ✅ DOLE - Workplace Safety

### Realistic Content
- Detailed legal requirements
- Step-by-step procedures
- Compliance checklists
- Philippine-specific regulations
- Proper timestamps
- Metadata for search queries

## Troubleshooting

### Error: "User not found"
**Cause:** User ID doesn't exist in auth.users
**Solution:** Make sure you've signed up with kenpatrickgarcia123@gmail.com first

### Error: "Duplicate key value"
**Cause:** Data already inserted
**Solution:** 
```sql
-- Delete existing data first
DELETE FROM public.messages 
WHERE chat_id IN (
  SELECT id FROM public.chats 
  WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768'
);

DELETE FROM public.chats 
WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768';

-- Then run the insert script again
```

### No chats showing in app
**Solution:**
1. Check browser console for errors
2. Verify you're logged in
3. Check Supabase logs
4. Verify RLS policies are enabled

## Manual Verification Queries

### Check Chats
```sql
SELECT 
  id,
  title,
  mode,
  created_at
FROM public.chats
WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768'
ORDER BY created_at DESC;
```

### Check Messages
```sql
SELECT 
  c.title as chat_title,
  m.role,
  LEFT(m.content, 50) as content_preview,
  m.created_at
FROM public.messages m
JOIN public.chats c ON m.chat_id = c.id
WHERE c.user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768'
ORDER BY m.created_at DESC;
```

### Count Everything
```sql
SELECT 
  (SELECT COUNT(*) FROM public.chats WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768') as total_chats,
  (SELECT COUNT(*) FROM public.messages m JOIN public.chats c ON m.chat_id = c.id WHERE c.user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768') as total_messages;
```

Expected result: `6 chats, 16 messages`

## Clean Up (If Needed)

### Delete All Data for This User
```sql
-- Delete messages first (foreign key constraint)
DELETE FROM public.messages 
WHERE chat_id IN (
  SELECT id FROM public.chats 
  WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768'
);

-- Then delete chats
DELETE FROM public.chats 
WHERE user_id = 'c887ef8b-7af0-4701-a879-4d16e1e5d768';
```

## Next Steps

After inserting data:

1. ✅ Login to app
2. ✅ Verify chats appear in sidebar
3. ✅ Click each chat to view messages
4. ✅ Test sending new messages
5. ✅ Test creating new chats
6. ✅ Test deleting chats

## Support

If you encounter issues:
1. Check Supabase logs in Dashboard
2. Review browser console errors
3. Verify user_id matches exactly
4. Check RLS policies are enabled
5. Ensure tables were created correctly

## Files Reference

- `supabase-setup.sql` - Creates all tables
- `supabase-storage-setup.sql` - Sets up file storage
- `supabase-insert-data-ken.sql` - **This file** - Inserts sample data
- `UPDATED_FLOW_GUIDE.md` - Explains new user flow
- `DATABASE_MIGRATION_GUIDE.md` - Complete setup guide
