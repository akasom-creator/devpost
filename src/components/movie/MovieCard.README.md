# MovieCard Component

A horror-themed movie card component that displays movie information with atmospheric effects.

## Features

- **Lazy-loaded poster image**: Uses Intersection Observer API to load images only when they enter the viewport
- **Hover effects**: 
  - Scale animation (1.05x)
  - Red glow shadow effect
  - Blood drip animation triggered on hover
- **Watchlist integration**: Add/remove button with icon toggle based on watchlist state
- **Navigation**: Click handler to navigate to movie detail page
- **Rating display**: Integrated ScareMeter component showing movie rating
- **Responsive**: Works on all screen sizes

## Props

```typescript
interface MovieCardProps {
  movie: Movie; // Movie object from TMDb API
}
```

## Usage

```tsx
import { MovieCard } from './components/movie';

function MovieGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

## Requirements Satisfied

- **1.2**: Displays movie posters, titles, and ratings
- **4.5**: Provides navigation to detail page on click
- **5.1**: Add-to-watchlist button on each card
- **6.2**: Blood drip animation on hover
- **7.4**: Red glowing shadows on hover

## Implementation Details

### Lazy Loading
The component uses the Intersection Observer API to detect when the card enters the viewport. Images are only loaded when visible, improving performance.

### Blood Drip Animation
On hover, the component triggers a blood drip animation using the `useBloodDrip` hook. The drip starts from a random position at the top of the card.

### Watchlist State
The component uses the `useWatchlist` hook to check if the movie is in the watchlist and to add/remove it. The heart icon changes between filled (in watchlist) and outlined (not in watchlist).

### Hover Effects
- Scale animation using Framer Motion's `whileHover` prop
- Dynamic box shadow that changes on hover
- Text color transition for the title
