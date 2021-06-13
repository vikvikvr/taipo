import { useEffect } from 'react';
import { gsap } from 'gsap';
import { fadeInSound, playSound } from 'services/audioService';

export function useAnimation() {
  useEffect(function animateContent() {
    const fadeIn = { opacity: 0, ease: 'power3.out' };
    const slideUp = { ...fadeIn, y: '2em' };
    const slideDown = { y: '-1em', ...fadeIn };
    gsap
      .timeline({ delay: 0.5 })
      .from('.hello', slideUp)
      .from('.badge', slideUp, 0.15)
      .from('.question', slideDown, 0.85)
      .from('.loading', slideDown, 1);
  }, []);
  useEffect(function playSounds() {
    playSound('valid', 0.5);
    fadeInSound('loading', 1.3);
  }, []);
}
