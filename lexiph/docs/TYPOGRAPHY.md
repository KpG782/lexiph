# Typography System - LexInSight

## Overview

LexInSight uses a dual-font system combining **Outfit** for headings and **Manrope** for body text, ensuring excellent readability and visual hierarchy.

## Font Families

### Outfit (Display/Headings)
- **Usage**: Headings, titles, labels, UI elements
- **Weights**: 100-900 (Variable)
- **Characteristics**: Geometric, modern, attention-grabbing
- **Best for**: H1, H2, H3, buttons, navigation

```css
font-family: 'Outfit', system-ui, -apple-system, sans-serif;
```

### Manrope (Body/Content)
- **Usage**: Body text, paragraphs, descriptions
- **Weights**: 200-800 (Variable)
- **Characteristics**: Humanist, readable, friendly
- **Best for**: Paragraphs, lists, chat messages, forms

```css
font-family: 'Manrope', system-ui, -apple-system, sans-serif;
```

## Typography Scale

### Headings (Outfit)

```tsx
// H1 - Page titles
<h1 className="font-display text-heading-1">
  Main Page Title
</h1>
// Size: 28px - 40px (fluid)
// Weight: 700
// Line height: 1.2
// Letter spacing: -0.02em

// H2 - Section titles
<h2 className="font-display text-heading-2">
  Section Title
</h2>
// Size: 24px - 32px (fluid)
// Weight: 600
// Line height: 1.3
// Letter spacing: -0.01em

// H3 - Subsection titles
<h3 className="font-display text-heading-3">
  Subsection Title
</h3>
// Size: 20px - 24px (fluid)
// Weight: 600
// Line height: 1.4
```

### Body Text (Manrope)

```tsx
// Large body text
<p className="font-body text-body-lg">
  Important body text
</p>
// Size: 18px
// Line height: 1.6
// Color: #313B41 (neutral-800)

// Base body text
<p className="font-body text-body-base">
  Regular body text
</p>
// Size: 16px
// Line height: 1.6
// Color: #313B41 (neutral-800)

// Small body text
<p className="font-body text-body-sm">
  Secondary information
</p>
// Size: 14px
// Line height: 1.5
// Color: #45535B (neutral-700)

// Caption text
<span className="font-body text-caption">
  Timestamps, labels
</span>
// Size: 12px
// Line height: 1.4
// Color: #596B75 (neutral-600)
// Weight: 500
```

## Color Contrast

### Text Colors (WCAG AA Compliant)

```css
/* Primary text - Highest contrast */
color: #1D2326;  /* neutral-900 - 15.8:1 contrast */

/* Body text - High contrast */
color: #313B41;  /* neutral-800 - 12.1:1 contrast */

/* Secondary text - Good contrast */
color: #45535B;  /* neutral-700 - 8.9:1 contrast */

/* Subtle text - Minimum AA */
color: #596B75;  /* neutral-600 - 6.5:1 contrast */

/* Muted text - Large text only */
color: #6C838F;  /* neutral-500 - 4.8:1 contrast */
```

### Utility Classes

```tsx
// High emphasis
<p className="text-body-emphasis">
  Important information
</p>

// Normal body
<p className="text-body">
  Regular content
</p>

// Subtle
<p className="text-subtle">
  Secondary information
</p>

// Muted (use sparingly)
<p className="text-muted">
  Tertiary information
</p>
```

## Component Examples

### Chat Header

```tsx
<header>
  <h1 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
    LexInSight
  </h1>
</header>
```

### Sidebar Header

```tsx
<header>
  <h1 className="font-display text-lg font-semibold text-neutral-900">
    LexInSight
  </h1>
</header>
```

### Chat Message

```tsx
<div className="message">
  <p className="font-body text-base leading-relaxed font-normal">
    {message.content}
  </p>
  <span className="font-body text-xs font-medium text-neutral-600">
    {timestamp}
  </span>
</div>
```

### Chat List Item

```tsx
<div className="chat-item">
  <p className="font-body text-sm font-semibold text-neutral-800">
    {chat.title}
  </p>
  <p className="font-body text-xs font-medium text-neutral-600">
    {timestamp}
  </p>
</div>
```

### Version History

```tsx
<div className="version">
  <h3 className="font-display text-sm font-semibold text-neutral-900">
    Version History
  </h3>
  <p className="font-body text-xs text-neutral-600 font-medium">
    {count} versions
  </p>
</div>
```

### Compliance Report

```tsx
<header>
  <h2 className="font-display text-base font-semibold text-neutral-900">
    Compliance Report
  </h2>
  <span className="font-body text-xs text-neutral-600 font-medium">
    (Version Label)
  </span>
</header>
```

## Font Weights

### Outfit (Headings)
- **700 (Bold)**: H1, primary headings
- **600 (Semibold)**: H2, H3, subheadings
- **500 (Medium)**: Buttons, labels

### Manrope (Body)
- **600 (Semibold)**: Emphasized body text
- **500 (Medium)**: Labels, captions, timestamps
- **400 (Regular)**: Body text, paragraphs
- **300 (Light)**: Subtle text (use sparingly)

## Line Height

```css
/* Headings - Tight */
line-height: 1.2;  /* H1 */
line-height: 1.3;  /* H2 */
line-height: 1.4;  /* H3 */

/* Body - Comfortable */
line-height: 1.6;  /* Body text */
line-height: 1.5;  /* Small text */
line-height: 1.4;  /* Captions */
```

## Letter Spacing

```css
/* Headings - Tighter */
letter-spacing: -0.02em;  /* H1 */
letter-spacing: -0.01em;  /* H2 */
letter-spacing: 0;        /* H3 */

/* Body - Normal */
letter-spacing: 0;        /* All body text */
```

## Responsive Typography

### Fluid Sizing

```tsx
// Automatically scales between breakpoints
<h1 className="text-heading-1">
  Scales from 28px to 40px
</h1>

// Using clamp()
font-size: clamp(1.75rem, 2vw + 1rem, 2.5rem);
```

### Breakpoint-based

```tsx
// Manual responsive sizing
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

## Best Practices

### Do's ✅

1. **Use Outfit for headings** - Clear hierarchy
2. **Use Manrope for body** - Better readability
3. **Maintain contrast** - Minimum 4.5:1 for normal text
4. **Use font-medium or font-semibold** - For better legibility
5. **Consistent line height** - 1.6 for body text
6. **Proper letter spacing** - Negative for large headings
7. **Fluid typography** - Use clamp() for smooth scaling

### Don'ts ❌

1. **Don't mix fonts randomly** - Stick to the system
2. **Don't use light weights for small text** - Hard to read
3. **Don't use all caps excessively** - Reduces readability
4. **Don't ignore contrast** - Test with WCAG tools
5. **Don't use too many font sizes** - Stick to the scale
6. **Don't forget mobile** - Test on small screens
7. **Don't use decorative fonts for body** - Reduces readability

## Accessibility

### WCAG AA Compliance

All text colors meet WCAG 2.1 AA standards:

| Text Color | Contrast Ratio | Usage |
|------------|----------------|-------|
| #1D2326 | 15.8:1 | Headings, primary text |
| #313B41 | 12.1:1 | Body text |
| #45535B | 8.9:1 | Secondary text |
| #596B75 | 6.5:1 | Subtle text |
| #6C838F | 4.8:1 | Muted text (large only) |

### Font Smoothing

```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Font Features

```css
font-feature-settings: 'kern' 1, 'liga' 1;
```

## Performance

### Font Loading

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Load fonts with display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Outfit:wght@100..900&display=swap" rel="stylesheet">
```

### Font Display

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Outfit:wght@100..900&display=swap');
```

The `display=swap` ensures text remains visible during font loading.

## Testing

### Visual Testing

1. Test at different zoom levels (100%, 150%, 200%)
2. Test on different screen sizes
3. Test with different system fonts disabled
4. Test in different browsers
5. Test with dark mode (if applicable)

### Contrast Testing

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Lighthouse
- axe DevTools

### Readability Testing

- Flesch Reading Ease score
- Line length (45-75 characters optimal)
- Paragraph spacing
- Text alignment

## Resources

- [Outfit Font](https://fonts.google.com/specimen/Outfit)
- [Manrope Font](https://fonts.google.com/specimen/Manrope)
- [Typography Best Practices](https://www.smashingmagazine.com/2020/07/css-techniques-legibility/)
- [WCAG Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
**Fonts**: Outfit + Manrope
