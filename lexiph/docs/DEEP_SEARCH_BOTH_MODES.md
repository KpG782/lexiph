# Deep Search in Both Modes

## Overview

The **Deep Search** button is now available in **both General and Compliance modes**, providing enhanced analysis with cross-references in any context.

---

## Button Visibility

### ✅ General Mode
- **Visible:** Yes
- **Location:** Between input and Send button
- **Icon:** Sparkles (✨)
- **Color:** Purple gradient

### ✅ Compliance Mode
- **Visible:** Yes
- **Location:** Between Upload/input and Send button
- **Icon:** Sparkles (✨)
- **Color:** Purple gradient

---

## How It Works by Mode

### General Mode

**Input:**
```
User types: "What is RA 9003?"
Clicks: Deep Search button (✨)
```

**Processing:**
- Searches 150+ related documents
- Cross-references legislation
- Generates enhanced summary

**Output:**
- User message appears in chat
- AI response with enhanced analysis
- Related documents listed
- Additional insights included
- Cross-references shown

**Display:**
```
User: What is RA 9003?

AI: # Deep Search Analysis

Based on comprehensive cross-referencing of 156 
related documents...

## Enhanced Findings
[Full enhanced summary]

## Related Documents
- RA 10121 - DRRM Act (95% relevance)
- NDRRMC MC No. 4 (88% relevance)
...

## Additional Insights
- Cross-reference with PHIVOLCS required
- Integration with PAGASA recommended
...
```

---

### Compliance Mode

**Input:**
```
User uploads: document.pdf
User types: "Analyze for compliance"
Clicks: Deep Search button (✨)
```

**Processing:**
- Analyzes uploaded document
- Searches 150+ related documents
- Cross-references with legislation
- Generates compliance report + deep search

**Output:**
- Compliance canvas opens
- Standard compliance report shown
- Deep search results appear at top
- Related documents highlighted
- Cross-references displayed

**Display:**
```
[Compliance Canvas]

┌─────────────────────────────────────┐
│ 🔍 Deep Search Results              │
│ 156 documents analyzed              │
│                                     │
│ Related Documents:                  │
│ • RA 10121 - DRRM Act (95%)        │
│ • NDRRMC MC No. 4 (88%)            │
│                                     │
│ Additional Insights:                │
│ • Cross-reference required          │
│ • Integration recommended           │
└─────────────────────────────────────┘

[Standard Compliance Report Below]
```

---

## Comparison

| Feature | General Mode | Compliance Mode |
|---------|-------------|-----------------|
| **Button Visible** | ✅ Yes | ✅ Yes |
| **Input Type** | Text only | Text + Files |
| **Output Location** | Chat messages | Compliance canvas |
| **Enhanced Summary** | ✅ Yes | ✅ Yes |
| **Related Docs** | ✅ Yes | ✅ Yes |
| **Cross-References** | ✅ Yes | ✅ Yes |
| **Document Analysis** | ❌ No | ✅ Yes |
| **Canvas View** | ❌ No | ✅ Yes |

---

## Use Cases

### General Mode Deep Search

**Best For:**
1. **Research Questions**
   - "What laws govern workplace safety?"
   - Deep search finds all related legislation

2. **Comparative Analysis**
   - "Compare RA 9003 and RA 9275"
   - Shows connections between laws

3. **Comprehensive Overview**
   - "What are environmental compliance requirements?"
   - Provides full legal framework

4. **Finding Related Laws**
   - "What laws relate to data privacy?"
   - Lists all connected legislation

### Compliance Mode Deep Search

**Best For:**
1. **Document Review**
   - Upload policy + deep search
   - Find all related requirements

2. **Gap Analysis**
   - Upload plan + deep search
   - Identify missing connections

3. **Compliance Verification**
   - Upload contract + deep search
   - Check against all related laws

4. **Comprehensive Audit**
   - Upload document + deep search
   - Full cross-referenced analysis

---

## Button Behavior

### Enabled State
```css
Background: Purple gradient (iris-500 → purple-500)
Hover: Darker gradient (iris-600 → purple-600)
Icon: Sparkles (white)
Cursor: Pointer
```

### Disabled State
```css
Background: Same gradient
Opacity: 50%
Cursor: Not-allowed
```

**Disabled When:**
- No input (text or file)
- Already searching
- Already sending
- API loading

### Loading State
```css
Icon: Spinning loader
Text: "Searching..." (screen reader)
Disabled: Yes
```

---

## Processing Time

### General Mode
- **Query Generation:** 1-2 seconds
- **Deep Search:** 3-5 seconds
- **Total:** 4-7 seconds

### Compliance Mode
- **Document Upload:** 1-2 seconds
- **Compliance Analysis:** 1-2 seconds
- **Deep Search:** 3-5 seconds
- **Total:** 5-9 seconds

---

## Response Format

### General Mode Response

```markdown
# Deep Search Analysis

## Enhanced Findings
[Comprehensive analysis with cross-references]

## Related Documents
1. **RA 10121 - DRRM Act** (95% relevance)
   - Excerpt: Framework for disaster risk reduction...
   - Reference: RA 10121, Section 12

2. **NDRRMC MC No. 4** (88% relevance)
   - Excerpt: Guidelines on establishment...
   - Reference: NDRRMC MC No. 4, 2012

## Additional Insights
- Cross-reference with PHIVOLCS hazard maps required
- Consider integration with PAGASA early warning
- Review recent NDRRMC guidelines
- Align with National DRRM Framework

## Cross References
- RA 10121 - Philippine DRRM Act
- RA 7160 - Local Government Code
- NDRRMC MC No. 4, Series of 2012
- NDRRMC MC No. 5, Series of 2013
```

### Compliance Mode Response

Same format but displayed in the compliance canvas with:
- Colored background (purple gradient)
- Collapsible sections
- Interactive elements
- Integrated with compliance report

---

## Technical Details

### Event Flow

**General Mode:**
```
User clicks Deep Search
    ↓
handleDeepSearch() called
    ↓
performDeepSearch() API call
    ↓
'deep-search-complete' event dispatched
    ↓
ChatContainer receives event
    ↓
User + AI messages added to chat
    ↓
Messages displayed
```

**Compliance Mode:**
```
User clicks Deep Search
    ↓
handleDeepSearch() called
    ↓
performDeepSearch() API call
    ↓
'deep-search-complete' event dispatched
    ↓
ChatContainer receives event
    ↓
Deep search result passed to canvas
    ↓
Canvas displays results at top
```

### State Management

```typescript
// In ChatInput
const [isDeepSearching, setIsDeepSearching] = useState(false)

// In ChatContainer
const [deepSearchResult, setDeepSearchResult] = useState<any>(null)
const [messages, setMessages] = useState<Message[]>([])

// Mode-specific handling
if (mode === 'general') {
  // Add to messages
  setMessages(prev => [...prev, userMsg, aiMsg])
} else {
  // Pass to canvas
  setDeepSearchResult(result)
}
```

---

## Keyboard Shortcuts

| Action | Shortcut | Mode |
|--------|----------|------|
| Send | Enter | Both |
| Deep Search | (Click only) | Both |
| New Line | Shift + Enter | Both |

---

## Accessibility

### ARIA Labels
```html
<button
  aria-label="Perform deep search"
  title="Deep Search - Enhanced analysis with cross-references"
>
```

### Screen Reader
- Button announces: "Perform deep search"
- Loading announces: "Performing deep search..."
- Complete announces: "Deep search completed. Enhanced analysis available."

### Keyboard Navigation
- Tab to button
- Enter/Space to activate
- Focus visible with ring

---

## Tips

### For General Mode
1. **Ask Broad Questions** - Deep search excels at comprehensive topics
2. **Look for Connections** - Check related documents section
3. **Follow Cross-References** - Explore linked legislation
4. **Read Insights** - Additional insights provide context

### For Compliance Mode
1. **Upload First** - Have document ready before deep search
2. **Add Context** - Type specific questions with upload
3. **Review Canvas** - Deep search results appear at top
4. **Check Related Docs** - See what else applies
5. **Use Insights** - Follow recommendations

---

## Troubleshooting

### Button Not Visible

**General Mode:**
- Should always be visible
- Check if input is rendered
- Verify mode toggle

**Compliance Mode:**
- Should always be visible
- Check if between Upload and Send
- Verify mode is compliance

### Button Disabled

**Check:**
- Is there input (text or file)?
- Is another operation running?
- Is API loading?
- Check browser console

### No Results

**General Mode:**
- Check chat for messages
- Verify API response
- Check network tab

**Compliance Mode:**
- Check canvas for results
- Verify canvas is open
- Check deep search section

---

## Future Enhancements

1. **Keyboard Shortcut** - Ctrl/Cmd + D for deep search
2. **Auto Deep Search** - Option to always use deep search
3. **Search History** - Save previous deep searches
4. **Compare Results** - Side-by-side standard vs deep
5. **Export Deep Search** - Save enhanced results separately

---

## Related Documentation

- `DEEP_SEARCH_FEATURE.md` - Original deep search docs
- `GENERAL_CHAT_RAG_INTEGRATION.md` - General mode RAG
- `CHAT_INPUT_BUTTONS.md` - All button functionality
- `DEEP_SEARCH_QUICK_GUIDE.md` - Quick reference

---

*Last updated: November 8, 2025*
