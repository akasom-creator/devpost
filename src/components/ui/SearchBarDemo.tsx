import { useState } from 'react';
import { SearchBar } from './SearchBar';

export const SearchBarDemo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    setSearchQuery(query);
    
    // Simulate API loading
    if (query.length >= 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkness-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-creepy text-blood-500 mb-8 text-center">
          SearchBar Component Demo
        </h1>

        <div className="mb-8 flex justify-center">
          <SearchBar 
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {searchQuery && (
          <div className="bg-darkness-800 p-6 rounded-lg border-2 border-blood-700">
            <h2 className="text-xl font-bold text-blood-500 mb-2">
              Current Search Query:
            </h2>
            <p className="text-white text-lg">
              {searchQuery || '(empty)'}
            </p>
          </div>
        )}

        <div className="mt-8 bg-darkness-800 p-6 rounded-lg border-2 border-darkness-700">
          <h2 className="text-xl font-bold text-blood-500 mb-4">Features:</h2>
          <ul className="text-white space-y-2">
            <li>✓ Debounced input (500ms delay)</li>
            <li>✓ Red glowing border on focus</li>
            <li>✓ Clear button with blood splatter icon</li>
            <li>✓ Loading indicator during search</li>
            <li>✓ Keyboard navigation (Enter to search, Escape to clear)</li>
            <li>✓ Minimum 3 characters for search</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBarDemo;
