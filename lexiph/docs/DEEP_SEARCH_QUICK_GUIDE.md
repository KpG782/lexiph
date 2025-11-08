# Deep Search - Quick Guide

## What is Deep Search? 🔍

Deep Search performs **enhanced analysis** by cross-referencing your document against 150+ related Philippine laws and regulations.

---

## How to Use

### Step 1: Generate Report
Upload a document and generate a compliance report first.

### Step 2: Click Deep Search
Look for the **sparkle button** (✨) in the header:
```
[History] [Edit] [✨ Deep Search] [Save] [Download]
```

### Step 3: Wait 3-5 Seconds
The button will show a loading spinner while processing.

### Step 4: Review Results
Results appear at the top with:
- 📄 **Related Documents** (with relevance scores)
- 💡 **Additional Insights** (recommendations)
- 🔗 **Cross References** (related laws)

---

## What You Get

### Related Documents
```
Republic Act No. 10121 - DRRM Act          [95%]
├─ Excerpt: Comprehensive framework for...
└─ Reference: RA 10121, Section 12

NDRRMC Memorandum Circular No. 4           [88%]
├─ Excerpt: Guidelines on establishment...
└─ Reference: NDRRMC MC No. 4, 2012
```

### Additional Insights
- ✓ Cross-reference with PHIVOLCS hazard maps required
- ✓ Consider integration with PAGASA early warning systems
- ✓ Review recent NDRRMC guidelines on community-based DRRM
- ✓ Align with National DRRM Framework 2020-2030

### Cross References
```
[RA 10121] [RA 7160] [NDRRMC MC No. 4] [NDRRMC MC No. 5]
```

---

## Current Status

⚠️ **Placeholder Mode**
- Currently returns **mock data** for demonstration
- Real API integration ready to connect
- See `DEEP_SEARCH_FEATURE.md` for API details

---

## Tips

1. **Use After Initial Report** - Deep Search works best after you've reviewed the basic compliance report
2. **Review Related Docs** - Check the relevance scores to prioritize which documents to review
3. **Follow Insights** - The additional insights provide actionable next steps
4. **Check Cross-Refs** - Use cross-references to find related legislation

---

## Button States

| State | Appearance | Action |
|-------|------------|--------|
| Ready | ✨ Deep Search | Click to start |
| Loading | 🔄 Searching... | Wait for results |
| Complete | ✨ Deep Search | Click to search again |
| Disabled | (Grayed out) | Wait for current search |

---

## Hide/Show Results

- Click **"Hide Deep Search Results"** to collapse
- Results stay in memory
- Click **Deep Search** again to run a new search

---

## When to Use

✅ **Good Use Cases:**
- Need comprehensive legal context
- Looking for related legislation
- Want implementation guidance
- Checking for compliance gaps

❌ **Not Needed For:**
- Quick document review
- Simple compliance check
- Already familiar with requirements

---

## Performance

- **Processing Time:** 3-5 seconds
- **Documents Analyzed:** 150+
- **Results:** 3-10 related documents
- **Insights:** 4-8 recommendations

---

## Troubleshooting

**Button not visible?**
- Make sure you're in Preview mode (not Edit mode)

**Results not showing?**
- Check browser console for errors
- Verify network connection

**Slow response?**
- Normal processing takes 3-5 seconds
- Check API server status

---

See `DEEP_SEARCH_FEATURE.md` for complete documentation!
