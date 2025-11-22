# Error Handling Implementation

This document describes the comprehensive error handling and edge case management implemented in the Horror Movie Streaming Application.

## Overview

The application now includes robust error handling at multiple levels:
- **Component-level**: Error boundaries for React component errors
- **API-level**: Timeout handling, retry logic, and user-friendly error messages
- **UI-level**: Graceful handling of missing data (posters, trailers)

## Components

### 1. ErrorBoundary Component
**Location**: `src/components/ui/ErrorBoundary.tsx`

A React Error Boundary that catches JavaScript errors anywhere in the component tree and displays a horror-themed fallback UI.

**Features**:
- Catches and logs React component errors
- Displays user-friendly error message with horror theme
- Provides "Try Again" and "Return to Safety" buttons
- Shows technical details in development mode
- Prevents entire app crash from component errors

**Usage**:
```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### 2. ErrorMessage Component
**Location**: `src/components/ui/ErrorMessage.tsx`

A reusable component for displaying API and network errors with retry functionality.

**Features**:
- Horror-themed error messages based on error type
- Optional retry button
- Contextual error messages (network, timeout, 404, rate limit, etc.)
- Technical details in development mode
- Animated entrance/exit

**Error Message Mapping**:
- Network errors → "Connection lost in the fog..."
- Timeout errors → "The spirits took too long to respond..."
- 404 errors → "This movie has vanished into the void..."
- 401 errors → "The crypt keeper denies entry. Check your API key."
- 429 errors → "Too many requests. The crypt is overwhelmed..."
- 500/503 errors → "The crypt is locked. Try again later."

**Usage**:
```tsx
<ErrorMessage 
  error={error} 
  onRetry={handleRetry}
/>
```

### 3. MoviePosterPlaceholder Component
**Location**: `src/components/ui/MoviePosterPlaceholder.tsx`

A placeholder component displayed when movie posters are missing or fail to load.

**Features**:
- Horror-themed placeholder design
- Film icon with "Lost in the Void" message
- Animated entrance
- Decorative corner elements
- Maintains aspect ratio

**Usage**:
```tsx
<MoviePosterPlaceholder title={movie.title} />
```

## API Error Handling

### Timeout Configuration
**Location**: `src/utils/constants.ts`

```typescript
PERFORMANCE_LIMITS: {
  API_TIMEOUT: 10000, // 10 seconds
}
```

All API requests automatically timeout after 10 seconds, preventing indefinite hanging.

### Retry Logic
**Location**: `src/hooks/useMovies.ts`, `src/hooks/useMovieDetails.ts`

React Query is configured with automatic retry:
```typescript
retry: 3, // Retry failed requests 3 times
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
```

Exponential backoff: 1s, 2s, 4s (max 30s)

### Rate Limiting
**Location**: `src/utils/api.ts`

Request queue implementation prevents exceeding TMDb API rate limits:
- Maximum 40 requests per 10 seconds
- Automatic queuing of excess requests
- Transparent to the application

## Edge Cases Handled

### 1. Missing Movie Posters
**Implementation**: `MovieCard.tsx`, `MovieDetails.tsx`

- Displays `MoviePosterPlaceholder` when `posterPath` is null
- Handles image load errors with `onError` handler
- Graceful fallback to placeholder

### 2. Missing Trailers
**Implementation**: `MovieDetails.tsx`

- Checks if `trailerKey` exists before rendering player
- Displays placeholder message: "No trailer available"
- Horror-themed message: "The spirits haven't revealed this yet..."

### 3. Invalid Movie IDs
**Implementation**: `MovieDetailPage.tsx`

- Validates movie ID before fetching
- Displays error page for invalid IDs
- Provides navigation back to home

### 4. Network Failures
**Implementation**: All pages with data fetching

- Displays `ErrorMessage` component
- Provides retry functionality
- Maintains horror theme in error states

### 5. Empty Search Results
**Implementation**: `MovieGrid.tsx`

- Displays "No movies found in the darkness..." message
- Maintains atmospheric effects
- Provides clear feedback to user

## Page-Level Error Handling

### Home Page
**Location**: `src/pages/Home.tsx`

- Displays `ErrorMessage` with retry button
- Retry invalidates React Query cache
- Maintains filters and search state

### Movie Detail Page
**Location**: `src/pages/MovieDetailPage.tsx`

- Loading skeleton while fetching
- Error state with retry and home navigation
- Invalid ID validation

### Watchlist Page
**Location**: `src/pages/Watchlist.tsx`

- No API errors (uses localStorage)
- Empty state with call-to-action
- Confirmation modal for clear all

## Testing Error Handling

### Manual Testing Scenarios

1. **Network Error**:
   - Disconnect internet
   - Navigate to home page
   - Verify error message appears
   - Reconnect and click retry

2. **Invalid API Key**:
   - Set invalid `VITE_TMDB_API_KEY` in `.env`
   - Verify 401 error message

3. **Missing Poster**:
   - Find movie with null `poster_path`
   - Verify placeholder displays

4. **Missing Trailer**:
   - Find movie without trailer
   - Verify placeholder message

5. **Timeout**:
   - Throttle network to slow 3G
   - Verify timeout after 10 seconds

6. **Component Error**:
   - Throw error in component
   - Verify ErrorBoundary catches it

## Best Practices

1. **Always provide retry functionality** for API errors
2. **Use horror-themed messages** to maintain app atmosphere
3. **Show technical details only in development** mode
4. **Maintain loading states** during retry attempts
5. **Preserve user context** (filters, search) after errors
6. **Provide clear navigation** back to safe states

## Future Enhancements

- [ ] Offline mode with service worker
- [ ] Error reporting to monitoring service
- [ ] More granular error categorization
- [ ] User feedback collection on errors
- [ ] Automatic retry with exponential backoff UI indicator
