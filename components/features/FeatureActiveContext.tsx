"use client";

import React, { createContext, useState, ReactNode } from "react";

interface FeatureActiveContextType {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export const FeatureActiveContext = createContext<FeatureActiveContextType>({
  activeIndex: null,
  setActiveIndex: () => {},
});

export function FeatureActiveProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <FeatureActiveContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </FeatureActiveContext.Provider>
  );
}
