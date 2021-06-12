import { useEffect } from 'react';
import { gsap } from 'gsap';
import { swipeRight } from 'services/audioService';

export function useAnimation() {
  const delay = 0.5;
  useEffect(fadeInContent, []);
  useEffect(playListSound, []);

  function playListSound() {
    setTimeout(() => swipeRight.play(), 1_200);
  }

  function fadeInContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideDown = { y: '2em', ...fadeIn };
    const slideLeft = { x: '-4em', ...fadeIn, stagger: 0.2 };
    gsap
      .timeline({ delay })
      .from('.heading', slideDown)
      .from('.sliding-button', slideLeft, '+=0.2');
  }
}
