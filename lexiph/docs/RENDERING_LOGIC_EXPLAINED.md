# Rendering Logic Explained

## How Colored Sections Work

The colored sections are created by **detecting emojis in markdown** and **wrapping content in styled divs**.

## Step-by-Step Process

### 1. **Parse Markdown Line by Line**

```typescript
const lines = text.split('\n')
```

### 2. **Detect Section Headers with Emojis**

```typescript
// Green section
if (line.startsWith('## ✅')) {
  currentSection = 'green'
}

// Amber section
if (line.startsWith('## ⚠️')) {
  currentSection = 'yellow'
}

// Red section
if (line.startsWith('## 🚫')) {
  currentSection = 'red'
}
```

### 3. **Group Lines by Section**

```typescript
let currentSection: 'green' | 'yellow' | 'red' | null = null
let sectionContent: string[] = []

for (const line of lines) {
  if (line.startsWith('## ✅') || line.startsWith('## ⚠️') || line.startsWith('## 🚫')) {
    // New section detected - render previous section
    if (sectionContent.length > 0) {
      renderSection(sectionContent, currentSection)
    }
    // Start new section
    currentSection = detectSectionType(line)
    sectionContent = [line]
  } else {
    // Add to current section
    sectionContent.push(line)
  }
}
```

### 4. **Render Section with Background Color**

```typescript
function renderSection(content: string[], color: 'green' | 'yellow' | 'red' | null) {
  // Choose colors based on section type
  const bgColor = color === 'green' ? 'bg-green-50' 
                : color === 'yellow' ? 'bg-amber-50' 
                : color === 'red' ? 'bg-red-50' 
                : 'bg-white'
  
  const borderColor = color === 'green' ? 'border-green-200' 
                    : color === 'yellow' ? 'border-amber-200' 
                    : color === 'red' ? 'border-red-200' 
                    : 'border-slate-200'
  
  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 my-4`}>
      {content.map((line, idx) => renderLine(line, idx))}
    </div>
  )
}
```

### 5. **Render Individual Lines with Styling**

```typescript
function renderLine(line: string, index: number) {
  // H2 headers with emojis
  if (line.startsWith('## ✅')) {
    return (
      <h2 className="text-xl font-bold text-green-800 border-l-4 border-green-600 pl-4 py-2 mb-2">
        {line.slice(2)} {/* Remove ## */}
      </h2>
    )
  }
  
  if (line.startsWith('## ⚠️')) {
    return (
      <h2 className="text-xl font-bold text-amber-800 border-l-4 border-amber-600 pl-4 py-2 mb-2">
        {line.slice(2)}
      </h2>
    )
  }
  
  if (line.startsWith('## 🚫')) {
    return (
      <h2 className="text-xl font-bold text-red-800 border-l-4 border-red-600 pl-4 py-2 mb-2">
        {line.slice(2)}
      </h2>
    )
  }
  
  // H3 headers with emojis
  if (line.startsWith('### ') && line.includes('✅')) {
    return (
      <h3 className="text-lg font-bold text-green-800 px-3 py-2 mt-3 mb-2 border-l-2 border-green-600">
        {line.slice(4)} {/* Remove ### */}
      </h3>
    )
  }
  
  // Status indicators
  if (line.includes('**Status:** ✅')) {
    return (
      <p className="font-semibold text-green-700 my-2 bg-green-50 px-2 py-1 rounded inline-block">
        {line}
      </p>
    )
  }
  
  // List items with emojis
  if (line.trim().startsWith('- ✅')) {
    return (
      <li className="text-green-800 ml-4 my-1 px-2 py-1.5 font-medium">
        {line.trim().replace(/^-?\s*✅\s*/, '✅ ')}
      </li>
    )
  }
  
  // Regular paragraphs
  return <p className="text-slate-700 my-2 leading-relaxed">{line}</p>
}
```

---

## Complete Example Code

Here's a simplified version you can adapt:

```typescript
interface SectionColors {
  bg: string
  border: string
  text: string
  accent: string
}

const colorMap: Record<string, SectionColors> = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    accent: 'border-green-600'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    accent: 'border-amber-600'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    accent: 'border-red-600'
  }
}

function detectSectionType(line: string): 'green' | 'amber' | 'red' | null {
  if (line.includes('✅')) return 'green'
  if (line.includes('⚠️')) return 'amber'
  if (line.includes('🚫')) return 'red'
  return null
}

function renderMarkdownWithColors(markdown: string) {
  const lines = markdown.split('\n')
  const sections: JSX.Element[] = []
  
  let currentSection: 'green' | 'amber' | 'red' | null = null
  let sectionLines: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Detect new section
    if (line.startsWith('## ') && (line.includes('✅') || line.includes('⚠️') || line.includes('🚫'))) {
      // Render previous section
      if (sectionLines.length > 0) {
        sections.push(renderSection(sectionLines, currentSection, i))
        sectionLines = []
      }
      
      // Start new section
      currentSection = detectSectionType(line)
      sectionLines.push(line)
    } else {
      sectionLines.push(line)
    }
  }
  
  // Render last section
  if (sectionLines.length > 0) {
    sections.push(renderSection(sectionLines, currentSection, lines.length))
  }
  
  return <div>{sections}</div>
}

function renderSection(lines: string[], type: 'green' | 'amber' | 'red' | null, key: number) {
  if (!type) {
    // Regular section without color
    return (
      <div key={key} className="my-4">
        {lines.map((line, i) => renderLine(line, i))}
      </div>
    )
  }
  
  const colors = colorMap[type]
  
  return (
    <div 
      key={key} 
      className={`${colors.bg} border ${colors.border} rounded-lg p-4 my-4`}
    >
      {lines.map((line, i) => renderLine(line, i, colors))}
    </div>
  )
}

function renderLine(line: string, index: number, colors?: SectionColors) {
  // Headers
  if (line.startsWith('## ')) {
    return (
      <h2 
        key={index} 
        className={`text-xl font-bold ${colors?.text || 'text-slate-900'} border-l-4 ${colors?.accent || 'border-slate-400'} pl-4 py-2 mb-2`}
      >
        {line.slice(3)}
      </h2>
    )
  }
  
  if (line.startsWith('### ')) {
    return (
      <h3 
        key={index} 
        className={`text-lg font-semibold ${colors?.text || 'text-slate-800'} px-3 py-2 mt-3 mb-2`}
      >
        {line.slice(4)}
      </h3>
    )
  }
  
  // List items
  if (line.trim().startsWith('- ')) {
    return (
      <li key={index} className="text-slate-700 ml-4 my-1">
        {line.trim().slice(2)}
      </li>
    )
  }
  
  // Regular text
  return (
    <p key={index} className="text-slate-700 my-2 leading-relaxed">
      {line}
    </p>
  )
}
```

---

## Key Concepts

### 1. **Section Detection**
- Look for `## ` followed by emoji (✅, ⚠️, 🚫)
- This marks the start of a colored section

### 2. **Content Grouping**
- Collect all lines until next section header
- Group them together for rendering

### 3. **Conditional Styling**
- Apply different Tailwind classes based on emoji
- Use consistent color palette

### 4. **Nested Rendering**
- Render section container first (with background)
- Then render individual lines inside

---

## Tailwind Classes Used

### Background Colors
```css
bg-green-50   /* Light green */
bg-amber-50   /* Light amber/yellow */
bg-red-50     /* Light red */
```

### Border Colors
```css
border-green-200   /* Green border */
border-amber-200   /* Amber border */
border-red-200     /* Red border */
```

### Text Colors
```css
text-green-800   /* Dark green text */
text-amber-800   /* Dark amber text */
text-red-800     /* Dark red text */
```

### Accent Borders
```css
border-l-4 border-green-600   /* Thick left green border */
border-l-4 border-amber-600   /* Thick left amber border */
border-l-4 border-red-600     /* Thick left red border */
```

---

## Adapting for Your Use Case

### 1. **Add New Section Types**

```typescript
// Add purple for "Info" sections
if (line.startsWith('## ℹ️')) {
  currentSection = 'purple'
}

const colorMap = {
  // ... existing colors
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    accent: 'border-purple-600'
  }
}
```

### 2. **Change Color Scheme**

```typescript
const colorMap = {
  green: {
    bg: 'bg-emerald-100',      // Darker green
    border: 'border-emerald-300',
    text: 'text-emerald-900',
    accent: 'border-emerald-700'
  }
}
```

### 3. **Add Icons Instead of Emojis**

```typescript
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

if (line.startsWith('## [COMPLIANT]')) {
  return (
    <h2 className="flex items-center gap-2 text-green-800">
      <CheckCircle className="h-5 w-5" />
      {line.slice(14)}
    </h2>
  )
}
```

---

## Testing Your Implementation

1. **Create test markdown:**
```markdown
## ✅ Test Section
This should be green

## ⚠️ Warning Section
This should be amber

## 🚫 Critical Section
This should be red
```

2. **Render and verify:**
- Green section has green background
- Amber section has amber background
- Red section has red background
- All text is readable

3. **Check responsiveness:**
- Test on mobile
- Test on tablet
- Test on desktop

---

## Full Implementation Location

See the complete implementation in:
```
lexiph/components/chat/compliance-canvas.tsx
```

Lines 110-400 contain the full rendering logic.

---

*Need help? Check the full code in `compliance-canvas.tsx`*
