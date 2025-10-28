import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query');

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="container py-5">
      <h3>Search Results for: "{query}"</h3>
      <ul className="list-group mt-3">
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item._id} className="list-group-item">
              <strong>{item.name}</strong> — ₹{item.price}
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No products found</li>
        )}
      </ul>
    </div>
  );
}

export default SearchResults;