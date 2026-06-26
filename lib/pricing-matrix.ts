export type Currency = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'monthly' | 'annual';
export type TierId = 'starter' | 'growth' | 'enterprise';

export interface CurrencyConfig {
  symbol: string;
  code: Currency;
  // Tariff multiplier represents a regional markup/cost adjustment (e.g. 1.0 = base, 1.08 = 8% VAT overhead)
  tariffMultiplier: number;
  // FX-style conversion rate from the USD base rate
  baseRateMultiplier: number;
}

export interface TierConfig {
  id: TierId;
  name: string;
  description: string;
  baseMonthlyRateUSD: number;
  featureHighlights: string[];
  isFeatured: boolean;
}

// A flat 20% discount applied to annual billing (e.g. pay 80% of the monthly rate)
export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8;

export const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    code: 'USD',
    tariffMultiplier: 1.0, // Anchor currency, no tariff
    baseRateMultiplier: 1.0, // Anchor currency
  },
  EUR: {
    symbol: '€',
    code: 'EUR',
    // Assume an 8% regional compliance/VAT-handling overhead factor for EUR
    tariffMultiplier: 1.08,
    // FX rate: roughly 0.92 EUR per 1 USD
    baseRateMultiplier: 0.92,
  },
  INR: {
    symbol: '₹',
    code: 'INR',
    // Assume a slight purchasing power parity discount/incentive for the region
    tariffMultiplier: 0.9,
    // FX rate: roughly 83 INR per 1 USD
    baseRateMultiplier: 83.0,
  }
};

export const tierConfigs: TierConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small teams exploring AI automation.',
    baseMonthlyRateUSD: 29,
    featureHighlights: [
      'Up to 1,000 tasks/month',
      'Basic predictive models',
      'Community support',
      'Standard integrations'
    ],
    isFeatured: false
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Advanced capabilities for scaling operations and workflows.',
    baseMonthlyRateUSD: 99,
    featureHighlights: [
      'Up to 10,000 tasks/month',
      'Custom predictive models',
      'Priority email support',
      'Advanced API access'
    ],
    isFeatured: true // Drives "Most Popular" UI treatment
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Bank-grade security and unlimited scale for large organizations.',
    baseMonthlyRateUSD: 299,
    featureHighlights: [
      'Unlimited tasks',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom SLA & SOC2 report'
    ],
    isFeatured: false
  }
];
