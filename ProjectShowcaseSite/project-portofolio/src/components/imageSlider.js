import React, { useState, useEffect } from 'react';
import styles from '../styles/imageslider.module.scss'; // Update path if needed
import Image from 'next/image';

export default function Imageslider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popupIndex, setPopupIndex] = useState(null);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.imageWrapper}>
        {slides.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index}`}
            width={400}
            height={300}
            className={`${styles.sliderImage} ${index === currentIndex ? styles.visible : ''}`}
            onClick={() => setPopupIndex(currentIndex)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {popupIndex !== null && (
        <div className={styles.popupOverlay} onClick={() => setPopupIndex(null)}>
          <Image
            src={slides[popupIndex]}
            alt={`Popup Slide ${popupIndex}`}
            width={800}
            height={600}
            className={styles.popupImage}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image
          />
        </div>
      )}
    </div>
  );
}
