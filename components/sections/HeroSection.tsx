"use client";

import { useState, useEffect } from 'react';
import AnimatedGradientBlob from '@/components/ui/AnimatedGradientBlob';
import { tokens } from '@/lib/design-tokens';
import { staggerDelay, easings } from '@/lib/motion';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // We use this flag to trigger the entrance animation once per page load.
  // Note: This mount-effect trigger pattern is an exception specifically for the Hero section.
  // Other sections will use IntersectionObserver for scroll-reveals instead (Prompt 9).
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  // Arithmetic for 500ms budget:
  // Staggered elements up to order 4 (delays: 0ms, 60ms, 120ms, 180ms, 240ms)
  // The last element (stat strip) starts animating at 240ms.
  // The animation duration is 200ms.
  // Total sequence time = 240ms + 200ms = 440ms, safely inside the 500ms budget.
  const getAnimationProps = (order: number) => {
    return {
      className: mounted 
        ? "" 
        : "opacity-0 translate-y-6",
      style: mounted 
        ? { 
            animation: `staggerChildIn 600ms cubic-bezier(0.16, 1, 0.3, 1) ${order * staggerDelay}ms both`
          } 
        : {}
    };
  };

  return (
    <section 
      id="hero" 
      aria-labelledby="hero-heading" 
      className="relative overflow-hidden scroll-mt-20 px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center min-h-[85vh]"
    >
      {/* Ambient background motion */}
      <AnimatedGradientBlob 
        colorFrom={tokens.colors.accent} 
        colorTo={tokens.colors.accentSecondary} 
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] z-0"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* a. Eyebrow (Order 0: 0ms) */}
        <span 
          className={`font-mono text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-accent-secondary ${getAnimationProps(0).className}`}
          style={getAnimationProps(0).style}
        >
          AI-Driven Automation Platform
        </span>

        {/* b. Headline (Order 1: 60ms) */}
        <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight leading-[1.1]">
          <span 
            className={`block text-ink ${getAnimationProps(1).className}`}
            style={getAnimationProps(1).style}
          >
            Automate your data workflow.
          </span>
          <span 
            className={`block text-ink/70 mt-2 ${getAnimationProps(1.5).className}`}
            style={getAnimationProps(1.5).style}
          >
            Unlock human potential.
          </span>
        </h1>

        {/* c. Subheadline (Order 2: 120ms) */}
        <p 
          className={`text-base sm:text-lg md:text-xl text-ink/80 max-w-2xl mx-auto ${getAnimationProps(2).className}`}
          style={getAnimationProps(2).style}
        >
          Seamlessly integrate artificial intelligence into your existing pipelines. 
          Transform unstructured data into actionable insights with zero manual intervention.
        </p>

        {/* d. CTA Buttons (Order 3: 180ms) */}
        <div 
          className={`flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto ${getAnimationProps(3).className}`}
          style={getAnimationProps(3).style}
        >
          <a 
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 bg-accent text-ink font-semibold rounded-lg transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Building Free
          </a>
          <a 
            href="#features"
            className="w-full sm:w-auto px-8 py-4 border-2 border-ink/10 text-ink font-semibold rounded-lg transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg hover:border-ink/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Explore Features
          </a>
        </div>

        {/* e. Trust/Stat Strip (Order 4: 240ms) */}
        <div 
          className={`mt-12 flex flex-col sm:flex-row items-center gap-8 sm:gap-16 border-t border-ink/10 pt-8 w-full justify-center ${getAnimationProps(4).className}`}
          style={getAnimationProps(4).style}
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-mono font-bold text-ink">10x</span>
            <span className="text-sm text-ink/60 mt-1">Faster Processing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-mono font-bold text-ink">99.9%</span>
            <span className="text-sm text-ink/60 mt-1">Accuracy Guaranteed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-mono font-bold text-ink">5k+</span>
            <span className="text-sm text-ink/60 mt-1">Active Developers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
