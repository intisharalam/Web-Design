import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/searchbar.module.scss';

function SearchBar({ onKeyPress, results, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Clicked outside the dropdown
                setIsOpen(false); // Close the dropdown
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        setIsOpen(true); // Open the dropdown when input is focused
    };

    const handleSelect = (symbol) => {
        setIsOpen(false); // Close the dropdown when an item is selected
        onSelect(symbol); // Trigger the onSelect function passed from props
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="🔍 Search company..."
                className={styles.input}
                ref={inputRef}
                onKeyPress={onKeyPress}
                onFocus={handleInputFocus}
            />
            {isOpen && results.length > 0 && (
                <ul ref={dropdownRef} className={styles.dropdown}>
                    {results.map((result, index) => (
                        <li
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleSelect(result.symbol)}
                        >
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
