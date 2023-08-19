import React, { useRef, useEffect } from 'react';
import styles from "../styles/videoplayer.module.scss";

export default function VideoPlayer({ videoSrc }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.autoplay = true;
    videoElement.loop = true;
    videoElement.muted = true;
  }, []);

  return (
    <div className={styles.video_player}>
      <video ref={videoRef} controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
