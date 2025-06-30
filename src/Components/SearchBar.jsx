import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
