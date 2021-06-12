import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation(isActive: boolean) {
  useEffect(animateOpacity, [isActive]);

  function animateOpacity() {
    gsap.to('.blocked-overlay', {
      opacity: isActive ? 1 : 0,
      ease: 'power3.out'
    });
  }
}
