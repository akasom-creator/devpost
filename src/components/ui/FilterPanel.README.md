# FilterPanel Component

A horror-themed filter panel component for selecting movie subgenres with custom icons and atmospheric styling.

## Features

- **Horror Subgenre Filters**: Slasher, Supernatural, Psychological, and Zombie categories
- **Custom Icons**: Each subgenre has a unique horror-themed SVG icon
- **Active State Styling**: Selected filters display with blood-red background and glowing effect
- **Responsive Design**: 
  - Mobile: Collapsible panel with toggle button and overlay
  - Desktop: Fixed sidebar layout
- **Clear Filters**: Button to remove all active filters
- **Active Count**: Display showing number of active filters

## Usage

```tsx
import FilterPanel from './components/ui/FilterPanel';
import { Genre } from './types/movie.types';

function App() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  
  const availableGenres: Genre[] = [
    { id: 27, name: 'Horror' },
    { id: 53, name: 'Thriller' },
    { id: 14, name: 'Fantasy' },
    { id: 9648, name: 'Mystery' },
    { id: 878, name: 'Science Fiction' },
  ];

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <FilterPanel
      selectedGenres={selectedGenres}
      onGenreToggle={handleGenreToggle}
      availableGenres={availableGenres}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `selectedGenres` | `number[]` | Array of currently selected genre IDs |
| `onGenreToggle` | `(genreId: number) => void` | Callback function when a genre is toggled |
| `availableGenres` | `Genre[]` | Array of available genres from TMDb API |

## Subgenre Mappings

The component uses TMDb genre ID combinations to represent horror subgenres:

- **Slasher**: Horror (27) + Thriller (53)
- **Supernatural**: Horror (27) + Fantasy (14)
- **Psychological**: Horror (27) + Mystery (9648)
- **Zombie**: Horror (27) + Science Fiction (878)

## Styling

The component uses Tailwind CSS with custom horror theme classes:

- `blood-*` colors for red accents and glows
- `darkness-*` colors for dark backgrounds
- `font-creepy` for horror-themed typography
- `animate-pulse-glow` for active filter glow effect
- `animate-flicker` for header text effect

## Responsive Behavior

### Desktop (lg and above)
- Fixed sidebar on the left side
- Always visible
- Sticky positioning

### Mobile (below lg)
- Collapsible panel that slides in from the left
- Toggle button fixed in top-left corner
- Dark overlay when panel is open
- Tap overlay to close panel

## Accessibility

- Semantic HTML with `<aside>` element
- ARIA labels on toggle button
- `aria-pressed` state on filter buttons
- Keyboard accessible
- Focus indicators with red glow

## Demo

Run the demo component to see the FilterPanel in action:

```tsx
import FilterPanelDemo from './components/ui/FilterPanelDemo';

// In your app
<FilterPanelDemo />
```

## Requirements Satisfied

- ✅ 3.1: Provides Filter Panel with horror subgenre options
- ✅ 3.2: Displays only movies matching selected subgenre(s)
- ✅ 3.3: Supports multiple subgenre selection
- ✅ 3.4: Displays all horror movies when no filters selected
- ✅ 3.5: Visually indicates active filters with blood-red styling
