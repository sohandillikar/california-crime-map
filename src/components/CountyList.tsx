import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { counties } from '../data/counties';

interface CountyListProps {
  searchable?: boolean;
  className?: string;
}

export default function CountyList({ searchable = true, className = '' }: CountyListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedCounties = useMemo(() => {
    return [...counties].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredCounties = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedCounties;
    }
    const query = searchQuery.toLowerCase();
    return sortedCounties.filter(county => 
      county.name.toLowerCase().includes(query)
    );
  }, [sortedCounties, searchQuery]);

  return (
    <div className={className}>
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search counties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 focus:border-transparent text-brown-900 placeholder-brown-400"
            aria-label="Search counties"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredCounties.length > 0 ? (
          filteredCounties.map((county) => {
            const displayName = county.name.replace(/\s+County\s*$/i, '');
            return (
              <Link
                key={county.name}
                to={`/${county.slug}`}
                className="px-3 py-2 text-sm text-brown-700 hover:text-brown-900 hover:bg-brown-100 rounded-md transition-colors duration-200 border border-transparent hover:border-brown-200"
              >
                {displayName}
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center text-brown-600 py-4">
            No counties found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

