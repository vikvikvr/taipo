import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation() {
  useEffect(pulsateCircles, []);

  function pulsateCircles() {
    const defaults = mix('infinite', 'bottom', 'linear');

    gsap
      .timeline({ defaults })
      .to('#first-circle', {}, 0)
      .to('#second-circle', {}, 0.15)
      .to('#third-circle', {}, 0.3);
  }
}
