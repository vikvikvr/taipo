import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation(left: number) {
  useEffect(changeNumber, [left]);

  function changeNumber() {
    const fadeIn = { opacity: 1, scale: 1.5, duration: 1 };
    const fadeOut = { opacity: 0, scale: 2, duration: 1, delay: 0.5 };
    if (left === 3) {
      gsap.to('.three', fadeIn);
      gsap.to('.three', fadeOut);
    } else if (left === 2) {
      gsap.to('.two', fadeIn);
      gsap.to('.two', fadeOut);
    } else if (left === 1) {
      gsap.to('.one', fadeIn);
      gsap.to('.one', fadeOut);
    }
  }
}
