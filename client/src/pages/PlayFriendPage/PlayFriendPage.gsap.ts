import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { playSound } from 'services/audioService';

export function useAnimation(playSounds: boolean) {
  useEffect(fadeAndSlideContent, []);
  useEffect(playContentSound, [playSounds]);

  function fadeAndSlideContent() {
    const slideUp = mix('bottom', 'hidden');
    const slideUpBig = mix('bottomBig', 'hidden');
    const slideDown = mix('top', 'hidden');
    const slideDownBig = mix('topBig', 'hidden');
    const stagger = 0.15;

    gsap
      .timeline({ delay: 0.5 })
      .from('.primary-action', slideUp)
      .from('.sliding-button', slideUpBig, stagger)
      .from('.secondary-action', slideDown, 1)
      .from('.sliding-input', { ...slideDownBig, duration: 0.6 }, 1 + stagger);
  }

  function playContentSound() {
    if (playSounds) {
      playSound('swipeRight', 0.6);
    }
  }
}
