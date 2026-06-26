import React from "react";
import { tierConfigs } from "@/lib/pricing-matrix";
import { PricingProvider } from "@/lib/pricing-context";
import BillingToggle from "@/components/pricing/BillingToggle";
import CurrencySwitcher from "@/components/pricing/CurrencySwitcher";
import TierCard from "@/components/pricing/TierCard";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Server Component (No "use client" directive)
export default function PricingSection() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-20 py-24 sm:py-32 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll delay={0} className="text-center max-w-3xl mx-auto mb-20">
          <h2 id="pricing-heading" className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-text-primary mb-6">
            Transparent Pricing
          </h2>
          <p className="text-ink/70 text-lg md:text-xl font-sans">
            Start free, scale globally. Choose the plan that fits your growth.
          </p>
        </RevealOnScroll>

        {/* 
          The PricingProvider creates a strict architectural boundary.
          Currency/Cycle state only exists inside this subtree, and only
          PriceDisplay reads it. PricingSection itself will NEVER re-render.
        */}
        <PricingProvider>
          <RevealOnScroll delay={60} className="mb-16 flex flex-col items-center">
            <BillingToggle />
            <CurrencySwitcher />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {tierConfigs.map((tier, index) => (
              <RevealOnScroll key={tier.id} delay={120 + index * 60} className="h-full">
                <TierCard tier={tier} />
              </RevealOnScroll>
            ))}
          </div>
        </PricingProvider>
      </div>
    </section>
  );
}
