import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({ children, delay = 0, className = '' }: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
