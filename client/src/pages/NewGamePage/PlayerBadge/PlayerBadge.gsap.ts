import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';

export function useAnimation(isLoggedIn: boolean, isLoggingOut: boolean) {
  useEffect(appear, [isLoggedIn, isLoggingOut]);
  useEffect(disappear, [isLoggingOut]);

  function appear() {
    if (isLoggedIn && !isLoggingOut) {
      const show: gsap.TweenVars = { ...mix('showing'), delay: 1 };

      gsap.to('.player-badge', show);
    }
  }

  function disappear() {
    if (isLoggingOut) {
      const slideUp = mix('hidden', 'topBig');

      gsap.to('.player-badge', slideUp);
    }
  }
}
