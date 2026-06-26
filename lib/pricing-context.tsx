"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Currency, BillingCycle, TierId } from "./pricing-matrix";

interface PricingContextType {
  currency: Currency;
  cycle: BillingCycle;
  activeTier: TierId;
  setCurrency: (currency: Currency) => void;
  setCycle: (cycle: BillingCycle) => void;
  setActiveTier: (tier: TierId) => void;
}

export const PricingContext = createContext<PricingContextType>({
  currency: 'USD',
  cycle: 'monthly',
  activeTier: 'growth',
  setCurrency: () => {},
  setCycle: () => {},
  setActiveTier: () => {},
});

export function PricingProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [activeTier, setActiveTier] = useState<TierId>('growth');

  return (
    <PricingContext.Provider value={{ currency, cycle, activeTier, setCurrency, setCycle, setActiveTier }}>
      {children}
    </PricingContext.Provider>
  );
}
