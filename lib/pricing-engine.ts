import {
  TierId,
  Currency,
  BillingCycle,
  currencyConfigs,
  tierConfigs,
  ANNUAL_DISCOUNT_MULTIPLIER
} from './pricing-matrix';

export interface PriceResult {
  amount: number;
  formatted: string;
  currency: Currency;
  cycle: BillingCycle;
  tierId: TierId;
  perMonthEquivalent?: number;
}

export function computePrice(tierId: TierId, currency: Currency, cycle: BillingCycle): PriceResult {
  // 1. Look up tier's baseMonthlyRateUSD
  const tier = tierConfigs.find(t => t.id === tierId);
  if (!tier) {
    throw new Error(`Invalid tier ID: ${tierId}`);
  }
  const baseMonthlyRateUSD = tier.baseMonthlyRateUSD;

  // 2. Look up currency's tariffMultiplier and baseRateMultiplier
  const config = currencyConfigs[currency];
  
  // 3. Compute baseMonthlyInCurrency
  const baseMonthlyInCurrency = baseMonthlyRateUSD * config.baseRateMultiplier * config.tariffMultiplier;

  let finalAmount = 0;
  let perMonthEquivalent: number | undefined = undefined;

  // 4. Cycle logic
  if (cycle === 'annual') {
    finalAmount = baseMonthlyInCurrency * 12 * ANNUAL_DISCOUNT_MULTIPLIER;
    perMonthEquivalent = finalAmount / 12;
  } else {
    finalAmount = baseMonthlyInCurrency;
  }

  // 5. Rounding and formatting
  // INR conventionally uses 0 decimals, USD and EUR use 2
  const maxDecimals = currency === 'INR' ? 0 : 2;
  const roundedAmount = Number(finalAmount.toFixed(maxDecimals));
  
  // Optionally round the monthly equivalent for cleaner display
  if (perMonthEquivalent !== undefined) {
    perMonthEquivalent = Number(perMonthEquivalent.toFixed(maxDecimals));
  }

  // Use Intl.NumberFormat for native locale-correct currency formatting
  // USD/EUR formatting usually defaults to 2 decimals, INR to 0/2 depending on exact locale
  const formatter = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: maxDecimals,
    maximumFractionDigits: maxDecimals,
  });

  return {
    amount: roundedAmount,
    formatted: formatter.format(roundedAmount),
    currency,
    cycle,
    tierId,
    perMonthEquivalent
  };
}
