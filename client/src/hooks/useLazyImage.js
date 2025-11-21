/**
 * Custom hook for image lazy loading with IntersectionObserver
 */

import { useEffect, useRef, useState } from 'react';
import { PERFORMANCE_CONFIG } from '../config/performanceConfig';

export const useLazyImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: PERFORMANCE_CONFIG.images.lazyLoadThreshold,
        rootMargin: PERFORMANCE_CONFIG.images.rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isLoaded };
};

export default useLazyImage;
