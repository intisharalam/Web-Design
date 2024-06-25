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
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'Apple OR Microsoft OR AMD OR TESLA', // Example query for finance news
            token: '34e71603b0667b65106f363592746261', // No API key required for basic usage
            max: 10, // Limit to 10 articles
          }
        });
        const uniqueArticles = removeDuplicates(response.data.articles);
        setPersonalizedArticles(uniqueArticles);
      } catch (error) {
        console.error('Error fetching personalized articles:', error);
        setPersonalizedArticles([]); // Clear articles on error
      }
    };

    const fetchExploreData = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'stocks', // Example query for stocks news
            token: '34e71603b0667b65106f363592746261', // No API key required for basic usage
            max: 10, // Limit to 10 articles
          }
        });
        const uniqueArticles = removeDuplicates(response.data.articles);
        setExploreArticles(uniqueArticles);
      } catch (error) {
        console.error('Error fetching explore articles:', error);
        setExploreArticles([]); // Clear articles on error
      }
    };

    fetchPersonalizedData();
    fetchExploreData();
  }, []);

  const removeDuplicates = (articles) => {
    const seenTitles = new Set();
    return articles.filter(article => {
      const isDuplicate = seenTitles.has(article.title);
      seenTitles.add(article.title);
      return !isDuplicate;
    });
  };

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
