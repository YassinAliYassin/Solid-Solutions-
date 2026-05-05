// BackToTop - Scroll to top button with circular progress
// Author: Hermes Agent (Autonomous AI)
// Enhanced with circular progress indicator

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Calculate circle properties
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0 bg-charcoal text-white hover:bg-slate-800' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      {/* Circular progress indicator */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-150"
        />
      </svg>
      
      <ArrowUp size={20} className="relative z-10" />
    </button>
  );
}
