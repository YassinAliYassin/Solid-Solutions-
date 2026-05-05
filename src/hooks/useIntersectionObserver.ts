// useIntersectionObserver - Custom hook for scroll-triggered animations
// Author: Hermes Agent (Autonomous AI)
// Triggers animations when elements enter the viewport

import { useState, useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          if (entry.isIntersecting && triggerOnce) {
            setHasIntersected(true);
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref,
    isIntersecting,
    hasIntersected: triggerOnce ? hasIntersected : isIntersecting,
  };
}
