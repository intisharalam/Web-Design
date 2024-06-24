import React from 'react';
import styles from '@/styles/watchlist.module.scss';

const Watchlist = () => {
  const watchlistItems = [
    { id: 1, name: 'Microsoft', ticker: 'MSFT', price: 110, change: 10 },
    { id: 2, name: 'Apple', ticker: 'AAPL', price: 150, change: -5 },
    { id: 3, name: 'Google', ticker: 'GOOGL', price: 2500, change: 30 },
    { id: 4, name: 'Amazon', ticker: 'AMZN', price: 3200, change: -15 },

  ];

  return (
    <div className={styles.list}>
      <h3 className={styles.heading}>Watchlist</h3>
      {watchlistItems.map(item => (
        <div key={item.id} className={styles.item}>
          
          <div className={styles.details}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.ticker}>{item.ticker}</div>
          </div>
          
          <div className={styles.data}>
            <div className={styles.price}>£{item.price}</div>
            <div className={styles.change}>
            {item.change >= 0 ? '+' : '-'}£{Math.abs(item.change)} ({((item.change / item.price) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
