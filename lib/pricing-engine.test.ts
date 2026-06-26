import { computePrice } from './pricing-engine';
import { Currency, BillingCycle, TierId, tierConfigs, currencyConfigs } from './pricing-matrix';

function runTests() {
  const currencies = Object.keys(currencyConfigs) as Currency[];
  const cycles: BillingCycle[] = ['monthly', 'annual'];
  
  console.log("=== PRICING ENGINE VERIFICATION ===");
  console.log("Tier | Currency | Cycle | Final Price | Monthly Equivalent");
  console.log("---------------------------------------------------------");

  for (const tier of tierConfigs) {
    for (const currency of currencies) {
      for (const cycle of cycles) {
        const result = computePrice(tier.id, currency, cycle);
        const monthlyEqStr = result.perMonthEquivalent 
          ? `(${result.perMonthEquivalent}/mo)` 
          : 'N/A';
        
        console.log(
          `${tier.name.padEnd(10)} | ${currency} | ${cycle.padEnd(7)} | ${result.formatted.padEnd(12)} | ${monthlyEqStr}`
        );
      }
    }
  }
}

runTests();
