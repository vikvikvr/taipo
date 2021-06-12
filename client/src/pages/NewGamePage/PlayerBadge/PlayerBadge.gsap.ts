import { useEffect } from 'react';
import { gsap } from 'gsap';

export function useAnimation(isLoggedIn: boolean, isLoggingOut: boolean) {
  useEffect(appear, [isLoggedIn, isLoggingOut]);
  useEffect(disappear, [isLoggingOut]);

  function appear() {
    if (isLoggedIn && !isLoggingOut) {
      const from = { y: '2em' };
      const to = { y: 0, opacity: 1, delay: 2, ease: 'power3.out' };
      gsap.fromTo('.player-badge', from, to);
    }
  }

  function disappear() {
    if (isLoggingOut) {
      const to = { y: '-2em', opacity: 0, ease: 'power3.out' };
      gsap.to('.player-badge', to);
    }
  }
}
