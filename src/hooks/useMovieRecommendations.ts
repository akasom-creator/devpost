import { useQuery } from '@tanstack/react-query';
import { getMovieRecommendations, getSimilarMovies } from '../utils/api';
import type { Movie } from '../types/movie.types';

interface UseMovieRecommendationsReturn {
    recommendations: Movie[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * Custom hook for fetching movie recommendations from TMDb API
 * Uses React Query for caching and background refetching
 *
 * @param movieId - TMDb movie ID
 * @returns Object containing recommendations array, loading state, and error
 */
export function useMovieRecommendations(movieId: number): UseMovieRecommendationsReturn {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['movie-recommendations', movieId],
        queryFn: async () => {
            const response = await getMovieRecommendations(movieId, 1);
            return response.results.slice(0, 6); // Limit to 6 recommendations
        },
        enabled: !!movieId,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes cache
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });

    return {
        recommendations: data ?? [],
        isLoading,
        error: error as Error | null,
    };
}

/**
 * Custom hook for fetching similar movies from TMDb API
 * Uses React Query for caching and background refetching
 *
 * @param movieId - TMDb movie ID
 * @returns Object containing similar movies array, loading state, and error
 */
export function useSimilarMovies(movieId: number) {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['similar-movies', movieId],
        queryFn: async () => {
            const response = await getSimilarMovies(movieId, 1);
            return response.results.slice(0, 6); // Limit to 6 similar movies
        },
        enabled: !!movieId,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes cache
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    });

    return {
        similarMovies: data ?? [],
        isLoading,
        error: error as Error | null,
    };
}