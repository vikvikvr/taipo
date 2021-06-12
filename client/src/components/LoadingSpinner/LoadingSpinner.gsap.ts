import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  useEffect(pulsateCircles, []);

  function pulsateCircles() {
    const defaults = {
      duration: 0.3,
      y: '1em',
      yoyo: true,
      repeat: -1,
      ease: 'linear'
    };
    gsap
      .timeline({ defaults })
      .to('#first-circle', {}, 0)
      .to('#second-circle', {}, 0.15)
      .to('#third-circle', {}, 0.3);
  }
}
