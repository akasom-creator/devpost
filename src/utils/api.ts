import axios, { type AxiosInstance, AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type {
    TMDbMovieResponse,
    TMDbMovieDetail,
    TMDbGenreResponse,
    Movie,
    MovieDetail,
    TMDbMovie,
} from '../types/movie.types';
import {
    TMDB_API_BASE_URL,
    TMDB_IMAGE_BASE_URL,
    API_ENDPOINTS,
    GENRE_IDS,
    API_CONFIG,
    IMAGE_SIZES,
    PERFORMANCE_LIMITS,
} from './constants';

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Request queue for rate limiting
interface QueuedRequest {
    config: InternalAxiosRequestConfig;
    resolve: (value: InternalAxiosRequestConfig) => void;
    reject: (reason?: any) => void;
}

class RequestQueue {
    private queue: QueuedRequest[] = [];
    private requestTimestamps: number[] = [];
    private processing = false;

    enqueue(
        config: InternalAxiosRequestConfig,
        resolve: (value: InternalAxiosRequestConfig) => void,
        reject: (reason?: any) => void
    ): void {
        this.queue.push({ config, resolve, reject });
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.processing || this.queue.length === 0) {
            return;
        }

        this.processing = true;

        while (this.queue.length > 0) {
            // Clean up old timestamps outside the rate limit window
            const now = Date.now();
            this.requestTimestamps = this.requestTimestamps.filter(
                (timestamp) => now - timestamp < API_CONFIG.RATE_LIMIT_WINDOW
            );

            // Check if we can make a request
            if (this.requestTimestamps.length < API_CONFIG.RATE_LIMIT_REQUESTS) {
                const { config, resolve } = this.queue.shift()!;
                this.requestTimestamps.push(Date.now());
                resolve(config);
            } else {
                // Wait until the oldest request expires
                const oldestTimestamp = this.requestTimestamps[0];
                const waitTime = API_CONFIG.RATE_LIMIT_WINDOW - (now - oldestTimestamp);
                await new Promise((resolve) => setTimeout(resolve, waitTime));
            }
        }

        this.processing = false;
    }
}

const requestQueue = new RequestQueue();

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: TMDB_API_BASE_URL,
    timeout: PERFORMANCE_LIMITS.API_TIMEOUT,
    params: {
        api_key: API_KEY,
    },
});

// Request interceptor for rate limiting
axiosInstance.interceptors.request.use(
    (config) => {
        return new Promise<InternalAxiosRequestConfig>((resolve, reject) => {
            requestQueue.enqueue(config, resolve, reject);
        });
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling and transformation
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        return Promise.reject(handleApiError(error));
    }
);

// Error handling function
function handleApiError(error: AxiosError): Error {
    if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        switch (status) {
            case 401:
                return new Error('Invalid API key. Please check your configuration.');
            case 404:
                return new Error('Movie not found in the crypt...');
            case 429:
                return new Error('Too many requests. The crypt is overwhelmed...');
            case 500:
            case 503:
                return new Error('The crypt is locked. Try again later.');
            default:
                return new Error(`API error: ${error.message}`);
        }
    } else if (error.request) {
        // Request made but no response received
        return new Error('Connection lost in the fog...');
    } else {
        // Error setting up the request
        return new Error(`Request error: ${error.message}`);
    }
}

// Transform TMDb movie data to our Movie type
function transformMovie(tmdbMovie: any): Movie {
    return {
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        posterPath: tmdbMovie.poster_path,
        backdropPath: tmdbMovie.backdrop_path,
        overview: tmdbMovie.overview,
        releaseDate: tmdbMovie.release_date,
        voteAverage: tmdbMovie.vote_average,
        genreIds: tmdbMovie.genre_ids || [],
    };
}

// Transform TMDb movie detail data to our MovieDetail type
function transformMovieDetail(tmdbMovieDetail: TMDbMovieDetail): MovieDetail {
    // Extract YouTube trailer key
    let trailerKey: string | null = null;
    if (tmdbMovieDetail.videos?.results) {
        const youtubeTrailer = tmdbMovieDetail.videos.results.find(
            (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        trailerKey = youtubeTrailer?.key || null;
    }

    return {
        id: tmdbMovieDetail.id,
        title: tmdbMovieDetail.title,
        posterPath: tmdbMovieDetail.poster_path,
        backdropPath: tmdbMovieDetail.backdrop_path,
        overview: tmdbMovieDetail.overview,
        releaseDate: tmdbMovieDetail.release_date,
        voteAverage: tmdbMovieDetail.vote_average,
        genreIds: tmdbMovieDetail.genres.map((g) => g.id),
        runtime: tmdbMovieDetail.runtime,
        genres: tmdbMovieDetail.genres,
        trailerKey,
        tagline: tmdbMovieDetail.tagline,
        budget: tmdbMovieDetail.budget,
        revenue: tmdbMovieDetail.revenue,
    };
}

// API Functions

/**
 * Discover horror movies with optional filters
 * @param page - Page number for pagination
 * @param genreIds - Optional array of genre IDs to filter by
 * @param yearRange - Optional year range filter
 * @param ratingRange - Optional rating range filter
 * @param runtimeFilter - Optional runtime filter ('short', 'medium', 'long', 'all')
 * @returns Promise with movie response data
 */
export async function discoverHorrorMovies(
    page: number = 1,
    genreIds?: number[],
    yearRange?: { min: number; max: number },
    ratingRange?: { min: number; max: number },
    runtimeFilter?: string,
    sortBy?: string
): Promise<{ page: number; results: Movie[]; total_pages: number; total_results: number }> {
    const genres = genreIds && genreIds.length > 0
        ? genreIds.join(',')
        : GENRE_IDS.HORROR.toString();

    const params: any = {
        with_genres: genres,
        page,
        sort_by: sortBy || 'popularity.desc',
    };

    // Add year range filters
    if (yearRange) {
        params['primary_release_date.gte'] = `${yearRange.min}-01-01`;
        params['primary_release_date.lte'] = `${yearRange.max}-12-31`;
    }

    // Add rating range filters
    if (ratingRange) {
        params['vote_average.gte'] = ratingRange.min;
        params['vote_average.lte'] = ratingRange.max;
    }

    // Add runtime filters
    if (runtimeFilter && runtimeFilter !== 'all') {
        switch (runtimeFilter) {
            case 'short':
                params['with_runtime.lte'] = 90;
                break;
            case 'medium':
                params['with_runtime.gte'] = 90;
                params['with_runtime.lte'] = 150;
                break;
            case 'long':
                params['with_runtime.gte'] = 150;
                break;
        }
    }

    const response = await axiosInstance.get<TMDbMovieResponse>(
        API_ENDPOINTS.DISCOVER_MOVIES,
        { params }
    );

    // Transform the results
    return {
        page: response.data.page,
        results: response.data.results.map(transformMovie),
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
    };
}

/**
 * Search for movies by title
 * @param query - Search query string
 * @param page - Page number for pagination
 * @returns Promise with movie response data
 */
export async function searchMovies(
    query: string,
    page: number = 1
): Promise<{ page: number; results: Movie[]; total_pages: number; total_results: number }> {
    const response = await axiosInstance.get<TMDbMovieResponse>(
        API_ENDPOINTS.SEARCH_MOVIES,
        {
            params: {
                query,
                page,
                include_adult: false,
            },
        }
    );

    // Transform the results and filter for horror movies
    const filteredResults = response.data.results
        .filter((movie: TMDbMovie) => movie.genre_ids?.includes(GENRE_IDS.HORROR))
        .map(transformMovie);

    return {
        page: response.data.page,
        results: filteredResults,
        total_pages: response.data.total_pages,
        total_results: filteredResults.length,
    };
}

/**
 * Get detailed information about a specific movie
 * @param movieId - TMDb movie ID
 * @returns Promise with detailed movie data
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
    const response = await axiosInstance.get<TMDbMovieDetail>(
        `${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}`,
        {
            params: {
                append_to_response: 'videos',
            },
        }
    );

    return transformMovieDetail(response.data);
}

/**
 * Get list of all movie genres
 * @returns Promise with genre list
 */
export async function getGenres(): Promise<TMDbGenreResponse> {
    const response = await axiosInstance.get<TMDbGenreResponse>(
        API_ENDPOINTS.GENRES
    );

    return response.data;
}

/**
 * Get recommended movies for a specific movie
 * @param movieId - TMDb movie ID
 * @param page - Page number for pagination
 * @returns Promise with recommended movies
 */
export async function getMovieRecommendations(
    movieId: number,
    page: number = 1
): Promise<{ page: number; results: Movie[]; total_pages: number; total_results: number }> {
    const response = await axiosInstance.get<TMDbMovieResponse>(
        `${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}/recommendations`,
        { params: { page } }
    );

    return {
        page: response.data.page,
        results: response.data.results.map(transformMovie),
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
    };
}

/**
 * Get similar movies for a specific movie
 * @param movieId - TMDb movie ID
 * @param page - Page number for pagination
 * @returns Promise with similar movies
 */
export async function getSimilarMovies(
    movieId: number,
    page: number = 1
): Promise<{ page: number; results: Movie[]; total_pages: number; total_results: number }> {
    const response = await axiosInstance.get<TMDbMovieResponse>(
        `${API_ENDPOINTS.MOVIE_DETAILS}/${movieId}/similar`,
        { params: { page } }
    );

    return {
        page: response.data.page,
        results: response.data.results.map(transformMovie),
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
    };
}

/**
 * Helper function to construct image URLs
 * @param path - Image path from TMDb API
 * @param size - Image size (default: w500 for posters)
 * @returns Full image URL or null if path is null
 */
export function getImageUrl(
    path: string | null,
    size: keyof typeof IMAGE_SIZES = 'POSTER_MEDIUM'
): string | null {
    if (!path) {
        return null;
    }

    const imageSize = IMAGE_SIZES[size];
    return `${TMDB_IMAGE_BASE_URL}/${imageSize}${path}`;
}

// Export the axios instance for advanced use cases
export { axiosInstance };
