# Chat Input Buttons Guide

## Overview

The chat input now has **3 buttons** in Compliance Mode for different actions.

---

## Button Layout

### General Mode (2 buttons)
```
[Message Input] [Send 📤]
```

### Compliance Mode (4 buttons)
```
[📎 Upload] [Message Input] [✨ Deep Search] [Send 📤]
```

---

## Button Details

### 1. 📎 Upload Button (Compliance Mode Only)

**Location:** Left side of input  
**Icon:** Paperclip  
**Purpose:** Upload documents for compliance analysis

**Supported Files:**
- PDF (.pdf)
- Markdown (.md)
- Text (.txt)
- Word (.doc, .docx)

**Usage:**
1. Click the paperclip icon
2. Select a file from your computer
3. File name appears above input
4. Click X to remove file

---

### 2. ✨ Deep Search Button (Compliance Mode Only)

**Location:** Between input and send button  
**Icon:** Sparkles (✨)  
**Color:** Purple gradient (iris → purple)  
**Purpose:** Perform enhanced analysis with cross-references

**Features:**
- Cross-references 150+ documents
- Shows related legislation
- Provides additional insights
- Displays relevance scores

**Usage:**
1. Enter a query or upload a document
2. Click the sparkles button
3. Wait 3-5 seconds for processing
4. Results appear in the compliance canvas

**States:**
- **Ready:** Purple gradient with sparkles icon
- **Loading:** Spinning loader animation
- **Disabled:** Grayed out (when no input)

---

### 3. 📤 Send Button (Always Visible)

**Location:** Right side of input  
**Icon:** Send arrow  
**Color:** Iris blue  
**Purpose:** Send message or analyze document

**Usage:**
1. Type a message or upload a file
2. Click send button (or press Enter)
3. Message is processed based on mode

**States:**
- **Ready:** Blue with send icon
- **Loading:** Spinning loader animation
- **Disabled:** Gray (when no input)

---

## Button Comparison

| Button | Mode | Icon | Color | Purpose |
|--------|------|------|-------|---------|
| Upload | Compliance | 📎 | Gray | Upload documents |
| Deep Search | Compliance | ✨ | Purple | Enhanced analysis |
| Send | Both | 📤 | Blue | Send/Analyze |

---

## Workflow Examples

### Example 1: Basic Compliance Check
```
1. Click Upload (📎)
2. Select document
3. Click Send (📤)
4. View compliance report
```

### Example 2: Deep Search Analysis
```
1. Click Upload (📎)
2. Select document
3. Click Deep Search (✨)
4. View enhanced analysis with cross-references
```

### Example 3: Text Query with Deep Search
```
1. Type: "What is RA 9003?"
2. Click Deep Search (✨)
3. View comprehensive analysis
```

### Example 4: Document + Query + Deep Search
```
1. Click Upload (📎)
2. Select document
3. Type: "Check compliance with RA 10121"
4. Click Deep Search (✨)
5. View detailed cross-referenced analysis
```

---

## Visual Design

### Upload Button
```css
Background: Transparent
Hover: Light gray (slate-100)
Icon: Paperclip (slate-600)
Size: 40x40px
```

### Deep Search Button
```css
Background: Gradient (iris-500 → purple-500)
Hover: Gradient (iris-600 → purple-600)
Icon: Sparkles (white)
Size: 40x40px
Border-radius: 8px
```

### Send Button
```css
Background: Iris-600
Hover: Iris-700
Icon: Send arrow (white)
Size: 40x40px
Border-radius: 8px
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Send message | Enter |
| New line | Shift + Enter |
| Upload file | Click button (no shortcut) |
| Deep Search | Click button (no shortcut) |

---

## Accessibility

### ARIA Labels
- Upload: "Upload compliance document"
- Deep Search: "Perform deep search analysis"
- Send: "Send message"

### Screen Reader Announcements
- File uploaded: "File [name] uploaded successfully"
- Deep search complete: "Deep search completed. Enhanced analysis available."
- Message sent: "Message sent"

### Focus States
All buttons have visible focus rings for keyboard navigation.

---

## Button States

### Enabled
- Full color
- Cursor: pointer
- Interactive

### Disabled
- Reduced opacity (50%)
- Cursor: not-allowed
- Non-interactive

### Loading
- Spinning loader icon
- Disabled state
- Shows progress

---

## Tips

1. **Upload First** - For document analysis, upload the file before clicking Deep Search
2. **Add Context** - Type a specific question along with your document for better results
3. **Wait for Results** - Deep Search takes 3-5 seconds, be patient
4. **Review Canvas** - Results appear in the right panel (compliance canvas)
5. **Try Both** - Compare regular Send vs Deep Search to see the difference

---

## Troubleshooting

### Upload Button Not Working
- Check file type (must be PDF, MD, TXT, or DOCX)
- Verify file size is reasonable
- Try a different file

### Deep Search Button Disabled
- Make sure you have input (text or file)
- Wait for previous operation to complete
- Check if in Compliance Mode

### Send Button Not Responding
- Ensure you have entered text or uploaded a file
- Check network connection
- Look for error messages

---

## Future Enhancements

Planned features:
- Voice input button
- Image upload support
- Quick action buttons (templates)
- History/favorites button
- Export button

---

*Last updated: November 8, 2025*
