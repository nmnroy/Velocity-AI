import React from "react";
import { Feature } from "@/lib/feature-data";

interface BentoCardProps {
  feature: Feature;
  index: number;
  isActive: boolean;
  onHover: (index: number) => void;
}

export default function BentoCard({ feature, index, isActive, onHover }: BentoCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-card-bg border overflow-hidden p-6 sm:p-8 flex flex-col justify-start transition-all duration-[200ms] ease-out h-full ${
        isActive ? "border-accent shadow-lg shadow-accent/20 scale-[1.02]" : "border-ink/10 hover:border-ink/30"
      }`}
      onMouseEnter={() => onHover(index)}
    >
      {/* Background Gradient Effect on Active */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent transition-opacity duration-[200ms] ease-out pointer-events-none ${
          isActive ? "opacity-100" : "opacity-0"
        }`} 
      />
      
      <div className="relative z-10 flex flex-col items-start text-left h-full">
        <div className={`w-12 h-12 rounded-full mb-6 flex items-center justify-center transition-colors duration-[200ms] border ${
          isActive ? "bg-accent text-primary-dark border-transparent" : "bg-card-bg text-text-primary border-ink/20"
        }`}>
          {/* Fallback simple icon representation since we don't have SVGs yet */}
          <span className="font-mono text-sm font-bold uppercase">{feature.icon.substring(0, 2)}</span>
        </div>
        
        <h3 className={`text-xl font-bold mb-3 font-mono transition-colors duration-[200ms] ${
          isActive ? "text-accent" : "text-text-primary"
        }`}>
          {feature.title}
        </h3>
        
        <p className="text-ink/80 text-sm md:text-base font-sans mt-auto">
          {feature.description}
        </p>
      </div>
    </div>
  );
}
