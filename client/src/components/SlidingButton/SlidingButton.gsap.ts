import { gsap } from 'gsap';
import { useMouseHover } from 'hooks/useMouseHover';
import { useEffect, useRef } from 'react';
import { SlideVariant } from './SlidingButton';

export function useAnimation(variant: SlideVariant, backgroundColor?: string) {
  const button = useRef(null);
  const span = useRef(null);
  const svg = useRef(null);
  const { isHovered } = useMouseHover(button);
  useEffect(toggleSlidingAnimation, [isHovered, variant, backgroundColor]);

  function toggleSlidingAnimation() {
    const isParallax = variant === 'parallax';
    const ease = 'power3.out';
    const canAnimate = span.current && button.current && svg.current;
    if (!canAnimate) {
      return;
    }
    if (isHovered) {
      gsap.to(span.current, {
        opacity: isParallax ? 1 : 0,
        translateX: isParallax ? '-2em' : '-4em',
        ease
      });
      gsap.to(svg.current, {
        opacity: 1,
        translateX: isParallax ? '3em' : 0,
        ease
      });
      gsap.to(button.current, {
        backgroundColor: backgroundColor || '#ffa726',
        ease
      });
    } else {
      // default state
      gsap.to(span.current, { opacity: 1, translateX: 0, ease });
      gsap.to(svg.current, { opacity: 0, translateX: '4em', ease });
      gsap.to(button.current, {
        backgroundColor: backgroundColor || '#ef6c00',
        ease
      });
    }
  }

  return { span, button, svg };
}
