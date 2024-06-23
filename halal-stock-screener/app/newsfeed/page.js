import React from 'react';
import styles from '@/styles/construction.module.scss'; // Assuming you have a CSS module for styling

export default function NewsFeed() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>News Feed Under Construction</h1>
            <p className={styles.message}>We're working hard to bring you the best experience. Please check back later!</p>
            <p className={styles.note}><strong>Note:</strong> This is a DIY project created by a student engineer. We appreciate your understanding and patience.</p>
        </div>
    );
}
