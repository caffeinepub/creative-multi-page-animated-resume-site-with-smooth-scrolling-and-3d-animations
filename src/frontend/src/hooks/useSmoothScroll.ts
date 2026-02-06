import { useEffect } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [prefersReducedMotion]);
}
