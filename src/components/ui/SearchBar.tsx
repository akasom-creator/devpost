import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search for horror movies...',
  isLoading = false,
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Track if this is the initial render to prevent automatic search on empty query
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Debounced search effect
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current !== null) {
      window.clearTimeout(debounceTimerRef.current);
    }

    // Search if:
    // 1. Query is not empty, OR
    // 2. Query is empty AND user has interacted (to reset search)
    // Don't search on initial empty query to prevent automatic navigation
    if (query.trim() || (query.length === 0 && hasUserInteracted)) {
      debounceTimerRef.current = window.setTimeout(() => {
        onSearch(query);
      }, 500);
    }

    // Cleanup
    return () => {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, onSearch, hasUserInteracted]);

  const handleClear = () => {
    setQuery('');
    setHasUserInteracted(true);
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    // Trigger search if query is not empty
    if (query.trim()) {
      if (debounceTimerRef.current !== null) {
        window.clearTimeout(debounceTimerRef.current);
      }
      setHasUserInteracted(true);
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trigger immediate search if query is not empty
      if (query.trim()) {
        if (debounceTimerRef.current !== null) {
          window.clearTimeout(debounceTimerRef.current);
        }
        setHasUserInteracted(true);
        onSearch(query);
      }
    } else if (e.key === 'Escape') {
      // Clear search on Escape
      handleClear();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
          <svg
            className="w-5 h-5 text-blood-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHasUserInteracted(true);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-12 py-3 min-h-[44px]
            bg-darkness-800 text-white
            border-2 rounded-lg
            transition-all duration-300
            placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900
            ${
              isFocused
                ? 'border-blood-500 shadow-[0_0_20px_rgba(220,20,60,0.5)]'
                : 'border-darkness-700 hover:border-blood-700'
            }
          `}
          aria-label="Search horror movies"
          aria-describedby={undefined}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2" role="status" aria-label="Searching">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5"
            >
              <svg
                className="w-5 h-5 text-blood-500"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.div>
            <span className="sr-only">Searching...</span>
          </div>
        )}

        {/* Search Button - Touch target minimum 44x44px */}
        {query && !isLoading && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleSearchClick}
            disabled={!query.trim()}
            className={`
              absolute right-12 top-1/2 -translate-y-1/2
              p-2 min-w-[36px] min-h-[36px] rounded-full
              flex items-center justify-center
              transition-colors duration-300
              group
              focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900
              ${query.trim()
                ? 'bg-blood-700 hover:bg-blood-600'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
              }
            `}
            aria-label="Search"
            type="button"
          >
            {/* Search Icon */}
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>
        )}

        {/* Clear Button - Touch target minimum 44x44px */}
        {query && !isLoading && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              p-2 min-w-[36px] min-h-[36px] rounded-full
              flex items-center justify-center
              bg-darkness-600 hover:bg-blood-700
              transition-colors duration-300
              group
              focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900
            "
            aria-label="Clear search"
            type="button"
          >
            {/* Blood Splatter Icon (X) */}
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </div>

    </div>
  );
};
