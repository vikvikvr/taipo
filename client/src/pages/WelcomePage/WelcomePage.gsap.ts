import { useEffect } from 'react';
import { gsap, mix } from 'services/animationService';
import { fadeInSound, fadeOutSound, playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(animateContent, []);
  useEffect(playSounds, []);

  function animateContent() {
    const slideUp = mix('bottomBig', 'hidden');
    const slideDown = mix('top', 'hidden');

    gsap
      .timeline({ delay: 0.5 })
      .from('.hello', slideUp)
      .from('.badge', slideUp, 0.15)
      .from('.question', slideDown, 0.85)
      .from('.loading', slideDown, 1);
  }

  function playSounds() {
    playSound('valid', 0.5);
    fadeInSound('loading', 1.3);
    fadeOutSound('background', 1.3, false);
  }
}
