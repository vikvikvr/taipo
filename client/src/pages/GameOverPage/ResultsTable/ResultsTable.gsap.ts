import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(animatePageContent, []);

  function animatePageContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideUp = { y: '2em', ...fadeIn, stagger: 1.5 };

    gsap
      .timeline({ delay: 0.5 })
      .from('.result-row', slideUp)
      .from('.header', fadeIn, 0.5)
      .from('.sliding-button', slideUp);
  }
}
