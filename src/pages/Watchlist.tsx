import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWatchlist } from '../hooks/useWatchlist';
import { useBloodDrip } from '../hooks/useBloodDrip';
import { AtmosphericBackground } from '../components/ui/AtmosphericBackground';
import MovieGrid from '../components/movie/MovieGrid';
import { pageTransitionVariants } from '../utils/animations';

export default function Watchlist() {
  const { watchlist, clearWatchlist } = useWatchlist();
  const { triggerDrip, drips } = useBloodDrip();
  const [showConfirmation, setShowConfirmation] = useState(false);

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
  }, [triggerDrip]);

  // Handle clear all with confirmation
  const handleClearAll = () => {
    setShowConfirmation(true);
  };

  const confirmClearAll = () => {
    clearWatchlist();
    setShowConfirmation(false);
    // Trigger blood drip on clear
    const x = window.innerWidth / 2;
    const y = 0;
    triggerDrip(x, y);
  };

  const cancelClearAll = () => {
    setShowConfirmation(false);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className="min-h-screen bg-darkness-900 text-white relative overflow-x-hidden"
    >
      {/* Atmospheric Background Effects */}
      <AtmosphericBackground />

      {/* Blood Drip Animations */}
      {drips.map((drip) => (
        <BloodDrip key={drip.id} x={drip.x} y={drip.y} />
      ))}

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <main className="container mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-creepy text-blood-500 mb-2 animate-flicker">
                  Your Crypt
                </h1>
                <p className="text-gray-400 text-lg">
                  {watchlist.length > 0
                    ? `${watchlist.length} ${watchlist.length === 1 ? 'movie' : 'movies'} saved for later`
                    : 'No movies saved yet'}
                </p>
              </div>

              {/* Clear All Button */}
              {watchlist.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearAll}
                  className="px-6 py-3 bg-blood-700 hover:bg-blood-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blood-500/50 border-2 border-blood-500 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900"
                  aria-label="Clear all movies from watchlist"
                >
                  Clear All
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Empty State */}
          {watchlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <svg
                className="w-32 h-32 text-blood-500 mb-6 opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-4xl font-creepy text-blood-500 mb-3 animate-flicker">
                Your crypt is empty...
              </h2>
              <p className="text-gray-400 text-lg mb-6 max-w-md">
                Start adding horror movies to your watchlist to fill this dark void
              </p>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blood-700 hover:bg-blood-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blood-500/50 border-2 border-blood-500 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900"
                aria-label="Go to home page to discover movies"
              >
                Discover Movies
              </motion.a>
            </motion.div>
          ) : (
            /* Movie Grid */
            <MovieGrid
              movies={watchlist}
              isLoading={false}
              onLoadMore={() => {}}
              hasMore={false}
              isFetchingMore={false}
            />
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={cancelClearAll}
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-watchlist-title"
            aria-describedby="clear-watchlist-description"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-darkness-800 border-2 border-blood-500 rounded-lg p-8 max-w-md w-full shadow-2xl shadow-blood-500/30"
            >
              <div className="flex items-center space-x-3 mb-4">
                <svg
                  className="w-10 h-10 text-blood-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 id="clear-watchlist-title" className="text-2xl font-bold text-blood-500">
                  Clear Watchlist?
                </h3>
              </div>
              <p id="clear-watchlist-description" className="text-gray-300 mb-6 text-lg">
                Are you sure you want to remove all {watchlist.length} movies from your watchlist? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmClearAll}
                  className="flex-1 px-6 py-3 bg-blood-700 hover:bg-blood-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blood-500/50 border-2 border-blood-500 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-800"
                  aria-label="Confirm clear all movies from watchlist"
                >
                  Yes, Clear All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelClearAll}
                  className="flex-1 px-6 py-3 bg-darkness-700 hover:bg-darkness-600 text-white font-bold rounded-lg transition-all duration-300 border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-darkness-800"
                  aria-label="Cancel clearing watchlist"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
