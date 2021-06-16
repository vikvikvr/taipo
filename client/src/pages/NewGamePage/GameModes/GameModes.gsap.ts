import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(animateContent, []);
  useEffect(playListSound, []);

  function animateContent() {
    const slideUp = mix('bottom', 'hidden');
    const slideDownStaggered: gsap.TweenVars = {
      ...mix('topBig', 'hidden'),
      stagger: 0.15
    };

    gsap
      .timeline({ delay: 0.5 })
      .from('.primary-action', slideUp)
      .from('.sliding-button', slideDownStaggered);
  }

  function playListSound() {
    playSound('swipeRight', 1);
  }
}
