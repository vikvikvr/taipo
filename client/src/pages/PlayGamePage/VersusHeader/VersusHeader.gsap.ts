import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { mouseClick } from 'services/audioService';

export function useAnimation() {
  const [hovered, setHovered] = useState(false);
  useEffect(slowRotation, []);
  useEffect(changeColor, [hovered]);
  useEffect(crossfadeIcons, [hovered]);

  function slowRotation() {
    gsap.to('.square', {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear.none'
    });
  }

  function changeColor() {
    gsap.to('.square', {
      backgroundColor: hovered ? '#f44336' : '#ef6c00',
      ease: 'power3.inOut',
      duration: 0.3
    });
  }

  function crossfadeIcons() {
    if (hovered) {
      mouseClick.play();
    }
    gsap.to('.hovered-icon', {
      opacity: hovered ? 1 : 0,
      ease: 'power3.out',
      scale: hovered ? 1 : 0.5
    });
    gsap.to('.not-hovered-icon', {
      opacity: hovered ? 0 : 1,
      ease: 'power3.out',
      scale: hovered ? 0.5 : 1
    });
  }

  return { hovered, setHovered };
}
