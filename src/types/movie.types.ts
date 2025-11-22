// Core Movie type from TMDb API
export interface Movie {
    id: number;
    title: string;
    posterPath: string | null;
    backdropPath: string | null;
    overview: string;
    releaseDate: string;
    voteAverage: number;
    genreIds: number[];
}

// Detailed Movie type with additional information
export interface MovieDetail extends Movie {
    runtime: number;
    genres: Genre[];
    trailerKey: string | null;
    tagline: string;
    budget: number;
    revenue: number;
}

// Genre type
export interface Genre {
    id: number;
    name: string;
}

// TMDb API Response types
export interface TMDbMovie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export interface TMDbMovieDetail {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
    runtime: number;
    tagline: string;
    budget: number;
    revenue: number;
    videos?: {
        results: TMDbVideo[];
    };
}

export interface TMDbVideo {
    id: string;
    key: string;
    site: string;
    type: string;
    name: string;
}

export interface TMDbMovieResponse {
    page: number;
    results: TMDbMovie[];
    total_pages: number;
    total_results: number;
}

export interface TMDbGenreResponse {
    genres: Genre[];
}

// Helper type for blood drip animation
export interface BloodDripInstance {
    id: string;
    x: number;
    y: number;
    timestamp: number;
}
