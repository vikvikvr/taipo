import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useAnimation(isBlocked: boolean) {
  const letterRef = useRef(null);
  useEffect(verticalOscillation, []);
  useEffect(rotateBlockedLetter, [isBlocked]);

  function verticalOscillation() {
    if (!letterRef.current) {
      return;
    }
    gsap.to(letterRef.current, {
      translateY: '+=10',
      yoyo: true,
      repeat: -1,
      delay: Math.random() + 1.5,
      ease: 'linear'
    });
  }

  function rotateBlockedLetter() {
    if (!letterRef.current) {
      return;
    }
    gsap.to(letterRef.current, {
      rotate: isBlocked ? -10 : 0,
      ease: 'power3.out'
    });
  }

  return { letterRef };
}
