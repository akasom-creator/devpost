# Implementation Plan

- [x] 1. Initialize project and configure development environment













  - Create Vite + React + TypeScript project with `npm create vite@latest horror-movie-app -- --template react-ts`
  - Install dependencies: `tailwindcss`, `framer-motion`, `react-router-dom`, `axios`, `@tanstack/react-query`, `react-player`
  - Configure Tailwind CSS with custom horror theme colors, fonts, and animations
  - Set up Google Fonts imports for Creepster, Nosifer, and Butcherman
  - Create `.env` file structure for TMDb API key
  - Configure TypeScript with strict mode and path aliases
  - _Requirements: 10.1, 10.3_

- [x] 2. Set up project structure and type definitions





  - Create folder structure: `components/`, `pages/`, `hooks/`, `utils/`, `context/`, `types/`
  - Define TypeScript interfaces in `types/movie.types.ts` for Movie, MovieDetail, Genre, TMDb API responses
  - Create constants file with TMDb API URLs, genre IDs, and theme colors
  - Set up React Router with route definitions for Home, MovieDetailPage, and Watchlist
  - _Requirements: 9.1, 9.4_

- [x] 3. Implement TMDb API integration layer





  - Create `utils/api.ts` with Axios instance configured with base URL and API key
  - Implement API functions: `discoverHorrorMovies`, `searchMovies`, `getMovieDetails`, `getGenres`
  - Add request interceptor for rate limiting (40 requests per 10 seconds)
  - Add response interceptor for error handling and transformation
  - Create `getImageUrl` helper function for poster and backdrop URLs
  - Implement request queue to prevent rate limit violations

  - _Requirements: 1.1, 1.3, 2.2_

- [x] 4. Create custom hooks for data fetching




  - Implement `useMovies` hook with React Query for fetching and caching horror movies
  - Add pagination support with `fetchMore` function and `hasMore` state
  - Implement `useMovieDetails` hook for fetching individual movie data with trailer
  - Add error handling and loading states to all hooks
  - Configure React Query with 5-minute stale time and 10-minute cache time
  - _Requirements: 1.1, 1.2, 4.2, 4.3_

- [x] 5. Implement Watchlist context and hook




  - Create `WatchlistContext` with React Context API
  - Implement `useWatchlist` hook with `addToWatchlist`, `removeFromWatchlist`, `isInWatchlist`, `clearWatchlist` functions
  - Add localStorage persistence that syncs on every watchlist change
  - Implement duplicate prevention and 50-movie limit
  - Create WatchlistProvider component to wrap the app
  - _Requirements: 5.1, 5.2, 5.4, 5.5_
-

- [x] 6. Build BloodDrip animation component




  - Create `BloodDrip.tsx` component with SVG blood droplet graphic
  - Implement Framer Motion animation with teardrop shape elongation
  - Add splatter effect at bottom using separate SVG element
  - Create `useBloodDrip` hook to manage multiple concurrent drip instances
  - Implement random drip timing and positioning for organic feel
  - Add performance limit of 10 concurrent drips
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
-

- [x] 7. Create atmospheric background effects




  - Implement `AtmosphericBackground.tsx` with fog/mist CSS animations
  - Add cobweb SVG decorations positioned in corners
  - Create cracked glass texture overlay with 10% opacity
  - Implement subtle parallax effect on scroll
  - Optimize with `will-change` and GPU acceleration
  - _Requirements: 7.3, 7.4_

- [x] 8. Build ScareMeter rating component





  - Create `ScareMeter.tsx` component with skull, knife, or ghost icon options
  - Convert 0-10 TMDb rating to 0-5 icon display
  - Implement filled and empty icon states with SVG graphics
  - Add animated pulse effect on hover
  - Style with blood-red fill color
  - _Requirements: 4.4, 7.5_

- [x] 9. Implement MovieCard component




  - Create `MovieCard.tsx` with movie poster, title, and rating display
  - Implement lazy-loaded poster image with Intersection Observer
  - Add hover effects: scale 1.05, red glow shadow, blood drip trigger
  - Create add-to-watchlist button with icon toggle based on watchlist state
  - Add click handler to navigate to movie detail page
  - Integrate ScareMeter component for rating display
  - _Requirements: 1.2, 4.5, 5.1, 6.2, 7.4_
-

- [x] 10. Build MovieGrid component with infinite scroll




  - Create `MovieGrid.tsx` with responsive CSS Grid layout (1/3/5 columns)
  - Implement Intersection Observer for infinite scroll at bottom
  - Add staggered Framer Motion animation on initial load
  - Create loading skeleton cards for loading state
  - Handle empty state with creepy "No movies found" message
  - _Requirements: 1.2, 1.5, 8.1, 8.2_
- [x] 11. Create SearchBar component







- [ ] 11. Create SearchBar component

  - Implement `SearchBar.tsx` with debounced input (500ms delay)
  - Add red glowing border on focus with Tailwind classes
  - Create clear button with blood splatter icon
  - Add loading indicator during search
  - Implement keyboard navigation (Enter to search, Escape to clear)
  - _Requirements: 2.1, 2.2, 2.4, 7.4_
-

- [x] 12. Build FilterPanel component




  - Create `FilterPanel.tsx` with horror subgenre checkboxes
  - Implement genre toggle functionality with active state tracking
  - Add custom horror-themed icons for each subgenre (slasher, supernatural, psychological, zombie)
  - Style active filters with blood-red background and glow effect
  - Create collapsible panel for mobile, sidebar for desktop
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
-

- [x] 13. Implement Navbar component





  - Create `Navbar.tsx` with fixed position and backdrop blur
  - Add logo with Creepster font and blood drip animation on hover
  - Integrate SearchBar component
  - Create navigation links to Home and Watchlist pages
  - Implement mobile hamburger menu with slide-in animation
  - _Requirements: 9.1, 7.2, 7.4_
-



- [x] 14. Build LoadingSpinner component






  - Create `LoadingSpinner.tsx` with spinning pentagram SVG
  - Add pulsing red glow effect with Framer Motion
  - Implement fade-in/fade-out transitions


  - Create centered overlay with dark backdrop
  - _Requirements: 10.1_
-

- [x] 15. Create Home page





  - Implement `Home.tsx` page component
  - Integrate AtmosphericBackground, Navbar, FilterPanel, SearchBar, and MovieGrid
  - Implement search functionality with `useMovies` hook and query parameter

  - Add genre filtering logic that 

updates movie query
  - Trigger blood drip animation on page load
  - Handle loading and error states
  - _Requirements: 1.1, 1.2, 2.2, 3.2, 6.1, 9.2_

- [x] 16. Build MovieDetails component and detail page





  - Create `MovieDetails.tsx` with hero section using backdrop image


  - Display movie title, tagline, overview, release year, runtime, and genres
  - Embed YouTube trailer using react-player component
  - Integrate ScareMeter for rating display

  - Add genre tags with horror icons
  - Create add-to-watchlist button with state management
  - Implement responsive two-column layout (info + trailer)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
-

- [x] 17. Implement MovieDetailPage


















- [ ] 17. Implement MovieDetailPage

  - Create `MovieDetailPage.tsx` page component
  - Use `useMovieDetails` hook to fetch movie data based on route parameter
  - Integrate MovieDetails component
  - Trigger blood drip animation on page load
  - Handle loading state with skeleton layout





  - Handle error state with creepy error message

- [x] 18. Create Watchlist page




  - _Requirements: 4.1, 6.1, 9.2_

- [ ] 18. Create Watchlist page



  - Implement `Watchlist.tsx` page component
  - Use `useWatchlist` hook to access 
saved movies
  - Display movies in MovieGrid layout
  - Add remove-from-watchlist functionality on each card
  - Handle empty watchlist state with message "Your crypt is empty..."
  - Add clear all button with confirmation
  - _Requirements: 5.3, 5.4, 9.1_

- [x] 19. Implement Footer component











  - Create `Footer.tsx` with dark background and blood-red accents
  - Add flickering text effect for copyright and links
  - Include TMDb attribution as required by API terms
  - Add social links with hover effects
  - _Requirements: 7.2_
-

- [x] 20. Add page transitions and routing





  - Wrap routes with AnimatePresence from Framer Motion
  - Implement fade-to-black with red flash transition between pages
  - Add exit animations for page components
  - Ensure smooth navigation with scroll restoration
  - _Requirements: 9.2, 9.3_


- [x] 21. Implement responsive design adjustments




  - Test and adjust MovieGrid columns for mobile (1-2), tablet (3), desktop (5)
  - Ensure FilterPanel collapses on mobile with toggle button
  - Make Navbar responsive with hamburger menu
  - Adjust MovieDetails layout for mobile (single column)
  - Ensure all touch targets are at least 44x44px for mobile
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
-

- [x] 22. Optimize performance



  - Implement lazy loading for movie poster images with Intersection Observer
  - Add code splitting for routes using React.lazy and Suspense
  - Configure React Query caching strategy (5min stale, 10min cache)
  - Optimize animations with CSS transforms and GPU acceleration
  - Add `will-change` property to animated elements
  - Implement image placeholder while loading
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 23. Add accessibility features





  - Add ARIA labels to all interactive elements
  - Ensure keyboard navigation works for all components
  - Add visible focus indicators with red glow
  - Implement `prefers-reduced-motion` media query to disable animations
  - Verify color contrast meets WCAG AA standards
  - Add alt text to all images
  - _Requirements: 8.3, 9.1_

- [x] 24. Implement error handling and edge cases




  - Create error boundary component for movie-related errors
  - Add retry functionality for failed API requests
  - Handle missing movie posters with placeholder image
  - Handle missing trailers gracefully in MovieDetails
  - Add timeout handling (10 seconds) for API requests
  - Display user-friendly error messages with horror theme
  - _Requirements: 1.3, 2.5_
-

- [-] 25. Final polish and testing


  - Test all user flows: browse, search, filter, view details, manage watchlist
  - Verify blood drip animations work on all trigger points
  - Test responsive design on multiple screen sizes



  - Verify localStorage persistence for watchlist
  - Check performance with Lighthouse (target > 90 score)
  - Test with slow network conditions
  - Verify all animations are smooth (30+ fps)
  - _Requirements: 10.1, 10.2_

- [ ] 26. Prepare for deployment

  - Create production build with `npm run build`
  - Set up environment variables in Vercel dashboard
  - Configure Vercel deployment settings
  - Test production build locally with `npm run preview`
  - Deploy to Vercel and verify live site
  - Test TMDb API integration in production
  - Verify all assets load correctly (fonts, images, animations)
  - _Requirements: 10.1_
