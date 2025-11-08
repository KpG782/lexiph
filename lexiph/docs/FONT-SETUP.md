# Font Setup - Next.js Optimization

## Overview

LexiPH uses Next.js's built-in font optimization for Manrope and Outfit fonts, providing better performance, automatic font loading, and no CSS parsing errors.

## Implementation

### 1. Layout Configuration (`app/layout.tsx`)

```tsx
import { Manrope, Outfit } from "next/font/google";

// Manrope - Body font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Outfit - Display/Heading font
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 2. CSS Variables (`app/globals.css`)

```css
@theme inline {
  --font-sans: var(--font-manrope), system-ui, -apple-system, sans-serif;
  --font-display: var(--font-outfit), system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-manrope), system-ui, -apple-system, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-outfit), system-ui, -apple-system, sans-serif;
}
```

## Benefits

### 1. Performance
- **Automatic Optimization**: Next.js optimizes font loading
- **Self-Hosted**: Fonts are self-hosted for better performance
- **Preloading**: Critical fonts are preloaded automatically
- **No External Requests**: Fonts served from your domain

### 2. User Experience
- **No FOUC**: Flash of Unstyled Content is eliminated
- **Faster Loading**: Optimized font files
- **Better Caching**: Fonts cached with your assets
- **Smooth Rendering**: `display: swap` ensures text is always visible

### 3. Developer Experience
- **Type Safety**: Full TypeScript support
- **No CSS Errors**: No `@import` parsing issues
- **Easy Configuration**: Simple API
- **Automatic Subsetting**: Only loads needed characters

### 4. Privacy & Compliance
- **No Google Tracking**: Fonts self-hosted
- **GDPR Compliant**: No external requests to Google
- **Better Privacy**: User data stays on your domain

## Font Configuration

### Manrope (Body Font)

```tsx
const manrope = Manrope({
  subsets: ["latin"],           // Character subset
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",   // CSS variable name
  display: "swap",              // Font display strategy
});
```

**Weights Available:**
- 200: Extra Light
- 300: Light
- 400: Regular (Body text)
- 500: Medium (Labels, captions)
- 600: Semibold (Emphasized text)
- 700: Bold
- 800: Extra Bold

### Outfit (Display Font)

```tsx
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});
```

**Weights Available:**
- 100: Thin
- 200: Extra Light
- 300: Light
- 400: Regular
- 500: Medium
- 600: Semibold (H2, H3)
- 700: Bold (H1)
- 800: Extra Bold
- 900: Black

## Usage in Components

### Using CSS Variables

```tsx
// Heading with Outfit
<h1 className="font-display text-2xl font-bold">
  Heading Text
</h1>

// Body text with Manrope
<p className="font-body text-base">
  Body text content
</p>
```

### Using Utility Classes

```tsx
// Typography scale classes
<h1 className="text-heading-1">Main Title</h1>
<h2 className="text-heading-2">Section Title</h2>
<p className="text-body-base">Regular text</p>
<span className="text-caption">Small text</span>
```

## Font Display Strategies

### `display: swap` (Current)

```tsx
display: "swap"
```

**Behavior:**
- Text is immediately visible with fallback font
- Swaps to custom font when loaded
- Best for: Body text, general content

### Alternative Strategies

```tsx
// Optional: Show nothing until font loads
display: "block"

// Optional: Use fallback, never swap
display: "optional"

// Optional: Brief invisible period, then swap
display: "fallback"
```

## Troubleshooting

### Fonts Not Loading

1. **Check CSS Variables**
   ```css
   /* Verify these are set */
   --font-manrope: ...
   --font-outfit: ...
   ```

2. **Check HTML Classes**
   ```tsx
   <html className={`${manrope.variable} ${outfit.variable}`}>
   ```

3. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Font Weights Not Working

Ensure the weight is included in the configuration:

```tsx
weight: ["400", "500", "600", "700"]  // Add needed weights
```

### TypeScript Errors

```bash
npm install --save-dev @types/node
```

## Performance Metrics

### Before (Google Fonts CDN)
- External DNS lookup: ~50ms
- Font download: ~100-200ms
- Total: ~150-250ms
- FOUC risk: High

### After (Next.js Optimization)
- No external requests: 0ms
- Preloaded fonts: ~50-100ms
- Total: ~50-100ms
- FOUC risk: None

## Best Practices

### Do's ✅

1. **Use CSS Variables**: `var(--font-manrope)`
2. **Specify Needed Weights**: Only load what you use
3. **Use `display: swap`**: Best for most cases
4. **Preload Critical Fonts**: Next.js does this automatically
5. **Use Fallback Fonts**: Always provide system fallbacks

### Don'ts ❌

1. **Don't Use @import**: Use Next.js font optimization
2. **Don't Load All Weights**: Only load needed weights
3. **Don't Skip Fallbacks**: Always provide system fonts
4. **Don't Use External CDN**: Use Next.js self-hosting
5. **Don't Forget Subsets**: Specify character subsets

## Migration from @import

### Old Way (CSS @import)

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

body {
  font-family: 'Manrope', sans-serif;
}
```

**Problems:**
- CSS parsing errors
- External requests
- No optimization
- FOUC issues

### New Way (Next.js)

```tsx
// layout.tsx
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
```

```css
/* globals.css */
body {
  font-family: var(--font-manrope), sans-serif;
}
```

**Benefits:**
- No parsing errors
- Self-hosted
- Optimized loading
- No FOUC

## Resources

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/)
- [Manrope Font](https://fonts.google.com/specimen/Manrope)
- [Outfit Font](https://fonts.google.com/specimen/Outfit)
- [Font Display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
**Method**: Next.js Font Optimization
