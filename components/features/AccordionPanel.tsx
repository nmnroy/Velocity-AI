"use client";

import React from "react";
import { Feature } from "@/lib/feature-data";

interface AccordionPanelProps {
  feature: Feature;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  justActivated: boolean;
}

export default function AccordionPanel({
  feature,
  index,
  isOpen,
  onToggle,
  justActivated,
}: AccordionPanelProps) {
  // If we just activated this panel via breakpoint switch, we force it to evaluate 
  // the `1fr` transition on mount.
  
  return (
    <div className="border-b border-ink/10 last:border-b-0">
      <button
        id={`header-${feature.id}`}
        aria-expanded={isOpen}
        aria-controls={`panel-${feature.id}`}
        onClick={() => onToggle(index)}
        className="flex items-center justify-between w-full min-h-[44px] py-4 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className={`font-mono text-lg font-bold transition-colors duration-[200ms] ${isOpen ? "text-accent" : "text-text-primary"}`}>
          {feature.title}
        </span>
        <span 
          className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-[200ms] ease-out ${
            isOpen ? "rotate-180 bg-accent text-primary-dark border-transparent" : "text-text-primary border-ink/20"
          }`}
        >
          {/* Chevron down SVGs fallback */}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* 
        Native CSS Grid 0fr -> 1fr animation technique.
        Layout is declarative and avoids JS height measurement thrashing.
      */}
      <div
        id={`panel-${feature.id}`}
        role="region"
        aria-labelledby={`header-${feature.id}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {/* Only allow focus if open to maintain logical tab-order */}
          <div className="pb-6 pr-8 text-ink/80 font-sans" tabIndex={isOpen ? 0 : -1}>
            {feature.description}
          </div>
        </div>
      </div>
    </div>
  );
}
