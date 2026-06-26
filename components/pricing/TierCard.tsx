"use client";

import React, { useContext } from "react";
import { TierConfig } from "@/lib/pricing-matrix";
import { PricingContext } from "@/lib/pricing-context";
import PriceDisplay from "./PriceDisplay";

interface TierCardProps {
  tier: TierConfig;
}

const TierCard = React.memo(function TierCard({ tier }: TierCardProps) {
  const { activeTier, setActiveTier } = useContext(PricingContext);
  const isFeatured = activeTier === tier.id;

  return (
    <div 
      onClick={() => setActiveTier(tier.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveTier(tier.id);
        }
      }}
      className={`relative flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-300 h-full hover:-translate-y-1 cursor-pointer ${
        isFeatured 
          ? "bg-gradient-to-br from-accent/[0.08] to-card-bg border-accent shadow-xl shadow-accent/15 scale-100 md:scale-105 z-10" 
          : "bg-card-bg border-ink/10 shadow-sm"
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent text-primary-dark text-xs font-bold uppercase tracking-widest rounded-full shadow-sm animate-[pulse_2s_infinite]">
          Selected Plan
        </div>
      )}

      <div className="flex flex-col gap-6 h-full">
        <div>
          <h3 className={`text-2xl font-mono font-bold mb-2 ${tier.isFeatured ? "text-accent" : "text-text-primary"}`}>
            {tier.name}
          </h3>
          <p className="text-ink/70 text-sm md:text-base leading-relaxed">
            {tier.description}
          </p>
        </div>

        <PriceDisplay tierId={tier.id} isFeatured={tier.isFeatured} />

        <ul className="flex-1 space-y-4">
          {tier.featureHighlights.map((feature, i) => (
            <li key={i} className="flex items-start text-sm md:text-base text-ink/80">
              <span className="mr-3 mt-0.5 text-accent shrink-0">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-4 mt-6 rounded-xl font-bold transition-all duration-200 ease-out hover:-translate-y-[2px] ${
            tier.isFeatured
              ? "bg-accent text-primary-dark hover:bg-accent/90 hover:shadow-lg"
              : "bg-ink/5 text-ink hover:bg-ink/10"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
});

export default TierCard;
