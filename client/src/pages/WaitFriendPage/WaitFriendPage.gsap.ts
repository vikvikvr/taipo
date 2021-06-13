import { useEffect } from 'react';
import { gsap } from 'gsap';
import { fadeInSound, playSound } from 'services/audioService';

export function useAnimation(playSounds: boolean) {
  useEffect(playLoadingSound, [playSounds]);
  useEffect(enterAnimation, []);

  function enterAnimation() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const stagger = 0.15;

    gsap
      .timeline({ delay: 0.5 })
      .from('.subtitle', { y: '1.5em', ...fadeIn }, 0)
      .from('.sliding-input', { y: '2em', ...fadeIn }, stagger)
      .from('.reason', { y: '-1.5em', ...fadeIn }, 1)
      .from('.loading', { y: '-2em', duration: 0.6, ...fadeIn }, 1 + stagger);
  }

  function playLoadingSound() {
    if (playSounds) {
      playSound('swipeRight', 0.5);
      fadeInSound('loading', 1.5);
    }
  }
}
