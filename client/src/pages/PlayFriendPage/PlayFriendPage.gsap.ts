import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(fadeAndSlideContent, []);

  function fadeAndSlideContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const stagger = 0.15;
    gsap
      .timeline({ delay: 0.5 })
      .from('.primary-action', { y: '1.5em', ...fadeIn })
      .from('.sliding-button', { y: '2em', ...fadeIn }, stagger)
      .from('.secondary-action', { y: '-1.5em', ...fadeIn }, 1)
      .from(
        '.sliding-input',
        { y: '-2em', duration: 0.6, ...fadeIn },
        1 + stagger
      );
  }
}
