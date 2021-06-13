import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(function fadeInContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideDown = { y: '2em', ...fadeIn };
    const slideLeft = { x: '-4em', ...fadeIn, stagger: 0.2 };

    gsap
      .timeline({ delay: 0.5 })
      .from('.heading', slideDown)
      .from('.sliding-button', slideLeft, '+=0.2');
  }, []);
}
