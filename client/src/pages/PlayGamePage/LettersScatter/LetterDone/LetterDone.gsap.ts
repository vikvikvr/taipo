import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useAnimation(letter: string) {
  const containerRef = useRef(null);
  useEffect(zoomOutAndFade, [letter]);

  function zoomOutAndFade() {
    if (!containerRef.current) {
      return;
    }
    gsap.to(containerRef.current, {
      scale: 8,
      translateY: '-1em',
      opacity: 0,
      duration: 1
    });
  }

  return { containerRef };
}
