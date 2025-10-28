import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ setResults }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  return (
    <form className="d-flex mb-4" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;