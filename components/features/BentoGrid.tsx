import React from "react";
import BentoCard from "./BentoCard";
import { Feature } from "@/lib/feature-data";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface BentoGridProps {
  features: Feature[];
  activeIndex: number;
  onHoverCard: (index: number) => void;
}

export default function BentoGrid({ features, activeIndex, onHoverCard }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <RevealOnScroll key={feature.id} delay={index * 60} className={`${feature.colSpan} ${feature.rowSpan} h-full`}>
          <BentoCard
            feature={feature}
            index={index}
            isActive={activeIndex === index}
            onHover={onHoverCard}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}
