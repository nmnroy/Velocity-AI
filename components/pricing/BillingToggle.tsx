"use client";

import React, { useContext } from "react";
import { PricingContext } from "@/lib/pricing-context";

export default function BillingToggle() {
  const { cycle, setCycle } = useContext(PricingContext);
  const isAnnual = cycle === 'annual';

  return (
    <div 
      className="relative flex items-center p-1 bg-surface border border-ink/10 rounded-full w-72 h-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      role="radiogroup" 
      aria-label="Billing Cycle"
    >
      {/* Animated Background Thumb */}
      <div
        className="absolute w-[calc(50%-4px)] h-12 rounded-full bg-accent transition-transform duration-[200ms] ease-out shadow-sm"
        style={{ transform: isAnnual ? "translateX(100%)" : "translateX(0%)" }}
      />
      
      <button
        role="radio"
        aria-checked={!isAnnual}
        onClick={() => setCycle('monthly')}
        className={`relative z-10 w-1/2 h-full rounded-full text-center text-sm font-semibold transition-colors duration-[200ms] focus:outline-none ${!isAnnual ? "text-primary-dark" : "text-ink/70 hover:text-ink"}`}
      >
        Monthly
      </button>
      <button
        role="radio"
        aria-checked={isAnnual}
        onClick={() => setCycle('annual')}
        className={`relative z-10 w-1/2 h-full rounded-full text-center text-sm font-semibold transition-colors duration-[200ms] focus:outline-none ${isAnnual ? "text-primary-dark" : "text-ink/70 hover:text-ink"}`}
      >
        Annual (20% off)
      </button>
    </div>
  );
}
