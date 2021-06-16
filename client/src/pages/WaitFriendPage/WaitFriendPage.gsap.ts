import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { fadeInSound, fadeOutSound, playSound } from 'services/audioService';

export function useAnimation(playSounds: boolean) {
  useEffect(playLoadingSound, [playSounds]);
  useEffect(enterAnimation, []);

  function enterAnimation() {
    const stagger = 0.15;

    gsap
      .timeline({ delay: 0.5 })
      .from('.subtitle', mix('bottomBig', 'hidden'), 0)
      .from('.sliding-input', mix('bottom', 'hidden'), stagger)
      .from('.reason', mix('top', 'hidden'), 1)
      .from('.loading', mix('topBig', 'hidden'), 1 + stagger);
  }

  function playLoadingSound() {
    if (playSounds) {
      playSound('swipeRight', 0.5);
      fadeInSound('loading', 1.5);
      fadeOutSound('background', 1.5, false);
    }
  }
}
