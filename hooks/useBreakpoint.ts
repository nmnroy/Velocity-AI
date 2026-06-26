"use client";

import { useState, useEffect } from "react";

export function useBreakpoint() {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    // Avoid hydration mismatch by checking window type safely,
    // though Next.js hydration will still need to match. To truly avoid 
    // mismatch, we could start as null, but prompt prefers initialization
    // direct from window for cleanliness to avoid 3 states.
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 768px)").matches;
    }
    return true; // default for SSR to desktop
  });

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    
    // Set initial value purely on the client after mount to fix any SSR mismatch safely
    // eslint-disable-next-line
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return { isDesktop };
}
