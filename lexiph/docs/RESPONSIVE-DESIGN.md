# Responsive Design Best Practices - LexiPH

## Overview

LexiPH follows mobile-first responsive design principles to ensure optimal user experience across all devices.

## Breakpoints

### Standard Breakpoints

```css
/* Mobile First Approach */
/* Default: Mobile (< 640px) */

sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Custom Breakpoints

```tsx
// JavaScript breakpoint detection
const isMobile = window.innerWidth < 768
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024
const isDesktop = window.innerWidth >= 1024
```

## Layout Patterns

### 1. Sidebar Layout

**App Sidebar (64px) + Chat Sidebar (280px) + Main Content**

```tsx
<div className="flex h-screen">
  {/* App Sidebar - 64px */}
  {!isMobile && <AppSidebar />}
  
  {/* Chat Sidebar - 280px */}
  <ChatSidebar />
  
  {/* Main Content - Flexible */}
  <main className={cn(
    'flex flex-1 flex-col transition-all duration-300',
    !isMobile && !isOpen && 'ml-16',      // 64px
    !isMobile && isOpen && 'ml-[344px]'   // 64px + 280px
  )}>
    {children}
  </main>
</div>
```

### 2. Responsive Spacing

```tsx
// Padding
className="px-2 sm:px-4 md:px-6 lg:px-8"

// Margin
className="mt-2 sm:mt-4 md:mt-6 lg:mt-8"

// Gap
className="gap-2 sm:gap-4 md:gap-6"
```

### 3. Responsive Grid

```tsx
// Auto-responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### 4. Responsive Flex

```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">Content 1</div>
  <div className="flex-1">Content 2</div>
</div>
```

## Typography

### Responsive Text Sizes

```tsx
// Using Tailwind responsive classes
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>

// Using fluid typography (clamp)
<h1 className="text-responsive-2xl">
  Fluid Heading
</h1>
```

### Line Height

```tsx
// Adjust line height for readability
<p className="leading-relaxed sm:leading-loose">
  Body text with responsive line height
</p>
```

## Touch Targets

### Minimum Size: 44x44px

```tsx
// Good - Meets touch target size
<button className="min-h-[44px] min-w-[44px] p-2">
  <Icon />
</button>

// Bad - Too small for touch
<button className="h-6 w-6 p-1">
  <Icon />
</button>
```

### Spacing Between Targets

```tsx
// Adequate spacing for touch
<div className="flex gap-2 sm:gap-4">
  <button className="min-h-[44px]">Button 1</button>
  <button className="min-h-[44px]">Button 2</button>
</div>
```

## Images & Media

### Responsive Images

```tsx
// Using Next.js Image
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Using CSS
<img 
  src="/image.jpg" 
  alt="Description"
  className="w-full h-auto object-cover"
/>
```

### Aspect Ratios

```tsx
// Maintain aspect ratio
<div className="aspect-video w-full">
  <img src="/video-thumbnail.jpg" className="w-full h-full object-cover" />
</div>

<div className="aspect-square w-full">
  <img src="/avatar.jpg" className="w-full h-full object-cover" />
</div>
```

## Navigation

### Mobile Navigation

```tsx
// Hamburger menu for mobile
{isMobile && (
  <button 
    onClick={toggleMenu}
    className="fixed left-4 top-4 z-20 min-h-[44px] min-w-[44px]"
  >
    <Menu />
  </button>
)}

// Overlay for mobile sidebar
{isMobile && isOpen && (
  <div 
    className="fixed inset-0 bg-black/50 z-30"
    onClick={close}
  />
)}
```

### Desktop Navigation

```tsx
// Always visible sidebar
{!isMobile && (
  <aside className="fixed left-0 top-0 h-screen w-64">
    Navigation
  </aside>
)}
```

## Forms

### Responsive Form Layout

```tsx
<form className="space-y-4">
  {/* Stack on mobile, side-by-side on desktop */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input className="w-full" placeholder="First Name" />
    <input className="w-full" placeholder="Last Name" />
  </div>
  
  {/* Full width */}
  <input className="w-full" placeholder="Email" />
  
  {/* Responsive button */}
  <button className="w-full sm:w-auto px-6 py-2">
    Submit
  </button>
</form>
```

### Input Sizing

```tsx
// Responsive input height
<input className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base" />

// Responsive textarea
<textarea className="min-h-[100px] sm:min-h-[150px] p-3 sm:p-4" />
```

## Tables

### Responsive Tables

```tsx
// Horizontal scroll on mobile
<div className="overflow-x-auto">
  <table className="min-w-full">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
        <th>Column 3</th>
      </tr>
    </thead>
    <tbody>
      {/* Table rows */}
    </tbody>
  </table>
</div>

// Card layout on mobile
<div className="block md:hidden">
  {data.map(item => (
    <div key={item.id} className="border rounded p-4 mb-4">
      <div><strong>Name:</strong> {item.name}</div>
      <div><strong>Email:</strong> {item.email}</div>
    </div>
  ))}
</div>

<table className="hidden md:table">
  {/* Desktop table */}
</table>
```

## Modals & Dialogs

### Responsive Modal

```tsx
<Dialog>
  <DialogContent className={cn(
    "w-full max-w-lg",
    "max-h-[90vh] overflow-y-auto",
    "mx-4 sm:mx-auto"
  )}>
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl">
        Modal Title
      </DialogTitle>
    </DialogHeader>
    <div className="p-4 sm:p-6">
      Content
    </div>
  </DialogContent>
</Dialog>
```

## Performance

### Lazy Loading

```tsx
// Lazy load images
<img 
  src="/image.jpg" 
  loading="lazy"
  className="w-full h-auto"
/>

// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### Conditional Rendering

```tsx
// Don't render heavy components on mobile
{!isMobile && <ComplexVisualization />}

// Render simplified version on mobile
{isMobile ? <SimplifiedView /> : <DetailedView />}
```

## Testing

### Responsive Testing Checklist

- [ ] Test on actual devices (iPhone, Android, iPad)
- [ ] Test in browser DevTools responsive mode
- [ ] Test at common breakpoints (320px, 375px, 768px, 1024px, 1920px)
- [ ] Test landscape and portrait orientations
- [ ] Test with browser zoom (100%, 150%, 200%)
- [ ] Test with different font sizes
- [ ] Test touch interactions
- [ ] Test keyboard navigation

### Testing Tools

```tsx
// Responsive testing hook
function useResponsive() {
  const [breakpoint, setBreakpoint] = useState('mobile')
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setBreakpoint('mobile')
      else if (width < 768) setBreakpoint('sm')
      else if (width < 1024) setBreakpoint('md')
      else if (width < 1280) setBreakpoint('lg')
      else setBreakpoint('xl')
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return breakpoint
}
```

## Common Patterns

### Container

```tsx
// Responsive container with max-width
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  Content
</div>
```

### Card Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {cards.map(card => (
    <Card key={card.id} className="p-4 sm:p-6">
      {card.content}
    </Card>
  ))}
</div>
```

### Hero Section

```tsx
<section className="py-12 sm:py-16 md:py-20 lg:py-24">
  <div className="container mx-auto px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
      Hero Title
    </h1>
    <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl">
      Hero description
    </p>
  </div>
</section>
```

## Accessibility

### Focus States

```tsx
// Visible focus for keyboard navigation
<button className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
  Button
</button>
```

### Skip Links

```tsx
// Skip to main content
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>

<main id="main-content">
  Content
</main>
```

## Best Practices Summary

### Do's ✅

1. **Mobile First**: Design for mobile, enhance for desktop
2. **Touch Targets**: Minimum 44x44px for interactive elements
3. **Fluid Typography**: Use clamp() for smooth scaling
4. **Flexible Layouts**: Use flexbox and grid
5. **Responsive Images**: Use srcset and sizes
6. **Test on Real Devices**: Don't rely only on DevTools
7. **Performance**: Lazy load and code split
8. **Accessibility**: Maintain keyboard navigation

### Don'ts ❌

1. **Fixed Widths**: Avoid fixed pixel widths
2. **Tiny Touch Targets**: Don't make buttons too small
3. **Horizontal Scroll**: Avoid unintentional horizontal scrolling
4. **Desktop Only**: Don't design only for desktop
5. **Ignore Performance**: Don't load unnecessary assets on mobile
6. **Break Accessibility**: Don't sacrifice keyboard navigation
7. **Assume Screen Size**: Don't assume all mobiles are the same
8. **Forget Landscape**: Don't forget landscape orientation

## Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Material Design Responsive Layout](https://material.io/design/layout/responsive-layout-grid.html)

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
**Framework**: Next.js + Tailwind CSS
