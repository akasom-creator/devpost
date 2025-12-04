# Horror Movie Streaming Application - Design Document

## Overview

The Horror Movie Streaming Application is a React-based single-page application (SPA) built with TypeScript, Tailwind CSS, and Framer Motion. The application follows a component-based architecture with clear separation between presentation, business logic, and data fetching. The design prioritizes both visual impact (blood-dripping animations, atmospheric effects) and performance (lazy loading, caching, optimized animations).

The application uses The Movie Database (TMDb) API as the data source and implements client-side routing with React Router. State management is handled through React Context API for the watchlist feature, while movie data fetching uses custom React hooks with caching strategies.

## Architecture

### Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom horror theme configuration
- **Animation**: Framer Motion for complex animations and transitions
- **Routing**: React Router v6 for client-side navigation
- **HTTP Client**: Axios for TMDb API requests with interceptors
- **State Management**: React Context API for watchlist, React Query for server state
- **Build Tool**: Vite for fast development and optimized production builds
- **Deployment**: Vercel with environment variable configuration

### Application Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── movie/
│   │   ├── MovieCard.tsx
│   │   ├── MovieGrid.tsx
│   │   ├── MovieDetails.tsx
│   │   └── ScareMeter.tsx
│   ├── ui/
│   │   ├── BloodDrip.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   └── AtmosphericBackground.tsx
│   └── effects/
│       ├── FogEffect.tsx
│       └── FlickerEffect.tsx
├── pages/
│   ├── Home.tsx
│   ├── MovieDetailPage.tsx
│   └── Watchlist.tsx
├── hooks/
│   ├── useMovies.ts
│   ├── useMovieDetails.ts
│   ├── useWatchlist.ts
│   └── useBloodDrip.ts
├── context/
│   └── WatchlistContext.tsx
├── utils/
│   ├── api.ts
│   ├── constants.ts
│   └── animations.ts
├── types/
│   └── movie.types.ts
└── App.tsx
```

### Architectural Patterns

1. **Component Composition**: Small, reusable components composed into larger features
2. **Custom Hooks**: Business logic extracted into reusable hooks
3. **Context API**: Global state for watchlist accessible throughout the app
4. **Render Props**: BloodDrip component uses render props for flexible positioning
5. **HOC Pattern**: WithBloodDrip higher-order component for adding blood effects to any component

## Components and Interfaces

### Core Components

#### MovieCard Component

**Purpose**: Display individual movie with poster, title, rating, and blood-drip hover effect

**Props Interface**:
```typescript
interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist: (movieId: number) => void;
  isInWatchlist: boolean;
}
```

**Key Features**:
- Hover-triggered blood drip animation using Framer Motion
- Red glow shadow effect on hover
- Lazy-loaded poster image with placeholder
- Add to watchlist button with icon toggle
- Click handler to navigate to detail page

**Animation Details**:
- Blood drip starts from top edge of card on hover
- Uses `motion.div` with custom spring animation
- Drip duration: 1.2s with ease-in timing
- Splatter effect at bottom using SVG

#### MovieGrid Component

**Purpose**: Responsive grid layout displaying multiple MovieCard components

**Props Interface**:
```typescript
interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onLoadMore: () => void;
}
```

**Key Features**:
- CSS Grid with responsive columns (1 on mobile, 3 on tablet, 5 on desktop)
- Intersection Observer for infinite scroll
- Staggered animation on initial load
- Loading skeleton cards while fetching

#### MovieDetails Component

**Purpose**: Full movie information display with trailer embed

**Props Interface**:
```typescript
interface MovieDetailsProps {
  movie: MovieDetail;
  onAddToWatchlist: (movieId: number) => void;
  isInWatchlist: boolean;
}
```

**Key Features**:
- Hero section with backdrop image and gradient overlay
- YouTube trailer embed using react-player
- ScareMeter rating display
- Genre tags with horror icons
- Blood drip animation on page load
- Responsive two-column layout (info + trailer)

#### BloodDrip Component

**Purpose**: Reusable blood dripping animation

**Props Interface**:
```typescript
interface BloodDripProps {
  trigger: 'hover' | 'click' | 'load';
  startX?: number;
  startY?: number;
  count?: number;
  delay?: number;
}
```

**Implementation**:
- SVG-based blood droplet with gradient fill
- Framer Motion for physics-based animation
- Random drip timing for organic feel
- Configurable start position and drip count
- Trail effect using multiple SVG paths

#### Navbar Component

**Purpose**: Top navigation with blood-dripping header effect

**Key Features**:
- Fixed position with backdrop blur
- Logo with creepy font (Creepster)
- Navigation links (Home, Watchlist)
- Integrated SearchBar component
- Blood drip animation on logo hover
- Mobile hamburger menu with slide-in animation

#### SearchBar Component

**Purpose**: Movie search input with debounced API calls

**Props Interface**:
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
```

**Key Features**:
- Debounced input (500ms delay)
- Red glowing border on focus
- Clear button with blood splatter icon
- Loading indicator during search
- Keyboard navigation support (Enter to search, Escape to clear)

#### FilterPanel Component

**Purpose**: Genre filter selection with horror-themed icons

**Props Interface**:
```typescript
interface FilterPanelProps {
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  availableGenres: Genre[];
}
```

**Key Features**:
- Checkbox-style genre buttons with custom icons
- Active state with blood-red background
- Hover effects with glow
- Mobile: collapsible panel
- Desktop: sidebar layout

#### ScareMeter Component

**Purpose**: Custom rating display using horror icons

**Props Interface**:
```typescript
interface ScareMeterProps {
  rating: number; // 0-10
  maxRating?: number;
  icon?: 'skull' | 'knife' | 'ghost';
}
```

**Implementation**:
- Converts 0-10 rating to 0-5 icon display
- Filled and empty icon states
- SVG icons with blood-red fill
- Animated pulse effect on hover

#### LoadingSpinner Component

**Purpose**: Eerie loading animation

**Key Features**:
- Spinning pentagram SVG
- Pulsing red glow effect
- Fade-in/fade-out transitions
- Centered overlay with dark backdrop

#### AtmosphericBackground Component

**Purpose**: Fog/mist and ambient effects

**Implementation**:
- CSS-based fog animation using multiple layers
- Subtle parallax effect on scroll
- Cobweb SVG decorations in corners
- Cracked glass texture overlay (10% opacity)
- Performance: uses `will-change` and GPU acceleration

### Custom Hooks

#### useMovies Hook

**Purpose**: Fetch and manage movie data from TMDb API

**Interface**:
```typescript
interface UseMoviesReturn {
  movies: Movie[];
  isLoading: boolean;
  error: Error | null;
  fetchMore: () => void;
  hasMore: boolean;
}

function useMovies(genre?: number, searchQuery?: string): UseMoviesReturn
```

**Implementation**:
- Uses React Query for caching and background refetching
- Pagination support with page tracking
- Automatic retry on failure (3 attempts)
- Stale time: 5 minutes
- Cache time: 10 minutes

#### useMovieDetails Hook

**Purpose**: Fetch detailed movie information including trailer

**Interface**:
```typescript
interface UseMovieDetailsReturn {
  movie: MovieDetail | null;
  isLoading: boolean;
  error: Error | null;
}

function useMovieDetails(movieId: number): UseMovieDetailsReturn
```

**Implementation**:
- Fetches movie details and videos in parallel
- Extracts YouTube trailer from videos array
- Caches results per movie ID
- Handles missing trailer gracefully

#### useWatchlist Hook

**Purpose**: Manage watchlist state with local storage persistence

**Interface**:
```typescript
interface UseWatchlistReturn {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}

function useWatchlist(): UseWatchlistReturn
```

**Implementation**:
- Uses WatchlistContext for global state
- Syncs with localStorage on every change
- Prevents duplicates
- Maximum 50 movies in watchlist

#### useBloodDrip Hook

**Purpose**: Manage blood drip animation state and triggers

**Interface**:
```typescript
interface UseBloodDripReturn {
  triggerDrip: (x: number, y: number) => void;
  drips: BloodDripInstance[];
}

function useBloodDrip(): UseBloodDripReturn
```

**Implementation**:
- Manages array of active drip animations
- Auto-removes drips after animation completes
- Limits maximum concurrent drips to 10 for performance

## Data Models

### Movie Type

```typescript
interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
}
```

### MovieDetail Type

```typescript
interface MovieDetail extends Movie {
  runtime: number;
  genres: Genre[];
  trailerKey: string | null;
  tagline: string;
  budget: number;
  revenue: number;
}
```

### Genre Type

```typescript
interface Genre {
  id: number;
  name: string;
}
```

### TMDb API Response Types

```typescript
interface TMDbMovieResponse {
  page: number;
  results: TMDbMovie[];
  total_pages: number;
  total_results: number;
}

interface TMDbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}
```

## API Integration

### TMDb API Configuration

**Base URL**: `https://api.themoviedb.org/3`

**Required Endpoints**:
1. `/discover/movie` - Fetch horror movies with filters
2. `/search/movie` - Search movies by title
3. `/movie/{id}` - Get movie details
4. `/movie/{id}/videos` - Get movie trailers
5. `/genre/movie/list` - Get genre list

**Authentication**: API key passed as query parameter or Bearer token

**Rate Limiting**: 40 requests per 10 seconds (handled by request queue)

### API Utility Module

```typescript
// src/utils/api.ts

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Request interceptor for rate limiting
axiosInstance.interceptors.request.use(requestQueue);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => handleApiError(error)
);

export const movieApi = {
  discoverHorrorMovies: (page: number, genreIds?: number[]) => 
    axiosInstance.get('/discover/movie', {
      params: {
        with_genres: '27', // Horror genre ID
        page,
        sort_by: 'popularity.desc',
      },
    }),
  
  searchMovies: (query: string, page: number) =>
    axiosInstance.get('/search/movie', {
      params: { query, page },
    }),
  
  getMovieDetails: (movieId: number) =>
    axiosInstance.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos',
      },
    }),
  
  getGenres: () =>
    axiosInstance.get('/genre/movie/list'),
};

export const getImageUrl = (path: string, size: 'w500' | 'original') =>
  `${IMAGE_BASE_URL}/${size}${path}`;
```

### Error Handling Strategy

1. **Network Errors**: Display retry button with blood splatter icon
2. **404 Not Found**: Show "Movie not found in the crypt" message
3. **Rate Limiting**: Queue requests and show loading state
4. **Invalid API Key**: Show configuration error message
5. **Timeout**: 10-second timeout with retry option

## Styling and Theming

### Tailwind Configuration

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      colors: {
        blood: {
          50: '#fee2e2',
          100: '#fecaca',
          500: '#DC143C',
          700: '#8B0000',
          900: '#450000',
        },
        darkness: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
        },
      },
      fontFamily: {
        creepy: ['Creepster', 'cursive'],
        nosifer: ['Nosifer', 'cursive'],
        butcherman: ['Butcherman', 'cursive'],
      },
      animation: {
        'blood-drip': 'bloodDrip 1.2s ease-in forwards',
        'fog-drift': 'fogDrift 20s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        bloodDrip: {
          '0%': { transform: 'translateY(0) scaleY(1)', opacity: '1' },
          '50%': { transform: 'translateY(50%) scaleY(2)', opacity: '0.8' },
          '100%': { transform: 'translateY(100%) scaleY(0.5)', opacity: '0' },
        },
        fogDrift: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(100px) translateY(-50px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(220, 20, 60, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};
```

### CSS Custom Properties

```css
:root {
  --blood-red: #DC143C;
  --dark-blood: #8B0000;
  --pure-black: #0a0a0a;
  --shadow-glow: 0 0 20px rgba(220, 20, 60, 0.5);
  --transition-haunting: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Animation System

### Blood Drip Animation

**Implementation using Framer Motion**:

```typescript
const bloodDripVariants = {
  initial: {
    y: -20,
    scaleY: 1,
    opacity: 0,
  },
  animate: {
    y: [0, 100, 200],
    scaleY: [1, 2, 0.5],
    opacity: [1, 0.8, 0],
    transition: {
      duration: 1.2,
      ease: 'easeIn',
      times: [0, 0.5, 1],
    },
  },
};

// Splatter effect at bottom
const splatterVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: [0, 1.5, 1],
    opacity: [0, 1, 0],
    transition: {
      duration: 0.4,
      delay: 1.2,
    },
  },
};
```

### Page Transitions

```typescript
const pageTransitionVariants = {
  initial: {
    opacity: 0,
    backgroundColor: '#000',
  },
  animate: {
    opacity: 1,
    backgroundColor: '#0a0a0a',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    backgroundColor: '#8B0000',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};
```

### Hover Effects

- **Movie Card Hover**: Scale 1.05, add red glow shadow, trigger blood drip
- **Button Hover**: Brighten blood-red background, pulse glow animation
- **Link Hover**: Underline with blood-drip animation

## Performance Optimization

### Image Optimization

1. **Lazy Loading**: Use Intersection Observer API for poster images
2. **Responsive Images**: Serve w500 for cards, original for detail page
3. **Placeholder**: Low-quality image placeholder (LQIP) while loading
4. **WebP Format**: Prefer WebP with JPEG fallback

### Animation Performance

1. **GPU Acceleration**: Use `transform` and `opacity` for animations
2. **Will-Change**: Apply to animated elements
3. **Reduce Motion**: Respect `prefers-reduced-motion` media query
4. **Throttle**: Limit blood drip animations to 10 concurrent instances

### Code Splitting

1. **Route-based**: Split Home, MovieDetailPage, and Watchlist
2. **Component-based**: Lazy load MovieDetails and heavy components
3. **Library splitting**: Separate vendor bundle for React, Framer Motion

### Caching Strategy

1. **React Query**: 5-minute stale time, 10-minute cache time
2. **Service Worker**: Cache static assets and API responses (optional)
3. **LocalStorage**: Persist watchlist and user preferences

## Error Handling

### Error Boundaries

```typescript
class MovieErrorBoundary extends React.Component {
  // Catches errors in movie-related components
  // Displays creepy error message with retry option
}
```

### Error States

1. **API Failure**: "The crypt is locked. Try again later."
2. **No Results**: "No movies found in the darkness..."
3. **Network Error**: "Connection lost in the fog..."
4. **Invalid Movie**: "This movie has vanished into the void..."

### Loading States

1. **Initial Load**: Full-screen loading spinner with pentagram
2. **Infinite Scroll**: Skeleton cards at bottom of grid
3. **Search**: Inline loading indicator in search bar
4. **Detail Page**: Skeleton layout with pulsing elements

## Testing Strategy

### Unit Tests

- **Components**: Test rendering, props, and user interactions
- **Hooks**: Test state management and side effects
- **Utilities**: Test API functions and helper methods
- **Animation Logic**: Test blood drip trigger conditions

### Integration Tests

- **Movie Grid**: Test filtering, search, and infinite scroll together
- **Watchlist Flow**: Test add, remove, and persistence
- **Navigation**: Test routing and page transitions
- **API Integration**: Test with mocked API responses

### E2E Tests (Optional)

- **User Journey**: Browse → Search → View Details → Add to Watchlist
- **Responsive**: Test on mobile and desktop viewports
- **Performance**: Lighthouse CI for performance metrics

### Testing Tools

- **Vitest**: Unit and integration tests
- **React Testing Library**: Component testing
- **MSW**: API mocking
- **Playwright**: E2E testing (optional)

## Deployment

### Environment Variables

```
VITE_TMDB_API_KEY=<your_api_key>
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### Build Configuration

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx"
  }
}
```

### Vercel Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_TMDB_API_KEY": "@tmdb-api-key"
  }
}
```

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB (gzipped)

## Security Considerations

1. **API Key Protection**: Use environment variables, never commit to repo
2. **XSS Prevention**: Sanitize user input in search
3. **HTTPS Only**: Enforce secure connections
4. **Content Security Policy**: Restrict external resources
5. **Rate Limiting**: Implement client-side request throttling

## Accessibility

1. **Keyboard Navigation**: All interactive elements accessible via keyboard
2. **Screen Readers**: Proper ARIA labels and semantic HTML
3. **Color Contrast**: Ensure text meets WCAG AA standards despite dark theme
4. **Focus Indicators**: Visible focus states with red glow
5. **Reduced Motion**: Disable animations for users who prefer reduced motion

## Future Enhancements

1. **User Authentication**: Save watchlist to cloud
2. **Movie Recommendations**: AI-powered suggestions
3. **Social Features**: Share watchlist with friends
4. **Advanced Filters**: Rating, year, runtime filters
5. **Dark Mode Toggle**: Even darker mode option
6. **Sound Effects**: Optional audio for hover/click interactions
7. **PWA Support**: Offline functionality and install prompt
