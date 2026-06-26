"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { FeatureActiveContext } from "./FeatureActiveContext";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Feature } from "@/lib/feature-data";
import BentoGrid from "./BentoGrid";
import AccordionPanel from "./AccordionPanel";

interface FeatureResponsiveSwitchProps {
  features: Feature[];
}

import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function FeatureResponsiveSwitch({ features }: FeatureResponsiveSwitchProps) {
  const { isDesktop } = useBreakpoint();
  const { activeIndex, setActiveIndex } = useContext(FeatureActiveContext);
  
  // Track previous desktop state to detect crossing the breakpoint
  const prevIsDesktopRef = useRef<boolean>(isDesktop);
  const [justActivated, setJustActivated] = useState(false);

  useEffect(() => {
    // If we crossed from Desktop to Mobile AND an index was active
    if (prevIsDesktopRef.current === true && isDesktop === false && activeIndex !== null) {
      setJustActivated(true);
      // Reset the flag shortly after to allow smooth transition on future clicks
      const timer = setTimeout(() => setJustActivated(false), 500);
      return () => clearTimeout(timer);
    }
    prevIsDesktopRef.current = isDesktop;
  }, [isDesktop, activeIndex]);

  // Context Lock is satisfied by both views subscribing to the same FeatureActiveContext; 
  // no explicit transfer logic is needed because the source of truth never duplicates across breakpoints.

  if (isDesktop) {
    return (
      <BentoGrid 
        features={features} 
        activeIndex={activeIndex ?? -1} 
        onHoverCard={(index) => setActiveIndex(index)} 
      />
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-card-bg/50 rounded-2xl p-4 sm:p-6 border border-ink/5">
      {features.map((feature, index) => (
        <RevealOnScroll key={feature.id} delay={index * 60}>
          <AccordionPanel
            feature={feature}
            index={index}
            isOpen={activeIndex === index}
            onToggle={(i) => setActiveIndex(activeIndex === i ? null : i)}
            justActivated={justActivated && activeIndex === index}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}
