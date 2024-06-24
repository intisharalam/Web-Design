'use client'

import Card from '@/components/card';
import SearchBar from '@/components/searchbar';
import Chart from '@/components/linechart';
import styles from '@/styles/dashboard.module.scss'
import React, { useState} from 'react';
import Watchlist from '@/components/watchlist';
import BalanceSheets from '@/components/barchart';
import CriteriaTable from '@/components/criteriatable';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const benjaminGrahamData = [
  { criteria: 'Market Capitalisation', limit: '> $2B', result: 'Y' },
  { criteria: 'Liquidity Ratio', limit: '>2', result: 'Y' },
  { criteria: 'Earnings Consistency', limit: 'No negative earnings in the last 10 years', result: 'Y' },
  { criteria: 'Dividend History', limit: 'Uninterrupted dividends for the last 20 years', result: 'Y' },
  { criteria: 'Earnings Growth Rate', limit: 'At least 33% increase over the last 10 years', result: '+18%' },
  { criteria: 'Price to Earnings Ratio (P/E)', limit: '< 15 times the average earnings of the last 3 years', result: '+15%' },
  { criteria: 'Price to Book Ratio (P/B)', limit: '	< 1.5 or (P/E * P/B < 22.5)', result: '26' },
  { criteria: 'Debt to Equity Ratio (D/E)', limit: '<0.5', result: '28' },
];

const shariahLawData = [
  { criteria: 'Revenue from Haram Activities', limit: '<5%', result: '2.7%' },
  { criteria: 'Interest-bearing Debt', limit: '<33%', result: '15%' },
  { criteria: 'Interest Income', limit: '<5%', result: '1.1%' },
  { criteria: 'Cash & Interest-bearing Investment', limit: '<33%', result: '12%' },
  { criteria: 'Non-Permissible Income', limit: '<5%', result: '2.5%' },
];

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

            <div className={styles.stockData}>
                <div className={styles.graph}>
                    <Chart />
                </div>
                <div className={styles.watchlist}>
                  <Watchlist />
                </div>
            </div>

            <div className={styles.financialData}>
              <div className={styles.benjaminCriteria}>
                <CriteriaTable
                criteriaData={benjaminGrahamData}
                title="Benjamin Graham’s Criteria"
                />
              </div>

              <div className={styles.halalCriteria}>
                <CriteriaTable
                criteriaData={shariahLawData}
                title="Sharia Law Criteria"
                />
              </div>
              
              <div className={styles.balanceSheets}>
                <BalanceSheets />
              </div>
            </div>
        </div>
      );
    };