import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useAnimation(position: number, blocked: boolean) {
  const container = useRef(null);
  const img = useRef(null);
  useEffect(translateByPosition, [position]);
  useEffect(flipWhenBlocked, [blocked]);

  function translateByPosition() {
    if (!container.current) {
      return;
    }
    const to = { translateX: `${position * 4}em` };
    gsap.to(container.current, to);
  }

  function flipWhenBlocked() {
    if (!img.current) {
      return;
    }
    const to = { rotate: blocked ? '180deg' : '0deg' };
    gsap.to(img.current, to);
  }

  return { container, img };
}
