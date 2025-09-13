'use client';

import { useEffect } from 'react';

export default function MobileScrollEffect() {
  useEffect(() => {
    // Only run on mobile devices
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const observerOptions = {
        root: null, // use the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when at least 10% of the target is visible
      };

      // Callback for IntersectionObserver
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add the 'visible' class to elements with 'scroll-reveal' class when they become visible
            if (entry.target.classList.contains('scroll-reveal')) {
              entry.target.classList.add('visible');
            }
            
            // Optional: trigger any touch-ripple effect
            if (entry.target.classList.contains('auto-ripple')) {
              entry.target.classList.add('touch-ripple');
              
              // Remove and re-add the ripple class after animation completes
              setTimeout(() => {
                entry.target.classList.remove('touch-ripple');
              }, 800);
            }
          }
        });
      };

      // Create the observer
      const observer = new IntersectionObserver(observerCallback, observerOptions);

      // Target all elements with the appropriate classes
      const scrollElements = document.querySelectorAll('.scroll-reveal, .auto-ripple');
      scrollElements.forEach(element => {
        observer.observe(element);
      });

      // Clean up the observer on component unmount
      return () => {
        scrollElements.forEach(element => {
          observer.unobserve(element);
        });
      };
    }
  }, []);

  // This component doesn't render anything visible
  return null;
} 