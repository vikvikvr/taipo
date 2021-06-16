import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(animatePageContent, []);

  function animatePageContent() {
    const slideUp = mix('bottomBig', 'hidden', 'hidden');
    const slideDown = mix('top', 'hidden');
    const slideUpStaggered = {
      ...slideUp,
      stagger: 0.07,
      onStart: playStarSound
    };

    function playStarSound() {
      playSound('star');
    }

    playSound('swipeRight', 2.7);

    gsap
      .timeline({ delay: 0.5 })
      .from('.winner', slideUp)
      .from('.loser', slideUp, 0.3)
      .from('.star', slideUpStaggered, 0.9)
      .from('.header', slideDown, 1.5)
      .from('.sliding-button', slideUp, 2.2);
  }
}
