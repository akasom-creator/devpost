import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Movie } from '../types/movie.types';

// Constants
const WATCHLIST_STORAGE_KEY = 'horror-movie-watchlist';
const MAX_WATCHLIST_SIZE = 50;

// Context type definition
interface WatchlistContextType {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (movieId: number) => void;
    isInWatchlist: (movieId: number) => boolean;
    clearWatchlist: () => void;
}

// Create context with undefined default value
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Provider props
interface WatchlistProviderProps {
    children: ReactNode;
}

// WatchlistProvider component
export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    // Load watchlist from localStorage on mount
    useEffect(() => {
        try {
            const storedWatchlist = localStorage.getItem(WATCHLIST_STORAGE_KEY);
            if (storedWatchlist) {
                const parsed = JSON.parse(storedWatchlist);
                if (Array.isArray(parsed)) {
                    setWatchlist(parsed);
                }
            }
        } catch (error) {
            console.error('Failed to load watchlist from localStorage:', error);
        }
    }, []);

    // Sync watchlist to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
        } catch (error) {
            console.error('Failed to save watchlist to localStorage:', error);
        }
    }, [watchlist]);

    // Add movie to watchlist
    const addToWatchlist = (movie: Movie) => {
        setWatchlist((prevWatchlist) => {
            // Prevent duplicates
            if (prevWatchlist.some((m) => m.id === movie.id)) {
                console.warn(`Movie "${movie.title}" is already in the watchlist`);
                return prevWatchlist;
            }

            // Enforce 50-movie limit
            if (prevWatchlist.length >= MAX_WATCHLIST_SIZE) {
                console.warn(`Watchlist is full (${MAX_WATCHLIST_SIZE} movies maximum)`);
                return prevWatchlist;
            }

            return [...prevWatchlist, movie];
        });
    };

    // Remove movie from watchlist
    const removeFromWatchlist = (movieId: number) => {
        setWatchlist((prevWatchlist) => 
            prevWatchlist.filter((movie) => movie.id !== movieId)
        );
    };

    // Check if movie is in watchlist
    const isInWatchlist = (movieId: number): boolean => {
        return watchlist.some((movie) => movie.id === movieId);
    };

    // Clear entire watchlist
    const clearWatchlist = () => {
        setWatchlist([]);
    };

    const value: WatchlistContextType = {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
    };

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    );
};

// Custom hook to use the watchlist context
export const useWatchlist = (): WatchlistContextType => {
    const context = useContext(WatchlistContext);
    
    if (context === undefined) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    
    return context;
};
