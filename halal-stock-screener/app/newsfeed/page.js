'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/newsfeed.module.scss';

const NewsFeed = () => {
  const [personalizedArticles, setPersonalizedArticles] = useState([]);
  const [exploreArticles, setExploreArticles] = useState([]);
  const [showPersonalized, setShowPersonalized] = useState(true); // Default to showing personalized feed

  useEffect(() => {
    const fetchPersonalizedData = async () => {
      // Replace 'AAPL,GOOGL,MSFT' with your predefined list of stock symbols
      const response = await axios.get(`https://newsapi.org/v2/everything?q=AAPL+GOOGL+MSFT&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
      setPersonalizedArticles(response.data.articles.slice(0, 10)); // Limit to 10 articles
    };

    const fetchExploreData = async () => {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=stocks&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
      setExploreArticles(response.data.articles.slice(0, 10)); // Limit to 10 articles
    };

    fetchPersonalizedData();
    fetchExploreData();
  }, []);

  const handleToggle = () => {
    setShowPersonalized(!showPersonalized); // Toggle between personalized and explore feeds
  };

  return (
    <div className={styles.container}>
      <div className={styles.toggleContainer}>
        <button
          className={`${styles.toggleButton} ${showPersonalized ? styles.active : ''}`}
          onClick={handleToggle}
        >
          Personalized
        </button>
        <button
          className={`${styles.toggleButton} ${!showPersonalized ? styles.active : ''}`}
          onClick={handleToggle}
        >
          Explore
        </button>
      </div>
      <div className={styles.tab}>
        <ul className={styles.articleList}>
          {showPersonalized ? (
            personalizedArticles.map((article, index) => (
              <li key={index} className={styles.article}>
                <h3 className={styles.heading3}>{article.title}</h3>
                <p className={styles.paragraph}>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>Read more</a>
              </li>
            ))
          ) : (
            exploreArticles.map((article, index) => (
              <li key={index} className={styles.article}>
                <h3 className={styles.heading3}>{article.title}</h3>
                <p className={styles.paragraph}>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>Read more</a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewsFeed;
