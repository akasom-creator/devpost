import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../utils/api';
import type { Genre } from '../types/movie.types';

interface UseGenresReturn {
    genres: Genre[];
    isLoading: boolean;
    error: Error | null;
}

/**
 * Custom hook for fetching movie genres from TMDb API
 * Uses React Query for caching and background refetching
 *
 * @returns Object containing genres array, loading state, and error
 */
export function useGenres(): UseGenresReturn {
    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['genres'],
        queryFn: async () => {
            const response = await getGenres();
            return response.genres;
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 hours - genres don't change often
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days cache
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    return {
        genres: data ?? [],
        isLoading,
        error: error as Error | null,
    };
}