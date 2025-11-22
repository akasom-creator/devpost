import { useInfiniteQuery } from '@tanstack/react-query';
import { discoverHorrorMovies, searchMovies } from '../utils/api';
import type { Movie } from '../types/movie.types';

interface UseMoviesOptions {
    genreIds?: number[];
    searchQuery?: string;
    yearRange?: { min: number; max: number };
    ratingRange?: { min: number; max: number };
    runtimeFilter?: string;
    sortBy?: string;
}

interface UseMoviesReturn {
    movies: Movie[];
    isLoading: boolean;
    error: Error | null;
    fetchMore: () => void;
    hasMore: boolean;
    isFetchingMore: boolean;
}

/**
 * Custom hook for fetching and managing horror movies with pagination
 * Uses React Query for caching and background refetching
 * 
 * @param options - Configuration options for filtering and searching
 * @returns Object containing movies array, loading states, and pagination functions
 */
export function useMovies(options: UseMoviesOptions = {}): UseMoviesReturn {
    const { genreIds, searchQuery, yearRange, ratingRange, runtimeFilter, sortBy } = options;

    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies', { genreIds, searchQuery, yearRange, ratingRange, runtimeFilter, sortBy }],
        queryFn: async ({ pageParam = 1 }) => {
            // Use search if query is provided, otherwise discover
            if (searchQuery && searchQuery.trim().length >= 3) {
                return await searchMovies(searchQuery, pageParam);
            }
            return await discoverHorrorMovies(pageParam, genreIds, yearRange, ratingRange, runtimeFilter, sortBy);
        },
        getNextPageParam: (lastPage) => {
            // Return next page number if there are more pages
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
        retry: 3, // Retry failed requests 3 times
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    // Flatten all pages into a single array of movies
    const movies = data?.pages.flatMap((page) => page.results) ?? [];

    return {
        movies,
        isLoading,
        error: error as Error | null,
        fetchMore: () => {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        hasMore: hasNextPage ?? false,
        isFetchingMore: isFetchingNextPage,
    };
}
