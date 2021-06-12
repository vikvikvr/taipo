import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(animateContent, []);

  function animateContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideUp = { y: '2em', ...fadeIn };
    const slideDown = { y: '-1em', ...fadeIn };
    gsap
      .timeline({ delay: 0.5 })
      .from('.hello', slideUp)
      .from('.user-picture', slideUp, 0.15)
      .from('.message', slideDown, 0.85)
      .from('.loading', slideDown, 1);
  }
}
