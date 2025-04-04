import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top of the page when navigating between routes
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle hash links (e.g., #section) to ensure they start from the top
  useEffect(() => {
    // If there's a hash in the URL, we still want to start from the top
    // before potentially scrolling to the hash target
    if (hash) {
      // First scroll to top
      window.scrollTo(0, 0);
      
      // Then try to find and scroll to the element (if it exists)
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  // Add click handler to all internal links to ensure they scroll to top
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      // Only handle internal links (not external links or links with hash)
      if (link && 
          link.href.startsWith(window.location.origin) && 
          !link.href.includes('#') &&
          !link.getAttribute('target')) {
        window.scrollTo(0, 0);
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return null;
}
