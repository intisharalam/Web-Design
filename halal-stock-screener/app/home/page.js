"use client"

import React from 'react';
import Image from "next/image";
import { useState } from 'react';
import Logo from "@/public/Logo-black-2.svg";
import styles from "@/styles/home.module.scss";
import SearchBar from '@/components/searchbar';

export default function HomePage() {
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
        <div className={styles.container_home}>
            <div className={styles.container_search}>
                <Image
                    className={styles.logoImg}
                    src={Logo}
                    width={78}
                    height={78}
                    alt="logo"
                />
                <SearchBar onSearch={handleSearch} results={results} />
            </div>
            <div className={styles.container_intro}>
                <h1 className={styles.intro_greet}>Welcome!</h1>
                <h2 className={styles.intro_subheading}>Here is how the site works👇</h2>
                <p className={styles.intro_text}>
                    Enter the ticker symbol or name of the company you are looking into.<br />
                    Once you click on the stock you wish to check, you will be redirected to the dashboard for more details.<br />
                    You may also be interested in checking the newsfeed for popular general stocks or Halal stocks.<br /><br />
                    <strong>Note:</strong> This is a DIY project created by a student engineer, so there may be some errors.<br /> It is not developed by a financial expert.
                </p>
            </div>
        </div>
    );
}
