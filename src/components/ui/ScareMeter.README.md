# ScareMeter Component

A horror-themed rating display component that converts TMDb's 0-10 rating scale to a visual 0-5 icon display using skull, knife, or ghost icons.

## Features

- **Rating Conversion**: Automatically converts 0-10 TMDb ratings to 0-5 icon display
- **Multiple Icon Types**: Choose from skull, knife, or ghost icons
- **Filled/Empty States**: Visual distinction between filled and empty icons
- **Animated Pulse Effect**: Blood-red glow animation on hover
- **Accessibility**: Includes proper ARIA labels for screen readers
- **Customizable**: Supports custom className for styling

## Usage

```tsx
import { ScareMeter } from './components/ui';

// Basic usage with skull icons (default)
<ScareMeter rating={7.5} />

// With knife icons
<ScareMeter rating={8.2} icon="knife" />

// With ghost icons
<ScareMeter rating={6.0} icon="ghost" />

// Custom styling
<ScareMeter rating={9.5} icon="skull" className="scale-150" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `number` | required | TMDb rating from 0-10 |
| `maxRating` | `number` | `5` | Maximum number of icons to display |
| `icon` | `'skull' \| 'knife' \| 'ghost'` | `'skull'` | Icon type to display |
| `className` | `string` | `''` | Additional CSS classes |

## Examples

### Different Ratings
```tsx
<ScareMeter rating={10} icon="skull" /> // 5 filled skulls
<ScareMeter rating={7.5} icon="skull" /> // 4 filled skulls
<ScareMeter rating={5} icon="skull" />   // 3 filled skulls (rounded)
<ScareMeter rating={0} icon="skull" />   // 0 filled skulls
```

### Different Icon Types
```tsx
<ScareMeter rating={8} icon="skull" />
<ScareMeter rating={8} icon="knife" />
<ScareMeter rating={8} icon="ghost" />
```

## Styling

The component uses:
- Blood-red fill color (`#DC143C`) for filled icons
- Dark gray (`#4a4a4a`) for empty icons
- Pulse glow animation on hover with staggered delays
- Scale transition on individual icon hover

## Accessibility

- Includes `role="img"` for semantic meaning
- Provides `aria-label` with rating information
- Keyboard accessible through standard focus behavior

## Demo

Run the demo component to see all variations:

```tsx
import ScareMeterDemo from './components/ui/ScareMeterDemo';

<ScareMeterDemo />
```
