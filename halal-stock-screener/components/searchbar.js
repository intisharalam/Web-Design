'use client'

import { useState } from 'react';
import styles from '@/styles/home.module.scss';

const SearchBar = ({ onSearch, results }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === '') {
      onSearch('');
    } else {
      onSearch(newQuery);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="🔍 Enter Symbol" 
        className={styles.input}
      />
      {results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((result, index) => (
            <li key={index} className={styles.dropdownItem}>
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
