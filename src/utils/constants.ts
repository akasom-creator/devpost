// TMDb API Configuration
export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// TMDb API Endpoints
export const API_ENDPOINTS = {
    DISCOVER_MOVIES: '/discover/movie',
    SEARCH_MOVIES: '/search/movie',
    MOVIE_DETAILS: '/movie',
    GENRES: '/genre/movie/list',
} as const;

// Horror Genre IDs from TMDb
export const GENRE_IDS = {
    HORROR: 27,
    THRILLER: 53,
    MYSTERY: 9648,
} as const;

// Horror Subgenres (using TMDb genre combinations)
export const HORROR_SUBGENRES = {
    SLASHER: [27, 53], // Horror + Thriller
    SUPERNATURAL: [27, 14], // Horror + Fantasy
    PSYCHOLOGICAL: [27, 9648], // Horror + Mystery
    ZOMBIE: [27, 878], // Horror + Science Fiction
} as const;

// Image Sizes
export const IMAGE_SIZES = {
    POSTER_SMALL: 'w342',
    POSTER_MEDIUM: 'w500',
    POSTER_LARGE: 'w780',
    BACKDROP_SMALL: 'w780',
    BACKDROP_LARGE: 'w1280',
    ORIGINAL: 'original',
} as const;

// Theme Colors
export const THEME_COLORS = {
    BLOOD: {
        50: '#fee2e2',
        100: '#fecaca',
        500: '#DC143C',
        700: '#8B0000',
        900: '#450000',
    },
    DARKNESS: {
        900: '#0a0a0a',
        800: '#1a1a1a',
        700: '#2a2a2a',
    },
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
    BLOOD_DRIP: 1200,
    PAGE_TRANSITION: 500,
    HOVER_EFFECT: 300,
    SPLATTER: 400,
} as const;

// Performance Limits
export const PERFORMANCE_LIMITS = {
    MAX_CONCURRENT_DRIPS: 10,
    MAX_WATCHLIST_SIZE: 50,
    DEBOUNCE_DELAY: 500,
    API_TIMEOUT: 10000,
} as const;

// API Configuration
export const API_CONFIG = {
    RATE_LIMIT_REQUESTS: 40,
    RATE_LIMIT_WINDOW: 10000, // 10 seconds
    STALE_TIME: 300000, // 5 minutes
    CACHE_TIME: 600000, // 10 minutes
    RETRY_ATTEMPTS: 3,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
    WATCHLIST: 'horror-movie-watchlist',
    PREFERENCES: 'horror-movie-preferences',
} as const;

// Route Paths
export const ROUTES = {
    HOME: '/',
    MOVIE_DETAIL: '/movie/:id',
    WATCHLIST: '/watchlist',
} as const;
