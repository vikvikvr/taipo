import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation(isActive: boolean) {
  useEffect(animateOpacity, [isActive]);

  function animateOpacity() {
    const to = mix(isActive ? 'showing' : 'hidden');

    gsap.to('.blocked-overlay', to);
  }
}
