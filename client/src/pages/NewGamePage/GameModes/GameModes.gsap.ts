import { useEffect } from 'react';
import { gsap } from 'gsap';
import { swipeRight } from 'services/audioService';

export function useAnimation() {
  useEffect(animateContent, []);
  useEffect(playListSound, []);

  function animateContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    gsap
      .timeline({ delay: 0.5 })
      .from('.question', { y: '1em', ...fadeIn })
      .from('.sliding-button', { y: '-2em', stagger: 0.15, ...fadeIn });
  }

  function playListSound() {
    setTimeout(() => swipeRight.play(), 1_200);
  }
}
