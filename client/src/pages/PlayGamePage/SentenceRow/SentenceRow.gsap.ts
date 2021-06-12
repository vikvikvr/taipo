import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(fallFromAbove, []);

  function fallFromAbove() {
    const from = { opacity: 0, y: -200, stagger: 0.1, ease: 'power3.out' };
    gsap.timeline().from('.letter', from);
  }
}
