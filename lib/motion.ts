import { tokens } from './design-tokens';

// Stagger delay arithmetic:
// 5 staggered elements (delays: 0ms, 60ms, 120ms, 180ms, 240ms)
// The last element starts animating at 240ms.
// The animation duration is typically ~200ms.
// Total sequence time = 240ms + 200ms = 440ms, which safely stays inside the 500ms budget.
export const staggerDelay = 60;

export const keyframeNames = {
  fadeUp: 'heroFadeUp',
  blobDrift: 'blobDrift',
  staggerChild: 'staggerChildIn',
} as const;

export const durations = tokens.motion;

export const easings = {
  microOut: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out
  structuralInOut: 'cubic-bezier(0.65, 0, 0.35, 1)', // ease-in-out
} as const;
