# Empty State Flow Documentation

## Visual Hierarchy (Empty State)

### Vertical Order:
1. **Greeting & Assistant Text** (Top)
   - "Good morning/afternoon/evening, [Name]"
   - "Your AI assistant for Philippine legal compliance"

2. **Chat Input Box** (Middle)
   - Centered input with focus states
   - Send button integrated

3. **Suggested Prompts** (Below Input)
   - 4 clickable prompt suggestions
   - Hover animations

## Transition Flow

### Before First Message:
- Input is **centered** on screen
- Greeting and suggestions visible
- Clean, minimal layout

### After Send/Click Suggestion:
- Input **transitions to bottom** (becomes ChatInput)
- Greeting and suggestions fade out
- Messages appear in chat area
- Smooth animation (300ms)

## Header Update

### Logo Position:
- **Centered** in header using absolute positioning
- Scale icon + "LexInSight" text
- Gradient text effect maintained
- UserMenu stays on right side

## Component Structure

```
ChatContainer
├── ChatHeader (with centered logo)
└── Empty State (when no messages)
    ├── EmptyState Component
    │   ├── Greeting
    │   ├── Assistant description
    │   └── Suggested prompts
    └── CenteredInput Component
        └── Input box with send button
```

## Key Features

- Smooth transitions between states
- Responsive design (mobile + desktop)
- Accessibility compliant
- Framer Motion animations
- Auto-close sidebar on send
