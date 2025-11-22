import React from 'react';
import { motion } from 'framer-motion';

interface MoviePosterPlaceholderProps {
  title?: string;
  className?: string;
}

/**
 * Placeholder component for missing movie posters
 * Displays a horror-themed placeholder with film icon
 */
const MoviePosterPlaceholder: React.FC<MoviePosterPlaceholderProps> = ({ 
  title = 'No Image',
  className = ''
}) => {
  return (
    <div 
      className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-darkness-800 via-darkness-700 to-darkness-800 ${className}`}
      role="img"
      aria-label={`${title} - No poster available`}
    >
      {/* Animated Film Icon */}
      <motion.svg
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 md:w-20 md:h-20 text-blood-500 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
      </motion.svg>

      {/* Text */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 0.6 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center px-4"
      >
        <p className="text-blood-500 font-semibold text-sm md:text-base mb-1">
          Lost in the Void
        </p>
        <p className="text-gray-500 text-xs">
          Poster unavailable
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner decorations */}
        <svg className="absolute top-2 left-2 w-8 h-8 text-blood-900 opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
        <svg className="absolute top-2 right-2 w-8 h-8 text-blood-900 opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
        <svg className="absolute bottom-2 left-2 w-8 h-8 text-blood-900 opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
        <svg className="absolute bottom-2 right-2 w-8 h-8 text-blood-900 opacity-30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        </svg>
      </div>
    </div>
  );
};

export default MoviePosterPlaceholder;
