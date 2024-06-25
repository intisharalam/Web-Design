'use client'

import axios from 'axios';
import Card from '@/components/card';
import SearchBar from '@/components/searchbar';
import LineChart from '@/components/linechart';
import styles from '@/styles/dashboard.module.scss';
import React, { useState, useEffect } from 'react';
import Watchlist from '@/components/watchlist';
import BalanceSheets from '@/components/barchart';
import CriteriaTable from '@/components/criteriatable';
import { useRouter } from 'next/navigation';


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

const stockPrice = [
  { year: '2014', price: 4000 },
  { year: '2015', price: 3000 },
  { year: '2016', price: 2000 },
  { year: '2017', price: 2780 },
  { year: '2018', price: 1890 },
  { year: '2019', price: 2390 },
  { year: '2020', price: 4490 },
  { year: '2021', price: 3090 },
  { year: '2022', price: 2090 },
  { year: '2023', price: 4090 },
];

const assetLiability = [
  { year: '2021', assets: 5500, liabilities: 1500 },
  { year: '2022', assets: 4800, liabilities: 1300 },
  { year: '2023', assets: 6000, liabilities: 1800 },
];


export default function Dashboard() {
  const [results, setResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.symbol) {
      const { symbol } = router.query;
      setSelectedSymbol(symbol);
      console.log('Selected symbol:', symbol);
    }
  }, [router.query]);

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
    <div className={styles.container}>
      <div className={styles.stockName}>
        <div className={styles.ticker}>
          Microsoft (MSFT) | Sector: Technology
        </div>
        <SearchBar onKeyPress={handleKeyPress} results={results} onSelect={handleSymbolSelect} />
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
          <LineChart chartData={stockPrice} />
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
          <BalanceSheets chartData={assetLiability} />
        </div>
      </div>
    </div>
  );
}