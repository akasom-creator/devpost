import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { MovieDetail } from '../../types/movie.types';
import { getImageUrl } from '../../utils/api';
import ScareMeter from '../ui/ScareMeter';
import MoviePosterPlaceholder from '../ui/MoviePosterPlaceholder';
import MovieRecommendations from './MovieRecommendations';
import { useWatchlist } from '../../hooks/useWatchlist';

interface MovieDetailsProps {
  movie: MovieDetail;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);
  const [trailerError, setTrailerError] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(true);

  const backdropUrl = getImageUrl(movie.backdropPath, 'BACKDROP_LARGE');
  const posterUrl = getImageUrl(movie.posterPath, 'POSTER_LARGE');
  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      // Convert MovieDetail to Movie for watchlist
      const movieForWatchlist = {
        id: movie.id,
        title: movie.title,
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        overview: movie.overview,
        releaseDate: movie.releaseDate,
        voteAverage: movie.voteAverage,
        genreIds: movie.genreIds,
      };
      addToWatchlist(movieForWatchlist);
    }
  };

  // Genre icons mapping
  const getGenreIcon = (genreName: string): string => {
    const lowerName = genreName.toLowerCase();
    if (lowerName.includes('horror')) return '💀';
    if (lowerName.includes('thriller')) return '🔪';
    if (lowerName.includes('mystery')) return '🕵️';
    if (lowerName.includes('fantasy')) return '👻';
    if (lowerName.includes('science')) return '🧟';
    return '🎬';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-darkness-900 text-white"
    >
      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Backdrop Image */}
        {backdropUrl ? (
          <div className="absolute inset-0">
            <img
              src={backdropUrl}
              alt={`${movie.title} backdrop`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              style={{ willChange: 'opacity' }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-darkness-900 via-darkness-900/80 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-darkness-900 via-transparent to-darkness-900" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-linear-to-b from-darkness-800 to-darkness-900" />
        )}

        {/* Title and Basic Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-creepy text-blood-500 mb-2 drop-shadow-lg"
              style={{ willChange: 'transform, opacity' }}
            >
              {movie.title}
            </motion.h1>
            
            {movie.tagline && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 italic mb-3 md:mb-4"
              >
                "{movie.tagline}"
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base"
            >
              <span className="text-gray-400">{releaseYear}</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">{runtime}</span>
              <span className="text-gray-600">•</span>
              <ScareMeter rating={movie.voteAverage} icon="skull" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Movie Info */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Overview */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-blood-500 mb-3 font-creepy">
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview || 'No overview available...'}
              </p>
            </motion.div>

            {/* Genres */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-blood-500 mb-3 font-creepy">
                Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-darkness-800 border border-blood-700 rounded-lg text-gray-300 hover:bg-blood-900 hover:border-blood-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="text-xl" aria-hidden="true">{getGenreIcon(genre.name)}</span>
                    {genre.name}
                  </span>
                )) || <span className="text-gray-400">No genres available</span>}
              </div>
            </motion.div>

            {/* Trailer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-bold text-blood-500 mb-3 font-creepy">
                Trailer
              </h3>
              {movie.trailerKey && !trailerError ? (
                <div className="relative aspect-video bg-darkness-800 rounded-lg overflow-hidden shadow-lg shadow-blood-900/20">
                  {trailerLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-darkness-800 z-10">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-blood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-blood-500 text-lg">Loading trailer...</p>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.trailerKey}?rel=0&modestbranding=1`}
                    title={`${movie.title} trailer`}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={() => {
                      console.log('YouTube iframe loaded successfully');
                      setTrailerLoading(false);
                    }}
                    onError={() => {
                      console.error('YouTube iframe failed to load for video:', movie.trailerKey);
                      setTrailerError(true);
                      setTrailerLoading(false);
                    }}
                  />
                </div>
              ) : (
                <div className="relative aspect-video bg-darkness-800 rounded-lg overflow-hidden shadow-lg shadow-blood-900/20 flex items-center justify-center border-2 border-blood-900/30">
                  <div className="text-center p-8">
                    <svg
                      className="w-16 h-16 text-blood-500 opacity-50 mx-auto mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <p className="text-gray-400 text-lg">
                      {trailerError ? 'Trailer unavailable' : 'No trailer available'}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      {trailerError
                        ? 'This trailer cannot be displayed safely'
                        : 'The spirits haven\'t revealed this yet...'
                      }
                    </p>
                    {movie.trailerKey && (
                      <a
                        href={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blood-700 hover:bg-blood-600 text-white rounded-lg font-medium transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Recommendations */}
            <MovieRecommendations movieId={movie.id} movieTitle={movie.title} />
          </div>

          {/* Right Column - Poster and Actions */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="lg:sticky lg:top-8 space-y-6"
            >
              {/* Poster */}
              <div className="relative aspect-2/3 max-w-md mx-auto lg:max-w-none rounded-lg overflow-hidden shadow-2xl shadow-blood-900/30">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`${movie.title} movie poster`}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      // Hide broken image and show placeholder
                      e.currentTarget.style.display = 'none';
                      const placeholder = e.currentTarget.nextElementSibling;
                      if (placeholder) {
                        (placeholder as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                ) : null}
                <div style={{ display: posterUrl ? 'none' : 'flex' }} className="w-full h-full">
                  <MoviePosterPlaceholder title={movie.title} />
                </div>
              </div>

              {/* Watchlist Button - Touch target minimum 44x44px */}
              <button
                onClick={handleWatchlistToggle}
                className={`w-full py-4 px-6 min-h-11 rounded-lg font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 ${
                  inWatchlist
                    ? 'bg-blood-700 hover:bg-blood-600 text-white'
                    : 'bg-darkness-800 hover:bg-blood-900 text-blood-500 border-2 border-blood-700 hover:border-blood-500'
                }`}
                style={{
                  boxShadow: inWatchlist
                    ? '0 0 20px rgba(220, 20, 60, 0.5)'
                    : '0 0 10px rgba(220, 20, 60, 0.2)',
                }}
                aria-label={inWatchlist ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
                aria-pressed={inWatchlist}
              >
                {inWatchlist ? (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    In Watchlist
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add to Watchlist
                  </>
                )}
              </button>

              {/* Additional Info */}
              <div className="bg-darkness-800 rounded-lg p-6 space-y-3 border border-blood-900/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-blood-500 font-bold">
                    {movie.voteAverage.toFixed(1)}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Release Year</span>
                  <span className="text-white font-semibold">{releaseYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Runtime</span>
                  <span className="text-white font-semibold">{runtime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;

