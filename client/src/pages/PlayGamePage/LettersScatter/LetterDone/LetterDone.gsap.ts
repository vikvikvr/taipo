import { useEffect, useRef } from 'react';
import { gsap } from 'services/animationService';

export function useAnimation(letter: string) {
  const containerRef = useRef(null);
  useEffect(zoomOutAndFade, [letter]);

  function zoomOutAndFade() {
    if (!containerRef.current) {
      return;
    }

    const outAndFade: gsap.TweenVars = {
      scale: 8,
      opacity: 0,
      duration: 1
    };

    gsap.to(containerRef.current, outAndFade);
  }

  return { containerRef };
}
