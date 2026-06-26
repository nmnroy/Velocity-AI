"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame to throttle scroll events
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check in case the page loads pre-scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-200 ease-out border-b ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm border-ink/10 shadow-sm" 
          : "bg-background border-transparent shadow-none"
      }`}
    >
      <nav aria-label="Primary" className="max-w-7xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        <div className="flex-shrink-0 font-bold text-lg sm:text-xl">
          <Link href="/">Velocity AI</Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          <ul className="flex items-center gap-2 sm:gap-6 text-xs sm:text-base">
            <li>
              <a href="#features" className="hover:text-accent focus-visible:text-accent transition-colors">Features</a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-accent focus-visible:text-accent transition-colors">Pricing</a>
            </li>
            <li>
              <a href="#proof" className="hover:text-accent focus-visible:text-accent transition-colors whitespace-nowrap">Trusted By</a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

    </header>
  );
}
