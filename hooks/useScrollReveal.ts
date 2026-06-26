"use client";

import { useEffect, useState, useRef, RefObject } from "react";

export function useScrollReveal<T extends HTMLElement>(
  { threshold = 0.15, rootMargin = "-10% 0px" }: { threshold?: number, rootMargin?: string } = {}
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold, rootMargin });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
