import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/searchbar.module.scss';

function SearchBar({ onKeyPress, results, onSelect }) {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="🔍 Search company..."
                className={styles.input}
                onKeyPress={onKeyPress}
            />
            {results.length > 0 && (
                <ul className={styles.dropdown}>
                    {results.map((result, index) => (
                        <li key={index} className={styles.dropdownItem} onClick={() => onSelect(result.symbol)}>
                            {result.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    onKeyPress: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SearchBar;