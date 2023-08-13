import React, { useState, useEffect } from 'react';
import styles from '../styles/imageslider.module.scss'; // Update the path to your CSS file
import Image from 'next/image';



export default function Imageslider({slides}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // Auto-slide every 2 seconds
    const interval = setInterval(goToNextSlide, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

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
            className={`${styles.sliderImage} ${
              index === currentIndex ? styles.visible : ''
            }`}
          />
        ))}
      </div>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );  
}
