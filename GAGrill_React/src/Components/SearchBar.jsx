import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar({ setQuery }) {
  const [localQuery, setLocalQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localQuery) {
      setQuery(localQuery);

      if (location.pathname !== '/menu') {
        navigate('/menu');

        setTimeout(() => {
          if (localQuery.toLowerCase().includes('menu')) {
            const section = document.getElementById('menu-main-headline');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 500);
      } else {
        if (localQuery.toLowerCase().includes('menu')) {
          const section = document.getElementById('menu-main-headline');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  }, [localQuery]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search here..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
