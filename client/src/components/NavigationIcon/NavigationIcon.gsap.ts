import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(slideLeft, []);

  function slideLeft() {
    const from = { x: '-1em', delay: 1.3, duration: 0.6, ease: 'power3.out' };
    const to = { opacity: 0.7 };
    gsap.fromTo('.navigation-icon', from, to);
  }
}
