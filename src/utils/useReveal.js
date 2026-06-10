import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to trigger GSAP reveals on scroll.
 * Scan and animate .reveal elements and .stagger-group containers.
 * @param {Array} dependencies - React useEffect dependencies to trigger re-calculation
 */
export default function useReveal(dependencies = []) {
  useEffect(() => {
    // Respect OS level prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Instantly make everything visible if reduced motion is requested
      const allReveals = document.querySelectorAll('.reveal, .stagger-item');
      allReveals.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Single reveals (fade up + opacity)
      const reveals = document.querySelectorAll('.reveal:not(.stagger-item)');
      reveals.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });

      // 2. Staggered reveals for groups (e.g. grids)
      const staggerGroups = document.querySelectorAll('.stagger-group');
      staggerGroups.forEach((group) => {
        const items = group.querySelectorAll('.stagger-item');
        if (items.length === 0) return;

        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });
    });

    // Clean up ScrollTrigger instances and GSAP context on unmount
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, dependencies);
}
