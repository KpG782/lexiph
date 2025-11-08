# Deep Search Button Location

## Overview

The **Deep Search** button appears **only in General Mode** in the chat input area.

---

## 🔍 Deep Search Button Location

### Chat Input (General Mode Only)

**Location:** Bottom of screen, in the message input area

**General Mode:**
```
┌─────────────────────────────────────────────────────┐
│ [Message Input.............................] [✨] [📤] │
└─────────────────────────────────────────────────────┘
```

**Compliance Mode:**
```
┌─────────────────────────────────────────────────────┐
│ [📎] [Message Input.......................] [📤]     │
└─────────────────────────────────────────────────────┘
```
*Note: Deep Search button NOT shown in Compliance Mode*

**When Visible:** Only in General Mode  
**What It Does:**
- Searches 150+ related documents
- Adds enhanced deep search result to chat messages
- Shows related documents and cross-references

---

## 📍 Location Details

### Chat Input Button

**Position:**
- Between message input and Send button
- Always visible
- Same height as Send button (40px)

**Appearance:**
- Icon: Sparkles (✨)
- Color: Purple gradient
- Size: 40x40px square
- Hover: Darker gradient

**States:**
- **Ready:** Purple gradient with sparkles
- **Loading:** Spinning loader
- **Disabled:** Grayed out (50% opacity)

---

### Canvas Header Button

**Position:**
- In the header toolbar
- After Edit button
- Before Save/Download buttons
- Right side of header

**Appearance:**
- Icon: Sparkles (✨)
- Text: "Deep Search"
- Color: Light purple gradient background
- Border: Iris-300

**States:**
- **Ready:** Light gradient with sparkles + text
- **Loading:** Spinner + "Searching..." text
- **Hidden:** When in Edit mode

---

## 🎯 When to Use Each Button

### Use Chat Input Button When:

**General Mode:**
- ✅ Asking questions about laws
- ✅ Want enhanced chat responses
- ✅ Need comprehensive analysis
- ✅ Looking for related legislation

**Compliance Mode:**
- ✅ Have uploaded a document
- ✅ Want to trigger analysis
- ✅ Starting new review
- ✅ First-time deep search

### Use Canvas Header Button When:

**Compliance Mode Only:**
- ✅ Already viewing a report
- ✅ Want to re-run deep search
- ✅ Need updated cross-references
- ✅ Exploring more connections

---

## 🔄 Button Behavior Comparison

| Feature | Chat Input Button | Canvas Header Button |
|---------|------------------|---------------------|
| **Modes** | Both | Compliance only |
| **Always Visible** | ✅ Yes | ⚠️ Only in preview |
| **Input Required** | ✅ Yes | ❌ No |
| **Output Location** | Mode-dependent | Canvas only |
| **Icon Only** | ✅ Yes | ❌ No (has text) |
| **Size** | 40x40px | Auto (with text) |

---

## 📱 Responsive Behavior

### Mobile (< 768px)

**Chat Input Button:**
- Visible and functional
- Same size (40x40px)
- Touch-friendly

**Canvas Header Button:**
- Visible when canvas is open
- May wrap on very small screens
- Touch-friendly

### Tablet (768px - 1024px)

**Chat Input Button:**
- Visible and functional
- Full size

**Canvas Header Button:**
- Visible in canvas
- Full size with text

### Desktop (> 1024px)

**Chat Input Button:**
- Visible and functional
- Full size

**Canvas Header Button:**
- Visible in canvas
- Full size with text
- Hover effects active

---

## 🎨 Visual Hierarchy

### Priority Order (Left to Right)

**Chat Input:**
```
1. Upload (if compliance)
2. Message Input
3. Deep Search ⭐
4. Send
```

**Canvas Header:**
```
1. History
2. Edit
3. Deep Search ⭐
4. Save (if editing)
5. Download
```

---

## 💡 User Flow Examples

### Example 1: General Mode Deep Search

```
1. User types question in input
2. User clicks Deep Search (✨) in input area
3. Loading indicator appears
4. Enhanced response appears in chat
5. User continues conversation
```

### Example 2: Compliance Mode - Input Button

```
1. User uploads document
2. User clicks Deep Search (✨) in input area
3. Canvas opens with loading
4. Deep search results appear at top
5. Compliance report appears below
```

### Example 3: Compliance Mode - Canvas Button

```
1. User already viewing compliance report
2. User clicks Deep Search (✨) in canvas header
3. Loading indicator in button
4. Deep search results appear at top of canvas
5. Report remains visible below
```

---

## 🔧 Troubleshooting

### "I don't see the Deep Search button"

**Check:**
1. **Mode:** Are you in the right mode?
2. **Canvas:** Is the canvas open (compliance mode)?
3. **Edit Mode:** Are you in Edit mode? (canvas button hidden)
4. **Screen Size:** Is your screen too small?

**Solutions:**
- Switch to Preview mode (if in Edit)
- Open compliance canvas (if in compliance mode)
- Check chat input area (always visible there)

### "Deep Search button is grayed out"

**Reasons:**
- No input (text or file)
- Already searching
- Already sending
- API loading

**Solutions:**
- Type a message or upload a file
- Wait for current operation to finish
- Check network connection

### "Button doesn't respond"

**Check:**
- Browser console for errors
- Network tab for API calls
- Button disabled state
- JavaScript errors

**Solutions:**
- Refresh the page
- Check API server status
- Clear browser cache
- Try different browser

---

## 📊 Feature Matrix

| Location | General Mode | Compliance Mode | Always Visible | Has Text |
|----------|-------------|-----------------|----------------|----------|
| Chat Input | ✅ | ✅ | ✅ | ❌ |
| Canvas Header | ❌ | ✅ | ⚠️ Preview only | ✅ |

---

## 🎯 Best Practices

### For Users

1. **Use Input Button First** - Start with chat input button
2. **Use Canvas Button for Re-runs** - Use canvas button to refresh
3. **Wait for Completion** - Don't click multiple times
4. **Check Both Locations** - If you don't see it in one place, check the other

### For Developers

1. **Consistent Styling** - Keep both buttons visually similar
2. **Clear States** - Show loading/disabled states clearly
3. **Accessibility** - Maintain ARIA labels
4. **Responsive** - Test on all screen sizes

---

## 🔮 Future Enhancements

1. **Unified Button** - Single button that adapts to context
2. **Keyboard Shortcut** - Ctrl/Cmd + D for deep search
3. **Quick Actions** - Right-click menu for deep search
4. **Auto Deep Search** - Option to always use deep search
5. **Button Customization** - User can choose button location

---

## Related Documentation

- `DEEP_SEARCH_BOTH_MODES.md` - How deep search works in each mode
- `DEEP_SEARCH_FEATURE.md` - Original deep search documentation
- `CHAT_INPUT_BUTTONS.md` - All chat input buttons
- `COMPLIANCE_CANVAS.md` - Canvas features and buttons

---

*Last updated: November 8, 2025*
