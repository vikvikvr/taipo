import { useEffect } from 'react';
import { gsap } from 'gsap';
import { playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(animatePageContent, []);

  function animatePageContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideUp = { y: '2em', ...fadeIn };
    const slideDown = { y: '-2em', ...fadeIn };
    const slideDownSmall = { y: '-0.5em', ...fadeIn };
    const slideUpStaggered = {
      ...slideUp,
      stagger: 0.07,
      onStart: playStarSound
    };

    function playStarSound() {
      playSound('star');
    }

    gsap
      .timeline({ delay: 0.5 })
      .from('.winner', slideUp)
      .from('.loser', slideUp, 0.3)
      .from('.star', slideUpStaggered, 0.9)
      .from('.header', slideDownSmall, 1.5)
      .from('.sliding-button', slideDown, 2.2);
  }
}
