import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '../utils/api';
import type { MovieDetail } from '../types/movie.types';

interface UseMovieDetailsReturn {
    movie: MovieDetail | null;
    isLoading: boolean;
    error: Error | null;
}

/**
 * Custom hook for fetching detailed information about a specific movie
 * Includes trailer data if available
 * Uses React Query for caching
 * 
 * @param movieId - TMDb movie ID
 * @returns Object containing movie details, loading state, and error
 */
export function useMovieDetails(movieId: number): UseMovieDetailsReturn {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['movie', movieId],
        queryFn: async () => {
            return await getMovieDetails(movieId);
        },
        enabled: !!movieId && movieId > 0, // Only fetch if valid movieId
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 3, // Retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    return {
        movie: data ?? null,
        isLoading,
        error: error as Error | null,
    };
}
