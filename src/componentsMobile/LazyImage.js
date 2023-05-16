import React, { useRef, useState, useEffect } from 'react';

const LazyImage = ({ src }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 } // change this value to adjust when the image should start loading
    );

    observer.observe(ref.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref]);

  return (
    <div className="lazy-container">
      {!isVisible && <div className="loading">Loading...</div>}
      <img ref={ref} src={isVisible ? src : ''} alt="" className="lazy" />
    </div>
  );
};

export default LazyImage;
