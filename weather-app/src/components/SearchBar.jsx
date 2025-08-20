import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-fadeIn">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-white/60" />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            disabled={loading}
            className="w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300 text-lg disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="absolute inset-y-0 right-0 pr-4 flex items-center disabled:opacity-50 group"
          >
            <Search className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-200 group-hover:scale-110 transform" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;