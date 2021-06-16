import { useEffect, useRef } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation(isBlocked: boolean) {
  const letterRef = useRef(null);
  useEffect(verticalOscillation, []);
  useEffect(rotateBlockedLetter, [isBlocked]);

  function verticalOscillation() {
    if (!letterRef.current) {
      return;
    }

    const upAndDown: gsap.TweenVars = {
      translateY: '+=10',
      ...mix('infinite'),
      delay: Math.random() + 1.5,
      ease: 'linear'
    };

    gsap.to(letterRef.current, upAndDown);
  }

  function rotateBlockedLetter() {
    if (!letterRef.current) {
      return;
    }

    const turnLeft: gsap.TweenVars = {
      rotate: isBlocked ? -10 : 0
    };

    gsap.to(letterRef.current, turnLeft);
  }

  return { letterRef };
}
