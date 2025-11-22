import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useBloodDrip } from '../hooks/useBloodDrip';
import MovieDetails from '../components/movie/MovieDetails';
import { AtmosphericBackground } from '../components/ui/AtmosphericBackground';
import { pageTransitionVariants } from '../utils/animations';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id, 10) : 0;
  
  const { movie, isLoading, error } = useMovieDetails(movieId);
  const { triggerDrip, drips } = useBloodDrip();

  // Trigger blood drip animation on page load (only once per movie)
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
  }, [movieId, triggerDrip]);

  // Handle invalid movie ID
  if (!movieId || movieId <= 0) {
    return (
      <div className="min-h-screen bg-darkness-900 text-white flex items-center justify-center pt-20">
        <AtmosphericBackground />
        <div className="relative z-10 bg-blood-900/20 border-2 border-blood-700 rounded-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">💀</div>
          <h2 className="text-3xl font-bold text-blood-500 mb-3 font-creepy">
            Invalid Movie
          </h2>
          <p className="text-gray-300 mb-6">
            This movie has vanished into the void...
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="px-6 py-3 bg-blood-700 hover:bg-blood-600 text-white rounded-lg font-bold transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
          >
            Return to Safety
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-darkness-900 text-white pt-20">
        <AtmosphericBackground />
        
        {/* Blood Drip Animations */}
        {drips.map((drip) => (
          <BloodDrip key={drip.id} x={drip.x} y={drip.y} />
        ))}

        <div className="relative z-10 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !movie) {
    return (
      <div className="min-h-screen bg-darkness-900 text-white flex items-center justify-center pt-20">
        <AtmosphericBackground />
        
        {/* Blood Drip Animations */}
        {drips.map((drip) => (
          <BloodDrip key={drip.id} x={drip.x} y={drip.y} />
        ))}

        <div className="relative z-10 bg-blood-900/20 border-2 border-blood-700 rounded-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-3xl font-bold text-blood-500 mb-3 font-creepy animate-flicker">
            Something Went Wrong
          </h2>
          <p className="text-gray-300 mb-2">
            {error?.message || 'This movie has vanished into the void...'}
          </p>
          <p className="text-gray-400 text-sm mb-6">
            The spirits are restless. Try again later.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="px-6 py-3 bg-blood-700 hover:bg-blood-600 text-white rounded-lg font-bold transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)' }}
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="px-6 py-3 bg-darkness-800 hover:bg-blood-900 text-blood-500 border-2 border-blood-700 hover:border-blood-500 rounded-lg font-bold transition-all duration-300"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - render movie details
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className="min-h-screen bg-darkness-900 text-white"
      style={{ willChange: 'opacity' }}
    >
      <AtmosphericBackground />
      
      {/* Blood Drip Animations */}
      {drips.map((drip) => (
        <BloodDrip key={drip.id} x={drip.x} y={drip.y} />
      ))}

      <div className="relative z-10 pt-20">
        <MovieDetails movie={movie} />
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