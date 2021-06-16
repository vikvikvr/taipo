import { useEffect, useRef } from 'react';
import { gsap } from 'services/animationService';

export function useAnimation(position: number, blocked: boolean) {
  const container = useRef(null);
  const img = useRef(null);
  useEffect(translateByPosition, [position]);
  useEffect(flipWhenBlocked, [blocked]);

  function translateByPosition() {
    if (!container.current) {
      return;
    }

    const offsetX: gsap.TweenVars = { translateX: `${position * 4}em` };

    gsap.to(container.current, offsetX);
  }

  function flipWhenBlocked() {
    if (!img.current) {
      return;
    }

    const flip: gsap.TweenVars = { rotate: blocked ? '180deg' : '0deg' };

    gsap.to(img.current, flip);
  }

  return { container, img };
}
