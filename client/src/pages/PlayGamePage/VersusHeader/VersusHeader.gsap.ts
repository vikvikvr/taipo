import { useEffect, useState } from 'react';
import { gsap } from 'services/animationService';

export function useAnimation() {
  const [hovered, setHovered] = useState(false);
  useEffect(slowInfiniteRotation, []);
  useEffect(changeColorOnHover, [hovered]);
  useEffect(swapIconsOnHover, [hovered]);

  function slowInfiniteRotation() {
    const rotate: gsap.TweenVars = {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: 'linear'
    };

    gsap.to('.square', rotate);
  }

  function changeColorOnHover() {
    const bgColor: gsap.TweenVars = {
      backgroundColor: hovered ? '#f44336' : '#ef6c00',
      ease: 'power3.inOut'
    };

    gsap.to('.square', bgColor);
  }

  function swapIconsOnHover() {
    const visible: gsap.TweenVars = { opacity: 1, scale: 1 };
    const hidden: gsap.TweenVars = { opacity: 0, scale: 0.5 };

    gsap.to('.hovered-icon', hovered ? visible : hidden);
    gsap.to('.not-hovered-icon', hovered ? hidden : visible);
  }

  return { hovered, setHovered };
}
