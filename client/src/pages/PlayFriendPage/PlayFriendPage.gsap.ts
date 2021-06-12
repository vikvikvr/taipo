import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(fadeAndSlideContent, []);

  function fadeAndSlideContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    gsap
      .timeline({ delay: 0.5 })
      .from('.sentence-1', { y: '-1em', ...fadeIn })
      .from('.sliding-button', { y: '2em', ...fadeIn }, 0.5)
      .from('.sentence-2', { y: '2em', ...fadeIn }, 0.65)
      .from('.sliding-input', { y: '2em', ...fadeIn }, 0.8);
  }
}
