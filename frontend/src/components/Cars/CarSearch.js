import React, { useState } from 'react';
import './Cars.css';

const CarSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="Search cars..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ flexGrow: 1, padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
      />
      <button
        type="submit"
        className="button"
      >
        Search
      </button>
    </form>
  );
};

export default CarSearch;