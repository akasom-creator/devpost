import React from 'react';
import { motion } from 'framer-motion';
// @ts-ignore - react-player types issue
import ReactPlayer from 'react-player';
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
            <div className="absolute inset-0 bg-gradient-to-t from-darkness-900 via-darkness-900/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-darkness-900 via-transparent to-darkness-900" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-darkness-800 to-darkness-900" />
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
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-darkness-800 border border-blood-700 rounded-lg text-gray-300 hover:bg-blood-900 hover:border-blood-500 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="text-xl" aria-hidden="true">{getGenreIcon(genre.name)}</span>
                    {genre.name}
                  </span>
                ))}
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
              {movie.trailerKey ? (
                <div className="relative aspect-video bg-darkness-800 rounded-lg overflow-hidden shadow-lg shadow-blood-900/20">
                  <ReactPlayer
                    src={`https://www.youtube.com/watch?v=${movie.trailerKey}`}
                    width="100%"
                    height="100%"
                    controls
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
                      No trailer available
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      The spirits haven't revealed this yet...
                    </p>
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
              <div className="relative aspect-[2/3] max-w-md mx-auto lg:max-w-none rounded-lg overflow-hidden shadow-2xl shadow-blood-900/30">
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
                className={`w-full py-4 px-6 min-h-[44px] rounded-lg font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900 ${
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
