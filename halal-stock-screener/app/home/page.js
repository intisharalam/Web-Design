"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import Logo from "@/public/Logo-black-2.svg";
import styles from "@/styles/home.module.scss";
import SearchBar from '@/components/searchbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [results, setResults] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('');
    const router = useRouter();

    const handleSearch = async (query) => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
    
        console.log('Search query:', query);
    
        try {
            const response = await axios.get(
                `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
            );
    
            console.log('API response:', response.data);
    
            const items = response.data.bestMatches.map(item => ({
                name: `${item['2. name']} (${item['1. symbol']})`,
                symbol: item['1. symbol']
            }));
    
            console.log('Search results:', items);
    
            setResults(items);
        } catch (error) {
            console.error('Error fetching stock symbols:', error);
            setResults([]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event.target.value);
        }
    };

    const handleSymbolSelect = async (symbol) => {
        setSelectedSymbol(symbol);

        try {
            const response = await axios.post('/api/get_company_data', { symbol });
            const companyData = response.data;
            console.log('Company data:', companyData);
            // Handle the company data as needed
        } catch (error) {
            console.error('Error fetching company data:', error);
        }

        // Redirect to dashboard with symbol query parameter if needed
        router.push(`/dashboard?symbol=${symbol}`);
    };

    return (
        <div className={styles.container_home}>
            <div className={styles.container_search}>
                <Image
                    className={styles.logoImg}
                    src={Logo}
                    width={78}
                    height={78}
                    alt="logo"
                />
                <SearchBar onKeyPress={handleKeyPress} results={results} onSelect={handleSymbolSelect} />
            </div>
            <div className={styles.container_intro}>
                <h1 className={styles.intro_greet}>Welcome!</h1>
                <h2 className={styles.intro_subheading}>Here is how the site works👇</h2>
                <p className={styles.intro_text}>
                    Enter the ticker symbol or name of the company you are looking into.
                    Once you click on the stock you wish to check, you will be redirected to the dashboard for more details.
                    You may also be interested in checking the newsfeed for popular general stocks or Halal stocks.<br /><br />
                    <strong>Note:</strong> This is a DIY project created by a student engineer, so there may be some errors. It is not developed by a financial expert.
                </p>
            </div>
        </div>
    );
}
