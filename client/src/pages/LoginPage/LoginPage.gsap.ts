import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation() {
  useEffect(fadeInContent, []);

  function fadeInContent() {
    const slideDown = mix('topBig', 'hidden');
    const slideRight: gsap.TweenVars = {
      ...mix('leftBig', 'hidden'),
      stagger: 0.2
    };

    gsap
      .timeline({ delay: 0.5 })
      .from('.heading', slideDown)
      .from('.sliding-button', slideRight, '+=0.2');
  }
}
