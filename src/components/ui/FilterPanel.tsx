import { useState } from 'react';
import type { Genre } from '../../types/movie.types';

interface FilterPanelProps {
  selectedGenres: number[];
  onGenreToggle: (genreId: number) => void;
  availableGenres: Genre[];
  yearRange?: { min: number; max: number };
  onYearRangeChange?: (range: { min: number; max: number }) => void;
  ratingRange?: { min: number; max: number };
  onRatingRangeChange?: (range: { min: number; max: number }) => void;
  runtimeFilter?: string;
  onRuntimeFilterChange?: (filter: string) => void;
  sortBy?: string;
  onSortByChange?: (sort: string) => void;
}

// Horror subgenre definitions with custom icons
const HORROR_SUBGENRES = [
  {
    id: 'slasher',
    name: 'Slasher',
    genreIds: [27, 53], // Horror + Thriller
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 2L2 12l5 3 3 5 10-20z M8 15l-3-2 12-6-6 12-2-3z" />
        <path d="M12 8l-2 4 4-2-2-2z" />
      </svg>
    ),
  },
  {
    id: 'supernatural',
    name: 'Supernatural',
    genreIds: [27, 14], // Horror + Fantasy
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'psychological',
    name: 'Psychological',
    genreIds: [27, 9648], // Horror + Mystery
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        <circle cx="9" cy="8" r="1.5" />
        <circle cx="15" cy="8" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'zombie',
    name: 'Zombie',
    genreIds: [27, 878], // Horror + Science Fiction
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
        <path d="M8 10h2v2H8zM14 10h2v2h-2z" fill="#0a0a0a" />
        <path d="M8 14h8v2H8z" fill="#0a0a0a" />
      </svg>
    ),
  },
];

export default function FilterPanel({
  selectedGenres,
  onGenreToggle,
  yearRange = { min: 1970, max: new Date().getFullYear() },
  onYearRangeChange,
  ratingRange = { min: 0, max: 10 },
  onRatingRangeChange,
  runtimeFilter = 'all',
  onRuntimeFilterChange,
  sortBy = 'popularity.desc',
  onSortByChange,
}: FilterPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if a subgenre is active (all its genre IDs are selected)
  const isSubgenreActive = (genreIds: number[]) => {
    return genreIds.every((id) => selectedGenres.includes(id));
  };

  // Toggle a subgenre (add/remove all its genre IDs)
  const handleSubgenreToggle = (genreIds: number[]) => {
    const isActive = isSubgenreActive(genreIds);
    
    if (isActive) {
      // Remove all genre IDs
      genreIds.forEach((id) => {
        if (selectedGenres.includes(id)) {
          onGenreToggle(id);
        }
      });
    } else {
      // Add all genre IDs
      genreIds.forEach((id) => {
        if (!selectedGenres.includes(id)) {
          onGenreToggle(id);
        }
      });
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Touch target minimum 44x44px */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-darkness-800 border-2 border-blood-700 rounded-lg p-3 min-w-11 min-h-11 flex items-center justify-center hover:bg-blood-900 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,20,60,0.5)] focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-900"
        aria-label={isCollapsed ? "Open filter panel" : "Close filter panel"}
        aria-expanded={!isCollapsed}
        aria-controls="filter-panel"
      >
        <svg
          className={`w-6 h-6 text-blood-500 transition-transform duration-300 ${
            isCollapsed ? '' : 'rotate-90'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Filter Panel */}
      <aside
        id="filter-panel"
        className={`
          fixed lg:sticky top-20 left-0 z-40
          w-64 h-[calc(100vh-5rem)]
          bg-darkness-800 border-r-2 border-blood-700
          p-6 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
        `}
        role="complementary"
        aria-label="Movie filters"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b-2 border-blood-700 pb-4">
            <h2 className="text-2xl font-creepy text-blood-500 animate-flicker">
              Filter by Fear
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Select your nightmare
            </p>
          </div>

          {/* Subgenre Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blood-500 uppercase tracking-wider">
              Subgenres
            </h3>
            
            {HORROR_SUBGENRES.map((subgenre) => {
              const isActive = isSubgenreActive(subgenre.genreIds);
              
              return (
                <button
                  key={subgenre.id}
                  onClick={() => handleSubgenreToggle(subgenre.genreIds)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg
                    border-2 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-800
                    ${
                      isActive
                        ? 'bg-blood-900 border-blood-500 shadow-[0_0_20px_rgba(220,20,60,0.5)] animate-pulse-glow'
                        : 'bg-darkness-700 border-darkness-700 hover:border-blood-700 hover:shadow-[0_0_10px_rgba(220,20,60,0.3)]'
                    }
                  `}
                  aria-pressed={isActive}
                  aria-label={`${isActive ? 'Remove' : 'Add'} ${subgenre.name} filter`}
                >
                  <div
                    className={`
                      shrink-0 transition-colors duration-300
                      ${isActive ? 'text-blood-500' : 'text-gray-400'}
                    `}
                  >
                    {subgenre.icon}
                  </div>
                  <span
                    className={`
                      text-left font-medium transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-gray-300'}
                    `}
                  >
                    {subgenre.name}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="ml-auto shrink-0" aria-hidden="true">
                      <svg
                        className="w-5 h-5 text-blood-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sorting Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-blood-500 uppercase tracking-wider">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange?.(e.target.value)}
              className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
            >
              <option value="popularity.desc">Most Popular</option>
              <option value="popularity.asc">Least Popular</option>
              <option value="vote_average.desc">Highest Rated</option>
              <option value="vote_average.asc">Lowest Rated</option>
              <option value="release_date.desc">Newest First</option>
              <option value="release_date.asc">Oldest First</option>
              <option value="title.asc">Title A-Z</option>
              <option value="title.desc">Title Z-A</option>
            </select>
          </div>

          {/* Advanced Filters */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-blood-500 uppercase tracking-wider">
              Advanced Filters
            </h3>

            {/* Year Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Release Year
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">From</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={yearRange.min}
                    onChange={(e) => onYearRangeChange?.({
                      ...yearRange,
                      min: parseInt(e.target.value) || 1970
                    })}
                    className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">To</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={yearRange.max}
                    onChange={(e) => onYearRangeChange?.({
                      ...yearRange,
                      max: parseInt(e.target.value) || new Date().getFullYear()
                    })}
                    className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Rating Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Rating (0-10)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Min</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={ratingRange.min}
                    onChange={(e) => onRatingRangeChange?.({
                      ...ratingRange,
                      min: parseFloat(e.target.value) || 0
                    })}
                    className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Max</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={ratingRange.max}
                    onChange={(e) => onRatingRangeChange?.({
                      ...ratingRange,
                      max: parseFloat(e.target.value) || 10
                    })}
                    className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Runtime Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">
                Runtime
              </label>
              <select
                value={runtimeFilter}
                onChange={(e) => onRuntimeFilterChange?.(e.target.value)}
                className="w-full px-3 py-2 bg-darkness-700 border-2 border-darkness-600 rounded-lg text-white focus:border-blood-500 focus:outline-none transition-colors"
              >
                <option value="all">All Runtimes</option>
                <option value="short">Short (under 90 min)</option>
                <option value="medium">Medium (90-150 min)</option>
                <option value="long">Long (over 150 min)</option>
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {selectedGenres.length > 0 && (
            <button
              onClick={() => {
                // Clear all selected genres
                selectedGenres.forEach((id) => onGenreToggle(id));
              }}
              className="w-full mt-6 py-2 px-4 bg-darkness-700 border-2 border-blood-700 rounded-lg text-blood-500 font-medium hover:bg-blood-900 hover:shadow-[0_0_20px_rgba(220,20,60,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blood-500 focus:ring-offset-2 focus:ring-offset-darkness-800"
              aria-label="Clear all filters"
            >
              Clear All Filters
            </button>
          )}

          {/* Active Filter Count */}
          {selectedGenres.length > 0 && (
            <div className="text-center text-sm text-gray-400" role="status" aria-live="polite">
              <span className="text-blood-500 font-bold">{selectedGenres.length}</span>{' '}
              {selectedGenres.length === 1 ? 'filter' : 'filters'} active
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for mobile when panel is open */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-30"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
