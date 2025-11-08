# Text Truncation & Responsive Typography

## Overview

LexiPH uses a comprehensive text truncation and responsive typography system to ensure content displays properly across all screen sizes.

## Truncation Utilities

### Single Line Truncation

```tsx
<p className="truncate">
  This text will be truncated with ellipsis if too long
</p>
```

### Multi-Line Truncation

```tsx
// Truncate to 1 line
<p className="truncate-1">
  Long text that will be truncated to one line...
</p>

// Truncate to 2 lines
<p className="truncate-2">
  Long text that will be truncated to two lines...
</p>

// Truncate to 3 lines
<p className="truncate-3">
  Long text that will be truncated to three lines...
</p>
```

## Responsive Text Sizes

### Fluid Typography

Uses `clamp()` for smooth scaling between screen sizes:

```tsx
// Extra small (10px - 12px)
<span className="text-responsive-xs">Extra small text</span>

// Small (12px - 14px)
<span className="text-responsive-sm">Small text</span>

// Base (14px - 16px)
<p className="text-responsive-base">Base text</p>

// Large (16px - 18px)
<h3 className="text-responsive-lg">Large text</h3>

// Extra large (18px - 20px)
<h2 className="text-responsive-xl">Extra large text</h2>

// 2X large (20px - 24px)
<h1 className="text-responsive-2xl">2X large text</h1>
```

## Word Breaking

### Break Word

Breaks long words at appropriate points:

```tsx
<p className="break-word">
  verylongwordthatneedstobebrokensomewhere
</p>
```

### Break All

Breaks words at any character:

```tsx
<p className="break-all">
  https://very-long-url-that-needs-breaking.com/path/to/resource
</p>
```

## Common Patterns

### Card Title with Truncation

```tsx
<div className="max-w-sm">
  <h3 className="text-lg font-semibold truncate">
    Very Long Card Title That Will Be Truncated
  </h3>
  <p className="text-sm text-slate-600 truncate-2">
    Description that can span up to two lines before being truncated with ellipsis
  </p>
</div>
```

### Chat Message

```tsx
<div className="max-w-md">
  <p className="text-responsive-base break-word">
    Long message with URLs or long words that need to break properly
  </p>
</div>
```

### List Item

```tsx
<li className="flex items-center gap-2">
  <Icon className="flex-shrink-0" />
  <span className="truncate">
    Long list item text that truncates
  </span>
</li>
```

### Version Label

```tsx
<span className="text-xs text-slate-500 truncate max-w-[120px]">
  (Very Long Version Label Name)
</span>
```

## Best Practices

### 1. Container Width

Always set a max-width or width on the parent:

```tsx
// Good
<div className="max-w-xs">
  <p className="truncate">Text</p>
</div>

// Bad - won't truncate without width constraint
<div>
  <p className="truncate">Text</p>
</div>
```

### 2. Flex Layouts

Use `min-w-0` and `flex-1` for proper truncation in flex containers:

```tsx
<div className="flex items-center gap-2">
  <Icon className="flex-shrink-0" />
  <div className="min-w-0 flex-1">
    <p className="truncate">Truncated text</p>
  </div>
</div>
```

### 3. Title Attributes

Add `title` attribute for full text on hover:

```tsx
<p className="truncate" title={fullText}>
  {fullText}
</p>
```

### 4. Responsive Breakpoints

Combine with responsive utilities:

```tsx
<p className="truncate sm:truncate-2 lg:truncate-3">
  Text that shows more lines on larger screens
</p>
```

## Component Examples

### Sidebar Header

```tsx
<header className="px-4 py-3">
  <h1 className="text-lg font-semibold truncate">
    Application Name
  </h1>
</header>
```

### Version History Item

```tsx
<div className="flex items-center gap-2">
  <Clock className="flex-shrink-0 h-4 w-4" />
  <span className="truncate text-sm font-medium">
    Version 1.2.3 - Feature Update
  </span>
</div>
```

### Chat List Item

```tsx
<div className="flex items-start gap-3">
  <Avatar className="flex-shrink-0" />
  <div className="min-w-0 flex-1">
    <p className="truncate text-sm font-medium">
      Chat Title
    </p>
    <p className="truncate-2 text-xs text-slate-500">
      Last message preview that can span two lines
    </p>
  </div>
</div>
```

### Compliance Report Header

```tsx
<header className="flex items-center gap-2">
  <FileText className="flex-shrink-0 h-5 w-5" />
  <h2 className="text-base font-semibold truncate">
    Compliance Report
  </h2>
  <span className="text-xs text-slate-500 truncate max-w-[120px]">
    (Version Label)
  </span>
</header>
```

## CSS Implementation

### Truncation Classes

```css
.truncate-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
```

### Responsive Text

```css
.text-responsive-base {
  font-size: clamp(0.875rem, 0.75rem + 0.5vw, 1rem);
}
```

## Browser Support

- **Truncation**: All modern browsers
- **Multi-line truncation**: Chrome, Safari, Firefox, Edge
- **Responsive text**: All browsers supporting `clamp()`

## Accessibility

### Screen Readers

Truncated text is fully accessible to screen readers:

```tsx
<p className="truncate" aria-label={fullText}>
  {fullText}
</p>
```

### Keyboard Navigation

Ensure truncated interactive elements have proper focus states:

```tsx
<button className="truncate focus:ring-2 focus:ring-primary">
  Long button text
</button>
```

## Testing

### Visual Testing

1. Test at different viewport widths (320px, 768px, 1024px, 1920px)
2. Test with long text strings
3. Test with different languages (especially German, Finnish)
4. Test with emojis and special characters

### Automated Testing

```tsx
describe('Text Truncation', () => {
  it('truncates long text', () => {
    const longText = 'Very long text that should be truncated'
    render(<p className="truncate max-w-xs">{longText}</p>)
    // Assert truncation behavior
  })
})
```

## Common Issues

### Issue: Truncation Not Working

**Solution**: Ensure parent has width constraint

```tsx
// Add max-w-* or w-* to parent
<div className="max-w-sm">
  <p className="truncate">Text</p>
</div>
```

### Issue: Multi-line Truncation Not Working

**Solution**: Check browser support and CSS

```tsx
// Ensure both -webkit and standard properties
.truncate-2 {
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
```

### Issue: Flex Layout Breaking Truncation

**Solution**: Add `min-w-0` to flex child

```tsx
<div className="flex">
  <div className="min-w-0 flex-1">
    <p className="truncate">Text</p>
  </div>
</div>
```

## Resources

- [CSS Tricks - Line Clamping](https://css-tricks.com/line-clampin/)
- [MDN - text-overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow)
- [MDN - line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
