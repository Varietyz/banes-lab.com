// 📂 src/hooks/useScrollDirection.js
import { useState, useEffect } from 'react';

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('down');
  
// Example: "lock" direction for 300ms after a change.
useEffect(() => {
  let lastScrollY = window.pageYOffset;
  let lockedDirection = 'down';
  let lockTimer = null;

  const updateScrollDirection = () => {
    const currentScrollY = window.pageYOffset;
    const delta = currentScrollY - lastScrollY;

    // if we're not locked or lock has ended
    if (!lockTimer && Math.abs(delta) > 5) {
      lockedDirection = delta > 0 ? 'down' : 'up';
      setScrollDirection(lockedDirection);

      // Lock direction for 300ms
      lockTimer = setTimeout(() => {
        lockTimer = null;
      }, 300);
    }

    lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
  };

  window.addEventListener('scroll', updateScrollDirection);
  return () => {
    window.removeEventListener('scroll', updateScrollDirection);
    if (lockTimer) clearTimeout(lockTimer);
  };
}, []);

  return scrollDirection;
}
