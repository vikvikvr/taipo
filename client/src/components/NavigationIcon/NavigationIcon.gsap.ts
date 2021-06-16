import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation() {
  useEffect(slideLeft, []);

  function slideLeft() {
    const left: gsap.TweenVars = { ...mix('left'), delay: 1.3, duration: 0.6 };

    gsap.fromTo('.navigation-icon', left, { opacity: 0.7 });
  }
}
