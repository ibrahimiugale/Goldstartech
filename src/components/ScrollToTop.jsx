import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component to reset scroll position on page transitions.
 * Supports smooth scrolling to specific anchor IDs if a URL hash is present.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for rendering to complete, then find and scroll to the anchor element
      const timer = setTimeout(() => {
        const elementId = hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);

      return () => clearTimeout(timer);
    } else {
      // Scroll to the very top if no hash is present
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
