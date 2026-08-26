'use client';

import { useEffect } from 'react';

export default function SmoothScrollHandler() {
  useEffect(() => {
    // Handle in-page smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Match #anchor or /#anchor
      if (href.startsWith('#') || href.startsWith('/#')) {
        const hash = href.startsWith('/#') ? href.slice(1) : href;
        
        // If clicking # or / to scroll to top
        if (hash === '#' || hash === '') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', window.location.pathname);
          return;
        }

        const targetId = hash.slice(1);
        const element = document.getElementById(targetId);

        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', hash);
        }
      }
    };

    // Handle initial load if hash is present
    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}
