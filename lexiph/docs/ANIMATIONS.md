# Animation System - Framer Motion

## Overview

LexiPH uses Framer Motion for smooth, performant animations that enhance user experience while respecting accessibility preferences.

## Installation

```bash
npm install framer-motion
```

## Animated Components

### Available Components

Located in `components/ui/animated.tsx`:

1. **FadeIn** - Fade in animation
2. **SlideInLeft** - Slide from left
3. **SlideInRight** - Slide from right
4. **SlideUp** - Slide up from bottom
5. **ScaleIn** - Scale in animation
6. **StaggerChildren** - Stagger child animations
7. **StaggerItem** - Individual staggered item
8. **HoverScale** - Scale on hover
9. **AnimatedButton** - Interactive button

## Usage Examples

### Basic Fade In

```tsx
import { FadeIn } from '@/components/ui/animated'

<FadeIn>
  <div>Content fades in</div>
</FadeIn>
```

### Slide In with Delay

```tsx
import { SlideInLeft } from '@/components/ui/animated'

<SlideInLeft delay={0.2}>
  <div>Content slides in after 200ms</div>
</SlideInLeft>
```

### Staggered List

```tsx
import { StaggerChildren, StaggerItem } from '@/components/ui/animated'

<StaggerChildren staggerDelay={0.1}>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <div>{item.name}</div>
    </StaggerItem>
  ))}
</StaggerChildren>
```

### Hover Effects

```tsx
import { HoverScale } from '@/components/ui/animated'

<HoverScale scale={1.05}>
  <button>Hover me!</button>
</HoverScale>
```

### Animated Button

```tsx
import { AnimatedButton } from '@/components/ui/animated'

<AnimatedButton
  className="bg-primary text-white px-4 py-2 rounded"
  onClick={handleClick}
>
  Click me
</AnimatedButton>
```

## Animation Variants

### Custom Animations

```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.3 }}
>
  Custom animation
</motion.div>
```

### Page Transitions

```tsx
import { motion, AnimatePresence } from 'framer-motion'

<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

## CSS Animations

For simple animations, use CSS classes:

```tsx
<div className="animate-fade-in">
  Fades in with CSS
</div>

<div className="animate-slide-up">
  Slides up with CSS
</div>
```

### Available CSS Animations

- `animate-fade-in` - Fade in (300ms)
- `animate-slide-in-left` - Slide from left (300ms)
- `animate-slide-in-right` - Slide from right (300ms)
- `animate-slide-up` - Slide up (300ms)
- `animate-scale-in` - Scale in (200ms)

## Best Practices

### 1. Performance

**Do:**
- Use `transform` and `opacity` for animations
- Keep animations under 300ms for UI interactions
- Use `will-change` sparingly

**Don't:**
- Animate `width`, `height`, or `top/left`
- Create animations longer than 500ms
- Animate too many elements simultaneously

### 2. Accessibility

**Respect User Preferences:**

```tsx
import { useReducedMotion } from 'framer-motion'

function MyComponent() {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={{ x: shouldReduceMotion ? 0 : 100 }}
    >
      Content
    </motion.div>
  )
}
```

**CSS Approach:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Timing

**Recommended Durations:**

- **Micro-interactions**: 100-200ms (buttons, toggles)
- **UI transitions**: 200-300ms (modals, dropdowns)
- **Page transitions**: 300-400ms (route changes)
- **Complex animations**: 400-500ms (multi-step)

**Easing Functions:**

- `ease-out` - UI entering (default)
- `ease-in` - UI exiting
- `ease-in-out` - Smooth both ways
- `spring` - Natural, bouncy feel

### 4. Stagger Delays

```tsx
// Good: Subtle stagger
<StaggerChildren staggerDelay={0.05}>

// Good: Noticeable stagger
<StaggerChildren staggerDelay={0.1}>

// Too slow: Feels sluggish
<StaggerChildren staggerDelay={0.3}>
```

## Common Patterns

### Modal/Dialog

```tsx
<AnimatePresence>
  {isOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg p-6">
          Modal content
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

### Sidebar

```tsx
<motion.aside
  initial={{ x: -280 }}
  animate={{ x: isOpen ? 0 : -280 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="fixed left-0 top-0 w-[280px] h-screen"
>
  Sidebar content
</motion.aside>
```

### Dropdown Menu

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full mt-2"
    >
      Menu items
    </motion.div>
  )}
</AnimatePresence>
```

### Toast Notification

```tsx
<motion.div
  initial={{ opacity: 0, y: 50, scale: 0.3 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
  className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4"
>
  Notification message
</motion.div>
```

### Loading Spinner

```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
/>
```

## Advanced Techniques

### Gesture Animations

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 0 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.1 }}
>
  Draggable element
</motion.div>
```

### Scroll Animations

```tsx
import { useScroll, useTransform } from 'framer-motion'

function ScrollComponent() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  
  return (
    <motion.div style={{ opacity }}>
      Fades out on scroll
    </motion.div>
  )
}
```

### Layout Animations

```tsx
<motion.div layout>
  Content that animates when layout changes
</motion.div>
```

## Testing Animations

### Visual Testing

1. Test on different devices (mobile, tablet, desktop)
2. Test with slow network (animations should still feel smooth)
3. Test with reduced motion enabled
4. Test in different browsers

### Performance Testing

```tsx
// Monitor frame rate
import { useAnimationFrame } from 'framer-motion'

useAnimationFrame((t, delta) => {
  console.log('Frame time:', delta)
})
```

## Troubleshooting

### Animation Not Working

1. Check if component is wrapped in `<AnimatePresence>`
2. Verify `initial`, `animate`, and `exit` props
3. Ensure unique `key` prop for list items
4. Check for CSS conflicts

### Performance Issues

1. Reduce number of animated elements
2. Use `transform` instead of `top/left`
3. Add `will-change: transform` for complex animations
4. Consider using CSS animations for simple cases

### Accessibility Issues

1. Always respect `prefers-reduced-motion`
2. Provide alternative non-animated states
3. Ensure animations don't interfere with screen readers
4. Test with keyboard navigation

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://www.framer.com/motion/animation/)
- [Gesture Animations](https://www.framer.com/motion/gestures/)
- [Accessibility](https://www.framer.com/motion/accessibility/)

---

**Last Updated**: ${new Date().toLocaleDateString()}
**Version**: 1.0.0
**Library**: Framer Motion
