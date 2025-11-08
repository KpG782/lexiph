# Testing Guide - Complete Backend Integration

## 🧪 How to Test Everything

### Prerequisites
1. ✅ Supabase project set up
2. ✅ Database tables created (`supabase-setup.sql`)
3. ✅ Storage bucket created (`supabase-storage-setup.sql`)
4. ✅ Sample data inserted (`supabase-insert-data-ken.sql` or `supabase-insert-data-mark.sql`)
5. ✅ Environment variables configured

## Test 1: Chat Management

### Create New Chat
1. Open `/chat`
2. Type a message in centered input
3. Click send
4. **Expected:** New chat appears in sidebar
5. **Verify in Supabase:** Check `chats` table for new entry

### View Chat List
1. Refresh page
2. **Expected:** All chats load from Supabase
3. **Verify:** 6 sample chats visible (if you ran insert script)

### Select Chat
1. Click any chat in sidebar
2. **Expected:** Navigate to `/chat/[chatId]`
3. **Expected:** Messages load from Supabase
4. **Verify:** Message history displays correctly

### Delete Chat
1. Hover over a chat
2. Click delete icon
3. Confirm deletion
4. **Expected:** Chat removed from sidebar
5. **Verify in Supabase:** Chat deleted from `chats` table
6. **Verify:** Messages also deleted (cascade)

## Test 2: Message System

### Send Message (General Mode)
1. Open a chat or create new one
2. Type: "What are the requirements for RA 10173?"
3. Click send
4. **Expected:** Message appears in chat
5. **Verify in Supabase:** Check `messages` table
6. **Expected:** Message saved with correct `chat_id`, `role`, `content`

### Message Persistence
1. Send a few messages
2. Refresh page
3. **Expected:** All messages still visible
4. **Expected:** Messages loaded from Supabase

### Message Metadata
1. Send a message
2. Check Supabase `messages` table
3. **Expected:** `metadata` field contains JSONB data
4. **Expected:** Timestamps are correct

## Test 3: File Upload System

### Upload Single File (Compliance Mode)
1. Switch to Compliance mode (toggle at bottom)
2. Drag and drop a PDF file
3. **Expected:** File appears in uploaded files list
4. **Expected:** File name and size shown
5. Type: "Analyze this document"
6. Click send
7. **Expected:** Loading indicator shows
8. **Verify in Supabase Storage:**
   - Go to Storage → documents bucket
   - Check for file under your `user_id` folder
9. **Verify in Database:**
   - Check `documents` table
   - Verify `file_name`, `file_size`, `storage_path`, `status`

### Upload Multiple Files
1. Drag and drop 3 PDF files
2. **Expected:** All 3 files shown
3. **Expected:** Can remove individual files
4. Click send
5. **Expected:** All files upload to Supabase
6. **Verify:** 3 entries in `documents` table

### File Size Validation
1. Try to upload file > 5MB
2. **Expected:** Error message shown
3. **Expected:** File not added to list

### File Type Validation
1. Try to upload .exe or .zip file
2. **Expected:** Error message shown
3. **Expected:** Only PDF, Word, TXT, MD allowed

### Maximum Files Limit
1. Upload 3 files
2. Try to add 4th file
3. **Expected:** Error: "Maximum 3 documents allowed"
4. **Expected:** 4th file not added

## Test 4: Empty State

### General Mode Empty State
1. Open `/chat` (no active chat)
2. **Expected:** Greeting with your name
3. **Expected:** "Your AI assistant for Philippine legal compliance"
4. **Expected:** 4 general prompts shown
5. Click a prompt
6. **Expected:** Creates new chat with that prompt

### Compliance Mode Empty State
1. Switch to Compliance mode
2. **Expected:** "Upload documents for compliance analysis"
3. **Expected:** Different prompts (compliance-focused)
4. Drag and drop a file
5. **Expected:** File shown in empty state
6. **Expected:** Can send with or without message

## Test 5: Mode Switching

### Switch from General to Compliance
1. Start in General mode
2. Toggle to Compliance mode
3. **Expected:** UI updates
4. **Expected:** File upload area appears
5. **Expected:** Different prompts shown

### Switch from Compliance to General
1. Start in Compliance mode
2. Upload a file
3. Toggle to General mode
4. **Expected:** File upload area hidden
5. **Expected:** General prompts shown

## Test 6: User Authentication

### Login
1. Go to `/auth/login`
2. Login with test account
3. **Expected:** Redirect to `/chat`
4. **Expected:** Chats load for that user only

### User-Specific Data
1. Login as Ken (kenpatrickgarcia123@gmail.com)
2. **Expected:** See Ken's 6 chats
3. Logout
4. Login as Mark (msiazon.k12043276@umak.edu.ph)
5. **Expected:** See Mark's 6 chats (different from Ken's)
6. **Verify:** Users can't see each other's data

### Profile Data
1. Check Supabase `profiles` table
2. **Expected:** Profile created on signup
3. **Expected:** `full_name`, `email` populated

## Test 7: Real-time Updates

### Chat List Updates
1. Open app in two browser tabs
2. Create chat in tab 1
3. **Expected:** Chat appears in tab 2 (if realtime enabled)

### Message Updates
1. Open same chat in two tabs
2. Send message in tab 1
3. **Expected:** Message appears in tab 2 (if realtime enabled)

## Test 8: Error Handling

### Network Error
1. Disconnect internet
2. Try to send message
3. **Expected:** Error message shown
4. **Expected:** Retry option available

### Upload Error
1. Try to upload invalid file
2. **Expected:** Clear error message
3. **Expected:** File not uploaded

### Database Error
1. (Simulate by temporarily disabling RLS)
2. Try to access data
3. **Expected:** Permission denied error
4. **Expected:** User-friendly message

## Test 9: Performance

### Large Chat List
1. Create 20+ chats
2. **Expected:** List loads quickly
3. **Expected:** Smooth scrolling
4. **Expected:** No lag

### Large Message History
1. Send 50+ messages in a chat
2. **Expected:** Messages load quickly
3. **Expected:** Smooth scrolling
4. **Expected:** No memory leaks

### File Upload Speed
1. Upload 5MB file
2. **Expected:** Progress indicator
3. **Expected:** Completes in reasonable time
4. **Expected:** No timeout errors

## Test 10: Mobile Responsiveness

### Mobile View
1. Open on mobile device or resize browser
2. **Expected:** Sidebar collapses
3. **Expected:** Menu button appears
4. **Expected:** All features work
5. **Expected:** File upload works on mobile

### Touch Interactions
1. Test drag and drop on touch device
2. **Expected:** Works smoothly
3. **Expected:** Visual feedback

## 🔍 Verification Queries

### Check User's Chats
```sql
SELECT 
  c.id,
  c.title,
  c.mode,
  COUNT(m.id) as message_count
FROM chats c
LEFT JOIN messages m ON c.id = m.chat_id
WHERE c.user_id = 'YOUR_USER_ID'
GROUP BY c.id
ORDER BY c.created_at DESC;
```

### Check User's Documents
```sql
SELECT 
  id,
  file_name,
  file_size,
  file_type,
  status,
  created_at
FROM documents
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC;
```

### Check Storage Files
```sql
SELECT 
  name,
  bucket_id,
  created_at
FROM storage.objects
WHERE bucket_id = 'documents'
AND name LIKE 'YOUR_USER_ID/%';
```

## ✅ Success Criteria

### All Tests Pass When:
- ✅ Chats create and persist
- ✅ Messages send and load
- ✅ Files upload to storage
- ✅ Metadata saves to database
- ✅ RLS policies work correctly
- ✅ No cross-user data access
- ✅ Error handling works
- ✅ UI is responsive
- ✅ Performance is acceptable
- ✅ No console errors

## 🐛 Common Issues

### Issue: Chats not loading
**Solution:** Check RLS policies, verify user is authenticated

### Issue: Files not uploading
**Solution:** Check storage bucket exists, verify policies applied

### Issue: Permission denied
**Solution:** Check RLS policies match user_id

### Issue: Slow performance
**Solution:** Check database indexes, optimize queries

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Chat Management:        [ ] Pass  [ ] Fail
Message System:         [ ] Pass  [ ] Fail
File Upload:            [ ] Pass  [ ] Fail
Empty State:            [ ] Pass  [ ] Fail
Mode Switching:         [ ] Pass  [ ] Fail
Authentication:         [ ] Pass  [ ] Fail
Real-time Updates:      [ ] Pass  [ ] Fail
Error Handling:         [ ] Pass  [ ] Fail
Performance:            [ ] Pass  [ ] Fail
Mobile Responsiveness:  [ ] Pass  [ ] Fail

Notes:
_________________________________
_________________________________
_________________________________
```

## 🎯 Ready for Production When:

- [ ] All tests pass
- [ ] No critical bugs
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Documentation complete
- [ ] Error handling robust
- [ ] Mobile tested
- [ ] Cross-browser tested
- [ ] Load tested
- [ ] Backup strategy in place
