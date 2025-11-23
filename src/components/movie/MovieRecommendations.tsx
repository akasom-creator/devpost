import React from 'react';
import { motion } from 'framer-motion';
import { useMovieRecommendations, useSimilarMovies } from '../../hooks';
import MovieCard from './MovieCard';

interface MovieRecommendationsProps {
    movieId: number;
    movieTitle: string;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ movieId, movieTitle }) => {
    const { recommendations, isLoading: recommendationsLoading } = useMovieRecommendations(movieId);
    const { similarMovies, isLoading: similarLoading } = useSimilarMovies(movieId);

    const isLoading = recommendationsLoading || similarLoading;

    // Combine and deduplicate recommendations and similar movies
    const allSuggestions = React.useMemo(() => {
        const combined = [...recommendations, ...similarMovies];
        const seen = new Set<number>();
        return combined.filter(movie => {
            if (seen.has(movie.id)) return false;
            seen.add(movie.id);
            return true;
        }).slice(0, 8); // Limit to 8 total suggestions
    }, [recommendations, similarMovies]);

    if (isLoading) {
        return (
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
            >
                <h3 className="text-xl font-bold text-blood-500 font-creepy">
                    You Might Also Like
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="aspect-2/3 bg-darkness-800 rounded-lg mb-2"></div>
                            <div className="h-4 bg-darkness-700 rounded mb-1"></div>
                            <div className="h-3 bg-darkness-700 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    }

    if (allSuggestions.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
        >
            <h3 className="text-xl font-bold text-blood-500 font-creepy">
                Because You Watched "{movieTitle}"
            </h3>
            <p className="text-gray-400 text-sm">
                Discover more horror films that match your taste
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {allSuggestions.map((movie, index) => (
                    <motion.div
                        key={movie.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                    >
                        <MovieCard movie={movie} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default MovieRecommendations;