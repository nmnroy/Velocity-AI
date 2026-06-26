"use client";

import React, { useContext } from "react";
import { PricingContext } from "@/lib/pricing-context";
import { currencyConfigs, Currency } from "@/lib/pricing-matrix";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useContext(PricingContext);
  const options = Object.keys(currencyConfigs) as Currency[];
  const activeIndex = options.indexOf(currency);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = options.indexOf(currency);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      setCurrency(options[nextIndex]);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      setCurrency(options[prevIndex]);
    }
  };

  return (
    <div 
      className="relative flex items-center p-1 bg-surface border border-ink/10 rounded-full mt-6 focus:outline-none"
      role="radiogroup" 
      aria-label="Select Currency"
      onKeyDown={handleKeyDown}
    >
      <div 
        className="absolute h-[calc(100%-8px)] top-1 bg-ink rounded-full transition-transform duration-200 ease-out shadow-sm"
        style={{
          width: `calc((100% - 8px) / ${options.length})`,
          transform: `translateX(calc(${activeIndex * 100}%))`
        }}
      />
      {options.map((opt) => {
        const isSelected = currency === opt;
        return (
          <button
            key={opt}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => setCurrency(opt)}
            className={`relative z-10 px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isSelected ? "text-background" : "text-ink/70 hover:text-ink"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
