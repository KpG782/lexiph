# Quick Reference: Colored Markdown Sections

## 🎨 Three-Color System

### ✅ GREEN = Compliant/Good
```markdown
## ✅ Compliant Sections
### 1. Section Name
- **Status:** ✅ Compliant
```
**Renders:** Green background, green border, green text

---

### ⚠️ AMBER = Warning/Needs Attention
```markdown
## ⚠️ Sections Needing Minor Revisions
### 1. Section Name
- **Issue:** Problem description
```
**Renders:** Amber background, amber border, amber text

---

### 🚫 RED = Critical/Missing
```markdown
## 🚫 Critical Missing Sections
### 1. Section Name
- **Status:** 🚫 Missing
```
**Renders:** Red background, red border, red text

---

## 📝 Quick Template

```markdown
# Report Title

## Compliance Score: 75% ⚠️

## ✅ Compliant Sections
### 1. Item Name
- **Status:** ✅ Compliant
- **Finding:** What's good
- **Reference:** Legal ref

## ⚠️ Sections Needing Minor Revisions
### 1. Item Name
- **Issue:** What's wrong
- **Recommendation:** How to fix
- **Reference:** Legal ref

## 🚫 Critical Missing Sections
### 1. Item Name
- **Status:** 🚫 Missing
- **Requirement:** What's needed
- **Impact:** Why it matters
- **Action Required:**
  - Step 1
  - Step 2
- **Reference:** Legal ref

## 📋 Recommended Next Steps
### Immediate (Within 1 Month)
1. ✏️ Action 1
2. ✏️ Action 2

### Short-term (Within 3 Months)
1. 📅 Action 1
2. 📅 Action 2

### Long-term (Within 6 Months)
1. 🎯 Action 1
2. 🎯 Action 2
```

---

## 🎯 Key Emojis

| Emoji | Use For | Color |
|-------|---------|-------|
| ✅ | Compliant, Approved, Good | Green |
| ⚠️ | Warning, Needs Review | Amber |
| 🚫 | Critical, Missing, Bad | Red |
| ✏️ | Immediate tasks | - |
| 📅 | Scheduled tasks | - |
| 🎯 | Long-term goals | - |
| 📋 | Checklists | - |
| 📚 | References | - |
| ⚖️ | Legal info | - |

---

## 💡 Pro Tips

1. **Always use H2 (##) for colored sections**
2. **Use H3 (###) for items within sections**
3. **Bold your labels:** `**Status:**`, `**Finding:**`, `**Issue:**`
4. **Separate sections with:** `---`
5. **End with legal disclaimer**

---

## 🔍 Example Output

When you write:
```markdown
## ✅ Compliant Sections
### 1. Privacy Policy
- **Status:** ✅ Compliant
```

You get:
- 🟢 Green background box
- 🟢 Green left border (thick)
- 🟢 Green text
- ✅ Emoji preserved

---

See `MARKDOWN_STYLING_GUIDE.md` for full documentation!
