import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP') return;

    if (hash) {
      let attempts = 0;
      const timer = setInterval(() => {
        const target = document.getElementById(hash.slice(1));
        attempts += 1;

        if (target || attempts >= 30) {
          clearInterval(timer);
          target?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
      return () => clearInterval(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search, hash]);

  return null;
}
