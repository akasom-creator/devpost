import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Movie } from '../../types/movie.types';
import { getImageUrl } from '../../utils/api';
import ScareMeter from '../ui/ScareMeter';
import MoviePosterPlaceholder from '../ui/MoviePosterPlaceholder';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useBloodDrip } from '../../hooks/useBloodDrip';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { triggerDrip, drips } = useBloodDrip();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const inWatchlist = isInWatchlist(movie.id);
  const posterUrl = getImageUrl(movie.posterPath, 'POSTER_MEDIUM');

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Navigating to movie:', movie.id);
    navigate(`/movie/${movie.id}`);
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Trigger blood drip from top of card
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const randomX = rect.left + Math.random() * rect.width;
      triggerDrip(randomX, rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/movie/${movie.id}`);
        }
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{
        boxShadow: isHovered
          ? '0 0 20px rgba(220, 20, 60, 0.5)'
          : '0 4px 6px rgba(0, 0, 0, 0.1)',
        willChange: 'transform, box-shadow',
      }}
      role="article"
      aria-label={`${movie.title} - Rating ${movie.voteAverage.toFixed(1)} out of 10`}
      tabIndex={0}
    >
      {/* Blood drip container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {drips.map((drip) => (
          <div
            key={drip.id}
            className="absolute"
            style={{
              left: `${drip.x}px`,
              top: `${drip.y}px`,
            }}
          >
            {/* Blood droplet */}
            <motion.svg
              width="20"
              height="40"
              viewBox="0 0 20 40"
              initial={{ y: -20, scaleY: 1, opacity: 0 }}
              animate={{
                y: [0, 100, 200],
                scaleY: [1, 2, 0.5],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 1.2,
                ease: 'easeIn',
                times: [0, 0.5, 1],
              }}
              className="absolute"
            >
              <defs>
                <linearGradient id={`bloodGradient-${drip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#DC143C" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8B0000" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                d="M10 0 Q15 10 15 20 Q15 30 10 35 Q5 30 5 20 Q5 10 10 0 Z"
                fill={`url(#bloodGradient-${drip.id})`}
              />
            </motion.svg>

            {/* Splatter effect */}
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.4,
                delay: 1.2,
              }}
              className="absolute"
              style={{ top: '200px', left: '-10px' }}
            >
              <circle cx="20" cy="20" r="8" fill="#8B0000" opacity="0.8" />
              <circle cx="12" cy="18" r="4" fill="#8B0000" opacity="0.6" />
              <circle cx="28" cy="22" r="4" fill="#8B0000" opacity="0.6" />
              <circle cx="20" cy="12" r="3" fill="#8B0000" opacity="0.5" />
              <circle cx="20" cy="28" r="3" fill="#8B0000" opacity="0.5" />
            </motion.svg>
          </div>
        ))}
      </div>

      {/* Movie poster */}
      <div className="relative aspect-[2/3] bg-darkness-800 overflow-hidden rounded-lg">
        {isVisible && posterUrl ? (
          <>
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-darkness-800 via-darkness-700 to-darkness-800 animate-pulse">
                <div className="w-12 h-12 border-4 border-blood-500 border-t-transparent rounded-full animate-spin" style={{ willChange: 'transform' }} />
              </div>
            )}
            <img
              src={posterUrl}
              alt={`${movie.title} movie poster`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)}
              loading="lazy"
              decoding="async"
              style={{ willChange: 'opacity' }}
            />
          </>
        ) : (
          <MoviePosterPlaceholder title={movie.title} />
        )}

        {/* Watchlist button - Touch target minimum 44x44px */}
        <button
          onClick={handleWatchlistToggle}
          className="absolute top-2 right-2 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-darkness-900 bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900"
          aria-label={inWatchlist ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
          aria-pressed={inWatchlist}
        >
          {inWatchlist ? (
            <svg
              className="w-6 h-6 text-blood-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-blood-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Movie info */}
      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blood-500 transition-colors duration-300">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <ScareMeter rating={movie.voteAverage} icon="skull" />
          <span className="text-sm text-gray-400">
            {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
