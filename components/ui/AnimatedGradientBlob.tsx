"use client";

import React from 'react';

interface AnimatedGradientBlobProps {
  colorFrom: string;
  colorTo: string;
  className?: string;
}

export default function AnimatedGradientBlob({ colorFrom, colorTo, className = '' }: AnimatedGradientBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute blur-3xl opacity-20 ${className}`}
      style={{
        background: `radial-gradient(circle at center, ${colorFrom} 0%, ${colorTo} 100%)`,
        animation: 'blobDrift 10s infinite alternate cubic-bezier(0.65, 0, 0.35, 1)',
      }}
    />
  );
}
