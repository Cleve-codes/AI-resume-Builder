'use client'
import React, { createContext, useContext, useEffect, ReactNode } from 'react';

type AnimationContextType = {
  setupAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const setupAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  };

  useEffect(() => {
    setupAnimations();
  }, []);

  return (
    <AnimationContext.Provider value={{ setupAnimations }}>
      {children}
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
} 