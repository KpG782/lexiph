# Deep Search - General Mode Only

## Overview

The **Deep Search** button is now **exclusively available in General Mode**. It has been removed from Compliance Mode to simplify the user experience.

---

## 🎯 Current Implementation

### ✅ General Mode
- **Deep Search Button:** Visible
- **Location:** Between input and Send button
- **Purpose:** Enhanced analysis with cross-references
- **Output:** Chat messages with deep search results

### ❌ Compliance Mode
- **Deep Search Button:** Not visible
- **Standard Analysis:** Use Send button for document analysis
- **Output:** Compliance canvas with standard report

---

## 📍 Button Location

### General Mode Only

```
┌─────────────────────────────────────────────────────┐
│ [Message Input.............................] [✨] [📤] │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Icon: Sparkles (✨)
- Color: Purple gradient
- Size: 40x40px
- Position: Between input and Send

---

## 🔄 Mode Comparison

| Feature | General Mode | Compliance Mode |
|---------|-------------|-----------------|
| **Deep Search Button** | ✅ Yes | ❌ No |
| **Standard Send** | ✅ Yes | ✅ Yes |
| **File Upload** | ❌ No | ✅ Yes |
| **Output** | Chat messages | Compliance canvas |
| **Use Case** | Q&A, Research | Document review |

---

## 💡 Why This Change?

### Simplified User Experience
1. **Clear Separation** - General mode for questions, Compliance for documents
2. **Reduced Confusion** - One button per mode for enhanced search
3. **Focused Workflow** - Each mode has its specific purpose
4. **Better UX** - Less cognitive load for users

### Mode-Specific Features
- **General Mode** = Deep Search for comprehensive Q&A
- **Compliance Mode** = Document analysis with compliance reports

---

## 🎯 How to Use

### General Mode - Deep Search

**Step 1:** Switch to General Mode
```
[General] [Compliance]
   ✓
```

**Step 2:** Type your question
```
"What is RA 9003 and its requirements?"
```

**Step 3:** Click Deep Search (✨)
```
[Message Input] [✨] [📤]
                 ↑
              Click here
```

**Step 4:** Wait for enhanced results (4-7 seconds)

**Step 5:** Read comprehensive response with:
- Enhanced summary
- Related documents (with relevance scores)
- Additional insights
- Cross-references

---

### Compliance Mode - Standard Analysis

**Step 1:** Switch to Compliance Mode
```
[General] [Compliance]
             ✓
```

**Step 2:** Upload document
```
[📎] Click to upload
```

**Step 3:** Add optional query (or leave blank)
```
"Check compliance with RA 10121"
```

**Step 4:** Click Send (📤)
```
[📎] [Message Input] [📤]
                      ↑
                  Click here
```

**Step 5:** View compliance report in canvas

---

## 📊 Feature Matrix

| Action | General Mode | Compliance Mode |
|--------|-------------|-----------------|
| **Ask Questions** | ✅ Send or Deep Search | ❌ Not applicable |
| **Upload Documents** | ❌ Not available | ✅ Yes |
| **Standard Analysis** | ✅ Send button | ✅ Send button |
| **Enhanced Analysis** | ✅ Deep Search button | ❌ Not available |
| **View in Chat** | ✅ Yes | ❌ No |
| **View in Canvas** | ❌ No | ✅ Yes |

---

## 🔍 Deep Search vs Standard Send

### General Mode

**Standard Send (📤):**
- Searches 33,562+ documents
- 8-section structured summary
- 50-90 seconds processing
- Good for most questions

**Deep Search (✨):**
- Searches 150+ related documents
- Enhanced cross-referenced summary
- Related documents with scores
- Additional insights
- 4-7 seconds processing
- Best for comprehensive research

### Compliance Mode

**Standard Send (📤):**
- Analyzes uploaded document
- Compliance report in canvas
- Color-coded sections
- Gap analysis
- Recommendations
- 5-9 seconds processing

---

## 💬 Example Workflows

### Example 1: General Mode Question

```
User switches to: General Mode
User types: "What are workplace safety requirements?"
User clicks: Deep Search (✨)

Result:
- Enhanced summary with cross-references
- Related laws: RA 11058, Labor Code, DOLE Orders
- Additional insights about implementation
- Cross-references to related regulations
```

### Example 2: Compliance Mode Document

```
User switches to: Compliance Mode
User uploads: safety-policy.pdf
User types: "Check compliance with workplace safety laws"
User clicks: Send (📤)

Result:
- Compliance canvas opens
- Color-coded compliance report
- ✅ Compliant sections
- ⚠️ Sections needing revision
- 🚫 Critical missing sections
```

---

## 🎨 Visual Design

### General Mode Input

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Type your question about Philippine law...         │
│                                                     │
│  [Message Input.............................] [✨] [📤]│
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Compliance Mode Input

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Upload a document and ask about compliance...      │
│                                                     │
│  [📎] [Message Input.......................] [📤]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Changes

### Files Modified

1. **`components/chat/chat-input.tsx`**
   - Deep Search button now only shows when `mode === 'general'`
   - Removed from Compliance Mode

2. **`components/chat/compliance-canvas.tsx`**
   - Removed Deep Search button from canvas header
   - Removed `handleDeepSearch` function
   - Removed `isDeepSearching` state
   - Cleaned up unused imports

3. **`docs/DEEP_SEARCH_LOCATIONS.md`**
   - Updated to reflect General Mode only
   - Removed Compliance Mode sections

### Code Changes

**Before:**
```typescript
// Deep Search in both modes
<button onClick={handleDeepSearch}>
  Deep Search
</button>
```

**After:**
```typescript
// Deep Search in General Mode only
{mode === 'general' && (
  <button onClick={handleDeepSearch}>
    Deep Search
  </button>
)}
```

---

## ✅ Benefits

### For Users
1. **Clearer Interface** - Less buttons, less confusion
2. **Mode-Specific Tools** - Each mode has its purpose
3. **Faster Learning** - Easier to understand what each mode does
4. **Better Workflow** - Natural separation of tasks

### For Developers
1. **Simpler Code** - Less conditional logic
2. **Easier Maintenance** - Fewer edge cases
3. **Clear Separation** - Mode-specific features
4. **Better Testing** - Focused test cases

---

## 📚 Related Documentation

- `GENERAL_CHAT_RAG_INTEGRATION.md` - How RAG works in General Mode
- `DEEP_SEARCH_FEATURE.md` - Deep Search technical details
- `CHAT_INPUT_BUTTONS.md` - All chat input buttons
- `COMPLIANCE_MODE_GUIDE.md` - Compliance Mode features

---

## 🔮 Future Considerations

### Potential Enhancements

1. **Unified Deep Search** - Option to enable in both modes
2. **User Preference** - Let users choose button visibility
3. **Context-Aware** - Auto-suggest deep search when appropriate
4. **Quick Actions** - Right-click menu for deep search

### User Feedback

If users request Deep Search in Compliance Mode:
- Consider adding as optional feature
- Evaluate use cases
- Test with user groups
- Implement if valuable

---

*Last updated: November 8, 2025*
