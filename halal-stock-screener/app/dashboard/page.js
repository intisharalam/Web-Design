'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/dashboard.module.scss';
import SearchBar from '@/components/searchbar';
import Card from '@/components/card';
import LineChart from '@/components/linechart';
import Watchlist from '@/components/watchlist';
import BalanceSheets from '@/components/barchart';
import CriteriaTable from '@/components/criteriatable';
import { useRouter } from 'next/navigation';


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
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (router.query && router.query.symbol) {
        const { symbol } = router.query;
        setSelectedSymbol(symbol);
        await fetchCompanyData(symbol);
      }
    };
  
    // Call fetchData when router.query.symbol exists and changes
    if (router.query && router.query.symbol) {
      fetchData();
    }
  }, [router.query]); // Dependency on router.query ensures it runs when query changes
  
  const handleSearch = async (query) => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.NEXT_PUBLIC_ALPHA_API_KEY}`
      );

      const items = response.data.bestMatches.map(item => ({
        name: `${item['2. name']} (${item['1. symbol']})`,
        symbol: item['1. symbol']
      }));

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

  const fetchCompanyData = async (symbol) => {
    setLoading(true);
    try {
      const companyResponse = await axios.post('/api/get_company_data', { symbol });
      const companyData = companyResponse.data;
      setCompanyData(companyData);
      console.log(companyData.data)
    } catch (error) {
      console.error('Error fetching data:', error);
      setCompanyData({}); // Optionally, handle error state
    } finally {
      setLoading(false);
    }
  };

  const handleSymbolSelect = async (symbol) => {
    setSelectedSymbol(symbol);
    await fetchCompanyData(symbol);
    router.push(`/dashboard?symbol=${symbol}`);
  };

  const computeBenjaminGrahamCriteria = (data) => {
    const criteriaAnalysis = [];

    // Market Capitalisation
    if (data['Market Cap'] !== 'N/A' && parseFloat(data['Market Cap']) > 2) {
      criteriaAnalysis.push({ criteria: 'Market Capitalisation', limit: '> $2B', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Market Capitalisation', limit: '> $2B', result: 'N' });
    }

    // Liquidity Ratio
    if (data['Liquidity Ratio'] !== 'N/A' && parseFloat(data['Liquidity Ratio']) > 2) {
      criteriaAnalysis.push({ criteria: 'Liquidity Ratio', limit: '>2', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Liquidity Ratio', limit: '>2', result: 'N' });
    }

    // Earnings Consistency
    if (data['Earnings Consistency'] === 'Positive') {
      criteriaAnalysis.push({ criteria: 'Earnings Consistency', limit: 'No negative earnings in the last 10 years', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Earnings Consistency', limit: 'No negative earnings in the last 10 years', result: 'N' });
    }

    // Dividend History (assuming `Uninterrupted Dividends` is a boolean in your data)
    if (data['Uninterrupted Dividends']) {
      criteriaAnalysis.push({ criteria: 'Dividend History', limit: 'Uninterrupted dividends for the last 20 years', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Dividend History', limit: 'Uninterrupted dividends for the last 20 years', result: 'N' });
    }

    // Earnings Growth Rate
    if (data['Earnings Growth Rate'] > 33) {
      criteriaAnalysis.push({ criteria: 'Earnings Growth Rate', limit: 'At least 33% increase over the last 10 years', result: `+${data['Earnings Growth Rate']}%` });
    } else {
      criteriaAnalysis.push({ criteria: 'Earnings Growth Rate', limit: 'At least 33% increase over the last 10 years', result: 'N' });
    }

    // Price to Earnings Ratio (P/E)
    if (data['P/E Ratio'] !== 'N/A' && parseFloat(data['P/E Ratio']) < 15) {
      criteriaAnalysis.push({ criteria: 'Price to Earnings Ratio (P/E)', limit: '< 15 times the average earnings of the last 3 years', result: '+15%' });
    } else {
      criteriaAnalysis.push({ criteria: 'Price to Earnings Ratio (P/E)', limit: '< 15 times the average earnings of the last 3 years', result: 'N' });
    }

    // Price to Book Ratio (P/B)
    if (data['Price to Book Ratio'] !== 'N/A' && parseFloat(data['Price to Book Ratio']) < 1.5) {
      criteriaAnalysis.push({ criteria: 'Price to Book Ratio (P/B)', limit: '< 1.5 or (P/E * P/B < 22.5)', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Price to Book Ratio (P/B)', limit: '< 1.5 or (P/E * P/B < 22.5)', result: 'N' });
    }

    // Debt to Equity Ratio (D/E)
    if (data['Debt to Equity Ratio'] !== 'N/A' && parseFloat(data['Debt to Equity Ratio']) < 0.5) {
      criteriaAnalysis.push({ criteria: 'Debt to Equity Ratio (D/E)', limit: '<0.5', result: 'Y' });
    } else {
      criteriaAnalysis.push({ criteria: 'Debt to Equity Ratio (D/E)', limit: '<0.5', result: 'N' });
    }

    return criteriaAnalysis;
  };

  const computeShariahCriteria = (data) => {
    const criteriaAnalysis = [];
  
    // Revenue from Haram Activities
    const totalRevenue = parseFloat(data['Total Revenue']) || 0;
    const nonPermissibleIncome = parseFloat(data['Non-Permissible Income Percentage']) / 100 * totalRevenue;
    if (nonPermissibleIncome < 0.05 * totalRevenue) {
      criteriaAnalysis.push({ criteria: 'Revenue from Haram Activities', limit: '<5% of Total Revenue', result: `${(nonPermissibleIncome / totalRevenue * 100).toFixed(1)}%` });
    } else {
      criteriaAnalysis.push({ criteria: 'Revenue from Haram Activities', limit: '<5% of Total Revenue', result: `${(nonPermissibleIncome / totalRevenue * 100).toFixed(1)}%` });
    }
  
    // Interest-bearing Debt
    const totalDebt = parseFloat(data['Total Interest-bearing Debt']) || 0;
    const totalAssets = parseFloat(data['Total Assets']) || 1; // Default to 1 to avoid division by zero
    if (totalDebt < 0.33 * totalAssets) {
      criteriaAnalysis.push({ criteria: 'Interest-bearing Debt', limit: '<33% of Total Assets', result: `${(totalDebt / totalAssets * 100).toFixed(1)}%` });
    } else {
      criteriaAnalysis.push({ criteria: 'Interest-bearing Debt', limit: '<33% of Total Assets', result: `${(totalDebt / totalAssets * 100).toFixed(1)}%` });
    }
  
    // Interest Income
    const interestIncome = parseFloat(data['Interest Income Percentage']) || 0;
    if (interestIncome < 0.05 * totalRevenue) {
      criteriaAnalysis.push({ criteria: 'Interest Income', limit: '<5% of Total Revenue', result: `${interestIncome.toFixed(1)}%` });
    } else {
      criteriaAnalysis.push({ criteria: 'Interest Income', limit: '<5% of Total Revenue', result: `${interestIncome.toFixed(1)}%` });
    }
  
    // Cash & Interest-bearing Investment
    const cashAndEquivalents = parseFloat(data['Total Cash and Equivalents']) || 0;
    const interestBearingInvestments = parseFloat(data['Total Interest-bearing Investments']) || 0;
    if ((cashAndEquivalents + interestBearingInvestments) < 0.33 * totalAssets) {
      criteriaAnalysis.push({ criteria: 'Cash & Interest-bearing Investment', limit: '<33% of Total Assets', result: `${((cashAndEquivalents + interestBearingInvestments) / totalAssets * 100).toFixed(1)}%` });
    } else {
      criteriaAnalysis.push({ criteria: 'Cash & Interest-bearing Investment', limit: '<33% of Total Assets', result: `${((cashAndEquivalents + interestBearingInvestments) / totalAssets * 100).toFixed(1)}%` });
    }
  
    // Halal Sector
    const nonHalalSectors = ['alcohol', 'gambling']; // Example non-permissible sectors
    const sector = data['Sector'] ? data['Sector'].toLowerCase() : '';
    if (sector && !nonHalalSectors.includes(sector)) {
      criteriaAnalysis.push({ criteria: 'Halal Sector', limit: 'Sector not from non-permissible ones', result: 'Yes' });
    } else {
      criteriaAnalysis.push({ criteria: 'Halal Sector', limit: 'Sector not from non-permissible ones', result: 'No' });
    }
  
    return criteriaAnalysis;
  };
    

  return (
    <div className={styles.container}>
      <div className={styles.stockName}>
        <div className={styles.ticker}>
          {loading ? (
            'Loading...'
          ) : (
            <>
              <div className={styles.companyName}>
                {companyData.data && Object.keys(companyData.data).length > 0 ? (
                  `${companyData.data['Company Name']} (${companyData.data['Symbol']})`
                ) : (
                  'International (IBM)'
                )}
              </div>
              <div className={styles.sector}>
                {companyData.data && Object.keys(companyData.data).length > 0 ? (
                  `Sector: ${companyData.data['Sector']}`
                ) : (
                  'Sector: Technology'
                )}
              </div>
            </>
          )}
        </div>
        <SearchBar className={styles.searchbar} onKeyPress={handleKeyPress} results={results} onSelect={handleSymbolSelect} />
      </div>
  
      <div className={styles.cardRow}>
        <Card
          topText="Status"
          middleText="Halal"
          bottomText="Score: 13/13"
        />
        <Card
          topText="P/E ratio"
          middleText={loading ? 'Loading...' : (companyData.data ? companyData.data['P/E Ratio'] : 'fail')}
          bottomText={loading ? 'Loading...' : (`Dividend Yield: ${companyData.data ? companyData.data['Dividend Yield'] : 'fail'}`)}
        />
        <Card
          topText="Market Cap"
          middleText={loading ? 'Loading...' : (`${companyData.data ? companyData.data['Market Cap'] : 'fail'} (Large)`)}
          bottomText={loading ? 'Loading...' : (`Beta: ${companyData.data ? companyData.data['Beta'] : 'fail'}`)}
        />
      </div>
  
      <div className={styles.stockData}>
        <div className={styles.graph}>
          <LineChart chartData={loading ? [] : (companyData.data ? companyData.data['Monthly Close Prices'] : stockPrice)} />
        </div>
        <div className={styles.watchlist}>
          <Watchlist />
        </div>
      </div>
  
      <div className={styles.financialData}>
        <div className={styles.benjaminCriteria}>
          <CriteriaTable
            criteriaData={computeBenjaminGrahamCriteria(companyData)}
            title="Benjamin Graham’s Criteria"
          />
        </div>
  
        <div className={styles.halalCriteria}>
          <CriteriaTable
            criteriaData={computeShariahCriteria(companyData)}
            title="Sharia Law Criteria"
          />
        </div>
  
        <div className={styles.balanceSheets}>
          <BalanceSheets chartData={loading ? [] : (companyData.data ? companyData.data['Assets_Liabilities'] : assetLiability)} />
        </div>
      </div>
    </div>
  );
  

}
