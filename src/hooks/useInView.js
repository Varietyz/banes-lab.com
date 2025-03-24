// 📂 src/hooks/useInView.js
import { useState, useRef, useEffect } from 'react';

export default function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Unobserve after first intersection => one-time fade
          obs.unobserve(entry.target);
        }
      },
      {
        threshold: 0, // triggers as soon as any pixel is in
        // rootMargin: '0px', // optional, if you want 0 offset
        ...options
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isInView];
}
