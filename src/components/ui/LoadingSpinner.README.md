# LoadingSpinner Component

A horror-themed loading spinner component featuring a spinning pentagram with pulsing red glow effects.

## Features

- **Spinning Pentagram SVG**: Continuously rotating pentagram animation
- **Pulsing Red Glow**: Dynamic glow effect that pulses using Framer Motion
- **Fade Transitions**: Smooth fade-in and fade-out animations
- **Full-Screen Overlay**: Optional centered overlay with dark backdrop
- **Customizable Size**: Adjustable spinner size
- **Accessible**: Includes ARIA labels and screen reader support

## Usage

### Full-Screen Loading Spinner

```tsx
import { LoadingSpinner } from '@/components/ui';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {/* Your content */}
    </>
  );
}
```

### Inline Loading Spinner

```tsx
import { LoadingSpinner } from '@/components/ui';

function MyComponent() {
  return (
    <div className="container">
      <LoadingSpinner fullScreen={false} size={60} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `80` | Size of the spinner in pixels |
| `fullScreen` | `boolean` | `true` | Whether to display as full-screen overlay with backdrop |

## Animation Details

### Rotation Animation
- **Duration**: 2 seconds per rotation
- **Easing**: Linear
- **Repeat**: Infinite

### Glow Effect
- **Duration**: 2 seconds per pulse cycle
- **Easing**: Ease-in-out
- **Colors**: Blood red (#DC143C) with varying opacity
- **Shadow Range**: 10px to 30px

### Fade Transition
- **Duration**: 0.3 seconds
- **Type**: Opacity-based fade

## Styling

The component uses Tailwind CSS classes and custom colors from the horror theme:

- Background: `bg-black/80` with `backdrop-blur-sm`
- Pentagram Fill: `#DC143C` (blood red)
- Pentagram Stroke: `#8B0000` (dark blood)
- Glow: Dynamic drop-shadow with blood red color

## Accessibility

- Includes `role="status"` for screen readers
- Contains `aria-label="Loading"` for context
- Hidden text "Loading..." for screen reader users
- Respects user motion preferences (can be enhanced with `prefers-reduced-motion`)

## Performance Considerations

- Uses CSS transforms for smooth GPU-accelerated animations
- Framer Motion optimizes animation performance
- Minimal DOM elements for efficient rendering
- Backdrop blur may impact performance on lower-end devices

## Examples

### Loading Data
```tsx
function MovieList() {
  const { movies, isLoading } = useMovies();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <div>{/* Render movies */}</div>;
}
```

### Custom Size
```tsx
<LoadingSpinner size={120} fullScreen={false} />
```

### With AnimatePresence
```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isLoading && <LoadingSpinner />}
</AnimatePresence>
```

## Related Components

- `BloodDrip`: Blood dripping animation effect
- `AtmosphericBackground`: Background fog and mist effects
- `ScareMeter`: Horror-themed rating display

## Requirements

This component fulfills Requirement 10.1:
- Displays loading state within 3 seconds on standard connection
- Maintains smooth animation performance
- Provides visual feedback during data fetching
