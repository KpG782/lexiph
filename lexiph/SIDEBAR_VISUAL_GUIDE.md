# Sidebar Visual Guide

## 🎨 Updated Left Sidebar Layout

```
┌─────────────────┐
│                 │
│  ┌───────────┐  │  ← Chat History (MessageSquare)
│  │  💬        │  │     Opens/closes chat sidebar
│  └───────────┘  │
│                 │
│  ┌───────────┐  │  ← New Chat (PenSquare)
│  │  ✏️        │  │     Creates new chat session
│  └───────────┘  │
│                 │
│  ┌───────────┐  │  ← Search Documents (Search) ✨ NEW DIALOG
│  │  🔍        │  │     Opens search dialog
│  └───────────┘  │
│                 │
│  ┌───────────┐  │  ← Uploaded Files (FileText) ✨ UPDATED
│  │  📄        │  │     Opens files dialog (was Gallery)
│  └───────────┘  │
│                 │
│       ⋮         │
│                 │
│  ┌───────────┐  │  ← Profile (User Avatar) ✨ UPDATED
│  │  👤        │  │     Opens profile dialog
│  └───────────┘  │
│                 │
└─────────────────┘

❌ REMOVED: Upgrade button (Sparkles icon)
```

## 📱 Dialog Previews

### 1. Search Dialog

```
┌─────────────────────────────────────────────────────────┐
│  🔍 Search Documents                              ✕     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 🔍  Search for laws, regulations...            │    │
│  └────────────────────────────────────────────────┘    │
│  [Search]                                               │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ RA 9003 - Ecological Solid Waste Management    │    │
│  │ An Act providing for an ecological solid...    │    │
│  │ 📅 2024-01-15  🏷️ Environment | Waste         │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ Data Privacy Act of 2012                       │    │
│  │ An Act protecting individual personal...       │    │
│  │ 📅 2024-01-10  🏷️ Privacy | Data Protection   │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2. Uploaded Files Dialog

```
┌─────────────────────────────────────────────────────────┐
│  📄 Uploaded Files                                ✕     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📄  Barangay_Disaster_Plan.pdf                 │    │
│  │     2.4 MB  📅 Today                           │    │
│  │                          👁️ 💾 🗑️              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📝  Compliance_Checklist.docx                  │    │
│  │     512 KB  📅 Yesterday                       │    │
│  │                          👁️ 💾 🗑️              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📋  Policy_Draft.md                            │    │
│  │     100 KB  📅 2 days ago                      │    │
│  │                          👁️ 💾 🗑️              │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ─────────────────────────────────────────────────     │
│  Total: 3 files (3.0 MB)                                │
└─────────────────────────────────────────────────────────┘
```

### 3. Profile Dialog

```
┌─────────────────────────────────────────────────────────┐
│  👤 Profile                                       ✕     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    ┌─────────┐                          │
│                    │         │                          │
│                    │   👤    │  ← Avatar or gradient    │
│                    │         │                          │
│                    └─────────┘                          │
│                   John Doe                              │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ ✉️  Email                                      │    │
│  │     john.doe@example.com                       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 📅  Member Since                               │    │
│  │     January 15, 2024                           │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 🛡️  Account Status                             │    │
│  │     🟢 Verified                                 │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ─────────────────────────────────────────────────     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ 🚪 Sign Out                                    │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 🎯 User Interaction Flow

### Search Flow
```
1. User clicks Search icon (🔍) in sidebar
   ↓
2. Search dialog opens
   ↓
3. User types query and presses Enter or clicks Search
   ↓
4. Results appear with document info
   ↓
5. User clicks result to view details
   ↓
6. User closes dialog (X, Escape, or backdrop click)
```

### Files Flow
```
1. User clicks Uploaded Files icon (📄) in sidebar
   ↓
2. Files dialog opens showing all uploaded files
   ↓
3. User can:
   - View file (👁️ icon)
   - Download file (💾 icon)
   - Delete file (🗑️ icon)
   ↓
4. User closes dialog
```

### Profile Flow
```
1. User clicks Profile avatar (👤) in sidebar
   ↓
2. Profile dialog opens showing:
   - Avatar
   - Name
   - Email
   - Member since date
   - Verification status
   ↓
3. User can:
   - View information (read-only)
   - Sign out
   ↓
4. User closes dialog or signs out
```

## 🎨 Color Coding

### Dialog States
- **Active/Hover**: Iris blue (#6366f1)
- **Default**: Neutral gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### File Icons
- 📄 PDF files
- 📝 Word documents
- 📋 Markdown/Text files
- 📁 Other files

### Status Indicators
- 🟢 Verified (green dot)
- 🟡 Pending (amber dot)

## 📐 Responsive Behavior

### Desktop (≥768px)
- Sidebar always visible (64px width)
- Dialogs centered on screen
- Max width: 2xl (672px) for Search/Files
- Max width: md (448px) for Profile

### Mobile (<768px)
- Sidebar hidden by default
- Dialogs full width with padding
- Touch-friendly button sizes
- Swipe to close dialogs

## ⌨️ Keyboard Shortcuts

### Global
- `Escape` - Close any open dialog
- `Tab` - Navigate between elements
- `Enter` - Confirm actions

### Search Dialog
- `Enter` - Submit search
- `Ctrl/Cmd + K` - Focus search (future)

### Files Dialog
- `Delete` - Delete selected file (with confirmation)

## 🎭 Animation & Transitions

### Dialog Open/Close
```css
- Fade in: 200ms ease-out
- Fade out: 150ms ease-in
- Scale: 0.95 → 1.0
- Backdrop: opacity 0 → 0.5
```

### Button Hover
```css
- Background: 200ms ease
- Scale: 1.0 → 1.05 (subtle)
- Shadow: 200ms ease
```

### List Items
```css
- Hover: border color change (200ms)
- Actions: opacity 0 → 1 on hover
```

## 🔒 Security & Privacy

### Profile Dialog
- ✅ Shows only necessary user data
- ✅ No password display
- ✅ No sensitive information
- ✅ Secure sign out

### Files Dialog
- ✅ User can only see their own files
- ✅ Delete requires confirmation
- ✅ File actions are logged

### Search Dialog
- ✅ Search queries are not stored
- ✅ Results filtered by permissions
- ✅ No sensitive data in previews

## 📊 Empty States

### Search - No Results
```
     🔍
No results found for "query"
Try different keywords or check your spelling
```

### Search - Initial
```
     🔍
Start searching for Philippine laws and regulations
Enter keywords to find relevant documents
```

### Files - No Files
```
     📁
No files uploaded yet
Upload documents to analyze them for compliance
```

## 🎯 Success Indicators

### Search
- Results count: "Found 3 documents"
- Highlight matching terms
- Show relevance score

### Files
- Upload success: Green toast
- Delete success: "File deleted"
- Download: Browser download

### Profile
- Sign out: Redirect to login
- Data loaded: Smooth transition

## 🚀 Performance

### Dialog Loading
- Instant open (<50ms)
- Lazy load content
- Smooth animations

### Search
- Debounced input (300ms)
- Cancel previous requests
- Show loading state

### Files
- Paginated list (future)
- Virtual scrolling (future)
- Cached file metadata

This visual guide helps understand the new sidebar functionality and user experience!
