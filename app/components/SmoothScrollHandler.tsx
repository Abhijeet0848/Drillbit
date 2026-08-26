'use client';

import { useEffect } from 'react';

export default function SmoothScrollHandler() {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh so page stays at top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top on initial page load / refresh unless user explicitly clicked a link
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

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
          return;
        }

        const targetId = hash.slice(1);
        const element = document.getElementById(targetId);

        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}
