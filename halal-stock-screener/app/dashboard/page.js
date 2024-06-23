'use client'

import React from 'react';
import { useState } from 'react';
import Card from '@/components/card';
import styles from '@/styles/dashboard.module.scss'
import SearchBar from '@/components/searchbar';

export default function Page() {

    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        
        const items = [
            'apple',
            'banana',
            'orange',
            'grape',
            'mango'
        ];

        const filteredResults = items.filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredResults);
    };

    return (
        <div className={styles.container}>
            <div className={styles.stockName}>
                <div className={styles.ticker}>
                    Microsoft (MSFT) | Sector: Technology
                </div>
                <SearchBar onSearch={handleSearch} results={results} />
            </div>

            <div className={styles.cardRow}>
            <Card
                topText="Status"
                middleText="Halal"
                bottomText="Score: 13/13"
            />
            <Card
                topText="P/E ratio"
                middleText="45.3"
                bottomText="Dividend Yield: 0.67%"
            />
            <Card
                topText="Market Cap"
                middleText="£3.34T (Large)"
                bottomText="Beta: 0.89"
            />
            </div>
        </div>
      );
    };