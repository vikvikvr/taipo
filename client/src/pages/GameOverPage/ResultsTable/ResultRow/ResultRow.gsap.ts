import { useEffect } from 'react';
import { gsap } from 'gsap';
import { star } from 'services/audioService';

export function useAnimation() {
  useEffect(slideStarsUpStaggered, []);
  useEffect(playStarsSound, []);

  function slideStarsUpStaggered() {
    const slideUp = {
      opacity: 1,
      ease: 'power3.out',
      delay: 0.8,
      translateY: '-1.5em',
      stagger: 0.1
    };
    gsap.to('.star', slideUp);
  }

  function playStarsSound() {
    setTimeout(() => star.play(), 800);
  }
}
