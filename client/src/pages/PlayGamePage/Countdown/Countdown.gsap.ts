import { useEffect } from 'react';
import { gsap } from 'gsap';
import { fadeInSound, fadeOutSound, playSound } from 'services/audioService';

export function useAnimation(secondsLeft: number) {
  useEffect(changeNumber, [secondsLeft]);
  useEffect(playVoiceSounds, [secondsLeft]);

  function changeNumber() {
    const fadeIn = { opacity: 1, scale: 1.5, duration: 1 };
    const fadeOut = { opacity: 0, scale: 2, duration: 1, delay: 0.5 };

    if (secondsLeft === 3) {
      gsap.to('.three', fadeIn);
      gsap.to('.three', fadeOut);
    } else if (secondsLeft === 2) {
      gsap.to('.two', fadeIn);
      gsap.to('.two', fadeOut);
    } else if (secondsLeft === 1) {
      gsap.to('.one', fadeIn);
      gsap.to('.one', fadeOut);
    }
  }

  function playVoiceSounds() {
    if (secondsLeft === 3) {
      playSound('readyFemale');
    } else if (secondsLeft === 2) {
      playSound('setFemale');
    } else if (secondsLeft === 1) {
      playSound('goFemale');
      fadeOutSound('background');
      fadeInSound('playGame');
    }
  }
}
