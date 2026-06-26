import React from "react";
import FeatureResponsiveSwitch from "@/components/features/FeatureResponsiveSwitch";
import { FeatureActiveProvider } from "@/components/features/FeatureActiveContext";
import { features } from "@/lib/feature-data";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FeatureSection() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-20 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll delay={0} className="mb-16 text-center md:text-left">
          <h2 id="features-heading" className="text-3xl md:text-5xl font-mono font-bold text-text-primary mb-4">
            The Blueprint
          </h2>
          <p className="text-ink/70 text-lg max-w-2xl font-sans md:mx-0 mx-auto">
            Presenting the core features via a modern Bento-Grid layout on desktop, refactoring seamlessly into a fluid, touch-optimized Accordion list on mobile.
          </p>
        </RevealOnScroll>

        <FeatureActiveProvider>
          <FeatureResponsiveSwitch features={features} />
        </FeatureActiveProvider>
      </div>
    </section>
  );
}
