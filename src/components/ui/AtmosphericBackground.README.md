# AtmosphericBackground Component

## Overview
The `AtmosphericBackground` component creates an immersive horror atmosphere with animated fog/mist, cobweb decorations, cracked glass texture, and parallax scrolling effects.

## Features

### 1. Fog/Mist Animations
- Three independent fog layers with different drift patterns
- Each layer moves at different speeds (30s, 40s, 50s cycles)
- GPU-accelerated animations using CSS transforms
- Subtle opacity variations for depth

### 2. Cobweb Decorations
- SVG-based cobwebs in all four corners
- Realistic web pattern with radial lines and concentric circles
- Small spider detail at center
- Subtle hover effects

### 3. Cracked Glass Overlay
- Diagonal and perpendicular line patterns
- 10% opacity for subtle texture
- Mix-blend-mode for realistic glass effect
- Covers entire viewport

### 4. Parallax Scrolling
- Fog layers move at different speeds based on scroll position
- Throttled scroll events using requestAnimationFrame
- Smooth, performant parallax effect

### 5. Performance Optimizations
- GPU acceleration with `transform: translateZ(0)`
- `will-change` properties on animated elements
- Passive scroll event listeners
- Reduced fog layers on mobile devices
- Respects `prefers-reduced-motion` media query

## Usage

```tsx
import { AtmosphericBackground } from './components/ui';

function App() {
  return (
    <div>
      <AtmosphericBackground />
      {/* Your content here */}
    </div>
  );
}
```

## Requirements Met

- ✓ **Requirement 7.3**: Subtle fog/mist animations in background
- ✓ **Requirement 7.4**: Foundation for atmospheric horror design
- ✓ **Requirement 10.5**: GPU acceleration and optimized animations

## Browser Support

- Modern browsers with CSS animations support
- Fallback for reduced motion preferences
- Mobile-optimized (reduced complexity on smaller screens)

## Performance

- Fixed position with pointer-events: none (no interaction overhead)
- Optimized animation keyframes
- Throttled scroll handlers
- Mobile: Only 2 fog layers instead of 3

## Demo

Run the demo component to see all features in action:

```tsx
import { AtmosphericBackgroundDemo } from './components/ui/AtmosphericBackgroundDemo';
```

## Customization

The component can be customized by modifying:
- `AtmosphericBackground.css` - Animation timing, fog opacity, colors
- Fog layer count and animation patterns
- Cobweb SVG designs and positioning
- Cracked glass pattern density
