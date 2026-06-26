"use client";

import React, { useContext, useEffect, useState } from "react";
import { PricingContext } from "@/lib/pricing-context";
import { computePrice } from "@/lib/pricing-engine";
import { TierId } from "@/lib/pricing-matrix";

interface PriceDisplayProps {
  tierId: TierId;
  isFeatured?: boolean;
}

export default function PriceDisplay({ tierId, isFeatured }: PriceDisplayProps) {
  const { currency, cycle } = useContext(PricingContext);
  const result = computePrice(tierId, currency, cycle);

  const [displayString, setDisplayString] = useState(result.formatted);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (result.formatted !== displayString) {
      // eslint-disable-next-line
      setFade(true);
      const t1 = setTimeout(() => {
        setDisplayString(result.formatted);
        setFade(false);
      }, 75);
      return () => clearTimeout(t1);
    }
  }, [result.formatted, displayString]);

  const currentFormatted = displayString === result.formatted ? result.formatted : displayString;

  return (
    <div className="my-2">
      <div className="flex items-baseline">
        <span 
          className={`${isFeatured ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} font-mono font-bold text-ink transition-opacity duration-150 ease-out ${fade ? 'opacity-40' : 'opacity-100'}`}
        >
          {currentFormatted}
        </span>
        <span className="ml-2 text-ink/60 font-sans font-medium">
          /{cycle === 'monthly' ? 'mo' : 'yr'}
        </span>
      </div>
      
      <div className="h-6 mt-1">
        {result.cycle === 'annual' && result.perMonthEquivalent ? (
          <p className={`text-sm text-accent font-semibold transition-opacity duration-150 ease-out ${fade ? 'opacity-40' : 'opacity-100'}`}>
            Billed annually, ≈ {new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', { style: 'currency', currency, maximumFractionDigits: currency === 'INR' ? 0 : 2 }).format(result.perMonthEquivalent)}/mo
          </p>
        ) : null}
      </div>
    </div>
  );
}
