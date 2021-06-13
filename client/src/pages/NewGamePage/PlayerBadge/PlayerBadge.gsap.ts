import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation(isLoggedIn: boolean, isLoggingOut: boolean) {
  useEffect(appear, [isLoggedIn, isLoggingOut]);
  useEffect(disappear, [isLoggingOut]);

  function appear() {
    if (isLoggedIn && !isLoggingOut) {
      const to = { opacity: 1, delay: 1, ease: 'power3.out' };
      gsap.to('.player-badge', to);
    }
  }

  function disappear() {
    if (isLoggingOut) {
      const to = { y: '-2em', opacity: 0, ease: 'power3.out' };
      gsap.to('.player-badge', to);
    }
  }
}
