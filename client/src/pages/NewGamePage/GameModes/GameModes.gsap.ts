import { useEffect } from 'react';
import { gsap } from 'gsap';
import { playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(function animateContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideUp = { y: '1em', ...fadeIn };
    const slideDown = { y: '-2em', ...fadeIn };

    gsap
      .timeline({ delay: 0.5 })
      .from('.primary-action', slideUp)
      .from('.sliding-button', { ...slideDown, stagger: 0.15 });
  }, []);

  useEffect(function playListSound() {
    console.log('game modes');
    playSound('swipeRight', 1);
  }, []);
}
