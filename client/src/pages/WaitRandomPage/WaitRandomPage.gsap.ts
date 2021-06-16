import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { fadeInSound, fadeOutSound, playSound } from 'services/audioService';

export function useAnimation(playSounds: boolean) {
  useEffect(animateContent, []);
  useEffect(playMountingSounds, [playSounds]);

  function animateContent() {
    const slideUp = mix('bottomBig', 'hidden');
    const slideDown = mix('top', 'hidden');

    gsap
      .timeline({ delay: 0.5 })
      .from('.hello', slideUp)
      .from('.user-picture', slideUp, 0.15)
      .from('.message', slideDown, 0.85)
      .from('.loading', slideDown, 1);
  }

  function playMountingSounds() {
    if (playSounds) {
      playSound('valid', 0.5);
      fadeInSound('loading', 1);
      fadeOutSound('background', 1, false);
    }
  }
}
