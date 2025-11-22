import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../types/movie.types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  isFetchingMore?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  isLoading,
  onLoadMore,
  hasMore,
  isFetchingMore = false,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          onLoadMore();
        }
      },
      {
        rootMargin: '200px', // Trigger 200px before reaching the bottom
        threshold: 0.1,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isFetchingMore, onLoadMore]);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animation variants - Using transform for GPU acceleration
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  // Loading skeleton card
  const SkeletonCard = () => (
    <div className="relative aspect-[2/3] bg-darkness-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-darkness-800 via-darkness-700 to-darkness-800 animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-4 bg-darkness-700 rounded animate-pulse" />
        <div className="h-3 bg-darkness-700 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );

  // Initial loading state
  if (isLoading && movies.length === 0) {
    return (
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!isLoading && movies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[400px] text-center"
      >
        <svg
          className="w-24 h-24 text-blood-500 mb-6 opacity-50"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-3xl font-creepy text-blood-500 mb-2">
          No movies found in the darkness...
        </h2>
        <p className="text-gray-400 text-lg">
          The crypt is empty. Try a different search or filter.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Movie grid with staggered animation - Responsive: 1 col mobile, 2 cols small mobile, 3 cols tablet, 5 cols desktop */}
      <motion.div
        className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="list"
        aria-label="Movie grid"
      >
        {movies.map((movie) => (
          <motion.div 
            key={movie.id} 
            variants={itemVariants}
            style={{ willChange: 'transform, opacity' }}
            role="listitem"
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading more indicator */}
      {isFetchingMore && (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mt-6" role="status" aria-label="Loading more movies">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={`loading-skeleton-${index}`} />
          ))}
          <span className="sr-only">Loading more movies...</span>
        </div>
      )}

      {/* Intersection observer target */}
      <div ref={observerTarget} className="h-10 mt-6" aria-hidden="true" />
    </div>
  );
};

export default MovieGrid;
