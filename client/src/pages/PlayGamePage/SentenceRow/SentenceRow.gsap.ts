import { useEffect } from 'react';
import { gsap } from 'services/animationService';

export function useAnimation() {
  useEffect(fallFromAbove, []);

  function fallFromAbove() {
    const slideDownStaggered: gsap.TweenVars = {
      opacity: 0,
      y: -200,
      stagger: 0.1
    };

    gsap.from('.letter', slideDownStaggered);
  }
}
