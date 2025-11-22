import { useState } from 'react';
import FilterPanel from './FilterPanel';
import type { Genre } from '../../types/movie.types';

// Sample genres for demo
const SAMPLE_GENRES: Genre[] = [
  { id: 27, name: 'Horror' },
  { id: 53, name: 'Thriller' },
  { id: 14, name: 'Fantasy' },
  { id: 9648, name: 'Mystery' },
  { id: 878, name: 'Science Fiction' },
];

export default function FilterPanelDemo() {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="min-h-screen bg-darkness-900 text-white">
      <div className="flex">
        <FilterPanel
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          availableGenres={SAMPLE_GENRES}
        />
        
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-creepy text-blood-500 mb-6">
            FilterPanel Demo
          </h1>
          
          <div className="bg-darkness-800 border-2 border-blood-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Selected Genres:</h2>
            {selectedGenres.length === 0 ? (
              <p className="text-gray-400">No genres selected</p>
            ) : (
              <ul className="space-y-2">
                {selectedGenres.map((id) => {
                  const genre = SAMPLE_GENRES.find((g) => g.id === id);
                  return (
                    <li key={id} className="text-blood-500">
                      • {genre?.name} (ID: {id})
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="mt-8 bg-darkness-800 border-2 border-blood-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Features:</h2>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Horror subgenre checkboxes (Slasher, Supernatural, Psychological, Zombie)</li>
              <li>✓ Custom horror-themed icons for each subgenre</li>
              <li>✓ Active filters with blood-red background and glow effect</li>
              <li>✓ Collapsible panel for mobile (toggle button in top-left)</li>
              <li>✓ Sidebar layout for desktop</li>
              <li>✓ Clear all filters button</li>
              <li>✓ Active filter count display</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
