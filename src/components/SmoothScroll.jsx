'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

const SmoothScroll = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    const handleAnchorClick = e => {
      const target = e.target.closest('a[href*="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      const hash = href.includes('#') ? '#' + href.split('#')[1] : null;
      if (!hash || hash === '#') return;

      const isSamePage =
        href.startsWith('#') ||
        window.location.pathname === href.split('#')[0] ||
        (href.split('#')[0] === '/' && window.location.pathname === '/');

      if (!isSamePage) return;
      const element = document.querySelector(hash);
      if (!element) return;
      e.preventDefault();

      lenis.scrollTo(element, {
        offset: -80,
        duration: 1.5,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      window.history.pushState(null, '', href);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return null;
};

export default SmoothScroll;
