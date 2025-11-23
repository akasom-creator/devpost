import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { AtmosphericBackground } from '../components/ui/AtmosphericBackground';
import FilterPanel from '../components/ui/FilterPanel';
import MovieGrid from '../components/movie/MovieGrid';
import ErrorMessage from '../components/ui/ErrorMessage';
import { SearchBar } from '../components/ui/SearchBar';
import { useMovies } from '../hooks/useMovies';
import { useGenres } from '../hooks/useGenres';
import { useBloodDrip } from '../hooks/useBloodDrip';
import { pageTransitionVariants } from '../utils/animations';

// Horror genre ID from TMDb
const HORROR_GENRE_ID = 27;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([HORROR_GENRE_ID]);
  const [yearRange, setYearRange] = useState({ min: 1970, max: new Date().getFullYear() });
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 });
  const [runtimeFilter, setRuntimeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const { triggerDrip, drips } = useBloodDrip();
  const queryClient = useQueryClient();

  // Fetch genres dynamically
  const { genres: availableGenres } = useGenres();

  // Get search query from URL params
  const searchQuery = searchParams.get('search') || '';

  // Fetch movies with current filters and search query
  const { movies, isLoading, error, fetchMore, hasMore, isFetchingMore } = useMovies({
    genreIds: selectedGenres.length > 0 ? selectedGenres : undefined,
    searchQuery: searchQuery || undefined,
    yearRange,
    ratingRange,
    runtimeFilter,
    sortBy,
  });

  // Retry function for error handling
  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['movies'] });
  };

  // Handle search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ search: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Set initial selected genres when genres are loaded
  useEffect(() => {
    if (availableGenres.length > 0 && selectedGenres.length === 1 && selectedGenres[0] === HORROR_GENRE_ID) {
      // Keep horror selected by default
      setSelectedGenres([HORROR_GENRE_ID]);
    }
  }, [availableGenres]); // Remove selectedGenres from dependencies to prevent infinite loop

  // Trigger blood drip animation on page load
  useEffect(() => {
    // Trigger multiple blood drips at random positions on load
    const delays = [0, 300, 600];

    delays.forEach((delay) => {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = 0;
        triggerDrip(x, y);
      }, delay);
    });
  }, []); // Remove triggerDrip dependency to prevent infinite loop

  // Handle genre toggle
  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        // Remove genre
        const newGenres = prev.filter((id) => id !== genreId);
        // Always keep at least horror genre if removing all
        return newGenres.length === 0 ? [HORROR_GENRE_ID] : newGenres;
      } else {
        // Add genre
        return [...prev, genreId];
      }
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className="min-h-screen bg-darkness-900 text-white relative overflow-x-hidden"
      style={{ willChange: 'opacity' }}
    >
      {/* Atmospheric Background Effects */}
      <AtmosphericBackground />

      {/* Blood Drip Animations */}
      {drips.map((drip) => (
        <BloodDrip key={drip.id} x={drip.x} y={drip.y} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <div className="flex">
          {/* Filter Panel Sidebar */}
          <FilterPanel
            selectedGenres={selectedGenres}
            onGenreToggle={handleGenreToggle}
            availableGenres={availableGenres}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
            ratingRange={ratingRange}
            onRatingRangeChange={setRatingRange}
            runtimeFilter={runtimeFilter}
            onRuntimeFilterChange={setRuntimeFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
          />

          {/* Main Content Area */}
          <main id="main-content" className="flex-1 p-6 lg:p-8" role="main">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-creepy text-blood-500 mb-2 animate-flicker">
                {searchQuery ? 'Search Results' : 'Discover Horror'}
              </h1>
              <p className="text-gray-400 text-lg mb-6">
                {searchQuery
                  ? `Searching for "${searchQuery}"`
                  : 'Explore the darkest corners of cinema'}
              </p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center"
              >
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search for horror movies..."
                  isLoading={isLoading}
                />
              </motion.div>
            </motion.div>

            {/* Error State */}
            {error && (
              <ErrorMessage 
                error={error} 
                onRetry={handleRetry}
                className="mb-8"
              />
            )}

            {/* Movie Grid */}
            <MovieGrid
              movies={movies}
              isLoading={isLoading}
              onLoadMore={fetchMore}
              hasMore={hasMore}
              isFetchingMore={isFetchingMore}
            />
          </main>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * BloodDrip Component
 * Renders a single blood drip animation at specified coordinates
 */
interface BloodDripProps {
  x: number;
  y: number;
}

const BloodDrip: React.FC<BloodDripProps> = ({ x, y }) => {
  return (
    <motion.div
      initial={{ y: y - 20, scaleY: 1, opacity: 0 }}
      animate={{
        y: [y, y + 100, y + 200],
        scaleY: [1, 2, 0.5],
        opacity: [1, 0.8, 0],
      }}
      transition={{
        duration: 1.2,
        ease: 'easeIn',
        times: [0, 0.5, 1],
      }}
      style={{
        position: 'fixed',
        left: x,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform, opacity',
      }}
    >
      <svg
        width="20"
        height="60"
        viewBox="0 0 20 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`bloodGradient-${x}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC143C" stopOpacity="1" />
            <stop offset="100%" stopColor="#8B0000" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <ellipse cx="10" cy="30" rx="6" ry="25" fill={`url(#bloodGradient-${x})`} />
      </svg>

      {/* Splatter Effect */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.4,
          delay: 1.2,
        }}
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          willChange: 'transform, opacity',
        }}
      >
        <svg
          width="30"
          height="15"
          viewBox="0 0 30 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="15" cy="7.5" r="7" fill="#8B0000" opacity="0.8" />
          <circle cx="5" cy="10" r="3" fill="#8B0000" opacity="0.6" />
          <circle cx="25" cy="10" r="3" fill="#8B0000" opacity="0.6" />
          <circle cx="10" cy="5" r="2" fill="#8B0000" opacity="0.5" />
          <circle cx="20" cy="5" r="2" fill="#8B0000" opacity="0.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
