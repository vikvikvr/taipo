import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export function useAnimation() {
  const [hovered, setHovered] = useState(false);
  useEffect(function slowRotation() {
    gsap.to('.square', {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear'
    });
  }, []);
  useEffect(
    function changeColor() {
      gsap.to('.square', {
        backgroundColor: hovered ? '#f44336' : '#ef6c00',
        ease: 'power3.inOut',
        duration: 0.3
      });
    },
    [hovered]
  );
  useEffect(
    function crossfadeIcons() {
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
    },
    [hovered]
  );

  return { hovered, setHovered };
}
